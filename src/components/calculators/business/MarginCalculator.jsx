import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { DollarSign, Percent, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MarginCalculator = () => {
  const [formData, setFormData] = useState({
    cost: 100,
    revenue: 150,
    markup: 50,
    margin: 33.33
  });

  const [results, setResults] = useState(null);

  const calculateFromCostAndRevenue = () => {
    const { cost, revenue } = formData;
    const profit = revenue - cost;
    const markup = (profit / cost) * 100;
    const margin = (profit / revenue) * 100;

    setResults({
      profit,
      markup,
      margin,
      cost,
      revenue
    });
  };

  const calculateFromCostAndMarkup = () => {
    const { cost, markup } = formData;
    const profit = (cost * markup) / 100;
    const revenue = cost + profit;
    const margin = (profit / revenue) * 100;

    setResults({
      profit,
      markup,
      margin,
      cost,
      revenue
    });
  };

  const calculateFromCostAndMargin = () => {
    const { cost, margin } = formData;
    const revenue = cost / (1 - margin / 100);
    const profit = revenue - cost;
    const markup = (profit / cost) * 100;

    setResults({
      profit,
      markup,
      margin,
      cost,
      revenue
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cost" className="text-sm sm:text-base">Cost</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="cost"
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="revenue" className="text-sm sm:text-base">Revenue</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="revenue"
                type="number"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: Number(e.target.value) })}
                min="0"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="markup" className="text-sm sm:text-base">Markup (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="markup"
                type="number"
                value={formData.markup}
                onChange={(e) => setFormData({ ...formData, markup: Number(e.target.value) })}
                min="0"
                step="0.1"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="margin" className="text-sm sm:text-base">Margin (%)</Label>
            <div className="flex items-center gap-2 sm:gap-4">
              <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              <Input
                id="margin"
                type="number"
                value={formData.margin}
                onChange={(e) => setFormData({ ...formData, margin: Number(e.target.value) })}
                min="0"
                max="100"
                step="0.1"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={calculateFromCostAndRevenue} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Calculate from Cost & Revenue
        </Button>
        <Button 
          onClick={calculateFromCostAndMarkup} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Calculate from Cost & Markup
        </Button>
        <Button 
          onClick={calculateFromCostAndMargin} 
          className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
        >
          Calculate from Cost & Margin
        </Button>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Profit</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.profit)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Markup</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatPercentage(results.markup)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Margin</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatPercentage(results.margin)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Revenue</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.revenue)}</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-primary/5 rounded-lg">
            <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Cost</h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1">{formatCurrency(results.cost)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarginCalculator; 