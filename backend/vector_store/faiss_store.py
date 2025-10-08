from __future__ import annotations

import os
import threading
from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple

import faiss  # type: ignore
import numpy as np


@dataclass
class VectorRecord:
    item_id: str
    vector: np.ndarray
    metadata: Dict


class FAISSVectorStore:
    """
    Lightweight FAISS-backed vector store with in-memory metadata map.
    Persists index to a file when ``index_path`` is provided.
    """

    def __init__(self, dim: int, index_path: Optional[str] = None) -> None:
        self.dim = dim
        self.index_path = index_path
        self._index = faiss.IndexFlatIP(dim)
        self._id_to_meta: Dict[int, VectorRecord] = {}
        self._next_int_id = 0
        self._lock = threading.Lock()

        # Load existing index if present
        if index_path and os.path.exists(index_path):
            try:
                self._index = faiss.read_index(index_path)
                # We still need metadata; keep it separate in a sidecar npz if present
                sidecar = index_path + ".meta.npz"
                if os.path.exists(sidecar):
                    data = np.load(sidecar, allow_pickle=True)
                    stored = data.get("records", [])
                    for rec in stored:
                        self._id_to_meta[int(rec[0])] = VectorRecord(
                            item_id=str(rec[1]), vector=rec[2], metadata=rec[3]
                        )
                    if len(self._id_to_meta) > 0:
                        self._next_int_id = max(self._id_to_meta.keys()) + 1
            except Exception:
                # Start fresh if loading fails
                self._index = faiss.IndexFlatIP(dim)
                self._id_to_meta = {}
                self._next_int_id = 0

    def _persist(self) -> None:
        if not self.index_path:
            return
        faiss.write_index(self._index, self.index_path)
        # persist sidecar metadata
        sidecar = self.index_path + ".meta.npz"
        records = []
        for internal_id, rec in self._id_to_meta.items():
            records.append(np.array([internal_id, rec.item_id, rec.vector, rec.metadata], dtype=object))
        np.savez_compressed(sidecar, records=np.array(records, dtype=object))

    def add_embedding(self, item_id: str, vector: np.ndarray, metadata: Dict) -> None:
        vec = vector.astype("float32")
        # Expect cosine similarity; normalize to unit length -> inner product == cosine
        norm = np.linalg.norm(vec)
        if norm > 0:
            vec = vec / norm
        with self._lock:
            internal_id = self._next_int_id
            self._next_int_id += 1
            self._index.add(vec.reshape(1, -1))
            self._id_to_meta[internal_id] = VectorRecord(item_id=item_id, vector=vec, metadata=metadata)
            self._persist()

    def search_similar(self, vector: np.ndarray, top_k: int = 10) -> List[Tuple[float, VectorRecord]]:
        if self._index.ntotal == 0:
            return []
        query = vector.astype("float32")
        norm = np.linalg.norm(query)
        if norm > 0:
            query = query / norm
        with self._lock:
            scores, ids = self._index.search(query.reshape(1, -1), top_k)
        results: List[Tuple[float, VectorRecord]] = []
        for score, internal_id in zip(scores[0].tolist(), ids[0].tolist()):
            if internal_id == -1:
                continue
            rec = self._id_to_meta.get(int(internal_id))
            if rec is None:
                continue
            results.append((float(score), rec))
        return results


