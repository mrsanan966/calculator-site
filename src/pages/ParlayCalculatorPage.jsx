import React from "react";
import ParlayCalculator from "@/components/calculators/parlay/ParlayCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "../components/Footer";
import { FaCalculator, FaQuestionCircle, FaChartLine, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaMoneyCheckAlt } from "react-icons/fa";

const ParlayCalculatorPage = () => {
  const faqs = [
    {
      question: "What is a parlay bet?",
      answer: "A parlay bet combines multiple individual bets into one wager. All selections must win for the parlay to be successful. The potential payout is higher than individual bets, but the risk is also greater."
    },
    {
      question: "How are parlay odds calculated?",
      answer: "Parlay odds are calculated by multiplying the decimal odds of each selection together. For example, if you have three selections with odds of 2.0, 1.5, and 1.8, the parlay odds would be 2.0 × 1.5 × 1.8 = 5.4."
    },
    {
      question: "What is the difference between a parlay and a single bet?",
      answer: "A single bet is a wager on one outcome, while a parlay combines multiple bets. Parlays offer higher potential payouts but require all selections to win. Single bets have lower payouts but better chances of winning."
    },
    {
      question: "Can I include different types of bets in a parlay?",
      answer: "Yes, you can combine different types of bets in a parlay, such as moneyline, spread, and over/under bets. However, some sportsbooks may have restrictions on certain combinations."
    },
    {
      question: "What happens if one selection in my parlay is a push?",
      answer: "If one selection in your parlay is a push (tie), that selection is removed from the parlay, and the odds are recalculated based on the remaining selections. Your stake remains the same."
    }
  ];

  const tips = [
    "Start with smaller parlays",
    "Research each selection thoroughly",
    "Consider correlated parlays carefully",
    "Understand the increased risk",
    "Set a parlay budget",
    "Track your parlay history",
    "Compare odds across bookmakers",
    "Consider hedging opportunities"
  ];

  const advancedFeatures = [
    {
      title: "Multi-Leg Analysis",
      description: "Analyze different parlay combinations",
      icon: FaChartBar
    },
    {
      title: "Risk Assessment",
      description: "Evaluate parlay risk levels",
      icon: FaChartLine
    },
    {
      title: "Correlation Checker",
      description: "Identify correlated selections",
      icon: FaLightbulb
    },
    {
      title: "Performance Tracking",
      description: "Track parlay success rates",
      icon: FaBook
    }
  ];

  const relatedCalculators = [
    {
      name: "Odds Calculator",
      description: "Calculate betting odds",
      url: "/odds"
    }
  ];

  useSeo({
    
    
    title: "Parlay Calculator - Calculate Multi-Leg Bet Returns",
    canonical: "/parlay",
    path: "/parlay",
    description: "Calculate potential returns on parlay bets. Combine multiple selections and see your potential winnings with our comprehensive parlay calculator.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "CalculatorPage",
      "name": "Parlay Calculator",
      "description": "Calculate returns on parlay bets.",
      "url": "https://financeloancalc.com/parlay"
    }
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs />
      
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Parlay Calculator</h1>
        <p className="text-lg text-gray-600">Calculate potential returns on parlay bets. Combine multiple selections and see your potential winnings with our comprehensive parlay calculator.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FaCalculator className="mr-2 text-blue-600" />
              Parlay Calculator
            </h2>
            <ParlayCalculator />
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
              Understanding Parlay Bets
            </h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mt-6 mb-3">Parlay Basics</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Multiple Selections:</strong> Combine 2 or more bets</li>
                <li><strong>All Must Win:</strong> All selections must be correct</li>
                <li><strong>Higher Payouts:</strong> Multiplied odds increase potential returns</li>
                <li><strong>Higher Risk:</strong> One loss means entire parlay loses</li>
              </ul>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Parlay Calculation</h3>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-mono text-lg">Parlay Odds = Selection 1 × Selection 2 × Selection 3 × ...</p>
                <p className="font-mono text-lg">Potential Return = Stake × Parlay Odds</p>
                <p className="text-sm text-gray-600 mt-2">Example: $100 bet on 3 selections with odds 2.0, 1.5, and 1.8 = $100 × (2.0 × 1.5 × 1.8) = $540</p>
              </div>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Types of Parlays</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Same Game Parlay:</strong> Multiple bets on same event</li>
                <li><strong>Cross Sport Parlay:</strong> Bets across different sports</li>
                <li><strong>Teaser Parlay:</strong> Modified point spreads</li>
                <li><strong>Pleaser Parlay:</strong> Increased point spreads</li>
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
              Parlay Tips
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

export default ParlayCalculatorPage;
