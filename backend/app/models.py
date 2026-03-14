from pydantic import BaseModel
from typing import Optional, Generic, TypeVar, List
from pydantic.generics import GenericModel


T = TypeVar("T")


class APIResponse(GenericModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None


class VideoGameCount(BaseModel):
    num_video_games: int


class VideoGame(BaseModel):
    id: int
    name: str
    year_of_release: int


class VideoGameStats(BaseModel):
    total_games: int
    platforms: int
    publishers: int
    genres: int


class TopGame(BaseModel):
    name: str
    global_sales: float


class TopPlatform(BaseModel):
    platform: str
    games: int


class TopGenre(BaseModel):
    genre: str
    games: int


class GamesPerYear(BaseModel):
    year: int
    games: int


class SalesPerYear(BaseModel):
    year: int
    sales: int


class DashboardAnalytics(BaseModel):
    featured_game: VideoGame
    stats: VideoGameStats
    top_games: List[TopGame]
    top_platforms: List[TopPlatform]
    top_genres: List[TopGenre]
    games_per_year: List[GamesPerYear]
    sales_per_year: List[SalesPerYear]
