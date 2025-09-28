import React from "react";
import AutoLoanRefinanceCalculator from "@/components/calculators/auto/AutoLoanRefinanceCalculator";
import useSeo from "@/hooks/useSeo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { FaLink, FaCar, FaChartLine, FaCalculator, FaInfoCircle } from "react-icons/fa";
import Footer from "@/components/Footer";

const AutoLoanRefinanceCalculatorPage = () => {
  useSeo({
    
    title: "Auto Loan Refinance Calculator - Calculate Your Savings",
    canonical: "/auto-loan-refinance",
    description: "Calculate potential savings from refinancing your auto loan. Compare current and new loan terms, interest rates, and monthly payments. Free auto loan refinance calculator.",
    path: "/auto-loan-refinance",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Calculate Auto Loan Refinance Savings",
      "description": "Calculate and understand potential savings from refinancing your auto loan based on current and new loan terms.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Enter Current Loan Details",
          "text": "Input your current loan balance, interest rate, and remaining term.",
          "url": "https://financeloancalc.com/auto-loan-refinance#current-loan"
        },
        {
          "@type": "HowToStep",
          "name": "Set New Loan Terms",
          "text": "Specify the new interest rate and loan term you're considering.",
          "url": "https://financeloancalc.com/auto-loan-refinance#new-loan"
        },
        {
          "@type": "HowToStep",
          "name": "Add Refinancing Costs",
          "text": "Include any fees or costs associated with refinancing.",
          "url": "https://financeloancalc.com/auto-loan-refinance#costs"
        },
        {
          "@type": "HowToStep",
          "name": "Review Savings",
          "text": "See your potential monthly savings and total interest savings.",
          "url": "https://financeloancalc.com/auto-loan-refinance#results"
        }
      ],
      "supply": [
        { "@type": "HowToSupply", "name": "Current Loan Details" },
        { "@type": "HowToSupply", "name": "New Loan Terms" },
        { "@type": "HowToSupply", "name": "Refinancing Costs" }
      ],
      "tool": [{ "@type": "HowToTool", "name": "Auto Loan Refinance Calculator" }],
      "totalTime": "PT2M"
    }
  });

  const faqs = [
    {
      question: "When should I consider refinancing my auto loan?",
      answer: "Consider refinancing when: interest rates have dropped significantly, your credit score has improved, you want to lower monthly payments, or you want to pay off the loan faster. The calculator helps you determine if refinancing makes financial sense for your situation."
    },
    {
      question: "What costs are involved in refinancing?",
      answer: "Common refinancing costs include: application fees, origination fees, title transfer fees, and potentially early payoff penalties from your current lender. The calculator allows you to include these costs to get a more accurate picture of potential savings."
    },
    {
      question: "How much can I save by refinancing?",
      answer: "Savings depend on your current interest rate, new rate, loan term, and remaining balance. The calculator shows both monthly payment savings and total interest savings over the life of the loan, helping you make an informed decision."
    },
    {
      question: "Will refinancing affect my credit score?",
      answer: "Refinancing may cause a small, temporary dip in your credit score due to the new credit inquiry and loan application. However, if it helps you secure better terms, the long-term impact on your credit can be positive. The calculator helps you weigh these factors."
    },
    {
      question: "Can I refinance if I'm underwater on my loan?",
      answer: "Being underwater (owing more than the car's value) can make refinancing more challenging, but not impossible. Some lenders may still refinance if you have good credit and can demonstrate ability to repay. The calculator helps you understand the impact of your current loan-to-value ratio."
    },
    {
      question: "What credit score do I need to refinance?",
      answer: "Requirements vary by lender, but generally: Excellent (720+) gets the best rates, Good (690-719) gets competitive rates, Fair (630-689) may get higher rates, and Poor (below 630) may face challenges. The calculator helps you estimate payments based on different credit score scenarios."
    },
    {
      question: "How long should I wait before refinancing?",
      answer: "There's no set waiting period, but consider: early payoff penalties from your current lender, the cost of refinancing, and whether you've had the loan long enough to build equity. The calculator helps you determine if the timing is right for refinancing."
    },
    {
      question: "What documents do I need to refinance?",
      answer: "Typically needed: current loan information, proof of income, proof of insurance, vehicle registration, and personal identification. The calculator helps you prepare by showing what information you'll need to provide to lenders."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Current Loan Details",
      text: "Input your current loan balance, interest rate, and remaining term.",
      url: "#current-loan"
    },
    {
      name: "Set New Loan Terms",
      text: "Specify the new interest rate and loan term you're considering.",
      url: "#new-loan"
    },
    {
      name: "Add Refinancing Costs",
      text: "Include any fees or costs associated with refinancing.",
      url: "#costs"
    },
    {
      name: "Review Savings",
      text: "See your potential monthly savings and total interest savings.",
      url: "#results"
    }
  ];

  const relatedCalculators = [
    {
      name: "Auto Loan Calculator",
      description: "Calculate monthly payments for your car loan",
      url: "/auto-loan-calculator"
    },
    {
      name: "Car Affordability Calculator",
      description: "Determine how much car you can afford",
      url: "/car-affordability-calculator"
    },
    {
      name: "Car Payment Calculator",
      description: "Calculate your monthly car payment",
      url: "/car-payment-calculator"
    },
    {
      name: "Loan Comparison Calculator",
      description: "Compare different loan options",
      url: "/loan-comparison-calculator"
    }
  ];

  const tips = [
    "Check your credit score before applying for refinancing",
    "Compare offers from multiple lenders",
    "Consider both monthly savings and total interest savings",
    "Factor in all refinancing costs and fees",
    "Read the fine print on early payoff penalties",
    "Ensure the new loan term aligns with your goals",
    "Keep your current loan until the new one is approved",
    "Consider the age and condition of your vehicle"
  ];

  const advancedFeatures = [
    {
      title: "Savings Analysis",
      description: "Compare current and new loan terms",
      icon: FaChartLine
    },
    {
      title: "Payment Breakdown",
      description: "View detailed monthly payment components",
      icon: FaCalculator
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different refinancing options",
      icon: FaCar
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaLink
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <div className="container py-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    This calculator provides estimates based on the information you provide. Actual refinancing terms and savings may vary based on your credit score, loan terms, and other factors. Consider consulting with a financial advisor for personalized advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <AutoLoanRefinanceCalculator />
          <div className="container py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
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
            </div>
          </div>

          <div className="container py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use the Calculator</h3>
                  <div className="space-y-4">
                    {howToSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                          {index + 1}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">{step.name}</h4>
                          <p className="text-gray-600">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FaCar className="mr-2 text-blue-600" />
                    Refinancing Tips
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
      </div>
      <Footer />
    </div>
  );
};

export default AutoLoanRefinanceCalculatorPage; 