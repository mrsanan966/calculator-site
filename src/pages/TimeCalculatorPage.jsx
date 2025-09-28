import React from 'react';
import TimeCalculator from '@/components/calculators/time/TimeCalculator';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaClock, FaBook, FaLink, FaLightbulb, FaChartBar, FaHourglassHalf } from "react-icons/fa";

const TimeCalculatorPage = () => {
  const faqs = [
    {
      question: "How do I calculate time differences?",
      answer: "Enter the start and end times in the calculator. The tool will automatically calculate the difference in hours, minutes, and seconds between the times."
    },
    {
      question: "How do I handle time zones?",
      answer: "The calculator can convert between different time zones. Simply select the time zones for your start and end times, and the calculator will handle the conversion automatically."
    },
    {
      question: "Can I calculate time durations?",
      answer: "Yes, you can calculate how long an event or activity will take by entering the start and end times. The calculator will show the duration in hours, minutes, and seconds."
    },
    {
      question: "How do I add or subtract time?",
      answer: "Enter a base time and the amount of time you want to add or subtract. The calculator will show you the resulting time, taking into account 24-hour format and day changes."
    },
    {
      question: "What time formats are supported?",
      answer: "The calculator supports both 12-hour (AM/PM) and 24-hour formats. You can choose your preferred format in the settings."
    }
  ];

  const tips = [
    "Use clear time formats",
    "Consider time zones",
    "Account for day changes",
    "Check AM/PM",
    "Plan for time differences",
    "Track durations",
    "Calculate intervals",
    "Use time ranges"
  ];

  const advancedFeatures = [
    {
      title: "Time Zones",
      description: "Convert between time zones",
      icon: FaChartBar
    },
    {
      title: "Time Ranges",
      description: "Calculate time spans",
      icon: FaChartLine
    },
    {
      title: "Duration Calculator",
      description: "Calculate time durations",
      icon: FaLightbulb
    },
    {
      title: "Time History",
      description: "Track time changes",
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
      name: "Age Calculator",
      description: "Calculate age from dates",
      url: "/age"
    },
    {
      name: "Business Hours Calculator",
      description: "Calculate working hours",
      url: "/business-hours"
    },
    {
      name: "Time Zone Converter",
      description: "Convert between time zones",
      url: "/time-zone"
    }
  ];

  useSeo({
    
    
    title: "Time Calculator - Calculate Time Differences",
    canonical: "/time",
    path: "/time",
    description: "Calculate time differences, add or subtract time, and convert between time zones. Our comprehensive time calculator helps you manage time effectively.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "Time Calculator",
      "description": "Calculate time differences and durations.",
      "url": "https://financeloancalc.com/time"
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Time Calculator</h1>
            <p className="text-lg text-gray-600">Calculate time differences, add or subtract time, and convert between time zones. Our comprehensive time calculator helps you manage time effectively.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Time Calculator
                </h2>
                <TimeCalculator />
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
                  Understanding Time Calculations
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">Time Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Hours:</strong> 24-hour format</li>
                    <li><strong>Minutes:</strong> 0-59 minutes</li>
                    <li><strong>Seconds:</strong> 0-59 seconds</li>
                    <li><strong>AM/PM:</strong> 12-hour format</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Time Calculation Methods</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Time Difference = End Time - Start Time</p>
                    <p className="text-sm text-gray-600 mt-2">The calculation considers:</p>
                    <ul className="list-disc pl-5 mt-2">
                      <li>24-hour format</li>
                      <li>Day changes</li>
                      <li>Time zone differences</li>
                      <li>AM/PM conversion</li>
                    </ul>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Common Time Calculations</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Time Difference:</strong> Hours between times</li>
                    <li><strong>Duration:</strong> Length of time period</li>
                    <li><strong>Time Addition:</strong> Add hours to time</li>
                    <li><strong>Time Subtraction:</strong> Subtract hours from time</li>
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
                  <FaClock className="mr-2 text-blue-600" />
                  Time Tips
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

export default TimeCalculatorPage;
  