import React from "react";
import LoanComparisonCalculator from "@/components/calculators/loan/LoanComparisonCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaMoneyBillWave, FaChartLine, FaCalculator, FaInfoCircle, FaQuestionCircle, FaDollarSign, FaBook, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const LoanComparisonCalculatorPage = () => {
  useSeo({
    
    
    title: "Loan Comparison Calculator - Compare Different Loan Options",
    canonical: "/loan-comparison",
    path: "/loan-comparison",
    description: "Compare multiple loan options side by side. Analyze interest rates, monthly payments, and total costs to find the best loan for your needs. Free loan comparison calculator.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Compare Loan Options",
      "description": "Compare different loan options to find the best terms and rates for your needs.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Loan Details",
          "text": "Input the loan amount and terms for each option you want to compare.",
          "url": "https://financeloancalc.com/loan-comparison#loan-details"
        },
        {
          "@type": "HowToStep",
          "name": "Set Interest Rates",
          "text": "Specify the interest rate for each loan option.",
          "url": "https://financeloancalc.com/loan-comparison#interest-rates"
        },
        {
          "@type": "HowToStep",
          "name": "Add Additional Costs",
          "text": "Include any fees or costs associated with each loan.",
          "url": "https://financeloancalc.com/loan-comparison#additional-costs"
        },
        {
          "@type": "HowToStep",
          "name": "Review Comparison",
          "text": "See a side-by-side comparison of monthly payments and total costs.",
          "url": "https://financeloancalc.com/loan-comparison#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Loan Amount" },
        { "@type": "HowToSupply", "name": "Interest Rates" },
        { "@type": "HowToSupply", "name": "Loan Terms" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Loan Comparison Calculator" }],
      "totalTime": "PT3M"
    }
  });

  const faqs = [
    {
      question: "What factors should I consider when comparing loans?",
      answer: "Key factors include: interest rate, loan term, monthly payment, total interest cost, fees, prepayment penalties, and flexibility of terms. The calculator helps you compare these factors side by side to make an informed decision."
    },
    {
      question: "How do I know which loan is the best option?",
      answer: "The best loan depends on your priorities: lowest monthly payment, lowest total cost, shortest term, or most flexible terms. The calculator shows you the trade-offs between different options, helping you choose based on your specific needs."
    },
    {
      question: "What is the difference between APR and interest rate?",
      answer: "The interest rate is the cost of borrowing the principal, while the APR (Annual Percentage Rate) includes the interest rate plus any fees and costs. The calculator helps you compare both rates to understand the true cost of each loan."
    },
    {
      question: "How do loan terms affect the total cost?",
      answer: "Longer terms typically mean lower monthly payments but higher total interest costs. Shorter terms mean higher monthly payments but lower total costs. The calculator helps you see how different terms affect both your monthly budget and total cost."
    },
    {
      question: "What fees should I look out for?",
      answer: "Common fees include: origination fees, application fees, processing fees, and prepayment penalties. The calculator allows you to include these fees to get a more accurate comparison of total costs."
    },
    {
      question: "How does my credit score affect loan options?",
      answer: "Your credit score significantly impacts the interest rates and terms you qualify for. Higher scores typically get better rates and terms. The calculator helps you understand how different credit scenarios affect your loan options."
    },
    {
      question: "Should I choose a fixed or variable rate?",
      answer: "Fixed rates provide predictable payments but may start higher. Variable rates may start lower but can increase over time. The calculator helps you compare both options and understand the potential risks and benefits."
    },
    {
      question: "What is the impact of making extra payments?",
      answer: "Extra payments can significantly reduce total interest and shorten the loan term. The calculator helps you see how additional payments affect your loan payoff timeline and total interest savings."
    }
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage payments",
      url: "/mortgage"
    },
    {
      name: "Auto Loan Calculator",
      description: "Calculate auto loan payments",
      url: "/auto-loan"
    },
    {
      name: "Personal Loan Calculator",
      description: "Calculate personal loan options",
      url: "/personal-loan"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    }
  ];

  const tips = [
    "Compare the total cost, not just the monthly payment",
    "Consider both short-term and long-term financial impact",
    "Factor in all fees and costs, not just the interest rate",
    "Check for prepayment penalties and flexibility",
    "Consider your future financial situation",
    "Look for loans with no hidden fees",
    "Compare multiple lenders and loan types",
    "Consider the impact on your credit score"
  ];

  const advancedFeatures = [
    {
      title: "Side-by-Side Comparison",
      description: "Compare multiple loan options simultaneously",
      icon: FaCalculator
    },
    {
      title: "Total Cost Analysis",
      description: "See the complete cost breakdown for each option",
      icon: FaChartLine
    },
    {
      title: "Payment Schedule",
      description: "View detailed payment schedules for each loan",
      icon: FaMoneyBillWave
    },
    {
      title: "Export Results",
      description: "Save and share your comparisons",
      icon: FaLink
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loan Comparison Calculator</h1>
            <p className="text-lg text-gray-600">Compare different loan options side by side to find the best terms and rates for your needs.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Loan Comparison Calculator
                </h2>
                <LoanComparisonCalculator />
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
                  Understanding Loan Comparison
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Loan Comparison Works</h3>
                  <p>Loan comparison involves analyzing multiple loan options to determine which one offers the best terms, rates, and overall cost.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors in Comparison</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Total Cost = Principal + Total Interest + Fees</p>
                    <p className="text-sm text-gray-600 mt-2">Where: Principal = Loan amount, Total Interest = Interest paid over loan term, Fees = Origination fees, closing costs, etc.</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Interest Rate:</strong> Annual percentage rate (APR)</li>
                    <li><strong>Loan Term:</strong> Length of the loan</li>
                    <li><strong>Monthly Payment:</strong> Regular payment amount</li>
                    <li><strong>Total Cost:</strong> Overall cost including interest</li>
                    <li><strong>Fees:</strong> Additional charges and costs</li>
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
                  Loan Comparison Tips
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

export default LoanComparisonCalculatorPage; 