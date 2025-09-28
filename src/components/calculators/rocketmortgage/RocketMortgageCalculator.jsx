
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Home, DollarSign, Percent, Calendar } from "lucide-react";
import { formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const RocketMortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(3000);
  const [homeInsurance, setHomeInsurance] = useState(1200);
  const [pmi, setPmi] = useState(0);
  const [results, setResults] = useState(null);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    // Monthly mortgage payment (Principal + Interest)
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    // Monthly property tax
    const monthlyPropertyTax = propertyTax / 12;

    // Monthly home insurance
    const monthlyInsurance = homeInsurance / 12;

    // Monthly PMI (if down payment is less than 20%)
    const monthlyPMI = (downPayment / homePrice) < 0.2 ? (principal * 0.01) / 12 : 0;

    // Total monthly payment
    const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI;

    // Calculate loan details
    const totalLoanCost = totalMonthlyPayment * numberOfPayments;
    const totalInterest = (monthlyPayment * numberOfPayments) - principal;

    setResults({
      monthlyPayment,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyPMI,
      totalMonthlyPayment,
      totalLoanCost,
      totalInterest,
      loanAmount: principal
    });
  };

  const downPaymentPercent = (downPayment / homePrice) * 100;

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
              <Home className="mr-3 h-8 w-8 text-primary" />
              Rocket Mortgage Calculator
            </CardTitle>
            <CardDescription>
              Calculate your potential mortgage payments with current Rocket Mortgage rates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="homePrice">Home Price ($)</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="homePrice"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {downPaymentPercent.toFixed(1)}% of home price
                </p>
              </div>

              <div>
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <Select value={loanTerm} onValueChange={setLoanTerm}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Years</SelectItem>
                    <SelectItem value="20">20 Years</SelectItem>
                    <SelectItem value="15">15 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="flex items-center space-x-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="propertyTax"
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="homeInsurance">Annual Home Insurance ($)</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="homeInsurance"
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button onClick={calculateMortgage} className="w-full">
                Calculate Mortgage Payment
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Monthly Payment</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.totalMonthlyPayment)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Principal & Interest</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.monthlyPayment)}
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Property Tax</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.monthlyPropertyTax)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Home Insurance</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.monthlyInsurance)}
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">PMI</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.monthlyPMI)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Loan Amount:</span>
                      <span className="font-semibold">{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-semibold">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Cost:</span>
                      <span className="font-semibold">{formatCurrency(results.totalLoanCost)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding Rocket Mortgage">
          <h2 className="text-xl font-semibold mb-4">About Rocket Mortgage</h2>
          <p>
            Rocket Mortgage is one of America's largest mortgage lenders, offering a variety of home loan options with a streamlined digital application process.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Mortgage Payment Components</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Principal and Interest:</strong> The base loan payment</li>
            <li><strong>Property Taxes:</strong> Annual taxes divided into monthly payments</li>
            <li><strong>Home Insurance:</strong> Required coverage for your property</li>
            <li><strong>PMI:</strong> Required if down payment is less than 20%</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Tips for Lower Payments</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Make a larger down payment to avoid PMI</li>
            <li>Compare rates from multiple lenders</li>
            <li>Consider a longer loan term for lower monthly payments</li>
            <li>Improve your credit score for better rates</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default RocketMortgageCalculator;
