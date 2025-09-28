import React from "react";
import CitBankHighYieldSavingsCalculator from "@/components/calculators/cithighyield/CitBankHighYieldSavingsCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaMoneyCheckAlt, FaBook, FaLink, FaLightbulb, FaChartBar } from "react-icons/fa";

const CitBankHighYieldSavingsCalculatorPage = () => {
  const faqs = [
    {
      question: "What is a High Yield Savings Account?",
      answer: "A High Yield Savings Account is a type of savings account that offers a higher interest rate than traditional savings accounts. CIT Bank's High Yield Savings Account typically offers competitive rates with daily compounding interest."
    },
    {
      question: "How does the interest rate compare to regular savings accounts?",
      answer: "CIT Bank's High Yield Savings Account typically offers rates that are significantly higher than traditional savings accounts. While regular savings accounts might offer 0.01% to 0.05% APY, high yield accounts can offer rates 10-20 times higher."
    },
    {
      question: "Are there any fees or minimum balance requirements?",
      answer: "CIT Bank's High Yield Savings Account typically requires a minimum opening deposit of $100. There are usually no monthly maintenance fees, but check current terms as they may change. The calculator helps you understand the impact of these requirements."
    },
    {
      question: "How often is interest compounded?",
      answer: "CIT Bank compounds interest daily on their High Yield Savings Account, which is reflected in the APY. This means you earn interest on your interest, helping your savings grow faster than with less frequent compounding."
    },
    {
      question: "Is my money safe in a High Yield Savings Account?",
      answer: "Yes, CIT Bank is FDIC insured, which means your deposits are protected up to $250,000 per depositor, per account type. This makes it as safe as a traditional savings account while offering higher returns."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Initial Deposit",
      text: "Input your starting balance for the High Yield Savings Account.",
      url: "#initial-deposit"
    },
    {
      name: "Set Monthly Contributions",
      text: "Specify how much you plan to add each month (if any).",
      url: "#monthly-contributions"
    },
    {
      name: "Choose Time Period",
      text: "Select how long you plan to keep your money in the account.",
      url: "#time-period"
    },
    {
      name: "View Growth Projection",
      text: "See your projected balance and interest earned over time.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Savings Calculator",
      description: "Calculate general savings growth and returns",
      url: "/savings-calculator"
    },
    {
      name: "CD Calculator",
      description: "Compare CD rates and terms",
      url: "/cd-calculator"
    },
    {
      name: "Money Market Calculator",
      description: "Calculate money market account returns",
      url: "/money-market-calculator"
    },
    {
      name: "Investment Calculator",
      description: "Calculate investment returns and growth",
      url: "/investment-calculator"
    }
  ];

  const advancedFeatures = [
    {
      title: "Growth Analysis",
      description: "Detailed breakdown of your savings growth",
      icon: FaChartBar
    },
    {
      title: "Rate Comparison",
      description: "Compare with other savings options",
      icon: FaMoneyCheckAlt
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different contribution strategies",
      icon: FaLightbulb
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Set up automatic monthly transfers to maximize your savings",
    "Compare rates regularly as they can change",
    "Consider your emergency fund needs when planning contributions",
    "Take advantage of promotional rates when available",
    "Keep track of FDIC insurance limits",
    "Consider tax implications of interest earnings",
    "Review account terms and conditions regularly"
  ];

  // Generate schema markup
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CIT Bank High Yield Savings Calculator",
    "description": "Calculate potential earnings with CIT Bank's High Yield Savings Account. Compare rates, estimate growth, and plan your savings strategy.",
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
    
    
    title: "CIT Bank High Yield Savings Calculator 2024 - Calculate Your Returns",
    canonical: "/cit-high-yield-savings",
    path: "/cit-high-yield-savings",
    description: "Calculate potential earnings with CIT Bank's High Yield Savings Account. Compare rates, estimate growth, and plan your savings strategy. Free savings calculator.",
    keywords: "cit bank high yield savings calculator, high yield savings calculator, cit bank calculator, savings account calculator, interest calculator, apy calculator",
    schemaMarkup: [schemaMarkup],
    canonical: "/cit-high-yield-savings-calculator",
    type: "tool"
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">CIT Bank High Yield Savings Calculator</h1>
        <p className="text-lg text-gray-600">Calculate potential earnings with CIT Bank's High Yield Savings Account. Compare rates, estimate growth, and plan your savings strategy.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              High Yield Savings Calculator
            </h2>
            <CitBankHighYieldSavingsCalculator />
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

export default CitBankHighYieldSavingsCalculatorPage;
