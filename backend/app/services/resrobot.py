import os

import httpx
from dotenv import load_dotenv

load_dotenv()

RESROBOT_BASE_URL = "https://api.resrobot.se/v2.1"


# Function to look up a stop by name and return a list of matching stop locations.
# Used for gather information about stops when the user inputs a stop name.
def lookup_stop(name: str) -> list[dict]:
    api_key = os.environ.get("RESROBOT_API_KEY")

    params = {
        "input": name,
        "format": "json",
        "accessId": api_key,
    }

    response = httpx.get(f"{RESROBOT_BASE_URL}/location.name", params=params)
    response.raise_for_status()

    raw_locations = response.json().get("stopLocationOrCoordLocation", [])
    return [item["StopLocation"] for item in raw_locations if "StopLocation" in item]


# Function to search for trips between two stops (origin and destination),
# returning a list of possible trip options with route/timing details.
def search_trip(origin_id: str, dest_id: str) -> list[dict]:
    api_key = os.environ.get("RESROBOT_API_KEY")

    params = {
        "originId": origin_id,
        "destId": dest_id,
        "format": "json",
        "accessId": api_key,
    }

    response = httpx.get(f"{RESROBOT_BASE_URL}/trip", params=params)
    response.raise_for_status()

    return response.json().get("Trip", [])
