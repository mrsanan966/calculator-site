import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { DollarSign, Percent, Home, Building, TrendingUp, Calendar, CreditCard } from 'lucide-react';

const ZillowMortgageCalculator = () => {
  const [formData, setFormData] = useState({
    homePrice: 300000,
    downPayment: 60000,
    downPaymentPercent: 20,
    loanAmount: 240000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyTax: 3000,
    insurance: 1200,
    pmi: 0,
    startDate: new Date().toISOString().split('T')[0]
  });

  const [results, setResults] = useState(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  const calculateMortgage = () => {
    const {
      loanAmount,
      interestRate,
      loanTerm,
      propertyTax,
      insurance,
      pmi
    } = formData;

    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Calculate monthly mortgage payment
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Calculate total monthly payment including taxes, insurance, and PMI
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = pmi / 12;
    const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPMI;

    // Calculate total interest paid
    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;

    // Calculate total cost
    const totalCost = totalMonthlyPayment * numberOfPayments;

    // Generate amortization schedule
    const schedule = [];
    let balance = loanAmount;
    let totalPrincipal = 0;
    let totalInterestPaid = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;
      totalPrincipal += principalPayment;
      totalInterestPaid += interestPayment;

      if (i <= 12 || i % 12 === 0) {
        schedule.push({
          paymentNumber: i,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
          totalPrincipal,
          totalInterestPaid
        });
      }
    }

    setResults({
      monthlyPayment,
      monthlyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthlyPayment,
      totalInterest,
      totalCost,
      loanAmount,
      numberOfPayments
    });

    setAmortizationSchedule(schedule);
  };

  const handleDownPaymentChange = (value, isPercent = false) => {
    const homePrice = formData.homePrice;
    let downPayment, downPaymentPercent;

    if (isPercent) {
      downPaymentPercent = value;
      downPayment = (homePrice * value) / 100;
    } else {
      downPayment = value;
      downPaymentPercent = (value / homePrice) * 100;
    }

    const loanAmount = homePrice - downPayment;
    const pmi = downPaymentPercent < 20 ? (loanAmount * 0.01) / 12 : 0;

    setFormData({
      ...formData,
      downPayment,
      downPaymentPercent,
      loanAmount,
      pmi
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Home Details</h3>
          <div className="space-y-2">
            <Label htmlFor="homePrice">Home Price</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="homePrice"
                type="number"
                value={formData.homePrice}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFormData({ ...formData, homePrice: value });
                  handleDownPaymentChange(formData.downPaymentPercent, true);
                }}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPayment">Down Payment</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="downPayment"
                type="number"
                value={formData.downPayment}
                onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="downPaymentPercent">Down Payment (%)</Label>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input
                id="downPaymentPercent"
                type="number"
                value={formData.downPaymentPercent}
                onChange={(e) => handleDownPaymentChange(Number(e.target.value), true)}
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="loanAmount"
                type="number"
                value={formData.loanAmount}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Loan Details</h3>
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

          <div className="space-y-2">
            <Label htmlFor="propertyTax">Annual Property Tax</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="propertyTax"
                type="number"
                value={formData.propertyTax}
                onChange={(e) => setFormData({ ...formData, propertyTax: Number(e.target.value) })}
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
        </div>
      </div>

      <Button onClick={calculateMortgage} className="w-full">
        Calculate Mortgage
      </Button>

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Mortgage Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Payment</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.monthlyPayment)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Monthly Payment</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalMonthlyPayment)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Cost</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalCost)}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Amortization Schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Payment #</th>
                      <th className="text-right py-2">Payment</th>
                      <th className="text-right py-2">Principal</th>
                      <th className="text-right py-2">Interest</th>
                      <th className="text-right py-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.map((row) => (
                      <tr key={row.paymentNumber} className="border-b">
                        <td className="py-2">{row.paymentNumber}</td>
                        <td className="text-right py-2">{formatCurrency(row.payment)}</td>
                        <td className="text-right py-2">{formatCurrency(row.principal)}</td>
                        <td className="text-right py-2">{formatCurrency(row.interest)}</td>
                        <td className="text-right py-2">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZillowMortgageCalculator; 