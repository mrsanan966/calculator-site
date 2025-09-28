import React, { useState } from "react";
import { FaTrash, FaHistory, FaMoneyBillWave, FaCalendarAlt, FaPercent, FaChartLine } from "react-icons/fa";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [termUnit, setTermUnit] = useState("years"); // years or months
  const [paymentFrequency, setPaymentFrequency] = useState("monthly"); // monthly, bi-weekly, weekly
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const calculateLoan = () => {
    if (!loanAmount || !interestRate || !loanTerm) {
      setError("Please fill in all required fields");
      return;
    }

    const amount = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100; // Convert to decimal
    let term = parseFloat(loanTerm);

    if (isNaN(amount) || isNaN(rate) || isNaN(term)) {
      setError("Please enter valid numbers");
      return;
    }

    if (amount <= 0 || rate <= 0 || term <= 0) {
      setError("Values must be greater than 0");
      return;
    }

    // Convert term to months if in years
    if (termUnit === "years") {
      term *= 12;
    }

    // Calculate number of payments per year based on frequency
    let paymentsPerYear;
    switch (paymentFrequency) {
      case "monthly":
        paymentsPerYear = 12;
        break;
      case "bi-weekly":
        paymentsPerYear = 26;
        break;
      case "weekly":
        paymentsPerYear = 52;
        break;
      default:
        paymentsPerYear = 12;
    }

    // Calculate periodic interest rate
    const periodicRate = rate / paymentsPerYear;
    const numberOfPayments = term;

    // Calculate payment amount
    const payment = amount * (periodicRate * Math.pow(1 + periodicRate, numberOfPayments)) /
      (Math.pow(1 + periodicRate, numberOfPayments) - 1);

    // Generate amortization schedule
    const schedule = [];
    let balance = amount;
    let totalInterest = 0;
    let totalPrincipal = 0;

    for (let paymentNumber = 1; paymentNumber <= numberOfPayments; paymentNumber++) {
      const interestPayment = balance * periodicRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      totalInterest += interestPayment;
      totalPrincipal += principalPayment;

      // Add to schedule if it's a year-end payment or the last payment
      if (paymentNumber % paymentsPerYear === 0 || paymentNumber === numberOfPayments) {
        schedule.push({
          paymentNumber,
          payment: payment.toFixed(2),
          principal: principalPayment.toFixed(2),
          interest: interestPayment.toFixed(2),
          balance: Math.max(0, balance).toFixed(2)
        });
      }
    }

    // Calculate loan end date if start date is provided
    let endDate = "";
    if (startDate) {
      const start = new Date(startDate);
      const monthsToAdd = term;
      const end = new Date(start);
      end.setMonth(end.getMonth() + monthsToAdd);
      endDate = end.toISOString().split('T')[0];
    }

    setResult({
      loanAmount: amount,
      interestRate: rate * 100,
      loanTerm: term,
      termUnit,
      paymentFrequency,
      startDate,
      endDate,
      payment: payment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPrincipal: totalPrincipal.toFixed(2),
      totalCost: (totalInterest + totalPrincipal).toFixed(2),
      numberOfPayments,
      schedule
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `$${amount.toLocaleString()} loan, ${(rate * 100).toFixed(2)}% for ${term} ${termUnit}`,
      result: `Payment: $${payment.toFixed(2)}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setStartDate("");
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
            Loan Amount ($)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter loan amount"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaMoneyBillWave />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interest rate"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaPercent />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Term
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <input
                type="number"
                step="any"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter loan term"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <FaCalendarAlt />
              </div>
            </div>
            <select
              value={termUnit}
              onChange={(e) => setTermUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="years">Years</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Frequency
          </label>
          <select
            value={paymentFrequency}
            onChange={(e) => setPaymentFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="monthly">Monthly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={calculateLoan}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate Loan
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Loan Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">
                Payment Amount: ${result.payment}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Loan Amount:</span> ${result.loanAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Interest Rate:</span> {result.interestRate.toFixed(2)}%
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Loan Term:</span> {result.loanTerm} {result.termUnit}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment Frequency:</span> {result.paymentFrequency}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Number of Payments:</span> {result.numberOfPayments}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total Interest:</span> ${result.totalInterest}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total Cost:</span> ${result.totalCost}
              </p>
            </div>
          </div>

          {result.startDate && result.endDate && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Start Date:</span> {result.startDate}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">End Date:</span> {result.endDate}
              </p>
            </div>
          )}

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-2">Amortization Schedule</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment #</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.schedule.map((row) => (
                    <tr key={row.paymentNumber}>
                      <td className="px-4 py-2 text-sm text-gray-500">{row.paymentNumber}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.payment}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.principal}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.interest}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.balance}</td>
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

export default LoanCalculator;
  