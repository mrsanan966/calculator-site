import React from "react";
import LandLoanCalculator from "@/components/calculators/land/LandLoanCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const LandLoanCalculatorPage = () => {
  const faqs = [
    {
      question: "How are land loan payments calculated?",
      answer: "Land loan payments are calculated based on the loan amount, interest rate, and loan term. The calculator uses the standard amortization formula to determine monthly payments."
    },
    {
      question: "What are typical land loan terms?",
      answer: "Land loan terms typically range from 5 to 20 years, with shorter terms for raw land and longer terms for improved land. Interest rates are usually higher than traditional mortgages."
    },
    {
      question: "What's the difference between raw and improved land?",
      answer: "Raw land is undeveloped property without utilities or infrastructure. Improved land has basic infrastructure like roads, utilities, and possibly grading. Improved land typically qualifies for better loan terms."
    },
    {
      question: "What down payment is required for land loans?",
      answer: "Land loans typically require larger down payments than traditional mortgages, often 20-50% of the purchase price. The exact amount depends on the land type and your credit profile."
    },
    {
      question: "Can I build on the land while paying the loan?",
      answer: "Yes, but you'll need to coordinate with your lender. Some lenders offer construction-to-permanent loans that convert to a traditional mortgage once building is complete."
    },
    {
      question: "What factors affect land loan approval?",
      answer: "Key factors include your credit score, down payment amount, land type and location, intended use, and your overall financial situation. Lenders also consider the land's marketability."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Land Details",
      text: "Input the land purchase price, down payment, and land type.",
      url: "#land-form"
    },
    {
      name: "Set Loan Terms",
      text: "Specify the loan term and interest rate for your land purchase.",
      url: "#loan-form"
    },
    {
      name: "Review Payment Schedule",
      text: "See your estimated monthly payments and total interest.",
      url: "#results"
    },
    {
      name: "Compare Scenarios",
      text: "Try different down payments and terms to find the best option.",
      url: "#scenarios"
    }
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage payments",
      url: "/mortgage"
    },
  ];

  const advancedFeatures = [
    {
      title: "Amortization Schedule",
      description: "View detailed payment breakdown over the loan term",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different loan terms and down payments",
      icon: FaLightbulb
    },
    {
      title: "Total Cost Analysis",
      description: "See the complete cost of your land purchase",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Research zoning and land use restrictions",
    "Consider access to utilities and infrastructure",
    "Get a professional land survey",
    "Check for environmental concerns",
    "Understand all associated costs"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Land Loan Calculator",
    "description": "Calculate your land loan payments, total interest, and amortization schedule. Plan your land purchase with our comprehensive calculator.",
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
    
    
    title: "Land Loan Calculator 2024 - Estimate Your Land Loan Payments",
    canonical: "/land-loan",
    path: "/land-loan",
    description: "Free online land loan calculator. Calculate your land loan payments, total interest, and amortization schedule. Plan your land purchase with our comprehensive calculator.",
    keywords: "land loan calculator, land purchase calculator, land payment calculator, land mortgage calculator, raw land loan calculator, improved land loan calculator, land financing calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/land-loan-calculator",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Land Loan Calculator</h1>
        <p className="text-lg text-gray-600">Calculate your land loan payments, total interest, and amortization schedule. Essential for land buyers and investors.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Land Loan Calculator
            </h2>
      <LandLoanCalculator />
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
              Understanding Land Loans
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">How Land Loans Work</h3>
              <p>Land loans are specialized financing options for purchasing undeveloped or improved land. They typically have higher interest rates and shorter terms than traditional mortgages.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Payment Formula</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)</p>
                <p className="text-sm text-gray-600 mt-2">Where: P = Loan amount, r = Monthly interest rate, n = Number of payments</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Land Type:</strong> Raw vs. improved land</li>
                <li><strong>Down Payment:</strong> Typically 20-50% of purchase price</li>
                <li><strong>Loan Term:</strong> Usually 5-20 years</li>
                <li><strong>Interest Rate:</strong> Higher than traditional mortgages</li>
                <li><strong>Intended Use:</strong> Residential, commercial, or investment</li>
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
              Land Buying Tips
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

export default LandLoanCalculatorPage;
  