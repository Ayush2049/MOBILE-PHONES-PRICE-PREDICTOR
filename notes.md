Here’s a **complete documentation** for your Mobile Price Prediction project with the current MERN + Python ML setup. I’ve structured it so it’s clear and beginner-friendly.

---

# **Mobile Price Prediction Web App Documentation**

## **1. Project Overview**

This project predicts the **price range of a mobile phone** based on its specifications using a **machine learning model**.

- **Goal:** Allow users to input mobile features and predict if it belongs to low-end, mid-low, mid-high, or high-end price range.
- **Tech Stack:**

  - **Frontend:** React.js
  - **Backend:** Node.js + Express.js
  - **ML API:** Python + Flask
  - **ML Model:** RandomForestClassifier trained on Kaggle mobile dataset

---

## **2. Dataset**

**Training dataset fields:**

```
battery_power, blue, clock_speed, dual_sim, fc, four_g, int_memory, m_dep, mobile_wt,
n_cores, pc, px_height, px_width, ram, sc_h, sc_w, talk_time, three_g, touch_screen, wifi, price_range
```

- `price_range` (target) has 4 categories:

  - 0 → Low-end (Under 10,000)
  - 1 → Mid-low (10,000 - 20,000)
  - 2 → Mid-high (20,000 - 30,000)
  - 3 → High-end (Above 30,000)

- The **test dataset** contains the same features except `price_range`.

---

## **3. Machine Learning Model**

### **3.1 Model Training**

- **Algorithm:** `RandomForestClassifier` (or any classifier used)
- **Steps:**

  1. Load dataset using `pandas`.
  2. Split into features (`X`) and target (`y` = `price_range`).
  3. Train-test split (`train_test_split` from sklearn).
  4. Train model:

     ```python
     from sklearn.ensemble import RandomForestClassifier
     model = RandomForestClassifier(max_depth=2, random_state=100)
     model.fit(X_train, y_train)
     ```

  5. Evaluate using `accuracy_score`, `precision`, `recall`, `f1_score`.

### **3.2 Saving the Model**

```python
import joblib
joblib.dump(model, "model.pkl")
```

- Saves the trained model for later use in Python API.

---

## **4. Python API**

### **4.1 Setup**

- **Framework:** Flask
- **Port:** 5000
- **Dependencies:** `Flask`, `joblib`, `pandas`, `sklearn`
- **File:** `api.py`

### **4.2 API Flow**

1. **Load the model:**

```python
import joblib
model = joblib.load("model.pkl")
```

2. **Define `/predict` POST route**:

```python
from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()  # Receive JSON from frontend/backend
    # Convert data to dataframe
    df = pd.DataFrame([data])
    # Make prediction
    pred = model.predict(df)[0]
    return jsonify({"prediction": int(pred)})

if __name__ == "__main__":
    app.run(port=5000)
```

- **Input:** JSON with **all features** used in training.
- **Output:** `{ "prediction": 1 }` (numeric price range).

### **4.3 Important Notes**

- **All features must be included**. Missing columns will cause errors because `sklearn` expects the same columns as during training.
- Flask runs on **port 5000**.

---

## **5. Node.js Backend**

### **5.1 Setup**

- **Framework:** Express.js
- **Port:** 3000
- **Dependencies:** `express`, `cors`, `axios`
- **File:** `server.js`

### **5.2 API Flow**

1. React frontend sends **user input** to Node.js backend (`POST /predict`).
2. Node.js backend **forwards request** to Python Flask API:

```javascript
const response = await axios.post("http://127.0.0.1:5000/predict", req.body);
```

3. Python API returns prediction → Node.js forwards it back to React.

**Flow:**

```
React Frontend → Node.js/Express → Python/Flask API → ML Model → Response back → Frontend
```

---

## **6. React Frontend**

### **6.1 Features**

- Form with **20 input fields** corresponding to mobile specifications.
- Converts input strings to **numbers** before sending.
- Sends POST request to Node.js backend at `http://localhost:3000/predict`.
- Displays **human-readable price range** with **color-coded box**:

```javascript
const priceLabels = [
  { label: "Low-end", price: "Under 10,000", color: "green" },
  { label: "Mid-low", price: "10,000 - 20,000", color: "blue" },
  { label: "Mid-high", price: "20,000 - 30,000", color: "orange" },
  { label: "High-end", price: "Above 30,000", color: "red" },
];
```

- React runs on **port 3000 (default for create-react-app)**.

---

## **7. Ports and Communication**

| Component        | Port | Role                                          |
| ---------------- | ---- | --------------------------------------------- |
| React Frontend   | 3000 | User interface, form input, display result    |
| Node.js Backend  | 3000 | Accepts frontend requests, forwards to Python |
| Python Flask API | 5000 | Loads ML model, predicts, returns JSON        |

> **Note:** React can run on 3000, Node.js backend can also run on 3001 if you want to avoid conflict. Frontend just needs to call correct backend URL.

---

## **8. Challenges**

1. **All fields must be sent from frontend**:

   - Sklearn model expects **exact feature names** as during training.
   - Missing or extra columns will throw errors.

2. **Data type consistency**:

   - HTML inputs return **strings**; Python model expects **numeric values** → conversion needed in React.

3. **CORS issues**:

   - React → Node.js → Python requires proper CORS handling in both Node.js and Flask.

---

## **9. Running the Project**

### **9.1 Python API**

```bash
first enter in venv
pip install flask pandas scikit-learn joblib
pip install flask-cors
python api.py
```

### **9.2 Node.js Backend**

```bash
cd node-js-backend
npm install express axios cors
node server.js
```

### **9.3 React Frontend**

```bash
cd my-app
npm install axios
npm run dev
```

---

## **10. Testing**

- Use **Postman** to test Python API directly:

```
POST http://127.0.0.1:5000/predict
Content-Type: application/json

{
  "battery_power": 842,
  "blue": 0,
  "clock_speed": 2.2,
  ...
  "wifi": 1
}
```

- Response example:

```json
{
  "prediction": 1
}
```

- Frontend maps it to **Mid-low (10,000 - 20,000)** with a **blue box**.

---

## **11. Future Enhancements**

- Display **approximate price in INR** instead of category.
- Add **form validation** for invalid or missing inputs.
- Enhance UI for better UX.
- Save **user history** with predicted prices.

---

If you want, I can also make a **diagram showing the full API flow** with React → Node → Python → ML Model → Frontend. It will make the documentation more visual.

Do you want me to do that?
