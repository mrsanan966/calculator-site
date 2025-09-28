import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { motion } from "framer-motion";
import { Home, DollarSign, Percent, Calendar, CreditCard, TrendingUp } from 'lucide-react';

const HELOCCalculator = () => {
  const [formData, setFormData] = useState({
    homeValue: 500000,
    mortgageBalance: 300000,
    creditScore: 720,
    helocRate: 7.5,
    drawPeriod: 10,
    repaymentPeriod: 20,
    monthlyDraw: 1000,
    drawFrequency: 'monthly'
  });

  const [results, setResults] = useState(null);

  const calculateHELOC = () => {
    const {
      homeValue,
      mortgageBalance,
      helocRate,
      drawPeriod,
      repaymentPeriod,
      monthlyDraw,
      drawFrequency
    } = formData;

    // Calculate available equity
    const availableEquity = homeValue * 0.85 - mortgageBalance; // 85% LTV max
    const maxCreditLine = Math.max(0, availableEquity);

    // Calculate draw period details
    const monthlyRate = helocRate / 100 / 12;
    const drawPeriodMonths = drawPeriod * 12;
    const totalDraws = drawPeriodMonths * monthlyDraw;
    const totalBorrowed = Math.min(totalDraws, maxCreditLine);

    // Calculate interest during draw period
    let balance = 0;
    let totalInterest = 0;
    let monthlyPayments = [];

    // Simulate monthly draws and interest
    for (let month = 1; month <= drawPeriodMonths; month++) {
      balance += monthlyDraw;
      if (balance > maxCreditLine) {
        balance = maxCreditLine;
      }
      const interest = balance * monthlyRate;
      totalInterest += interest;
      monthlyPayments.push({
        month,
        balance,
        interest,
        payment: interest // Interest-only payments during draw period
      });
    }

    // Calculate repayment period
    const repaymentMonths = repaymentPeriod * 12;
    const monthlyPayment = (balance * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
      (Math.pow(1 + monthlyRate, repaymentMonths) - 1);

    // Calculate total repayment period interest
    let repaymentBalance = balance;
    let repaymentInterest = 0;
    for (let month = 1; month <= repaymentMonths; month++) {
      const interest = repaymentBalance * monthlyRate;
      const principal = monthlyPayment - interest;
      repaymentBalance -= principal;
      repaymentInterest += interest;
    }

    setResults({
      maxCreditLine,
      totalBorrowed,
      drawPeriodInterest: totalInterest,
      repaymentPeriodInterest: repaymentInterest,
      totalInterest: totalInterest + repaymentInterest,
      monthlyPayment,
      monthlyPayments,
      totalCost: totalBorrowed + totalInterest + repaymentInterest
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="homeValue" className="text-sm sm:text-base">Home Value</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Home className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="homeValue"
                type="number"
                value={formData.homeValue}
                onChange={(e) => setFormData({ ...formData, homeValue: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mortgageBalance" className="text-sm sm:text-base">Current Mortgage Balance</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="mortgageBalance"
                type="number"
                value={formData.mortgageBalance}
                onChange={(e) => setFormData({ ...formData, mortgageBalance: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="space-y-2">
            <Label htmlFor="helocRate" className="text-sm sm:text-base">HELOC Interest Rate (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="helocRate"
                type="number"
                value={formData.helocRate}
                onChange={(e) => setFormData({ ...formData, helocRate: Number(e.target.value) })}
                min="0"
                step="0.01"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="drawPeriod" className="text-sm sm:text-base">Draw Period (Years)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="drawPeriod"
                type="number"
                value={formData.drawPeriod}
                onChange={(e) => setFormData({ ...formData, drawPeriod: Number(e.target.value) })}
                min="1"
                max="30"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="repaymentPeriod" className="text-sm sm:text-base">Repayment Period (Years)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="repaymentPeriod"
                type="number"
                value={formData.repaymentPeriod}
                onChange={(e) => setFormData({ ...formData, repaymentPeriod: Number(e.target.value) })}
                min="1"
                max="30"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyDraw" className="text-sm sm:text-base">Monthly Draw Amount</Label>
          <div className="flex items-center gap-2 sm:gap-4">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
            <Input
              id="monthlyDraw"
              type="number"
              value={formData.monthlyDraw}
              onChange={(e) => setFormData({ ...formData, monthlyDraw: Number(e.target.value) })}
              min="0"
              className="text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={calculateHELOC} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Calculate HELOC
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Maximum Credit Line</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.maxCreditLine)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Amount Borrowed</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalBorrowed)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Draw Period Interest</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.drawPeriodInterest)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Repayment Period Interest</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.repaymentPeriodInterest)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Interest</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Monthly Payment (Repayment Period)</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.monthlyPayment)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HELOCCalculator; 