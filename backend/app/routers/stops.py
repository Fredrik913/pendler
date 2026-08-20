from fastapi import APIRouter, Query

from app.schema import Stop
from app.services.resrobot import lookup_stop

router = APIRouter(prefix="/stops", tags=["stops"])


@router.get("/", response_model=list[Stop])
def search_stops(query: str = Query(...)):
    matches = lookup_stop(query)
    return [
        Stop(id=match["extId"], name=match["name"], lat=match["lat"], lon=match["lon"])
        for match in matches
    ]
