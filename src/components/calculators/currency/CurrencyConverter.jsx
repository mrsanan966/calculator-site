import React, { useState, useEffect } from "react";
import { FaExchangeAlt, FaTrash, FaHistory, FaSync } from "react-icons/fa";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const popularCurrencies = [
    "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "INR", "SGD"
  ];

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
      const data = await response.json();
      setRates(data.rates);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      setError("Failed to fetch exchange rates. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const convertCurrency = () => {
    if (!amount || !fromCurrency || !toCurrency) {
      setError("Please fill in all fields");
      return;
    }

    const value = parseFloat(amount);
    if (isNaN(value)) {
      setError("Please enter a valid number");
      return;
    }

    if (!rates) {
      setError("Exchange rates not available. Please try again later.");
      return;
    }

    // Convert to USD first (base currency)
    const amountInUSD = value / rates[fromCurrency];
    // Convert from USD to target currency
    const convertedAmount = amountInUSD * rates[toCurrency];

    setResult({
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount: convertedAmount.toFixed(2)
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${amount} ${fromCurrency} to ${toCurrency}`,
      result: `${convertedAmount.toFixed(2)} ${toCurrency}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const clearAll = () => {
    setAmount("");
    setFromCurrency("USD");
    setToCurrency("EUR");
    setResult(null);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Currency Converter</h3>
        <button
          onClick={fetchRates}
          className="text-sm text-blue-500 hover:text-blue-600 flex items-center"
          disabled={loading}
        >
          <FaSync className={`mr-2 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Updating..." : "Update Rates"}
        </button>
      </div>

      {lastUpdated && (
        <p className="text-sm text-gray-500">
          Last updated: {lastUpdated}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Currency
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {popularCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Currency
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {popularCurrencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={convertCurrency}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          Convert
        </button>
        <button
          onClick={swapCurrencies}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
          disabled={loading}
        >
          <FaExchangeAlt className="mr-2" />
          Swap Currencies
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
            {result.amount} {result.fromCurrency} = {result.convertedAmount} {result.toCurrency}
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

export default CurrencyConverter; 