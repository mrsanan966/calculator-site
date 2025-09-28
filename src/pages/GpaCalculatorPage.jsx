import React from 'react';
import GpaCalculator from '@/components/calculators/gpa/GpaCalculator';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaGraduationCap, FaBook, FaLink, FaLightbulb, FaChartBar, FaSchool } from "react-icons/fa";

const GpaCalculatorPage = () => {
  const faqs = [
    {
      question: "What is GPA and how is it calculated?",
      answer: "GPA (Grade Point Average) is a numerical representation of your academic performance. It's calculated by multiplying each course's grade points by its credit hours, summing these products, and dividing by the total credit hours."
    },
    {
      question: "What's the difference between weighted and unweighted GPA?",
      answer: "Unweighted GPA uses a standard 4.0 scale where A=4.0, B=3.0, etc. Weighted GPA gives extra points for honors, AP, or IB courses, often using a 5.0 scale for these advanced courses."
    },
    {
      question: "How do I convert letter grades to GPA?",
      answer: "Standard conversion: A=4.0, A-=3.7, B+=3.3, B=3.0, B-=2.7, C+=2.3, C=2.0, C-=1.7, D+=1.3, D=1.0, D-=0.7, F=0.0. Some schools may use slightly different scales."
    },
    {
      question: "What is a good GPA?",
      answer: "A good GPA varies by institution and program. Generally, 3.0-3.5 is considered good, 3.5-3.7 is very good, and 3.7-4.0 is excellent. For competitive programs, aim for 3.5 or higher."
    },
    {
      question: "How can I improve my GPA?",
      answer: "Focus on consistent study habits, attend all classes, seek help when needed, manage your time effectively, and consider retaking courses where you received low grades if your school allows it."
    },
    {
      question: "Do all schools use the same GPA scale?",
      answer: "No, different schools may use different scales. Some use 4.0, others use 5.0 for weighted GPAs, and some international schools use different scales entirely. Always check your institution's specific scale."
    }
  ];

  const howToSteps = [
    {
      name: "Add Your Courses",
      text: "Enter each course name, grade received, and credit hours.",
      url: "#calculator-form"
    },
    {
      name: "Select GPA Scale",
      text: "Choose your institution's GPA scale (4.0, 5.0, or custom).",
      url: "#gpa-scale"
    },
    {
      name: "View Results",
      text: "See your calculated GPA and grade point summary.",
      url: "#results"
    },
    {
      name: "Save or Export",
      text: "Save your calculations for future reference.",
      url: "#save"
    },
    {
      name: "Track Progress",
      text: "Monitor your GPA changes over time.",
      url: "#progress"
    }
  ];

  const relatedCalculators = [
    {
      name: "Grade Calculator",
      description: "Calculate your final grade based on assignments and exams",
      url: "/grade-calculator"
    },
    {
      name: "Percentage Calculator",
      description: "Calculate percentages for your grades",
      url: "/percentage-calculator"
    }
  ];

  const advancedFeatures = [
    {
      title: "Multiple GPA Scales",
      description: "Support for various GPA scales and grading systems",
      icon: FaSchool
    },
    {
      title: "Grade History",
      description: "Track your academic performance over time",
      icon: FaChartBar
    },
    {
      title: "What-If Analysis",
      description: "See how different grades would affect your GPA",
      icon: FaLightbulb
    },
    {
      title: "Export Results",
      description: "Save and share your GPA calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Check your school's specific GPA scale",
    "Keep track of all your grades",
    "Understand weighted vs. unweighted GPA",
    "Plan your course load strategically",
    "Monitor your GPA regularly",
    "Know your program's GPA requirements"
  ];

  const gradeScales = [
    { grade: "A+", points: "4.0", description: "Excellent" },
    { grade: "A", points: "4.0", description: "Excellent" },
    { grade: "A-", points: "3.7", description: "Excellent" },
    { grade: "B+", points: "3.3", description: "Good" },
    { grade: "B", points: "3.0", description: "Good" },
    { grade: "B-", points: "2.7", description: "Good" },
    { grade: "C+", points: "2.3", description: "Average" },
    { grade: "C", points: "2.0", description: "Average" },
    { grade: "C-", points: "1.7", description: "Average" },
    { grade: "D+", points: "1.3", description: "Below Average" },
    { grade: "D", points: "1.0", description: "Below Average" },
    { grade: "F", points: "0.0", description: "Failing" }
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GPA Calculator",
    "description": "Calculate your semester or cumulative GPA. Supports multiple grading scales and provides detailed grade point analysis.",
    "applicationCategory": "EducationalApplication",
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
    
    
    title: "GPA Calculator 2024 - Calculate Your Grade Point Average",
    canonical: "/gpa",
    path: "/gpa",
    description: "Free online GPA calculator. Calculate your semester or cumulative GPA. Supports multiple grading scales and provides detailed grade point analysis.",
    keywords: "gpa calculator, grade point average calculator, gpa calculator 4.0 scale, cumulative gpa calculator, semester gpa calculator, college gpa calculator, high school gpa calculator, weighted gpa calculator, unweighted gpa calculator, grade calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/gpa-calculator",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">GPA Calculator</h1>
        <p className="text-lg text-gray-600">Calculate your semester or cumulative GPA. Essential for students tracking their academic performance.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              GPA Calculator
            </h2>
      <GpaCalculator />
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
              Understanding GPA
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">What is GPA?</h3>
              <p>Grade Point Average (GPA) is a standardized way of measuring academic achievement. It provides a single number that represents your overall academic performance.</p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">GPA Formula</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">GPA = Σ(Grade Points × Credit Hours) ÷ Total Credit Hours</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Grade Point Scale</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Grade</th>
                      <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Points</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {gradeScales.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2 text-sm text-gray-700">{item.grade}</td>
                        <td className="px-4 py-2 text-center text-sm font-medium text-gray-900">{item.points}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
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
              <FaGraduationCap className="mr-2 text-blue-600" />
              Academic Success Tips
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

export default GpaCalculatorPage;
  