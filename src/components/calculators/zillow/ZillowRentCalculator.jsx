import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/utils';
import { DollarSign, Percent, Home, Building, TrendingUp } from 'lucide-react';

const ZillowRentCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: 5000,
    monthlyDebt: 500,
    desiredLocation: '',
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    parkingSpaces: 1,
    utilities: 200,
    otherExpenses: 100
  });

  const [results, setResults] = useState(null);

  const calculateRent = () => {
    const {
      monthlyIncome,
      monthlyDebt,
      utilities,
      otherExpenses
    } = formData;

    // Calculate maximum affordable rent (30% of income minus debt)
    const maxRent = (monthlyIncome * 0.3) - monthlyDebt;
    
    // Calculate total monthly housing cost
    const totalHousingCost = maxRent + utilities + otherExpenses;
    
    // Calculate percentage of income
    const percentageOfIncome = (totalHousingCost / monthlyIncome) * 100;

    setResults({
      maxRent,
      totalHousingCost,
      percentageOfIncome,
      utilities,
      otherExpenses
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="monthlyIncome">Monthly Income</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="monthlyIncome"
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyDebt">Monthly Debt Payments</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="monthlyDebt"
                type="number"
                value={formData.monthlyDebt}
                onChange={(e) => setFormData({ ...formData, monthlyDebt: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="utilities">Monthly Utilities</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="utilities"
                type="number"
                value={formData.utilities}
                onChange={(e) => setFormData({ ...formData, utilities: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="otherExpenses">Other Monthly Expenses</Label>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                id="otherExpenses"
                type="number"
                value={formData.otherExpenses}
                onChange={(e) => setFormData({ ...formData, otherExpenses: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <select
              id="propertyType"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
              min="0"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
              min="0"
              max="10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="parkingSpaces">Parking Spaces</Label>
            <Input
              id="parkingSpaces"
              type="number"
              value={formData.parkingSpaces}
              onChange={(e) => setFormData({ ...formData, parkingSpaces: Number(e.target.value) })}
              min="0"
              max="5"
            />
          </div>
        </div>
      </div>

      <Button onClick={calculateRent} className="w-full">
        Calculate Affordable Rent
      </Button>

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Rent Affordability Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Maximum Affordable Rent</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.maxRent)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Monthly Housing Cost</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.totalHousingCost)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Percentage of Income</h3>
                <p className="text-2xl font-bold mt-1">{results.percentageOfIncome.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Additional Monthly Costs</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.utilities + results.otherExpenses)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZillowRentCalculator; 