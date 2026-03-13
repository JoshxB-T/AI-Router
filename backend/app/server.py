import sqlite3, time, os

from typing import Optional

from app.dbconnection import get_db_conn
from app.db import DB
from app.worker import WORKER
from app.models import APIResponse, DashboardAnalytics, VideoGameCount, VideoGame

from fastapi import FastAPI, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse


DB_PATH = "app/data/video_games.db"
app = FastAPI(title="AI Router")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    )


@app.get("/status")
def status():
    return APIResponse(
        success=True,
        data="ok",
    )


@app.get(
        "/analytics/dashboard",
        response_model=APIResponse[DashboardAnalytics]
)
def dashboard(db = DB.dep):
    featured_game = db.one(
        """
        SELECT id, Name AS name, Year_of_Release AS year_of_release
        FROM video_games
        ORDER BY RANDOM()
        LIMIT 1;
        """
    )

    stats = db.one(
        """
        SELECT
            COUNT(*) AS total_games,
            COUNT(DISTINCT Platform) AS platforms,
            COUNT(DISTINCT Publisher) AS publishers,
            COUNT(DISTINCT Genre) AS genres
        FROM video_games;
        """
    )

    top_games = db(
        """
        SELECT Name AS name, Global_Sales AS global_sales
        FROM video_games
        ORDER BY global_sales DESC
        LIMIT 10;
        """
    )

    top_platforms = db(
        """
        SELECT Platform as platform, COUNT(*) AS games
        FROM video_games
        GROUP BY Platform
        ORDER BY Games DESC
        LIMIT 5;
        """
    )

    top_genres = db(
        """
        SELECT Genre as genre, COUNT(*) AS games
        FROM video_games
        GROUP BY Genre
        ORDER BY Games DESC
        LIMIT 5;
        """
    )

    analytics = DashboardAnalytics(
        featured_game=featured_game,
        stats=stats,
        top_games=top_games,
        top_platforms=top_platforms,
        top_genres=top_genres
    )

    return APIResponse(
        success=True,
        data=analytics
    )


@app.get(
    "/num_video_games",
    response_model=APIResponse[VideoGameCount]
)
def num_video_games(db = DB.dep):
    count = db.scalar(
        "SELECT COUNT(*) FROM video_games;"
    )

    return APIResponse(
        success=True,
        data=VideoGameCount(
            num_video_games=count
        )
    )


@app.get(
    "/games",
    response_model=APIResponse[list[VideoGame]]
)
def games(db = DB.dep):
    rows = db[
        """
        SELECT id, Name, Year_of_Release 
        FROM video_games
        LIMIT 10;
        """
    ]

    return APIResponse(
        success=True,
        data=rows,
    )


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

    query = "SELECT * FROM video_games"

    conditions = []
    params = {}

    # ---------- Filters ----------
    if name:
        conditions.append("Name LIKE :name")
        params["name"] = f"%{name}%"

    if genre:
        conditions.append("Genre = :genre")
        params["genre"] = genre

    if year:
        conditions.append("Year_of_Release >= :year")
        params["year"] = year

    if publisher:
        conditions.append("Publisher = :publisher")
        params["publisher"] = publisher

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    print("query:", query)
    print("params", params)

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
