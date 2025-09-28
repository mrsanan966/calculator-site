
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Mountain, DollarSign, Percent, Calendar } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/calculators";

const LandLoanForm = ({
  landPrice, setLandPrice,
  downPayment, setDownPayment,
  interestRate, setInterestRate,
  loanTermMonths, setLoanTermMonths,
  setShowResults
}) => {
  const downPaymentPercentage = landPrice > 0 ? (downPayment / landPrice) * 100 : 0;
  const loanTermYears = loanTermMonths / 12;

  const handleLandPriceChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setLandPrice(value);
    if (downPayment > value) setDownPayment(value);
    setShowResults(false);
  };

  const handleDownPaymentChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setDownPayment(Math.min(value, landPrice));
    setShowResults(false);
  };
  
  const handleDownPaymentSliderChange = (value) => {
    setDownPayment(Math.min(value[0], landPrice));
    setShowResults(false);
  };

  const handleInterestRateChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setInterestRate(value);
    setShowResults(false);
  };

  const handleLoanTermMonthsChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setLoanTermMonths(value);
    setShowResults(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mountain className="mr-2 h-5 w-5 text-primary" />
          Land Loan Details
        </CardTitle>
        <CardDescription>
          Enter the land price, your down payment, interest rate, and loan term.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="landPrice">Land Price</Label>
              <span className="text-sm font-medium text-primary">{formatCurrency(landPrice)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="landPrice"
                type="text"
                value={formatNumber(landPrice)}
                onChange={handleLandPriceChange}
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
              max={landPrice}
              step={500}
              onValueChange={handleDownPaymentSliderChange}
              className="mt-2"
              disabled={landPrice <= 0}
            />
            <p className="text-xs text-muted-foreground pt-1">Note: Land loans often require 20-50% down.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="loanTerm">Loan Term (Months)</Label>
              <span className="text-sm font-medium text-primary">
                {loanTermMonths} months ({loanTermYears.toFixed(1)} years)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                id="loanTerm"
                type="number"
                value={loanTermMonths}
                onChange={handleLoanTermMonthsChange}
                min="1"
                className="text-right"
              />
            </div>
            <Slider
              value={[loanTermMonths]}
              min={12} max={360} step={12}
              onValueChange={(value) => { setLoanTermMonths(value[0]); setShowResults(false); }}
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
                step="0.01" min="0"
                className="text-right"
              />
            </div>
            <Slider
              value={[interestRate]}
              min={1} max={20} step={0.1}
              onValueChange={(value) => { setInterestRate(value[0]); setShowResults(false); }}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground pt-1">Note: Land loan rates may be higher than mortgage rates.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LandLoanForm;
  