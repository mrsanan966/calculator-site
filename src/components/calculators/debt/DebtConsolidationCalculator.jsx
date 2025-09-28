import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { motion } from "framer-motion";
import { Info, DollarSign, Percent, Calendar, CreditCard } from 'lucide-react';

const DebtConsolidationCalculator = () => {
  const [formData, setFormData] = useState({
    debts: [
      { name: 'Credit Card 1', balance: 5000, interestRate: 18.99, minimumPayment: 100 },
      { name: 'Credit Card 2', balance: 3000, interestRate: 15.99, minimumPayment: 75 },
      { name: 'Personal Loan', balance: 10000, interestRate: 12.99, minimumPayment: 200 }
    ],
    consolidationRate: 10.99,
    consolidationTerm: 36,
    consolidationFee: 0
  });

  const [results, setResults] = useState(null);

  const calculateConsolidation = () => {
    const { debts, consolidationRate, consolidationTerm, consolidationFee } = formData;

    // Calculate total debt
    const totalDebt = debts.reduce((sum, debt) => sum + Number(debt.balance), 0);

    // Calculate total minimum payments
    const totalMinimumPayments = debts.reduce((sum, debt) => sum + Number(debt.minimumPayment), 0);

    // Calculate total interest paid on individual debts
    const totalInterestOnIndividual = debts.reduce((sum, debt) => {
      const monthlyRate = Number(debt.interestRate) / 100 / 12;
      const monthlyPayment = Number(debt.minimumPayment);
      let balance = Number(debt.balance);
      let totalInterest = 0;
      let months = 0;

      // Ensure monthlyPayment is greater than interest to pay down principal
      // And prevent infinite loops for zero balance or payment
      if (monthlyRate <= 0 || monthlyPayment <= 0 || balance <= 0) return sum;

      while (balance > 0.01 && months < 600) { // Cap at 50 years and a small remaining balance
        const interest = balance * monthlyRate;
        // Ensure monthly payment is at least the interest to avoid increasing balance
        const principal = (monthlyPayment > interest) ? (monthlyPayment - interest) : 0;
        balance -= principal;
        totalInterest += interest;
        months++;
      }

      return sum + totalInterest;
    }, 0);

    // Calculate consolidated loan details
    const monthlyRate = Number(consolidationRate) / 100 / 12;
    const numberOfPayments = Number(consolidationTerm);
    const loanAmount = totalDebt + Number(consolidationFee);

    let monthlyPayment = 0;
    let totalInterestOnConsolidated = 0;

    if (monthlyRate > 0 && numberOfPayments > 0 && loanAmount > 0) {
       monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
       totalInterestOnConsolidated = (monthlyPayment * numberOfPayments) - loanAmount;
    } else if (loanAmount > 0 && numberOfPayments > 0) { // Handle 0 interest rate
        monthlyPayment = loanAmount / numberOfPayments;
        totalInterestOnConsolidated = 0;
    }

    // Calculate savings
    const interestSavings = totalInterestOnIndividual - totalInterestOnConsolidated;
    const monthlySavings = totalMinimumPayments - monthlyPayment;

    setResults({
      totalDebt,
      totalMinimumPayments,
      totalInterestOnIndividual: Math.max(0, totalInterestOnIndividual), // Ensure non-negative
      monthlyPayment,
      totalInterestOnConsolidated: Math.max(0, totalInterestOnConsolidated), // Ensure non-negative
      interestSavings: Math.round(interestSavings * 100) / 100, // Round to 2 decimal places
      monthlySavings: Math.round(monthlySavings * 100) / 100, // Round to 2 decimal places
      paybackPeriod: consolidationTerm
    });
  };

  const addDebt = () => {
    setFormData({
      ...formData,
      debts: [
        ...formData.debts,
        { name: 'New Debt', balance: 0, interestRate: 0, minimumPayment: 0 }
      ]
    });
  };

  const removeDebt = (index) => {
    setFormData({
      ...formData,
      debts: formData.debts.filter((_, i) => i !== index)
    });
     setResults(null); // Clear results when debts change
  };

  const updateDebt = (index, field, value) => {
    const newDebts = [...formData.debts];
    newDebts[index] = {
      ...newDebts[index],
      [field]: value
    };
    setFormData({
      ...formData,
      debts: newDebts
    });
     setResults(null); // Clear results when debts change
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg sm:text-xl font-semibold">Current Debts</h3>
          <Button onClick={addDebt} variant="outline" size="sm" className="text-sm sm:text-base">
            Add Debt
          </Button>
        </div>

        <div className="space-y-4">
          {formData.debts.map((debt, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div className="space-y-2 lg:col-span-1">
                <Label htmlFor={`debt-${index}-name`} className="text-sm sm:text-base">Debt Name</Label>
                <Input
                  id={`debt-${index}-name`}
                  value={debt.name}
                  onChange={(e) => updateDebt(index, 'name', e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`debt-${index}-balance`} className="text-sm sm:text-base">Balance</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id={`debt-${index}-balance`}
                    type="number"
                    value={debt.balance}
                    onChange={(e) => updateDebt(index, 'balance', Number(e.target.value))}
                    min="0"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`debt-${index}-rate`} className="text-sm sm:text-base">Interest Rate (%)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id={`debt-${index}-rate`}
                    type="number"
                    value={debt.interestRate}
                    onChange={(e) => updateDebt(index, 'interestRate', Number(e.target.value))}
                    min="0"
                    step="0.01"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`debt-${index}-payment`} className="text-sm sm:text-base">Minimum Payment</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id={`debt-${index}-payment`}
                    type="number"
                    value={debt.minimumPayment}
                    onChange={(e) => updateDebt(index, 'minimumPayment', Number(e.target.value))}
                    min="0"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDebt(index)}
                  className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-lg sm:text-xl font-semibold">Consolidation Loan Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="consolidation-rate" className="text-sm sm:text-base">Consolidation Interest Rate (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Slider
                id="consolidation-rate"
                value={[formData.consolidationRate]}
                onValueChange={([value]) => setFormData({ ...formData, consolidationRate: value })}
                min={0}
                max={30}
                step={0.1}
                className="flex-1"
              />
              <span className="w-16 text-right text-sm sm:text-base">{formData.consolidationRate}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="consolidation-term" className="text-sm sm:text-base">Consolidation Loan Term (Months)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Slider
                id="consolidation-term"
                value={[formData.consolidationTerm]}
                onValueChange={([value]) => setFormData({ ...formData, consolidationTerm: value })}
                min={12}
                max={120}
                step={12}
                className="flex-1"
              />
              <span className="w-16 text-right text-sm sm:text-base">{formData.consolidationTerm}</span>
            </div>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="consolidation-fee" className="text-sm sm:text-base">Estimated Consolidation Fee</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="consolidation-fee"
                type="number"
                value={formData.consolidationFee}
                onChange={(e) => setFormData({ ...formData, consolidationFee: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">One-time fee added to the consolidated loan amount.</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={calculateConsolidation} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Calculate Consolidation
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Current Debt</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalDebt)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Current Minimum Payments</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalMinimumPayments)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Estimated Total Interest on Individual Debts</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalInterestOnIndividual)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">New Consolidated Monthly Payment</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.monthlyPayment)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Estimated Total Interest on Consolidated Loan</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalInterestOnConsolidated)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Potential Interest Savings</h3>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold mt-1 ${results.interestSavings > 0 ? 'text-green-600' : results.interestSavings < 0 ? 'text-red-600' : ''}`}>
                  {formatCurrency(results.interestSavings)}
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Potential Monthly Savings</h3>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold mt-1 ${results.monthlySavings > 0 ? 'text-green-600' : results.monthlySavings < 0 ? 'text-red-600' : ''}`}>
                  {formatCurrency(results.monthlySavings)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebtConsolidationCalculator; 