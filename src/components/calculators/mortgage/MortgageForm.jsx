
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Home, Percent, Calendar, DollarSign } from 'lucide-react';
import { formatCurrency, formatNumber } from "@/utils/calculators";

const MortgageForm = ({
  homePrice, setHomePrice,
  downPayment, setDownPayment,
  loanTerm, setLoanTerm,
  interestRate, setInterestRate,
  downPaymentPercentage,
  onCalculate,
  setShowResults
}) => {

  const handleHomePriceChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setHomePrice(value);
    if (downPayment > value) {
      setDownPayment(value);
    }
    setShowResults(false);
  };

  const handleDownPaymentChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setDownPayment(Math.min(value, homePrice));
    setShowResults(false);
  };

  const handleDownPaymentSliderChange = (value) => {
    setDownPayment(Math.min(value[0], homePrice));
    setShowResults(false);
  };

  const handleInterestRateChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setInterestRate(value);
    setShowResults(false);
  };

  const handleLoanTermChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setLoanTerm(value);
    setShowResults(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Home className="mr-2 h-5 w-5 text-primary" />
          Mortgage Details
        </CardTitle>
        <CardDescription>
          Enter your home price, down payment, loan term, and interest rate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="homePrice">Home Price</Label>
              <span className="text-sm font-medium text-primary">{formatCurrency(homePrice)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="homePrice"
                type="text"
                value={formatNumber(homePrice)}
                onChange={handleHomePriceChange}
                className="text-right"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="downPayment">Down Payment</Label>
              <span className="text-sm font-medium text-primary">
                {formatCurrency(downPayment)} ({downPaymentPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="downPayment"
                type="text"
                value={formatNumber(downPayment)}
                onChange={handleDownPaymentChange}
                className="text-right"
              />
            </div>
            <Slider
              value={[downPayment]}
              max={homePrice}
              step={1000}
              onValueChange={handleDownPaymentSliderChange}
              className="mt-2"
              disabled={homePrice <= 0}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <span className="text-sm font-medium text-primary">
                {loanTerm} years
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={handleLoanTermChange}
                min="1"
                className="text-right"
              />
            </div>
            <Slider
              value={[loanTerm]}
              min={5}
              max={40}
              step={1}
              onValueChange={(value) => { setLoanTerm(value[0]); setShowResults(false); }}
              className="mt-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <span className="text-sm font-medium text-primary">
                {interestRate.toFixed(2)}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={handleInterestRateChange}
                step="0.01"
                min="0"
                className="text-right"
              />
            </div>
            <Slider
              value={[interestRate]}
              min={0.1}
              max={15}
              step={0.1}
              onValueChange={(value) => { setInterestRate(value[0]); setShowResults(false); }}
              className="mt-2"
            />
          </div>
        </div>
        <div className="text-center pt-4">
          <Button onClick={onCalculate} size="lg" disabled={homePrice <= 0}>
            Calculate Mortgage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageForm;
  