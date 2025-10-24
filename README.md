# 📱 Mobile Price Range Prediction — ML Model + Flask API

This project predicts the **price range of mobile phones** using a trained **Random Forest Classifier** model.  
It uses the **Mobile Price Classification Dataset** to classify phones into 4 categories (0–3) based on their specifications like RAM, battery, camera, etc.  

A **Flask-based REST API** is also provided to make real-time predictions via JSON input.  

---



# 📱 Mobile Price Range Prediction

> Machine Learning model with Flask REST API for predicting mobile phone price categories based on hardware specifications

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green.svg)](https://flask.palletsprojects.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-latest-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](https://github.com/Ayush2049)

---

## 🖼️ Project Preview

| Example 1 | Example 2 |
|------------|------------|
| ![Example 1](https://github.com/Ayush2049/MOBILE-PHONES-PRICE-PREDICTOR/blob/4647bb89cc227799ce94bc1b12b7e34cbe94e528/project-instances/ex1.png) | ![Example 2](https://github.com/Ayush2049/MOBILE-PHONES-PRICE-PREDICTOR/blob/4647bb89cc227799ce94bc1b12b7e34cbe94e528/project-instances/ex2.png) |

---

## 🎯 Overview

This project implements a **Random Forest Classifier** to predict mobile phone price ranges based on technical specifications. The model categorizes phones into four distinct price categories using features like RAM, battery capacity, processor speed, and camera quality.


---

## ✨ Features

- 🤖 **Random Forest Classifier** with ~95% training accuracy
- 🌐 **RESTful API** built with Flask for real-time predictions
- 📊 **Comprehensive evaluation metrics** and classification reports
- 🔄 **CORS enabled** for cross-origin requests
- 📁 **CSV export** functionality for batch predictions
- 🎯 **20 feature inputs** including RAM, battery, camera specs, and connectivity

---

## 📂 Project Structure
```
MOBILE-PRICE-PREDICTION/
│
├── 📄 app.py                  # Flask REST API server
├── 🧠 model.pkl               # Trained Random Forest model
├── 📊 train.csv               # Training dataset
├── 📊 test.csv                # Test dataset
├── 📋 submission.csv          # Prediction output file
├── 🐍 train_model.py          # Model training script
├── 📦 requirements.txt        # Python dependencies
└── 📖 README.md               # Documentation
```

---

## 📂 Dataset link : https://www.kaggle.com/datasets/iabhishekofficial/mobile-price-classification

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Git

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Ayush2049/MOBILE-PRICE-PREDICTION.git
cd MOBILE-PRICE-PREDICTION
```

**2. Create and activate virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

**3. Install dependencies**
```bash
pip install -r requirements.txt
```

---

## 📦 Dependencies
```txt
Flask>=2.0.0
flask-cors>=3.0.10
pandas>=1.3.0
joblib>=1.0.0
scikit-learn>=1.0.0
numpy>=1.21.0
```

---


## 🌐 Running the Flask API

Start the API server:
```bash
python app.py
```

---

## 🎯 Model Performance

- **Algorithm:** Random Forest Classifier
- **Training Accuracy:** ~95%
- **Validation Accuracy:** ~93%
- **Dataset Source:** Mobile Price Classification Dataset (Kaggle)
- **Target Variable:** `price_range` (0-3)
- **Features:** 20 technical specifications

---

## 🔄 Workflow Pipeline
```
📥 Load Data (train.csv & test.csv)
         ↓
🧹 Preprocess (Remove ID column)
         ↓
🎓 Train Random Forest Model
         ↓
📊 Evaluate Performance Metrics
         ↓
💾 Save Model (model.pkl)
         ↓
🔮 Generate Predictions (test.csv)
         ↓
📁 Export Results (submission.csv)
         ↓
🌐 Deploy Flask API
```


---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Ayush Sharma](https://github.com/Ayush2049)

</div>
