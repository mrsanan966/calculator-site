import React from "react";
import ZillowMortgageCalculator from "@/components/calculators/zillow/ZillowMortgageCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const ZillowMortgageCalculatorPage = () => {
  const faqs = [
    {
      question: "What is a mortgage calculator?",
      answer: "A mortgage calculator is a tool that helps you estimate your monthly mortgage payments based on the loan amount, interest rate, and loan term. It can also show you the total cost of the loan and help you plan your budget."
    },
    {
      question: "How do I calculate my mortgage payment?",
      answer: "Your mortgage payment is calculated using the loan amount, interest rate, and loan term. The formula is: P = L[c(1 + c)^n]/[(1 + c)^n - 1], where P is the payment, L is the loan amount, c is the monthly interest rate, and n is the number of payments."
    },
    {
      question: "What's included in a mortgage payment?",
      answer: "A mortgage payment typically includes principal, interest, property taxes, and insurance (PITI). Some payments may also include private mortgage insurance (PMI) if your down payment is less than 20%."
    },
    {
      question: "How does down payment affect my mortgage?",
      answer: "A larger down payment reduces your loan amount, which can lower your monthly payments and total interest paid. It may also help you avoid private mortgage insurance (PMI) if it's 20% or more of the home's value."
    },
    {
      question: "What is PMI?",
      answer: "PMI (Private Mortgage Insurance) is insurance that protects the lender if you default on your loan. It's typically required when your down payment is less than 20% of the home's value and adds to your monthly payment."
    },
    {
      question: "How can I lower my mortgage payment?",
      answer: "You can lower your mortgage payment by making a larger down payment, getting a lower interest rate, choosing a longer loan term, or refinancing your existing mortgage. You can also look for homes in a lower price range."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Home Price",
      text: "Input the purchase price of the home.",
      url: "#price-form"
    },
    {
      name: "Set Down Payment",
      text: "Specify your down payment amount or percentage.",
      url: "#down-payment-form"
    },
    {
      name: "Choose Loan Details",
      text: "Select loan term and interest rate.",
      url: "#loan-form"
    },
    {
      name: "Add Additional Costs",
      text: "Include property taxes, insurance, and PMI if applicable.",
      url: "#additional-costs-form"
    }
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate monthly mortgage payments",
      url: "/mortgage"
    },
    {
      name: "Refinance Calculator",
      description: "Compare refinancing options",
      url: "/refinance"
    },
    {
      name: "Zillow Home Value Calculator",
      description: "Estimate your home's value",
      url: "/zillow-home-value-calculator"
    },
    {
      name: "Zillow Rent Calculator",
      description: "Calculate affordable rent",
      url: "/zillow-rent-calculator"
    }
  ];

  const advancedFeatures = [
    {
      title: "Payment Breakdown",
      description: "See detailed payment components",
      icon: FaChartBar
    },
    {
      title: "Amortization Schedule",
      description: "View payment schedule over time",
      icon: FaChartLine
    },
    {
      title: "Extra Payment Analysis",
      description: "Calculate impact of additional payments",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Compare rates from multiple lenders",
    "Consider all closing costs",
    "Factor in property taxes and insurance",
    "Understand PMI requirements",
    "Check your credit score",
    "Get pre-approved before house hunting",
    "Consider your long-term financial goals",
    "Have a cash reserve for emergencies"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zillow Mortgage Calculator",
    "description": "Calculate your mortgage payments. Estimate monthly payments, total interest, and amortization schedule with our comprehensive mortgage calculator.",
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
    
    title: "Zillow Mortgage Calculator 2024 - Calculate Mortgage Payments",
    path: "/zillow-mortgage-calculator",
    description: "Free online mortgage calculator. Calculate monthly payments, total interest, and amortization schedule with our comprehensive mortgage calculator.",
    keywords: "mortgage calculator, home loan calculator, mortgage payment calculator, loan calculator, home affordability calculator, mortgage rate calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/zillow-mortgage-calculator",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Zillow Mortgage Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your mortgage payments. Estimate monthly payments, total interest, and amortization schedule with our comprehensive mortgage calculator.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Mortgage Calculator
                </h2>
                <ZillowMortgageCalculator />
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
                  Understanding Mortgage Payments
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">Mortgage Payment Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">P = L[c(1 + c)^n]/[(1 + c)^n - 1]</p>
                    <p className="text-sm text-gray-600 mt-2">Where: P = Payment, L = Loan Amount, c = Monthly Interest Rate, n = Number of Payments</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Payment Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Principal:</strong> The amount borrowed</li>
                    <li><strong>Interest:</strong> Cost of borrowing the money</li>
                    <li><strong>Property Taxes:</strong> Annual taxes on the property</li>
                    <li><strong>Insurance:</strong> Homeowner's insurance premium</li>
                    <li><strong>PMI:</strong> Private Mortgage Insurance (if applicable)</li>
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
                  Mortgage Tips
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ZillowMortgageCalculatorPage; 