import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load CSVs
train = pd.read_csv("train.csv")
test = pd.read_csv("test.csv")

# --- TRAIN DATA ---
# Drop price_range only (id is not present in train.csv)
X = train.drop(columns=['price_range'])
y = train['price_range']

# --- SPLIT DATA ---
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# --- TRAIN MODEL ---
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# --- VALIDATION ---
y_pred = model.predict(X_val)
print("Validation Accuracy:", accuracy_score(y_val, y_pred))
print(classification_report(y_val, y_pred))

# --- TEST DATA ---
# Drop 'id' from test before prediction
X_test = test.drop(columns=['id'])
test_predictions = model.predict(X_test)

# --- SAVE OUTPUT ---
output = pd.DataFrame({
    'id': test['id'],  # Keep id so we know which row is which
    'price_range': test_predictions
})
output.to_csv("submission.csv", index=False)
print("✅ Predictions saved to submission.csv")

# Save the model
joblib.dump(model, "model.pkl")
print("Model saved as model.pkl")