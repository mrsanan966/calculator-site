import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { motion } from "framer-motion";
import { DollarSign, Percent, Calendar, CreditCard, TrendingUp, FileText } from 'lucide-react';

const PersonalLoanCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: 10000,
    interestRate: 10.5,
    loanTerm: 36,
    creditScore: 720,
    originationFee: 0,
    prepaymentPenalty: 0,
    monthlyExtraPayment: 0
  });

  const [results, setResults] = useState(null);

  const calculateLoan = () => {
    const {
      loanAmount,
      interestRate,
      loanTerm,
      originationFee,
      prepaymentPenalty,
      monthlyExtraPayment
    } = formData;

    // Calculate monthly payment
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    // Calculate total cost with extra payments
    let balance = loanAmount;
    let totalInterest = 0;
    let totalPaid = 0;
    let actualTerm = totalPayments;
    let monthlyPayments = [];

    for (let month = 1; month <= totalPayments; month++) {
      const interest = balance * monthlyRate;
      const principal = monthlyPayment - interest;
      const extraPayment = monthlyExtraPayment;
      const totalPayment = monthlyPayment + extraPayment;

      balance -= (principal + extraPayment);
      totalInterest += interest;
      totalPaid += totalPayment;

      monthlyPayments.push({
        month,
        payment: monthlyPayment,
        extraPayment,
        totalPayment,
        principal: principal + extraPayment,
        interest,
        balance: Math.max(0, balance)
      });

      if (balance <= 0) {
        actualTerm = month;
        break;
      }
    }

    // Calculate total costs
    const totalCost = loanAmount + totalInterest + originationFee;
    const totalPaidWithFees = totalPaid + originationFee + (balance <= 0 ? 0 : prepaymentPenalty);
    const savings = (monthlyPayment * totalPayments) - totalPaid;

    setResults({
      monthlyPayment,
      totalInterest,
      totalCost,
      totalPaidWithFees,
      actualTerm,
      savings,
      monthlyPayments,
      originationFee,
      prepaymentPenalty
    });
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
            <Label htmlFor="interestRate" className="text-sm sm:text-base">Interest Rate (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="interestRate"
                type="number"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                min="0"
                step="0.01"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loanTerm" className="text-sm sm:text-base">Loan Term (Months)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="loanTerm"
                type="number"
                value={formData.loanTerm}
                onChange={(e) => setFormData({ ...formData, loanTerm: Number(e.target.value) })}
                min="1"
                max="84"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="creditScore" className="text-sm sm:text-base">Credit Score</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="creditScore"
                type="number"
                value={formData.creditScore}
                onChange={(e) => setFormData({ ...formData, creditScore: Number(e.target.value) })}
                min="300"
                max="850"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="originationFee" className="text-sm sm:text-base">Origination Fee</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="originationFee"
                type="number"
                value={formData.originationFee}
                onChange={(e) => setFormData({ ...formData, originationFee: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prepaymentPenalty" className="text-sm sm:text-base">Prepayment Penalty</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="prepaymentPenalty"
                type="number"
                value={formData.prepaymentPenalty}
                onChange={(e) => setFormData({ ...formData, prepaymentPenalty: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyExtraPayment" className="text-sm sm:text-base">Monthly Extra Payment</Label>
          <div className="flex items-center gap-2 sm:gap-4">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              id="monthlyExtraPayment"
              type="number"
              value={formData.monthlyExtraPayment}
              onChange={(e) => setFormData({ ...formData, monthlyExtraPayment: Number(e.target.value) })}
              min="0"
              className="text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={calculateLoan} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Calculate Loan
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Monthly Payment</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.monthlyPayment)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Interest</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Cost</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalCost)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Actual Loan Term</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{results.actualTerm} months</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Paid with Fees</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalPaidWithFees)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Interest Savings</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.savings)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalLoanCalculator; 