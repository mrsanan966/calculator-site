import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CostOfLivingCalculator = () => {
  const [currentCity, setCurrentCity] = useState({
    name: "Current City",
    housing: 2000,
    utilities: 300,
    food: 400,
    transportation: 200,
    healthcare: 300,
    entertainment: 300,
    other: 200,
  });

  const [targetCity, setTargetCity] = useState({
    name: "Target City",
    housing: 2500,
    utilities: 350,
    food: 450,
    transportation: 250,
    healthcare: 350,
    entertainment: 350,
    other: 250,
  });

  const [results, setResults] = useState(null);

  const calculateCostOfLiving = () => {
    const currentTotal = Object.entries(currentCity)
      .filter(([key]) => key !== "name")
      .reduce((sum, [_, value]) => sum + Number(value), 0);

    const targetTotal = Object.entries(targetCity)
      .filter(([key]) => key !== "name")
      .reduce((sum, [_, value]) => sum + Number(value), 0);

    const difference = targetTotal - currentTotal;
    const percentageChange = (difference / currentTotal) * 100;

    const comparisonData = Object.entries(currentCity)
      .filter(([key]) => key !== "name")
      .map(([category, value]) => ({
        category: category.charAt(0).toUpperCase() + category.slice(1),
        current: Number(value),
        target: Number(targetCity[category]),
      }));

    setResults({
      currentTotal,
      targetTotal,
      difference,
      percentageChange,
      comparisonData,
    });
  };

  const renderExpenseInputs = (city, setCity) => (
    <div className="grid gap-4">
      <div>
        <Label htmlFor={`${city.name}-name`}>City Name</Label>
        <Input
          id={`${city.name}-name`}
          value={city.name}
          onChange={(e) => setCity({ ...city, name: e.target.value })}
        />
      </div>
      {Object.entries(city)
        .filter(([key]) => key !== "name")
        .map(([category, value]) => (
          <div key={category}>
            <Label htmlFor={`${city.name}-${category}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Label>
            <Input
              id={`${city.name}-${category}`}
              type="number"
              value={value}
              onChange={(e) =>
                setCity({ ...city, [category]: e.target.value })
              }
              min="0"
            />
          </div>
        ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current City</TabsTrigger>
            <TabsTrigger value="target">Target City</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            {renderExpenseInputs(currentCity, setCurrentCity)}
          </TabsContent>
          <TabsContent value="target">
            {renderExpenseInputs(targetCity, setTargetCity)}
          </TabsContent>
        </Tabs>
        <Button onClick={calculateCostOfLiving} className="mt-6 w-full">
          Calculate Cost of Living
        </Button>
      </Card>

      {results && (
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cost of Living Comparison</h3>
              <div className="grid gap-4">
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {currentCity.name} Monthly Cost
                  </h4>
                  <p className="text-2xl font-bold">
                    ${results.currentTotal.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {targetCity.name} Monthly Cost
                  </h4>
                  <p className="text-2xl font-bold">
                    ${results.targetTotal.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Monthly Difference
                  </h4>
                  <p className={`text-2xl font-bold ${
                    results.difference >= 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    ${Math.abs(results.difference).toLocaleString()}{" "}
                    {results.difference >= 0 ? "more" : "less"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Percentage Change
                  </h4>
                  <p className={`text-2xl font-bold ${
                    results.percentageChange >= 0 ? "text-red-600" : "text-green-600"
                  }`}>
                    {Math.abs(results.percentageChange).toFixed(1)}%{" "}
                    {results.percentageChange >= 0 ? "higher" : "lower"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Expense Breakdown</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis
                      label={{
                        value: "Monthly Cost ($)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                      tickFormatter={(value) =>
                        `$${(value / 100).toFixed(0)}`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    />
                    <Legend />
                    <Bar
                      dataKey="current"
                      name={currentCity.name}
                      fill="#2563eb"
                    />
                    <Bar
                      dataKey="target"
                      name={targetCity.name}
                      fill="#16a34a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CostOfLivingCalculator; 