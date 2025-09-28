import React, { useState } from "react";
import { FaTrash, FaHistory, FaWeight, FaRuler } from "react-icons/fa";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric"); // metric or imperial
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const calculateBMI = () => {
    if (!weight || !height) {
      setError("Please fill in all fields");
      return;
    }

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue)) {
      setError("Please enter valid numbers");
      return;
    }

    if (weightValue <= 0 || heightValue <= 0) {
      setError("Values must be greater than 0");
      return;
    }

    let bmi;
    if (unit === "metric") {
      // Weight in kg, height in meters
      bmi = weightValue / (heightValue * heightValue);
    } else {
      // Weight in pounds, height in inches
      bmi = (weightValue * 703) / (heightValue * heightValue);
    }

    const category = getBMICategory(bmi);

    setResult({
      bmi: bmi.toFixed(1),
      category,
      weight: weightValue,
      height: heightValue,
      unit
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${weightValue} ${unit === "metric" ? "kg" : "lbs"}, ${heightValue} ${unit === "metric" ? "m" : "in"}`,
      result: `BMI: ${bmi.toFixed(1)} (${category})`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const clearAll = () => {
    setWeight("");
    setHeight("");
    setResult(null);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setUnit("metric")}
          className={`px-4 py-2 rounded-md ${
            unit === "metric"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Metric (kg/m)
        </button>
        <button
          onClick={() => setUnit("imperial")}
          className={`px-4 py-2 rounded-md ${
            unit === "imperial"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Imperial (lbs/in)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter weight in ${unit === "metric" ? "kg" : "lbs"}`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaWeight />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height ({unit === "metric" ? "m" : "in"})
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter height in ${unit === "metric" ? "m" : "in"}`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaRuler />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={calculateBMI}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate BMI
        </button>
        <button
          onClick={clearAll}
          className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
        >
          <FaTrash className="mr-2" />
          Clear
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {result && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">BMI Result</h3>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {result.bmi}
              </p>
              <p className="text-lg font-medium text-gray-700">
                {result.category}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Weight:</span> {result.weight} {result.unit === "metric" ? "kg" : "lbs"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Height:</span> {result.height} {result.unit === "metric" ? "m" : "in"}
              </p>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <h4 className="font-medium text-blue-800 mb-2">BMI Categories:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>Underweight: BMI less than 18.5</li>
                <li>Normal weight: BMI 18.5 to 24.9</li>
                <li>Overweight: BMI 25 to 29.9</li>
                <li>Obese: BMI 30 or higher</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold flex items-center">
              <FaHistory className="mr-2" />
              Calculation History
            </h3>
            <button
              onClick={clearHistory}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Clear History
            </button>
          </div>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600"
              >
                <div>{item.calculation}</div>
                <div>Result: {item.result}</div>
                <div className="text-xs text-gray-400">{item.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator; 