import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const DebtPayoffCalculator = () => {
  const [debts, setDebts] = useState([
    { name: 'Credit Card', balance: 5000, interestRate: 18.99, minimumPayment: 100 },
  ]);
  const [extraPayment, setExtraPayment] = useState(200);
  const [strategy, setStrategy] = useState('avalanche');
  const [results, setResults] = useState(null);

  const addDebt = () => {
    setDebts([
      ...debts,
      { name: '', balance: 0, interestRate: 0, minimumPayment: 0 },
    ]);
  };

  const removeDebt = (index) => {
    setDebts(debts.filter((_, i) => i !== index));
  };

  const updateDebt = (index, field, value) => {
    const newDebts = [...debts];
    newDebts[index] = { ...newDebts[index], [field]: value };
    setDebts(newDebts);
  };

  const calculatePayoff = () => {
    // Sort debts based on strategy
    const sortedDebts = [...debts].sort((a, b) => {
      if (strategy === 'avalanche') {
        return b.interestRate - a.interestRate;
      } else {
        return a.balance - b.balance;
      }
    });

    // Calculate payoff schedule
    const schedule = [];
    let month = 0;
    let totalBalance = debts.reduce((sum, debt) => sum + Number(debt.balance), 0);
    let totalInterest = 0;
    const maxMonths = 360; // 30 years max

    while (totalBalance > 0 && month < maxMonths) {
      let remainingPayment = extraPayment;
      let monthInterest = 0;

      // Pay minimum payments first
      debts.forEach(debt => {
        const monthlyRate = debt.interestRate / 100 / 12;
        const interest = debt.balance * monthlyRate;
        monthInterest += interest;
        debt.balance = debt.balance + interest - debt.minimumPayment;
        remainingPayment -= debt.minimumPayment;
      });

      // Apply extra payment to highest priority debt
      if (remainingPayment > 0) {
        const priorityDebt = sortedDebts.find(debt => debt.balance > 0);
        if (priorityDebt) {
          priorityDebt.balance = Math.max(0, priorityDebt.balance - remainingPayment);
        }
      }

      totalBalance = debts.reduce((sum, debt) => sum + Math.max(0, debt.balance), 0);
      totalInterest += monthInterest;
      month++;

      schedule.push({
        month,
        totalBalance: Math.round(totalBalance * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    }

    // Calculate individual debt scenarios
    const debtScenarios = sortedDebts.map(debt => {
      const monthlyRate = debt.interestRate / 100 / 12;
      const payment = Number(debt.minimumPayment);
      let balance = Number(debt.balance);
      let totalInterest = 0;
      let months = 0;

      while (balance > 0 && months < maxMonths) {
        const interest = balance * monthlyRate;
        balance = balance + interest - payment;
        totalInterest += interest;
        months++;
      }

      return {
        name: debt.name,
        monthsToPayoff: months,
        totalInterest: Math.round(totalInterest * 100) / 100,
      };
    });

    setResults({
      totalMonths: month,
      totalInterest: schedule[schedule.length - 1].totalInterest,
      debtScenarios,
      schedule,
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
              <CreditCard className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Debt Payoff Calculator
            </CardTitle>
            <CardDescription>
              Create a debt payoff strategy using either the Avalanche or Snowball method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="strategy">Payoff Strategy</Label>
                  <Select value={strategy} onValueChange={setStrategy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avalanche">Avalanche (Highest Interest First)</SelectItem>
                      <SelectItem value="snowball">Snowball (Lowest Balance First)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
                  <Input
                    id="extraPayment"
                    type="number"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value))}
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Debts</h3>
                  <Button onClick={addDebt} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Debt
                  </Button>
                </div>
                <div className="space-y-4">
                  {debts.map((debt, index) => (
                    <div key={index} className="grid gap-4 sm:grid-cols-2 p-4 border rounded-lg">
                      <div>
                        <Label htmlFor={`debt-name-${index}`}>Debt Name</Label>
                        <Input
                          id={`debt-name-${index}`}
                          value={debt.name}
                          onChange={(e) => updateDebt(index, 'name', e.target.value)}
                          placeholder="e.g., Credit Card"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`debt-balance-${index}`}>Balance</Label>
                        <Input
                          id={`debt-balance-${index}`}
                          type="number"
                          value={debt.balance}
                          onChange={(e) => updateDebt(index, 'balance', Number(e.target.value))}
                          min="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`debt-rate-${index}`}>Interest Rate (%)</Label>
                        <Input
                          id={`debt-rate-${index}`}
                          type="number"
                          value={debt.interestRate}
                          onChange={(e) => updateDebt(index, 'interestRate', Number(e.target.value))}
                          min="0"
                          max="100"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`debt-payment-${index}`}>Minimum Payment</Label>
                        <Input
                          id={`debt-payment-${index}`}
                          type="number"
                          value={debt.minimumPayment}
                          onChange={(e) => updateDebt(index, 'minimumPayment', Number(e.target.value))}
                          min="0"
                        />
                      </div>
                      {debts.length > 1 && (
                        <div className="sm:col-span-2 flex justify-end">
                          <Button
                            onClick={() => removeDebt(index)}
                            variant="destructive"
                            size="sm"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={calculatePayoff} className="w-full">
                Calculate Payoff Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card className="p-4 sm:p-6 mt-6">
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payoff Summary</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Time to Payoff</h4>
                      <p className="text-2xl font-bold text-primary">
                        {Math.floor(results.totalMonths / 12)} years, {results.totalMonths % 12} months
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Total Interest</h4>
                      <p className="text-2xl font-bold text-red-600">
                        {formatCurrency(results.totalInterest)}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Individual Debt Scenarios</h4>
                    <div className="space-y-2">
                      {results.debtScenarios.map((scenario, index) => (
                        <div key={index} className="rounded-lg border p-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{scenario.name}</span>
                            <span className="text-sm text-muted-foreground">
                              {Math.floor(scenario.monthsToPayoff / 12)} years, {scenario.monthsToPayoff % 12} months
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Interest: {formatCurrency(scenario.totalInterest)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Payoff Progress</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={results.schedule}>
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
                          formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                          labelFormatter={(label) => `Month ${label}`}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="totalBalance"
                          name="Remaining Balance"
                          stroke="#2563eb"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="totalInterest"
                          name="Total Interest"
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

export default DebtPayoffCalculator; 