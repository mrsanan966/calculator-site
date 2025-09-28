import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calendar, Car } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const AutoRefinanceCalculator = () => {
  const [refinanceDetails, setRefinanceDetails] = useState({
    currentBalance: "",
    currentRate: "",
    currentTerm: "",
    newRate: "",
    newTerm: "",
    refinanceFee: ""
  });
  const [results, setResults] = useState(null);

  const calculateRefinance = () => {
    const balance = parseFloat(refinanceDetails.currentBalance);
    const currentRate = parseFloat(refinanceDetails.currentRate) / 100 / 12;
    const currentTerm = parseFloat(refinanceDetails.currentTerm) * 12;
    const newRate = parseFloat(refinanceDetails.newRate) / 100 / 12;
    const newTerm = parseFloat(refinanceDetails.newTerm) * 12;
    const fee = parseFloat(refinanceDetails.refinanceFee);

    if (isNaN(balance) || isNaN(currentRate) || isNaN(currentTerm) || 
        isNaN(newRate) || isNaN(newTerm) || isNaN(fee)) {
      return;
    }

    // Calculate current payment
    const currentPayment = (balance * currentRate * Math.pow(1 + currentRate, currentTerm)) / 
                          (Math.pow(1 + currentRate, currentTerm) - 1);
    
    // Calculate new payment
    const newPayment = (balance * newRate * Math.pow(1 + newRate, newTerm)) / 
                      (Math.pow(1 + newRate, newTerm) - 1);

    // Calculate total costs
    const currentTotal = currentPayment * currentTerm;
    const newTotal = (newPayment * newTerm) + fee;
    
    // Calculate savings
    const monthlySavings = currentPayment - newPayment;
    const totalSavings = currentTotal - newTotal;

    setResults({
      currentPayment: currentPayment.toFixed(2),
      newPayment: newPayment.toFixed(2),
      monthlySavings: monthlySavings.toFixed(2),
      totalSavings: totalSavings.toFixed(2),
      breakEvenMonths: (fee / monthlySavings).toFixed(1)
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
              <Car className="mr-3 h-8 w-8" />
              Auto Refinance Calculator
            </CardTitle>
            <CardDescription>
              Calculate potential savings from refinancing your auto loan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="currentBalance">Current Balance ($)</Label>
                <div className="relative">
                  <Input
                    id="currentBalance"
                    type="number"
                    value={refinanceDetails.currentBalance}
                    onChange={(e) => setRefinanceDetails({...refinanceDetails, currentBalance: e.target.value})}
                    placeholder="20000"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="currentRate">Current Rate (%)</Label>
                <div className="relative">
                  <Input
                    id="currentRate"
                    type="number"
                    value={refinanceDetails.currentRate}
                    onChange={(e) => setRefinanceDetails({...refinanceDetails, currentRate: e.target.value})}
                    placeholder="7.5"
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="currentTerm">Current Term (Years)</Label>
                <Input
                  id="currentTerm"
                  type="number"
                  value={refinanceDetails.currentTerm}
                  onChange={(e) => setRefinanceDetails({...refinanceDetails, currentTerm: e.target.value})}
                  placeholder="5"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="newRate">New Rate (%)</Label>
                <div className="relative">
                  <Input
                    id="newRate"
                    type="number"
                    value={refinanceDetails.newRate}
                    onChange={(e) => setRefinanceDetails({...refinanceDetails, newRate: e.target.value})}
                    placeholder="5.5"
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="newTerm">New Term (Years)</Label>
                <Input
                  id="newTerm"
                  type="number"
                  value={refinanceDetails.newTerm}
                  onChange={(e) => setRefinanceDetails({...refinanceDetails, newTerm: e.target.value})}
                  placeholder="5"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="refinanceFee">Refinance Fee ($)</Label>
                <div className="relative">
                  <Input
                    id="refinanceFee"
                    type="number"
                    value={refinanceDetails.refinanceFee}
                    onChange={(e) => setRefinanceDetails({...refinanceDetails, refinanceFee: e.target.value})}
                    placeholder="300"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                    <h3 className="text-sm font-semibold mb-2">Current Payment</h3>
                    <p className="text-lg font-bold text-primary">${results.currentPayment}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">New Payment</h3>
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
                  <div className="p-4 bg-primary/5 rounded-lg col-span-2">
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
                <li>Calculate potential savings</li>
                <li>Compare current and new payments</li>
                <li>Estimate break-even period</li>
                <li>Account for refinance fees</li>
                <li>Calculate total cost savings</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Auto Refinancing
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Check your credit score first</li>
                <li>Compare multiple lenders</li>
                <li>Consider all fees involved</li>
                <li>Calculate break-even period</li>
                <li>Read the fine print</li>
                <li>Check for prepayment penalties</li>
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
                    Consider refinancing when interest rates have dropped, your credit score has improved, or you can get a better rate from another lender. Make sure the savings outweigh the refinancing costs.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What fees are involved in refinancing?</h4>
                  <p className="text-gray-700 mt-1">
                    Common fees include application fees, origination fees, title transfer fees, and potentially early payoff penalties from your current lender.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How do I know if refinancing is worth it?</h4>
                  <p className="text-gray-700 mt-1">
                    Calculate the break-even period by dividing the total refinancing costs by your monthly savings. If you plan to keep the car longer than the break-even period, refinancing may be worthwhile.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Auto Loan Refinancing">
              <p>
                Auto loan refinancing can help you save money by securing a lower interest rate or better loan terms. Our calculator helps you determine if refinancing makes financial sense for your situation.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Refinancing:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Current loan balance</li>
                <li>Interest rates</li>
                <li>Loan terms</li>
                <li>Refinancing fees</li>
                <li>Credit score</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Compare current and new payments</li>
                <li>Calculate potential savings</li>
                <li>Determine break-even period</li>
                <li>Make informed decisions</li>
              </ul>
              <p>
                For more financial tools, check out our <a href="/auto-loan">Auto Loan Calculator</a> and <a href="/auto-payment">Auto Payment Calculator</a> for comprehensive financial planning.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AutoRefinanceCalculator; 