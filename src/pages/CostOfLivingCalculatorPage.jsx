import React from "react";
import CostOfLivingCalculator from "@/components/calculators/cost-of-living/CostOfLivingCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const CostOfLivingCalculatorPage = () => {
  const faqs = [
    {
      question: "What is the cost of living index?",
      answer: "The cost of living index compares the cost of maintaining a certain standard of living in different locations. It considers housing, food, transportation, healthcare, and other essential expenses."
    },
    {
      question: "How is the cost of living calculated?",
      answer: "Cost of living is calculated by comparing prices of goods and services across locations, weighted by typical household spending patterns. This includes housing, utilities, groceries, transportation, healthcare, and other expenses."
    },
    {
      question: "What factors affect the cost of living?",
      answer: "Key factors include housing costs, local taxes, transportation expenses, food prices, healthcare costs, and the availability and cost of goods and services. Location, population density, and local economy also play significant roles."
    },
    {
      question: "How do I adjust my salary for cost of living?",
      answer: "Multiply your current salary by the cost of living index of your target location divided by your current location's index. This gives you the equivalent salary needed to maintain your standard of living."
    },
    {
      question: "What's the difference between cost of living and inflation?",
      answer: "Cost of living compares expenses between different locations at the same time, while inflation measures the increase in prices over time in a single location. Both affect purchasing power but in different ways."
    },
    {
      question: "How often do cost of living indices update?",
      answer: "Most cost of living indices update quarterly or annually. However, major economic changes or significant local developments may trigger more frequent updates to reflect current conditions."
    }
  ];

  const howToSteps = [
    {
      name: "Select Locations",
      text: "Choose your current and target locations.",
      url: "#locations-form"
    },
    {
      name: "Enter Income",
      text: "Input your current salary or income.",
      url: "#income-form"
    },
    {
      name: "Add Details",
      text: "Include family size and lifestyle preferences.",
      url: "#details-form"
    },
    {
      name: "Review Results",
      text: "See cost comparisons and salary adjustments.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Salary Calculator",
      description: "Calculate your take-home pay",
      url: "/salary"
    },
    {
      name: "Debt Payoff Calculator",
      description: "Plan your debt repayment",
      url: "/debt-payoff"
    },
    {
      name: "Savings Calculator",
      description: "Plan your savings goals",
      url: "/savings"
    },
    {
      name: "Cost of Living Calculator",
      description: "Compare living costs by location",
      url: "/cost-of-living"
    }
  ];

  const advancedFeatures = [
    {
      title: "Detailed Breakdown",
      description: "See cost comparisons by category",
      icon: FaChartBar
    },
    {
      title: "Multiple Locations",
      description: "Compare costs across several cities",
      icon: FaLightbulb
    },
    {
      title: "Lifestyle Analysis",
      description: "Adjust for different living standards",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your comparisons",
      icon: FaBook
    }
  ];

  const tips = [
    "Research local housing markets",
    "Consider transportation costs",
    "Factor in healthcare differences",
    "Check local tax rates",
    "Visit before moving"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Cost of Living Calculator",
    "description": "Compare the cost of living between different locations. Calculate salary adjustments and plan your relocation budget effectively.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Finance Loan Calc",
      "url": "https://financeloancalc.com"
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  };

  // Set up SEO
  useSeo({
    
    title: "Cost of Living Calculator 2024 - Compare Living Costs by Location",
    path: "/cost-of-living",
    description: "Free online cost of living calculator. Compare living expenses between cities, calculate salary adjustments, and plan your relocation budget effectively.",
    keywords: "cost of living calculator, living cost comparison, salary calculator, relocation calculator, city comparison, cost of living index, living expenses calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/cost-of-living",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Cost of Living Calculator</h1>
        <p className="text-lg text-gray-600">Compare the cost of living between different locations. Calculate salary adjustments and plan your relocation budget effectively.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Cost of Living Calculator
            </h2>
            <CostOfLivingCalculator />
          </div>
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaLightbulb className="mr-2 text-blue-600" />
              Advanced Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <feature.icon className="text-blue-600 text-2xl mb-3" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8" id="analysis">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaChartLine className="mr-2 text-blue-600" />
              Understanding Cost of Living
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Cost Categories</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Total Cost of Living = Housing + Food + Transportation + Healthcare + Utilities + Other Expenses</p>
                <p className="text-sm text-gray-600 mt-2">Where: Each category is weighted based on typical household spending</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Housing:</strong> Rent, mortgage, property taxes</li>
                <li><strong>Food:</strong> Groceries, dining out</li>
                <li><strong>Transportation:</strong> Public transit, car costs</li>
                <li><strong>Healthcare:</strong> Insurance, medical services</li>
                <li><strong>Utilities:</strong> Electricity, water, internet</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">How to Use This Calculator</h3>
              <ol className="list-decimal pl-5 space-y-2">
                {howToSteps.map((step, index) => (
                  <li key={index}>
                    <strong>{step.name}:</strong> {step.text}
                  </li>
                ))}
              </ol>
            </div>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaQuestionCircle className="mr-2 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaMoneyCheckAlt className="mr-2 text-blue-600" />
              Relocation Tips
            </h3>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaLink className="mr-2 text-blue-600" />
              Related Calculators
            </h3>
            <div className="space-y-4">
              {relatedCalculators.map((calculator, index) => (
                <a
                  key={index}
                  href={calculator.url}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h4 className="font-semibold text-blue-600">{calculator.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{calculator.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CostOfLivingCalculatorPage; 