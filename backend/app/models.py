from pydantic import BaseModel
from typing import Optional, Generic, TypeVar, List
from pydantic.generics import GenericModel


T = TypeVar("T")


class APIResponse(GenericModel, Generic[T]):
    success: bool
    data: Optional[T] = None
    error: Optional[str] = None


class VideoGameStats(BaseModel):
    Total_Games: int
    Platforms: int
    Publishers: int
    Genres: int


class TopGame(BaseModel):
    Name: str
    Global_Sales: float


class TopPlatform(BaseModel):
    Platform: str
    Games: int


class TopGenre(BaseModel):
    Genre: str
    Games: int


class DashboardAnalytics(BaseModel):
    Stats: VideoGameStats
    Top_Games: List[TopGame]
    Top_Platforms: List[TopPlatform]
    Top_Genres: List[TopGenre]


class VideoGameCount(BaseModel):
    num_video_games: int


class VideoGame(BaseModel):
    id: int
    Name: str
    Year_of_Release: int
