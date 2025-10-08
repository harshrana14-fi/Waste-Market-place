from __future__ import annotations

from sqlalchemy import Column, Float, Integer, String, Text

from backend.db import Base


class Recycler(Base):
    __tablename__ = "recyclers"

    id = Column(String, primary_key=True, index=True)
    accepted_materials = Column(Text, nullable=True)  # comma-separated
    capacity = Column(Float, default=0.0)
    location_lat = Column(Float, default=0.0)
    location_lng = Column(Float, default=0.0)
    sustainability_goals = Column(Text, nullable=True)  # comma-separated
    profile_text = Column(Text, nullable=True)


class WasteListing(Base):
    __tablename__ = "waste_listings"

    id = Column(String, primary_key=True, index=True)
    material_type = Column(String, nullable=True)
    quantity = Column(Float, default=0.0)
    location_lat = Column(Float, default=0.0)
    location_lng = Column(Float, default=0.0)
    description = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    tags = Column(Text, nullable=True)  # comma-separated


