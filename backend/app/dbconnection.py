import sqlite3


DB_PATH = "app/data/video_games.db"


def get_db_conn():
    dbConn = sqlite3.connect(DB_PATH)
    dbConn.row_factory = sqlite3.Row

    try:
        yield dbConn
    finally:
        dbConn.close()
