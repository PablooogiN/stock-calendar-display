from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def hello_world():
    response = requests.get("https://sandbox.iexapis.com/stable/stock/twtr/quote/latestPrice?token=Tsk_9980ed4d116a440cb98678f078a7c7c1")
    # return render_template('index.html', response=response)
    return response.content

if __name__ == '__main__':
    app.run()