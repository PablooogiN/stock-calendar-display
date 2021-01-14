from flask import Flask, render_template
import requests
import os

app = Flask(__name__)

@app.route('/')
def hello_world():

    # Write the stock ticker symbol for the 12 stocks you want to track
    stockList = ["spy", "qqq","abnb","crsr","mu","rcl","ccl","nclh","ual","ba","nvda","abcl"]
    IEX_DEBUG_API_KEY = os.environ.get("IEX_DEBUG_API_KEY")
    API_KEYS = {'IEX_DEBUG_API_KEY': IEX_DEBUG_API_KEY}

    # response = requests.get("https://sandbox.iexapis.com/stable/stock/twtr/quote/latestPrice?token=Tsk_9980ed4d116a440cb98678f078a7c7c1")
    # response = requests.get("api.openweathermap.org/data/2.5/weather?q=houston&appid=d356074d2d6255803c9974a7ca75b175")
    # api.openweathermap.org/data/2.5/weather?q=London&appid=d356074d2d6255803c9974a7ca75b175

    # latest price -> price
    # change percent -> day percent change

    return render_template('index.html', stockList=stockList, API_KEYS=API_KEYS)

if __name__ == '__main__':
    app.run()