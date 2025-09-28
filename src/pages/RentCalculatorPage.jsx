import React from "react";
import RentCalculator from "@/components/calculators/rent/RentCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const RentCalculatorPage = () => {
  useSeo({
    
    
    title: "Rent Calculator | Calculate Monthly Rent Payments",
    canonical: "/rent",
    path: "/rent",
    description: "Calculate your monthly rent payments and understand your rental costs with our comprehensive rent calculator. Plan your budget effectively.",
  });

  const advancedFeatures = [
    {
      icon: FaChartLine,
      title: "Rent Affordability Analysis",
      description: "Calculate how much rent you can afford based on your income and expenses.",
    },
    {
      icon: FaDollarSign,
      title: "Total Cost Breakdown",
      description: "See a detailed breakdown of all rental costs including utilities and fees.",
    },
    {
      icon: FaChartBar,
      title: "Rent vs. Buy Comparison",
      description: "Compare the costs of renting versus buying a property.",
    },
    {
      icon: FaMoneyCheckAlt,
      title: "Budget Planning",
      description: "Plan your monthly budget including rent and other living expenses.",
    },
  ];

  const howToSteps = [
    {
      name: "Enter Monthly Rent",
      text: "Input your monthly rent amount",
    },
    {
      name: "Add Additional Costs",
      text: "Include utilities, parking, and other fees",
    },
    {
      name: "View Results",
      text: "See your total monthly rental costs",
    },
  ];

  const faqs = [
    {
      question: "How much rent can I afford?",
      answer: "A common rule of thumb is that your rent should not exceed 30% of your gross monthly income. However, this can vary based on your other expenses and financial goals.",
    },
    {
      question: "What additional costs should I consider?",
      answer: "Beyond the base rent, consider utilities, parking fees, maintenance costs, renter's insurance, and any community or amenity fees.",
    },
    {
      question: "How do I calculate rent per square foot?",
      answer: "Divide the monthly rent by the total square footage of the property. This helps compare different properties on an equal basis.",
    },
  ];

  const tips = [
    "Consider all additional costs beyond the base rent",
    "Factor in potential rent increases in your long-term budget",
    "Compare properties based on total cost, not just rent",
    "Review the lease agreement carefully before signing",
    "Consider the location's impact on your daily expenses",
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate monthly mortgage payments",
      url: "/mortgage-calculator",
    },
    {
      name: "Property Tax Calculator",
      description: "Estimate property tax payments",
      url: "/property-tax-calculator",
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget-calculator",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Rent Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your monthly rent payments and understand your rental costs. Essential for renters planning their budget.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Rent Calculator
                </h2>
                <RentCalculator />
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
                  Understanding Rent Costs
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Rent Costs Work</h3>
                  <p>Rent costs typically include the base rent plus additional expenses like utilities, parking, and maintenance fees. Understanding these components helps you budget effectively.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Rent Affordability Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Maximum Rent = Monthly Income × 0.3</p>
                    <p className="text-sm text-gray-600 mt-2">Where: 0.3 represents the recommended 30% of income for rent</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Base Rent:</strong> The primary monthly payment</li>
                    <li><strong>Utilities:</strong> Electricity, water, gas, internet</li>
                    <li><strong>Additional Fees:</strong> Parking, maintenance, amenities</li>
                    <li><strong>Location:</strong> Impact on daily expenses</li>
                    <li><strong>Lease Terms:</strong> Length and conditions of the rental agreement</li>
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
                  Smart Renting Tips
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

export default RentCalculatorPage; 