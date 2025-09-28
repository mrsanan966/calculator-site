import React from "react";
import DebtPayoffCalculator from "@/components/calculators/debt-payoff/DebtPayoffCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const DebtPayoffCalculatorPage = () => {
  const faqs = [
    {
      question: "What is the debt snowball method?",
      answer: "The debt snowball method involves paying off debts from smallest to largest balance, regardless of interest rate. This approach provides quick wins and motivation as you eliminate smaller debts first."
    },
    {
      question: "What is the debt avalanche method?",
      answer: "The debt avalanche method focuses on paying off debts with the highest interest rates first, regardless of balance. This approach minimizes total interest paid but may take longer to see progress."
    },
    {
      question: "How do I calculate my debt-to-income ratio?",
      answer: "Divide your total monthly debt payments by your gross monthly income and multiply by 100. A ratio below 36% is generally considered healthy, while above 43% may indicate financial stress."
    },
    {
      question: "Should I pay off debt or save first?",
      answer: "It's recommended to build a small emergency fund first (1-2 months of expenses), then focus on high-interest debt. After that, you can balance debt payoff with saving for other goals."
    },
    {
      question: "How can I accelerate my debt payoff?",
      answer: "Consider increasing your monthly payments, using windfalls (tax refunds, bonuses), reducing expenses, increasing income through side jobs, or consolidating high-interest debt."
    },
    {
      question: "What's the impact of making extra payments?",
      answer: "Extra payments reduce principal faster, decreasing total interest paid and shortening the payoff timeline. Even small additional payments can significantly impact your debt payoff schedule."
    }
  ];

  const howToSteps = [
    {
      name: "List Debts",
      text: "Enter all your debts with balances and interest rates.",
      url: "#debts-form"
    },
    {
      name: "Set Budget",
      text: "Determine your monthly debt payment budget.",
      url: "#budget-form"
    },
    {
      name: "Choose Strategy",
      text: "Select snowball or avalanche method.",
      url: "#strategy-form"
    },
    {
      name: "Review Plan",
      text: "See your payoff timeline and total interest.",
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
      title: "Payment Strategies",
      description: "Compare snowball vs avalanche methods",
      icon: FaChartBar
    },
    {
      title: "Extra Payments",
      description: "See impact of additional payments",
      icon: FaLightbulb
    },
    {
      title: "Debt Consolidation",
      description: "Analyze consolidation options",
      icon: FaDollarSign
    },
    {
      title: "Export Plan",
      description: "Save and share your payoff plan",
      icon: FaBook
    }
  ];

  const tips = [
    "Start with high-interest debt",
    "Consider debt consolidation",
    "Automate your payments",
    "Track your progress",
    "Celebrate milestones"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Debt Payoff Calculator",
    "description": "Create a personalized debt payoff plan. Compare strategies, calculate timelines, and track your progress to becoming debt-free.",
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
    
    title: "Debt Payoff Calculator 2024 - Create Your Debt-Free Plan",
    path: "/debt-payoff",
    description: "Free online debt payoff calculator. Create a personalized debt payoff plan, compare strategies, and track your progress to becoming debt-free.",
    keywords: "debt payoff calculator, debt snowball calculator, debt avalanche calculator, debt free calculator, debt reduction calculator, debt management calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/debt-payoff",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Debt Payoff Calculator</h1>
        <p className="text-lg text-gray-600">Create a personalized debt payoff plan. Compare strategies, calculate timelines, and track your progress to becoming debt-free.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Debt Payoff Calculator
            </h2>
            <DebtPayoffCalculator />
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
              Understanding Debt Payoff
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Payoff Strategies</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Monthly Payment = Minimum Payment + Extra Payment</p>
                <p className="text-sm text-gray-600 mt-2">Where: Extra Payment is applied to the target debt</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Debt Balance:</strong> Current amount owed</li>
                <li><strong>Interest Rate:</strong> Annual percentage rate</li>
                <li><strong>Minimum Payment:</strong> Required monthly payment</li>
                <li><strong>Extra Payment:</strong> Additional amount to pay</li>
                <li><strong>Payoff Timeline:</strong> Estimated completion date</li>
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
              Debt Payoff Tips
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

export default DebtPayoffCalculatorPage; 