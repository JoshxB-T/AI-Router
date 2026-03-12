from pydantic import BaseModel
from typing import Optional, Generic, TypeVar
from pydantic.generics import GenericModel


T = TypeVar("T")


class APIResponse(GenericModel, Generic[T]):
    success: bool
    data: Optional[T]
    error: Optional[str]


class VideoGameCount(BaseModel):
    num_video_games: int


class VideoGame(BaseModel):
    id: Optional[float] = None
    Name: Optional[str] = None
    Platform: Optional[str] = None 
    Year_of_Release: Optional[int] = None
    Genre: Optional[str] = None
    Publisher: Optional[str] = None
    NA_Sales: Optional[float] = None
    EU_Sales: Optional[float] = None
    JP_Sales: Optional[float] = None
    Other_Sales: Optional[float] = None
    Global_Sales: Optional[float] = None
