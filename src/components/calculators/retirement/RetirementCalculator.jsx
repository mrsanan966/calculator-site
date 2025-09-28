import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';
import { PiggyBank, DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { FaTrash, FaHistory, FaMoneyBillWave, FaCalendarAlt, FaPercent, FaChartLine, FaUser } from "react-icons/fa";

const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [employerMatch, setEmployerMatch] = useState("");
  const [employerMatchLimit, setEmployerMatchLimit] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [currentIncome, setCurrentIncome] = useState("");
  const [incomeReplacement, setIncomeReplacement] = useState("");
  const [socialSecurity, setSocialSecurity] = useState("");
  const [pension, setPension] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const calculateRetirement = () => {
    if (!currentAge || !retirementAge || !lifeExpectancy || !currentSavings || !expectedReturn || !currentIncome) {
      setError("Please fill in all required fields");
      return;
    }

    const age = parseInt(currentAge);
    const retireAge = parseInt(retirementAge);
    const expectancy = parseInt(lifeExpectancy);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution) || 0;
    const match = parseFloat(employerMatch) || 0;
    const matchLimit = parseFloat(employerMatchLimit) || 0;
    const returnRate = parseFloat(expectedReturn) / 100;
    const inflation = parseFloat(inflationRate) || 0;
    const income = parseFloat(currentIncome);
    const replacement = parseFloat(incomeReplacement) || 80;
    const ss = parseFloat(socialSecurity) || 0;
    const pensionAmount = parseFloat(pension) || 0;

    if (isNaN(age) || isNaN(retireAge) || isNaN(expectancy) || isNaN(savings) || isNaN(returnRate) || isNaN(income)) {
      setError("Please enter valid numbers");
      return;
    }

    if (age >= retireAge || retireAge >= expectancy) {
      setError("Invalid age range. Retirement age must be between current age and life expectancy");
      return;
    }

    if (savings < 0 || monthly < 0 || returnRate < 0 || income <= 0) {
      setError("Values must be greater than 0");
      return;
    }

    // Calculate years until retirement and retirement duration
    const yearsToRetirement = retireAge - age;
    const retirementDuration = expectancy - retireAge;

    // Calculate monthly employer match
    const monthlyMatch = Math.min(monthly * (match / 100), matchLimit / 12);
    const totalMonthlyContribution = monthly + monthlyMatch;

    // Calculate future value of current savings
    const futureValueSavings = savings * Math.pow(1 + returnRate, yearsToRetirement);

    // Calculate future value of monthly contributions
    const monthlyRate = returnRate / 12;
    const numberOfMonths = yearsToRetirement * 12;
    const futureValueContributions = totalMonthlyContribution * 
      ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);

    // Calculate total retirement savings
    const totalRetirementSavings = futureValueSavings + futureValueContributions;

    // Calculate required annual income in retirement
    const requiredIncome = (income * (replacement / 100)) / 12;
    const otherIncome = (ss + pensionAmount) / 12;
    const neededFromSavings = Math.max(0, requiredIncome - otherIncome);

    // Calculate if savings are sufficient
    const monthlyWithdrawal = totalRetirementSavings * (returnRate / 12) / 
      (1 - Math.pow(1 + returnRate / 12, -retirementDuration * 12));
    const isSufficient = monthlyWithdrawal >= neededFromSavings;

    // Generate retirement projection
    const projection = [];
    let balance = totalRetirementSavings;
    let year = 1;

    while (year <= retirementDuration) {
      const annualWithdrawal = neededFromSavings * 12;
      const interestEarned = balance * returnRate;
      const newBalance = balance + interestEarned - annualWithdrawal;

      projection.push({
        year,
        age: retireAge + year,
        balance: balance.toFixed(2),
        withdrawal: annualWithdrawal.toFixed(2),
        interest: interestEarned.toFixed(2),
        remaining: newBalance.toFixed(2)
      });

      balance = newBalance;
      year++;
    }

    setResult({
      currentAge: age,
      retirementAge: retireAge,
      lifeExpectancy: expectancy,
      currentSavings: savings,
      monthlyContribution: monthly,
      employerMatch: match,
      employerMatchLimit: matchLimit,
      expectedReturn: returnRate * 100,
      inflationRate: inflation,
      currentIncome: income,
      incomeReplacement: replacement,
      socialSecurity: ss,
      pension: pensionAmount,
      yearsToRetirement,
      retirementDuration,
      totalRetirementSavings: totalRetirementSavings.toFixed(2),
      requiredMonthlyIncome: requiredIncome.toFixed(2),
      otherMonthlyIncome: otherIncome.toFixed(2),
      neededFromSavings: neededFromSavings.toFixed(2),
      monthlyWithdrawal: monthlyWithdrawal.toFixed(2),
      isSufficient,
      projection
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `Age ${age} to ${retireAge}, $${savings.toLocaleString()} savings, $${monthly.toLocaleString()}/month, ${(returnRate * 100).toFixed(2)}% return`,
      result: `Retirement Savings: $${totalRetirementSavings.toFixed(2)}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setCurrentAge("");
    setRetirementAge("");
    setLifeExpectancy("");
    setCurrentSavings("");
    setMonthlyContribution("");
    setEmployerMatch("");
    setEmployerMatchLimit("");
    setExpectedReturn("");
    setInflationRate("");
    setCurrentIncome("");
    setIncomeReplacement("");
    setSocialSecurity("");
    setPension("");
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
            Current Age
          </label>
          <div className="relative">
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current age"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaUser />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Retirement Age
          </label>
          <div className="relative">
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter retirement age"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaCalendarAlt />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Life Expectancy
          </label>
          <div className="relative">
            <input
              type="number"
              value={lifeExpectancy}
              onChange={(e) => setLifeExpectancy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter life expectancy"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaCalendarAlt />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Savings ($)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current savings"
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
            Employer Match (%)
          </label>
          <input
            type="number"
            step="any"
            value={employerMatch}
            onChange={(e) => setEmployerMatch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employer match percentage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employer Match Limit ($)
          </label>
          <input
            type="number"
            step="any"
            value={employerMatchLimit}
            onChange={(e) => setEmployerMatchLimit(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employer match limit"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Annual Return (%)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Annual Income ($)
          </label>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={currentIncome}
              onChange={(e) => setCurrentIncome(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current annual income"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaMoneyBillWave />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Income Replacement (%)
          </label>
          <input
            type="number"
            step="any"
            value={incomeReplacement}
            onChange={(e) => setIncomeReplacement(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter income replacement percentage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Social Security ($/month)
          </label>
          <input
            type="number"
            step="any"
            value={socialSecurity}
            onChange={(e) => setSocialSecurity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expected social security"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expected Pension ($/month)
          </label>
          <input
            type="number"
            step="any"
            value={pension}
            onChange={(e) => setPension(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expected pension"
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={calculateRetirement}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate Retirement
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
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Retirement Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">
                Total Retirement Savings: ${result.totalRetirementSavings}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Required Monthly Income:</span> ${result.requiredMonthlyIncome}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Other Monthly Income:</span> ${result.otherMonthlyIncome}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Needed from Savings:</span> ${result.neededFromSavings}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Monthly Withdrawal:</span> ${result.monthlyWithdrawal}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Years to Retirement:</span> {result.yearsToRetirement}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Retirement Duration:</span> {result.retirementDuration} years
              </p>
              <p className={`text-sm ${result.isSufficient ? "text-green-600" : "text-red-600"}`}>
                <span className="font-medium">Savings Status:</span> {result.isSufficient ? "Sufficient" : "Insufficient"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-800 mb-2">Retirement Projection</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Withdrawal</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.projection.map((row) => (
                    <tr key={row.year}>
                      <td className="px-4 py-2 text-sm text-gray-500">{row.year}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{row.age}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.balance}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.withdrawal}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.interest}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">${row.remaining}</td>
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

export default RetirementCalculator; 