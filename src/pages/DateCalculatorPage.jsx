import React from "react";
import DateCalculator from "@/components/calculators/date/DateCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaCalendarAlt, FaBook, FaLink, FaLightbulb, FaChartBar, FaClock } from "react-icons/fa";

const DateCalculatorPage = () => {
  const faqs = [
    {
      question: "How do I calculate the difference between two dates?",
      answer: "Enter the start and end dates in the calculator. The tool will automatically calculate the difference in years, months, days, and total days between the dates."
    },
    {
      question: "How are date calculations affected by leap years?",
      answer: "Leap years (years divisible by 4, except century years not divisible by 400) add an extra day to February. Our calculator automatically accounts for leap years in all calculations."
    },
    {
      question: "Can I calculate future dates?",
      answer: "Yes, you can calculate dates in the future by adding days, weeks, months, or years to a start date. This is useful for planning events or tracking deadlines."
    },
    {
      question: "How do I calculate working days between dates?",
      answer: "The calculator can exclude weekends and holidays when calculating date differences. This is useful for business planning and project timelines."
    },
    {
      question: "What is the maximum date range I can calculate?",
      answer: "The calculator can handle dates from January 1, 1900, to December 31, 9999. This covers most practical date calculation needs."
    }
  ];

  const tips = [
    "Use clear date formats",
    "Consider time zones",
    "Account for leap years",
    "Check business days",
    "Plan for holidays",
    "Track deadlines",
    "Calculate milestones",
    "Use date ranges"
  ];

  const advancedFeatures = [
    {
      title: "Business Days",
      description: "Calculate working days",
      icon: FaChartBar
    },
    {
      title: "Date Ranges",
      description: "Calculate date spans",
      icon: FaChartLine
    },
    {
      title: "Holiday Calendar",
      description: "Track holidays",
      icon: FaLightbulb
    },
    {
      title: "Date History",
      description: "Track date changes",
      icon: FaBook
    }
  ];

  const relatedCalculators = [
    {
      name: "Age Calculator",
      description: "Calculate age from dates",
      url: "/age"
    },
    {
      name: "Time Calculator",
      description: "Calculate time differences",
      url: "/time"
    },
    {
      name: "Business Days Calculator",
      description: "Calculate working days",
      url: "/business-days"
    },
    {
      name: "Holiday Calculator",
      description: "Track holidays",
      url: "/holidays"
    }
  ];

  useSeo({
    
    
    title: "Date Calculator - Calculate Date Differences",
    canonical: "/date",
    path: "/date",
    description: "Calculate the difference between dates, add or subtract days, and plan future dates. Our comprehensive date calculator helps you manage time effectively.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "Date Calculator",
      "description": "Calculate date differences and future dates.",
      "url": "https://financeloancalc.com/date"
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Date Calculator</h1>
        <p className="text-lg text-gray-600">Calculate the difference between dates, add or subtract days, and plan future dates. Our comprehensive date calculator helps you manage time effectively.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Date Calculator
            </h2>
            <DateCalculator />
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
              Understanding Date Calculations
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Date Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Years:</strong> Full calendar years</li>
                <li><strong>Months:</strong> Calendar months</li>
                <li><strong>Days:</strong> Calendar days</li>
                <li><strong>Business Days:</strong> Excluding weekends</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Date Calculation Methods</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Date Difference = End Date - Start Date</p>
                <p className="text-sm text-gray-600 mt-2">The calculation considers:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Leap years (every 4 years)</li>
                  <li>Month lengths (28-31 days)</li>
                  <li>Weekend exclusions</li>
                  <li>Holiday calendars</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Common Date Calculations</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Date Difference:</strong> Days between dates</li>
                <li><strong>Future Date:</strong> Date after adding days</li>
                <li><strong>Past Date:</strong> Date after subtracting days</li>
                <li><strong>Business Days:</strong> Working days between dates</li>
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
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Date Tips
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
  );
};

export default DateCalculatorPage; 