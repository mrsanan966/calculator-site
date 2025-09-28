import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const CarAffordabilityCalculator = () => {
  const [formData, setFormData] = useState({
    // Income
    monthlyIncome: 5000,
    additionalIncome: 0,
    
    // Expenses
    monthlyExpenses: 2000,
    otherDebtPayments: 500,
    
    // Car Loan Details
    downPayment: 2000,
    tradeInValue: 0,
    interestRate: 4.5,
    loanTerm: 60,
    
    // Additional Costs
    insurance: 150,
    maintenance: 100,
    fuel: 200
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

  const calculateAffordability = () => {
    const {
      monthlyIncome,
      additionalIncome,
      monthlyExpenses,
      otherDebtPayments,
      downPayment,
      tradeInValue,
      interestRate,
      loanTerm,
      insurance,
      maintenance,
      fuel
    } = formData;

    // Calculate total monthly income
    const totalMonthlyIncome = monthlyIncome + additionalIncome;

    // Calculate total monthly expenses (excluding car-related expenses)
    const totalMonthlyExpenses = monthlyExpenses + otherDebtPayments;

    // Calculate available monthly income for car
    const availableForCar = totalMonthlyIncome - totalMonthlyExpenses;

    // Calculate maximum monthly car payment (20% of available income)
    const maxMonthlyPayment = availableForCar * 0.2;

    // Calculate total monthly car expenses
    const totalMonthlyCarExpenses = insurance + maintenance + fuel;

    // Calculate maximum monthly loan payment
    const maxMonthlyLoanPayment = maxMonthlyPayment - totalMonthlyCarExpenses;

    // Convert annual interest rate to monthly
    const monthlyRate = interestRate / 100 / 12;

    // Calculate maximum loan amount
    const maxLoanAmount = 
      (maxMonthlyLoanPayment * (Math.pow(1 + monthlyRate, loanTerm) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, loanTerm));

    // Calculate maximum car price
    const maxCarPrice = maxLoanAmount + downPayment + tradeInValue;

    // Calculate actual monthly payment for the maximum car price
    const actualMonthlyPayment = 
      (maxLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);

    setResults({
      totalMonthlyIncome,
      availableForCar,
      maxMonthlyPayment,
      totalMonthlyCarExpenses,
      maxMonthlyLoanPayment,
      maxLoanAmount,
      maxCarPrice,
      actualMonthlyPayment,
      totalMonthlyCarCost: actualMonthlyPayment + totalMonthlyCarExpenses
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Car Affordability Calculator</CardTitle>
          <CardDescription>
            Determine how much car you can afford based on your income and expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Income Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Income</h3>
              
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.monthlyIncome)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalIncome">Additional Income</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="additionalIncome"
                    name="additionalIncome"
                    type="number"
                    value={formData.additionalIncome}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.additionalIncome)}
                  </span>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Monthly Expenses</h3>
              
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Regular Monthly Expenses</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="monthlyExpenses"
                    name="monthlyExpenses"
                    type="number"
                    value={formData.monthlyExpenses}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.monthlyExpenses)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherDebtPayments">Other Debt Payments</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="otherDebtPayments"
                    name="otherDebtPayments"
                    type="number"
                    value={formData.otherDebtPayments}
                    onChange={handleInputChange}
                    min="0"
                    step="100"
                  />
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(formData.otherDebtPayments)}
                  </span>
                </div>
              </div>
            </div>

            {/* Car Loan Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Car Loan Details</h3>
              
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
              <h3 className="text-lg font-semibold">Additional Monthly Costs</h3>
              
              {[
                { id: 'insurance', label: 'Insurance' },
                { id: 'maintenance', label: 'Maintenance' },
                { id: 'fuel', label: 'Fuel' }
              ].map(({ id, label }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id}>{label}</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id={id}
                      name={id}
                      type="number"
                      value={formData[id]}
                      onChange={handleInputChange}
                      min="0"
                      step="50"
                    />
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(formData[id])}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={calculateAffordability} className="w-full">
              Calculate Affordability
            </Button>
          </div>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Affordability Results</CardTitle>
            <CardDescription>
              Maximum car price and monthly costs you can afford
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Maximum Car Price</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.maxCarPrice)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Maximum Loan Amount</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.maxLoanAmount)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly Car Payment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.actualMonthlyPayment)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Monthly Car Costs</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.totalMonthlyCarCost)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Available Monthly Income</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.availableForCar)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Maximum Monthly Payment</p>
                  <p className="text-2xl font-bold">{formatCurrency(results.maxMonthlyPayment)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarAffordabilityCalculator; 