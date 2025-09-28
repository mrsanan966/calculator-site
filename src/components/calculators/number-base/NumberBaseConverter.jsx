import React, { useState } from "react";
import { FaExchangeAlt, FaTrash, FaHistory } from "react-icons/fa";

const NumberBaseConverter = () => {
  const [number, setNumber] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const bases = [
    { value: "2", label: "Binary (Base-2)" },
    { value: "8", label: "Octal (Base-8)" },
    { value: "10", label: "Decimal (Base-10)" },
    { value: "16", label: "Hexadecimal (Base-16)" }
  ];

  const validateNumber = (num, base) => {
    const baseNum = parseInt(base);
    const validChars = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^\d+$/,
      16: /^[0-9A-Fa-f]+$/
    };

    if (!validChars[baseNum].test(num)) {
      return false;
    }
    return true;
  };

  const convertNumber = () => {
    if (!number || !fromBase || !toBase) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateNumber(number, fromBase)) {
      setError(`Invalid number for base-${fromBase}`);
      return;
    }

    try {
      // Convert to decimal first
      const decimalValue = parseInt(number, parseInt(fromBase));
      
      // Convert from decimal to target base
      let convertedValue;
      switch (toBase) {
        case "2":
          convertedValue = decimalValue.toString(2);
          break;
        case "8":
          convertedValue = decimalValue.toString(8);
          break;
        case "10":
          convertedValue = decimalValue.toString();
          break;
        case "16":
          convertedValue = decimalValue.toString(16).toUpperCase();
          break;
        default:
          throw new Error("Invalid target base");
      }

      setResult({
        number,
        fromBase,
        toBase,
        convertedValue
      });
      setError("");

      // Add to history
      setHistory(prev => [{
        calculation: `${number} (Base-${fromBase}) to Base-${toBase}`,
        result: convertedValue,
        timestamp: new Date().toLocaleString()
      }, ...prev].slice(0, 5));
    } catch (error) {
      setError("Conversion failed. Please check your input.");
    }
  };

  const swapBases = () => {
    setFromBase(toBase);
    setToBase(fromBase);
  };

  const clearAll = () => {
    setNumber("");
    setFromBase("10");
    setToBase("2");
    setResult(null);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number
          </label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter number"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Base
          </label>
          <select
            value={fromBase}
            onChange={(e) => setFromBase(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {bases.map((base) => (
              <option key={base.value} value={base.value}>
                {base.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Base
          </label>
          <select
            value={toBase}
            onChange={(e) => setToBase(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {bases.map((base) => (
              <option key={base.value} value={base.value}>
                {base.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={convertNumber}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Convert
        </button>
        <button
          onClick={swapBases}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
        >
          <FaExchangeAlt className="mr-2" />
          Swap Bases
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
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              {result.number} (Base-{result.fromBase}) = {result.convertedValue} (Base-{result.toBase})
            </p>
            <p className="text-sm text-gray-500">
              Decimal value: {parseInt(result.number, parseInt(result.fromBase))}
            </p>
          </div>
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

export default NumberBaseConverter; 