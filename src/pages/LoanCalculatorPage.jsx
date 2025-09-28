import React from "react";
import LoanCalculator from "@/components/calculators/loan/LoanCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const LoanCalculatorPage = () => {
  const faqs = [
    {
      question: "How is my monthly loan payment calculated?",
      answer: "Your monthly payment is calculated using the loan amount, interest rate, and loan term. The formula uses amortization to determine how much goes to principal and interest each month."
    },
    {
      question: "What types of loans can I use this calculator for?",
      answer: "You can use this calculator for personal loans, auto loans, student loans, and any other installment loan with fixed payments."
    },
    {
      question: "What is the difference between principal and interest?",
      answer: "Principal is the original amount you borrow. Interest is the cost you pay to borrow that money, calculated as a percentage of the principal."
    },
    {
      question: "Can I make extra payments?",
      answer: "Making extra payments can reduce your total interest paid and shorten your loan term. Check with your lender for any prepayment penalties."
    },
    {
      question: "What is an amortization schedule?",
      answer: "An amortization schedule shows how each payment is split between principal and interest over the life of the loan."
    },
    {
      question: "How does loan term affect my payments?",
      answer: "Longer terms mean lower monthly payments but more total interest. Shorter terms mean higher payments but less interest overall."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Loan Details",
      text: "Input the loan amount, interest rate, and loan term.",
      url: "#calculator-form"
    },
    {
      name: "Review Results",
      text: "See your estimated monthly payment, total interest, and total cost.",
      url: "#results"
    },
    {
      name: "Analyze Amortization",
      text: "View the detailed breakdown of principal and interest payments.",
      url: "#amortization"
    },
    {
      name: "Compare Scenarios",
      text: "Try different loan amounts, rates, and terms to find the best option.",
      url: "#scenarios"
    }
  ];

  const relatedCalculators = [
    {
      name: "Loan Comparison Calculator",
      description: "Compare different loan options",
      url: "/loan-comparison"
    },
    {
      name: "Debt Consolidation Calculator",
      description: "Calculate consolidation options",
      url: "/debt-consolidation"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    },
    {
      name: "Personal Loan Calculator",
      description: "Calculate personal loan options",
      url: "/personal-loan"
    }
  ];

  const advancedFeatures = [
    {
      title: "Amortization Schedule",
      description: "View detailed breakdown of each payment",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different loan amounts, rates, and terms",
      icon: FaLightbulb
    },
    {
      title: "Total Cost Analysis",
      description: "See the complete cost of borrowing",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Check your credit score before applying",
    "Compare offers from multiple lenders",
    "Understand all fees and charges",
    "Consider total cost, not just monthly payment",
    "Make extra payments to save on interest"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Loan Calculator",
    "description": "Calculate monthly payments, total interest, and view amortization for various loans. Plan your borrowing with our versatile loan calculator.",
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
    title: "Loan Calculator 2024 - Monthly Payments & Total Interest",
    description: "Free online loan calculator. Calculate monthly payments, total interest, and view amortization for various loans. Plan your borrowing with our versatile loan calculator.",
    keywords: "loan calculator, personal loan calculator, auto loan calculator, loan payment calculator, loan amortization calculator, loan interest calculator, loan comparison calculator, loan payoff calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/loan-calculator",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loan Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your monthly loan payments, total interest, and amortization schedule for any type of loan.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Loan Calculator
                </h2>
                <LoanCalculator />
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
                  Understanding Loans
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Loans Work</h3>
                  <p>Loans are financial agreements where a lender provides money to a borrower, who agrees to repay the amount plus interest over a specified period.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Loan Payment Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: P = Principal amount, r = Monthly interest rate, n = Number of payments</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Loan Amount:</strong> The total amount borrowed</li>
                    <li><strong>Interest Rate:</strong> Annual percentage rate (APR)</li>
                    <li><strong>Loan Term:</strong> Duration of the loan in months or years</li>
                    <li><strong>Payment Frequency:</strong> Monthly, bi-weekly, or weekly</li>
                    <li><strong>Additional Fees:</strong> Origination fees, closing costs, etc.</li>
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
                  Loan Tips
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

export default LoanCalculatorPage;
  