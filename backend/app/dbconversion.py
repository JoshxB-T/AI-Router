import csv
import sqlite3


CSV_PATH = "data/video_games.csv"
DB_PATH = "data/video_games.db"


def read_csv():
    dbConn = sqlite3.connect(DB_PATH)
    dbCursor = dbConn.cursor()

    with open(CSV_PATH, mode='r', newline='', encoding='utf-8') as f:
        csv_content = csv.DictReader(f)

        for row in csv_content:
            query = f"""
            insert into video_games (Name, Platform, Year_of_Release, Genre, Publisher, NA_Sales, EU_Sales, JP_Sales, Other_Sales, Global_Sales)
            values ( (?), (?), (?), (?), (?), (?), (?), (?), (?), (?) );
            """
            params = (row['Name'], row['Platform'], row['Year_of_Release'], row['Genre'], row['Publisher'], row['NA_Sales'], row['EU_Sales'], row['JP_Sales'], row['Other_Sales'], row['Global_Sales'])

            dbCursor.execute(query, params)

    dbConn.commit()
    dbCursor.close()
    dbConn.close()


def create_db():
    dbConn = sqlite3.connect(DB_PATH)
    dbCursor = dbConn.cursor()

    query = """
    create table if not exists video_games (
        id integer primary key,
        Name text not null,
        Platform text not null,
        Year_of_Release integer not null,
        Genre text not null,
        Publisher text not null,
        NA_Sales integer not null,
        EU_Sales integer not null,
        JP_Sales integer not null,
        Other_Sales integer not null,
        Global_Sales integer not null
    );
    """

    dbCursor.execute(query)

    dbCursor.close()
    dbConn.commit()
    dbConn.close()


def main():
    create_db()
    read_csv()


if __name__ == "__main__":
    main()
