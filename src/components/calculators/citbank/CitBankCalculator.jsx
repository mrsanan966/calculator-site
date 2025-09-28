
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Calculator } from "lucide-react";
import { formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const CitBankCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [term, setTerm] = useState("12");
  const [accountType, setAccountType] = useState("savings");
  const [results, setResults] = useState(null);

  const calculateReturns = () => {
    // Current CIT Bank rates (as of 2024)
    const rates = {
      savings: 0.0425, // 4.25% APY
      money_market: 0.0450, // 4.50% APY
      cd_12: 0.0475, // 12-month CD at 4.75% APY
      cd_18: 0.0485 // 18-month CD at 4.85% APY
    };

    const initial = parseFloat(initialDeposit) || 0;
    const monthly = parseFloat(monthlyDeposit) || 0;
    const months = parseInt(term);
    const rate = rates[accountType] / 12; // Monthly rate

    let balance = initial;
    let totalDeposits = initial;
    let totalInterest = 0;

    for (let i = 0; i < months; i++) {
      const monthlyInterest = balance * rate;
      balance += monthlyInterest + monthly;
      totalDeposits += monthly;
      totalInterest += monthlyInterest;
    }

    setResults({
      finalBalance: balance,
      totalDeposits,
      totalInterest,
      apy: rates[accountType] * 100
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
              <Wallet className="mr-3 h-8 w-8 text-primary" />
              CIT Bank Calculator
            </CardTitle>
            <CardDescription>
              Calculate your potential earnings with CIT Bank's competitive rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select value={accountType} onValueChange={setAccountType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">High Yield Savings</SelectItem>
                    <SelectItem value="money_market">Money Market</SelectItem>
                    <SelectItem value="cd_12">12-Month CD</SelectItem>
                    <SelectItem value="cd_18">18-Month CD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="initialDeposit">Initial Deposit ($)</Label>
                <Input
                  id="initialDeposit"
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  placeholder="10000"
                />
              </div>

              <div>
                <Label htmlFor="monthlyDeposit">Monthly Deposit ($)</Label>
                <Input
                  id="monthlyDeposit"
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(e.target.value)}
                  placeholder="500"
                />
              </div>

              <div>
                <Label htmlFor="term">Term (Months)</Label>
                <Select value={term} onValueChange={setTerm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 Months</SelectItem>
                    <SelectItem value="18">18 Months</SelectItem>
                    <SelectItem value="24">24 Months</SelectItem>
                    <SelectItem value="36">36 Months</SelectItem>
                    <SelectItem value="60">60 Months</SelectItem>
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

        <SeoContent title="Understanding CIT Bank Accounts">
          <h2 className="text-xl font-semibold mb-4">CIT Bank Account Types</h2>
          <p>
            CIT Bank offers various savings products with competitive rates to help you grow your money. Understanding the different account types can help you make the best choice for your financial goals.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Available Accounts</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>High Yield Savings:</strong> Competitive rates with easy access to funds</li>
            <li><strong>Money Market:</strong> Higher rates with check-writing capabilities</li>
            <li><strong>Certificates of Deposit:</strong> Fixed rates for specific terms</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Key Benefits</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Competitive interest rates</li>
            <li>FDIC insurance protection</li>
            <li>No monthly maintenance fees</li>
            <li>User-friendly online banking</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default CitBankCalculator;
