import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Percent, DollarSign, Calendar } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const CitBankPlatinumSavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("4.65"); // Current CIT Bank Platinum Savings rate
  const [years, setYears] = useState("");
  const [results, setResults] = useState(null);

  const calculateSavings = () => {
    const principal = parseFloat(initialDeposit);
    const monthly = parseFloat(monthlyDeposit);
    const rate = parseFloat(interestRate) / 100;
    const time = parseFloat(years);

    if (isNaN(principal) || isNaN(monthly) || isNaN(rate) || isNaN(time)) {
      return;
    }

    const monthlyRate = rate / 12;
    const months = time * 12;

    // Calculate future value with compound interest
    let futureValue = principal * Math.pow(1 + monthlyRate, months);
    futureValue += monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const totalDeposits = principal + (monthly * months);
    const interestEarned = futureValue - totalDeposits;

    setResults({
      futureValue: futureValue.toFixed(2),
      totalDeposits: totalDeposits.toFixed(2),
      interestEarned: interestEarned.toFixed(2)
    });
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center">
              <DollarSign className="mr-3 h-8 w-8" />
              CIT Bank Platinum Savings Calculator
            </CardTitle>
            <CardDescription>
              Calculate your potential savings with CIT Bank's high-yield savings account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="initialDeposit">Initial Deposit ($)</Label>
                <div className="relative">
                  <Input
                    id="initialDeposit"
                    type="number"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                    placeholder="1000"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="monthlyDeposit">Monthly Deposit ($)</Label>
                <div className="relative">
                  <Input
                    id="monthlyDeposit"
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(e.target.value)}
                    placeholder="100"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                <div className="relative">
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="4.65"
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="years">Time Period (Years)</Label>
                <div className="relative">
                  <Input
                    id="years"
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    placeholder="5"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <Button onClick={calculateSavings} className="w-full">
              Calculate Savings
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Future Value</h3>
                    <p className="text-lg font-bold text-primary">${results.futureValue}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Total Deposits</h3>
                    <p className="text-lg font-bold text-primary">${results.totalDeposits}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Interest Earned</h3>
                    <p className="text-lg font-bold text-primary">${results.interestEarned}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Features Section */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaInfoCircle className="mr-2" />
                Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Calculate compound interest on savings</li>
                <li>Support for initial and monthly deposits</li>
                <li>Current CIT Bank Platinum Savings rate integration</li>
                <li>Detailed breakdown of future value and interest earned</li>
                <li>Flexible time period calculation</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Maximizing Savings
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Start saving early to benefit from compound interest</li>
                <li>Set up automatic monthly deposits</li>
                <li>Consider increasing monthly deposits over time</li>
                <li>Keep track of interest rate changes</li>
                <li>Use the calculator to set savings goals</li>
                <li>Compare different savings account options</li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaQuestionCircle className="mr-2" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">What is CIT Bank Platinum Savings?</h4>
                  <p className="text-gray-700 mt-1">
                    CIT Bank Platinum Savings is a high-yield savings account offering competitive interest rates with no monthly maintenance fees.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How is compound interest calculated?</h4>
                  <p className="text-gray-700 mt-1">
                    Compound interest is calculated on both the initial deposit and accumulated interest, with interest being added to the principal at regular intervals.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Are there any fees or minimums?</h4>
                  <p className="text-gray-700 mt-1">
                    CIT Bank Platinum Savings has no monthly maintenance fees, but there may be minimum balance requirements. Check current terms for details.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding High-Yield Savings">
              <p>
                High-yield savings accounts like CIT Bank Platinum Savings offer competitive interest rates to help your money grow faster than traditional savings accounts.
              </p>
              <p>
                <strong className="text-foreground">How High-Yield Savings Work:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Higher interest rates than traditional savings</li>
                <li>Compound interest on deposits</li>
                <li>No monthly maintenance fees</li>
                <li>FDIC insurance up to $250,000</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Plan your savings strategy</li>
                <li>Set realistic financial goals</li>
                <li>Understand compound interest</li>
                <li>Compare different savings options</li>
              </ul>
              <p>
                For more financial tools, check out our <a href="/investment">Investment Calculator</a> and <a href="/budget">Budget Calculator</a> for comprehensive financial planning.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CitBankPlatinumSavingsCalculator; 