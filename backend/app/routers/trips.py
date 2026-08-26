from datetime import datetime

from fastapi import APIRouter, Query

from app.schema import Leg, TripResult
from app.services.resrobot import search_trip

router = APIRouter(prefix="/trips", tags=["trips"])


def _combine(date: str, time: str) -> datetime:
    return datetime.fromisoformat(f"{date}T{time}")


def _build_leg(leg: dict) -> Leg:
    products = leg.get("Product") or [{}]
    product = products[0]
    return Leg(
        origin_name=leg["Origin"]["name"],
        origin_time=_combine(leg["Origin"]["date"], leg["Origin"]["time"]),
        destination_name=leg["Destination"]["name"],
        destination_time=_combine(leg["Destination"]["date"], leg["Destination"]["time"]),
        line_name=product.get("name", leg.get("name", "Walk")),
        transport_type=product.get("catOut", leg.get("type", "WALK")),
        operator=product.get("operatorInfo", {}).get("name", "-"),
        duration=leg["duration"],
    )


def _build_trip(trip: dict) -> TripResult:
    return TripResult(
        id=trip["tripId"],
        origin_name=trip["Origin"]["name"],
        departure_time=_combine(trip["Origin"]["date"], trip["Origin"]["time"]),
        destination_name=trip["Destination"]["name"],
        arrival_time=_combine(trip["Destination"]["date"], trip["Destination"]["time"]),
        duration=trip["duration"],
        transfer_count=trip.get("transferCount", 0),
        legs=[_build_leg(leg) for leg in trip["LegList"]["Leg"]],
    )


@router.get("/", response_model=list[TripResult])
def search_trips(
    origin_id: str = Query(alias="originId"),
    dest_id: str = Query(alias="destId"),
):
    raw_trips = search_trip(origin_id, dest_id)
    return [_build_trip(trip) for trip in raw_trips]
