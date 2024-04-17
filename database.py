import os.path as path
import json
import sqlite3 as db

class Database:
    def __init__(self, file_path):
        self.database_path = path.join(path.dirname(path.realpath(__file__)), file_path)
        self.connection = None
        self.cursor = None

    def connect(self):
        self.connection = db.connect(self.database_path)
        self.cursor = self.connection.cursor()

    def create_data_table(self):
        query_text = """
            CREATE TABLE IF NOT EXISTS AirIndex (
                city TEXT,
                year INTEGER,
                value NUMERIC(7,3),
                UNIQUE(city, year)
            );
        """
        self.cursor.executescript(query_text)

    def drop_data_table(self):
        query_text = "DROP TABLE IF EXISTS AirIndex;"
        self.cursor.executescript(query_text)

    def add_data(self, city, year, value):
        query_text = """
            INSERT INTO AirIndex
            VALUES ( ?, ?, ? )
            RETURNING *
        """
        params = (city, year, value)
        try:
            self.cursor.execute(query_text, params)
            result = self.cursor.fetchall()
            self.connection.commit()
            message = {
                "method": "INSERT",
                "data": result
            }
            return json.dumps(message)
        except Exception as e:
            return json.dumps({"error": str(e)})

    def update_data(self, city, year, value):
        query_text = """
            UPDATE AirIndex SET value = ?
            WHERE city = ?
            AND year = ?
            RETURNING *
        """
        params = (value, city, year)
        try:
            self.cursor.execute(query_text, params)
            result = self.cursor.fetchall()
            self.connection.commit()
            message = {
                "method": "UPDATE",
                "data": result
            }
            return json.dumps(message)
        except Exception as e:
            return json.dumps({"error": str(e)})

    def remove_data(self, city, year):
        query_text = """
            DELETE FROM AirIndex
            WHERE city = ?
            AND year = ?
            RETURNING *
        """
        params = (city, year)
        try:
            self.cursor.execute(query_text, params)
            result = self.cursor.fetchall()
            self.connection.commit()
            message = {
                "method": "DELETE",
                "data": result
            }
            return json.dumps(message)
        except Exception as e:
            return json.dumps({"error": str(e)})

    def select_all(self, city):
        query_text = """
            SELECT * FROM AirIndex
            WHERE city = ?
            ORDER BY year ASC
        """
        params = (city,)
        self.cursor.execute(query_text, params)
        data = self.cursor.fetchall()
        return data
        
    def select_between(self, city, start, end):
        query_text = """
            SELECT * FROM AirIndex
            WHERE city = ?
            AND year BETWEEN ? AND ?
            ORDER BY year ASC
        """
        params = (city, start, end)
        self.cursor.execute(query_text, params)
        data = self.cursor.fetchall()
        return data

    def disconnect(self):
        self.connection.close()
