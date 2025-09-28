import React from "react";
import ZillowRentCalculator from "@/components/calculators/zillow/ZillowRentCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const ZillowRentCalculatorPage = () => {
  const faqs = [
    {
      question: "How do I calculate rent affordability?",
      answer: "A common rule of thumb is that your monthly rent should not exceed 30% of your gross monthly income. For example, if you earn $5,000 per month, your rent should ideally be $1,500 or less."
    },
    {
      question: "What factors affect rental prices?",
      answer: "Rental prices are influenced by location, property size, amenities, market demand, local economy, and seasonal factors. Urban areas and properties near desirable locations typically command higher rents."
    },
    {
      question: "How do I negotiate rent?",
      answer: "Research comparable properties, highlight your strengths as a tenant, consider longer lease terms, and be prepared to compromise on move-in dates or other terms. Always negotiate respectfully and professionally."
    },
    {
      question: "What additional costs should I consider?",
      answer: "Beyond rent, consider utilities, parking, security deposits, application fees, renters insurance, and potential maintenance costs. These can significantly impact your total housing expenses."
    },
    {
      question: "How do I know if a rent price is fair?",
      answer: "Compare similar properties in the area, check local rental market reports, and consider factors like location, amenities, and property condition. Online tools and real estate websites can provide market insights."
    },
    {
      question: "What's the difference between gross and net rent?",
      answer: "Gross rent includes all costs (utilities, maintenance, etc.), while net rent is the base rent amount. Some landlords offer all-inclusive gross rent, while others charge net rent plus additional fees."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Income",
      text: "Input your monthly income and any additional income sources.",
      url: "#income-form"
    },
    {
      name: "Add Expenses",
      text: "Include your monthly expenses and debt payments.",
      url: "#expenses-form"
    },
    {
      name: "Set Preferences",
      text: "Specify your desired location and property features.",
      url: "#preferences-form"
    },
    {
      name: "Review Results",
      text: "See your maximum affordable rent and budget breakdown.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Zillow Home Value Calculator",
      description: "Estimate your home's value",
      url: "/zillow-home-value-calculator"
    },
    {
      name: "Zillow Mortgage Calculator",
      description: "Calculate mortgage payments",
      url: "/zillow-mortgage-calculator"
    },
    {
      name: "Cost of Living Calculator",
      description: "Compare living expenses",
      url: "/cost-of-living"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    }
  ];

  const advancedFeatures = [
    {
      title: "Location Analysis",
      description: "Compare rental prices across different areas",
      icon: FaChartBar
    },
    {
      title: "Budget Planning",
      description: "Plan your monthly housing budget",
      icon: FaLightbulb
    },
    {
      title: "Market Trends",
      description: "View rental market trends and forecasts",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Research the local rental market thoroughly",
    "Consider all housing-related expenses",
    "Factor in potential rent increases",
    "Check property reviews and ratings",
    "Understand lease terms and conditions"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zillow Rent Calculator",
    "description": "Calculate affordable rent based on your income and expenses. Plan your housing budget with our comprehensive rent calculator.",
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
    
    title: "Zillow Rent Calculator 2024 - Calculate Affordable Rent",
    path: "/zillow-rent-calculator",
    description: "Free online rent calculator. Calculate affordable rent based on your income and expenses. Plan your housing budget with our comprehensive calculator.",
    keywords: "rent calculator, rental affordability calculator, housing budget calculator, rent affordability calculator, rental cost calculator, housing expense calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/zillow-rent-calculator",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Zillow Rent Calculator</h1>
            <p className="text-lg text-gray-600">Calculate affordable rent based on your income and expenses. Plan your housing budget with our comprehensive calculator.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Rent Calculator
                </h2>
                <ZillowRentCalculator />
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
                  Understanding Rent Affordability
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">Rent Affordability Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Maximum Rent = Monthly Income × 0.3</p>
                    <p className="text-sm text-gray-600 mt-2">Where: 0.3 represents the 30% rule of thumb for rent affordability</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Income:</strong> Your monthly gross income</li>
                    <li><strong>Debt-to-Income Ratio:</strong> Your existing debt payments</li>
                    <li><strong>Location:</strong> Local rental market conditions</li>
                    <li><strong>Property Type:</strong> Size, amenities, and features</li>
                    <li><strong>Additional Costs:</strong> Utilities, parking, and fees</li>
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
                  Rental Tips
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

export default ZillowRentCalculatorPage; 