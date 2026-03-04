import sqlite3, time, os

from typing import Optional

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
    return APIResponse(
            success=True,
            data="root",
            error=None
    )


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


def add_filter(query, params, condition, key, value):
    query += ("\n\t" + condition)
    params[key] = value

    return query


def validate_rows(model, rows):
    from pydantic import ValidationError

    valid = []
    skipped = 0

    for row in rows:
        try: 
            valid.append(model(**row))

        except ValidationError as e:
            print("Invalid row skipped:", row)
            print("Validation Error: ", e)
            skipped += 1

    return valid, skipped


@app.get(
    "/search_game",
    response_model=APIResponse[list[VideoGame]]
)
def search_game(
    name: Optional[str] = None,
    genre: Optional[str] = None,
    year: Optional[str] = None,
    publisher: Optional[str] = None,

    db= DB.dep
):

    query = """
        SELECT *
        FROM video_games
        WHERE 1 = 1
    """

    params = {}

    # ---------- Filters ----------
    if name:
        condition = "AND Name LIKE :name"
        query = add_filter(query, params, condition, "name", f"%{name}%")

    if genre:
        condition = "AND Genre = :genre"
        query = add_filter(query, params, condition, "genre", genre)

    if year:
        condition =  "AND Year_of_Release >= :year"
        query = add_filter(query, params, condition, "year", year)

    if publisher:
        condition = "AND Publisher = :publisher"
        query = add_filter(query, params, condition, "publisher", publisher)

    rows = db(query, params)
    valid_games, skipped_rows = validate_rows(VideoGame, rows)

    return APIResponse(
        success=True,
        data=valid_games,
        error=None if skipped_rows == 0 else f"{skipped_rows} invalid rows skipped."
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

