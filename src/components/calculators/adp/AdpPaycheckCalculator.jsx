import React, { useState } from 'react';
import { FaDollarSign, FaPercent, FaCalendarAlt, FaBuilding, FaUser, FaMoneyBillWave } from 'react-icons/fa';

const AdpPaycheckCalculator = () => {
  const [formData, setFormData] = useState({
    grossPay: '',
    payFrequency: 'biweekly',
    state: '',
    federalTaxRate: '',
    stateTaxRate: '',
    socialSecurityRate: '6.2',
    medicareRate: '1.45',
    deductions: {
      healthInsurance: '',
      retirement: '',
      other: ''
    },
    benefits: {
      employerMatch: '',
      bonus: '',
      overtime: ''
    }
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('deductions.')) {
      const deductionType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        deductions: {
          ...prev.deductions,
          [deductionType]: value
        }
      }));
    } else if (name.startsWith('benefits.')) {
      const benefitType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        benefits: {
          ...prev.benefits,
          [benefitType]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const calculatePaycheck = (e) => {
    e.preventDefault();
    
    const grossPay = parseFloat(formData.grossPay);
    const federalTaxRate = parseFloat(formData.federalTaxRate) / 100;
    const stateTaxRate = parseFloat(formData.stateTaxRate) / 100;
    const socialSecurityRate = parseFloat(formData.socialSecurityRate) / 100;
    const medicareRate = parseFloat(formData.medicareRate) / 100;
    
    // Calculate deductions
    const healthInsurance = parseFloat(formData.deductions.healthInsurance) || 0;
    const retirement = parseFloat(formData.deductions.retirement) || 0;
    const otherDeductions = parseFloat(formData.deductions.other) || 0;
    const totalDeductions = healthInsurance + retirement + otherDeductions;

    // Calculate benefits
    const employerMatch = parseFloat(formData.benefits.employerMatch) || 0;
    const bonus = parseFloat(formData.benefits.bonus) || 0;
    const overtime = parseFloat(formData.benefits.overtime) || 0;
    const totalBenefits = employerMatch + bonus + overtime;

    // Calculate taxes
    const federalTax = grossPay * federalTaxRate;
    const stateTax = grossPay * stateTaxRate;
    const socialSecurity = grossPay * socialSecurityRate;
    const medicare = grossPay * medicareRate;
    const totalTax = federalTax + stateTax + socialSecurity + medicare;

    // Calculate net pay
    const netPay = grossPay - totalTax - totalDeductions + totalBenefits;

    // Calculate per period amounts
    let periodMultiplier;
    switch (formData.payFrequency) {
      case 'weekly':
        periodMultiplier = 52;
        break;
      case 'biweekly':
        periodMultiplier = 26;
        break;
      case 'semimonthly':
        periodMultiplier = 24;
        break;
      case 'monthly':
        periodMultiplier = 12;
        break;
      default:
        periodMultiplier = 26;
    }

    const annualGrossPay = grossPay * periodMultiplier;
    const annualNetPay = netPay * periodMultiplier;
    const annualTax = totalTax * periodMultiplier;
    const annualDeductions = totalDeductions * periodMultiplier;
    const annualBenefits = totalBenefits * periodMultiplier;

    setResults({
      grossPay: grossPay.toFixed(2),
      netPay: netPay.toFixed(2),
      totalTax: totalTax.toFixed(2),
      totalDeductions: totalDeductions.toFixed(2),
      totalBenefits: totalBenefits.toFixed(2),
      annualGrossPay: annualGrossPay.toFixed(2),
      annualNetPay: annualNetPay.toFixed(2),
      annualTax: annualTax.toFixed(2),
      annualDeductions: annualDeductions.toFixed(2),
      annualBenefits: annualBenefits.toFixed(2),
      taxBreakdown: {
        federalTax: federalTax.toFixed(2),
        stateTax: stateTax.toFixed(2),
        socialSecurity: socialSecurity.toFixed(2),
        medicare: medicare.toFixed(2)
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={calculatePaycheck} className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gross Pay per Period
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="grossPay"
                  value={formData.grossPay}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter gross pay"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pay Frequency
              </label>
              <select
                name="payFrequency"
                value={formData.payFrequency}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="semimonthly">Semi-monthly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Federal Tax Rate (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPercent className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="federalTaxRate"
                  value={formData.federalTaxRate}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter federal tax rate"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State Tax Rate (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPercent className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="stateTaxRate"
                  value={formData.stateTaxRate}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter state tax rate"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Deductions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Health Insurance
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="deductions.healthInsurance"
                  value={formData.deductions.healthInsurance}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter health insurance cost"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retirement Contributions
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="deductions.retirement"
                  value={formData.deductions.retirement}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter retirement contributions"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other Deductions
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="deductions.other"
                  value={formData.deductions.other}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter other deductions"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employer Match
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="benefits.employerMatch"
                  value={formData.benefits.employerMatch}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter employer match"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bonus
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="benefits.bonus"
                  value={formData.benefits.bonus}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter bonus amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Overtime
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="benefits.overtime"
                  value={formData.benefits.overtime}
                  onChange={handleInputChange}
                  className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter overtime amount"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Paycheck
        </button>
      </form>

      {results && (
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paycheck Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Gross Pay</p>
                <p className="text-xl font-semibold text-gray-900">${results.grossPay}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Net Pay</p>
                <p className="text-xl font-semibold text-gray-900">${results.netPay}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Total Tax</p>
                <p className="text-xl font-semibold text-gray-900">${results.totalTax}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Total Deductions</p>
                <p className="text-xl font-semibold text-gray-900">${results.totalDeductions}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Total Benefits</p>
                <p className="text-xl font-semibold text-gray-900">${results.totalBenefits}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Federal Tax</p>
                <p className="text-xl font-semibold text-gray-900">${results.taxBreakdown.federalTax}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">State Tax</p>
                <p className="text-xl font-semibold text-gray-900">${results.taxBreakdown.stateTax}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Social Security</p>
                <p className="text-xl font-semibold text-gray-900">${results.taxBreakdown.socialSecurity}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Medicare</p>
                <p className="text-xl font-semibold text-gray-900">${results.taxBreakdown.medicare}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Annual Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Annual Gross Pay</p>
                <p className="text-xl font-semibold text-gray-900">${results.annualGrossPay}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Annual Net Pay</p>
                <p className="text-xl font-semibold text-gray-900">${results.annualNetPay}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Annual Tax</p>
                <p className="text-xl font-semibold text-gray-900">${results.annualTax}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Annual Deductions</p>
                <p className="text-xl font-semibold text-gray-900">${results.annualDeductions}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <p className="text-sm text-gray-600">Annual Benefits</p>
                <p className="text-xl font-semibold text-gray-900">${results.annualBenefits}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdpPaycheckCalculator; 