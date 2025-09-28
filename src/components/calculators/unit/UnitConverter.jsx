import React, { useState } from "react";
import { FaExchangeAlt, FaTrash, FaHistory } from "react-icons/fa";

const UnitConverter = () => {
  const [fromValue, setFromValue] = useState("");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("length"); // length, weight, temperature, etc.

  const unitCategories = {
    length: {
      units: ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"],
      conversions: {
        meter: {
          kilometer: 0.001,
          centimeter: 100,
          millimeter: 1000,
          inch: 39.3701,
          foot: 3.28084,
          yard: 1.09361,
          mile: 0.000621371
        }
      }
    },
    weight: {
      units: ["kilogram", "gram", "milligram", "pound", "ounce"],
      conversions: {
        kilogram: {
          gram: 1000,
          milligram: 1000000,
          pound: 2.20462,
          ounce: 35.274
        }
      }
    },
    temperature: {
      units: ["celsius", "fahrenheit", "kelvin"],
      conversions: {
        celsius: {
          fahrenheit: (value) => (value * 9/5) + 32,
          kelvin: (value) => value + 273.15
        }
      }
    },
    volume: {
      units: ["liter", "milliliter", "cubic meter", "gallon", "quart", "pint", "cup"],
      conversions: {
        liter: {
          milliliter: 1000,
          "cubic meter": 0.001,
          gallon: 0.264172,
          quart: 1.05669,
          pint: 2.11338,
          cup: 4.22675
        }
      }
    }
  };

  const convertValue = () => {
    if (!fromValue || !fromUnit || !toUnit) {
      setError("Please fill in all fields");
      return;
    }

    const value = parseFloat(fromValue);
    if (isNaN(value)) {
      setError("Please enter a valid number");
      return;
    }

    let convertedValue;
    const categoryData = unitCategories[category];

    if (category === "temperature") {
      // Special handling for temperature conversions
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        convertedValue = (value * 9/5) + 32;
      } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        convertedValue = (value - 32) * 5/9;
      } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        convertedValue = value + 273.15;
      } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        convertedValue = value - 273.15;
      } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
        convertedValue = ((value - 32) * 5/9) + 273.15;
      } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
        convertedValue = ((value - 273.15) * 9/5) + 32;
      }
    } else {
      // Handle other unit conversions
      const conversionFactor = categoryData.conversions[fromUnit][toUnit];
      convertedValue = value * conversionFactor;
    }

    setResult({
      fromValue,
      fromUnit,
      toUnit,
      convertedValue: convertedValue.toFixed(4)
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${fromValue} ${fromUnit} to ${toUnit}`,
      result: `${convertedValue.toFixed(4)} ${toUnit}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const clearAll = () => {
    setFromValue("");
    setFromUnit("");
    setToUnit("");
    setResult(null);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4 mb-6">
        {Object.keys(unitCategories).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-md capitalize ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          <input
            type="number"
            step="any"
            value={fromValue}
            onChange={(e) => setFromValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter value"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Unit
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select unit</option>
            {unitCategories[category].units.map((unit) => (
              <option key={unit} value={unit} className="capitalize">
                {unit}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Unit
          </label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select unit</option>
            {unitCategories[category].units.map((unit) => (
              <option key={unit} value={unit} className="capitalize">
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={convertValue}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Convert
        </button>
        <button
          onClick={swapUnits}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <FaExchangeAlt className="mr-2" />
          Swap Units
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Conversion Result</h3>
          <p className="text-lg font-medium text-gray-700">
            {result.fromValue} {result.fromUnit} = {result.convertedValue} {result.toUnit}
          </p>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold flex items-center">
              <FaHistory className="mr-2" />
              Conversion History
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

export default UnitConverter; 