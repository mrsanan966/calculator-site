import React from "react";
import RefinanceCalculator from "@/components/calculators/refinance/RefinanceCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const RefinanceCalculatorPage = () => {
  const faqs = [
    {
      question: "How is my refinance savings calculated?",
      answer: "Your refinance savings are calculated by comparing your current loan payments with the new loan payments. The difference in monthly payments, total interest, and break-even point are key factors."
    },
    {
      question: "What is a break-even point?",
      answer: "The break-even point is the time it takes for your refinance savings to cover the closing costs. It helps you determine if refinancing is worth it."
    },
    {
      question: "Can I refinance with bad credit?",
      answer: "Refinancing with bad credit is possible, but you may face higher interest rates. Improving your credit score before refinancing can help secure better terms."
    },
    {
      question: "What are closing costs?",
      answer: "Closing costs are fees associated with refinancing, including appraisal fees, title insurance, and loan origination fees. They can vary by lender and loan type."
    },
    {
      question: "How does loan term affect my refinance?",
      answer: "A shorter loan term typically means higher monthly payments but less total interest. A longer term means lower payments but more interest overall."
    },
    {
      question: "What is an amortization schedule?",
      answer: "An amortization schedule shows how each payment is split between principal and interest over the life of the loan."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Current Loan Details",
      text: "Input your current loan balance, interest rate, and remaining term.",
      url: "#current-loan-form"
    },
    {
      name: "Enter New Loan Details",
      text: "Input the proposed new interest rate, loan term, and closing costs.",
      url: "#new-loan-form"
    },
    {
      name: "Review Refinance Analysis",
      text: "See your estimated monthly savings, break-even point, and total savings.",
      url: "#results"
    },
    {
      name: "Compare Scenarios",
      text: "Try different loan terms and rates to find the best option.",
      url: "#scenarios"
    }
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage payments",
      url: "/mortgage"
    },
    {
      name: "Loan Comparison Calculator",
      description: "Compare different loan options",
      url: "/loan-comparison"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    }
  ];

  const advancedFeatures = [
    {
      title: "Break-Even Analysis",
      description: "Calculate when your refinance savings cover closing costs",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different loan terms and rates",
      icon: FaLightbulb
    },
    {
      title: "Total Savings Analysis",
      description: "See the complete savings from refinancing",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Check your credit score before refinancing",
    "Compare offers from multiple lenders",
    "Understand all closing costs",
    "Consider total savings, not just monthly payments",
    "Calculate your break-even point"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Refinance Calculator",
    "description": "Analyze potential savings from refinancing your mortgage or loan. Calculate new monthly payments, lifetime savings, and your break-even point.",
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
    
    
    title: "Refinance Calculator 2024 - Savings & Break-Even Point",
    canonical: "/refinance",
    path: "/refinance",
    description: "Free online refinance calculator. Analyze potential savings from refinancing your mortgage or loan. Calculate new monthly payments, lifetime savings, and your break-even point.",
    keywords: "refinance calculator, mortgage refinance calculator, loan refinance calculator, refinance savings calculator, refinance break-even calculator, refinance comparison calculator, refinance payoff calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/refinance-calculator",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Refinance Calculator</h1>
            <p className="text-lg text-gray-600">Analyze potential savings from refinancing your mortgage or loan. Essential for borrowers planning their finances.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Refinance Calculator
                </h2>
                <RefinanceCalculator />
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
                  Understanding Refinancing
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Refinancing Works</h3>
                  <p>Refinancing involves replacing your current loan with a new one, typically to secure a lower interest rate, reduce monthly payments, or change the loan term.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Break-Even Point Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Break-Even Point = Closing Costs / Monthly Savings</p>
                    <p className="text-sm text-gray-600 mt-2">Where: Closing Costs = Total fees paid to refinance, Monthly Savings = Difference in monthly payments</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Current Loan Balance:</strong> The amount you still owe</li>
                    <li><strong>New Interest Rate:</strong> The proposed rate for the new loan</li>
                    <li><strong>Loan Term:</strong> The length of time to repay the new loan</li>
                    <li><strong>Closing Costs:</strong> Fees associated with refinancing</li>
                    <li><strong>Total Savings:</strong> Consider all costs and benefits</li>
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
                  Smart Refinancing Tips
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

export default RefinanceCalculatorPage;
  