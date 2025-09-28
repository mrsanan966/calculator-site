import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

const CostOfLivingCalculator = () => {
  const [currentCity, setCurrentCity] = useState({
    name: '',
    expenses: {
      housing: 2000,
      utilities: 200,
      groceries: 400,
      transportation: 300,
      healthcare: 200,
      entertainment: 300,
      other: 200,
    },
  });

  const [targetCity, setTargetCity] = useState({
    name: '',
    expenses: {
      housing: 2500,
      utilities: 250,
      groceries: 450,
      transportation: 350,
      healthcare: 250,
      entertainment: 350,
      other: 250,
    },
  });

  const [results, setResults] = useState(null);

  const updateExpense = (city, category, value) => {
    const cityState = city === 'current' ? currentCity : targetCity;
    const setCityState = city === 'current' ? setCurrentCity : setTargetCity;

    setCityState({
      ...cityState,
      expenses: {
        ...cityState.expenses,
        [category]: Number(value),
      },
    });
  };

  const calculateCostDifference = () => {
    const currentTotal = Object.values(currentCity.expenses).reduce((sum, value) => sum + value, 0);
    const targetTotal = Object.values(targetCity.expenses).reduce((sum, value) => sum + value, 0);
    const difference = targetTotal - currentTotal;
    const percentageDifference = (difference / currentTotal) * 100;

    const expenseBreakdown = Object.keys(currentCity.expenses).map(category => ({
      category,
      current: currentCity.expenses[category],
      target: targetCity.expenses[category],
      difference: targetCity.expenses[category] - currentCity.expenses[category],
      percentage: ((targetCity.expenses[category] - currentCity.expenses[category]) / currentCity.expenses[category]) * 100,
    }));

    setResults({
      currentTotal,
      targetTotal,
      difference,
      percentageDifference,
      expenseBreakdown,
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
              <Building2 className="mr-3 h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              Cost of Living Calculator
            </CardTitle>
            <CardDescription>
              Compare the cost of living between two cities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="current">Current City</TabsTrigger>
                  <TabsTrigger value="target">Target City</TabsTrigger>
                </TabsList>
                <TabsContent value="current" className="space-y-4">
                  <div>
                    <Label htmlFor="currentCityName">City Name</Label>
                    <Input
                      id="currentCityName"
                      value={currentCity.name}
                      onChange={(e) => setCurrentCity({ ...currentCity, name: e.target.value })}
                      placeholder="Enter current city name"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(currentCity.expenses).map(([category, value]) => (
                      <div key={category}>
                        <Label htmlFor={`current-${category}`} className="capitalize">
                          {category}
                        </Label>
                        <Input
                          id={`current-${category}`}
                          type="number"
                          value={value}
                          onChange={(e) => updateExpense('current', category, e.target.value)}
                          min="0"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="target" className="space-y-4">
                  <div>
                    <Label htmlFor="targetCityName">City Name</Label>
                    <Input
                      id="targetCityName"
                      value={targetCity.name}
                      onChange={(e) => setTargetCity({ ...targetCity, name: e.target.value })}
                      placeholder="Enter target city name"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(targetCity.expenses).map(([category, value]) => (
                      <div key={category}>
                        <Label htmlFor={`target-${category}`} className="capitalize">
                          {category}
                        </Label>
                        <Input
                          id={`target-${category}`}
                          type="number"
                          value={value}
                          onChange={(e) => updateExpense('target', category, e.target.value)}
                          min="0"
                        />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={calculateCostDifference} className="w-full">
                Compare Costs
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card className="p-4 sm:p-6 mt-6">
            <CardContent>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Cost Comparison Summary</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Monthly Cost Difference</h4>
                      <p className={`text-2xl font-bold ${results.difference >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {formatCurrency(results.difference)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {results.percentageDifference >= 0 ? (
                          <span className="flex items-center text-red-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {formatPercentage(results.percentageDifference)} more expensive
                          </span>
                        ) : (
                          <span className="flex items-center text-green-600">
                            <TrendingDown className="h-4 w-4 mr-1" />
                            {formatPercentage(Math.abs(results.percentageDifference))} less expensive
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <h4 className="text-sm font-medium text-muted-foreground">Total Monthly Cost</h4>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Current City</p>
                          <p className="text-xl font-bold">{formatCurrency(results.currentTotal)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Target City</p>
                          <p className="text-xl font-bold">{formatCurrency(results.targetTotal)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Expense Breakdown</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={results.expenseBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                          formatter={(value) => [`$${value}`, ""]}
                          labelFormatter={(label) => label.charAt(0).toUpperCase() + label.slice(1)}
                        />
                        <Legend />
                        <Bar dataKey="current" name="Current City" fill="#2563eb" />
                        <Bar dataKey="target" name="Target City" fill="#dc2626" />
                      </BarChart>
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

export default CostOfLivingCalculator; 