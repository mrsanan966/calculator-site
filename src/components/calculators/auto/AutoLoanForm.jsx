
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Car, DollarSign, Percent, Calendar } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/calculators";

const AutoLoanForm = ({
  vehiclePrice, setVehiclePrice,
  downPayment, setDownPayment,
  tradeInValue, setTradeInValue,
  interestRate, setInterestRate,
  loanTermMonths, setLoanTermMonths,
  loanAmount,
  setShowResults
}) => {

  const loanTermYears = loanTermMonths / 12;

  const handleVehiclePriceChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setVehiclePrice(value);
    setShowResults(false);
  };

  const handleDownPaymentChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setDownPayment(value);
    setShowResults(false);
  };

   const handleTradeInChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setTradeInValue(value);
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
          <Car className="mr-2 h-5 w-5 text-primary" />
          Auto Loan Details
        </CardTitle>
        <CardDescription>
          Enter vehicle price, down payment/trade-in, interest rate, and loan term.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="vehiclePrice">Vehicle Price</Label>
              <span className="text-sm font-medium text-primary">{formatCurrency(vehiclePrice)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="vehiclePrice"
                type="text"
                value={formatNumber(vehiclePrice)}
                onChange={handleVehiclePriceChange}
                className="text-right"
              />
            </div>
            <Slider
              value={[vehiclePrice]}
              min={1000} max={100000} step={1000}
              onValueChange={(value) => { setVehiclePrice(value[0]); setShowResults(false); }}
              className="mt-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="downPayment">Down Payment</Label>
              <span className="text-sm font-medium text-primary">{formatCurrency(downPayment)}</span>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <Label htmlFor="tradeInValue">Trade-in Value</Label>
              <span className="text-sm font-medium text-primary">{formatCurrency(tradeInValue)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="tradeInValue"
                type="text"
                value={formatNumber(tradeInValue)}
                onChange={handleTradeInChange}
                className="text-right"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
             <Label>Loan Amount</Label>
             <span className="text-sm font-bold text-primary">{formatCurrency(loanAmount)}</span>
            </div>
            <p className="text-xs text-muted-foreground">(Price - Down Payment - Trade-in)</p>
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
              min={12} max={84} step={12}
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
              min={0} max={25} step={0.1}
              onValueChange={(value) => { setInterestRate(value[0]); setShowResults(false); }}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoLoanForm;
  