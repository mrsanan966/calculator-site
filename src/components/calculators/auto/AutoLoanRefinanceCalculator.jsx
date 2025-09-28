import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { Car, DollarSign, Percent, Calendar } from 'lucide-react';
import { BarChart, Bar } from 'recharts';
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const AutoLoanRefinanceCalculator = () => {
  const [currentLoan, setCurrentLoan] = useState({
    balance: "",
    rate: "",
    term: "",
    payment: ""
  });
  const [newLoan, setNewLoan] = useState({
    rate: "",
    term: ""
  });
  const [results, setResults] = useState(null);

  const calculateRefinance = () => {
    const currentBalance = parseFloat(currentLoan.balance);
    const currentRate = parseFloat(currentLoan.rate) / 100 / 12;
    const currentTerm = parseFloat(currentLoan.term) * 12;
    const currentPayment = parseFloat(currentLoan.payment);
    const newRate = parseFloat(newLoan.rate) / 100 / 12;
    const newTerm = parseFloat(newLoan.term) * 12;

    if (isNaN(currentBalance) || isNaN(currentRate) || isNaN(currentTerm) || 
        isNaN(currentPayment) || isNaN(newRate) || isNaN(newTerm)) {
      return;
    }

    // Calculate new monthly payment
    const newPayment = (currentBalance * newRate * Math.pow(1 + newRate, newTerm)) / 
                      (Math.pow(1 + newRate, newTerm) - 1);

    // Calculate total payments for both loans
    const currentTotal = currentPayment * currentTerm;
    const newTotal = newPayment * newTerm;

    // Calculate savings
    const monthlySavings = currentPayment - newPayment;
    const totalSavings = currentTotal - newTotal;

    setResults({
      newPayment: newPayment.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      breakEvenMonths: (currentBalance * 0.02 / monthlySavings).toFixed(1) // Assuming 2% refinance fee
    });
  };

  const updateCurrentLoan = (field, value) => {
    setCurrentLoan({
      ...currentLoan,
      [field]: value,
    });
  };

  const updateNewLoan = (field, value) => {
    setNewLoan({
      ...newLoan,
      [field]: value,
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
              Auto Loan Refinance Calculator
            </CardTitle>
            <CardDescription>
              Calculate potential savings from refinancing your auto loan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Loan Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="currentBalance">Current Balance ($)</Label>
                  <div className="relative">
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentLoan.balance}
                      onChange={(e) => setCurrentLoan({...currentLoan, balance: e.target.value})}
                      placeholder="25000"
                    />
                    <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="currentRate">Current Interest Rate (%)</Label>
                  <div className="relative">
                    <Input
                      id="currentRate"
                      type="number"
                      value={currentLoan.rate}
                      onChange={(e) => setCurrentLoan({...currentLoan, rate: e.target.value})}
                      placeholder="5.5"
                    />
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="currentTerm">Remaining Term (Years)</Label>
                  <div className="relative">
                    <Input
                      id="currentTerm"
                      type="number"
                      value={currentLoan.term}
                      onChange={(e) => setCurrentLoan({...currentLoan, term: e.target.value})}
                      placeholder="3"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="currentPayment">Current Monthly Payment ($)</Label>
                  <div className="relative">
                    <Input
                      id="currentPayment"
                      type="number"
                      value={currentLoan.payment}
                      onChange={(e) => setCurrentLoan({...currentLoan, payment: e.target.value})}
                      placeholder="500"
                    />
                    <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6">New Loan Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="newRate">New Interest Rate (%)</Label>
                  <div className="relative">
                    <Input
                      id="newRate"
                      type="number"
                      value={newLoan.rate}
                      onChange={(e) => setNewLoan({...newLoan, rate: e.target.value})}
                      placeholder="4.5"
                    />
                    <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="newTerm">New Term (Years)</Label>
                  <div className="relative">
                    <Input
                      id="newTerm"
                      type="number"
                      value={newLoan.term}
                      onChange={(e) => setNewLoan({...newLoan, term: e.target.value})}
                      placeholder="3"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={calculateRefinance} className="w-full">
              Calculate Savings
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">New Monthly Payment</h3>
                    <p className="text-lg font-bold text-primary">${results.newPayment}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Monthly Savings</h3>
                    <p className="text-lg font-bold text-primary">${results.monthlySavings}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Total Savings</h3>
                    <p className="text-lg font-bold text-primary">${results.totalSavings}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Break-Even Period</h3>
                    <p className="text-lg font-bold text-primary">{results.breakEvenMonths} months</p>
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
                <li>Calculate potential refinance savings</li>
                <li>Compare current and new loan terms</li>
                <li>Estimate monthly payment changes</li>
                <li>Calculate break-even period</li>
                <li>Detailed savings breakdown</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Auto Loan Refinancing
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Check your credit score before applying</li>
                <li>Compare rates from multiple lenders</li>
                <li>Consider refinancing fees</li>
                <li>Calculate the break-even point</li>
                <li>Review your current loan terms</li>
                <li>Understand prepayment penalties</li>
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
                  <h4 className="font-medium text-gray-800">When should I refinance my auto loan?</h4>
                  <p className="text-gray-700 mt-1">
                    Consider refinancing when interest rates have dropped significantly, your credit score has improved, or you want to change your loan term.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What fees are involved in refinancing?</h4>
                  <p className="text-gray-700 mt-1">
                    Common fees include application fees, origination fees, and title transfer fees. These typically range from 1-3% of the loan amount.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How does refinancing affect my credit score?</h4>
                  <p className="text-gray-700 mt-1">
                    Refinancing may cause a small temporary dip in your credit score due to the credit check, but it can improve your score over time by reducing your debt-to-income ratio.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Auto Loan Refinancing">
              <p>
                Auto loan refinancing can help you save money by securing a lower interest rate or better loan terms. Our calculator helps you understand the potential savings and whether refinancing makes sense for your situation.
              </p>
              <p>
                <strong className="text-foreground">Benefits of Refinancing:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Lower monthly payments</li>
                <li>Reduced interest rates</li>
                <li>Shorter loan terms</li>
                <li>Better loan terms</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Compare loan options</li>
                <li>Calculate potential savings</li>
                <li>Determine break-even point</li>
                <li>Make informed decisions</li>
              </ul>
              <p>
                For more financial tools, check out our <a href="/auto-loan">Auto Loan Calculator</a> and <a href="/budget">Budget Calculator</a> for comprehensive financial planning.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AutoLoanRefinanceCalculator; 