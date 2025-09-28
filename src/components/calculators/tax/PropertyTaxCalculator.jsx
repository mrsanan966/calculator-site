import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Home, DollarSign, TrendingUp, Percent } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { SeoContent } from '@/components/seo-content';

const PropertyTaxCalculator = () => {
  const [propertyValue, setPropertyValue] = useState(300000);
  const [taxRate, setTaxRate] = useState(1.2);
  const [assessmentRatio, setAssessmentRatio] = useState(100);
  const [exemptions, setExemptions] = useState({
    homestead: 0,
    senior: 0,
    veteran: 0,
    other: 0,
  });
  const [results, setResults] = useState(null);

  const calculateTax = () => {
    // Calculate assessed value
    const assessedValue = (propertyValue * assessmentRatio) / 100;
    
    // Calculate taxable value after exemptions
    const totalExemptions = Object.values(exemptions).reduce((sum, value) => sum + Number(value), 0);
    const taxableValue = Math.max(0, assessedValue - totalExemptions);
    
    // Calculate annual tax
    const annualTax = (taxableValue * taxRate) / 100;
    const monthlyTax = annualTax / 12;
    
    // Calculate tax as percentage of property value
    const taxPercentage = (annualTax / propertyValue) * 100;
    
    // Generate projection data
    const projectionYears = 10;
    const projectionData = [];
    let currentValue = propertyValue;
    let currentTax = annualTax;
    
    for (let year = 0; year <= projectionYears; year++) {
      projectionData.push({
        year,
        propertyValue: Math.round(currentValue),
        annualTax: Math.round(currentTax * 100) / 100,
      });
      
      // Assume 3% annual appreciation
      currentValue *= 1.03;
      currentTax = (currentValue * taxRate) / 100;
    }

    setResults({
      assessedValue,
      taxableValue,
      annualTax,
      monthlyTax,
      taxPercentage,
      totalExemptions,
      projectionData,
    });
  };

  const updateExemption = (type, value) => {
    setExemptions({
      ...exemptions,
      [type]: Number(value),
    });
  };

  return (
    <div className="container py-4 sm:py-6 md:py-8 lg:py-12" id="property-tax-calculator">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Property Tax Calculator</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Calculate your property tax based on your home value and local tax rates
          </p>
        </div>

        <Card className="p-3 sm:p-4 md:p-6 lg:p-8 mb-6">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl md:text-3xl">Property Details</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your property information to calculate your estimated taxes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="property-value" className="text-sm sm:text-base">Property Value</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Home className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Input
                    id="property-value"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    min="0"
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-rate" className="text-sm sm:text-base">Tax Rate (%)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Slider
                    id="tax-rate"
                    value={[taxRate]}
                    onValueChange={([value]) => setTaxRate(value)}
                    min={0}
                    max={5}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-sm sm:text-base">{taxRate}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessment-ratio" className="text-sm sm:text-base">Assessment Ratio (%)</Label>
                <div className="flex items-center gap-2 sm:gap-4">
                  <Percent className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <Slider
                    id="assessment-ratio"
                    value={[assessmentRatio]}
                    onValueChange={([value]) => setAssessmentRatio(value)}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right text-sm sm:text-base">{assessmentRatio}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">Exemptions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="homestead" className="text-sm sm:text-base">Homestead Exemption</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="homestead"
                      type="number"
                      value={exemptions.homestead}
                      onChange={(e) => setExemptions({ ...exemptions, homestead: Number(e.target.value) })}
                      min="0"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="senior" className="text-sm sm:text-base">Senior Exemption</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="senior"
                      type="number"
                      value={exemptions.senior}
                      onChange={(e) => setExemptions({ ...exemptions, senior: Number(e.target.value) })}
                      min="0"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="veteran" className="text-sm sm:text-base">Veteran Exemption</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="veteran"
                      type="number"
                      value={exemptions.veteran}
                      onChange={(e) => setExemptions({ ...exemptions, veteran: Number(e.target.value) })}
                      min="0"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="other" className="text-sm sm:text-base">Other Exemptions</Label>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                    <Input
                      id="other"
                      type="number"
                      value={exemptions.other}
                      onChange={(e) => setExemptions({ ...exemptions, other: Number(e.target.value) })}
                      min="0"
                      className="text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8">
              <Button
                onClick={calculateTax}
                className="w-full sm:w-auto text-sm sm:text-base py-2 sm:py-3"
              >
                Calculate Property Tax
              </Button>
            </div>
          </CardContent>
        </Card>

        {results && (
          <Card className="p-3 sm:p-4 md:p-6 lg:p-8">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl">Results</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Your estimated property tax breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Assessed Value</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.assessedValue)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Total Exemptions</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.totalExemptions)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Taxable Value</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.taxableValue)}
                  </p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <h3 className="text-sm sm:text-base font-medium text-muted-foreground">Annual Property Tax</h3>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(results.annualTax)}
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Monthly Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-muted-foreground">Monthly Tax Payment</h4>
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      {formatCurrency(results.monthlyTax)}
                    </p>
                  </div>
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-muted-foreground">Effective Tax Rate</h4>
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      {formatPercentage(results.effectiveTaxRate)}%
                    </p>
                  </div>
                  <div className="space-y-2 p-4 border rounded-lg">
                    <h4 className="text-sm sm:text-base font-medium text-muted-foreground">Tax Savings from Exemptions</h4>
                    <p className="text-xl sm:text-2xl font-bold text-primary">
                      {formatCurrency(results.taxSavings)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <SeoContent title="Understanding Property Taxes">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">How Property Taxes Work</h2>
          <p className="text-sm sm:text-base mb-4">
            Property taxes are calculated based on your property's assessed value and local tax rates. The assessed value is typically a percentage of your property's market value, and various exemptions may be available to reduce your tax burden.
          </p>
          <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-3">Common Property Tax Exemptions</h3>
          <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
            <li><strong>Homestead Exemption:</strong> Reduces the taxable value of your primary residence</li>
            <li><strong>Senior Exemption:</strong> Available to homeowners above a certain age</li>
            <li><strong>Veteran Exemption:</strong> Special tax benefits for military veterans</li>
            <li><strong>Other Exemptions:</strong> Various local and state-specific exemptions may be available</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default PropertyTaxCalculator; 