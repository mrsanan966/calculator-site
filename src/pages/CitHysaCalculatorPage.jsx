import React from "react";
import CitHysaCalculator from "@/components/calculators/cithysa/CitHysaCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const CitHysaCalculatorPage = () => {
  useSeo({
    
    
    title: "CIT HYSA Calculator - High Yield Savings Account Calculator",
    canonical: "/cit-hysa",
    path: "/cit-hysa",
    description: "Calculate your potential earnings with CIT Bank's HYSA using our specialized calculator.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "CIT HYSA Calculator",
      "description": "Calculate your potential earnings with CIT Bank's High Yield Savings Account.",
      "url": "https://financeloancalc.com/cit-hysa"
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <CitHysaCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CitHysaCalculatorPage; 