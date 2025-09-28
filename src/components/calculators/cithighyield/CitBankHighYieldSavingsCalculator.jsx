
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Calculator, PiggyBank } from "lucide-react";
import { formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const CitBankHighYieldSavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [term, setTerm] = useState("12");
  const [results, setResults] = useState(null);

  const calculateReturns = () => {
    // CIT Bank High Yield Savings rate (as of 2024)
    const apy = 0.0475; // 4.75% APY
    const monthlyRate = apy / 12;

    const initial = parseFloat(initialDeposit) || 0;
    const monthly = parseFloat(monthlyDeposit) || 0;
    const months = parseInt(term);

    let balance = initial;
    let totalDeposits = initial;
    let totalInterest = 0;

    for (let i = 0; i < months; i++) {
      const monthlyInterest = balance * monthlyRate;
      balance += monthlyInterest + monthly;
      totalDeposits += monthly;
      totalInterest += monthlyInterest;
    }

    setResults({
      finalBalance: balance,
      totalDeposits,
      totalInterest,
      apy: apy * 100
    });
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
              CIT Bank High Yield Savings Calculator
            </CardTitle>
            <CardDescription>
              Calculate your potential earnings with CIT Bank's High Yield Savings Account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="initialDeposit">Initial Deposit ($)</Label>
                <div className="flex items-center space-x-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="initialDeposit"
                    type="number"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    placeholder="10000"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="monthlyDeposit">Monthly Deposit ($)</Label>
                <div className="flex items-center space-x-2">
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthlyDeposit"
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(e.target.value)}
                    placeholder="500"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="term">Investment Period</Label>
                <Select value={term} onValueChange={setTerm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">1 Year</SelectItem>
                    <SelectItem value="24">2 Years</SelectItem>
                    <SelectItem value="36">3 Years</SelectItem>
                    <SelectItem value="48">4 Years</SelectItem>
                    <SelectItem value="60">5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateReturns} className="w-full">
                Calculate Returns
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Projected Balance</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.finalBalance)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      APY: {results.apy.toFixed(2)}%
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
                      <h3 className="text-sm font-semibold mb-2">Total Interest</h3>
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

        <SeoContent title="Understanding CIT Bank High Yield Savings">
          <h2 className="text-xl font-semibold mb-4">What is a High Yield Savings Account?</h2>
          <p>
            A High Yield Savings Account (HYSA) typically offers higher interest rates than traditional savings accounts, helping your money grow faster while maintaining easy access to your funds.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Key Benefits</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Higher interest rates than traditional savings accounts</li>
            <li>FDIC insurance protection</li>
            <li>No monthly maintenance fees</li>
            <li>Easy access to your money</li>
            <li>Online banking convenience</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Maximizing Your Returns</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Make regular deposits to take advantage of compound interest</li>
            <li>Maintain minimum balance requirements if applicable</li>
            <li>Set up automatic transfers for consistent saving</li>
            <li>Monitor rate changes and market conditions</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default CitBankHighYieldSavingsCalculator;
