import React from "react";
import DunkCalculator from "@/components/calculators/dunk/DunkCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';

const DunkCalculatorPage = () => {
  useSeo({
    
    
    title: "Dunk Calculator - Can You Dunk a Basketball?",
    canonical: "/dunk",
    path: "/dunk",
    description: "Estimate if you can dunk a basketball based on your height, standing reach, and vertical jump. See how close you are to reaching a 10-foot rim!",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use the Dunk Calculator",
      "description": "Estimate if you can dunk a basketball based on your physical measurements.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Your Measurements",
          "text": "Input your height (feet and inches), standing reach (feet and inches - how high you can reach standing flat-footed with one arm up), and your vertical jump (inches).",
          "url": "https://financeloancalc.com/dunk#form"
        },
        {
          "@type": "HowToStep",
          "name": "View Dunk Potential",
          "text": "The calculator automatically determines your maximum jump reach and tells you if you can theoretically reach a standard 10-foot (120 inches) basketball rim, and by how much.",
          "url": "https://financeloancalc.com/dunk#results"
        }
      ],
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0" 
      },
      "supply": [
        { "@type": "HowToSupply", "name": "Your Height (Feet & Inches)" },
        { "@type": "HowToSupply", "name": "Standing Reach (Feet & Inches)" },
        { "@type": "HowToSupply", "name": "Vertical Jump (Inches)" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "FinCalc Dunk Calculator" }],
      "totalTime": "PT1M"
    }
  });
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <DunkCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DunkCalculatorPage;
  