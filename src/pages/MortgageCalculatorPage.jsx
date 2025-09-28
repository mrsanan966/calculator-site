import React, { useState, Suspense } from "react";
import MortgageCalculator from "@/components/calculators/mortgage/MortgageCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaHome, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaSpinner, FaTwitter, FaFacebook, FaLinkedin, FaPrint, FaFilePdf, FaFileExcel, FaMoneyCheckAlt } from "react-icons/fa";
import { PieChart, BarChart, LineChart } from '@/components/charts';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Tooltip } from '@/components/ui/Tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Spinner } from '@/components/ui/Spinner';

const MortgageCalculatorPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [showMobileView, setShowMobileView] = useState(false);

  const faqs = [
    {
      question: "How is my monthly mortgage payment calculated?",
      answer: "Your monthly payment is calculated using the principal amount (home price minus down payment), interest rate, and loan term. The formula uses amortization to determine how much goes to principal and interest each month."
    },
    {
      question: "What factors affect my mortgage interest rate?",
      answer: "Your interest rate is influenced by your credit score, loan term, down payment amount, loan type (fixed vs. adjustable), and current market rates. Better credit scores and larger down payments typically result in lower rates."
    },
    {
      question: "Should I choose a 15-year or 30-year mortgage?",
      answer: "A 15-year mortgage has higher monthly payments but less total interest paid. A 30-year mortgage has lower monthly payments but costs more in total interest. Consider your budget and long-term financial goals."
    },
    {
      question: "How much should I put down on a house?",
      answer: "A down payment of 20% is recommended to avoid PMI, but many loans allow as little as 3-5%. Larger down payments reduce your loan amount, monthly payments, and total interest paid."
    },
    {
      question: "What's included in my monthly mortgage payment?",
      answer: "Your monthly payment typically includes principal, interest, property taxes, homeowners insurance, and possibly PMI (Private Mortgage Insurance) if your down payment is less than 20%."
    },
    {
      question: "What is an amortization schedule?",
      answer: "An amortization schedule shows how your monthly payment is split between principal and interest over the life of the loan. Initially, more goes to interest; later, more goes to principal."
    },
    {
      question: "How does PMI affect my mortgage payment?",
      answer: "PMI (Private Mortgage Insurance) is required when your down payment is less than 20%. It typically costs 0.5-1% of your loan amount annually and is added to your monthly payment until you reach 20% equity."
    },
    {
      question: "Can I refinance my mortgage later?",
      answer: "Yes, you can refinance your mortgage if interest rates drop or your financial situation improves. Consider closing costs and how long you plan to stay in the home when deciding to refinance."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Home Details",
      text: "Input the home price, down payment amount, and loan term.",
      url: "#calculator-form"
    },
    {
      name: "Set Interest Rate",
      text: "Enter your expected interest rate or use current market rates.",
      url: "#interest-rate"
    },
    {
      name: "Review Results",
      text: "See your estimated monthly payment and total costs.",
      url: "#results"
    },
    {
      name: "Analyze Amortization",
      text: "View the detailed breakdown of principal and interest payments.",
      url: "#amortization"
    },
    {
      name: "Compare Scenarios",
      text: "Try different down payments and terms to find the best option.",
      url: "#scenarios"
    }
  ];

  const relatedCalculators = [
    {
      name: "Refinance Calculator",
      description: "Calculate refinancing options and potential savings",
      url: "/refinance"
    },
    {
      name: "Home Affordability Calculator",
      description: "Determine how much house you can afford",
      url: "/home-affordability"
    },
    {
      name: "HELOC Calculator",
      description: "Calculate home equity line of credit options",
      url: "/heloc"
    },
    {
      name: "Property Tax Calculator",
      description: "Estimate your annual property tax costs",
      url: "/property-tax"
    }
  ];

  const advancedFeatures = [
    {
      title: "Amortization Schedule",
      description: "View detailed breakdown of each payment",
      icon: FaChartBar
    },
    {
      title: "Multiple Scenarios",
      description: "Compare different loan terms and down payments",
      icon: FaLightbulb
    },
    {
      title: "Total Cost Analysis",
      description: "See the complete cost of homeownership",
      icon: FaDollarSign
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Check your credit score before applying for a mortgage",
    "Get pre-approved for better negotiating power",
    "Consider total cost, not just monthly payment",
    "Shop around for the best interest rates from multiple lenders",
    "Factor in property taxes, insurance, and maintenance costs",
    "Consider future refinancing options and market conditions",
    "Save for a 20% down payment to avoid PMI",
    "Understand the difference between fixed and adjustable rates"
  ];

  // Generate comprehensive schema markup
  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Mortgage Calculator",
      "description": "Calculate your monthly mortgage payments, total interest, and view a detailed amortization schedule. Plan your home purchase with our easy mortgage calculator.",
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
      "name": "How to Use Our Mortgage Calculator",
      "description": "Learn how to calculate your mortgage payments with our step-by-step guide.",
      "step": howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text
      })),
      "totalTime": "PT5M"
    }
  ];

  // Set up comprehensive SEO
  useSeo({
    title: "Free Mortgage Calculator 2024 - Calculate Monthly Payments & Amortization",
    description: "Calculate your monthly mortgage payments with our free mortgage calculator. Get accurate estimates for principal, interest, PMI, taxes, and insurance. View amortization schedules and compare loan options.",
    keywords: "mortgage calculator, mortgage payment calculator, home loan calculator, mortgage calculator with PMI, mortgage calculator with taxes, mortgage amortization calculator, mortgage calculator 2024, free mortgage calculator, monthly mortgage payment calculator, mortgage interest calculator, home affordability calculator",
    schemaMarkup: schemaMarkup,
    canonical: "/mortgage",
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
      title: 'My Mortgage Calculation',
      text: 'Check out my mortgage calculation results!',
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
    // Implement export logic for different formats
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
              Free Mortgage Calculator 2024 - Calculate Monthly Payments & Amortization
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Calculate your monthly mortgage payments with our comprehensive mortgage calculator. 
              Get accurate estimates for principal, interest, PMI, taxes, and insurance. 
              View detailed amortization schedules and compare different loan options to make informed decisions.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Accurate Calculations</h3>
                <p className="text-sm text-blue-700">Includes PMI, taxes, and insurance for complete payment estimates</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">Amortization Schedule</h3>
                <p className="text-sm text-green-700">See how your payments are split between principal and interest</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900">Multiple Scenarios</h3>
                <p className="text-sm text-purple-700">Compare different down payments and loan terms</p>
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
                      Mortgage Calculator
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
                    <MortgageCalculator onCalculate={() => setIsLoading(true)} />
                  </Suspense>

                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <FaSpinner className="animate-spin text-blue-600" />
                      <span className="ml-2">Calculating...</span>
                    </div>
                  )}

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Payment Distribution</h3>
                      <PieChart data={[
                        { label: 'Principal', value: 60 },
                        { label: 'Interest', value: 40 }
                      ]} />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Amortization Timeline</h3>
                      <LineChart data={[
                        { month: 1, principal: 1000, interest: 2000 },
                        { month: 12, principal: 1200, interest: 1800 }
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
                    <MortgageCalculator />
                  </AccordionItem>
                  <AccordionItem title="Results">
                    <div className="p-4">
                      {/* Results content */}
                    </div>
                  </AccordionItem>
                  <AccordionItem title="Amortization Schedule">
                    <div className="p-4">
                      {/* Amortization content */}
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
                  Understanding Mortgages
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Mortgages Work</h3>
                  <p className="mb-4">
                    A mortgage is a loan used to purchase real estate. The property serves as collateral, 
                    and you make monthly payments over a set term until the loan is paid off. Understanding 
                    how mortgages work is crucial for making informed home-buying decisions.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Monthly Payment Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: P = Principal, r = Monthly Interest Rate, n = Number of Payments</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li><strong>Down Payment:</strong> Reduces loan amount and monthly payments</li>
                    <li><strong>Interest Rate:</strong> Affects total cost and monthly payments</li>
                    <li><strong>Loan Term:</strong> Longer terms mean lower payments but more interest</li>
                    <li><strong>Credit Score:</strong> Impacts interest rate and loan approval</li>
                    <li><strong>Total Cost:</strong> Consider all expenses, not just the payment</li>
                    <li><strong>PMI:</strong> Required when down payment is less than 20%</li>
                    <li><strong>Property Taxes:</strong> Vary by location and property value</li>
                    <li><strong>Homeowners Insurance:</strong> Protects your investment</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">How to Use This Calculator</h3>
                  <ol className="list-decimal pl-5 space-y-2 mb-6">
                    {howToSteps.map((step, index) => (
                      <li key={index}>
                        <strong>{step.name}:</strong> {step.text}
                      </li>
                    ))}
                  </ol>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Mortgage Types Explained</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Fixed-Rate Mortgage</h4>
                      <p className="text-sm text-blue-700">Interest rate stays the same for the entire loan term. Predictable payments but may have higher initial rates.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Adjustable-Rate Mortgage (ARM)</h4>
                      <p className="text-sm text-green-700">Interest rate can change over time. Lower initial rates but payments can increase.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Current Mortgage Rates 2024</h3>
                  <p className="mb-4">
                    Mortgage rates fluctuate based on economic conditions, Federal Reserve policy, and market demand. 
                    As of 2024, average rates for a 30-year fixed mortgage range from 6.5% to 7.5%, while 15-year 
                    fixed rates are typically 0.5% to 1% lower. Your actual rate depends on your credit score, 
                    down payment, and loan amount.
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
                  Home Buying Tips
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

export default MortgageCalculatorPage;