import React, { useState, Suspense } from "react";
import StudentLoanCalculator from "@/components/calculators/student/StudentLoanCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaGraduationCap, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaSpinner, FaTwitter, FaFacebook, FaLinkedin, FaPrint, FaFilePdf, FaFileExcel, FaMoneyCheckAlt } from "react-icons/fa";
import { PieChart, BarChart, LineChart } from '@/components/charts';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Tooltip } from '@/components/ui/Tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Spinner } from '@/components/ui/Spinner';

const StudentLoanCalculatorPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);

  const faqs = [
    {
      question: "How is my monthly student loan payment calculated?",
      answer: "Your monthly payment is calculated using the loan amount, interest rate, and loan term. Different repayment plans (standard, income-driven, graduated) have different payment calculations."
    },
    {
      question: "What are the different student loan repayment plans?",
      answer: "Standard plans have fixed payments over 10 years. Income-driven plans base payments on your income (10-20% of discretionary income). Graduated plans start low and increase over time."
    },
    {
      question: "Should I choose federal or private student loans?",
      answer: "Federal loans offer income-driven repayment, loan forgiveness programs, and fixed rates. Private loans may have lower rates for borrowers with excellent credit but lack federal protections."
    },
    {
      question: "How does loan forgiveness work?",
      answer: "Public Service Loan Forgiveness (PSLF) forgives remaining debt after 120 qualifying payments while working for a qualifying employer. Income-driven plans may also offer forgiveness after 20-25 years."
    },
    {
      question: "What is the difference between subsidized and unsubsidized loans?",
      answer: "Subsidized loans don't accrue interest while you're in school or during deferment. Unsubsidized loans accrue interest from disbursement, even during school."
    },
    {
      question: "Can I refinance my student loans?",
      answer: "Yes, you can refinance federal and private loans into a new private loan. This may lower your rate but you'll lose federal benefits like income-driven repayment and loan forgiveness."
    },
    {
      question: "What happens if I can't make my student loan payments?",
      answer: "Federal loans offer deferment, forbearance, and income-driven repayment options. Private loans may have limited options. Contact your servicer immediately if you're struggling."
    },
    {
      question: "How do I qualify for income-driven repayment?",
      answer: "Most federal loans qualify for income-driven plans. You need to apply annually and provide income documentation. Payments are typically 10-20% of your discretionary income."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Loan Details",
      text: "Input your loan amount, interest rate, and current balance.",
      url: "#loan-details"
    },
    {
      name: "Choose Repayment Plan",
      text: "Select your repayment plan (standard, income-driven, graduated).",
      url: "#repayment-plan"
    },
    {
      name: "Review Results",
      text: "See your monthly payment and total loan cost.",
      url: "#results"
    },
    {
      name: "Compare Options",
      text: "Try different repayment plans to find the best fit.",
      url: "#comparison"
    }
  ];

  const relatedCalculators = [
    {
      name: "Loan Calculator",
      description: "Calculate payments for any type of loan",
      url: "/loan"
    },
    {
      name: "Debt Payoff Calculator",
      description: "Create a strategy to pay off all your debts",
      url: "/debt-payoff"
    },
    {
      name: "Budget Calculator",
      description: "Plan your monthly budget and expenses",
      url: "/budget"
    },
    {
      name: "Salary Calculator",
      description: "Calculate your take-home pay after taxes",
      url: "/salary"
    }
  ];

  const advancedFeatures = [
    {
      title: "Repayment Plan Comparison",
      description: "Compare different repayment options side by side",
      icon: FaChartBar
    },
    {
      title: "Total Cost Analysis",
      description: "See total interest paid under different plans",
      icon: FaDollarSign
    },
    {
      title: "Forgiveness Calculator",
      description: "Calculate potential loan forgiveness benefits",
      icon: FaLightbulb
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Start making payments while in school to reduce interest",
    "Consider income-driven repayment if payments are too high",
    "Look into loan forgiveness programs if you work in public service",
    "Refinance only if you have stable income and good credit",
    "Make extra payments when possible to reduce total interest",
    "Keep track of all your loans and servicers",
    "Consider the Public Service Loan Forgiveness program",
    "Don't ignore your loans - contact your servicer if struggling"
  ];

  // Generate comprehensive schema markup
  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Student Loan Calculator",
      "description": "Calculate your monthly student loan payments with our free student loan calculator. Compare repayment plans, estimate forgiveness, and plan your loan payoff strategy.",
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
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use Our Student Loan Calculator",
      "description": "Learn how to calculate your student loan payments with our step-by-step guide.",
      "step": howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text
      })),
      "totalTime": "PT4M"
    }
  ];

  // Set up comprehensive SEO
  useSeo({
    title: "Free Student Loan Calculator 2024 - Calculate Payments & Forgiveness",
    description: "Calculate your monthly student loan payments with our free student loan calculator. Compare repayment plans, estimate loan forgiveness, and plan your payoff strategy.",
    keywords: "student loan calculator, student loan payment calculator, federal student loan calculator, student loan repayment calculator, student loan forgiveness calculator, student loan calculator 2024, free student loan calculator, monthly student loan payment calculator, student loan interest calculator, student loan payoff calculator",
    schemaMarkup: schemaMarkup,
    canonical: "/student-loan",
    type: "tool"
  });

  const handleSaveCalculation = (calculation) => {
    setSavedCalculations([...savedCalculations, calculation]);
    localStorage.setItem('savedCalculations', JSON.stringify([...savedCalculations, calculation]));
  };

  const handleLoadCalculation = (index) => {
    const saved = JSON.parse(localStorage.getItem('savedCalculations'))[index];
    // Implement loading logic
  };

  const handleShare = (platform) => {
    const shareData = {
      title: 'My Student Loan Calculation',
      text: 'Check out my student loan calculation results!',
      url: window.location.href
    };

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`);
        break;
    }
  };

  const handleExport = (format) => {
    switch (format) {
      case 'pdf':
        // PDF export logic
        break;
      case 'excel':
        // Excel export logic
        break;
      case 'print':
        window.print();
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Breadcrumbs />
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Free Student Loan Calculator 2024 - Calculate Payments & Forgiveness
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Calculate your monthly student loan payments with our comprehensive student loan calculator. 
              Compare different repayment plans, estimate loan forgiveness benefits, and plan your student loan payoff strategy. 
              Make informed decisions about your education debt.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Repayment Plan Comparison</h3>
                <p className="text-sm text-blue-700">Compare standard, income-driven, and graduated plans</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">Forgiveness Calculator</h3>
                <p className="text-sm text-green-700">Estimate potential loan forgiveness benefits</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900">Total Cost Analysis</h3>
                <p className="text-sm text-purple-700">See total interest paid under different plans</p>
              </div>
            </div>
          </header>
          
          <div className="mb-8">
            <div className="flex justify-between items-center">
              {howToSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="ml-2 hidden md:inline">{step.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ErrorBoundary>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold flex items-center">
                      <FaCalculator className="mr-2 text-blue-600" />
                      Student Loan Calculator
                    </h2>
                    <div className="flex gap-2">
                      <Tooltip text="Save your calculation">
                        <button
                          onClick={() => handleSaveCalculation({ /* calculation data */ })}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          Save
                        </button>
                      </Tooltip>
                      <Tooltip text="Load saved calculation">
                        <button
                          onClick={() => handleLoadCalculation(0)}
                          className="p-2 hover:bg-gray-100 rounded"
                        >
                          Load
                        </button>
                      </Tooltip>
                    </div>
                  </div>

                  <Suspense fallback={<Spinner />}>
                    <StudentLoanCalculator onCalculate={() => setIsLoading(true)} />
                  </Suspense>

                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <FaSpinner className="animate-spin text-blue-600" />
                      <span className="ml-2">Calculating...</span>
                    </div>
                  )}

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Payment Breakdown</h3>
                      <PieChart data={[
                        { label: 'Principal', value: 60 },
                        { label: 'Interest', value: 40 }
                      ]} />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Repayment Plan Comparison</h3>
                      <BarChart data={[
                        { plan: 'Standard', payment: 500 },
                        { plan: 'Income-Driven', payment: 300 }
                      ]} />
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => handleExport('print')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <FaPrint /> Print
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <FaFilePdf /> PDF
                    </button>
                    <button
                      onClick={() => handleExport('excel')}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <FaFileExcel /> Excel
                    </button>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
                    >
                      <FaTwitter /> Share
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <FaFacebook /> Share
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
                    >
                      <FaLinkedin /> Share
                    </button>
                  </div>
                </div>
              </ErrorBoundary>

              <div className="lg:hidden">
                <Accordion>
                  <AccordionItem title="Calculator">
                    <StudentLoanCalculator />
                  </AccordionItem>
                  <AccordionItem title="Results">
                    <div className="p-4">
                      {/* Results content */}
                    </div>
                  </AccordionItem>
                  <AccordionItem title="Comparison">
                    <div className="p-4">
                      {/* Comparison content */}
                    </div>
                  </AccordionItem>
                </Accordion>
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
                  Understanding Student Loans
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Student Loans Work</h3>
                  <p className="mb-4">
                    Student loans are designed to help pay for education expenses. Federal loans offer flexible 
                    repayment options and borrower protections, while private loans may have lower rates for 
                    borrowers with excellent credit. Understanding your options is crucial for managing education debt.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Student Loan Payment Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: P = Loan Amount, r = Monthly Interest Rate, n = Number of Payments</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li><strong>Loan Amount:</strong> Total amount borrowed for education</li>
                    <li><strong>Interest Rate:</strong> Affects total cost and monthly payments</li>
                    <li><strong>Repayment Plan:</strong> Standard, income-driven, or graduated options</li>
                    <li><strong>Loan Type:</strong> Federal vs private loan benefits and protections</li>
                    <li><strong>Forgiveness Programs:</strong> PSLF and income-driven forgiveness</li>
                    <li><strong>Total Cost:</strong> Consider all interest paid over loan term</li>
                    <li><strong>Income Level:</strong> Affects eligibility for income-driven plans</li>
                    <li><strong>Career Path:</strong> Public service may qualify for forgiveness</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">How to Use This Calculator</h3>
                  <ol className="list-decimal pl-5 space-y-2 mb-6">
                    {howToSteps.map((step, index) => (
                      <li key={index}>
                        <strong>{step.name}:</strong> {step.text}
                      </li>
                    ))}
                  </ol>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Student Loan Repayment Plans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Standard Repayment</h4>
                      <p className="text-sm text-blue-700">Fixed payments over 10 years. Lowest total interest but highest monthly payments.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Income-Driven Plans</h4>
                      <p className="text-sm text-green-700">Payments based on income (10-20% of discretionary income). May qualify for forgiveness.</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Graduated Repayment</h4>
                      <p className="text-sm text-purple-700">Payments start low and increase every 2 years. Good for early career.</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900">Extended Repayment</h4>
                      <p className="text-sm text-orange-700">Fixed or graduated payments over 25 years. Lower monthly payments.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Loan Forgiveness Programs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-900">Public Service Loan Forgiveness (PSLF)</h4>
                      <p className="text-sm text-red-700">Forgives remaining debt after 120 qualifying payments while working for qualifying employers.</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900">Income-Driven Forgiveness</h4>
                      <p className="text-sm text-yellow-700">Forgives remaining debt after 20-25 years of income-driven payments.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Current Student Loan Rates 2024</h3>
                  <p className="mb-4">
                    Federal student loan rates are set annually by Congress. For 2024-2025, undergraduate 
                    direct loans have a 5.50% interest rate, graduate direct loans have 7.05%, and PLUS 
                    loans have 8.05%. Private loan rates vary based on credit score and lender.
                  </p>
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
                  Student Loan Tips
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

export default StudentLoanCalculatorPage;