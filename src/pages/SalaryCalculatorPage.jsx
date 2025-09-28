import React from "react";
import SalaryCalculator from "@/components/calculators/salary/SalaryCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const SalaryCalculatorPage = () => {
  const faqs = [
    {
      question: "How do I convert hourly wage to annual salary?",
      answer: "Multiply your hourly wage by the number of hours you work per week, then multiply by 52 weeks per year. For example: $20/hour × 40 hours/week × 52 weeks = $41,600/year."
    },
    {
      question: "What's the difference between gross and net salary?",
      answer: "Gross salary is your total earnings before deductions, while net salary (take-home pay) is what you receive after taxes, insurance, and other deductions are subtracted."
    },
    {
      question: "How do benefits affect my total compensation?",
      answer: "Benefits like health insurance, retirement contributions, and paid time off add significant value to your total compensation package. They can increase your total compensation by 20-40% beyond your base salary."
    },
    {
      question: "What are common salary negotiation strategies?",
      answer: "Research market rates, highlight your value, consider total compensation, be prepared to walk away, and negotiate based on data rather than emotions."
    },
    {
      question: "How often should I review my salary?",
      answer: "Review your salary annually, especially during performance reviews. Consider market rates, inflation, and your contributions to the company when evaluating if your compensation is competitive."
    },
    {
      question: "What factors affect salary ranges?",
      answer: "Location, industry, experience level, education, skills, company size, and market demand all influence salary ranges. Urban areas and high-demand industries typically offer higher salaries."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Current Salary",
      text: "Input your current salary or hourly wage.",
      url: "#salary-form"
    },
    {
      name: "Select Pay Frequency",
      text: "Choose how often you're paid (hourly, weekly, monthly, etc.).",
      url: "#frequency-form"
    },
    {
      name: "Add Benefits",
      text: "Include any additional compensation or benefits.",
      url: "#benefits-form"
    },
    {
      name: "Review Results",
      text: "See your converted salary and total compensation.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Salary Calculator",
      description: "Calculate your take-home pay",
      url: "/salary"
    },
    {
      name: "Debt Payoff Calculator",
      description: "Plan your debt repayment",
      url: "/debt-payoff"
    },
    {
      name: "Savings Calculator",
      description: "Plan your savings goals",
      url: "/savings"
    },
    {
      name: "Cost of Living Calculator",
      description: "Compare living costs by location",
      url: "/cost-of-living"
    }
  ];

  const advancedFeatures = [
    {
      title: "Multiple Conversions",
      description: "Convert between hourly, weekly, monthly, and annual pay",
      icon: FaChartBar
    },
    {
      title: "Benefits Analysis",
      description: "Calculate total compensation including benefits",
      icon: FaLightbulb
    },
    {
      title: "Market Comparison",
      description: "Compare your salary to industry averages",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Research market rates for your position",
    "Consider total compensation, not just salary",
    "Factor in cost of living differences",
    "Negotiate based on your value",
    "Review your compensation annually"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Salary Calculator",
    "description": "Convert between hourly, weekly, monthly, and annual salaries. Calculate total compensation including benefits and compare to market rates.",
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
    
    title: "Salary Calculator 2024 - Convert Hourly to Annual Salary",
    path: "/salary",
    description: "Free online salary calculator. Convert between hourly, weekly, monthly, and annual salaries. Calculate total compensation and compare to market rates.",
    keywords: "salary calculator, hourly to salary calculator, annual salary calculator, wage calculator, salary converter, salary comparison, compensation calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/salary",
    type: "tool"
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Salary Calculator</h1>
            <p className="text-lg text-gray-600">Convert between hourly, weekly, monthly, and annual salaries. Calculate total compensation and compare to market rates.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <FaCalculator className="mr-2 text-blue-600" />
                  Salary Calculator
                </h2>
                <SalaryCalculator />
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
                  Understanding Salary Calculations
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">Salary Conversion Formulas</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Annual Salary = Hourly Rate × Hours per Week × 52 weeks</p>
                    <p className="font-mono text-lg mt-2">Monthly Salary = Annual Salary ÷ 12</p>
                    <p className="font-mono text-lg mt-2">Weekly Salary = Annual Salary ÷ 52</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Base Salary:</strong> Your core compensation</li>
                    <li><strong>Benefits:</strong> Health insurance, retirement, etc.</li>
                    <li><strong>Bonuses:</strong> Performance-based compensation</li>
                    <li><strong>Stock Options:</strong> Equity compensation</li>
                    <li><strong>Other Perks:</strong> Additional benefits and allowances</li>
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
                  Salary Tips
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

export default SalaryCalculatorPage; 