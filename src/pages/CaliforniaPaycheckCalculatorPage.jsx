import React from "react";
import CaliforniaPaycheckCalculator from "@/components/calculators/californiapaycheck/CaliforniaPaycheckCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const CaliforniaPaycheckCalculatorPage = () => {
  const faqs = [
    {
      question: "What are California-specific payroll deductions?",
      answer: "California has several unique deductions including State Disability Insurance (SDI), Paid Family Leave (PFL), and California State Income Tax. These are in addition to federal deductions like Social Security and Medicare."
    },
    {
      question: "How is California state income tax calculated?",
      answer: "California uses a progressive tax system with nine tax brackets ranging from 1% to 13.3%. The tax rate increases as income increases, and it's calculated based on your taxable income after deductions."
    },
    {
      question: "What is SDI and how much is it?",
      answer: "State Disability Insurance (SDI) is a California-specific program that provides short-term disability and paid family leave benefits. The current SDI rate is 1.1% of wages, with a maximum taxable wage limit."
    },
    {
      question: "Are there any local taxes in California?",
      answer: "Yes, some cities and counties in California have local income taxes. For example, San Francisco has a local income tax for businesses. Check with your local tax authority for specific rates."
    },
    {
      question: "How do I calculate overtime in California?",
      answer: "California has specific overtime rules: 1.5x regular rate for hours over 8 in a day or 40 in a week, and 2x for hours over 12 in a day. This is more generous than federal overtime rules."
    }
  ];

  const tips = [
    "Review your W-4 withholdings annually",
    "Consider California-specific deductions",
    "Keep track of all pay stubs",
    "Understand SDI and PFL benefits",
    "Plan for state and local taxes",
    "Check for city-specific taxes",
    "Monitor overtime calculations",
    "Save for quarterly tax payments if self-employed"
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

  useSeo({
    
    
    title: "California Paycheck Calculator - CA Take-Home Pay Calculator",
    canonical: "/california-paycheck",
    path: "/california-paycheck",
    description: "Calculate your California take-home pay after state and federal taxes, SDI, and other CA-specific deductions.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "California Paycheck Calculator",
      "description": "Calculate California-specific take-home pay and deductions.",
      "url": "https://financeloancalc.com/california-paycheck"
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">California Paycheck Calculator</h1>
        <p className="text-lg text-gray-600">Calculate your California take-home pay after state and federal taxes, SDI, and other CA-specific deductions.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              California Paycheck Calculator
            </h2>
            <CaliforniaPaycheckCalculator />
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
              Understanding California Payroll
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">California-Specific Deductions</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>State Disability Insurance (SDI):</strong> 1.1% of wages</li>
                <li><strong>Paid Family Leave (PFL):</strong> Part of SDI</li>
                <li><strong>State Income Tax:</strong> Progressive rates from 1% to 13.3%</li>
                <li><strong>Local Taxes:</strong> Varies by city/county</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">California Tax Brackets (2024)</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <ul className="space-y-2">
                  <li>1% on first $10,099</li>
                  <li>2% on $10,100 - $23,942</li>
                  <li>4% on $23,943 - $37,788</li>
                  <li>6% on $37,789 - $52,455</li>
                  <li>8% on $52,456 - $66,295</li>
                  <li>9.3% on $66,296 - $338,639</li>
                  <li>10.3% on $338,640 - $406,364</li>
                  <li>11.3% on $406,365 - $677,275</li>
                  <li>12.3% on $677,276 - $1,000,000</li>
                  <li>13.3% on over $1,000,000</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Overtime Rules</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>1.5x regular rate for hours over 8 in a day</li>
                <li>1.5x regular rate for hours over 40 in a week</li>
                <li>2x regular rate for hours over 12 in a day</li>
                <li>1.5x regular rate for first 8 hours on 7th consecutive day</li>
                <li>2x regular rate for hours over 8 on 7th consecutive day</li>
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
              California Payroll Tips
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

export default CaliforniaPaycheckCalculatorPage;
