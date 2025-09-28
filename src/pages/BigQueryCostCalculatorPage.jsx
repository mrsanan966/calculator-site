import React from "react";
import BigQueryCostCalculator from "@/components/calculators/bigquery/BigQueryCostCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const BigQueryCostCalculatorPage = () => {
  useSeo({
    
    title: "BigQuery Cost Calculator - Estimate Google BigQuery Costs",
    canonical: "/bigquery-cost",
    description: "Calculate estimated costs for Google BigQuery usage including storage, queries, and data processing.",
    path: "/bigquery-cost",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "BigQuery Cost Calculator",
      "description": "Calculate Google BigQuery costs and optimize your data warehouse spending.",
      "url": "https://financeloancalc.com/bigquery-cost"
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <BigQueryCostCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BigQueryCostCalculatorPage; 