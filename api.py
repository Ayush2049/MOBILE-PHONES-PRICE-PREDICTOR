from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the model
model = joblib.load("model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print("Data received:", data)  # Debug
        df = pd.DataFrame([data])
        prediction = model.predict(df)
        return jsonify({"prediction": int(prediction[0])})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
