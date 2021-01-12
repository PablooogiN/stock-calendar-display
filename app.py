from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def hello_world():
    # response = requests.get("https://sandbox.iexapis.com/stable/stock/twtr/quote/latestPrice?token=Tsk_9980ed4d116a440cb98678f078a7c7c1")
    # response = requests.get("api.openweathermap.org/data/2.5/weather?q=houston&appid=d356074d2d6255803c9974a7ca75b175")
    # api.openweathermap.org/data/2.5/weather?q=London&appid=d356074d2d6255803c9974a7ca75b175

    # https://sandbox.iexapis.com/stable/stock/twtr/delayed-quote?token=Tsk_9980ed4d116a440cb98678f078a7c7c1
    return render_template('index.html')
    return response.content

if __name__ == '__main__':
    app.run()