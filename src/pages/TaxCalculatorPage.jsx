import React from "react";
import TaxCalculator from "@/components/calculators/tax/TaxCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const TaxCalculatorPage = () => {
  const faqs = [
    {
      question: "How is my tax liability calculated?",
      answer: "Your tax liability is calculated based on your income, filing status, deductions, and credits. The calculator uses current tax brackets and rates to estimate your taxes."
    },
    {
      question: "What are tax deductions?",
      answer: "Tax deductions reduce your taxable income. Common deductions include mortgage interest, charitable contributions, and certain business expenses."
    },
    {
      question: "What's the difference between tax credits and deductions?",
      answer: "Deductions reduce your taxable income, while credits directly reduce your tax bill. Credits are generally more valuable as they provide dollar-for-dollar reductions."
    },
    {
      question: "How do I know my filing status?",
      answer: "Your filing status depends on your marital status and household situation. Common statuses include Single, Married Filing Jointly, Head of Household, and Married Filing Separately."
    },
    {
      question: "What are estimated tax payments?",
      answer: "Estimated tax payments are quarterly payments made by self-employed individuals or those with income not subject to withholding to avoid penalties."
    },
    {
      question: "How can I reduce my tax bill?",
      answer: "You can reduce your tax bill through deductions, credits, retirement contributions, and tax-advantaged investments. Consult a tax professional for personalized advice."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Income Details",
      text: "Input your total income, including wages, investments, and other sources.",
      url: "#income-form"
    },
    {
      name: "Add Deductions",
      text: "Include eligible deductions like mortgage interest and charitable contributions.",
      url: "#deductions-form"
    },
    {
      name: "Review Tax Estimate",
      text: "See your estimated tax liability, effective tax rate, and potential refund.",
      url: "#results"
    },
    {
      name: "Explore Tax-Saving Options",
      text: "Try different scenarios to find ways to reduce your tax burden.",
      url: "#scenarios"
    }
  ];

  const relatedCalculators = [
    {
      name: "Salary Calculator",
      description: "Calculate salary and compensation",
      url: "/salary"
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
    },
    {
      name: "Property Tax Calculator",
      description: "Estimate property taxes",
      url: "/property-tax"
    }
  ];

  const advancedFeatures = [
    {
      title: "Tax Bracket Analysis",
      description: "See how your income falls into different tax brackets",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different filing statuses and deduction options",
      icon: FaLightbulb
    },
    {
      title: "Tax-Saving Strategies",
      description: "Get personalized recommendations to reduce your tax bill",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your tax calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Keep detailed records of all income and expenses",
    "Maximize retirement contributions",
    "Consider tax-advantaged investment accounts",
    "Review your withholding allowances",
    "Plan for estimated tax payments if self-employed"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Tax Calculator",
    "description": "Calculate your estimated tax liability, effective tax rate, and potential refund. Plan your taxes with our comprehensive tax calculator.",
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
    
    
    title: "Tax Calculator 2024 - Estimate Your Tax Liability",
    canonical: "/tax",
    path: "/tax",
    description: "Free online tax calculator. Calculate your estimated tax liability, effective tax rate, and potential refund. Plan your taxes with our comprehensive calculator.",
    keywords: "tax calculator, income tax calculator, tax liability calculator, tax refund calculator, tax bracket calculator, tax planning calculator, tax estimation calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/tax-calculator",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Tax Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your estimated tax liability, effective tax rate, and potential refund. Essential for tax planning and financial management.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Tax Calculator
                </h2>
                <TaxCalculator />
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
                  Understanding Taxes
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Taxes Work</h3>
                  <p>Taxes are calculated based on your income, filing status, and eligible deductions. The tax system uses progressive brackets, meaning higher income is taxed at higher rates.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Tax Bracket Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Tax = (Income × Tax Rate) - Tax Credits</p>
                    <p className="text-sm text-gray-600 mt-2">Where: Income = Total income minus deductions, Tax Rate = Rate for your income bracket</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Filing Status:</strong> Single, Married, Head of Household, etc.</li>
                    <li><strong>Income Sources:</strong> Wages, investments, self-employment</li>
                    <li><strong>Deductions:</strong> Standard or itemized deductions</li>
                    <li><strong>Credits:</strong> Tax credits that reduce your tax bill</li>
                    <li><strong>Withholding:</strong> Taxes already paid through your employer</li>
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
                  Tax Planning Tips
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

export default TaxCalculatorPage;
  