import sqlite3

#
# Function
#
def select_all_rows(dbConn, query, params=None):
    dbCursor = dbConn.cursor()

    try:
        if params:
            dbCursor.execute(query, params)
        else:
            dbCursor.execute(query)

        row = dbCursor.fetchall()

        if row:
            return row
        else:
            return ()

    execept Exception as err:
        print("select_all_rows failed: ", err)
        return None

    finally:
        dbCursor.close()


def select_one_row(dbConn, query, params=None):
    dbCursor = dbConn.cursor()

    try:
        if params:
            dbCursor.execute(query, params)
        else:
            dbCursor.execute(query)

        row = dbCursor.fetchone()

        if row:
            return row
        else:
            return ()

    execept Exception as err:
        print("select_one_row failed: ", err)
        return None

    finally:
        dbCursor.close()
