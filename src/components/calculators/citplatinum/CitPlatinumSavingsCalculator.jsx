
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, PiggyBank } from "lucide-react";
import { calculateCitPlatinumSavings, formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const CitPlatinumSavingsCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(500);
  const [years, setYears] = useState(5);
  const [apy, setApy] = useState(5.05);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const results = calculateCitPlatinumSavings(principal, monthlyDeposit, years, apy);
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
              <PiggyBank className="mr-3 h-8 w-8 text-primary" />
              CIT Bank Platinum Savings Calculator
            </CardTitle>
            <CardDescription>
              Calculate your potential earnings with CIT Bank's Platinum Savings Account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="principal">Initial Deposit</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="monthlyDeposit">Monthly Deposit</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthlyDeposit"
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="years">Time Period (Years)</Label>
                <Input
                  id="years"
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="apy">Annual Percentage Yield (APY)</Label>
                <div className="flex items-center space-x-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="apy"
                    type="number"
                    step="0.01"
                    value={apy}
                    onChange={(e) => setApy(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Calculate Earnings
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Final Balance</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.finalBalance)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Total Deposits</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.totalDeposits)}
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Total Interest Earned</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.totalInterest)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding CIT Bank Platinum Savings">
          <h2 className="text-xl font-semibold mb-4">About CIT Bank Platinum Savings</h2>
          <p>
            CIT Bank's Platinum Savings Account offers competitive interest rates and flexible deposit options to help you grow your savings more effectively.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Key Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Competitive APY:</strong> Earn a high yield on your savings</li>
            <li><strong>Compound Interest:</strong> Interest is compounded daily</li>
            <li><strong>Flexible Deposits:</strong> Add funds anytime</li>
            <li><strong>FDIC Insurance:</strong> Your deposits are protected</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default CitPlatinumSavingsCalculator;
