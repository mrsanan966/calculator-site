
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, DollarSign } from "lucide-react";
import { calculateGrossMargin, formatCurrency, formatPercentage } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const GrossMarginCalculator = () => {
  const [revenue, setRevenue] = useState(100000);
  const [costOfGoods, setCostOfGoods] = useState(60000);
  const [margin, setMargin] = useState(null);

  const handleCalculate = () => {
    const grossMargin = calculateGrossMargin(revenue, costOfGoods);
    setMargin(grossMargin);
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-3xl">
              <PieChart className="mr-3 h-8 w-8 text-primary" />
              Gross Margin Calculator
            </CardTitle>
            <CardDescription>
              Calculate your gross margin percentage to analyze product profitability
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="revenue">Revenue</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="revenue"
                    type="number"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="costOfGoods">Cost of Goods Sold</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="costOfGoods"
                    type="number"
                    value={costOfGoods}
                    onChange={(e) => setCostOfGoods(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Calculate Gross Margin
              </Button>

              {margin !== null && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Gross Margin</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatPercentage(margin)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Gross Profit</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(revenue - costOfGoods)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding Gross Margin">
          <h2 className="text-xl font-semibold mb-4">What is Gross Margin?</h2>
          <p>
            Gross margin is a key financial metric that represents the percentage of revenue that exceeds the cost of goods sold (COGS). It's a crucial indicator of a company's financial health and pricing strategy effectiveness.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">How to Calculate Gross Margin</h3>
          <p>
            The formula for gross margin is: (Revenue - Cost of Goods Sold) / Revenue × 100
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Why Gross Margin Matters</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Indicates pricing strategy effectiveness</li>
            <li>Shows ability to cover operating expenses</li>
            <li>Helps compare performance across different products</li>
            <li>Guides decision-making for product mix</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default GrossMarginCalculator;
