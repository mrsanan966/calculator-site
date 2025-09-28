import React from "react";
import SavingsCalculator from "@/components/calculators/savings/SavingsCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const SavingsCalculatorPage = () => {
  const faqs = [
    {
      question: "How much should I save each month?",
      answer: "Financial experts recommend saving 20% of your income, but start with what you can. The 50/30/20 rule suggests 50% for needs, 30% for wants, and 20% for savings and debt repayment."
    },
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on both the principal and accumulated interest. Compound interest grows your savings faster over time."
    },
    {
      question: "How do I choose the right savings account?",
      answer: "Consider interest rates, fees, minimum balance requirements, and accessibility. High-yield savings accounts typically offer better rates than traditional savings accounts."
    },
    {
      question: "What's the best way to save for retirement?",
      answer: "Start early, contribute regularly to tax-advantaged accounts like 401(k)s and IRAs, take advantage of employer matches, and diversify your investments based on your risk tolerance and timeline."
    },
    {
      question: "How can I save more money?",
      answer: "Create a budget, automate savings, reduce expenses, increase income through side jobs, and set specific savings goals. Small changes can add up to significant savings over time."
    },
    {
      question: "What's the impact of inflation on savings?",
      answer: "Inflation reduces the purchasing power of your savings over time. To combat this, consider investments that outpace inflation, such as stocks or inflation-protected securities."
    }
  ];

  const howToSteps = [
    {
      name: "Set Goals",
      text: "Define your savings target and timeline.",
      url: "#goals-form"
    },
    {
      name: "Enter Details",
      text: "Input current savings and monthly contributions.",
      url: "#details-form"
    },
    {
      name: "Adjust Parameters",
      text: "Set interest rate and compounding frequency.",
      url: "#parameters-form"
    },
    {
      name: "Review Results",
      text: "See your savings growth projection.",
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
      title: "Goal Tracking",
      description: "Set and monitor savings goals",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different savings strategies",
      icon: FaLightbulb
    },
    {
      title: "Inflation Adjustment",
      description: "Account for purchasing power",
      icon: FaDollarSign
    },
    {
      title: "Export Plan",
      description: "Save and share your savings plan",
      icon: FaBook
    }
  ];

  const tips = [
    "Start saving early",
    "Automate your savings",
    "Take advantage of tax benefits",
    "Diversify your savings",
    "Review and adjust regularly"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Savings Calculator",
    "description": "Plan your savings goals and track your progress. Calculate compound interest, set targets, and create a personalized savings strategy.",
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
    
    title: "Savings Calculator 2024 - Plan Your Financial Goals",
    path: "/savings",
    description: "Free online savings calculator. Plan your savings goals, calculate compound interest, and create a personalized savings strategy for your financial future.",
    keywords: "savings calculator, compound interest calculator, savings goal calculator, financial planning calculator, retirement savings calculator, investment calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/savings",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Savings Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your potential savings growth over time with compound interest and regular contributions.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Savings Calculator
                </h2>
                <SavingsCalculator />
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
                  Understanding Savings Growth
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Savings Grow</h3>
                  <p>Savings grow through compound interest, where you earn interest on both your initial deposit and accumulated interest over time.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Compound Interest Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">A = P × (1 + r/n)^(n×t)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: A = Final amount, P = Principal, r = Annual interest rate, n = Compounding frequency, t = Time in years</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Initial Deposit:</strong> Starting amount</li>
                    <li><strong>Regular Contributions:</strong> Monthly or annual deposits</li>
                    <li><strong>Interest Rate:</strong> Annual percentage yield (APY)</li>
                    <li><strong>Compounding Frequency:</strong> How often interest is added</li>
                    <li><strong>Time Horizon:</strong> Length of investment period</li>
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

export default SavingsCalculatorPage; 