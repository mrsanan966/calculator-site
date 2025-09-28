import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Car, DollarSign, Percent, Calendar } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const CarPaymentCalculator = () => {
  const [carPrice, setCarPrice] = useState(30000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(60);
  const [salesTax, setSalesTax] = useState(6);
  const [results, setResults] = useState(null);

  const calculatePayment = () => {
    // Calculate loan amount
    const loanAmount = carPrice - downPayment - tradeInValue;
    
    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate monthly payment
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);
    
    // Calculate total cost
    const totalCost = monthlyPayment * loanTerm + downPayment + tradeInValue;
    const totalInterest = totalCost - carPrice;
    
    // Calculate sales tax
    const taxAmount = carPrice * (salesTax / 100);
    
    // Generate amortization data
    const amortizationData = [];
    let remainingBalance = loanAmount;
    let totalPrincipal = 0;
    let totalInterestPaid = 0;
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      totalPrincipal += principalPayment;
      totalInterestPaid += interestPayment;
      
      if (month % 12 === 0 || month === loanTerm) {
        amortizationData.push({
          month,
          remainingBalance: Math.round(remainingBalance * 100) / 100,
          totalPrincipal: Math.round(totalPrincipal * 100) / 100,
          totalInterest: Math.round(totalInterestPaid * 100) / 100,
        });
      }
    }

    setResults({
      loanAmount,
      monthlyPayment,
      totalCost,
      totalInterest,
      taxAmount,
      amortizationData,
    });
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="p-4 sm:p-6">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl sm:text-3xl">
              <Car className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Car Payment Calculator
            </CardTitle>
            <CardDescription>
              Calculate your monthly car payment and total cost
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="carPrice">Car Price</Label>
                  <Input
                    id="carPrice"
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="downPayment">Down Payment</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="tradeInValue">Trade-in Value</Label>
                  <Input
                    id="tradeInValue"
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(Number(e.target.value))}
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="loanTerm">Loan Term (Months)</Label>
                  <Input
                    id="loanTerm"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    min="12"
                    max="84"
                  />
                </div>
                <div>
                  <Label htmlFor="salesTax">Sales Tax (%)</Label>
                  <Input
                    id="salesTax"
                    type="number"
                    value={salesTax}
                    onChange={(e) => setSalesTax(Number(e.target.value))}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <Button onClick={calculatePayment} className="w-full">
                Calculate Payment
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card className="p-4 sm:p-6 mt-6">
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payment Summary</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Monthly Payment</h4>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(results.monthlyPayment)}/mo
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        For {loanTerm} months
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Total Cost</h4>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(results.totalCost)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Including interest and fees
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Total Interest</h4>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(results.totalInterest)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Over the life of the loan
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Loan Breakdown</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.amortizationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          label={{ value: "Months", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis
                          label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip
                          formatter={(value) => [formatCurrency(value), ""]}
                          labelFormatter={(label) => `Month ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="remainingBalance"
                          name="Remaining Balance"
                          stroke="#2563eb"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="totalPrincipal"
                          name="Principal Paid"
                          stroke="#16a34a"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="totalInterest"
                          name="Interest Paid"
                          stroke="#dc2626"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default CarPaymentCalculator; 