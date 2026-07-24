from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Departure(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    stop_id: int = Field(foreign_key="stop.id")
    route_id: int = Field(foreign_key="route.id")
    scheduled_time: datetime
    delay_minutes: Optional[int] = None
    is_cancelled: bool = False
