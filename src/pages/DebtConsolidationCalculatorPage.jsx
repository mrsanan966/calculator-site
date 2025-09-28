import React from "react";
import DebtConsolidationCalculator from "@/components/calculators/debt/DebtConsolidationCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaMoneyBillWave, FaChartLine, FaCalculator, FaInfoCircle, FaQuestionCircle, FaDollarSign, FaBook, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const DebtConsolidationCalculatorPage = () => {
  useSeo({
    
    
    title: "Debt Consolidation Calculator - Calculate Your Savings",
    canonical: "/debt-consolidation",
    path: "/debt-consolidation",
    description: "Calculate potential savings from consolidating your debts. Compare current payments with consolidated loan options. Free debt consolidation calculator.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Debt Consolidation Savings",
      "description": "Calculate and understand potential savings from consolidating multiple debts into a single loan.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Current Debts",
          "text": "Input the balance, interest rate, and minimum payment for each debt.",
          "url": "https://financeloancalc.com/debt-consolidation#current-debts"
        },
        {
          "@type": "HowToStep",
          "name": "Set Consolidation Terms",
          "text": "Specify the interest rate and term for the consolidation loan.",
          "url": "https://financeloancalc.com/debt-consolidation#consolidation-terms"
        },
        {
          "@type": "HowToStep",
          "name": "Add Consolidation Costs",
          "text": "Include any fees or costs associated with consolidation.",
          "url": "https://financeloancalc.com/debt-consolidation#consolidation-costs"
        },
        {
          "@type": "HowToStep",
          "name": "Review Savings",
          "text": "See your potential monthly savings and total interest savings.",
          "url": "https://financeloancalc.com/debt-consolidation#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Current Debt Details" },
        { "@type": "HowToSupply", "name": "Consolidation Loan Terms" },
        { "@type": "HowToSupply", "name": "Consolidation Costs" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Debt Consolidation Calculator" }],
      "totalTime": "PT3M"
    }
  });

  const faqs = [
    {
      question: "What is debt consolidation?",
      answer: "Debt consolidation combines multiple debts into a single loan, typically with a lower interest rate. This can simplify payments and potentially reduce total interest costs. The calculator helps you understand if consolidation makes financial sense for your situation."
    },
    {
      question: "When should I consider debt consolidation?",
      answer: "Consider consolidation when: you have multiple high-interest debts, you can get a lower interest rate, you want to simplify payments, or you're struggling to manage multiple due dates. The calculator helps you evaluate if consolidation is right for you."
    },
    {
      question: "What types of debt can be consolidated?",
      answer: "Common consolidatable debts include: credit cards, personal loans, medical bills, and other unsecured debts. The calculator helps you analyze different combinations of debts to find the best consolidation strategy."
    },
    {
      question: "How does debt consolidation affect my credit score?",
      answer: "Consolidation may initially lower your score due to the new credit inquiry and loan application. However, it can improve your score over time by reducing credit utilization and making payments more manageable. The calculator helps you understand the long-term impact."
    },
    {
      question: "What are the costs of debt consolidation?",
      answer: "Common costs include: origination fees, balance transfer fees, and potentially closing costs. The calculator allows you to include these costs to get a more accurate picture of potential savings."
    },
    {
      question: "Should I choose a longer or shorter consolidation term?",
      answer: "Shorter terms mean higher monthly payments but lower total interest costs. Longer terms mean lower monthly payments but higher total interest. The calculator helps you find the right balance for your budget."
    },
    {
      question: "What credit score do I need for debt consolidation?",
      answer: "Requirements vary by lender, but generally: Excellent (720+) gets the best rates, Good (690-719) gets competitive rates, Fair (630-689) may get higher rates, and Poor (below 630) may face challenges. The calculator helps you estimate payments based on different credit scenarios."
    },
    {
      question: "What are the alternatives to debt consolidation?",
      answer: "Alternatives include: debt management plans, debt settlement, bankruptcy, or paying off debts individually. The calculator helps you compare consolidation with your current situation to make an informed decision."
    }
  ];

  const relatedCalculators = [
    {
      name: "Debt Payoff Calculator",
      description: "Calculate the fastest way to pay off debt",
      url: "/debt-payoff-calculator"
    },
    {
      name: "Credit Card Payoff Calculator",
      description: "Plan your credit card debt payoff",
      url: "/credit-card-payoff-calculator"
    },
    {
      name: "Personal Loan Calculator",
      description: "Calculate payments for a consolidation loan",
      url: "/personal-loan-calculator"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget-calculator"
    }
  ];

  const tips = [
    "Check your credit score before applying",
    "Compare offers from multiple lenders",
    "Consider both monthly savings and total cost",
    "Factor in all consolidation fees",
    "Choose the shortest term you can afford",
    "Avoid taking on new debt after consolidation",
    "Consider your future financial situation",
    "Have a plan to prevent future debt"
  ];

  const advancedFeatures = [
    {
      title: "Savings Analysis",
      description: "Compare current and consolidated payments",
      icon: FaCalculator
    },
    {
      title: "Payment Schedule",
      description: "View detailed payment breakdowns",
      icon: FaChartLine
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different consolidation options",
      icon: FaMoneyBillWave
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaLink
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Debt Consolidation Calculator</h1>
            <p className="text-lg text-gray-600">Calculate potential savings and monthly payments when consolidating multiple debts into a single loan.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Debt Consolidation Calculator
                </h2>
                <DebtConsolidationCalculator />
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
                  Understanding Debt Consolidation
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Debt Consolidation Works</h3>
                  <p>Debt consolidation combines multiple debts into a single loan with a lower interest rate, potentially reducing your monthly payments and total interest paid.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Consolidation Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: P = Principal amount, r = Monthly interest rate, n = Number of payments</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Current Debts:</strong> Total amount and interest rates</li>
                    <li><strong>New Loan Terms:</strong> Interest rate and repayment period</li>
                    <li><strong>Fees:</strong> Origination fees and closing costs</li>
                    <li><strong>Credit Score:</strong> Impact on eligibility and rates</li>
                    <li><strong>Monthly Budget:</strong> Ability to make payments</li>
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
                  Debt Consolidation Tips
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

export default DebtConsolidationCalculatorPage; 