import React from "react";
import PersonalLoanCalculator from "@/components/calculators/loan/PersonalLoanCalculator";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaMoneyBillWave, FaChartLine, FaCalculator, FaInfoCircle, FaCreditCard } from "react-icons/fa";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useSeo from '@/hooks/useSeo';
import Footer from "@/components/Footer";

const PersonalLoanCalculatorPage = () => {
  useSeo({
    title: 'Personal Loan Calculator',
    description: 'Calculate your personal loan payments and interest rates.',
    keywords: 'personal loan, calculator, loan payments',
    canonical: '/personal-loan',
    path: '/personal-loan-calculator',
    ogType: 'website'
  });

  // Define the canonical path for this page
  const canonicalPath = '/personal-loan-calculator';

  const faqs = [
    {
      question: "What is a personal loan?",
      answer: "A personal loan is an unsecured loan that you can use for various purposes like debt consolidation, home improvements, or major purchases. Unlike secured loans, personal loans don't require collateral but typically have higher interest rates."
    },
    {
      question: "How do personal loan interest rates work?",
      answer: "Personal loan interest rates are typically fixed and based on your credit score, income, and loan term. Higher credit scores usually qualify for lower rates. The rate determines how much interest you'll pay over the life of the loan."
    },
    {
      question: "What factors affect my personal loan rate?",
      answer: "Key factors include your credit score, income, debt-to-income ratio, loan amount, and loan term. Lenders also consider your employment history and existing debt obligations when determining your rate."
    },
    {
      question: "What are origination fees?",
      answer: "Origination fees are upfront charges that lenders may charge to process your loan. They're typically a percentage of the loan amount and are either paid at closing or added to the loan balance. Not all lenders charge origination fees."
    },
    {
      question: "How do extra payments affect my loan?",
      answer: "Making extra payments can significantly reduce your total interest and shorten your loan term. The calculator helps you see how additional payments affect your payoff timeline and total interest savings."
    },
    {
      question: "What is a prepayment penalty?",
      answer: "A prepayment penalty is a fee some lenders charge if you pay off your loan early. Not all personal loans have prepayment penalties, and they're becoming less common. Always check your loan terms for any prepayment restrictions."
    },
    {
      question: "How does my credit score affect my loan?",
      answer: "Your credit score is a major factor in determining your interest rate and loan approval. Higher scores typically qualify for better rates and terms. The calculator helps you understand how different credit scores might affect your options."
    },
    {
      question: "What is a good loan term?",
      answer: "The ideal loan term depends on your financial situation and goals. Shorter terms mean higher monthly payments but less total interest. Longer terms mean lower monthly payments but more total interest. Choose a term that balances your monthly budget with total cost."
    }
  ];

  const relatedCalculators = [
    {
      name: "Loan Comparison Calculator",
      description: "Compare different loan options",
      url: "/loan-comparison"
    },
    {
      name: "Debt Consolidation Calculator",
      description: "Calculate consolidation options",
      url: "/debt-consolidation"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget",
      url: "/budget"
    },
    {
      name: "Loan Calculator",
      description: "Calculate general loan payments",
      url: "/loan"
    }
  ];

  const tips = [
    "Compare rates from multiple lenders",
    "Check for hidden fees and charges",
    "Consider your monthly budget carefully",
    "Look for loans with no prepayment penalties",
    "Improve your credit score before applying",
    "Read the fine print carefully",
    "Have a clear repayment plan",
    "Consider the total cost, not just the monthly payment"
  ];

  const advancedFeatures = [
    {
      title: "Extra Payment Analysis",
      description: "See how additional payments affect your loan",
      icon: FaCalculator
    },
    {
      title: "Total Cost Breakdown",
      description: "Understand all fees and interest costs",
      icon: FaChartLine
    },
    {
      title: "Prepayment Analysis",
      description: "Calculate potential savings from early payoff",
      icon: FaMoneyBillWave
    },
    {
      title: "Credit Score Impact",
      description: "See how your credit score affects rates",
      icon: FaCreditCard
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <SEO
          title="Personal Loan Calculator - Calculate Monthly Payments & Total Cost"
          description="Calculate your personal loan payments, interest, and total cost. Free personal loan calculator with extra payment options and prepayment analysis."
          path={canonicalPath}
          type="website"
        />
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-y-10 gap-x-16">
            {/* Main Content */}
            <div className="space-y-10">
              <Card className="shadow-xl p-6 sm:p-8 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">Personal Loan Calculator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <FaInfoCircle className="h-5 w-5 text-blue-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          This calculator provides estimates based on the information you provide. Actual loan terms and rates may vary based on your credit score, income, and other factors. Consider consulting with a financial advisor for personalized advice.
                        </p>
                      </div>
                    </div>
                  </div>
                  <PersonalLoanCalculator />
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
                  <CardTitle className="text-xl font-semibold">Personal Loan Tips</CardTitle>
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

export default PersonalLoanCalculatorPage;
  