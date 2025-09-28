import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { DollarSign, Percent, Home, Building, TrendingUp, Calendar, CreditCard } from 'lucide-react';

const ZillowRoiCalculator = () => {
  const [formData, setFormData] = useState({
    purchasePrice: 300000,
    closingCosts: 9000,
    renovationCosts: 15000,
    monthlyRent: 2000,
    vacancyRate: 5,
    propertyTaxes: 3000,
    insurance: 1200,
    maintenance: 1800,
    propertyManagement: 1200,
    appreciationRate: 3,
    investmentPeriod: 5,
    downPayment: 20,
    interestRate: 4.5,
    loanTerm: 30
  });

  const [results, setResults] = useState(null);

  const calculateROI = () => {
    const {
      purchasePrice,
      closingCosts,
      renovationCosts,
      monthlyRent,
      vacancyRate,
      propertyTaxes,
      insurance,
      maintenance,
      propertyManagement,
      appreciationRate,
      investmentPeriod,
      downPayment,
      interestRate,
      loanTerm
    } = formData;

    // Calculate total investment
    const totalInvestment = purchasePrice + closingCosts + renovationCosts;
    const downPaymentAmount = (purchasePrice * downPayment) / 100;
    const loanAmount = purchasePrice - downPaymentAmount;

    // Calculate monthly mortgage payment
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const mortgagePayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate annual income
    const annualRent = monthlyRent * 12;
    const vacancyLoss = annualRent * (vacancyRate / 100);
    const effectiveGrossIncome = annualRent - vacancyLoss;

    // Calculate annual expenses
    const annualExpenses = propertyTaxes + insurance + maintenance + propertyManagement + (mortgagePayment * 12);

    // Calculate net operating income
    const netOperatingIncome = effectiveGrossIncome - annualExpenses;

    // Calculate property appreciation
    const futureValue = purchasePrice * Math.pow(1 + appreciationRate / 100, investmentPeriod);
    const appreciation = futureValue - purchasePrice;

    // Calculate total return
    const totalReturn = (netOperatingIncome * investmentPeriod) + appreciation;

    // Calculate ROI
    const roi = (totalReturn / totalInvestment) * 100;
    const annualizedRoi = (Math.pow(1 + roi / 100, 1 / investmentPeriod) - 1) * 100;

    // Calculate cash flow
    const monthlyCashFlow = (effectiveGrossIncome - annualExpenses) / 12;

    // Calculate cap rate
    const capRate = (netOperatingIncome / totalInvestment) * 100;

    setResults({
      totalInvestment,
      downPaymentAmount,
      loanAmount,
      mortgagePayment,
      annualRent,
      vacancyLoss,
      effectiveGrossIncome,
      annualExpenses,
      netOperatingIncome,
      futureValue,
      appreciation,
      totalReturn,
      roi,
      annualizedRoi,
      monthlyCashFlow,
      capRate
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          <div className="space-y-2">
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="purchasePrice"
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => setFormData({ ...formData, purchasePrice: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="closingCosts">Closing Costs</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="closingCosts"
                type="number"
                value={formData.closingCosts}
                onChange={(e) => setFormData({ ...formData, closingCosts: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="renovationCosts">Renovation Costs</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="renovationCosts"
                type="number"
                value={formData.renovationCosts}
                onChange={(e) => setFormData({ ...formData, renovationCosts: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRent">Monthly Rent</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="monthlyRent"
                type="number"
                value={formData.monthlyRent}
                onChange={(e) => setFormData({ ...formData, monthlyRent: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input
                id="vacancyRate"
                type="number"
                value={formData.vacancyRate}
                onChange={(e) => setFormData({ ...formData, vacancyRate: Number(e.target.value) })}
                min="0"
                max="100"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Expenses</h3>
          <div className="space-y-2">
            <Label htmlFor="propertyTaxes">Annual Property Taxes</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="propertyTaxes"
                type="number"
                value={formData.propertyTaxes}
                onChange={(e) => setFormData({ ...formData, propertyTaxes: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="insurance">Annual Insurance</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="insurance"
                type="number"
                value={formData.insurance}
                onChange={(e) => setFormData({ ...formData, insurance: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="maintenance">Annual Maintenance</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="maintenance"
                type="number"
                value={formData.maintenance}
                onChange={(e) => setFormData({ ...formData, maintenance: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyManagement">Annual Property Management</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="propertyManagement"
                type="number"
                value={formData.propertyManagement}
                onChange={(e) => setFormData({ ...formData, propertyManagement: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Investment Parameters</h3>
          <div className="space-y-2">
            <Label htmlFor="appreciationRate">Annual Appreciation Rate (%)</Label>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input
                id="appreciationRate"
                type="number"
                value={formData.appreciationRate}
                onChange={(e) => setFormData({ ...formData, appreciationRate: Number(e.target.value) })}
                min="0"
                max="20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                id="investmentPeriod"
                type="number"
                value={formData.investmentPeriod}
                onChange={(e) => setFormData({ ...formData, investmentPeriod: Number(e.target.value) })}
                min="1"
                max="30"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Financing</h3>
          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment (%)</Label>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input
                id="downPayment"
                type="number"
                value={formData.downPayment}
                onChange={(e) => setFormData({ ...formData, downPayment: Number(e.target.value) })}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input
                id="interestRate"
                type="number"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                min="0"
                max="20"
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanTerm">Loan Term (Years)</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                id="loanTerm"
                type="number"
                value={formData.loanTerm}
                onChange={(e) => setFormData({ ...formData, loanTerm: Number(e.target.value) })}
                min="1"
                max="30"
              />
            </div>
          </div>
        </div>
      </div>

      <Button onClick={calculateROI} className="w-full">
        Calculate ROI
      </Button>

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Investment Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Investment</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalInvestment)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">ROI</h3>
                <p className="text-2xl font-bold mt-1">{formatPercent(results.roi)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Annualized ROI</h3>
                <p className="text-2xl font-bold mt-1">{formatPercent(results.annualizedRoi)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Cap Rate</h3>
                <p className="text-2xl font-bold mt-1">{formatPercent(results.capRate)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Cash Flow</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.monthlyCashFlow)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Property Appreciation</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.appreciation)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Future Property Value</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.futureValue)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Return</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalReturn)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZillowRoiCalculator; 