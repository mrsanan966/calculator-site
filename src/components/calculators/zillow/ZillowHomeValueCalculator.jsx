import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency, formatPercent } from '@/lib/utils';
import { DollarSign, Percent, Home, Building, TrendingUp, Calendar, CreditCard, MapPin } from 'lucide-react';

const ZillowHomeValueCalculator = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    squareFeet: 2000,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2000,
    lotSize: 0.25,
    propertyType: 'single-family',
    condition: 'good',
    recentRenovations: false,
    marketTrend: 'stable',
    comparableSales: []
  });

  const [results, setResults] = useState(null);

  const calculateHomeValue = () => {
    const {
      squareFeet,
      bedrooms,
      bathrooms,
      yearBuilt,
      lotSize,
      propertyType,
      condition,
      recentRenovations,
      marketTrend
    } = formData;

    // Base value calculation
    let baseValue = squareFeet * 150; // Base price per square foot

    // Adjust for bedrooms and bathrooms
    baseValue += (bedrooms * 25000) + (bathrooms * 15000);

    // Adjust for lot size
    baseValue += lotSize * 100000;

    // Adjust for property type
    const propertyTypeMultiplier = {
      'single-family': 1,
      'condo': 0.9,
      'townhouse': 0.95,
      'multi-family': 1.1
    };
    baseValue *= propertyTypeMultiplier[propertyType];

    // Adjust for condition
    const conditionMultiplier = {
      'excellent': 1.1,
      'good': 1,
      'fair': 0.9,
      'poor': 0.8
    };
    baseValue *= conditionMultiplier[condition];

    // Adjust for recent renovations
    if (recentRenovations) {
      baseValue *= 1.05;
    }

    // Adjust for market trend
    const marketTrendMultiplier = {
      'hot': 1.1,
      'stable': 1,
      'cooling': 0.95
    };
    baseValue *= marketTrendMultiplier[marketTrend];

    // Calculate value range
    const minValue = baseValue * 0.95;
    const maxValue = baseValue * 1.05;
    const averageValue = (minValue + maxValue) / 2;

    // Calculate appreciation rate
    const yearsOld = new Date().getFullYear() - yearBuilt;
    const annualAppreciation = 0.03; // 3% annual appreciation
    const appreciationFactor = Math.pow(1 + annualAppreciation, yearsOld);

    // Final value with appreciation
    const finalValue = averageValue * appreciationFactor;

    setResults({
      minValue,
      maxValue,
      averageValue,
      finalValue,
      appreciationFactor,
      yearsOld
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Property Details</h3>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter street address"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">ZIP Code</Label>
            <Input
              id="zipCode"
              type="text"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              placeholder="ZIP Code"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="squareFeet">Square Feet</Label>
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <Input
                id="squareFeet"
                type="number"
                value={formData.squareFeet}
                onChange={(e) => setFormData({ ...formData, squareFeet: Number(e.target.value) })}
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Additional Details</h3>
          <div className="space-y-2">
            <Label htmlFor="yearBuilt">Year Built</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input
                id="yearBuilt"
                type="number"
                value={formData.yearBuilt}
                onChange={(e) => setFormData({ ...formData, yearBuilt: Number(e.target.value) })}
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lotSize">Lot Size (Acres)</Label>
            <Input
              id="lotSize"
              type="number"
              value={formData.lotSize}
              onChange={(e) => setFormData({ ...formData, lotSize: Number(e.target.value) })}
              min="0"
              step="0.01"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <select
              id="propertyType"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="single-family">Single Family</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
              <option value="multi-family">Multi-Family</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Property Condition</Label>
            <select
              id="condition"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketTrend">Market Trend</Label>
            <select
              id="marketTrend"
              value={formData.marketTrend}
              onChange={(e) => setFormData({ ...formData, marketTrend: e.target.value })}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="hot">Hot Market</option>
              <option value="stable">Stable Market</option>
              <option value="cooling">Cooling Market</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="recentRenovations"
              checked={formData.recentRenovations}
              onChange={(e) => setFormData({ ...formData, recentRenovations: e.target.checked })}
              className="rounded border-gray-300"
            />
            <Label htmlFor="recentRenovations">Recent Renovations</Label>
          </div>
        </div>
      </div>

      <Button onClick={calculateHomeValue} className="w-full">
        Calculate Home Value
      </Button>

      {results && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Property Value Estimate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Estimated Value Range</h3>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(results.minValue)} - {formatCurrency(results.maxValue)}
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Average Value</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.averageValue)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Final Value with Appreciation</h3>
                <p className="text-2xl font-bold mt-1">{formatCurrency(results.finalValue)}</p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Years of Appreciation</h3>
                <p className="text-2xl font-bold mt-1">{results.yearsOld} years</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Value Factors</h3>
              <ul className="space-y-2">
                <li>• Base value calculated from square footage and features</li>
                <li>• Adjusted for property type and condition</li>
                <li>• Considered recent renovations and market trends</li>
                <li>• Applied historical appreciation rate</li>
                <li>• Final value includes market adjustments</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ZillowHomeValueCalculator; 