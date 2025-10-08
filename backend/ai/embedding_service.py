from __future__ import annotations

import io
import os
import threading
from typing import Optional

import numpy as np
import requests
from PIL import Image
from sentence_transformers import SentenceTransformer


_model_lock = threading.Lock()
_model: Optional[SentenceTransformer] = None
_model_name: Optional[str] = None


def _get_model() -> SentenceTransformer:
    global _model, _model_name
    if _model is not None:
        return _model
    with _model_lock:
        if _model is None:
            _model_name = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
            _model = SentenceTransformer(_model_name)
    return _model


def _fetch_image(image_url: str) -> Optional[Image.Image]:
    try:
        resp = requests.get(image_url, timeout=10)
        resp.raise_for_status()
        return Image.open(io.BytesIO(resp.content)).convert("RGB")
    except Exception:
        return None


def _normalize(vec: np.ndarray) -> np.ndarray:
    norm = np.linalg.norm(vec)
    if norm == 0:
        return vec
    return vec / norm


def get_waste_embedding(text_description: str, image_url: Optional[str] = None) -> np.ndarray:
    """
    Generate a fixed-size embedding for a waste listing by combining text and optional image.

    Strategy:
    - Encode text using CLIP text encoder (via Sentence-Transformers wrapper)
    - If image_url is provided and downloadable, encode image via CLIP image encoder
    - Normalize both vectors and take the average, then re-normalize
    """
    model = _get_model()

    text_vec = model.encode([text_description], convert_to_numpy=True, normalize_embeddings=True)[0]

    image_vec = None
    if image_url:
        pil_img = _fetch_image(image_url)
        if pil_img is not None:
            try:
                image_vec = model.encode([pil_img], convert_to_numpy=True, normalize_embeddings=True)[0]
            except Exception:
                image_vec = None

    if image_vec is None:
        return _normalize(text_vec)

    combined = _normalize(text_vec) + _normalize(image_vec)
    return _normalize(combined)


def get_embedding_dimension() -> int:
    return int(_get_model().get_sentence_embedding_dimension())


