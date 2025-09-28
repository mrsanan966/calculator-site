import React from "react";
import HELOCCalculator from "@/components/calculators/loan/HELOCCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaMoneyBillWave, FaChartLine, FaCalculator, FaInfoCircle, FaHome } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";

const HELOCCalculatorPage = () => {
  useSeo({
    
    
    title: "HELOC Calculator - Calculate Home Equity Line of Credit",
    canonical: "/heloc",
    path: "/heloc",
    description: "Calculate your home equity line of credit (HELOC) payments, available credit, and total costs. Free HELOC calculator with draw period and repayment period analysis.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate HELOC Payments",
      "description": "Calculate your home equity line of credit payments and available credit.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Home Value",
          "text": "Input your current home value and mortgage balance.",
          "url": "https://financeloancalc.com/heloc#home-value"
        },
        {
          "@type": "HowToStep",
          "name": "Set HELOC Terms",
          "text": "Specify the interest rate, draw period, and repayment period.",
          "url": "https://financeloancalc.com/heloc#terms"
        },
        {
          "@type": "HowToStep",
          "name": "Enter Draw Amount",
          "text": "Input your planned monthly draw amount.",
          "url": "https://financeloancalc.com/heloc#draw-amount"
        },
        {
          "@type": "HowToStep",
          "name": "Review Results",
          "text": "See your maximum credit line, monthly payments, and total costs.",
          "url": "https://financeloancalc.com/heloc#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Home Value" },
        { "@type": "HowToSupply", "name": "Mortgage Balance" },
        { "@type": "HowToSupply", "name": "Credit Score" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "HELOC Calculator" }],
      "totalTime": "PT3M"
    }
  });

  const faqs = [
    {
      question: "What is a HELOC?",
      answer: "A Home Equity Line of Credit (HELOC) is a revolving line of credit that uses your home equity as collateral. It works like a credit card, allowing you to borrow money as needed up to your credit limit, pay it back, and borrow again."
    },
    {
      question: "How much can I borrow with a HELOC?",
      answer: "Most lenders allow you to borrow up to 85% of your home's value, minus your current mortgage balance. For example, if your home is worth $500,000 and you owe $300,000, you might be able to borrow up to $125,000 (85% of $500,000 minus $300,000)."
    },
    {
      question: "What is the difference between draw period and repayment period?",
      answer: "The draw period (typically 10 years) is when you can borrow money and make interest-only payments. The repayment period (typically 20 years) is when you must pay back both principal and interest. During the draw period, you only pay interest on the amount you've borrowed."
    },
    {
      question: "How do HELOC interest rates work?",
      answer: "HELOC rates are typically variable and tied to a benchmark rate like the Prime Rate. They can change over time, affecting your monthly payments. The calculator helps you understand how rate changes might impact your payments."
    },
    {
      question: "What are the advantages of a HELOC?",
      answer: "HELOCs offer flexibility in borrowing, interest-only payments during the draw period, and potentially lower interest rates than other types of loans. They're ideal for ongoing expenses or projects where you need access to funds over time."
    },
    {
      question: "What are the risks of a HELOC?",
      answer: "Risks include variable interest rates, potential payment increases, and using your home as collateral. If you can't make payments, you could risk losing your home. It's important to borrow responsibly and understand the terms."
    },
    {
      question: "How does my credit score affect my HELOC?",
      answer: "Your credit score affects your interest rate and maximum credit line. Higher scores typically qualify for better rates and larger credit lines. The calculator helps you understand how different credit scores might affect your options."
    },
    {
      question: "Can I pay off my HELOC early?",
      answer: "Yes, most HELOCs allow early repayment without penalties. This can save you money on interest. The calculator helps you see how early repayment might affect your total costs."
    }
  ];

  const relatedCalculators = [
    {
      name: "Mortgage Calculator",
      description: "Calculate mortgage payments",
      url: "/mortgage"
    },
    {
      name: "Loan Comparison Calculator",
      description: "Compare different loan options",
      url: "/loan-comparison"
    },
    {
      name: "Refinance Calculator",
      description: "Calculate refinancing options",
      url: "/refinance"
    }
  ];

  const tips = [
    "Only borrow what you need and can afford to repay",
    "Consider the impact of variable interest rates",
    "Plan for both draw and repayment periods",
    "Keep track of your available credit",
    "Understand all fees and costs",
    "Consider your long-term financial goals",
    "Shop around for the best rates and terms",
    "Have a plan for repayment before borrowing"
  ];

  const advancedFeatures = [
    {
      title: "Draw Period Analysis",
      description: "See how your borrowing affects payments during the draw period",
      icon: FaCalculator
    },
    {
      title: "Repayment Planning",
      description: "Plan for the transition to full repayment",
      icon: FaChartLine
    },
    {
      title: "Interest Calculations",
      description: "Understand how interest accrues during both periods",
      icon: FaMoneyBillWave
    },
    {
      title: "Equity Tracking",
      description: "Monitor your available home equity",
      icon: FaHome
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
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">HELOC Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaInfoCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          This calculator provides estimates based on the information you provide. Actual HELOC terms and costs may vary based on your credit score, home value, and other factors. Consider consulting with a financial advisor for personalized advice.
                        </p>
                      </div>
                    </div>
                  </div>
                  <HELOCCalculator />
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
                  <CardTitle className="text-xl font-semibold">HELOC Tips</CardTitle>
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

export default HELOCCalculatorPage;
