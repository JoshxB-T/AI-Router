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
    Name: str
    Year_of_Release: int
