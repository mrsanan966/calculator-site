import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { motion } from "framer-motion";
import { Scale, DollarSign, Percent, Calendar, CreditCard } from 'lucide-react';

const LoanComparisonCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 100000,
    loanTerm: 30,
    loans: [
      { name: 'Loan 1', rate: 5.5, points: 0, fees: 0 },
      { name: 'Loan 2', rate: 5.0, points: 1, fees: 1000 },
    ]
  });

  const [results, setResults] = useState(null);

  const calculateLoan = (rate, points, fees) => {
    const monthlyRate = rate / 100 / 12;
    const totalPayments = formData.loanTerm * 12;
    const pointsCost = (points / 100) * formData.loanAmount;
    const totalFees = pointsCost + fees;
    
    // Calculate monthly payment
    const monthlyPayment = (formData.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    // Calculate total cost
    const totalCost = (monthlyPayment * totalPayments) + totalFees;
    const totalInterest = totalCost - formData.loanAmount - totalFees;
    
    return {
      monthlyPayment,
      totalCost,
      totalInterest,
      totalFees,
      pointsCost,
    };
  };

  const compareLoans = () => {
    const loanResults = formData.loans.map(loan => {
      const result = calculateLoan(loan.rate, loan.points, loan.fees);
      return {
        ...loan,
        ...result,
      };
    });

    // Sort by total cost
    loanResults.sort((a, b) => a.totalCost - b.totalCost);
    
    setResults({
      loans: loanResults,
      bestLoan: loanResults[0],
    });
  };

  const addLoan = () => {
    setFormData({
      ...formData,
      loans: [
        ...formData.loans,
        { name: 'New Loan', rate: 5.0, points: 0, fees: 0 }
      ]
    });
  };

  const removeLoan = (index) => {
    setFormData({
      ...formData,
      loans: formData.loans.filter((_, i) => i !== index)
    });
    setResults(null);
  };

  const updateLoan = (index, field, value) => {
    const newLoans = [...formData.loans];
    newLoans[index] = {
      ...newLoans[index],
      [field]: Number(value),
    };
    setFormData({
      ...formData,
      loans: newLoans
    });
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanAmount" className="text-sm sm:text-base">Loan Amount</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="text-sm sm:text-base">Loan Term (Years)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="loanTerm"
                type="number"
                value={formData.loanTerm}
                onChange={(e) => setFormData({ ...formData, loanTerm: Number(e.target.value) })}
                min="1"
                max="50"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg sm:text-xl font-semibold">Loan Options</h3>
            <Button onClick={addLoan} variant="outline" size="sm" className="text-sm sm:text-base">
              Add Loan
            </Button>
          </div>

          {formData.loans.map((loan, index) => (
            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg">
              <div className="space-y-2 lg:col-span-1">
                <Label htmlFor={`loan-${index}-name`} className="text-sm sm:text-base">Loan Name</Label>
                <Input
                  id={`loan-${index}-name`}
                  value={loan.name}
                  onChange={(e) => updateLoan(index, 'name', e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`loan-${index}-rate`} className="text-sm sm:text-base">Interest Rate (%)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id={`loan-${index}-rate`}
                    type="number"
                    value={loan.rate}
                    onChange={(e) => updateLoan(index, 'rate', e.target.value)}
                    min="0"
                    step="0.01"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`loan-${index}-points`} className="text-sm sm:text-base">Points (%)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id={`loan-${index}-points`}
                    type="number"
                    value={loan.points}
                    onChange={(e) => updateLoan(index, 'points', e.target.value)}
                    min="0"
                    step="0.01"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`loan-${index}-fees`} className="text-sm sm:text-base">Additional Fees</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id={`loan-${index}-fees`}
                    type="number"
                    value={loan.fees}
                    onChange={(e) => updateLoan(index, 'fees', e.target.value)}
                    min="0"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLoan(index)}
                  className="text-red-500 hover:text-red-700 text-sm sm:text-base"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={compareLoans} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Compare Loans
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {results.loans.map((loan, index) => (
              <div key={index} className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">{loan.name}</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 text-primary">
                    {formatCurrency(loan.monthlyPayment)}/mo
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Total Cost: {formatCurrency(loan.totalCost)}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Total Interest: {formatCurrency(loan.totalInterest)}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Total Fees: {formatCurrency(loan.totalFees)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanComparisonCalculator; 