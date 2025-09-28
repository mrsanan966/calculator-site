import React from 'react';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from 'react-icons/fa';

const ZillowZestimateCalculatorPage = () => {
  useSeo({
    title: 'Zillow Zestimate Calculator',
    description: 'Calculate your home Zestimate using Zillow data.',
    keywords: 'Zillow, Zestimate, calculator',
    canonical: '/zillow-zestimate-calculator',
    path: '/zillow-zestimate-calculator',
    ogType: 'website'
  });

  const advancedFeatures = [
    {
      icon: FaChartLine,
      title: "Zestimate Analysis",
      description: "Get detailed analysis of your home's Zestimate value.",
    },
    {
      icon: FaDollarSign,
      title: "Market Comparison",
      description: "Compare your home's value with similar properties in your area.",
    },
    {
      icon: FaChartBar,
      title: "Value Trends",
      description: "Track your home's value trends over time.",
    },
    {
      icon: FaMoneyCheckAlt,
      title: "Investment Insights",
      description: "Get insights into your home's investment potential.",
    },
  ];

  const howToSteps = [
    {
      name: "Enter Address",
      text: "Input your property's address",
    },
    {
      name: "View Zestimate",
      text: "See your home's estimated value",
    },
    {
      name: "Analyze Details",
      text: "Review detailed value breakdown",
    },
  ];

  const faqs = [
    {
      question: "What is a Zestimate?",
      answer: "A Zestimate is Zillow's estimated market value for a home, calculated using a proprietary formula that incorporates public and user-submitted data.",
    },
    {
      question: "How accurate is the Zestimate?",
      answer: "Zestimates are based on available data and may not reflect recent market changes or unique property features. They should be used as a starting point for home value estimates.",
    },
    {
      question: "How often is the Zestimate updated?",
      answer: "Zestimates are updated multiple times per week based on new data and market conditions.",
    },
  ];

  const tips = [
    "Keep your home's information up to date on Zillow",
    "Review comparable properties in your area",
    "Consider recent renovations and improvements",
    "Check local market trends",
    "Consult with a real estate professional for a detailed valuation",
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate monthly mortgage payments",
      url: "/mortgage-calculator"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Zillow Zestimate Calculator</h1>
            <p className="text-lg text-gray-600">Calculate your home's estimated value using Zillow's Zestimate data. Get insights into your property's market value.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Zestimate Calculator
                </h2>
                {/* Add your Zillow Zestimate calculator content here */}
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
                  Understanding Zestimates
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Zestimates Work</h3>
                  <p>Zestimates are calculated using a proprietary formula that incorporates public and user-submitted data. The algorithm considers factors like location, size, and recent sales of similar properties.</p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors Considered</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Location:</strong> Neighborhood and local market conditions</li>
                    <li><strong>Property Details:</strong> Size, bedrooms, bathrooms, and features</li>
                    <li><strong>Recent Sales:</strong> Comparable properties in the area</li>
                    <li><strong>Market Trends:</strong> Local real estate market conditions</li>
                    <li><strong>Public Data:</strong> Tax assessments and property records</li>
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
                  Smart Home Value Tips
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

export default ZillowZestimateCalculatorPage; 