import React, { useState } from "react";
import { FaCalendarAlt, FaTrash, FaHistory, FaPlus, FaMinus } from "react-icons/fa";

const DateCalculator = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [calculationType, setCalculationType] = useState("difference"); // difference, add, subtract

  const calculateDateDifference = () => {
    if (!startDate || !endDate) {
      setError("Please enter both dates");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError("Start date cannot be after end date");
      return;
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const result = {
      years,
      months,
      days,
      totalDays: diffDays,
      totalWeeks: Math.floor(diffDays / 7),
      totalMonths: years * 12 + months,
      totalHours: diffDays * 24,
      totalMinutes: diffDays * 24 * 60
    };

    setResult(result);
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${startDate} to ${endDate}`,
      result: `${years} years, ${months} months, ${days} days`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const calculateDateOperation = (operation) => {
    if (!startDate) {
      setError("Please enter a start date");
      return;
    }

    const start = new Date(startDate);
    const days = parseInt(endDate) || 0;

    if (isNaN(days)) {
      setError("Please enter a valid number of days");
      return;
    }

    const result = new Date(start);
    if (operation === "add") {
      result.setDate(result.getDate() + days);
    } else {
      result.setDate(result.getDate() - days);
    }

    setResult({
      operation,
      startDate: start.toLocaleDateString(),
      days,
      resultDate: result.toLocaleDateString()
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${startDate} ${operation === "add" ? "+" : "-"} ${days} days`,
      result: result.toLocaleDateString(),
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setStartDate("");
    setEndDate("");
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
          onClick={() => setCalculationType("difference")}
          className={`px-4 py-2 rounded-md ${
            calculationType === "difference"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Date Difference
        </button>
        <button
          onClick={() => setCalculationType("add")}
          className={`px-4 py-2 rounded-md ${
            calculationType === "add"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Add Days
        </button>
        <button
          onClick={() => setCalculationType("subtract")}
          className={`px-4 py-2 rounded-md ${
            calculationType === "subtract"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Subtract Days
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {calculationType === "difference" ? "Start Date" : "Date"}
          </label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaCalendarAlt />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {calculationType === "difference" ? "End Date" : "Number of Days"}
          </label>
          <input
            type={calculationType === "difference" ? "date" : "number"}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={calculationType === "difference" ? "" : "Enter number of days"}
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        {calculationType === "difference" ? (
          <button
            onClick={calculateDateDifference}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Calculate Difference
          </button>
        ) : (
          <button
            onClick={() => calculateDateOperation(calculationType)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
          >
            {calculationType === "add" ? <FaPlus className="mr-2" /> : <FaMinus className="mr-2" />}
            {calculationType === "add" ? "Add Days" : "Subtract Days"}
          </button>
        )}
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Calculation Result</h3>
          {calculationType === "difference" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {result.years} years, {result.months} months, {result.days} days
                </p>
                <p className="text-sm text-gray-500 mt-1">Time difference</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Days:</span> {result.totalDays.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Weeks:</span> {result.totalWeeks.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Months:</span> {result.totalMonths.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Hours:</span> {result.totalHours.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Total Minutes:</span> {result.totalMinutes.toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-700">
                {result.startDate} {result.operation === "add" ? "+" : "-"} {result.days} days = {result.resultDate}
              </p>
            </div>
          )}
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

export default DateCalculator; 