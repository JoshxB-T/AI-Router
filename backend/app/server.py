import sqlite3, time, os

#from app import objecttier
from app.dbconnection import get_db_conn
from app.db import DB
from app.worker import WORKER
from app.models import APIResponse, VideoGameCount, VideoGame

from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse


app = FastAPI(title="AI Router")
DB_PATH = "app/data/video_games.db"


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = str(process_time * 1000) + "ms"

    return response


@app.on_event("startup")
def startup():
    DB.initialize()


@app.get("/")
def root():
    return {"status:": "ok"}


@app.get("/status")
def status():
    return APIResponse(
        success=True,
        data="ok",
        error=None
    )


@app.get(
    "/num_video_games",
    response_model=APIResponse[VideoGameCount]
)
def stats(db = DB.dep):
    count = db.scalar(
        "SELECT COUNT(*) FROM video_games;"
    )

    return APIResponse(
        success=True,
        data=VideoGameCount(
            num_video_games=count
        ),
        error=None
    )


def fake_ai(prompt):
    time.sleep(5)

    return f"AI Response for: {prompt}"


@app.post("/ai")
def ai(prompt: str):
    job_id = WORKER.submit(
        fake_ai,
        prompt
    )

    return {"job_id": job_id}


@app.get("/job/{job_id}")
def job(job_id: str):
    result = WORKER.get(job_id)

    if not result:
        return {"error": "not found"}

    return result


def stream_words():
    words = ["Hello", " ", "world", "!"]

    for w in words:
        yield w
        time.sleep(1)


@app.get("/stream")
def stream():
    return StreamingResponse(
        stream_words(),
        media_type="text/plain"
    )


@app.get(
    "/games",
    response_model=APIResponse[list[VideoGame]]
)
def games(db = DB.dep):
    rows = db[
        """
        SELECT Name, Year_of_Release 
        FROM video_games
        LIMIT 10;
        """
    ]

    return APIResponse(
        success=True,
        data=rows,
        error=None
    )
