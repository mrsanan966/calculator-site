import React from "react";
import CitBankCalculator from "@/components/calculators/citbank/CitBankCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaMoneyCheckAlt, FaBook, FaLink, FaLightbulb, FaChartBar } from "react-icons/fa";

const CitBankCalculatorPage = () => {
  const faqs = [
    {
      question: "What types of accounts can I calculate with the CIT Bank Calculator?",
      answer: "The calculator supports CIT Bank's High Yield Savings accounts, Money Market accounts, and Certificates of Deposit (CDs). Each account type has different interest rates and terms that affect your potential earnings."
    },
    {
      question: "How accurate are the interest rate calculations?",
      answer: "The calculator uses current CIT Bank rates, but these rates can change. For the most accurate results, verify current rates on CIT Bank's website before making decisions. The calculator provides estimates based on the rates you input."
    },
    {
      question: "What is the difference between APY and APR?",
      answer: "APY (Annual Percentage Yield) includes compound interest, while APR (Annual Percentage Rate) doesn't. CIT Bank uses APY for savings products, which gives you a more accurate picture of your potential earnings."
    },
    {
      question: "Can I calculate returns for multiple accounts?",
      answer: "Yes, you can use the calculator multiple times to compare different account types, deposit amounts, and terms. This helps you find the best savings strategy for your financial goals."
    },
    {
      question: "How often does CIT Bank compound interest?",
      answer: "CIT Bank compounds interest daily on most savings products, which is reflected in the APY. This means you earn interest on your interest, helping your savings grow faster."
    }
  ];

  const howToSteps = [
    {
      name: "Select Account Type",
      text: "Choose between High Yield Savings, Money Market, or CD accounts.",
      url: "#account-type"
    },
    {
      name: "Enter Deposit Details",
      text: "Input your initial deposit amount and monthly contribution (if any).",
      url: "#deposit"
    },
    {
      name: "Choose Investment Period",
      text: "Select how long you plan to save (in months or years).",
      url: "#period"
    },
    {
      name: "Review Growth Projection",
      text: "See your projected balance, total interest earned, and APY comparison.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Savings Calculator",
      description: "Calculate general savings growth and returns",
      url: "/savings"
    },
    {
      name: "Investment Growth Calculator",
      description: "Calculate investment returns and growth",
      url: "/investment-growth"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    },
    {
      name: "Cost of Living Calculator",
      description: "Calculate living expenses",
      url: "/cost-of-living"
    }
  ];

  const advancedFeatures = [
    {
      title: "Rate Comparison",
      description: "Compare different account types and terms",
      icon: FaChartBar
    },
    {
      title: "Growth Projection",
      description: "See your savings growth over time",
      icon: FaMoneyCheckAlt
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different savings strategies",
      icon: FaLightbulb
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Compare rates across different CIT Bank products to find the best option for your savings goals",
    "Consider setting up automatic monthly contributions to maximize your savings growth",
    "Use CDs for money you won't need immediately to take advantage of higher rates",
    "Keep an emergency fund in a High Yield Savings account for easy access",
    "Monitor rate changes and consider moving funds when better rates become available",
    "Take advantage of promotional rates and special offers when available",
    "Consider the impact of taxes on your interest earnings when planning your savings strategy"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CIT Bank Calculator",
    "description": "Calculate potential earnings with CIT Bank's competitive savings rates. Compare High Yield Savings, Money Market, and CD accounts to maximize your returns. Free savings growth calculator.",
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

  useSeo({
    
    
    title: "CIT Bank Calculator 2024 - Compare Savings Rates & Calculate Returns",
    canonical: "/cit-bank",
    path: "/cit-bank",
    description: "Calculate potential earnings with CIT Bank's competitive savings rates. Compare High Yield Savings, Money Market, and CD accounts to maximize your returns. Free savings growth calculator.",
    keywords: "cit bank calculator, cit bank savings calculator, cit bank interest calculator, cit bank apy calculator, cit bank cd calculator, cit bank money market calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/cit-bank-calculator",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">CIT Bank Calculator</h1>
        <p className="text-lg text-gray-600">Calculate potential earnings with CIT Bank's competitive savings rates. Compare High Yield Savings, Money Market, and CD accounts to maximize your returns.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              CIT Bank Calculator
            </h2>
            <CitBankCalculator />
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
          
          <section className="bg-white rounded-lg shadow-md p-6 mb-8" id="faq">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaQuestionCircle className="mr-2 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <div className="lg:col-span-1">
          <section className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaChartLine className="mr-2 text-blue-600" />
              Savings Tips
            </h2>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
          
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaLink className="mr-2 text-blue-600" />
              Related Calculators
            </h2>
            <div className="space-y-4">
              {relatedCalculators.map((calc, index) => (
                <a
                  key={index}
                  href={calc.url}
                  className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-semibold mb-1">{calc.name}</h3>
                  <p className="text-sm text-gray-600">{calc.description}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CitBankCalculatorPage;
