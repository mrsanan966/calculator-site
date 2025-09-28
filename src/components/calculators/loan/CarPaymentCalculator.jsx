import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const CarPaymentCalculator = () => {
  const [formData, setFormData] = useState({
    carPrice: 30000,
    downPayment: 5000,
    tradeInValue: 0,
    interestRate: 4.5,
    loanTerm: 60,
    salesTax: 6.0,
    fees: 500
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSliderChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value[0]
    }));
  };

  const calculatePayment = () => {
    const {
      carPrice,
      downPayment,
      tradeInValue,
      interestRate,
      loanTerm,
      salesTax,
      fees
    } = formData;

    // Calculate total amount financed
    const subtotal = carPrice - downPayment - tradeInValue;
    const taxAmount = subtotal * (salesTax / 100);
    const totalAmountFinanced = subtotal + taxAmount + fees;

    // Convert annual interest rate to monthly
    const monthlyRate = interestRate / 100 / 12;

    // Calculate monthly payment
    const monthlyPayment = 
      (totalAmountFinanced * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);

    // Calculate total cost
    const totalCost = (monthlyPayment * loanTerm) + downPayment + tradeInValue;
    const totalInterest = totalCost - totalAmountFinanced - downPayment - tradeInValue;

    setResults({
      subtotal,
      taxAmount,
      totalAmountFinanced,
      monthlyPayment,
      totalCost,
      totalInterest
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Car Payment Calculator</CardTitle>
          <CardDescription>
            Calculate your monthly car payment and total cost
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Car Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Car Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="carPrice">Car Price</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="carPrice"
                    name="carPrice"
                    type="number"
                    value={formData.carPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="1000"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.carPrice)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="downPayment"
                    name="downPayment"
                    type="number"
                    value={formData.downPayment}
                    onChange={handleInputChange}
                    min="0"
                    step="500"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.downPayment)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tradeInValue">Trade-in Value</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="tradeInValue"
                    name="tradeInValue"
                    type="number"
                    value={formData.tradeInValue}
                    onChange={handleInputChange}
                    min="0"
                    step="500"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.tradeInValue)}
                  </span>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Loan Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="interestRate"
                    min={0}
                    max={20}
                    step={0.1}
                    value={[formData.interestRate]}
                    onValueChange={(value) => handleSliderChange('interestRate', value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatPercentage(formData.interestRate)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (months)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="loanTerm"
                    min={12}
                    max={84}
                    step={12}
                    value={[formData.loanTerm]}
                    onValueChange={(value) => handleSliderChange('loanTerm', value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.loanTerm} months
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Costs */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Costs</h3>
              
              <div className="space-y-2">
                <Label htmlFor="salesTax">Sales Tax (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="salesTax"
                    min={0}
                    max={10}
                    step={0.1}
                    value={[formData.salesTax]}
                    onValueChange={(value) => handleSliderChange('salesTax', value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatPercentage(formData.salesTax)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fees">Fees</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="fees"
                    name="fees"
                    type="number"
                    value={formData.fees}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.fees)}
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={calculatePayment} className="w-full">
              Calculate Payment
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Results</CardTitle>
            <CardDescription>
              Your monthly payment and total cost breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly Payment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.monthlyPayment)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Amount Financed</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.totalAmountFinanced)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.totalCost)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatCurrency(results.totalInterest)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.subtotal)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Tax Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.taxAmount)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarPaymentCalculator; 