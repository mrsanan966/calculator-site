import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calendar, Car } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const AutoPaymentCalculator = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    carPrice: "",
    downPayment: "",
    tradeIn: "",
    interestRate: "",
    term: "",
    salesTax: ""
  });
  const [results, setResults] = useState(null);

  const calculatePayment = () => {
    const price = parseFloat(paymentDetails.carPrice);
    const down = parseFloat(paymentDetails.downPayment);
    const trade = parseFloat(paymentDetails.tradeIn);
    const rate = parseFloat(paymentDetails.interestRate) / 100 / 12;
    const term = parseFloat(paymentDetails.term) * 12;
    const tax = parseFloat(paymentDetails.salesTax) / 100;

    if (isNaN(price) || isNaN(down) || isNaN(trade) || 
        isNaN(rate) || isNaN(term) || isNaN(tax)) {
      return;
    }

    // Calculate loan amount
    const subtotal = price - down - trade;
    const taxAmount = subtotal * tax;
    const loanAmount = subtotal + taxAmount;

    // Calculate monthly payment
    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / 
                          (Math.pow(1 + rate, term) - 1);

    // Calculate total cost
    const totalCost = monthlyPayment * term + down + trade;
    const totalInterest = totalCost - loanAmount;

    setResults({
      loanAmount: loanAmount.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      totalCost: totalCost.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      taxAmount: taxAmount.toFixed(2)
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
              Auto Payment Calculator
            </CardTitle>
            <CardDescription>
              Calculate your monthly car payment and total cost
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="carPrice">Car Price ($)</Label>
                <div className="relative">
                  <Input
                    id="carPrice"
                    type="number"
                    value={paymentDetails.carPrice}
                    onChange={(e) => setPaymentDetails({...paymentDetails, carPrice: e.target.value})}
                    placeholder="30000"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <div className="relative">
                  <Input
                    id="downPayment"
                    type="number"
                    value={paymentDetails.downPayment}
                    onChange={(e) => setPaymentDetails({...paymentDetails, downPayment: e.target.value})}
                    placeholder="5000"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="tradeIn">Trade-in Value ($)</Label>
                <div className="relative">
                  <Input
                    id="tradeIn"
                    type="number"
                    value={paymentDetails.tradeIn}
                    onChange={(e) => setPaymentDetails({...paymentDetails, tradeIn: e.target.value})}
                    placeholder="0"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="relative">
                  <Input
                    id="interestRate"
                    type="number"
                    value={paymentDetails.interestRate}
                    onChange={(e) => setPaymentDetails({...paymentDetails, interestRate: e.target.value})}
                    placeholder="5.5"
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="term">Loan Term (Years)</Label>
                <div className="relative">
                  <Input
                    id="term"
                    type="number"
                    value={paymentDetails.term}
                    onChange={(e) => setPaymentDetails({...paymentDetails, term: e.target.value})}
                    placeholder="5"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="salesTax">Sales Tax (%)</Label>
                <div className="relative">
                  <Input
                    id="salesTax"
                    type="number"
                    value={paymentDetails.salesTax}
                    onChange={(e) => setPaymentDetails({...paymentDetails, salesTax: e.target.value})}
                    placeholder="6"
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <Button onClick={calculatePayment} className="w-full">
              Calculate Payment
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Loan Amount</h3>
                    <p className="text-lg font-bold text-primary">${results.loanAmount}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Monthly Payment</h3>
                    <p className="text-lg font-bold text-primary">${results.monthlyPayment}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Total Cost</h3>
                    <p className="text-lg font-bold text-primary">${results.totalCost}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Total Interest</h3>
                    <p className="text-lg font-bold text-primary">${results.totalInterest}</p>
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
                <li>Calculate monthly car payments</li>
                <li>Include down payment and trade-in value</li>
                <li>Account for sales tax</li>
                <li>Calculate total loan cost</li>
                <li>Estimate interest payments</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Car Payments
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Save for a larger down payment</li>
                <li>Shop around for the best interest rates</li>
                <li>Consider shorter loan terms</li>
                <li>Check your credit score before applying</li>
                <li>Negotiate the car price first</li>
                <li>Understand all fees and charges</li>
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
                  <h4 className="font-medium text-gray-800">What is a good interest rate for a car loan?</h4>
                  <p className="text-gray-700 mt-1">
                    Interest rates vary based on credit score, loan term, and market conditions. Generally, rates below 5% are considered good for new cars, while rates below 7% are good for used cars.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How much should I put down on a car?</h4>
                  <p className="text-gray-700 mt-1">
                    A down payment of 20% is recommended to avoid being upside down on your loan. However, the minimum down payment can be as low as 0% for some new car loans.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What is the best loan term for a car?</h4>
                  <p className="text-gray-700 mt-1">
                    Shorter terms (36-48 months) typically have lower interest rates and cost less overall. Longer terms (60-72 months) have lower monthly payments but cost more in interest.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Car Payments">
              <p>
                Understanding your car payment is crucial when financing a vehicle. Our calculator helps you estimate your monthly payments and total cost, taking into account factors like the car price, down payment, interest rate, and loan term.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Car Payments:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Car price and value</li>
                <li>Down payment amount</li>
                <li>Interest rate and term</li>
                <li>Trade-in value</li>
                <li>Sales tax and fees</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Estimate monthly payments</li>
                <li>Calculate total loan cost</li>
                <li>Compare different scenarios</li>
                <li>Plan your budget</li>
              </ul>
              <p>
                For more financial tools, check out our <a href="/auto-loan">Auto Loan Calculator</a> and <a href="/auto-refinance">Auto Loan Refinance Calculator</a> for comprehensive financial planning.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AutoPaymentCalculator; 