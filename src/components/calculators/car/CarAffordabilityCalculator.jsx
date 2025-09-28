import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DollarSign, Percent, Calendar, Home, BarChart2, CreditCard, PiggyBank } from 'lucide-react';
import { formatCurrency, formatNumber } from "@/utils/calculators";
import { motion } from "framer-motion";
import { SeoContent } from "@/components/SeoContent";

const CarAffordabilityCalculator = () => {
  const [income, setIncome] = useState({
    monthly: 5000,
    other: 0,
  });

  const [expenses, setExpenses] = useState({
    housing: 1500,
    utilities: 300,
    food: 400,
    transportation: 200,
    insurance: 200,
    entertainment: 300,
    savings: 500,
    other: 200,
  });

  const [carDetails, setCarDetails] = useState({
    downPayment: 5000,
    tradeInValue: 0,
    interestRate: 5,
    loanTerm: 60,
    salesTax: 6,
    insurance: 150,
    maintenance: 100,
    fuel: 200,
  });

  const [results, setResults] = useState(null);

  const calculateAffordability = () => {
    const totalIncome = parseFloat(income.monthly) + parseFloat(income.other);
    const totalExpenses = Object.values(expenses).reduce((sum, value) => sum + parseFloat(value), 0);
    const availableForCar = totalIncome - totalExpenses;

    const monthlyCarExpenses = {
      insurance: parseFloat(carDetails.insurance),
      maintenance: parseFloat(carDetails.maintenance),
      fuel: parseFloat(carDetails.fuel),
    };

    const totalMonthlyCarExpenses = Object.values(monthlyCarExpenses).reduce(
      (sum, value) => sum + Number(value),
      0
    );

    const maxMonthlyPayment = availableForCar - totalMonthlyCarExpenses;

    // Calculate maximum car price based on monthly payment
    const monthlyRate = carDetails.interestRate / 100 / 12;
    const numberOfPayments = carDetails.loanTerm;
    const downPayment = Number(carDetails.downPayment) + Number(carDetails.tradeInValue);
    const salesTaxAmount = (carDetails.salesTax / 100) * maxMonthlyPayment;

    const maxLoanAmount = 
      (maxMonthlyPayment * ((1 + monthlyRate) ** numberOfPayments - 1)) /
      (monthlyRate * (1 + monthlyRate) ** numberOfPayments);

    const estimatedMaxCarPrice = maxLoanAmount + downPayment;

    // Generate data for the chart
    const data = [];
    const step = estimatedMaxCarPrice / 10;
    for (let price = 0; price <= estimatedMaxCarPrice * 1.2; price += step) {
        if (price < downPayment) continue;
        const loanAmt = price - downPayment;
        if (loanAmt <= 0) {
             data.push({
                price: Math.round(price),
                payment: 0,
                totalMonthly: Math.round(totalMonthlyCarExpenses),
              });
              continue;
        }
        const monthlyPayment =
          (loanAmt * monthlyRate * (1 + monthlyRate) ** numberOfPayments) /
          ((1 + monthlyRate) ** numberOfPayments - 1);
        data.push({
          price: Math.round(price),
          payment: Math.round(monthlyPayment),
          totalMonthly: Math.round(monthlyPayment + totalMonthlyCarExpenses),
        });
    }

    setResults({
      maxCarPrice: Math.round(estimatedMaxCarPrice),
      maxMonthlyPayment: Math.round(maxMonthlyPayment),
      totalMonthlyCarExpenses: Math.round(totalMonthlyCarExpenses),
      monthlyCarExpenses,
      data,
    });
  };

  return (
    <div className="container py-4 sm:py-6 md:py-8 lg:py-12" id="car-affordability">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Car Affordability Calculator</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Determine how much car you can afford based on your income, expenses, and desired loan terms.
          </p>
        </div>

        <Card className="p-3 sm:p-4 md:p-6 lg:p-8 mb-6">
          <Tabs defaultValue="income" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <TabsTrigger value="income" className="text-sm sm:text-base py-2 sm:py-3">Income</TabsTrigger>
              <TabsTrigger value="expenses" className="text-sm sm:text-base py-2 sm:py-3">Expenses</TabsTrigger>
              <TabsTrigger value="car" className="text-sm sm:text-base py-2 sm:py-3">Car Details</TabsTrigger>
            </TabsList>

            <TabsContent value="income" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthly-income" className="text-sm sm:text-base">Monthly Income</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="monthly-income"
                      type="number"
                      value={income.monthly}
                      onChange={(e) => setIncome({ ...income, monthly: e.target.value })}
                      className="text-sm sm:text-base"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other-income" className="text-sm sm:text-base">Other Income</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="other-income"
                      type="number"
                      value={income.other}
                      onChange={(e) => setIncome({ ...income, other: e.target.value })}
                      className="text-sm sm:text-base"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(expenses).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-sm sm:text-base capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                    <div className="flex items-center gap-2 sm:gap-4">
                      <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      <Input
                        id={key}
                        type="number"
                        value={value}
                        onChange={(e) => setExpenses({ ...expenses, [key]: e.target.value })}
                        className="text-sm sm:text-base"
                        min="0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="car" className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="down-payment" className="text-sm sm:text-base">Down Payment</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="down-payment"
                      type="number"
                      value={carDetails.downPayment}
                      onChange={(e) => setCarDetails({ ...carDetails, downPayment: e.target.value })}
                      className="text-sm sm:text-base"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trade-in" className="text-sm sm:text-base">Trade-in Value</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="trade-in"
                      type="number"
                      value={carDetails.tradeInValue}
                      onChange={(e) => setCarDetails({ ...carDetails, tradeInValue: e.target.value })}
                      className="text-sm sm:text-base"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest-rate" className="text-sm sm:text-base">Interest Rate (%)</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Slider
                      id="interest-rate"
                      value={[carDetails.interestRate]}
                      onValueChange={([value]) => setCarDetails({ ...carDetails, interestRate: value })}
                      min={0}
                      max={20}
                      step={0.1}
                      className="flex-1"
                    />
                    <span className="w-12 text-right text-sm sm:text-base font-medium text-primary">
                      {carDetails.interestRate}%
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loan-term" className="text-sm sm:text-base">Loan Term (Months)</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Slider
                      id="loan-term"
                      value={[carDetails.loanTerm]}
                      onValueChange={([value]) => setCarDetails({ ...carDetails, loanTerm: value })}
                      min={12}
                      max={84}
                      step={12}
                      className="flex-1"
                    />
                    <span className="w-12 text-right text-sm sm:text-base font-medium text-primary">
                      {carDetails.loanTerm}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <Button
            onClick={calculateAffordability}
            className="w-full mt-4 sm:mt-6 text-sm sm:text-base py-2 sm:py-3"
          >
            Calculate Affordability
          </Button>
        </Card>

        {results && (
          <Card className="p-3 sm:p-4 md:p-6 lg:p-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">Results</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Based on your inputs, here's what you can afford
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Maximum Car Price</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.maxCarPrice)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Monthly Payment</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.maxMonthlyPayment)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Monthly Car Expenses</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.totalMonthlyCarExpenses)}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 h-[300px] sm:h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="price"
                      tickFormatter={(value) => formatCurrency(value)}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(value) => `Price: ${formatCurrency(value)}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="payment"
                      stroke="#2563eb"
                      strokeWidth={2}
                      name="Monthly Payment"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalMonthly"
                      stroke="#16a34a"
                      strokeWidth={2}
                      name="Total Monthly Cost"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        <SeoContent title="Understanding Car Affordability">
          <p>
            Determining how much car you can afford involves looking beyond just the monthly loan payment. Our Car Affordability Calculator takes into account your income, existing expenses, and the potential ongoing costs of car ownership (insurance, maintenance, and fuel) to give you a realistic estimate of a comfortable car price range.
          </p>
          <p>
            <strong className="text-foreground">Key Factors:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong className="text-foreground">Income vs. Expenses:</strong> The core of affordability is how much disposable income you have after covering your essential living expenses.</li>
            <li><strong className="text-foreground">Loan Terms:</strong> The interest rate and loan term significantly impact your monthly loan payment. A longer term means lower monthly payments but more interest paid over time.</li>
            <li><strong className="text-foreground">Ongoing Car Costs:</strong> Don't forget to budget for insurance, routine maintenance, and fuel, which are recurring monthly expenses.</li>
          </ul>
          <p>
            Use this calculator as a guide to help you set a realistic budget when shopping for a car. It's always a good idea to get pre-approved for a car loan to know your exact interest rate and terms before making a final decision.
          </p>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default CarAffordabilityCalculator; 