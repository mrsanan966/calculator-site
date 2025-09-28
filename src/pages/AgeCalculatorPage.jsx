import React from 'react';
import AgeCalculator from '@/components/calculators/age/AgeCalculator';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaBirthdayCake, FaBook, FaLink, FaLightbulb, FaChartBar, FaCalendarAlt } from "react-icons/fa";

const AgeCalculatorPage = () => {
  const faqs = [
    {
      question: "How is age calculated?",
      answer: "Age is calculated by finding the difference between the current date and the birth date. The calculator considers years, months, and days to provide a precise age calculation."
    },
    {
      question: "What is the difference between chronological age and biological age?",
      answer: "Chronological age is the number of years since birth, while biological age refers to how old your body appears based on various health factors. They may differ based on lifestyle and health conditions."
    },
    {
      question: "How do leap years affect age calculation?",
      answer: "Leap years add an extra day (February 29) every four years. Our calculator automatically accounts for leap years to ensure accurate age calculations."
    },
    {
      question: "Can I calculate age in different units?",
      answer: "Yes, the calculator can show age in years, months, days, weeks, hours, and even minutes. This helps you understand your age in different time units."
    },
    {
      question: "How accurate is the age calculation?",
      answer: "The age calculation is precise to the day, taking into account the exact number of days between dates, including leap years and varying month lengths."
    }
  ];

  const tips = [
    "Use exact birth date for accuracy",
    "Consider time zones if relevant",
    "Account for leap years",
    "Check age requirements",
    "Track milestone birthdays",
    "Calculate age differences",
    "Plan age-based events",
    "Monitor age-related changes"
  ];

  const advancedFeatures = [
    {
      title: "Age Comparison",
      description: "Compare ages between people",
      icon: FaChartBar
    },
    {
      title: "Milestone Tracking",
      description: "Track important birthdays",
      icon: FaChartLine
    },
    {
      title: "Age Statistics",
      description: "View age demographics",
      icon: FaLightbulb
    },
    {
      title: "Age History",
      description: "Track age changes over time",
      icon: FaBook
    }
  ];

  const relatedCalculators = [
    {
      name: "Date Calculator",
      description: "Calculate date differences",
      url: "/date"
    },
    {
      name: "Time Calculator",
      description: "Calculate time differences",
      url: "/time"
    }
  ];

  useSeo({
    
    title: "Age Calculator - Calculate Your Exact Age",
    canonical: "/age",
    description: "Calculate your exact age in years, months, and days. Find out how old you are and track important age milestones with our comprehensive age calculator.",
    path: "/age",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "Age Calculator",
      "description": "Calculate exact age and age differences.",
      "url": "https://financeloancalc.com/age"
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Age Calculator</h1>
        <p className="text-lg text-gray-600">Calculate your exact age in years, months, and days. Find out how old you are and track important age milestones with our comprehensive age calculator.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Age Calculator
            </h2>
            <AgeCalculator />
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
              Understanding Age Calculation
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Age Components</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Years:</strong> Full calendar years since birth</li>
                <li><strong>Months:</strong> Remaining months after years</li>
                <li><strong>Days:</strong> Remaining days after months</li>
                <li><strong>Total Days:</strong> Total days since birth</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Age Calculation Method</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Age = Current Date - Birth Date</p>
                <p className="text-sm text-gray-600 mt-2">The calculation considers:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Leap years (every 4 years)</li>
                  <li>Month lengths (28-31 days)</li>
                  <li>Time zone differences</li>
                </ul>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Common Age Milestones</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>18:</strong> Legal adulthood</li>
                <li><strong>21:</strong> Legal drinking age</li>
                <li><strong>65:</strong> Retirement age</li>
                <li><strong>100:</strong> Centenarian</li>
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
              <FaBirthdayCake className="mr-2 text-blue-600" />
              Age Tips
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

export default AgeCalculatorPage;
  