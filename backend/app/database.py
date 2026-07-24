from sqlmodel import SQLModel, create_engine, Session
from app.models.stop import Stop
from app.models.route import Route
from app.models.departure import Departure

DATABASE_URL = "sqlite:///./pendler.db"
engine = create_engine(DATABASE_URL, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
