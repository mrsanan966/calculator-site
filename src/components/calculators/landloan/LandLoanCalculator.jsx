
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mountain } from "lucide-react";
import LoanCalculatorResults from "@/components/calculators/LoanCalculatorResults";
import AmortizationTable from "@/components/calculators/AmortizationTable";
import { calculateLoanPayment, calculateAmortizationSchedule } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";
import LandLoanForm from "@/components/calculators/landloan/LandLoanForm";
import { Card, CardContent } from "@/components/ui/card";

const LandLoanCalculator = () => {
  const [landPrice, setLandPrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [interestRate, setInterestRate] = useState(7.5); 
  const [loanTermMonths, setLoanTermMonths] = useState(180); 
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const amount = landPrice - downPayment;
    setLoanAmount(Math.max(0, amount));
  }, [landPrice, downPayment]);

  const calculateResults = () => {
    if (loanAmount <= 0 || interestRate < 0 || loanTermMonths <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(loanAmount);
      setAmortizationSchedule([]);
      setShowResults(true);
      setActiveTab("summary");
      return;
    }

    const payment = calculateLoanPayment(loanAmount, interestRate, loanTermMonths);
    const schedule = calculateAmortizationSchedule(loanAmount, interestRate, loanTermMonths);
    const calculatedTotalInterest = schedule.reduce((sum, row) => sum + row.interestPayment, 0);
    const calculatedTotalPayment = loanAmount + calculatedTotalInterest;

    setMonthlyPayment(payment);
    setTotalInterest(calculatedTotalInterest);
    setTotalPayment(calculatedTotalPayment);
    setAmortizationSchedule(schedule);
    setShowResults(true);
    setActiveTab("summary");
  };

  useEffect(() => {
     if (loanAmount > 0 && interestRate >= 0 && loanTermMonths > 0) {
       calculateResults();
     } else {
       setShowResults(false);
     }
  }, [loanAmount, interestRate, loanTermMonths]);

  return (
    <div className="container py-8 md:py-12" id="form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center"><Mountain className="mr-2 h-8 w-8 text-primary"/>Land Loan Calculator</h1>
          <p className="text-muted-foreground">
            Estimate payments for purchasing raw land or undeveloped lots.
          </p>
        </div>

        <LandLoanForm
            landPrice={landPrice} setLandPrice={setLandPrice}
            downPayment={downPayment} setDownPayment={setDownPayment}
            interestRate={interestRate} setInterestRate={setInterestRate}
            loanTermMonths={loanTermMonths} setLoanTermMonths={setLoanTermMonths}
            setShowResults={setShowResults}
        />
        
        {showResults && (
          <motion.div
            id="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="amortization" disabled={loanAmount <= 0}>Amortization</TabsTrigger>
              </TabsList>
              <TabsContent value="summary" id="summary" className="mt-4">
                <LoanCalculatorResults
                  monthlyPayment={monthlyPayment}
                  totalInterest={totalInterest}
                  totalPayment={totalPayment}
                  loanAmount={loanAmount}
                  setActiveTab={setActiveTab}
                />
              </TabsContent>
              <TabsContent value="amortization" id="amortization" className="mt-4">
                {loanAmount > 0 ? (
                  <AmortizationTable schedule={amortizationSchedule} />
                ) : (
                  <Card><CardContent className="pt-6 text-center text-muted-foreground">Amortization schedule requires a valid loan amount.</CardContent></Card>
                )}
              </TabsContent>
            </Tabs>

            <SeoContent title="Understanding Your Land Loan Calculation">
              <p>
                Purchasing land involves different financing considerations than buying a house. This Land Loan Calculator helps estimate the payments for financing a plot of land, whether it's raw, undeveloped, or a lot ready for building.
              </p>
              <p>
                <strong className="text-foreground">Key Differences for Land Loans:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Higher Down Payments:</strong> Lenders often perceive land loans as riskier than mortgages, typically requiring larger down payments, often 20% to 50% or more.</li>
                <li><strong className="text-foreground">Higher Interest Rates:</strong> Interest rates for land loans may be higher compared to traditional home mortgages due to the perceived risk.</li>
                <li><strong className="text-foreground">Shorter Loan Terms:</strong> While terms vary, land loans often have shorter repayment periods than 30-year mortgages, commonly ranging from 10 to 20 years.</li>
                <li><strong className="text-foreground">Property Use Matters:</strong> Lenders will consider how you plan to use the land (building immediately, investment, recreation) and the land's characteristics (access, utilities, zoning).</li>
              </ul>
              <p>
                Use this calculator by entering the <strong className="text-foreground">Land Price</strong>, your anticipated <strong className="text-foreground">Down Payment</strong>, the expected <strong className="text-foreground">Interest Rate</strong>, and the <strong className="text-foreground">Loan Term</strong> (in months). It provides an estimate of your monthly payments and total borrowing costs.
              </p>
              <p>
                These calculations are estimates. Securing a land loan requires detailed discussions with lenders specializing in this type of financing. Be prepared for thorough reviews of the property and your financial profile.
              </p>
            </SeoContent>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default LandLoanCalculator;
  