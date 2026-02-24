import app.datatier

#
# Class implementation
#
class VideoGame:
    def __init__(self, Name, Platform, Year_of_Release, Genre, Publisher, NA_Sales, EU_Sales, JP_Sales, Other_Sales, Global_Sales):
        self._Name = Name
        self._Platform = Platform
        self._Year_of_Release = Year_of_Release
        self._Genre = Genre 
        self._Publisher = Publisher
        self._NA_Sales = NA_Sales
        self._EU_Sales = EU_Sales
        self._JP_Sales = JP_Sales
        self._Other_Sales = Other_Sales
        self._Global_Sales = Global_Sales

    def __str__(self):
        return f"{self.Name} was released on {self.Platform} in {self.Year_of_Release} categorized as {self.Genre} under {self.Publisher} with {self.NA_Sales}, {self.EU_Sales}, {self.JP_Sales}, {self.Other_Sales}, and {self.Global_Sales}."

    def __repr__(self):
        return f"VideoGame(Name={self.Name}, Platorm={self.Platform}, Year_of_Release={self.Year_of_Release}, Genre={self.Genre}, Publisher={self.Publisher}, NA_Sales={self.NA_Sales}, EU_Sales={self.EU_Sales}, JP_Sales={self.JP_Sales}, {self.Other_Sales}, Global_Sales={self.Global_Sales})"

    @property
    def Name(self):
        return self._Name

    @property
    def Platform(self):
        return self._Platform

    @property
    def Year_of_Release(self):
        return self._Year_of_Release

    @property
    def Genre(self):
        return self._Genre

    @property
    def Publisher(self):
        return self._Publisher

    @property
    def NA_Sales(self):
        return self._NA_Sales

    @property
    def EU_Sales(self):
        return self._EU_Sales

    @property
    def JP_Sales(self):
        return self._JP_Sales

    @property
    def Other_Sales(self):
        return self._Other_Sales

    @property
    def Global_Sales(self):
        return self._Global_Sales


def num_video_games(dbConn):
    try:
        query = """
        Select Count(id)
        From VideoGames
        ;
        """

        row = datatier.select_one_row(dbConn, query, None)

        return row[0]

    except Exception as err:
        print("num_video_games failed: ", err)
        return -1

    finally:
        pass
