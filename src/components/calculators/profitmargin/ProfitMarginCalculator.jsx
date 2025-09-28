
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PieChart, DollarSign } from "lucide-react";
import { calculateProfitMargins, formatCurrency, formatPercentage } from "@/utils/calculators";

const ProfitMarginCalculator = () => {
  const [revenue, setRevenue] = useState(100000);
  const [costOfGoods, setCostOfGoods] = useState(60000);
  const [operatingExpenses, setOperatingExpenses] = useState(20000);
  const [margins, setMargins] = useState(null);

  const handleCalculate = () => {
    const results = calculateProfitMargins(revenue, costOfGoods, operatingExpenses);
    setMargins(results);
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
              Profit Margin Calculator
            </CardTitle>
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

              <div>
                <Label htmlFor="operatingExpenses">Operating Expenses</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="operatingExpenses"
                    type="number"
                    value={operatingExpenses}
                    onChange={(e) => setOperatingExpenses(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Calculate Margins
              </Button>

              {margins && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Gross Margin</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatPercentage(margins.grossMargin)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Operating Margin</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatPercentage(margins.operatingMargin)}
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Net Margin</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatPercentage(margins.netMargin)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ProfitMarginCalculator;
