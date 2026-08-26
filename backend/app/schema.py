from datetime import datetime

from pydantic import BaseModel


class Stop(BaseModel):
    id: str
    name: str
    lat: float
    lon: float


class Leg(BaseModel):
    origin_name: str
    origin_time: datetime
    destination_name: str
    destination_time: datetime
    line_name: str
    transport_type: str
    operator: str
    duration: str


class TripResult(BaseModel):
    id: str
    origin_name: str
    departure_time: datetime
    destination_name: str
    arrival_time: datetime
    duration: str
    transfer_count: int
    legs: list[Leg]
