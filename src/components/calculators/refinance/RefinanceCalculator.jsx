
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, DollarSign, Percent, Calendar, Info, TrendingUp } from "lucide-react";
import { calculateRefinanceSavings } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";
import RefinanceForm from "@/components/calculators/refinance/RefinanceForm";
import RefinanceResults from "@/components/calculators/refinance/RefinanceResults";

const RefinanceCalculator = () => {
  const [currentLoanBalance, setCurrentLoanBalance] = useState(200000);
  const [currentInterestRate, setCurrentInterestRate] = useState(7.0);
  const [currentRemainingMonths, setCurrentRemainingMonths] = useState(300); 
  const [newInterestRate, setNewInterestRate] = useState(5.5);
  const [newLoanTermMonths, setNewLoanTermMonths] = useState(360); 
  const [closingCosts, setClosingCosts] = useState(3000);
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [lifetimeSavings, setLifetimeSavings] = useState(0);
  const [breakEvenMonths, setBreakEvenMonths] = useState(0);
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState(0);
  const [newMonthlyPayment, setNewMonthlyPayment] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const calculateResults = () => {
    if (currentLoanBalance <= 0 || currentInterestRate <= 0 || currentRemainingMonths <= 0 || newInterestRate <= 0 || newLoanTermMonths <= 0 || closingCosts < 0) {
        setShowResults(false);
        return;
    }

    const results = calculateRefinanceSavings(
      currentLoanBalance,
      currentInterestRate,
      currentRemainingMonths,
      newInterestRate,
      newLoanTermMonths,
      closingCosts
    );

    setMonthlySavings(results.monthlySavings);
    setLifetimeSavings(results.lifetimeSavings);
    setBreakEvenMonths(results.breakEvenMonths);
    setCurrentMonthlyPayment(results.currentMonthlyPayment);
    setNewMonthlyPayment(results.newMonthlyPayment);
    setShowResults(true);
  };

  useEffect(() => {
     if (currentLoanBalance > 0 && currentInterestRate > 0 && currentRemainingMonths > 0 && newInterestRate > 0 && newLoanTermMonths > 0 && closingCosts >= 0) {
        calculateResults();
     } else {
       setShowResults(false);
     }
  }, [currentLoanBalance, currentInterestRate, currentRemainingMonths, newInterestRate, newLoanTermMonths, closingCosts]);


  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Refinance Calculator</h1>
          <p className="text-muted-foreground">
            Analyze potential savings by refinancing your current mortgage or loan.
          </p>
        </div>

        <RefinanceForm
            currentLoanBalance={currentLoanBalance} setCurrentLoanBalance={setCurrentLoanBalance}
            currentInterestRate={currentInterestRate} setCurrentInterestRate={setCurrentInterestRate}
            currentRemainingMonths={currentRemainingMonths} setCurrentRemainingMonths={setCurrentRemainingMonths}
            newInterestRate={newInterestRate} setNewInterestRate={setNewInterestRate}
            newLoanTermMonths={newLoanTermMonths} setNewLoanTermMonths={setNewLoanTermMonths}
            closingCosts={closingCosts} setClosingCosts={setClosingCosts}
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
            <RefinanceResults
                currentMonthlyPayment={currentMonthlyPayment}
                newMonthlyPayment={newMonthlyPayment}
                monthlySavings={monthlySavings}
                breakEvenMonths={breakEvenMonths}
                lifetimeSavings={lifetimeSavings}
            />

             <SeoContent title="Understanding Your Refinance Calculation">
              <p>
                Refinancing involves replacing your existing loan (often a mortgage) with a new one, potentially with a lower interest rate or different term. This Refinance Calculator helps you analyze whether refinancing makes financial sense for your situation.
              </p>
              <p>
                <strong className="text-foreground">How to Use:</strong> Enter the details of your <strong className="text-foreground">Current Loan</strong> (balance, interest rate, remaining months) and the terms of the potential <strong className="text-foreground">New Loan</strong> (interest rate, term, estimated closing costs).
              </p>
              <p>
                <strong className="text-foreground">Key Results Explained:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Monthly Savings:</strong> The difference between your current and new estimated monthly principal & interest (P&I) payment. A positive number indicates immediate savings.</li>
                <li><strong className="text-foreground">Break-Even Point:</strong> The number of months it takes for your cumulative monthly savings to offset the closing costs of the new loan. A shorter break-even point is generally better, especially if you don't plan to stay in the home long-term.</li>
                <li><strong className="text-foreground">Lifetime Savings:</strong> The total estimated savings (or cost, if negative) over the entire life of the new loan compared to keeping your current loan, factoring in closing costs.</li>
              </ul>
              <p>
                <strong className="text-foreground">Important Considerations:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Closing Costs:</strong> These fees (appraisal, title, origination) can significantly impact savings. Ensure your estimate is realistic.</li>
                <li><strong className="text-foreground">Loan Term:</strong> Refinancing into a longer term might lower monthly payments but could result in paying more interest overall. Refinancing into a shorter term increases monthly payments but saves significant interest long-term.</li>
                <li><strong className="text-foreground">Cash-Out Refinance:</strong> This calculator assumes you are only refinancing the existing balance. If you take cash out, the analysis changes.</li>
                <li><strong className="text-foreground">Taxes & Insurance:</strong> Monthly P&I estimates do not include property taxes or homeowners insurance.</li>
              </ul>
              <p>
                Use this tool for preliminary analysis. Always compare official Loan Estimates from multiple lenders before making a refinancing decision.
              </p>
            </SeoContent>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RefinanceCalculator;
  