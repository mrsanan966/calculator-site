import React, { useState } from "react";
import { FaPlus, FaMinus, FaEquals, FaTrash, FaPercentage } from "react-icons/fa";

const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [calculationType, setCalculationType] = useState("percentage-of"); // percentage-of, increase, decrease

  const handleValueChange = (e) => {
    setValue(e.target.value);
    setError("");
  };

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
    setError("");
  };

  const calculatePercentage = () => {
    if (!value || !percentage) {
      setError("Please enter both values");
      return;
    }

    const numValue = parseFloat(value);
    const numPercentage = parseFloat(percentage);
    let calculatedResult;
    let operation;

    switch (calculationType) {
      case "percentage-of":
        calculatedResult = (numValue * numPercentage) / 100;
        operation = `${numPercentage}% of ${numValue}`;
        break;
      case "increase":
        calculatedResult = numValue * (1 + numPercentage / 100);
        operation = `${numValue} increased by ${numPercentage}%`;
        break;
      case "decrease":
        calculatedResult = numValue * (1 - numPercentage / 100);
        operation = `${numValue} decreased by ${numPercentage}%`;
        break;
      default:
        return;
    }

    setResult(calculatedResult.toFixed(2));
    
    // Add to history
    setHistory(prev => [{
      calculation: `${operation} = ${calculatedResult.toFixed(2)}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setValue("");
    setPercentage("");
    setResult("");
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setCalculationType("percentage-of")}
          className={`px-4 py-2 rounded-md ${
            calculationType === "percentage-of"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Percentage of
        </button>
        <button
          onClick={() => setCalculationType("increase")}
          className={`px-4 py-2 rounded-md ${
            calculationType === "increase"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Increase by
        </button>
        <button
          onClick={() => setCalculationType("decrease")}
          className={`px-4 py-2 rounded-md ${
            calculationType === "decrease"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Decrease by
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {calculationType === "percentage-of" ? "Value" : "Original Value"}
          </label>
          <input
            type="number"
            step="any"
            value={value}
            onChange={handleValueChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Percentage
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={percentage}
              onChange={handlePercentageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter percentage"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaPercentage />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={calculatePercentage}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
        >
          <FaEquals className="mr-2" />
          Calculate
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
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-lg font-semibold text-gray-700">
            Result: {result}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Calculation History</h3>
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
                <div className="text-xs text-gray-400">{item.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentageCalculator; 