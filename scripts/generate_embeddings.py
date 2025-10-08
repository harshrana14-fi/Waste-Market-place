from __future__ import annotations

import os
from typing import Dict, List

import numpy as np
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

from backend.ai.embedding_service import get_embedding_dimension
from backend.db import SessionLocal, engine
from backend.models import Recycler, WasteListing as DBListing
from backend.vector_store.faiss_store import FAISSVectorStore


def as_list(csv: str | None) -> List[str]:
    if not csv:
        return []
    return [s.strip() for s in csv.split(",") if s.strip()]


def main() -> None:
    load_dotenv()
    index_path = os.getenv("VECTOR_INDEX_PATH", "backend/vector_index.faiss")
    model_name = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

    # Ensure DB tables exist (no migrations here for simplicity)
    from backend.db import Base
    Base.metadata.create_all(bind=engine)

    model = SentenceTransformer(model_name)
    store = FAISSVectorStore(dim=get_embedding_dimension(), index_path=index_path)

    db = SessionLocal()
    try:
        recyclers: List[Recycler] = db.query(Recycler).all()
        for r in recyclers:
            text = r.profile_text or ""
            vec = model.encode([text], convert_to_numpy=True, normalize_embeddings=True)[0]
            md: Dict = {
                "goals": as_list(r.sustainability_goals),
                "location": {"lat": r.location_lat or 0.0, "lng": r.location_lng or 0.0},
                "remaining_capacity": float(r.capacity or 0.0),
                "accepted_materials": as_list(r.accepted_materials),
                "type": "recycler",
            }
            store.add_embedding(item_id=r.id, vector=vec, metadata=md)

        listings: List[DBListing] = db.query(DBListing).all()
        for l in listings:
            # Build listing text for embedding
            text_parts = [l.description or "", l.material_type or ""]
            text = ". ".join([p for p in text_parts if p])
            vec = model.encode([text], convert_to_numpy=True, normalize_embeddings=True)[0]
            md = {
                "location": {"lat": l.location_lat or 0.0, "lng": l.location_lng or 0.0},
                "quantity": float(l.quantity or 0.0),
                "tags": as_list(l.tags),
                "type": "listing",
            }
            store.add_embedding(item_id=f"L:{l.id}", vector=vec, metadata=md)

        print(f"Embeddings generated and stored in {index_path}")
    finally:
        db.close()


if __name__ == "__main__":
    main()


