import React, { useState, useEffect } from 'react';
import { FaTrash, FaHistory, FaMoneyBillWave, FaCalendarAlt, FaPercent, FaChartLine, FaHome } from "react-icons/fa";
import { calculateMortgage, calculateAmortizationSchedule } from '@/utils/mortgageCalculations';
import { LineChart, PieChart, BarChart } from '@/components/charts/index.jsx';

const MortgageCalculator = ({ onCalculate }) => {
  const [formData, setFormData] = useState({
    homePrice: '',
    downPayment: '',
    interestRate: '',
    loanTerm: '30',
    propertyTax: '',
    insurance: '',
    pmi: '',
  });

  const [results, setResults] = useState(null);
  const [amortizationData, setAmortizationData] = useState([]);
  const [chartData, setChartData] = useState({
    paymentDistribution: [],
    amortizationTimeline: [],
    monthlyBreakdown: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateResults = () => {
    if (onCalculate) onCalculate(true);

    try {
      const {
        monthlyPayment,
        totalPayment,
        totalInterest,
        loanAmount
      } = calculateMortgage(formData);

      const schedule = calculateAmortizationSchedule(formData);

      // Prepare chart data
      const paymentDistribution = [
        { label: 'Principal', value: loanAmount },
        { label: 'Interest', value: totalInterest }
      ];

      const amortizationTimeline = schedule.slice(0, 12).map(payment => ({
        month: payment.month,
        principal: payment.principalPayment,
        interest: payment.interestPayment
      }));

      const monthlyBreakdown = [
        { label: 'Principal & Interest', value: monthlyPayment },
        { label: 'Property Tax', value: Number(formData.propertyTax) / 12 },
        { label: 'Insurance', value: Number(formData.insurance) / 12 },
        { label: 'PMI', value: Number(formData.pmi) }
      ];

      setResults({
        monthlyPayment,
        totalPayment,
        totalInterest,
        loanAmount
      });

      setAmortizationData(schedule);
      setChartData({
        paymentDistribution,
        amortizationTimeline,
        monthlyBreakdown
      });

      // Save calculation to localStorage
      const savedCalculations = JSON.parse(localStorage.getItem('savedCalculations') || '[]');
      savedCalculations.push({
        formData,
        results: {
          monthlyPayment,
          totalPayment,
          totalInterest,
          loanAmount
        },
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('savedCalculations', JSON.stringify(savedCalculations));

    } catch (error) {
      console.error('Calculation error:', error);
    } finally {
      if (onCalculate) onCalculate(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResults();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Price ($)
            </label>
            <input
              type="number"
              name="homePrice"
              value={formData.homePrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Down Payment ($)
            </label>
            <input
              type="number"
              name="downPayment"
              value={formData.downPayment}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term (Years)
            </label>
            <select
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="30">30 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Property Tax ($)
            </label>
            <input
              type="number"
              name="propertyTax"
              value={formData.propertyTax}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              min="0"
              step="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Insurance ($)
            </label>
            <input
              type="number"
              name="insurance"
              value={formData.insurance}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              min="0"
              step="100"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate
        </button>
      </form>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Monthly Payment</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${results.monthlyPayment.toFixed(2)}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Total Interest</h3>
              <p className="text-2xl font-bold text-blue-600">
                ${results.totalInterest.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Loan Amount</p>
                <p className="font-semibold">${results.loanAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Payment</p>
                <p className="font-semibold">${results.totalPayment.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Interest Rate</p>
                <p className="font-semibold">{formData.interestRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Loan Term</p>
                <p className="font-semibold">{formData.loanTerm} years</p>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Payment Distribution</h3>
              <PieChart data={chartData.paymentDistribution} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Monthly Breakdown</h3>
              <BarChart data={chartData.monthlyBreakdown} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Amortization Timeline</h3>
              <LineChart data={chartData.amortizationTimeline} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
  