from __future__ import annotations

import random
from typing import Dict, List

import numpy as np

from backend.ai.embedding_service import get_waste_embedding
from backend.vector_store.faiss_store import FAISSVectorStore


def seed():
    descriptions: List[str] = [
        "Recycler specializing in PET plastic bottles, high throughput, low contamination tolerance",
        "Facility for mixed paper and cardboard recycling, prefers local pickups",
        "E-waste recycler handling batteries and small electronics with strict compliance",
        "Glass recycler for clear and green bottles with washing capabilities",
        "Metal scrap yard focusing on aluminum cans and light steel",
    ]

    goals_list: List[List[str]] = [
        ["plastic", "PET", "circularity", "low-emission logistics"],
        ["paper", "cardboard", "local", "community"],
        ["e-waste", "batteries", "safety", "compliance"],
        ["glass", "washing", "closed-loop"],
        ["metal", "aluminum", "recovery"],
    ]

    locations: List[Dict[str, float]] = [
        {"lat": 40.73061, "lng": -73.935242},  # NYC
        {"lat": 40.650002, "lng": -73.949997},  # Brooklyn
        {"lat": 40.712776, "lng": -74.005974},  # Manhattan
        {"lat": 40.789142, "lng": -73.134960},  # Long Island
        {"lat": 40.8448, "lng": -73.8648},      # Bronx
    ]

    store = FAISSVectorStore(dim=512, index_path="faiss.index")

    for i, desc in enumerate(descriptions):
        vec = get_waste_embedding(desc)
        md = {
            "goals": goals_list[i],
            "location": locations[i],
            "remaining_capacity": random.uniform(500, 5000),
        }
        store.add_embedding(item_id=f"R{i+1:03d}", vector=vec, metadata=md)

    print("Seeded recyclers into FAISS index.")


if __name__ == "__main__":
    seed()


