import React from "react";
import ProfitMarginCalculator from "@/components/calculators/profitmargin/ProfitMarginCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const ProfitMarginCalculatorPage = () => {
  const faqs = [
    {
      question: "What is profit margin and why is it important?",
      answer: "Profit margin is a financial metric that shows what percentage of revenue is converted into profit. It's crucial for measuring business performance, comparing companies, and making strategic decisions about pricing and costs."
    },
    {
      question: "What are the different types of profit margins?",
      answer: "There are three main types: Gross Profit Margin (revenue minus COGS), Operating Profit Margin (revenue minus operating expenses), and Net Profit Margin (revenue minus all expenses including taxes and interest)."
    },
    {
      question: "What is a good profit margin?",
      answer: "Good profit margins vary by industry. Generally, a net profit margin of 10% is considered healthy, but technology companies might have 20%+ margins while retail might be 2-5%. Always compare with industry benchmarks."
    },
    {
      question: "How can I improve my profit margin?",
      answer: "You can improve profit margins by increasing prices, reducing costs, improving operational efficiency, focusing on higher-margin products, and optimizing your product mix."
    },
    {
      question: "How often should I calculate profit margin?",
      answer: "Businesses should calculate profit margins monthly as part of regular financial reporting. More frequent calculations can help identify trends and make timely adjustments."
    }
  ];

  const tips = [
    "Compare margins with industry benchmarks",
    "Track margin trends over time",
    "Analyze different product/service margins",
    "Consider both short-term and long-term impacts",
    "Factor in all costs, including hidden expenses",
    "Review pricing strategy regularly",
    "Monitor competitor pricing",
    "Optimize your product mix"
  ];

  const advancedFeatures = [
    {
      title: "Margin Analysis",
      description: "Analyze different types of profit margins",
      icon: FaChartBar
    },
    {
      title: "Trend Tracking",
      description: "Monitor margin trends over time",
      icon: FaChartLine
    },
    {
      title: "Scenario Planning",
      description: "Model different pricing and cost scenarios",
      icon: FaLightbulb
    },
    {
      title: "Export Reports",
      description: "Generate detailed margin analysis reports",
      icon: FaBook
    }
  ];

  const relatedCalculators = [
    {
      name: "Business Loan Calculator",
      description: "Calculate business loan payments",
      url: "/loan"
    },
    {
      name: "ROI Calculator",
      description: "Calculate return on investment",
      url: "/zillow-roi-calculator"
    },
    {
      name: "Budget Calculator",
      description: "Plan your business budget",
      url: "/budget"
    },
    {
      name: "Investment Growth Calculator",
      description: "Calculate investment returns",
      url: "/investment-growth"
    }
  ];

  useSeo({
    
    
    title: "Profit Margin Calculator - Calculate Business Profit Margins",
    canonical: "/profit-margin",
    path: "/profit-margin",
    description: "Calculate gross, operating, and net profit margins for your business. Analyze pricing strategies and profitability.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "Profit Margin Calculator",
      "description": "Calculate and analyze business profit margins.",
      "url": "https://financeloancalc.com/profit-margin"
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Profit Margin Calculator</h1>
        <p className="text-lg text-gray-600">Calculate gross, operating, and net profit margins for your business. Analyze pricing strategies and profitability.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Profit Margin Calculator
            </h2>
            <ProfitMarginCalculator />
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
              Understanding Profit Margins
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Types of Profit Margins</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Gross Profit Margin:</strong> Revenue minus cost of goods sold (COGS)</li>
                <li><strong>Operating Profit Margin:</strong> Revenue minus operating expenses</li>
                <li><strong>Net Profit Margin:</strong> Revenue minus all expenses including taxes and interest</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Profit Margin Formula</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Profit Margin = (Net Profit / Revenue) × 100</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Industry Benchmarks</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Technology: 15-25%</li>
                <li>Retail: 2-5%</li>
                <li>Manufacturing: 5-10%</li>
                <li>Healthcare: 10-15%</li>
                <li>Financial Services: 15-20%</li>
              </ul>
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

export default ProfitMarginCalculatorPage;
