import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Home, DollarSign, Percent, Calendar } from "lucide-react";
import { calculateHeloc, formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatPercentage } from '@/lib/utils';

const HelocCalculator = () => {
  const [formData, setFormData] = useState({
    homeValue: 300000,
    currentMortgage: 200000,
    creditScore: 700,
    interestRate: 5.5,
    drawPeriod: 10,
    repaymentPeriod: 20,
    desiredAmount: 50000
  });

  const [results, setResults] = useState(null);

  const calculateHeloc = () => {
    const {
      homeValue,
      currentMortgage,
      creditScore,
      interestRate,
      drawPeriod,
      repaymentPeriod,
      desiredAmount
    } = formData;

    // Calculate available equity
    const availableEquity = homeValue * 0.85 - currentMortgage;
    const maxBorrowingAmount = Math.min(availableEquity, desiredAmount);

    // Calculate monthly payment during draw period (interest-only)
    const monthlyInterestPayment = (maxBorrowingAmount * (interestRate / 100)) / 12;

    // Calculate monthly payment during repayment period
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = repaymentPeriod * 12;
    const monthlyPayment = (maxBorrowingAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    // Generate amortization data
    const amortizationData = [];
    let balance = maxBorrowingAmount;
    for (let month = 1; month <= totalPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      amortizationData.push({
        month,
        balance: Math.max(0, balance),
        interestPayment,
        principalPayment
      });
    }

    setResults({
      availableEquity,
      maxBorrowingAmount,
      monthlyInterestPayment,
      monthlyPayment,
      amortizationData
    });
  };

  return (
    <div className="container py-4 sm:py-6 md:py-8 lg:py-12" id="heloc-calculator">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">HELOC Calculator</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Calculate your home equity line of credit payments and borrowing power
          </p>
        </div>

        <Card className="p-3 sm:p-4 md:p-6 lg:p-8 mb-6">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl">HELOC Details</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your home and loan information to calculate your HELOC payments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="home-value" className="text-sm sm:text-base">Home Value</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="home-value"
                    type="number"
                    value={formData.homeValue}
                    onChange={(e) => setFormData({ ...formData, homeValue: Number(e.target.value) })}
                    min="0"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-mortgage" className="text-sm sm:text-base">Current Mortgage Balance</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="current-mortgage"
                    type="number"
                    value={formData.currentMortgage}
                    onChange={(e) => setFormData({ ...formData, currentMortgage: Number(e.target.value) })}
                    min="0"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credit-score" className="text-sm sm:text-base">Credit Score</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Slider
                    id="credit-score"
                    value={[formData.creditScore]}
                    onValueChange={([value]) => setFormData({ ...formData, creditScore: value })}
                    min={300}
                    max={850}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-sm sm:text-base">{formData.creditScore}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest-rate" className="text-sm sm:text-base">Interest Rate (%)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Slider
                    id="interest-rate"
                    value={[formData.interestRate]}
                    onValueChange={([value]) => setFormData({ ...formData, interestRate: value })}
                    min={0}
                    max={20}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-sm sm:text-base">{formData.interestRate}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="draw-period" className="text-sm sm:text-base">Draw Period (Years)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Slider
                    id="draw-period"
                    value={[formData.drawPeriod]}
                    onValueChange={([value]) => setFormData({ ...formData, drawPeriod: value })}
                    min={1}
                    max={15}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-sm sm:text-base">{formData.drawPeriod}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="repayment-period" className="text-sm sm:text-base">Repayment Period (Years)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Slider
                    id="repayment-period"
                    value={[formData.repaymentPeriod]}
                    onValueChange={([value]) => setFormData({ ...formData, repaymentPeriod: value })}
                    min={1}
                    max={30}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-sm sm:text-base">{formData.repaymentPeriod}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="desired-amount" className="text-sm sm:text-base">Desired Amount</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="desired-amount"
                    type="number"
                    value={formData.desiredAmount}
                    onChange={(e) => setFormData({ ...formData, desiredAmount: Number(e.target.value) })}
                    min="0"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <Button
                onClick={calculateHeloc}
                className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
              >
                Calculate HELOC
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card className="p-3 sm:p-4 md:p-6 lg:p-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">Results</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Based on your inputs, here's what you can expect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Available Equity</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.availableEquity)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Maximum Borrowing Amount</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.maxBorrowingAmount)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Monthly Interest Payment (Draw Period)</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.monthlyInterestPayment)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Monthly Payment (Repayment Period)</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.monthlyPayment)}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.amortizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      tick={{ fontSize: 12 }}
                      label={{ value: 'Balance', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#2563eb"
                      strokeWidth={2}
                      name="Remaining Balance"
                    />
                    <Line
                      type="monotone"
                      dataKey="interestPayment"
                      stroke="#16a34a"
                      strokeWidth={2}
                      name="Interest Payment"
                    />
                    <Line
                      type="monotone"
                      dataKey="principalPayment"
                      stroke="#dc2626"
                      strokeWidth={2}
                      name="Principal Payment"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        <SeoContent title="Understanding Home Equity Lines of Credit (HELOCs)">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">How HELOCs Work</h2>
          <p className="text-sm sm:text-base mb-4">
            A Home Equity Line of Credit (HELOC) allows you to borrow against your home's equity. The amount you can borrow is typically up to 85% of your home's value minus your current mortgage balance.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">HELOC Terms to Know</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
            <li><strong>Draw Period:</strong> Usually 10 years, during which you can borrow and make interest-only payments</li>
            <li><strong>Repayment Period:</strong> Typically 15-20 years, when you repay principal and interest</li>
            <li><strong>Variable Interest Rate:</strong> HELOC rates usually vary with the prime rate</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default HelocCalculator;
