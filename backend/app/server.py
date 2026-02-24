import sqlite3
import app.objecttier
import time

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="AI Router")
dbConn = sqlite3.connect("data/")


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = str(process_time * 1000) + "ms"

    return response


@app.get("/")
def root():
    return {"root": "Hello!"}


@app.get("/status")
def status():
    return {"status": "ok"}


@app.get("/search")
def search(video_game: str):
    pass


@app.get("/num_video_games")
def find_stats()
    video_games = objectier.num_video_games(dbConn)

