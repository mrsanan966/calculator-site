import React from "react";
import CarAffordabilityCalculator from "@/components/calculators/auto/CarAffordabilityCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FaLink, FaCar, FaChartLine, FaCalculator, FaInfoCircle, FaHome, FaQuestionCircle, FaMoneyCheckAlt } from "react-icons/fa";

const CarAffordabilityCalculatorPage = () => {
  useSeo({
    
    
    title: "Car Affordability Calculator - Calculate How Much Car You Can Afford",
    canonical: "/car-affordability",
    path: "/car-affordability",
    description: "Calculate how much car you can afford based on your income, expenses, and down payment. Understand your monthly payments and total cost of ownership. Free car affordability calculator.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Car Affordability",
      "description": "Calculate and understand how much car you can afford based on your financial situation and preferences.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Income and Expenses",
          "text": "Input your monthly income and existing expenses.",
          "url": "https://financeloancalc.com/car-affordability#income"
        },
        {
          "@type": "HowToStep",
          "name": "Set Down Payment",
          "text": "Specify your available down payment amount.",
          "url": "https://financeloancalc.com/car-affordability#down-payment"
        },
        {
          "@type": "HowToStep",
          "name": "Choose Loan Terms",
          "text": "Select your preferred loan term and interest rate.",
          "url": "https://financeloancalc.com/car-affordability#loan-terms"
        },
        {
          "@type": "HowToStep",
          "name": "Review Results",
          "text": "See your maximum car price and monthly payment estimates.",
          "url": "https://financeloancalc.com/car-affordability#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Monthly Income" },
        { "@type": "HowToSupply", "name": "Monthly Expenses" },
        { "@type": "HowToSupply", "name": "Down Payment" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Car Affordability Calculator" }],
      "totalTime": "PT2M"
    }
  });

  const faqs = [
    {
      question: "How much of my income should go to car payments?",
      answer: "Financial experts typically recommend that your total car expenses (including loan payments, insurance, maintenance, and fuel) should not exceed 15-20% of your monthly take-home pay. The calculator helps you stay within this guideline while considering your other financial obligations."
    },
    {
      question: "What factors affect car affordability?",
      answer: "Key factors include your monthly income, existing expenses, down payment amount, loan term, interest rate, and additional costs like insurance, maintenance, and fuel. The calculator takes these into account to provide a comprehensive affordability estimate."
    },
    {
      question: "How does the down payment affect affordability?",
      answer: "A larger down payment reduces your loan amount, which can lower your monthly payments and potentially get you a better interest rate. The calculator shows how different down payment amounts affect your maximum car price and monthly payments."
    },
    {
      question: "What is the 20/4/10 rule?",
      answer: "The 20/4/10 rule is a guideline suggesting: 20% down payment, 4-year loan term, and monthly car expenses (including loan payment, insurance, and maintenance) not exceeding 10% of your gross monthly income. The calculator helps you apply this rule to your situation."
    },
    {
      question: "Should I consider additional costs beyond the car payment?",
      answer: "Yes, you should factor in insurance, maintenance, fuel, registration, and potential repairs. The calculator includes these costs in its affordability assessment to give you a more accurate picture of total car ownership expenses."
    },
    {
      question: "How does loan term affect affordability?",
      answer: "Longer loan terms (e.g., 72 months vs. 36 months) can lower monthly payments but increase total interest costs. The calculator helps you compare different loan terms to find the right balance between monthly affordability and total cost."
    },
    {
      question: "What credit score do I need for a car loan?",
      answer: "While requirements vary by lender, generally: Excellent (720+) gets the best rates, Good (690-719) gets competitive rates, Fair (630-689) may get higher rates, and Poor (below 630) may face challenges. The calculator helps you estimate payments based on different interest rates."
    },
    {
      question: "How can I improve my car affordability?",
      answer: "You can improve affordability by: saving for a larger down payment, improving your credit score, choosing a shorter loan term, considering a less expensive car, or reducing other expenses. The calculator helps you explore these options."
    }
  ];

  const relatedCalculators = [
    {
      name: "Auto Loan Calculator",
      description: "Calculate monthly payments for your car loan",
      url: "/auto-loan-calculator"
    },
    {
      name: "Auto Loan Refinance Calculator",
      description: "See if refinancing your car loan makes sense",
      url: "/auto-loan-refinance-calculator"
    },
    {
      name: "Car Payment Calculator",
      description: "Calculate your monthly car payment",
      url: "/car-payment-calculator"
    },
    {
      name: "Budget Calculator",
      description: "Plan your overall monthly budget",
      url: "/budget-calculator"
    }
  ];

  const tips = [
    "Consider total cost of ownership, not just the monthly payment",
    "Aim for a 20% down payment to avoid being upside down on your loan",
    "Keep your loan term to 48 months or less when possible",
    "Factor in insurance costs before making a decision",
    "Consider fuel efficiency and maintenance costs",
    "Check your credit score before shopping for a loan",
    "Get pre-approved for a loan before visiting dealerships",
    "Compare offers from multiple lenders"
  ];

  const advancedFeatures = [
    {
      title: "Total Cost Analysis",
      description: "See the complete cost of car ownership",
      icon: FaChartLine
    },
    {
      title: "Payment Breakdown",
      description: "View detailed monthly payment components",
      icon: FaCalculator
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different loan terms and down payments",
      icon: FaCar
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Car Affordability Calculator</h1>
            <p className="text-lg text-gray-600">Calculate how much car you can afford based on your income, expenses, and financial goals.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Car Affordability Calculator
                </h2>
                <CarAffordabilityCalculator />
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
                  Understanding Car Affordability
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Car Affordability is Calculated</h3>
                  <p>Car affordability is determined by analyzing your income, expenses, and financial obligations to determine a comfortable monthly payment amount.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors in Affordability</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Maximum Monthly Payment = (Monthly Income × 0.15) - Other Monthly Expenses</p>
                    <p className="text-sm text-gray-600 mt-2">Where: 15% is the recommended maximum percentage of income for car expenses, including payment, insurance, and maintenance</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Monthly Income:</strong> Your take-home pay after taxes</li>
                    <li><strong>Monthly Expenses:</strong> Current financial obligations</li>
                    <li><strong>Down Payment:</strong> Initial cash payment</li>
                    <li><strong>Interest Rate:</strong> Loan interest rate</li>
                    <li><strong>Loan Term:</strong> Length of the loan</li>
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
                  Car Buying Tips
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

export default CarAffordabilityCalculatorPage; 