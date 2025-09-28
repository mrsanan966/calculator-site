import React from "react";
import GrossMarginCalculator from "@/components/calculators/grossmargin/GrossMarginCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaIndustry, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const GrossMarginCalculatorPage = () => {
  const faqs = [
    {
      question: "What is gross margin and why is it important?",
      answer: "Gross margin is the difference between revenue and cost of goods sold (COGS), expressed as a percentage. It's crucial for measuring a company's production efficiency and pricing strategy."
    },
    {
      question: "What's the difference between gross margin and profit margin?",
      answer: "Gross margin only considers COGS, while profit margin includes all expenses. Gross margin shows production efficiency, while profit margin shows overall business profitability."
    },
    {
      question: "What is a good gross margin percentage?",
      answer: "Good gross margins vary by industry. Generally, 50%+ is excellent, 30-50% is good, and below 30% might need improvement. Compare with industry benchmarks for context."
    },
    {
      question: "How can I improve my gross margin?",
      answer: "You can improve gross margin by increasing prices, reducing production costs, optimizing inventory, improving supplier relationships, and focusing on higher-margin products."
    },
    {
      question: "How often should I calculate gross margin?",
      answer: "Calculate gross margin monthly as part of regular financial reporting. More frequent calculations can help identify trends and make timely adjustments to pricing or costs."
    },
    {
      question: "How does seasonality affect gross margin?",
      answer: "Seasonality can significantly impact gross margins due to fluctuating demand, inventory costs, and pricing strategies. Businesses should analyze seasonal patterns to optimize pricing and inventory management throughout the year."
    },
    {
      question: "What are common mistakes when calculating gross margin?",
      answer: "Common mistakes include: not including all direct costs in COGS, mixing up gross margin with net margin, using incorrect revenue figures, and not accounting for returns or discounts properly."
    },
    {
      question: "How do I calculate gross margin for a service business?",
      answer: "For service businesses, COGS typically includes direct labor costs, materials used in service delivery, and any subcontractor costs. Revenue is your total service fees before any deductions."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Revenue and COGS",
      text: "Input your total revenue and cost of goods sold (COGS) for the period.",
      url: "#calculator-form"
    },
    {
      name: "View Results",
      text: "See your gross profit, gross margin percentage, and markup percentage.",
      url: "#results"
    },
    {
      name: "Analyze and Compare",
      text: "Compare your results with industry benchmarks and historical data.",
      url: "#analysis"
    },
    {
      name: "Track Historical Data",
      text: "Monitor your gross margin trends over time to identify patterns and opportunities.",
      url: "#historical-analysis"
    },
    {
      name: "Set Improvement Goals",
      text: "Establish target margins based on industry benchmarks and business objectives.",
      url: "#goal-setting"
    }
  ];

  const calculatorInputs = [
    { 
      name: "Revenue", 
      description: "Total sales or revenue for the period",
      unit: "USD",
      required: true
    },
    { 
      name: "Cost of Goods Sold (COGS)", 
      description: "Direct costs attributable to production",
      unit: "USD",
      required: true
    }
  ];

  const calculatorOutputs = [
    { 
      name: "Gross Profit", 
      description: "Revenue minus COGS",
      unit: "USD"
    },
    { 
      name: "Gross Margin", 
      description: "Gross profit as a percentage of revenue",
      unit: "%"
    },
    { 
      name: "Markup Percentage", 
      description: "Profit as a percentage of COGS",
      unit: "%"
    }
  ];

  // Industry benchmarks (simplified)
  const industryBenchmarks = [
    { industry: "Software (SaaS)", margin: "70-90%" },
    { industry: "Pharmaceuticals", margin: "65-80%" },
    { industry: "Consumer Electronics", margin: "30-45%" },
    { industry: "Retail (General)", margin: "20-30%" },
    { industry: "Grocery Stores", margin: "20-25%" },
    { industry: "Airlines", margin: "10-15%" },
    { industry: "Automotive", margin: "15-20%" },
  ];

  const relatedCalculators = [
    {
      name: "Profit Margin Calculator",
      description: "Calculate overall profitability",
      url: "/profit-margin"
    },
    {
      name: "Markup Calculator",
      description: "Calculate product markup",
      url: "/markup"
    },
    {
      name: "Break-Even Calculator",
      description: "Find your break-even point",
      url: "/break-even"
    },
    {
      name: "ROI Calculator",
      description: "Calculate return on investment",
      url: "/roi"
    }
  ];

  const tips = [
    "Compare with industry benchmarks",
    "Track margin trends over time",
    "Analyze product-specific margins",
    "Review pricing strategy regularly",
    "Monitor production costs",
    "Optimize inventory management",
    "Negotiate with suppliers",
    "Focus on high-margin products"
  ];

  const advancedFeatures = [
    {
      title: "Margin Analysis",
      description: "Analyze different product margins",
      icon: FaChartBar
    },
    {
      title: "Trend Tracking",
      description: "Monitor margin trends over time",
      icon: FaChartLine
    },
    {
      title: "Scenario Planning",
      description: "Model different pricing scenarios",
      icon: FaLightbulb
    },
    {
      title: "Export Reports",
      description: "Generate detailed reports",
      icon: FaBook
    }
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Gross Margin Calculator",
    "description": "Calculate gross margin percentage, gross profit, and markup for your business. Analyze pricing strategies and compare with industry benchmarks.",
    "applicationCategory": "BusinessApplication",
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
    
    title: "Gross Margin Calculator - Calculate Business Gross Margins",
    path: "/gross-margin",
    description: "Calculate gross margin percentage and analyze your business's production efficiency and pricing strategy.",
    keywords: "gross margin calculator, gross profit calculator, margin calculator, profit margin calculator, business calculator, financial calculator, pricing calculator, COGS calculator, markup calculator, business profitability",
    schemaMarkup: [schemaMarkup],
    canonical: "/gross-margin",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Gross Margin Calculator</h1>
        <p className="text-lg text-gray-600">Calculate gross margin percentage and analyze your business's production efficiency and pricing strategy.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Gross Margin Calculator
            </h2>
            <GrossMarginCalculator />
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
              Understanding Gross Margin
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">What is Gross Margin?</h3>
              <p>Gross margin is a company's net sales revenue minus its cost of goods sold (COGS). It shows how much profit a company makes after paying off its direct costs of production.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Gross Margin Formula</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Gross Margin = ((Revenue - COGS) / Revenue) × 100</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Why Gross Margin Matters</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pricing Strategy:</strong> Helps determine optimal pricing for products/services</li>
                <li><strong>Cost Control:</strong> Identifies cost inefficiencies in production</li>
                <li><strong>Business Health:</strong> Indicates financial stability and efficiency</li>
                <li><strong>Investor Attraction:</strong> Higher margins are attractive to investors</li>
                <li><strong>Competitive Analysis:</strong> Allows comparison with industry peers</li>
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
              Business Tips
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
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <FaIndustry className="mr-2 text-blue-600" />
              Industry Benchmarks
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Industry</th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Typical Gross Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {industryBenchmarks.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-sm text-gray-700">{item.industry}</td>
                      <td className="px-4 py-2 text-right text-sm font-medium text-gray-900">{item.margin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">* Benchmarks are approximate and can vary by company size and market conditions.</p>
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
      <Footer />
    </div>
  );
};

export default GrossMarginCalculatorPage;
