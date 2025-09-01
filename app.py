from flask import Flask, render_template
import time

app = Flask(__name__)

@app.route("/")
def template():
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=6700)