import React from "react";
import AdpPaycheckCalculator from "@/components/calculators/adppaycheck/AdpPaycheckCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdpPaycheckCalculatorPage = () => {
  const faqs = [
    {
      question: "What is ADP and how does it affect my paycheck?",
      answer: "ADP (Automatic Data Processing) is a leading provider of human resources management software and services. It processes payroll for many companies, handling tax calculations, deductions, and direct deposits."
    },
    {
      question: "How are federal taxes calculated on my paycheck?",
      answer: "Federal taxes are calculated based on your income, filing status, and W-4 withholdings. The system uses tax brackets to determine your tax rate, and calculates Social Security (6.2%) and Medicare (1.45%) taxes separately."
    },
    {
      question: "What are pre-tax deductions?",
      answer: "Pre-tax deductions are benefits and contributions that are taken from your paycheck before taxes are calculated. Common examples include health insurance premiums, 401(k) contributions, and flexible spending accounts (FSA)."
    },
    {
      question: "How do I update my tax withholdings?",
      answer: "You can update your tax withholdings by submitting a new W-4 form to your employer. This form determines how much federal income tax is withheld from your paycheck. You can use the IRS Tax Withholding Estimator to help determine the right amount."
    },
    {
      question: "What's the difference between gross and net pay?",
      answer: "Gross pay is your total earnings before any deductions. Net pay (take-home pay) is what remains after all deductions, including taxes, benefits, and other withholdings."
    },
    {
      question: "How does ADP calculate overtime pay?",
      answer: "ADP calculates overtime pay at 1.5 times your regular hourly rate for hours worked beyond 40 in a workweek. The system automatically tracks overtime hours and applies the correct rate."
    },
    {
      question: "What is ADP Run and how does it affect my paycheck?",
      answer: "ADP Run is a comprehensive payroll and HR solution that handles payroll processing, tax calculations, and benefits administration. It ensures accurate paycheck calculations and compliance with tax laws."
    }
  ];

  const tips = [
    "Review your pay stubs regularly",
    "Update your W-4 when life changes occur",
    "Maximize pre-tax benefits when possible",
    "Keep track of year-to-date earnings",
    "Understand all deductions on your paycheck",
    "Plan for tax season",
    "Consider direct deposit for faster access",
    "Save your pay stubs for tax purposes",
    "Monitor your ADP portal regularly",
    "Verify your tax withholdings annually"
  ];

  const advancedFeatures = [
    {
      title: "Tax Breakdown",
      description: "Detailed breakdown of all deductions",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different withholding options",
      icon: FaChartLine
    },
    {
      title: "Year-to-Date Analysis",
      description: "Track earnings and deductions",
      icon: FaLightbulb
    },
    {
      title: "Export Results",
      description: "Generate detailed reports",
      icon: FaBook
    }
  ];

  const relatedCalculators = [
    {
      name: "Tax Calculator",
      description: "Calculate federal and state taxes",
      url: "/tax"
    },
    {
      name: "Salary Calculator",
      description: "Calculate annual salary and benefits",
      url: "/salary"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    },
    {
      name: "Retirement Calculator",
      description: "Plan for retirement savings",
      url: "/retirement"
    }
  ];

  // Enhanced schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ADP Paycheck Calculator",
    "description": "Calculate your take-home pay after federal taxes, state taxes, and other deductions using our ADP paycheck calculator.",
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
    },
    "keywords": "ADP paycheck calculator, ADP salary calculator, ADP take home pay calculator, ADP net pay calculator, ADP gross to net calculator, ADP payroll calculator, ADP tax calculator, ADP withholding calculator, ADP paycheck estimator, ADP salary estimator, ADP Run calculator, ADP payroll processing, ADP tax deductions, ADP benefits calculator, ADP direct deposit calculator, ADP year to date calculator, ADP overtime calculator, ADP bonus calculator, ADP commission calculator, ADP 401k calculator"
  };

  // Enhanced SEO setup
  useSeo({
    title: "ADP Paycheck Calculator 2025 - Calculate Take-Home Pay & Tax Withholdings",
    description: "Free ADP paycheck calculator to estimate your take-home pay after federal taxes, state taxes, and deductions. Calculate ADP salary, tax withholdings, and benefits. Perfect for ADP Run users.",
    keywords: "ADP paycheck calculator, ADP salary calculator, ADP take home pay calculator, ADP net pay calculator, ADP gross to net calculator, ADP payroll calculator, ADP tax calculator, ADP withholding calculator, ADP paycheck estimator, ADP salary estimator, ADP Run calculator, ADP payroll processing, ADP tax deductions, ADP benefits calculator, ADP direct deposit calculator, ADP year to date calculator, ADP overtime calculator, ADP bonus calculator, ADP commission calculator, ADP 401k calculator, ADP W-4 calculator, ADP tax withholding calculator, ADP payroll deductions calculator, ADP salary after tax calculator, ADP paycheck after tax calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/adp-paycheck-calculator",
    type: "tool",
    openGraph: {
      title: "ADP Paycheck Calculator 2025 - Calculate Take-Home Pay & Tax Withholdings",
      description: "Free ADP paycheck calculator to estimate your take-home pay after federal taxes, state taxes, and deductions. Calculate ADP salary, tax withholdings, and benefits.",
      type: "website",
      url: "https://financeloancalc.com/adp-paycheck-calculator"
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ADP Paycheck Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your take-home pay after federal taxes, state taxes, and other deductions using our ADP paycheck calculator. Perfect for ADP Run users and anyone wanting to estimate their net salary.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  ADP Paycheck Calculator
                </h2>
                <AdpPaycheckCalculator />
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
                  Understanding Your ADP Paycheck
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">Common Paycheck Deductions</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Federal Income Tax:</strong> Based on your income and W-4</li>
                    <li><strong>Social Security:</strong> 6.2% of gross pay</li>
                    <li><strong>Medicare:</strong> 1.45% of gross pay</li>
                    <li><strong>State Income Tax:</strong> Varies by state</li>
                    <li><strong>Local Taxes:</strong> Varies by location</li>
                    <li><strong>ADP Benefits:</strong> Health insurance, 401(k), etc.</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Pre-Tax Benefits</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <ul className="space-y-2">
                      <li>Health Insurance Premiums</li>
                      <li>401(k) Contributions</li>
                      <li>Flexible Spending Accounts (FSA)</li>
                      <li>Health Savings Accounts (HSA)</li>
                      <li>Dependent Care FSA</li>
                      <li>ADP Benefits Programs</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Paycheck Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Gross Pay: Total earnings before deductions</li>
                    <li>Pre-Tax Deductions: Benefits taken before taxes</li>
                    <li>Tax Withholdings: Federal, state, and local taxes</li>
                    <li>Post-Tax Deductions: Benefits taken after taxes</li>
                    <li>Net Pay: Final take-home amount</li>
                    <li>ADP Direct Deposit: Electronic payment options</li>
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
                  Paycheck Tips
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

export default AdpPaycheckCalculatorPage;
