import React from "react";
import ZillowRoiCalculator from "@/components/calculators/zillow/ZillowRoiCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt, FaInfoCircle } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ZillowRoiCalculatorPage = () => {
  const faqs = [
    {
      question: "What is ROI in real estate?",
      answer: "ROI (Return on Investment) in real estate measures the profitability of a property investment. It's calculated by dividing the net profit by the total investment cost, expressed as a percentage."
    },
    {
      question: "How do I calculate real estate ROI?",
      answer: "Real estate ROI is calculated by considering purchase price, renovation costs, rental income, operating expenses, and property appreciation. The formula is: (Net Profit / Total Investment) × 100."
    },
    {
      question: "What's a good ROI for real estate?",
      answer: "A good ROI for real estate typically ranges from 8% to 12%. However, this varies based on location, property type, market conditions, and investment strategy. Higher-risk investments may require higher ROI expectations."
    },
    {
      question: "How does property appreciation affect ROI?",
      answer: "Property appreciation increases ROI by adding value to your investment over time. The calculator considers both rental income and property value appreciation to provide a comprehensive ROI calculation."
    },
    {
      question: "What costs should I include in ROI calculation?",
      answer: "Include purchase price, closing costs, renovation expenses, property taxes, insurance, maintenance, property management fees, and any other operating expenses. Don't forget to account for vacancy periods and unexpected repairs."
    },
    {
      question: "How can I improve my real estate ROI?",
      answer: "Improve ROI by increasing rental income, reducing expenses, making strategic renovations, optimizing property management, and choosing properties in appreciating markets. Consider tax benefits and financing options as well."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Property Details",
      text: "Input purchase price, closing costs, and renovation expenses.",
      url: "#property-form"
    },
    {
      name: "Add Income & Expenses",
      text: "Include rental income, operating expenses, and property management costs.",
      url: "#income-form"
    },
    {
      name: "Set Investment Parameters",
      text: "Specify investment period, appreciation rate, and financing details.",
      url: "#parameters-form"
    },
    {
      name: "Review Results",
      text: "See your ROI calculation and investment analysis.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    
    {
      name: "Investment Growth Calculator",
      description: "Calculate investment returns",
      url: "/finance"
    },
    {
      name: "Zillow Home Value Calculator",
      description: "Estimate your home's value",
      url: "/zillow-home-value-calculator"
    },
    {
      name: "Zillow Mortgage Calculator",
      description: "Calculate mortgage payments",
      url: "/zillow-mortgage-calculator"
    }
  ];

  const advancedFeatures = [
    {
      title: "Cash Flow Analysis",
      description: "Calculate monthly and annual cash flow",
      icon: FaChartBar
    },
    {
      title: "Market Comparison",
      description: "Compare ROI across different properties",
      icon: FaLightbulb
    },
    {
      title: "Tax Impact",
      description: "Understand tax implications on returns",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Research local market conditions thoroughly",
    "Consider all expenses, including maintenance",
    "Factor in property management costs",
    "Account for potential vacancies",
    "Understand local rental laws",
    "Consider property appreciation potential",
    "Evaluate tax implications",
    "Have a cash reserve for emergencies"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Zillow ROI Calculator",
    "description": "Calculate real estate investment returns. Analyze property ROI, cash flow, and investment potential with our comprehensive calculator.",
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
    
    title: "Zillow ROI Calculator 2024 - Calculate Real Estate Returns",
    path: "/zillow-roi-calculator",
    description: "Free online real estate ROI calculator. Calculate property investment returns, analyze cash flow, and evaluate investment potential with our comprehensive calculator.",
    keywords: "real estate roi calculator, property investment calculator, real estate return calculator, investment analysis calculator, property roi calculator, real estate investment calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/zillow-roi-calculator",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Zillow ROI Calculator</h1>
            <p className="text-lg text-gray-600">
              Calculate your return on investment for Zillow properties. Analyze potential profits and make informed real estate investment decisions.
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-y-10 gap-x-16">
            <div className="space-y-10">
              <Card className="shadow-xl p-6 sm:p-8 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">Zillow ROI Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaInfoCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          This calculator helps you estimate the return on investment for Zillow properties. Use it to analyze potential profits and make informed real estate investment decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <ZillowRoiCalculator />
                </CardContent>
              </Card>
              
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
                  Understanding Real Estate ROI
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">ROI Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">ROI = ((Net Profit + Appreciation) / Total Investment) × 100</p>
                    <p className="text-sm text-gray-600 mt-2">Where: Net Profit = Income - Expenses, Total Investment = Purchase Price + Closing Costs + Renovations</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Purchase Price:</strong> Initial property cost</li>
                    <li><strong>Closing Costs:</strong> Fees and expenses at purchase</li>
                    <li><strong>Renovations:</strong> Improvement costs</li>
                    <li><strong>Rental Income:</strong> Monthly rental revenue</li>
                    <li><strong>Operating Expenses:</strong> Ongoing costs</li>
                    <li><strong>Appreciation:</strong> Property value increase</li>
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
            
            <div className="space-y-6 lg:sticky lg:top-8">
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <FaMoneyCheckAlt className="mr-2 text-blue-600" />
                  Investment Tips
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

export default ZillowRoiCalculatorPage; 