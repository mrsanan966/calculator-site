import React from "react";
import BudgetCalculator from "@/components/calculators/budget/BudgetCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const BudgetCalculatorPage = () => {
  const faqs = [
    {
      question: "What is the 50/30/20 budget rule?",
      answer: "The 50/30/20 rule suggests allocating 50% of your income to needs (housing, utilities, food), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment."
    },
    {
      question: "How much should I save each month?",
      answer: "Financial experts recommend saving at least 20% of your income. This includes emergency funds, retirement savings, and other financial goals. Start with what you can and gradually increase your savings rate."
    },
    {
      question: "What's the difference between fixed and variable expenses?",
      answer: "Fixed expenses remain constant each month (rent, mortgage, insurance), while variable expenses fluctuate (groceries, utilities, entertainment). Understanding this helps in better budget planning."
    },
    {
      question: "How do I handle unexpected expenses?",
      answer: "Build an emergency fund covering 3-6 months of expenses. Include a buffer in your monthly budget for unexpected costs. Consider insurance for major potential expenses."
    },
    {
      question: "What's the best way to track my budget?",
      answer: "Use a combination of budgeting apps, spreadsheets, or the envelope system. Choose a method that's easy to maintain and review your budget regularly to stay on track."
    },
    {
      question: "How can I reduce my monthly expenses?",
      answer: "Review subscriptions, negotiate bills, cook at home, use public transportation, and look for discounts. Small changes can add up to significant savings over time."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Income",
      text: "Input your monthly income from all sources.",
      url: "#income-form"
    },
    {
      name: "List Expenses",
      text: "Add all your monthly expenses and bills.",
      url: "#expenses-form"
    },
    {
      name: "Set Goals",
      text: "Define your savings and spending goals.",
      url: "#goals-form"
    },
    {
      name: "Review Budget",
      text: "Analyze your budget and make adjustments.",
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
      title: "Expense Categories",
      description: "Organize expenses into categories for better tracking",
      icon: FaChartBar
    },
    {
      title: "Budget Goals",
      description: "Set and track financial goals",
      icon: FaLightbulb
    },
    {
      title: "Trend Analysis",
      description: "View spending patterns over time",
      icon: FaDollarSign
    },
    {
      title: "Export Budget",
      description: "Save and share your budget plan",
      icon: FaBook
    }
  ];

  const tips = [
    "Track every expense for a month",
    "Use the 50/30/20 rule as a guide",
    "Build an emergency fund",
    "Review and adjust regularly",
    "Automate savings and bill payments"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Budget Calculator",
    "description": "Create and manage your monthly budget. Track expenses, set savings goals, and plan your finances effectively.",
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
    
    title: "Budget Calculator 2024 - Create Your Monthly Budget",
    path: "/budget",
    description: "Free online budget calculator. Create and manage your monthly budget. Track expenses, set savings goals, and plan your finances effectively.",
    keywords: "budget calculator, monthly budget calculator, expense tracker, budget planner, financial planning, money management, budget template",
    schemaMarkup: [schemaMarkup],
    canonical: "/budget",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Budget Calculator</h1>
        <p className="text-lg text-gray-600">Create and manage your monthly budget. Track expenses, set savings goals, and plan your finances effectively.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Budget Calculator
            </h2>
            <BudgetCalculator />
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
              Understanding Budgeting
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Budget Categories</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Monthly Budget = Income - (Fixed Expenses + Variable Expenses + Savings)</p>
                <p className="text-sm text-gray-600 mt-2">Where: Income = All sources of monthly income</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Fixed Expenses:</strong> Rent, mortgage, insurance</li>
                <li><strong>Variable Expenses:</strong> Utilities, groceries, entertainment</li>
                <li><strong>Savings:</strong> Emergency fund, retirement, goals</li>
                <li><strong>Debt Payments:</strong> Credit cards, loans, student debt</li>
                <li><strong>Discretionary:</strong> Non-essential spending</li>
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
              Budgeting Tips
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

export default BudgetCalculatorPage; 