from __future__ import annotations

import os
from typing import Any, Dict

from fastapi import APIRouter, HTTPException

from backend.ai.embedding_service import get_embedding_dimension, get_waste_embedding
from backend.db import SessionLocal
from backend.matching.engine import MatchingEngine, WasteListing
from backend.vector_store.faiss_store import FAISSVectorStore
from backend.models import WasteListing as DBListing


router = APIRouter()


def _get_store() -> FAISSVectorStore:
    # Persist FAISS index from env path
    index_path = os.getenv("VECTOR_INDEX_PATH", "backend/vector_index.faiss")
    return FAISSVectorStore(dim=get_embedding_dimension(), index_path=index_path)


@router.get("/match/{listing_id}")
def get_matches(listing_id: str) -> Dict[str, Any]:
    db = SessionLocal()
    try:
        row = db.query(DBListing).filter(DBListing.id == listing_id).first()
        if not row:
            raise HTTPException(status_code=404, detail="Listing not found")
        listing = WasteListing(
            id=row.id,
            description=row.description or "",
            image_url=row.image_url,
            quantity=float(row.quantity or 0.0),
            location={"lat": row.location_lat or 0.0, "lng": row.location_lng or 0.0},
            tags=[t.strip() for t in (row.tags or "").split(",") if t.strip()],
            vec=None,
        )
    finally:
        db.close()

    engine = MatchingEngine(vector_store=_get_store())
    ranked = engine.find_best_recyclers(listing, top_k=10)
    return {"listing_id": listing_id, "matches": ranked}



