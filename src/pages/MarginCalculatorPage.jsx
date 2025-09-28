import React from "react";
import MarginCalculator from "@/components/calculators/business/MarginCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaMoneyBillWave, FaChartLine, FaCalculator, FaInfoCircle, FaPercent } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MarginCalculatorPage = () => {
  useSeo({
    
    
    title: "Margin Calculator - Calculate Profit Margins and Markups",
    canonical: "/margin",
    path: "/margin",
    description: "Calculate profit margins, markups, and pricing with our free margin calculator. Perfect for businesses to analyze profitability and set prices.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Profit Margins",
      "description": "Calculate profit margins and markups for your business.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Cost and Revenue",
          "text": "Input your cost and revenue to calculate profit margin.",
          "url": "https://financeloancalc.com/margin#cost-revenue"
        },
        {
          "@type": "HowToStep",
          "name": "Set Markup",
          "text": "Specify desired markup to calculate selling price.",
          "url": "https://financeloancalc.com/margin#markup"
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Margin",
          "text": "Use margin to determine required selling price.",
          "url": "https://financeloancalc.com/margin#margin"
        },
        {
          "@type": "HowToStep",
          "name": "Review Results",
          "text": "See profit, markup, and margin calculations.",
          "url": "https://financeloancalc.com/margin#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Cost" },
        { "@type": "HowToSupply", "name": "Revenue" },
        { "@type": "HowToSupply", "name": "Markup Percentage" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Margin Calculator" }],
      "totalTime": "PT2M"
    }
  });

  const faqs = [
    {
      question: "What is the difference between margin and markup?",
      answer: "Margin is the percentage of profit based on the selling price, while markup is the percentage added to the cost to determine the selling price. For example, a 50% markup on a $100 cost means a $150 selling price, resulting in a 33.33% margin."
    },
    {
      question: "How do I calculate profit margin?",
      answer: "Profit margin is calculated by dividing the profit (revenue minus cost) by the revenue and multiplying by 100. For example, if you sell a product for $150 that cost $100, your profit margin is (50/150) × 100 = 33.33%."
    },
    {
      question: "What is a good profit margin?",
      answer: "Good profit margins vary by industry. Generally, a 10% margin is considered good, while 20% or higher is excellent. However, some industries like retail might have lower margins (5-10%), while software companies might have much higher margins (50%+)."
    },
    {
      question: "How do I calculate markup?",
      answer: "Markup is calculated by dividing the profit (revenue minus cost) by the cost and multiplying by 100. For example, if you sell a product for $150 that cost $100, your markup is (50/100) × 100 = 50%."
    },
    {
      question: "What is the relationship between margin and markup?",
      answer: "Margin and markup are related but different. A 50% markup results in a 33.33% margin. The formula to convert markup to margin is: Margin = Markup / (1 + Markup). To convert margin to markup: Markup = Margin / (1 - Margin)."
    },
    {
      question: "How do I set the right price?",
      answer: "To set the right price, consider your costs, desired profit margin, market competition, and customer value perception. The calculator can help you determine the minimum price needed to achieve your target margin or markup."
    },
    {
      question: "What is gross margin?",
      answer: "Gross margin is the difference between revenue and cost of goods sold (COGS), expressed as a percentage of revenue. It shows how much profit you make before accounting for other expenses like overhead and taxes."
    },
    {
      question: "How do I improve my profit margin?",
      answer: "You can improve profit margins by reducing costs, increasing prices, improving efficiency, or adding value to justify higher prices. The calculator can help you analyze different scenarios to find the optimal pricing strategy."
    }
  ];

  const relatedCalculators = [
    {
      name: "Profit Margin Calculator",
      description: "Calculate profit margins",
      url: "/profit-margin"
    },
    {
      name: "Gross Margin Calculator",
      description: "Calculate gross margins",
      url: "/gross-margin"
    },
    {
      name: "Budget Calculator",
      description: "Plan your budget",
      url: "/budget"
    },
    {
      name: "Salary Calculator",
      description: "Calculate salary and compensation",
      url: "/salary"
    }
  ];

  const tips = [
    "Know your costs thoroughly",
    "Research competitor pricing",
    "Consider your target market",
    "Factor in all expenses",
    "Monitor market trends",
    "Review margins regularly",
    "Balance price and volume",
    "Consider value perception"
  ];

  const advancedFeatures = [
    {
      title: "Multiple Calculation Methods",
      description: "Calculate from cost and revenue, markup, or margin",
      icon: FaCalculator
    },
    {
      title: "Profit Analysis",
      description: "See detailed profit calculations",
      icon: FaMoneyBillWave
    },
    {
      title: "Margin Insights",
      description: "Understand margin vs markup",
      icon: FaPercent
    },
    {
      title: "Pricing Strategy",
      description: "Optimize your pricing",
      icon: FaChartLine
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-y-10 gap-x-16">
            {/* Main Content */}
            <div className="space-y-10">
              <Card className="shadow-xl p-6 sm:p-8 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">Margin Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaInfoCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          This calculator helps you determine profit margins, markups, and optimal pricing. Use it to analyze different pricing scenarios and make informed business decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                  <MarginCalculator />
                </CardContent>
              </Card>

              <Card className="shadow-lg p-6 sm:p-8 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Advanced Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {advancedFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-4 bg-muted/30 p-4 rounded-lg">
                        <feature.icon className="text-blue-600 text-2xl mt-1" />
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg p-6 sm:p-8 bg-white prose">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>
            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-8">
              <Card className="shadow-lg p-6 sm:p-8 bg-blue-50">
                <CardHeader className="flex flex-row items-center gap-2 mb-2">
                  <FaMoneyBillWave className="text-blue-500" />
                  <CardTitle className="text-xl font-semibold">Business Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tips.map((tip, idx) => (
                      <div
                        key={idx}
                        className="bg-blue-50 rounded-lg px-4 py-2 border-l-4 border-blue-300 text-sm text-blue-900"
                      >
                        {tip}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg p-6 sm:p-8 bg-white">
                <CardHeader className="flex flex-row items-center gap-2 mb-2">
                  <FaLink className="text-blue-500" />
                  <CardTitle className="text-xl font-semibold">Related Calculators</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {relatedCalculators.map((calc, idx) => (
                      <li key={idx}>
                        <Link
                          to={calc.url}
                          className="block bg-blue-50 rounded-lg px-4 py-2 hover:bg-blue-100 transition"
                        >
                          <span className="font-medium text-blue-700">{calc.name}</span>
                          <span className="block text-xs text-muted-foreground">{calc.description}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarginCalculatorPage;
