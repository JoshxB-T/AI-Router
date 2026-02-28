from pathlib import Path
import sqlite3
import time
from fastapi import Depends

#
# Session Wrapper 
#
class DBSession:
    def __init__(self, conn, debug):
        self.conn = conn
        self.debug = debug


    # db("SQL", params)
    def __call__(self, query, params=None):
        params = params or {}
        start = time.time()
        cursor = self.conn.execute(query, params)

        if self.debug:
            elapsed = (time.time() - start) * 1000

            print(
                f"[SQL] {elapsed:.2f}ms\n"
                f"{query.strip()}\n"
                f"{params}\n"
            )

        rows = cursor.fetchall()

        return [dict(r) for r in rows]


    # db["SQL"]
    def __getitem__(self, query):
        return self(query)


    def scalar(self, query, params=None):
        cursor = self.conn.execute(query, params or {})
        row = cursor.fetchone()

        return row[0] if row else None


    def write(self, query, params=None):
        cursor = self.conn.execute(query, params or {})

        return cursor.lastrowid


#
# Database Manager
#
class Database:
    def __init__(self):
        BASE = Path(__file__).resolve().parent
        self.DB_PATH = BASE / "data" / "video_games.db"
        self.DEBUG = True


    def initialize(self):
        conn = sqlite3.connect(self.DB_PATH)

        conn.execute("PRAGMA journal_mode=WAL;")
        conn.execute("PRAGMA synchronous=NORMAL;")
        conn.execute("PRAGMA foreign_keys=ON;")
    
        conn.close()


    # generator dependency
    def _session(self):
        conn = sqlite3.connect(
            self.DB_PATH,
            timeout=30,
            check_same_thread=False
        )

        conn.row_factory = sqlite3.Row

        db = DBSession(conn, self.DEBUG)

        try:
            yield db
            conn.commit()

        except Exception:
            conn.rollback()
            raise

        finally:
            conn.close()


    # FastAPI dependency shortcut
    @property
    def dep(self):
        return Depends(self._session)


# Singleton
DB = Database()
