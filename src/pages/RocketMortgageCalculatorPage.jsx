import React from "react";
import RocketMortgageCalculator from "@/components/calculators/rocketmortgage/RocketMortgageCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaHome, FaChartLine, FaCalculator, FaQuestionCircle, FaDollarSign, FaBook, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const RocketMortgageCalculatorPage = () => {
  useSeo({
    
    
    title: "Rocket Mortgage Calculator - Calculate Your Mortgage Payments",
    canonical: "/rocket-mortgage",
    path: "/rocket-mortgage",
    description: "Calculate your monthly mortgage payments with Rocket Mortgage's calculator. Compare different loan terms, interest rates, and down payment options. Free mortgage payment calculator.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Your Rocket Mortgage Payments",
      "description": "Calculate and compare different mortgage scenarios with Rocket Mortgage's calculator.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Home Price",
          "text": "Input the purchase price of your home.",
          "url": "https://financeloancalc.com/rocket-mortgage#home-price"
        },
        {
          "@type": "HowToStep",
          "name": "Set Down Payment",
          "text": "Choose your down payment amount or percentage.",
          "url": "https://financeloancalc.com/rocket-mortgage#down-payment"
        },
        {
          "@type": "HowToStep",
          "name": "Select Loan Terms",
          "text": "Choose your loan term and interest rate.",
          "url": "https://financeloancalc.com/rocket-mortgage#loan-terms"
        },
        {
          "@type": "HowToStep",
          "name": "Review Results",
          "text": "See your monthly payment breakdown and total costs.",
          "url": "https://financeloancalc.com/rocket-mortgage#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Home Price" },
        { "@type": "HowToSupply", "name": "Down Payment" },
        { "@type": "HowToSupply", "name": "Interest Rate" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Rocket Mortgage Calculator" }],
      "totalTime": "PT2M"
    }
  });

  const faqs = [
    {
      question: "What types of loans can I calculate with the Rocket Mortgage Calculator?",
      answer: "The calculator supports various Rocket Mortgage loan types including conventional loans, FHA loans, VA loans, and jumbo loans. Each loan type has different requirements and benefits that affect your mortgage terms."
    },
    {
      question: "How accurate are the interest rate calculations?",
      answer: "The calculator uses current market rates as a starting point, but your actual rate may vary based on your credit score, loan type, and other factors. For the most accurate rate, you should get a personalized quote from Rocket Mortgage."
    },
    {
      question: "What is included in the monthly payment calculation?",
      answer: "The monthly payment includes principal, interest, property taxes, homeowners insurance, and if applicable, private mortgage insurance (PMI) or HOA fees. The calculator breaks down each component for transparency."
    },
    {
      question: "How does the down payment affect my mortgage?",
      answer: "A larger down payment reduces your loan amount, potentially lowers your interest rate, and may eliminate the need for PMI. The calculator shows how different down payment amounts affect your monthly payments and total costs."
    },
    {
      question: "What is PMI and when is it required?",
      answer: "Private Mortgage Insurance (PMI) is typically required when your down payment is less than 20% of the home's value. The calculator automatically includes PMI in the payment calculation when applicable."
    },
    {
      question: "How can I estimate my property taxes?",
      answer: "Property taxes vary by location. The calculator uses an estimate based on the home price and average tax rates, but you should verify the actual tax rate for your specific property with local authorities."
    },
    {
      question: "What is the difference between fixed and adjustable-rate mortgages?",
      answer: "A fixed-rate mortgage maintains the same interest rate throughout the loan term, while an adjustable-rate mortgage (ARM) has a rate that can change periodically. The calculator can show you the differences in payments between these options."
    },
    {
      question: "How can I reduce my monthly mortgage payment?",
      answer: "You can reduce your monthly payment by making a larger down payment, choosing a longer loan term, improving your credit score for a better interest rate, or considering a different loan type. The calculator helps you compare these options."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Home Price",
      text: "Input the purchase price of your home.",
      url: "#home-price"
    },
    {
      name: "Set Down Payment",
      text: "Choose your down payment amount or percentage.",
      url: "#down-payment"
    },
    {
      name: "Select Loan Terms",
      text: "Choose your loan term and interest rate.",
      url: "#loan-terms"
    },
    {
      name: "Review Results",
      text: "See your monthly payment breakdown and total costs.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage payments",
      url: "/mortgage-calculator"
    },
    {
      name: "Home Affordability Calculator",
      description: "Calculate how much home you can afford",
      url: "/home-affordability-calculator"
    },
    {
      name: "Refinance Calculator",
      description: "Calculate refinancing options",
      url: "/refinance-calculator"
    }
  ];

  const tips = [
    "Compare different loan terms to find the best balance between monthly payments and total interest",
    "Consider making a larger down payment to reduce your monthly payments and avoid PMI",
    "Factor in additional costs like property taxes, insurance, and maintenance when budgeting",
    "Check your credit score before applying to ensure you get the best possible rate",
    "Consider getting pre-approved before house hunting to know your budget",
    "Compare rates from multiple lenders to find the best mortgage terms",
    "Consider the total cost of the loan, not just the monthly payment"
  ];

  const advancedFeatures = [
    {
      title: "Payment Breakdown",
      description: "See detailed breakdown of principal, interest, taxes, and insurance",
      icon: FaCalculator
    },
    {
      title: "Amortization Schedule",
      description: "View your payment schedule over the life of the loan",
      icon: FaChartLine
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different down payment and term options",
      icon: FaHome
    },
    {
      title: "Export Results",
      description: "Save and share your mortgage calculations",
      icon: FaLink
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Rocket Mortgage Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your potential mortgage payments and explore loan options with Rocket Mortgage's easy-to-use calculator.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Rocket Mortgage Calculator
                </h2>
                <RocketMortgageCalculator />
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
                  Understanding Rocket Mortgage
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Rocket Mortgage Works</h3>
                  <p>Rocket Mortgage offers a streamlined digital mortgage process with competitive rates and various loan options to suit different needs.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Features of Rocket Mortgage</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Monthly Payment = Principal + Interest + Taxes + Insurance (PITI)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: Principal = Loan amount, Interest = Interest rate, Taxes = Property taxes, Insurance = Homeowners insurance</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Interest Rate:</strong> Current market rates</li>
                    <li><strong>Loan Term:</strong> Length of the mortgage</li>
                    <li><strong>Down Payment:</strong> Initial payment amount</li>
                    <li><strong>Credit Score:</strong> Impact on rates and terms</li>
                    <li><strong>Property Type:</strong> Type of home being financed</li>
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
                  Mortgage Tips
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

export default RocketMortgageCalculatorPage;
