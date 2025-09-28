import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calendar, Car } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const AutoLeaseCalculator = () => {
  const [leaseDetails, setLeaseDetails] = useState({
    carPrice: "",
    downPayment: "",
    tradeIn: "",
    residualValue: "",
    moneyFactor: "",
    term: "",
    salesTax: ""
  });
  const [results, setResults] = useState(null);

  const calculateLease = () => {
    const price = parseFloat(leaseDetails.carPrice);
    const down = parseFloat(leaseDetails.downPayment);
    const trade = parseFloat(leaseDetails.tradeIn);
    const residual = parseFloat(leaseDetails.residualValue) / 100;
    const moneyFactor = parseFloat(leaseDetails.moneyFactor) / 1000;
    const term = parseFloat(leaseDetails.term);
    const tax = parseFloat(leaseDetails.salesTax) / 100;

    if (isNaN(price) || isNaN(down) || isNaN(trade) || 
        isNaN(residual) || isNaN(moneyFactor) || isNaN(term) || isNaN(tax)) {
      return;
    }

    // Calculate lease amount
    const subtotal = price - down - trade;
    const taxAmount = subtotal * tax;
    const leaseAmount = subtotal + taxAmount;

    // Calculate residual value
    const residualAmount = price * residual;

    // Calculate depreciation
    const depreciation = leaseAmount - residualAmount;
    const monthlyDepreciation = depreciation / term;

    // Calculate interest
    const monthlyInterest = (leaseAmount + residualAmount) * moneyFactor;

    // Calculate monthly payment
    const monthlyPayment = monthlyDepreciation + monthlyInterest;

    // Calculate total cost
    const totalCost = (monthlyPayment * term) + down + trade;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalCost: totalCost.toFixed(2),
      residualAmount: residualAmount.toFixed(2),
      depreciation: depreciation.toFixed(2),
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
              Auto Lease Calculator
            </CardTitle>
            <CardDescription>
              Calculate your monthly lease payment and total cost
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
                    value={leaseDetails.carPrice}
                    onChange={(e) => setLeaseDetails({...leaseDetails, carPrice: e.target.value})}
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
                    value={leaseDetails.downPayment}
                    onChange={(e) => setLeaseDetails({...leaseDetails, downPayment: e.target.value})}
                    placeholder="2000"
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
                    value={leaseDetails.tradeIn}
                    onChange={(e) => setLeaseDetails({...leaseDetails, tradeIn: e.target.value})}
                    placeholder="0"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="residualValue">Residual Value (%)</Label>
                <div className="relative">
                  <Input
                    id="residualValue"
                    type="number"
                    value={leaseDetails.residualValue}
                    onChange={(e) => setLeaseDetails({...leaseDetails, residualValue: e.target.value})}
                    placeholder="55"
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="moneyFactor">Money Factor</Label>
                <Input
                  id="moneyFactor"
                  type="number"
                  value={leaseDetails.moneyFactor}
                  onChange={(e) => setLeaseDetails({...leaseDetails, moneyFactor: e.target.value})}
                  placeholder="2.5"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="term">Lease Term (Months)</Label>
                <Input
                  id="term"
                  type="number"
                  value={leaseDetails.term}
                  onChange={(e) => setLeaseDetails({...leaseDetails, term: e.target.value})}
                  placeholder="36"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="salesTax">Sales Tax (%)</Label>
                <div className="relative">
                  <Input
                    id="salesTax"
                    type="number"
                    value={leaseDetails.salesTax}
                    onChange={(e) => setLeaseDetails({...leaseDetails, salesTax: e.target.value})}
                    placeholder="6"
                  />
                  <Percent className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <Button onClick={calculateLease} className="w-full">
              Calculate Lease
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Monthly Payment</h3>
                    <p className="text-lg font-bold text-primary">${results.monthlyPayment}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Total Cost</h3>
                    <p className="text-lg font-bold text-primary">${results.totalCost}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Residual Value</h3>
                    <p className="text-lg font-bold text-primary">${results.residualAmount}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Total Depreciation</h3>
                    <p className="text-lg font-bold text-primary">${results.depreciation}</p>
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
                <li>Calculate lease payments</li>
                <li>Include down payment and trade-in</li>
                <li>Account for residual value</li>
                <li>Calculate total lease cost</li>
                <li>Estimate depreciation</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Leasing
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Negotiate the car price first</li>
                <li>Understand the money factor</li>
                <li>Check the residual value</li>
                <li>Consider mileage limits</li>
                <li>Read the fine print</li>
                <li>Compare lease vs. buy</li>
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
                  <h4 className="font-medium text-gray-800">What is a money factor?</h4>
                  <p className="text-gray-700 mt-1">
                    The money factor is the lease equivalent of an interest rate. It's typically expressed as a decimal (e.g., 0.0025) and can be converted to an approximate interest rate by multiplying by 2400.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What is residual value?</h4>
                  <p className="text-gray-700 mt-1">
                    Residual value is the estimated value of the car at the end of the lease term. It's expressed as a percentage of the car's original price and affects your monthly payments.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Should I lease or buy?</h4>
                  <p className="text-gray-700 mt-1">
                    Leasing may be better if you want lower monthly payments, like driving new cars, and don't drive many miles. Buying may be better if you want to own the car, drive many miles, or customize the vehicle.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Auto Leasing">
              <p>
                Understanding your auto lease is important when considering leasing a vehicle. Our calculator helps you estimate your monthly payments and total cost, taking into account factors like the car price, residual value, and money factor.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Leasing:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Car price and value</li>
                <li>Residual value</li>
                <li>Money factor</li>
                <li>Lease term</li>
                <li>Down payment</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Estimate monthly payments</li>
                <li>Calculate total lease cost</li>
                <li>Compare lease vs. buy</li>
                <li>Plan your budget</li>
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

export default AutoLeaseCalculator; 