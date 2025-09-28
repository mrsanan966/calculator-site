
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SeoContent from "@/components/calculators/SeoContent";
import RebaForm from "@/components/calculators/reba/RebaForm";
import RebaResults from "@/components/calculators/reba/RebaResults";

const RebaCalculator = () => {
  const [inputs, setInputs] = useState({
    purchasePrice: 250000,
    closingCostsPercentage: 3,
    renovationCosts: 10000,
    grossMonthlyRent: 2000,
    vacancyRate: 5,
    propertyTaxAnnual: 3000,
    insuranceAnnual: 1000,
    maintenanceRate: 5,
    propertyManagementRate: 8,
    otherMonthlyExpenses: 100,
    downPaymentPercentage: 25,
    loanInterestRate: 6.5,
    loanTermYears: 30,
  });

  const [results, setResults] = useState({
    noi: 0,
    capRate: 0,
    cashFlowBeforeTax: 0,
    cashOnCashReturn: 0,
    totalCashNeeded: 0,
  });
  const [showResults, setShowResults] = useState(false);

  const calculateAllResults = () => {
    const closingCosts = inputs.purchasePrice * (inputs.closingCostsPercentage / 100);
    const totalAcquisitionCost = inputs.purchasePrice + closingCosts + inputs.renovationCosts;
    const downPaymentAmount = inputs.purchasePrice * (inputs.downPaymentPercentage / 100);
    const loanAmount = inputs.purchasePrice - downPaymentAmount;
    const calculatedTotalCashNeeded = downPaymentAmount + closingCosts + inputs.renovationCosts;

    const grossPotentialRent = inputs.grossMonthlyRent * 12;
    const vacancyLoss = grossPotentialRent * (inputs.vacancyRate / 100);
    const effectiveGrossIncome = grossPotentialRent - vacancyLoss;

    const maintenanceCosts = grossPotentialRent * (inputs.maintenanceRate / 100);
    const propManagementCosts = grossPotentialRent * (inputs.propertyManagementRate / 100);
    const totalOperatingExpenses = inputs.propertyTaxAnnual + inputs.insuranceAnnual + maintenanceCosts + propManagementCosts + (inputs.otherMonthlyExpenses * 12);

    const calculatedNoi = effectiveGrossIncome - totalOperatingExpenses;
    const calculatedCapRate = totalAcquisitionCost > 0 ? (calculatedNoi / totalAcquisitionCost) * 100 : 0;

    let annualDebtService = 0;
    if (loanAmount > 0 && inputs.loanInterestRate > 0 && inputs.loanTermYears > 0) {
        const monthlyRate = inputs.loanInterestRate / 100 / 12;
        const numberOfPayments = inputs.loanTermYears * 12;
        const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        annualDebtService = monthlyPayment * 12;
    }

    const calculatedCashFlowBeforeTax = calculatedNoi - annualDebtService;
    const calculatedCashOnCashReturn = calculatedTotalCashNeeded > 0 ? (calculatedCashFlowBeforeTax / calculatedTotalCashNeeded) * 100 : 0;
    
    setResults({
        noi: calculatedNoi,
        capRate: calculatedCapRate,
        cashFlowBeforeTax: calculatedCashFlowBeforeTax,
        cashOnCashReturn: calculatedCashOnCashReturn,
        totalCashNeeded: calculatedTotalCashNeeded,
    });
    setShowResults(true);
  };

  useEffect(() => {
    calculateAllResults();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container py-8 md:py-12" id="form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Real Estate Investment Analyzer (REBA)</h1>
          <p className="text-muted-foreground">
            Estimate key financial metrics for a potential rental property investment.
          </p>
        </div>

        <RebaForm inputs={inputs} onInputChange={handleInputChange} />
          
        {showResults && (
          <motion.div
            id="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <RebaResults results={results} />
            <SeoContent title="Understanding Real Estate Investment Metrics">
              <p>
                Analyzing a potential rental property investment involves looking at several key financial metrics. This calculator helps estimate some of the most common ones used by real estate investors.
              </p>
              <p>
                <strong className="text-foreground">Key Metrics Explained:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Total Cash Needed:</strong> The estimated upfront cash required, including down payment, closing costs, and initial renovation expenses.</li>
                <li><strong className="text-foreground">Net Operating Income (NOI):</strong> The property's annual income after deducting operating expenses (taxes, insurance, maintenance, vacancy, property management) but <span className="italic">before</span> accounting for loan payments (debt service). NOI = Effective Gross Income - Operating Expenses.</li>
                <li><strong className="text-foreground">Capitalization Rate (Cap Rate):</strong> A measure of the property's potential rate of return based on its income relative to its acquisition cost. It helps compare different investment opportunities. Cap Rate = NOI / Total Acquisition Cost. A higher cap rate generally indicates higher potential return (and possibly higher risk).</li>
                <li><strong className="text-foreground">Cash Flow (Before Tax):</strong> The annual cash remaining after paying all operating expenses AND debt service (loan payments). Cash Flow = NOI - Annual Debt Service. This is the money potentially left in your pocket each year before income taxes.</li>
                <li><strong className="text-foreground">Cash-on-Cash Return (CoC):</strong> Measures the annual pre-tax cash flow relative to the total cash invested. It shows the return on your actual cash outlay. CoC Return = Annual Cash Flow / Total Cash Needed.</li>
              </ul>
              <p>
                These metrics provide a snapshot of the property's financial performance based on your assumptions. Remember to be realistic with expense estimates (especially maintenance and vacancy). Market conditions, unexpected repairs, and tenant issues can all impact actual returns. This calculator does not factor in income taxes or potential appreciation. Always conduct thorough due diligence before investing.
              </p>
            </SeoContent>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RebaCalculator;
  