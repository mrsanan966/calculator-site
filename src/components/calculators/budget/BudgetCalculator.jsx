import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

const BudgetCalculator = () => {
  const [income, setIncome] = useState({
    salary: 0,
    investments: 0,
    other: 0,
  });

  const [expenses, setExpenses] = useState({
    housing: 0,
    transportation: 0,
    food: 0,
    utilities: 0,
    insurance: 0,
    entertainment: 0,
    savings: 0,
    other: 0,
  });

  const [results, setResults] = useState(null);

  const calculateBudget = () => {
    const totalIncome = Object.values(income).reduce((sum, value) => sum + Number(value), 0);
    const totalExpenses = Object.values(expenses).reduce((sum, value) => sum + Number(value), 0);
    const balance = totalIncome - totalExpenses;

    const expenseData = Object.entries(expenses).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value),
    }));

    const incomeData = Object.entries(income).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Number(value),
    }));

    setResults({
      totalIncome,
      totalExpenses,
      balance,
      expenseData,
      incomeData,
    });
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B"];

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
              <Calculator className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Budget Calculator
            </CardTitle>
            <CardDescription>
              Track your income and expenses to create a balanced budget
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="income" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
              <TabsContent value="income" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="salary">Monthly Salary</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={income.salary}
                      onChange={(e) => setIncome({ ...income, salary: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="investments">Investment Income</Label>
                    <Input
                      id="investments"
                      type="number"
                      value={income.investments}
                      onChange={(e) => setIncome({ ...income, investments: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="other-income">Other Income</Label>
                    <Input
                      id="other-income"
                      type="number"
                      value={income.other}
                      onChange={(e) => setIncome({ ...income, other: e.target.value })}
                      min="0"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="expenses" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="housing">Housing</Label>
                    <Input
                      id="housing"
                      type="number"
                      value={expenses.housing}
                      onChange={(e) => setExpenses({ ...expenses, housing: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="transportation">Transportation</Label>
                    <Input
                      id="transportation"
                      type="number"
                      value={expenses.transportation}
                      onChange={(e) => setExpenses({ ...expenses, transportation: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="food">Food</Label>
                    <Input
                      id="food"
                      type="number"
                      value={expenses.food}
                      onChange={(e) => setExpenses({ ...expenses, food: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="utilities">Utilities</Label>
                    <Input
                      id="utilities"
                      type="number"
                      value={expenses.utilities}
                      onChange={(e) => setExpenses({ ...expenses, utilities: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insurance">Insurance</Label>
                    <Input
                      id="insurance"
                      type="number"
                      value={expenses.insurance}
                      onChange={(e) => setExpenses({ ...expenses, insurance: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="entertainment">Entertainment</Label>
                    <Input
                      id="entertainment"
                      type="number"
                      value={expenses.entertainment}
                      onChange={(e) => setExpenses({ ...expenses, entertainment: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="savings">Savings</Label>
                    <Input
                      id="savings"
                      type="number"
                      value={expenses.savings}
                      onChange={(e) => setExpenses({ ...expenses, savings: e.target.value })}
                      min="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="other-expenses">Other Expenses</Label>
                    <Input
                      id="other-expenses"
                      type="number"
                      value={expenses.other}
                      onChange={(e) => setExpenses({ ...expenses, other: e.target.value })}
                      min="0"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <Button onClick={calculateBudget} className="mt-6 w-full">
              Calculate Budget
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card className="p-4 sm:p-6 mt-6">
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Summary</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Total Income</h4>
                      <p className="text-2xl font-bold text-green-600">
                        ${results.totalIncome.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Total Expenses</h4>
                      <p className="text-2xl font-bold text-red-600">
                        ${results.totalExpenses.toLocaleString()}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4 sm:col-span-2 lg:col-span-1">
                      <h4 className="text-sm font-medium text-muted-foreground">Balance</h4>
                      <p className={`text-2xl font-bold ${results.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                        ${results.balance.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Expense Breakdown</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={results.expenseData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {results.expenseData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                      </PieChart>
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

export default BudgetCalculator; 