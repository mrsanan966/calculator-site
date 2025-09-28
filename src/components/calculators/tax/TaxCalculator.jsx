
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Info } from "lucide-react";
import { calculateIncomeTax, formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";
import TaxForm from "@/components/calculators/tax/TaxForm";
import TaxResults from "@/components/calculators/tax/TaxResults";

const TaxCalculator = () => {
  const [income, setIncome] = useState(75000);
  const [filingStatus, setFilingStatus] = useState("single"); 
  const [estimatedTax, setEstimatedTax] = useState(0);
  const [effectiveRate, setEffectiveRate] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const calculateResults = () => {
    if (income < 0) {
      setEstimatedTax(0);
      setEffectiveRate(0);
      setShowResults(true);
      return;
    }

    const tax = calculateIncomeTax(income, filingStatus);
    const rate = income > 0 ? (tax / income) * 100 : 0;

    setEstimatedTax(tax);
    setEffectiveRate(rate);
    setShowResults(true);
  };

  useEffect(() => {
    if (income >= 0) {
      calculateResults();
    } else {
      setShowResults(false);
    }
  }, [income, filingStatus]);

  return (
    <div className="container py-8 md:py-12" id="form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Simple Tax Calculator</h1>
          <p className="text-muted-foreground">
            Get a basic estimate of your federal income tax liability (demonstration purposes only).
          </p>
        </div>

        <TaxForm
          income={income}
          setIncome={setIncome}
          filingStatus={filingStatus}
          setFilingStatus={setFilingStatus}
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
            <TaxResults estimatedTax={estimatedTax} effectiveRate={effectiveRate} />
            <SeoContent title="Understanding the Simple Tax Calculation">
              <p>
                This calculator provides a very basic estimate of potential federal income tax based on gross income and filing status using simplified, illustrative tax brackets. <strong className="text-foreground">It is for informational and demonstration purposes only and should not be used for actual tax planning or filing.</strong>
              </p>
              <p>
                <strong className="text-foreground">How it Works (Simplified):</strong> The calculator applies a tiered tax rate based on the income level and whether you're filing as 'Single' or 'Married Filing Jointly'. Higher income levels generally fall into higher tax brackets.
              </p>
              <p>
                <strong className="text-foreground">Key Limitations:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">No Deductions:</strong> Does not account for standard or itemized deductions (e.g., mortgage interest, charitable donations, state/local taxes).</li>
                <li><strong className="text-foreground">No Credits:</strong> Does not include tax credits (e.g., Child Tax Credit, Earned Income Tax Credit), which directly reduce tax owed.</li>
                <li><strong className="text-foreground">Simplified Brackets:</strong> Uses illustrative brackets, not the official, annually updated IRS tax brackets.</li>
                <li><strong className="text-foreground">No State/Local Taxes:</strong> Only estimates federal income tax.</li>
                <li><strong className="text-foreground">No Other Income/Situations:</strong> Does not consider investment income, self-employment tax, or other complex financial situations.</li>
              </ul>
              <p>
                The <strong className="text-foreground">Estimated Federal Tax</strong> is the rough calculation based on this simplified model. The <strong className="text-foreground">Effective Tax Rate</strong> is the estimated tax divided by your gross income.
              </p>
              <p>
                For accurate tax calculations and advice, always use official IRS resources, reputable tax software, or consult with a qualified tax professional who can consider your complete financial picture.
              </p>
            </SeoContent>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TaxCalculator;
  