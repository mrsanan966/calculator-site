import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const AutoLoanRefinanceCalculator = () => {
  const [formData, setFormData] = useState({
    currentBalance: 25000,
    currentInterestRate: 5.5,
    currentTerm: 60,
    newInterestRate: 4.5,
    newTerm: 60,
    refinanceFees: 0
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

  const calculateRefinance = () => {
    const {
      currentBalance,
      currentInterestRate,
      currentTerm,
      newInterestRate,
      newTerm,
      refinanceFees
    } = formData;

    // Convert annual rates to monthly
    const currentMonthlyRate = currentInterestRate / 100 / 12;
    const newMonthlyRate = newInterestRate / 100 / 12;

    // Calculate current monthly payment
    const currentMonthlyPayment = 
      (currentBalance * currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentTerm)) /
      (Math.pow(1 + currentMonthlyRate, currentTerm) - 1);

    // Calculate new monthly payment
    const newMonthlyPayment = 
      (currentBalance * newMonthlyRate * Math.pow(1 + newMonthlyRate, newTerm)) /
      (Math.pow(1 + newMonthlyRate, newTerm) - 1);

    // Calculate total payments
    const currentTotalPayments = currentMonthlyPayment * currentTerm;
    const newTotalPayments = (newMonthlyPayment * newTerm) + refinanceFees;

    // Calculate savings
    const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
    const totalSavings = currentTotalPayments - newTotalPayments;

    setResults({
      currentMonthlyPayment,
      newMonthlyPayment,
      monthlySavings,
      totalSavings,
      currentTotalPayments,
      newTotalPayments
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Auto Loan Refinance Calculator</CardTitle>
          <CardDescription>
            Calculate potential savings when refinancing your auto loan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Current Loan Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Loan Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="currentBalance">Current Loan Balance</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="currentBalance"
                    name="currentBalance"
                    type="number"
                    value={formData.currentBalance}
                    onChange={handleInputChange}
                    min="0"
                    step="1000"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.currentBalance)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="currentInterestRate"
                    min={0}
                    max={20}
                    step={0.1}
                    value={[formData.currentInterestRate]}
                    onValueChange={(value) => handleSliderChange('currentInterestRate', value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatPercentage(formData.currentInterestRate)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentTerm">Current Term (months)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="currentTerm"
                    min={12}
                    max={84}
                    step={12}
                    value={[formData.currentTerm]}
                    onValueChange={(value) => handleSliderChange('currentTerm', value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.currentTerm} months
                  </span>
                </div>
              </div>
            </div>

            {/* New Loan Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">New Loan Details</h3>
              
              <div className="space-y-2">
                <Label htmlFor="newInterestRate">New Interest Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="newInterestRate"
                    min={0}
                    max={20}
                    step={0.1}
                    value={[formData.newInterestRate]}
                    onValueChange={(value) => handleSliderChange('newInterestRate', value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatPercentage(formData.newInterestRate)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newTerm">New Term (months)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="newTerm"
                    min={12}
                    max={84}
                    step={12}
                    value={[formData.newTerm]}
                    onValueChange={(value) => handleSliderChange('newTerm', value)}
                    className="w-full"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formData.newTerm} months
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refinanceFees">Refinance Fees</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="refinanceFees"
                    name="refinanceFees"
                    type="number"
                    value={formData.refinanceFees}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.refinanceFees)}
                  </span>
                </div>
              </div>
            </div>

            <Button onClick={calculateRefinance} className="w-full">
              Calculate Savings
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Refinance Results</CardTitle>
            <CardDescription>
              See how much you could save by refinancing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Monthly Payment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.currentMonthlyPayment)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">New Monthly Payment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.newMonthlyPayment)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.monthlySavings)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Savings</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(results.totalSavings)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Total Payments</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.currentTotalPayments)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">New Total Payments</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.newTotalPayments)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutoLoanRefinanceCalculator; 