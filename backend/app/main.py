from fastapi import FastAPI

app = FastAPI(title="Commuter Pulse API")


@app.get("/health")
def health_check():
    return {"status": "ok"}
