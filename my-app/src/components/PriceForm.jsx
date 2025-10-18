import React, { useState } from "react";
import axios from "axios";
import "./PriceFormStyles.css"; // External CSS file

const PriceForm = () => {
  const [formData, setFormData] = useState({
    battery_power: 0,
    blue: 0,
    clock_speed: 0,
    dual_sim: 0,
    fc: 0,
    four_g: 0,
    int_memory: 0,
    m_dep: 0,
    mobile_wt: 0,
    n_cores: 0,
    pc: 0,
    px_height: 0,
    px_width: 0,
    ram: 0,
    sc_h: 0,
    sc_w: 0,
    talk_time: 0,
    three_g: 0,
    touch_screen: 0,
    wifi: 0,
  });

  const [prediction, setPrediction] = useState(null);

  const priceLabels = [
    { label: "Low-end", price: "Under 10,000", color: "green" },
    { label: "Mid-low", price: "10,000 - 20,000", color: "blue" },
    { label: "Mid-high", price: "20,000 - 30,000", color: "orange" },
    { label: "High-end", price: "Above 30,000", color: "red" },
  ];

  const descriptions = {
    battery_power: "Battery capacity in mAh (e.g., 4000)",
    blue: "Bluetooth available? (1 = Yes, 0 = No)",
    clock_speed: "Processor speed in GHz (e.g., 2.5)",
    dual_sim: "Supports dual SIM? (1 = Yes, 0 = No)",
    fc: "Front camera megapixels (e.g., 8)",
    four_g: "4G supported? (1 = Yes, 0 = No)",
    int_memory: "Internal memory in GB (e.g., 64)",
    m_dep: "Mobile depth in cm (e.g., 0.8)",
    mobile_wt: "Weight of the mobile in grams (e.g., 180)",
    n_cores: "Number of CPU cores (e.g., 8)",
    pc: "Primary camera megapixels (e.g., 48)",
    px_height: "Pixel height of the display (e.g., 1920)",
    px_width: "Pixel width of the display (e.g., 1080)",
    ram: "RAM in MB (e.g., 4000 = 4GB)",
    sc_h: "Screen height in cm (e.g., 14)",
    sc_w: "Screen width in cm (e.g., 7)",
    talk_time: "Battery talk time in hours (e.g., 20)",
    three_g: "3G supported? (1 = Yes, 0 = No)",
    touch_screen: "Touch screen available? (1 = Yes, 0 = No)",
    wifi: "WiFi supported? (1 = Yes, 0 = No)",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const inputData = {};
    Object.keys(formData).forEach((key) => {
      inputData[key] = Number(formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        inputData
      );
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check server/API.");
    }
  };

  return (
    <div className="price-form-container">
      <h2>📱 Mobile Price Prediction</h2>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} className="input-group">
            <label>
              {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </label>
            <input
              type="number"
              name={key}
              value={formData[key]}
              onChange={(e) =>
                setFormData({ ...formData, [key]: Number(e.target.value) })
              }
              placeholder={`Enter ${key.replace(/_/g, " ")}`}
            />
            <small>{descriptions[key]}</small>
          </div>
        ))}

        <button type="submit">Predict Price Range</button>
      </form>

      {prediction !== null && (
        <div
          className="prediction-box"
          style={{ backgroundColor: priceLabels[prediction].color }}
        >
          Predicted Price Range: {priceLabels[prediction].label} (
          {priceLabels[prediction].price})
        </div>
      )}
    </div>
  );
};

export default PriceForm;
