import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const DebtPayoffCalculator = () => {
  const [debts, setDebts] = useState([
    { id: 1, name: "Credit Card 1", balance: 5000, interestRate: 18, minimumPayment: 100 },
    { id: 2, name: "Credit Card 2", balance: 3000, interestRate: 15, minimumPayment: 75 },
    { id: 3, name: "Personal Loan", balance: 10000, interestRate: 12, minimumPayment: 200 },
  ]);

  const [extraPayment, setExtraPayment] = useState(200);
  const [strategy, setStrategy] = useState("avalanche"); // avalanche or snowball

  const [results, setResults] = useState(null);

  const calculatePayoff = () => {
    const sortedDebts = [...debts].sort((a, b) => {
      if (strategy === "avalanche") {
        return b.interestRate - a.interestRate;
      } else {
        return a.balance - b.balance;
      }
    });

    const monthlyRate = sortedDebts.map(debt => debt.interestRate / 100 / 12);
    const balances = sortedDebts.map(debt => Number(debt.balance));
    const minimumPayments = sortedDebts.map(debt => Number(debt.minimumPayment));
    const totalMinimumPayment = minimumPayments.reduce((sum, payment) => sum + payment, 0);
    const totalPayment = totalMinimumPayment + Number(extraPayment);

    const payoffData = [];
    let month = 0;
    let totalInterestPaid = 0;
    let remainingDebts = sortedDebts.length;

    while (remainingDebts > 0 && month < 360) { // Cap at 30 years
      let remainingPayment = totalPayment;
      let monthInterest = 0;

      // Apply minimum payments first
      for (let i = 0; i < sortedDebts.length; i++) {
        if (balances[i] > 0) {
          const interest = balances[i] * monthlyRate[i];
          monthInterest += interest;
          balances[i] += interest;
          balances[i] -= minimumPayments[i];
          remainingPayment -= minimumPayments[i];
        }
      }

      // Apply extra payment to highest priority debt
      for (let i = 0; i < sortedDebts.length; i++) {
        if (balances[i] > 0 && remainingPayment > 0) {
          const payment = Math.min(balances[i], remainingPayment);
          balances[i] -= payment;
          remainingPayment -= payment;
          if (balances[i] <= 0) {
            remainingDebts--;
          }
        }
      }

      totalInterestPaid += monthInterest;
      month++;

      if (month % 3 === 0 || remainingDebts === 0) {
        payoffData.push({
          month,
          totalInterest: Math.round(totalInterestPaid * 100) / 100,
          remainingBalance: Math.round(balances.reduce((sum, balance) => sum + balance, 0) * 100) / 100,
        });
      }
    }

    const debtScenarios = sortedDebts.map((debt, index) => {
      const monthlyRate = debt.interestRate / 100 / 12;
      const balance = Number(debt.balance);
      const minimumPayment = Number(debt.minimumPayment);
      
      let remainingBalance = balance;
      let months = 0;
      let totalInterest = 0;

      while (remainingBalance > 0 && months < 360) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = minimumPayment - interestPayment;
        remainingBalance -= principalPayment;
        totalInterest += interestPayment;
        months++;
      }

      return {
        name: debt.name,
        months,
        totalInterest,
        totalCost: balance + totalInterest,
      };
    });

    setResults({
      totalMonths: month,
      totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
      payoffData,
      debtScenarios,
    });
  };

  const addDebt = () => {
    setDebts([
      ...debts,
      {
        id: debts.length + 1,
        name: `Debt ${debts.length + 1}`,
        balance: 0,
        interestRate: 0,
        minimumPayment: 0,
      },
    ]);
  };

  const removeDebt = (id) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id, field, value) => {
    setDebts(
      debts.map(debt =>
        debt.id === id ? { ...debt, [field]: value } : debt
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Current Debts</h3>
            <div className="space-y-4">
              {debts.map(debt => (
                <div key={debt.id} className="grid gap-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`debt-${debt.id}-name`}>Debt Name</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDebt(debt.id)}
                    >
                      Remove
                    </Button>
                  </div>
                  <Input
                    id={`debt-${debt.id}-name`}
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                  />
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor={`debt-${debt.id}-balance`}>Balance</Label>
                      <Input
                        id={`debt-${debt.id}-balance`}
                        type="number"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, "balance", e.target.value)}
                        min="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`debt-${debt.id}-interest`}>Interest Rate (%)</Label>
                      <Input
                        id={`debt-${debt.id}-interest`}
                        type="number"
                        value={debt.interestRate}
                        onChange={(e) => updateDebt(debt.id, "interestRate", e.target.value)}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`debt-${debt.id}-payment`}>Minimum Payment</Label>
                      <Input
                        id={`debt-${debt.id}-payment`}
                        type="number"
                        value={debt.minimumPayment}
                        onChange={(e) => updateDebt(debt.id, "minimumPayment", e.target.value)}
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={addDebt} variant="outline" className="w-full">
                Add Another Debt
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Payoff Strategy</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="strategy">Strategy</Label>
                <select
                  id="strategy"
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="avalanche">Avalanche (Highest Interest First)</option>
                  <option value="snowball">Snowball (Lowest Balance First)</option>
                </select>
              </div>
              <div>
                <Label htmlFor="extra-payment">Extra Monthly Payment</Label>
                <Input
                  id="extra-payment"
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(e.target.value)}
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>
        <Button onClick={calculatePayoff} className="mt-6 w-full">
          Calculate Payoff Plan
        </Button>
      </Card>

      {results && (
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payoff Summary</h3>
              <div className="grid gap-4">
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Time to Payoff
                  </h4>
                  <p className="text-2xl font-bold">
                    {Math.floor(results.totalMonths / 12)} years, {results.totalMonths % 12} months
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Total Interest Paid
                  </h4>
                  <p className="text-2xl font-bold">
                    ${results.totalInterestPaid.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Individual Debt Scenarios</h3>
              <div className="space-y-4">
                {results.debtScenarios.map((scenario, index) => (
                  <div key={index} className="rounded-lg border p-4">
                    <h4 className="font-medium">{scenario.name}</h4>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Months to Payoff</p>
                        <p className="text-lg font-bold">{scenario.months}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Interest</p>
                        <p className="text-lg font-bold">
                          ${Math.round(scenario.totalInterest).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Payoff Progress</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.payoffData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    label={{
                      value: "Month",
                      position: "insideBottom",
                      offset: -5,
                    }}
                  />
                  <YAxis
                    label={{
                      value: "Amount ($)",
                      angle: -90,
                      position: "insideLeft",
                    }}
                    tickFormatter={(value) =>
                      `$${(value / 1000).toFixed(0)}k`
                    }
                  />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    labelFormatter={(label) => `Month ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="remainingBalance"
                    stroke="#2563eb"
                    name="Remaining Balance"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalInterest"
                    stroke="#dc2626"
                    name="Total Interest Paid"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DebtPayoffCalculator; 