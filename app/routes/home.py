from flask import request, render_template
from app import app
from ..ml_model import inference

@app.route("/", methods = ['GET'])
def home():
    return render_template('index.html')

@app.route("/predict", methods = ['POST'])
def predict():
    estimated_price = 0
    model = inference.load()
    form = request.form
    estimated_price = inference.predict(
        form['bed'],
        form['sqft'],
        form['bath'],
        form['balcony'],
        form['loc'],
        model
    )

    return {
        'pred_res' : estimated_price * 100000
    } 
