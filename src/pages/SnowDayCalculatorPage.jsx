import React from "react";
import SnowDayCalculator from "@/components/calculators/snowday/SnowDayCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';

const SnowDayCalculatorPage = () => {
  useSeo({
    
    
    title: "Snow Day Calculator - Likelihood Predictor (Fun)",
    canonical: "/snow-day",
    path: "/snow-day",
    description: "Estimate the probability of a snow day based on forecast conditions like snowfall, timing, temperature, and wind. For entertainment purposes only!",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use the Snow Day Calculator",
      "description": "Estimate the likelihood of a snow day based on various weather factors (for fun).",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Forecast Details",
          "text": "Input the predicted snowfall (inches), timing of heaviest snow, lowest temperature (°F), peak wind speed (mph), and your school district's general tendency to close.",
          "url": "https://financeloancalc.com/snow-day#form"
        },
        {
          "@type": "HowToStep",
          "name": "View Probability",
          "text": "The calculator automatically displays the estimated percentage chance of a snow day based on a simplified model.",
          "url": "https://financeloancalc.com/snow-day#results"
        }
      ],
       "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0" 
      },
      "supply": [
        { "@type": "HowToSupply", "name": "Predicted Snowfall (inches)" },
        { "@type": "HowToSupply", "name": "Timing of Snow" },
        { "@type": "HowToSupply", "name": "Lowest Temperature (°F)" },
        { "@type": "HowToSupply", "name": "Peak Wind Speed (mph)" },
        { "@type": "HowToSupply", "name": "School District's Tendency" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "FinCalc Snow Day Calculator" }],
      "totalTime": "PT1M"
    }
  });
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <SnowDayCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SnowDayCalculatorPage; 