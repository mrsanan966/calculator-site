
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoanCalculatorForm from "@/components/calculators/LoanCalculatorForm"; 
import LoanCalculatorResults from "@/components/calculators/LoanCalculatorResults"; 
import AmortizationTable from "@/components/calculators/AmortizationTable"; 
import { calculateLoanPayment, calculateAmortizationSchedule } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const PersonalLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [interestRate, setInterestRate] = useState(12.0); 
  const [loanTermMonths, setLoanTermMonths] = useState(24); 
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [activeTab, setActiveTab] = useState("summary");
  const [showResults, setShowResults] = useState(false);

  const loanTermYears = loanTermMonths / 12;

  const calculateResults = () => {
    if (loanAmount <= 0 || interestRate < 0 || loanTermMonths <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
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
          <h1 className="text-3xl font-bold mb-2">Personal Loan Calculator</h1>
          <p className="text-muted-foreground">
            Estimate monthly payments and total costs for an unsecured personal loan.
          </p>
        </div>

        <LoanCalculatorForm
          loanAmount={loanAmount}
          setLoanAmount={setLoanAmount}
          interestRate={interestRate}
          setInterestRate={setInterestRate}
          loanTermYears={loanTermYears}
          loanTermMonths={loanTermMonths}
          setLoanTermMonths={setLoanTermMonths}
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
                    <p className="text-center text-muted-foreground py-4">Amortization schedule requires a valid loan amount.</p>
                  )}
              </TabsContent>
            </Tabs>

            <SeoContent title="Understanding Your Personal Loan Calculation">
              <p>
                Personal loans are typically unsecured loans used for various purposes like debt consolidation, home improvements, or large purchases. This calculator helps you estimate the financial implications of taking out a personal loan.
              </p>
              <p>
                <strong className="text-foreground">Inputs:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Loan Amount:</strong> How much you need to borrow.</li>
                <li><strong className="text-foreground">Interest Rate (APR):</strong> The Annual Percentage Rate. Personal loan rates vary widely based on your creditworthiness and the lender. They are often higher than secured loans like mortgages or auto loans.</li>
                <li><strong className="text-foreground">Loan Term (Months):</strong> How long you have to repay the loan, typically ranging from 12 to 60 months (1 to 5 years).</li>
              </ul>
              <p>
                The calculator provides estimates for your <strong className="text-foreground">Monthly Payment</strong>, the <strong className="text-foreground">Total Interest Paid</strong> (the cost of borrowing), and the <strong className="text-foreground">Total Amount Paid</strong> back to the lender. The <strong className="text-foreground">Amortization Schedule</strong> details each payment's principal and interest components over the loan's duration.
              </p>
              <p>
                When considering a personal loan, compare offers from multiple lenders (banks, credit unions, online lenders). Pay close attention to the APR, any origination fees, and the total repayment amount. Ensure the monthly payment fits comfortably within your budget.
              </p>
            </SeoContent>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PersonalLoanCalculator;
  