import React from "react";
import OddsCalculator from "@/components/calculators/odds/OddsCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "../components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const OddsCalculatorPage = () => {
  const faqs = [
    {
      question: "What are betting odds?",
      answer: "Betting odds represent the probability of an event occurring and determine potential payouts. They can be displayed in different formats: American (+150), Decimal (2.50), or Fractional (3/2)."
    },
    {
      question: "How do I convert between different odds formats?",
      answer: "American to Decimal: For positive odds, divide by 100 and add 1. For negative odds, divide 100 by the absolute value and add 1. Decimal to Fractional: Subtract 1 and convert to fraction. Fractional to Decimal: Divide numerator by denominator and add 1."
    },
    {
      question: "What is implied probability?",
      answer: "Implied probability is the conversion of betting odds into a percentage that represents the likelihood of an outcome. It's calculated by converting the odds into a percentage and can help identify value bets."
    },
    {
      question: "How do I calculate potential winnings?",
      answer: "For American odds: Positive odds show profit on $100 bet, negative odds show bet needed for $100 profit. For Decimal odds: Multiply stake by odds. For Fractional odds: Multiply stake by numerator and divide by denominator."
    },
    {
      question: "What is a value bet?",
      answer: "A value bet occurs when the probability of an outcome is higher than what the odds suggest. It's when you believe the true probability is better than the implied probability from the odds."
    }
  ];

  const tips = [
    "Understand different odds formats",
    "Calculate implied probabilities",
    "Look for value bets",
    "Consider multiple bookmakers",
    "Track your betting history",
    "Set a betting budget",
    "Understand risk vs reward",
    "Learn about odds movement"
  ];

  const advancedFeatures = [
    {
      title: "Odds Conversion",
      description: "Convert between different odds formats",
      icon: FaChartBar
    },
    {
      title: "Probability Analysis",
      description: "Calculate implied probabilities",
      icon: FaChartLine
    },
    {
      title: "Value Bet Finder",
      description: "Identify potential value bets",
      icon: FaLightbulb
    },
    {
      title: "Betting History",
      description: "Track your betting performance",
      icon: FaBook
    }
  ];

  const relatedCalculators = [
    {
      name: "Parlay Calculator",
      description: "Calculate parlay odds and payouts",
      url: "/parlay"
    },
    {
      name: "Arbitrage Calculator",
      description: "Find arbitrage opportunities",
      url: "/arbitrage"
    },
    {
      name: "Kelly Criterion Calculator",
      description: "Calculate optimal bet sizes",
      url: "/kelly-criterion"
    },
    {
      name: "Expected Value Calculator",
      description: "Calculate expected value of bets",
      url: "/expected-value"
    }
  ];

  useSeo({
    
    
    title: "Odds Calculator - Convert and Calculate Betting Odds",
    canonical: "/odds",
    path: "/odds",
    description: "Convert between different odds formats, calculate implied probabilities, and find value bets with our comprehensive odds calculator.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "Odds Calculator",
      "description": "Convert and calculate betting odds.",
      "url": "https://financeloancalc.com/odds"
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Odds Calculator</h1>
        <p className="text-lg text-gray-600">Convert between different odds formats, calculate implied probabilities, and find value bets with our comprehensive odds calculator.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Odds Calculator
            </h2>
            <OddsCalculator />
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
              Understanding Betting Odds
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Odds Formats</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>American Odds:</strong> +150 or -150 format</li>
                <li><strong>Decimal Odds:</strong> 2.50 format</li>
                <li><strong>Fractional Odds:</strong> 3/2 format</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Conversion Formulas</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">American to Decimal: Positive: (odds/100) + 1, Negative: (100/|odds|) + 1</p>
                <p className="font-mono text-lg">Decimal to American: Positive: (odds-1) × 100, Negative: -100/(odds-1)</p>
                <p className="font-mono text-lg">Implied Probability: 1/Decimal Odds × 100</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Concepts</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Implied Probability:</strong> The probability suggested by the odds</li>
                <li><strong>Value Betting:</strong> Finding odds that are better than true probability</li>
                <li><strong>Overround:</strong> Bookmaker's built-in margin</li>
                <li><strong>Odds Movement:</strong> How odds change over time</li>
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
              Betting Tips
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
      <footer />
    </div>
  );
};

export default OddsCalculatorPage;
