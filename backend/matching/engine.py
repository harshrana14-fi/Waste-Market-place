from __future__ import annotations

from dataclasses import dataclass
import os
from typing import Dict, List, Optional

import numpy as np

from backend.ai.embedding_service import get_waste_embedding
from backend.vector_store.faiss_store import FAISSVectorStore

# Tunable weights
MATERIAL_W = float(os.getenv("MATERIAL_WEIGHT", 0.5))
DISTANCE_W = float(os.getenv("DISTANCE_WEIGHT", 0.2))
CAPACITY_W = float(os.getenv("CAPACITY_WEIGHT", 0.2))
SUSTAIN_W = float(os.getenv("SUSTAIN_WEIGHT", 0.1))


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    import math

    R = 6371.0
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c


def jaccard_similarity(a: List[str], b: List[str]) -> float:
    set_a, set_b = set([s.lower() for s in a]), set([s.lower() for s in b])
    if not set_a and not set_b:
        return 0.0
    inter = len(set_a & set_b)
    union = len(set_a | set_b)
    return inter / union if union else 0.0


@dataclass
class WasteListing:
    id: str
    description: str
    image_url: Optional[str]
    quantity: float
    location: Dict[str, float]  # {"lat": float, "lng": float}
    tags: List[str]
    vec: Optional[np.ndarray] = None


@dataclass
class RecyclerProfile:
    id: str
    location: Dict[str, float]
    goals: List[str]
    remaining_capacity: float
    vec: np.ndarray


class MatchingEngine:
    def __init__(self, vector_store: FAISSVectorStore) -> None:
        self.store = vector_store

    def compute_match_score(self, listing: WasteListing, recycler: RecyclerProfile, material_similarity: float) -> Dict[str, float]:
        distance = haversine_km(
            listing.location.get("lat", 0.0),
            listing.location.get("lng", 0.0),
            recycler.location.get("lat", 0.0),
            recycler.location.get("lng", 0.0),
        )
        distance_score = 1.0 / (1.0 + distance)
        capacity_score = min(1.0, float(recycler.remaining_capacity) / max(1.0, float(listing.quantity)))
        sustainability_score = jaccard_similarity(listing.tags, recycler.goals)

        final = (
            MATERIAL_W * material_similarity
            + DISTANCE_W * distance_score
            + CAPACITY_W * capacity_score
            + SUSTAIN_W * sustainability_score
        )

        return {
            "match_score": round(float(final), 4),
            "material_match": round(float(material_similarity), 4),
            "distance_km": round(float(distance), 2),
            "capacity_score": round(float(capacity_score), 4),
            "sustainability_score": round(float(sustainability_score), 4),
        }

    def find_best_recyclers(self, listing: WasteListing, top_k: int = 10) -> List[Dict]:
        # Ensure embedding
        if listing.vec is None:
            listing.vec = get_waste_embedding(listing.description, listing.image_url)

        # Vector search
        hits = self.store.search_similar(listing.vec, top_k=top_k * 3)

        results: List[Dict] = []
        for score, rec in hits:
            md = rec.metadata or {}
            recycler = RecyclerProfile(
                id=rec.item_id,
                location=md.get("location", {"lat": 0.0, "lng": 0.0}),
                goals=md.get("goals", []),
                remaining_capacity=float(md.get("remaining_capacity", 0.0)),
                vec=rec.vector,
            )

            # material similarity equals vector similarity from FAISS (cosine due to normalization)
            material_similarity = float(score)
            breakdown = self.compute_match_score(listing, recycler, material_similarity)

            result = {"recycler_id": recycler.id, **breakdown}
            results.append(result)

        # Sort by final score
        results.sort(key=lambda r: r["match_score"], reverse=True)
        return results[:top_k]


