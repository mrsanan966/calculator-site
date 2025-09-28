import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { motion } from "framer-motion";
import { DollarSign, Percent, Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const InvestmentGrowthCalculator = () => {
  const [formData, setFormData] = useState({
    initialInvestment: 10000,
    monthlyContribution: 500,
    annualReturn: 7,
    investmentPeriod: 30,
    inflationRate: 2.5,
    taxRate: 15
  });

  const [results, setResults] = useState(null);

  const calculateInvestment = () => {
    const {
      initialInvestment,
      monthlyContribution,
      annualReturn,
      investmentPeriod,
      inflationRate,
      taxRate
    } = formData;

    // Convert annual rates to monthly
    const monthlyReturn = annualReturn / 100 / 12;
    const monthlyInflation = inflationRate / 100 / 12;
    const monthlyTaxRate = taxRate / 100 / 12;
    const months = investmentPeriod * 12;

    // Calculate growth
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    let totalInterest = 0;
    let yearlyBalances = [];
    let yearlyContributions = [];
    let yearlyInterest = [];

    for (let year = 1; year <= investmentPeriod; year++) {
      let yearContribution = 0;
      let yearInterest = 0;

      for (let month = 1; month <= 12; month++) {
        // Add monthly contribution
        balance += monthlyContribution;
        totalContributions += monthlyContribution;
        yearContribution += monthlyContribution;

        // Calculate interest
        const interest = balance * monthlyReturn;
        const tax = interest * monthlyTaxRate;
        const netInterest = interest - tax;
        
        // Apply inflation
        const inflationAdjustment = balance * monthlyInflation;
        
        balance += netInterest - inflationAdjustment;
        totalInterest += netInterest;
        yearInterest += netInterest;
      }

      yearlyBalances.push(balance);
      yearlyContributions.push(yearContribution);
      yearlyInterest.push(yearInterest);
    }

    // Calculate final values
    const totalValue = balance;
    const totalGrowth = totalValue - totalContributions;
    const growthPercentage = (totalGrowth / totalContributions) * 100;
    const averageAnnualReturn = (Math.pow(totalValue / initialInvestment, 1 / investmentPeriod) - 1) * 100;

    setResults({
      totalValue,
      totalContributions,
      totalInterest,
      totalGrowth,
      growthPercentage,
      averageAnnualReturn,
      yearlyBalances,
      yearlyContributions,
      yearlyInterest
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="initialInvestment" className="text-sm sm:text-base">Initial Investment</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="initialInvestment"
                type="number"
                value={formData.initialInvestment}
                onChange={(e) => setFormData({ ...formData, initialInvestment: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution" className="text-sm sm:text-base">Monthly Contribution</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="monthlyContribution"
                type="number"
                value={formData.monthlyContribution}
                onChange={(e) => setFormData({ ...formData, monthlyContribution: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="annualReturn" className="text-sm sm:text-base">Expected Annual Return (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="annualReturn"
                type="number"
                value={formData.annualReturn}
                onChange={(e) => setFormData({ ...formData, annualReturn: Number(e.target.value) })}
                min="0"
                step="0.1"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="investmentPeriod" className="text-sm sm:text-base">Investment Period (Years)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="investmentPeriod"
                type="number"
                value={formData.investmentPeriod}
                onChange={(e) => setFormData({ ...formData, investmentPeriod: Number(e.target.value) })}
                min="1"
                max="50"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="inflationRate" className="text-sm sm:text-base">Inflation Rate (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="inflationRate"
                type="number"
                value={formData.inflationRate}
                onChange={(e) => setFormData({ ...formData, inflationRate: Number(e.target.value) })}
                min="0"
                step="0.1"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxRate" className="text-sm sm:text-base">Tax Rate (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <ArrowDownRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="taxRate"
                type="number"
                value={formData.taxRate}
                onChange={(e) => setFormData({ ...formData, taxRate: Number(e.target.value) })}
                min="0"
                max="100"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button 
          onClick={calculateInvestment} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Calculate Investment Growth
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Investment Value</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalValue)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Contributions</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalContributions)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Interest Earned</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalInterest)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Growth</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.totalGrowth)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Growth Percentage</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatPercentage(results.growthPercentage)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Average Annual Return</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatPercentage(results.averageAnnualReturn)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentGrowthCalculator;
  