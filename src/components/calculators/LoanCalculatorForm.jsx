import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Percent, Calendar } from 'lucide-react';
import { formatCurrency, formatNumber } from "@/utils/calculators";

const LoanCalculatorForm = ({
  loanAmount, setLoanAmount,
  interestRate, setInterestRate,
  loanTermMonths, setLoanTermMonths,
  loanTermYears,
  setShowResults // Added prop to control parent's showResults
}) => {

  const handleLoanAmountChange = (e) => {
    setLoanAmount(parseFloat(e.target.value.replace(/,/g, '')) || 0);
    setShowResults(false);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(parseFloat(e.target.value) || 0);
    setShowResults(false);
  };

  const handleLoanTermMonthsChange = (e) => {
    setLoanTermMonths(parseInt(e.target.value) || 0);
    setShowResults(false);
  };

  const handleLoanTermSliderChange = (value) => {
    setLoanTermMonths(value[0]);
    setShowResults(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-semibold">
          <DollarSign className="mr-2 h-6 w-6 text-primary" />
          Loan Details
        </CardTitle>
        <CardDescription>
          Enter your desired loan amount, interest rate, and loan term.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
         {/* Loan Amount */}
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Loan Amount</Label>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              id="loanAmount"
              type="text"
              value={formatNumber(loanAmount)}
              onChange={handleLoanAmountChange}
              className="text-right text-base flex-1"
            />
             <span className="ml-2 text-base font-medium text-primary">{formatCurrency(loanAmount)}</span>
          </div>
          <Slider
            value={[loanAmount]}
            min={100}
            max={100000}
            step={100}
            onValueChange={(value) => { setLoanAmount(value[0]); setShowResults(false); }}
            className="mt-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interest Rate */}
          <div className="space-y-2">
            <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
            <div className="flex items-center">
              <Percent className="h-5 w-5 text-muted-foreground mr-2" />
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={handleInterestRateChange}
                step="0.01"
                min="0"
                className="text-right text-base flex-1"
              />
               <span className="ml-2 text-base font-medium text-primary">{interestRate.toFixed(2)}%</span>
            </div>
            <Slider
              value={[interestRate]}
              min={0}
              max={25}
              step={0.1}
              onValueChange={(value) => { setInterestRate(value[0]); setShowResults(false); }}
              className="mt-2"
            />
          </div>

          {/* Loan Term */}
          <div className="space-y-2">
            <Label htmlFor="loanTermMonths">Loan Term (Months)</Label>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
              <Input
                id="loanTermMonths"
                type="number"
                value={loanTermMonths}
                onChange={handleLoanTermMonthsChange}
                min="1"
                className="text-right text-base flex-1"
              />
              <span className="ml-2 text-base font-medium text-primary">{loanTermMonths} mo ({loanTermYears.toFixed(1)} yrs)</span>
            </div>
            <Slider
              value={[loanTermMonths]}
              min={6}
              max={120} // Max 10 years for generic loan
              step={1}
              onValueChange={handleLoanTermSliderChange}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanCalculatorForm;
  