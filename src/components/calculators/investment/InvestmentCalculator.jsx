import React, { useState } from "react";
import { FaTrash, FaHistory, FaMoneyBillWave, FaCalendarAlt, FaPercent, FaChartLine } from "react-icons/fa";

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [investmentPeriod, setInvestmentPeriod] = useState("");
  const [periodUnit, setPeriodUnit] = useState("years"); // years or months
  const [compoundingFrequency, setCompoundingFrequency] = useState("monthly"); // monthly, quarterly, annually
  const [inflationRate, setInflationRate] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const calculateInvestment = () => {
    if (!initialInvestment || !annualReturn || !investmentPeriod) {
      setError("Please fill in all required fields");
      return;
    }

    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) / 100; // Convert to decimal
    let period = parseFloat(investmentPeriod);
    const inflation = parseFloat(inflationRate) || 0;

    if (isNaN(initial) || isNaN(rate) || isNaN(period)) {
      setError("Please enter valid numbers");
      return;
    }

    if (initial < 0 || rate < 0 || period <= 0) {
      setError("Values must be greater than 0");
      return;
    }

    // Convert period to months if in years
    if (periodUnit === "years") {
      period *= 12;
    }

    // Calculate number of compounding periods per year
    let compoundsPerYear;
    switch (compoundingFrequency) {
      case "monthly":
        compoundsPerYear = 12;
        break;
      case "quarterly":
        compoundsPerYear = 4;
        break;
      case "annually":
        compoundsPerYear = 1;
        break;
      default:
        compoundsPerYear = 12;
    }

    // Calculate periodic interest rate
    const periodicRate = rate / compoundsPerYear;
    const numberOfPeriods = period;

    // Calculate future value of initial investment
    const futureValueInitial = initial * Math.pow(1 + periodicRate, numberOfPeriods);

    // Calculate future value of monthly contributions
    let futureValueContributions = 0;
    if (monthly > 0) {
      const monthlyRate = rate / 12;
      futureValueContributions = monthly * ((Math.pow(1 + monthlyRate, numberOfPeriods) - 1) / monthlyRate);
    }

    // Calculate total future value
    const totalFutureValue = futureValueInitial + futureValueContributions;

    // Calculate total contributions
    const totalContributions = initial + (monthly * numberOfPeriods);

    // Calculate total interest earned
    const totalInterest = totalFutureValue - totalContributions;

    // Calculate inflation-adjusted future value
    const inflationAdjustedValue = totalFutureValue / Math.pow(1 + (inflation / 100), period / 12);

    // Generate growth projection
    const projection = [];
    let balance = initial;
    let year = 1;

    while (year <= Math.ceil(period / 12)) {
      const yearEndBalance = balance * Math.pow(1 + rate, 1) + (monthly * 12);
      const yearContributions = monthly * 12;
      const yearInterest = yearEndBalance - balance - yearContributions;

      projection.push({
        year,
        balance: balance.toFixed(2),
        contributions: yearContributions.toFixed(2),
        interest: yearInterest.toFixed(2),
        total: yearEndBalance.toFixed(2)
      });

      balance = yearEndBalance;
      year++;
    }

    setResult({
      initialInvestment: initial,
      monthlyContribution: monthly,
      annualReturn: rate * 100,
      investmentPeriod: period,
      periodUnit,
      compoundingFrequency,
      inflationRate: inflation,
      totalFutureValue: totalFutureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      inflationAdjustedValue: inflationAdjustedValue.toFixed(2),
      projection
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `$${initial.toLocaleString()} initial, $${monthly.toLocaleString()}/month, ${(rate * 100).toFixed(2)}% return for ${period} ${periodUnit}`,
      result: `Future Value: $${totalFutureValue.toFixed(2)}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setInitialInvestment("");
    setMonthlyContribution("");
    setAnnualReturn("");
    setInvestmentPeriod("");
    setInflationRate("");
    setResult(null);
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
            Initial Investment ($)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter initial investment"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaMoneyBillWave />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Monthly Contribution ($)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter monthly contribution"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaChartLine />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Annual Return (%)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter expected annual return"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaPercent />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Investment Period
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <input
                type="number"
                step="any"
                value={investmentPeriod}
                onChange={(e) => setInvestmentPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter investment period"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaCalendarAlt />
              </div>
            </div>
            <select
              value={periodUnit}
              onChange={(e) => setPeriodUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Compounding Frequency
          </label>
          <select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Inflation Rate (%)
          </label>
          <input
            type="number"
            step="any"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expected inflation rate"
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={calculateInvestment}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate Investment
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">
                Future Value: ${result.totalFutureValue}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total Contributions:</span> ${result.totalContributions}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total Interest Earned:</span> ${result.totalInterest}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Inflation-Adjusted Value:</span> ${result.inflationAdjustedValue}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Compounding Frequency:</span> {result.compoundingFrequency}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Investment Period:</span> {result.investmentPeriod} {result.periodUnit}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-2">Growth Projection</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Starting Balance</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributions</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Earned</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.projection.map((row) => (
                    <tr key={row.year}>
                      <td className="px-4 py-2 text-sm text-gray-500">{row.year}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.balance}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.contributions}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.interest}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

export default InvestmentCalculator; 