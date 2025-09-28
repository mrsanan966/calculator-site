import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const SavingsCalculator = () => {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(100);
  const [interestRate, setInterestRate] = useState(5);
  const [years, setYears] = useState(10);
  const [results, setResults] = useState(null);

  const calculateSavings = () => {
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    let balance = initialAmount;
    const data = [];

    for (let i = 0; i <= months; i++) {
      if (i > 0) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
      if (i % 12 === 0) {
        data.push({
          year: i / 12,
          balance: Math.round(balance * 100) / 100,
          contributions: Math.round((initialAmount + monthlyContribution * i) * 100) / 100,
          interest: Math.round((balance - initialAmount - monthlyContribution * i) * 100) / 100,
        });
      }
    }

    setResults({
      finalBalance: Math.round(balance * 100) / 100,
      totalContributions: Math.round((initialAmount + monthlyContribution * months) * 100) / 100,
      totalInterest: Math.round((balance - initialAmount - monthlyContribution * months) * 100) / 100,
      data,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <Label htmlFor="initial-amount">Initial Amount ($)</Label>
              <Input
                id="initial-amount"
                type="number"
                value={initialAmount}
                onChange={(e) => setInitialAmount(Number(e.target.value))}
                min="0"
              />
            </div>
            <div>
              <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
              <Input
                id="monthly-contribution"
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                min="0"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="interest-rate"
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={0}
                  max={20}
                  step={0.1}
                  className="flex-1"
                />
                <span className="w-16 text-right">{interestRate}%</span>
              </div>
            </div>
            <div>
              <Label htmlFor="years">Time Period (Years)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="years"
                  value={[years]}
                  onValueChange={([value]) => setYears(value)}
                  min={1}
                  max={50}
                  step={1}
                  className="flex-1"
                />
                <span className="w-16 text-right">{years} years</span>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={calculateSavings} className="mt-6 w-full">
          Calculate
        </Button>
      </Card>

      {results && (
        <Card className="p-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="chart">Growth Chart</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Final Balance</h3>
                  <p className="text-2xl font-bold">${results.finalBalance.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Contributions</h3>
                  <p className="text-2xl font-bold">${results.totalContributions.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Interest</h3>
                  <p className="text-2xl font-bold">${results.totalInterest.toLocaleString()}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="chart">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" label={{ value: "Years", position: "insideBottom", offset: -5 }} />
                    <YAxis
                      label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#2563eb"
                      name="Total Balance"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="contributions"
                      stroke="#16a34a"
                      name="Contributions"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="interest"
                      stroke="#dc2626"
                      name="Interest Earned"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default SavingsCalculator; 