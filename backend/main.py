from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.match import router as match_router


app = FastAPI(title="Waste Marketplace Matching API")

# Allow local Next.js and others
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(match_router, prefix="/api", tags=["matching"])


@app.get("/health")
def health():
    return {"status": "ok"}


