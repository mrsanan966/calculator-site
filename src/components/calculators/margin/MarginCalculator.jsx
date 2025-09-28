
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, Percent } from "lucide-react";
import { calculateMargin, formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const MarginCalculator = () => {
  const [accountValue, setAccountValue] = useState(10000);
  const [marginRequirement, setMarginRequirement] = useState(50);
  const [stockPrice, setStockPrice] = useState(100);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const results = calculateMargin(accountValue, marginRequirement, stockPrice);
    setResults(results);
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
              <TrendingUp className="mr-3 h-8 w-8 text-primary" />
              Margin Calculator
            </CardTitle>
            <CardDescription>
              Calculate trading margin requirements and buying power
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="accountValue">Account Value</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="accountValue"
                    type="number"
                    value={accountValue}
                    onChange={(e) => setAccountValue(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="marginRequirement">Initial Margin Requirement (%)</Label>
                <div className="flex items-center space-x-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="marginRequirement"
                    type="number"
                    value={marginRequirement}
                    onChange={(e) => setMarginRequirement(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="stockPrice">Stock Price</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="stockPrice"
                    type="number"
                    value={stockPrice}
                    onChange={(e) => setStockPrice(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Calculate Margin
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Buying Power</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.buyingPower)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Maximum Shares</h3>
                    <p className="text-3xl font-bold text-primary">
                      {results.maxShares.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Maintenance Margin</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.maintenanceMarginAmount)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding Margin Trading">
          <h2 className="text-xl font-semibold mb-4">How Margin Trading Works</h2>
          <p>
            Margin trading allows investors to borrow money to purchase securities. The initial margin requirement is the minimum amount of equity required to open a margin position, while the maintenance margin is the minimum amount that must be maintained in the account.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Key Margin Trading Terms</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Buying Power:</strong> The total amount available for trading</li>
            <li><strong>Initial Margin:</strong> The minimum deposit required to open a position</li>
            <li><strong>Maintenance Margin:</strong> The minimum account balance required</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default MarginCalculator;
