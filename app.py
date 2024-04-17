import os
from flask import Flask, send_from_directory, render_template, request

from database import Database

db = Database("data/database.db")
db.connect()
db.create_data_table()
db.disconnect()

app = Flask(__name__)

@app.route("/favicon.ico")
def favicon():
    return send_from_directory(os.path.join(app.root_path, "static"), "images/favicon.ico")

@app.get("/")
def get_index():
    return render_template("index.html")

@app.post("/add")
def post_add():
    city = request.get_json().get("city")
    year = request.get_json().get("year")
    value = request.get_json().get("value")
    db.connect()
    result = db.add_data(city, year, value)
    db.disconnect()
    return result

@app.post("/update")
def post_update():
    city = request.get_json().get("city")
    year = request.get_json().get("year")
    value = request.get_json().get("value")
    db.connect()
    result = db.update_data(city, year, value)
    db.disconnect()
    return result

@app.post("/remove")
def post_remove():
    city = request.get_json().get("city")
    year = request.get_json().get("year")
    db.connect()
    result = db.remove_data(city, year)
    db.disconnect()
    return result

@app.post("/select-all")
def post_select_all():
    city = request.get_json().get("city")
    db.connect()
    result = db.select_all(city)
    db.disconnect()
    return result

@app.post("/select-between")
def post_select_between():
    city = request.get_json().get("city")
    start = request.get_json().get("start")
    end = request.get_json().get("end")
    db.connect()
    result = db.select_between(city, start, end)
    db.disconnect()
    return result

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9000)
