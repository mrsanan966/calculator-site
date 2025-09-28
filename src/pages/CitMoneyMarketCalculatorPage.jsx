import React from "react";
import CitMoneyMarketCalculator from "@/components/calculators/citmoneymarket/CitMoneyMarketCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const CitMoneyMarketCalculatorPage = () => {
  const faqs = [
    {
      question: "What is CIT Bank Money Market Account?",
      answer: "A CIT Bank Money Market Account is a type of interest-bearing account that typically offers higher interest rates than traditional savings accounts, with the flexibility of check-writing privileges and ATM access."
    },
    {
      question: "What are the current interest rates?",
      answer: "CIT Bank Money Market accounts offer competitive APY rates that are typically higher than traditional savings accounts. Rates are variable and may change based on market conditions."
    },
    {
      question: "Are there any minimum balance requirements?",
      answer: "Yes, CIT Bank Money Market accounts typically require a minimum opening deposit and may have minimum balance requirements to earn the highest APY. Check current terms for specific requirements."
    },
    {
      question: "How often is interest compounded?",
      answer: "Interest on CIT Bank Money Market accounts is typically compounded daily and credited monthly, helping your savings grow faster than accounts with less frequent compounding."
    },
    {
      question: "Are there any fees?",
      answer: "CIT Bank Money Market accounts may have monthly maintenance fees if minimum balance requirements are not met, and may have fees for excessive withdrawals or other specific transactions. Check the current fee schedule for details."
    }
  ];

  const tips = [
    "Compare rates with other money market accounts",
    "Consider automatic transfers for regular savings",
    "Monitor rate changes regularly",
    "Keep emergency funds accessible",
    "Understand withdrawal limitations",
    "Review account terms annually",
    "Consider CD options for longer terms",
    "Maximize compound interest benefits"
  ];

  const advancedFeatures = [
    {
      title: "Rate Comparison",
      description: "Compare with other savings options",
      icon: FaChartBar
    },
    {
      title: "Growth Projection",
      description: "Project savings growth over time",
      icon: FaChartLine
    },
    {
      title: "Scenario Planning",
      description: "Model different savings strategies",
      icon: FaLightbulb
    },
    {
      title: "Export Reports",
      description: "Generate detailed savings reports",
      icon: FaBook
    }
  ];

  const relatedCalculators = [
    {
      name: "Savings Calculator",
      description: "Calculate general savings growth and returns",
      url: "/savings"
    },
    {
      name: "Investment Growth Calculator",
      description: "Calculate investment returns and growth",
      url: "/investment-growth"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    },
    {
      name: "Cost of Living Calculator",
      description: "Calculate living expenses",
      url: "/cost-of-living"
    }
  ];

  useSeo({
    
    
    title: "CIT Bank Money Market Calculator - Calculate Your Returns",
    canonical: "/cit-money-market",
    path: "/cit-money-market",
    description: "Calculate potential returns on your CIT Bank Money Market account. Compare rates and plan your savings strategy.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "CIT Bank Money Market Calculator",
      "description": "Calculate returns on CIT Bank Money Market accounts.",
      "url": "https://financeloancalc.com/cit-money-market"
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">CIT Bank Money Market Calculator</h1>
            <p className="text-lg text-gray-600">Calculate potential returns on your CIT Bank Money Market account. Compare rates and plan your savings strategy.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  CIT Bank Money Market Calculator
                </h2>
                <CitMoneyMarketCalculator />
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
                  Understanding CIT Bank Money Market
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">Account Features</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>High APY:</strong> Competitive interest rates</li>
                    <li><strong>Check Writing:</strong> Limited check-writing privileges</li>
                    <li><strong>Daily Compounding:</strong> Interest compounds daily</li>
                    <li><strong>FDIC Insurance:</strong> Up to $250,000 per depositor</li>
                    <li><strong>Online Access:</strong> 24/7 account management</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Interest Calculation</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">A = P(1 + r/n)^(nt)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: A = Final amount, P = Principal, r = Annual interest rate, n = Number of times interest is compounded per year, t = Time in years</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Account Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Minimum opening deposit</li>
                    <li>Minimum balance for highest APY</li>
                    <li>Monthly withdrawal limits</li>
                    <li>Online account access</li>
                    <li>Valid identification</li>
                  </ul>
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
                  Savings Tips
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

export default CitMoneyMarketCalculatorPage; 