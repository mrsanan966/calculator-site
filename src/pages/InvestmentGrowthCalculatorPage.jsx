import React from "react";
import InvestmentGrowthCalculator from "@/components/calculators/investment/InvestmentGrowthCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaMoneyBillWave, FaChartLine, FaCalculator, FaInfoCircle, FaPiggyBank } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const InvestmentGrowthCalculatorPage = () => {
  useSeo({
    
    
    title: "Investment Growth Calculator - Calculate Your Investment Returns",
    canonical: "/finance",
    path: "/finance",
    description: "Calculate your investment growth over time with compound interest. Free investment calculator with inflation and tax adjustments.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Investment Growth",
      "description": "Calculate your investment growth and returns over time.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Investment Details",
          "text": "Input your initial investment and monthly contributions.",
          "url": "https://financeloancalc.com/investment-growth#investment-details"
        },
        {
          "@type": "HowToStep",
          "name": "Set Growth Parameters",
          "text": "Specify expected return, investment period, and inflation rate.",
          "url": "https://financeloancalc.com/investment-growth#growth-parameters"
        },
        {
          "@type": "HowToStep",
          "name": "Add Tax Considerations",
          "text": "Include tax rate to calculate after-tax returns.",
          "url": "https://financeloancalc.com/investment-growth#tax-considerations"
        },
        {
          "@type": "HowToStep",
          "name": "Review Results",
          "text": "See your total investment value, growth, and returns.",
          "url": "https://financeloancalc.com/investment-growth#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Initial Investment" },
        { "@type": "HowToSupply", "name": "Monthly Contributions" },
        { "@type": "HowToSupply", "name": "Expected Return Rate" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Investment Growth Calculator" }],
      "totalTime": "PT3M"
    }
  });

  const faqs = [
    {
      question: "What is compound interest?",
      answer: "Compound interest is when you earn interest not only on your initial investment but also on the accumulated interest from previous periods. This creates a snowball effect where your money grows at an accelerating rate over time."
    },
    {
      question: "How does inflation affect my investment returns?",
      answer: "Inflation reduces the purchasing power of your money over time. The calculator adjusts for inflation to show you the real value of your investment returns in today's dollars. A 7% return with 2% inflation means a real return of about 5%."
    },
    {
      question: "What is a good investment return rate?",
      answer: "Historically, the S&P 500 has returned about 10% annually before inflation. However, returns vary by investment type and market conditions. Conservative investments might return 3-5%, while riskier investments could return more but with higher volatility."
    },
    {
      question: "How do taxes affect my investment returns?",
      answer: "Taxes can significantly impact your investment returns. The calculator accounts for your tax rate to show after-tax returns. Different investment types (stocks, bonds, real estate) have different tax treatments, which can affect your overall returns."
    },
    {
      question: "What is the power of regular contributions?",
      answer: "Regular contributions, even small ones, can dramatically increase your investment growth through dollar-cost averaging and compound interest. The calculator shows how consistent monthly contributions can multiply your returns over time."
    },
    {
      question: "How do I choose an investment period?",
      answer: "Your investment period should align with your financial goals. Longer periods allow more time for compound interest to work and can help ride out market volatility. Consider your age, retirement goals, and other financial objectives when choosing a period."
    },
    {
      question: "What is dollar-cost averaging?",
      answer: "Dollar-cost averaging is investing a fixed amount regularly (like monthly) regardless of market conditions. This strategy can help reduce the impact of market volatility and potentially lower your average cost per share over time."
    },
    {
      question: "How do I account for investment fees?",
      answer: "Investment fees (like expense ratios, management fees, or trading costs) can significantly impact your returns. While not directly included in the calculator, you should consider these costs when evaluating your actual returns and choosing investments."
    }
  ];

  const relatedCalculators = [
    {
      name: "Savings Calculator",
      description: "Calculate your savings growth",
      url: "/savings"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    },
    {
      name: "Cost of Living Calculator",
      description: "Compare living expenses",
      url: "/cost-of-living"
    }
  ];

  const tips = [
    "Start investing early to maximize compound interest",
    "Diversify your investments across different assets",
    "Consider tax-efficient investment strategies",
    "Regularly review and rebalance your portfolio",
    "Keep investment costs and fees low",
    "Stay invested during market volatility",
    "Increase contributions when possible",
    "Consider inflation in your long-term planning"
  ];

  const advancedFeatures = [
    {
      title: "Compound Interest",
      description: "See how your money grows with compound interest",
      icon: FaCalculator
    },
    {
      title: "Inflation Adjustment",
      description: "Calculate real returns after inflation",
      icon: FaChartLine
    },
    {
      title: "Tax Impact",
      description: "Understand how taxes affect your returns",
      icon: FaMoneyBillWave
    },
    {
      title: "Regular Contributions",
      description: "See the power of consistent investing",
      icon: FaPiggyBank
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
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">Investment Growth Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaInfoCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          This calculator provides estimates based on the information you provide. Actual investment returns may vary based on market conditions, fees, and other factors. Consider consulting with a financial advisor for personalized advice.
                        </p>
                      </div>
                    </div>
                  </div>
                  <InvestmentGrowthCalculator />
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
                  <CardTitle className="text-xl font-semibold">Investment Tips</CardTitle>
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
                        <a
                          href={calc.url}
                          className="block bg-blue-50 rounded-lg px-4 py-2 hover:bg-blue-100 transition"
                        >
                          <span className="font-medium text-blue-700">{calc.name}</span>
                          <span className="block text-xs text-muted-foreground">{calc.description}</span>
                        </a>
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

export default InvestmentGrowthCalculatorPage;
  