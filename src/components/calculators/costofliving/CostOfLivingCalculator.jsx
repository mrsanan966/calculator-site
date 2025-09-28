import React, { useState } from 'react';
import { FaCity, FaDollarSign, FaHome, FaUtensils, FaCar, FaHeartbeat, FaGraduationCap } from 'react-icons/fa';

const CostOfLivingCalculator = () => {
  const [formData, setFormData] = useState({
    currentCity: '',
    targetCity: '',
    currentSalary: '',
    expenses: {
      housing: '',
      food: '',
      transportation: '',
      healthcare: '',
      education: '',
      utilities: '',
      other: ''
    }
  });

  const [results, setResults] = useState(null);

  // Sample cost of living indices (in a real app, this would come from an API)
  const costIndices = {
    'New York': 100,
    'Los Angeles': 85,
    'Chicago': 80,
    'Houston': 75,
    'Phoenix': 70,
    'Philadelphia': 78,
    'San Antonio': 72,
    'San Diego': 88,
    'Dallas': 77,
    'San Jose': 95
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('expenses.')) {
      const expenseType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        expenses: {
          ...prev.expenses,
          [expenseType]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculateCostOfLiving = (e) => {
    e.preventDefault();
    
    const currentIndex = costIndices[formData.currentCity] || 100;
    const targetIndex = costIndices[formData.targetCity] || 100;
    const indexRatio = targetIndex / currentIndex;

    // Calculate adjusted salary
    const currentSalary = parseFloat(formData.currentSalary);
    const adjustedSalary = currentSalary * indexRatio;

    // Calculate expense adjustments
    const expenseAdjustments = {};
    Object.entries(formData.expenses).forEach(([category, amount]) => {
      const value = parseFloat(amount) || 0;
      expenseAdjustments[category] = {
        current: value,
        adjusted: value * indexRatio,
        difference: (value * indexRatio) - value
      };
    });

    // Calculate total expenses
    const totalCurrentExpenses = Object.values(formData.expenses).reduce((sum, value) => 
      sum + (parseFloat(value) || 0), 0);
    const totalAdjustedExpenses = totalCurrentExpenses * indexRatio;

    setResults({
      currentIndex,
      targetIndex,
      indexRatio: indexRatio.toFixed(2),
      currentSalary: currentSalary.toFixed(2),
      adjustedSalary: adjustedSalary.toFixed(2),
      salaryDifference: (adjustedSalary - currentSalary).toFixed(2),
      expenseAdjustments,
      totalCurrentExpenses: totalCurrentExpenses.toFixed(2),
      totalAdjustedExpenses: totalAdjustedExpenses.toFixed(2),
      totalExpenseDifference: (totalAdjustedExpenses - totalCurrentExpenses).toFixed(2)
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={calculateCostOfLiving} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">City Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCity className="text-gray-400" />
                </div>
                <select
                  name="currentCity"
                  value={formData.currentCity}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select current city</option>
                  {Object.keys(costIndices).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target City
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCity className="text-gray-400" />
                </div>
                <select
                  name="targetCity"
                  value={formData.targetCity}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select target city</option>
                  {Object.keys(costIndices).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Annual Salary
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter current annual salary"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Housing
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHome className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="expenses.housing"
                  value={formData.expenses.housing}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter housing expenses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Food
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUtensils className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="expenses.food"
                  value={formData.expenses.food}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter food expenses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Transportation
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCar className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="expenses.transportation"
                  value={formData.expenses.transportation}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter transportation expenses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Healthcare
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaHeartbeat className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="expenses.healthcare"
                  value={formData.expenses.healthcare}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter healthcare expenses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGraduationCap className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="expenses.education"
                  value={formData.expenses.education}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter education expenses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Utilities
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="expenses.utilities"
                  value={formData.expenses.utilities}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter utility expenses"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Expenses
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="expenses.other"
                  value={formData.expenses.other}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter other expenses"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Cost of Living
        </button>
      </form>

      {results && (
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost of Living Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Cost of Living Index</p>
                <p className="text-xl font-semibold text-gray-900">
                  {formData.currentCity}: {results.currentIndex} → {formData.targetCity}: {results.targetIndex}
                </p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Index Ratio</p>
                <p className="text-xl font-semibold text-gray-900">{results.indexRatio}x</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Salary Adjustment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Current Salary</p>
                <p className="text-xl font-semibold text-gray-900">${results.currentSalary}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Adjusted Salary</p>
                <p className="text-xl font-semibold text-gray-900">${results.adjustedSalary}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm md:col-span-2">
                <p className="text-sm text-gray-600">Salary Difference</p>
                <p className={`text-xl font-semibold ${parseFloat(results.salaryDifference) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${results.salaryDifference}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Adjustments</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(results.expenseAdjustments).map(([category, values]) => (
                <div key={category} className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-sm text-gray-600 capitalize">{category}</p>
                  <p className="text-sm text-gray-500">Current: ${values.current}</p>
                  <p className="text-sm text-gray-500">Adjusted: ${values.adjusted}</p>
                  <p className={`text-sm font-semibold ${values.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Difference: ${values.difference.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Expenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Current Total Expenses</p>
                <p className="text-xl font-semibold text-gray-900">${results.totalCurrentExpenses}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Adjusted Total Expenses</p>
                <p className="text-xl font-semibold text-gray-900">${results.totalAdjustedExpenses}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm md:col-span-2">
                <p className="text-sm text-gray-600">Total Expense Difference</p>
                <p className={`text-xl font-semibold ${parseFloat(results.totalExpenseDifference) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${results.totalExpenseDifference}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostOfLivingCalculator; 