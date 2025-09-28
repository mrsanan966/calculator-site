import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Car, DollarSign, Percent, Calendar, Wallet, Info, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const CarAffordabilityCalculator = () => {
  const [scenarios, setScenarios] = useState({
    current: {
      monthlyIncome: 5000,
      monthlyExpenses: 3000,
      downPayment: 5000,
      tradeInValue: 0,
      interestRate: 5.5,
      loanTerm: 60,
      salesTax: 6,
    },
    target: {
      monthlyIncome: 6000,
      monthlyExpenses: 3500,
      downPayment: 7500,
      tradeInValue: 2000,
      interestRate: 4.5,
      loanTerm: 48,
      salesTax: 6,
    },
  });
  const [results, setResults] = useState(null);

  const calculateAffordability = () => {
    const calculateMaxCarPrice = (scenario) => {
      const { monthlyIncome, monthlyExpenses, downPayment, tradeInValue, interestRate, loanTerm, salesTax } = scenario;
      
      // Calculate available monthly payment (20% of disposable income)
      const disposableIncome = monthlyIncome - monthlyExpenses;
      const maxMonthlyPayment = disposableIncome * 0.2;
      
      // Calculate maximum loan amount
      const monthlyRate = interestRate / 100 / 12;
      const maxLoanAmount = (maxMonthlyPayment * (Math.pow(1 + monthlyRate, loanTerm) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, loanTerm));
      
      // Calculate maximum car price
      const taxAmount = maxLoanAmount * (salesTax / 100);
      const maxCarPrice = maxLoanAmount + downPayment + tradeInValue - taxAmount;
      
      return {
        maxCarPrice,
        maxMonthlyPayment,
        maxLoanAmount,
        taxAmount,
      };
    };

    const currentResults = calculateMaxCarPrice(scenarios.current);
    const targetResults = calculateMaxCarPrice(scenarios.target);

    // Generate comparison data
    const comparisonData = [
      {
        name: "Max Car Price",
        current: currentResults.maxCarPrice,
        target: targetResults.maxCarPrice,
      },
      {
        name: "Monthly Payment",
        current: currentResults.maxMonthlyPayment,
        target: targetResults.maxMonthlyPayment,
      },
      {
        name: "Loan Amount",
        current: currentResults.maxLoanAmount,
        target: targetResults.maxLoanAmount,
      },
    ];

    setResults({
      current: currentResults,
      target: targetResults,
      comparisonData,
      differences: {
        carPrice: targetResults.maxCarPrice - currentResults.maxCarPrice,
        monthlyPayment: targetResults.maxMonthlyPayment - currentResults.maxMonthlyPayment,
        loanAmount: targetResults.maxLoanAmount - currentResults.maxLoanAmount,
      },
    });
  };

  const updateScenario = (scenario, field, value) => {
    setScenarios({
      ...scenarios,
      [scenario]: {
        ...scenarios[scenario],
        [field]: Number(value),
      },
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl sm:text-3xl">
                  <Car className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  Car Affordability Calculator
                </CardTitle>
                <CardDescription>
                  Calculate how much car you can afford based on your income and expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Tabs defaultValue="current" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="current">Current Scenario</TabsTrigger>
                      <TabsTrigger value="target">Target Scenario</TabsTrigger>
                    </TabsList>
                    <TabsContent value="current">
                      <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="current-income">Monthly Income</Label>
                            <Input
                              id="current-income"
                              type="number"
                              value={scenarios.current.monthlyIncome}
                              onChange={(e) => updateScenario('current', 'monthlyIncome', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="current-expenses">Monthly Expenses</Label>
                            <Input
                              id="current-expenses"
                              type="number"
                              value={scenarios.current.monthlyExpenses}
                              onChange={(e) => updateScenario('current', 'monthlyExpenses', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="current-down">Down Payment</Label>
                            <Input
                              id="current-down"
                              type="number"
                              value={scenarios.current.downPayment}
                              onChange={(e) => updateScenario('current', 'downPayment', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="current-trade">Trade-in Value</Label>
                            <Input
                              id="current-trade"
                              type="number"
                              value={scenarios.current.tradeInValue}
                              onChange={(e) => updateScenario('current', 'tradeInValue', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="current-rate">Interest Rate (%)</Label>
                            <Input
                              id="current-rate"
                              type="number"
                              value={scenarios.current.interestRate}
                              onChange={(e) => updateScenario('current', 'interestRate', e.target.value)}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <Label htmlFor="current-term">Loan Term (Months)</Label>
                            <Input
                              id="current-term"
                              type="number"
                              value={scenarios.current.loanTerm}
                              onChange={(e) => updateScenario('current', 'loanTerm', e.target.value)}
                              min="12"
                              max="84"
                            />
                          </div>
                          <div>
                            <Label htmlFor="current-tax">Sales Tax (%)</Label>
                            <Input
                              id="current-tax"
                              type="number"
                              value={scenarios.current.salesTax}
                              onChange={(e) => updateScenario('current', 'salesTax', e.target.value)}
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="target">
                      <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <Label htmlFor="target-income">Monthly Income</Label>
                            <Input
                              id="target-income"
                              type="number"
                              value={scenarios.target.monthlyIncome}
                              onChange={(e) => updateScenario('target', 'monthlyIncome', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="target-expenses">Monthly Expenses</Label>
                            <Input
                              id="target-expenses"
                              type="number"
                              value={scenarios.target.monthlyExpenses}
                              onChange={(e) => updateScenario('target', 'monthlyExpenses', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="target-down">Down Payment</Label>
                            <Input
                              id="target-down"
                              type="number"
                              value={scenarios.target.downPayment}
                              onChange={(e) => updateScenario('target', 'downPayment', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="target-trade">Trade-in Value</Label>
                            <Input
                              id="target-trade"
                              type="number"
                              value={scenarios.target.tradeInValue}
                              onChange={(e) => updateScenario('target', 'tradeInValue', e.target.value)}
                              min="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="target-rate">Interest Rate (%)</Label>
                            <Input
                              id="target-rate"
                              type="number"
                              value={scenarios.target.interestRate}
                              onChange={(e) => updateScenario('target', 'interestRate', e.target.value)}
                              min="0"
                              step="0.01"
                            />
                          </div>
                          <div>
                            <Label htmlFor="target-term">Loan Term (Months)</Label>
                            <Input
                              id="target-term"
                              type="number"
                              value={scenarios.target.loanTerm}
                              onChange={(e) => updateScenario('target', 'loanTerm', e.target.value)}
                              min="12"
                              max="84"
                            />
                          </div>
                          <div>
                            <Label htmlFor="target-tax">Sales Tax (%)</Label>
                            <Input
                              id="target-tax"
                              type="number"
                              value={scenarios.target.salesTax}
                              onChange={(e) => updateScenario('target', 'salesTax', e.target.value)}
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button onClick={calculateAffordability} className="w-full">
                    Calculate Affordability
                  </Button>
                </div>
              </CardContent>
            </Card>

            {results && (
              <Card className="p-4 sm:p-6 mt-6">
                <CardContent>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Affordability Summary</h3>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        <div className="rounded-lg border p-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Max Car Price</h4>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(results.current.maxCarPrice)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Current Scenario
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Monthly Payment</h4>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(results.current.maxMonthlyPayment)}/mo
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            20% of disposable income
                          </p>
                        </div>
                        <div className="rounded-lg border p-4">
                          <h4 className="text-sm font-medium text-muted-foreground">Price Difference</h4>
                          <p className={`text-2xl font-bold ${
                            results.differences.carPrice >= 0 ? "text-green-600" : "text-red-600"
                          }`}>
                            {formatCurrency(Math.abs(results.differences.carPrice))}
                            {results.differences.carPrice >= 0 ? " more" : " less"}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Target vs Current
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Scenario Comparison</h3>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results.comparisonData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis
                              label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
                              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                              formatter={(value) => [formatCurrency(value), ""]}
                            />
                            <Legend />
                            <Bar
                              dataKey="current"
                              name="Current Scenario"
                              fill="#2563eb"
                            />
                            <Bar
                              dataKey="target"
                              name="Target Scenario"
                              fill="#16a34a"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-4 sm:p-6">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Info className="mr-2 h-5 w-5 text-primary" />
                  Car Buying Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">20/4/10 Rule</h4>
                      <p className="text-sm text-muted-foreground">
                        Put 20% down, finance for no more than 4 years, and keep monthly payments under 10% of your income.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Total Cost of Ownership</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider insurance, maintenance, fuel, and depreciation when budgeting.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Best Time to Buy</h4>
                      <p className="text-sm text-muted-foreground">
                        End of month, quarter, or year often brings better deals as dealers try to meet quotas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Negotiation Strategy</h4>
                      <p className="text-sm text-muted-foreground">
                        Research market prices, get pre-approved financing, and negotiate the total price, not monthly payments.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Car className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Test Drive Tips</h4>
                      <p className="text-sm text-muted-foreground">
                        Test drive in various conditions, check all features, and inspect the vehicle thoroughly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Percent className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Interest Rate Impact</h4>
                      <p className="text-sm text-muted-foreground">
                        A 1% difference in interest rate can save thousands over the life of the loan.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-4 sm:p-6">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                  Common Mistakes to Avoid
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Focusing Only on Monthly Payments</h4>
                      <p className="text-sm text-muted-foreground">
                        Longer loan terms mean lower payments but higher total cost.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Skipping the Down Payment</h4>
                      <p className="text-sm text-muted-foreground">
                        Low or no down payment leads to higher interest rates and negative equity.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2" />
                    <div>
                      <h4 className="font-medium">Ignoring Additional Costs</h4>
                      <p className="text-sm text-muted-foreground">
                        Factor in insurance, maintenance, and fuel costs in your budget.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CarAffordabilityCalculator; 