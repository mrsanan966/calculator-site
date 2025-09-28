import React from "react";
import CarPaymentCalculator from "@/components/calculators/car/CarPaymentCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaCar, FaBook, FaLink, FaLightbulb, FaChartBar } from "react-icons/fa";

const CarPaymentCalculatorPage = () => {
  const faqs = [
    {
      question: "How is a car payment calculated?",
      answer: "Car payments are calculated using the loan amount (car price minus down payment), interest rate, and loan term. The calculator uses the standard amortization formula to determine your monthly payment, including principal and interest."
    },
    {
      question: "What is a good interest rate for a car loan?",
      answer: "Interest rates vary based on credit score, loan term, and market conditions. Generally: Excellent credit (720+) can get rates under 3%, Good credit (690-719) around 3-5%, Fair credit (630-689) 5-8%, and Poor credit (below 630) may face rates above 8%. The calculator helps you estimate payments at different rates."
    },
    {
      question: "How does the down payment affect my payment?",
      answer: "A larger down payment reduces your loan amount, which can lower your monthly payment and potentially get you a better interest rate. The calculator shows how different down payment amounts affect your monthly payment and total cost."
    },
    {
      question: "What is the typical car loan term?",
      answer: "Car loan terms typically range from 36 to 72 months (3 to 6 years). While longer terms mean lower monthly payments, they also result in higher total interest costs. The calculator helps you compare different term options."
    },
    {
      question: "What additional costs should I consider?",
      answer: "Beyond the monthly payment, consider: sales tax, registration fees, insurance, maintenance, fuel, and potential repairs. The calculator helps you understand the total cost of ownership."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Car Price",
      text: "Input the total price of the car you want to purchase.",
      url: "#price"
    },
    {
      name: "Set Down Payment",
      text: "Specify your down payment amount.",
      url: "#down-payment"
    },
    {
      name: "Choose Loan Terms",
      text: "Select your loan term and interest rate.",
      url: "#loan-terms"
    },
    {
      name: "Review Payment",
      text: "See your monthly payment and total cost breakdown.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Car Affordability Calculator",
      description: "Determine how much car you can afford",
      url: "/car-affordability-calculator"
    },
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
      name: "Budget Calculator",
      description: "Plan your overall monthly budget",
      url: "/budget-calculator"
    }
  ];

  const advancedFeatures = [
    {
      title: "Payment Breakdown",
      description: "View detailed monthly payment components",
      icon: FaCalculator
    },
    {
      title: "Amortization Schedule",
      description: "See how your payments are applied over time",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different loan terms and rates",
      icon: FaCar
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Aim for a 20% down payment to avoid being upside down",
    "Keep your loan term to 48 months or less when possible",
    "Factor in insurance costs before making a decision",
    "Consider the total cost of ownership, not just the payment",
    "Check your credit score before shopping for a loan",
    "Get pre-approved for a loan before visiting dealerships",
    "Compare offers from multiple lenders",
    "Consider the car's depreciation rate"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Car Payment Calculator",
    "description": "Calculate your monthly car payment based on loan amount, interest rate, and term. Understand your total cost and payment breakdown. Free car payment calculator.",
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

  useSeo({
    
    
    title: "Car Payment Calculator 2024 - Calculate Your Monthly Car Payment",
    canonical: "/car-payment",
    path: "/car-payment",
    description: "Calculate your monthly car payment based on loan amount, interest rate, and term. Understand your total cost and payment breakdown. Free car payment calculator.",
    keywords: "car payment calculator, auto loan calculator, car loan calculator, monthly car payment calculator, auto payment calculator, car finance calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/car-payment-calculator",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Car Payment Calculator</h1>
        <p className="text-lg text-gray-600">Calculate your monthly car payment based on loan amount, interest rate, and term. Understand your total cost and payment breakdown.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Car Payment Calculator
            </h2>
            <CarPaymentCalculator />
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
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8" id="faq">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaQuestionCircle className="mr-2 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <div className="lg:col-span-1">
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaChartLine className="mr-2 text-blue-600" />
              Car Buying Tips
            </h2>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaLink className="mr-2 text-blue-600" />
              Related Calculators
            </h2>
            <div className="space-y-4">
              {relatedCalculators.map((calc, index) => (
                <a
                  key={index}
                  href={calc.url}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold mb-1">{calc.name}</h3>
                  <p className="text-sm text-gray-600">{calc.description}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarPaymentCalculatorPage; 