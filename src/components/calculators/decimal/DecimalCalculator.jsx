import React, { useState } from "react";
import { FaPlus, FaMinus, FaTimes, FaDivide, FaEquals, FaTrash } from "react-icons/fa";

const DecimalCalculator = () => {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const handleNumberChange = (e, isFirst) => {
    const value = e.target.value;
    if (isFirst) {
      setFirstNumber(value);
    } else {
      setSecondNumber(value);
    }
    setError("");
  };

  const handleOperation = (op) => {
    if (!firstNumber || !secondNumber) {
      setError("Please enter both numbers");
      return;
    }

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    let calculatedResult;

    switch (op) {
      case "+":
        calculatedResult = num1 + num2;
        break;
      case "-":
        calculatedResult = num1 - num2;
        break;
      case "×":
        calculatedResult = num1 * num2;
        break;
      case "÷":
        if (num2 === 0) {
          setError("Cannot divide by zero");
          return;
        }
        calculatedResult = num1 / num2;
        break;
      default:
        return;
    }

    setOperation(op);
    setResult(calculatedResult.toFixed(6));
    
    // Add to history
    setHistory(prev => [{
      calculation: `${num1} ${op} ${num2} = ${calculatedResult.toFixed(6)}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setFirstNumber("");
    setSecondNumber("");
    setOperation("");
    setResult("");
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Number
          </label>
          <input
            type="number"
            step="any"
            value={firstNumber}
            onChange={(e) => handleNumberChange(e, true)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Second Number
          </label>
          <input
            type="number"
            step="any"
            value={secondNumber}
            onChange={(e) => handleNumberChange(e, false)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter second number"
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => handleOperation("+")}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title="Add"
        >
          <FaPlus />
        </button>
        <button
          onClick={() => handleOperation("-")}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title="Subtract"
        >
          <FaMinus />
        </button>
        <button
          onClick={() => handleOperation("×")}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title="Multiply"
        >
          <FaTimes />
        </button>
        <button
          onClick={() => handleOperation("÷")}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title="Divide"
        >
          <FaDivide />
        </button>
        <button
          onClick={clearAll}
          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          title="Clear"
        >
          <FaTrash />
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {result && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-lg font-semibold text-gray-700">
            {firstNumber} {operation} {secondNumber} = {result}
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

export default DecimalCalculator; 