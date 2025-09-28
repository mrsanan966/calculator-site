import React, { useState, Suspense } from "react";
import AutoLoanCalculator from "@/components/calculators/auto/AutoLoanCalculator";
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaCar, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaSpinner, FaTwitter, FaFacebook, FaLinkedin, FaPrint, FaFilePdf, FaFileExcel, FaMoneyCheckAlt } from "react-icons/fa";
import { PieChart, BarChart, LineChart } from '@/components/charts';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Tooltip } from '@/components/ui/Tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Spinner } from '@/components/ui/Spinner';

const AutoLoanCalculatorPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);

  const faqs = [
    {
      question: "How is my monthly auto loan payment calculated?",
      answer: "Your monthly payment is calculated using the loan amount (vehicle price minus down payment), interest rate, and loan term. The formula accounts for the principal amount and interest over the loan period."
    },
    {
      question: "What factors affect my auto loan interest rate?",
      answer: "Your interest rate depends on your credit score, loan term, down payment amount, vehicle age, and current market rates. Better credit scores and larger down payments typically result in lower rates."
    },
    {
      question: "Should I choose a shorter or longer auto loan term?",
      answer: "Shorter terms (36-48 months) have higher monthly payments but lower total interest. Longer terms (60-84 months) have lower monthly payments but cost more in total interest. Consider your budget and how long you plan to keep the car."
    },
    {
      question: "How much should I put down on a car?",
      answer: "A down payment of 20% is recommended to avoid negative equity and get better rates. However, many lenders accept as little as 0-10% down. Larger down payments reduce your monthly payment and total interest."
    },
    {
      question: "What's the difference between buying and leasing a car?",
      answer: "Buying means you own the car after paying off the loan. Leasing means you pay for the car's depreciation and return it after the lease term. Buying builds equity, while leasing offers lower monthly payments."
    },
    {
      question: "Can I refinance my auto loan?",
      answer: "Yes, you can refinance your auto loan if interest rates drop or your credit improves. Consider refinancing fees and how much you'll save in interest before making the decision."
    },
    {
      question: "What is GAP insurance and do I need it?",
      answer: "GAP insurance covers the difference between what you owe on your loan and the car's actual value if it's totaled. It's recommended if you have a long loan term or small down payment."
    },
    {
      question: "How does my credit score affect my auto loan?",
      answer: "Your credit score directly impacts your interest rate. Excellent credit (720+) gets the best rates, while poor credit (below 600) may face higher rates or require a co-signer."
    }
  ];

  const howToSteps = [
    {
      name: "Enter Vehicle Details",
      text: "Input the vehicle price, down payment amount, and trade-in value.",
      url: "#vehicle-details"
    },
    {
      name: "Set Loan Terms",
      text: "Choose your loan term and enter your expected interest rate.",
      url: "#loan-terms"
    },
    {
      name: "Review Results",
      text: "See your estimated monthly payment and total loan cost.",
      url: "#results"
    },
    {
      name: "Compare Options",
      text: "Try different terms and down payments to find the best deal.",
      url: "#comparison"
    }
  ];

  const relatedCalculators = [
    {
      name: "Car Affordability Calculator",
      description: "Determine how much car you can afford based on your income",
      url: "/car-affordability"
    },
    {
      name: "Auto Loan Refinance Calculator",
      description: "Calculate potential savings from refinancing your auto loan",
      url: "/auto-loan-refinance"
    },
    {
      name: "Car Payment Calculator",
      description: "Calculate monthly car payments with different scenarios",
      url: "/car-payment"
    },
    {
      name: "Loan Calculator",
      description: "General loan payment calculator for any type of loan",
      url: "/loan"
    }
  ];

  const advancedFeatures = [
    {
      title: "Payment Breakdown",
      description: "See how much goes to principal vs interest",
      icon: FaChartBar
    },
    {
      title: "Total Cost Analysis",
      description: "Compare total cost of different loan terms",
      icon: FaDollarSign
    },
    {
      title: "Affordability Check",
      description: "Ensure payments fit your budget",
      icon: FaLightbulb
    },
    {
      title: "Export Results",
      description: "Save and share your calculations",
      icon: FaBook
    }
  ];

  const tips = [
    "Check your credit score before applying for an auto loan",
    "Get pre-approved to know your budget and negotiate better",
    "Shop around for the best interest rates from multiple lenders",
    "Consider the total cost, not just the monthly payment",
    "Factor in insurance, maintenance, and fuel costs",
    "Avoid loans longer than 60 months to prevent negative equity",
    "Consider a larger down payment to reduce monthly payments",
    "Read all loan terms carefully before signing"
  ];

  // Generate comprehensive schema markup
  const schemaMarkup = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Auto Loan Calculator",
      "description": "Calculate your monthly auto loan payments with our free auto loan calculator. Get accurate estimates for car payments, total interest, and loan costs.",
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
      "name": "How to Use Our Auto Loan Calculator",
      "description": "Learn how to calculate your auto loan payments with our step-by-step guide.",
      "step": howToSteps.map((step, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "name": step.name,
        "text": step.text
      })),
      "totalTime": "PT3M"
    }
  ];

  // Set up comprehensive SEO
  useSeo({
    title: "Free Auto Loan Calculator 2024 - Calculate Car Payment & Interest",
    description: "Calculate your monthly auto loan payments with our free auto loan calculator. Get accurate estimates for car payments, total interest, and loan costs. Compare different terms and rates.",
    keywords: "auto loan calculator, car loan calculator, auto loan payment calculator, car payment calculator, vehicle loan calculator, auto loan calculator 2024, free auto loan calculator, monthly car payment calculator, auto loan interest calculator, car financing calculator",
    schemaMarkup: schemaMarkup,
    canonical: "/auto-loan",
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
      title: 'My Auto Loan Calculation',
      text: 'Check out my auto loan calculation results!',
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
              Free Auto Loan Calculator 2024 - Calculate Car Payment & Interest
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Calculate your monthly auto loan payments with our comprehensive auto loan calculator. 
              Get accurate estimates for car payments, total interest, and loan costs. 
              Compare different terms, rates, and down payments to find the best auto financing option.
            </p>
            
            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Accurate Calculations</h3>
                <p className="text-sm text-blue-700">Includes principal, interest, and total loan costs</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900">Multiple Scenarios</h3>
                <p className="text-sm text-green-700">Compare different loan terms and down payments</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-900">Affordability Check</h3>
                <p className="text-sm text-purple-700">Ensure payments fit your budget</p>
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
                      Auto Loan Calculator
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
                    <AutoLoanCalculator onCalculate={() => setIsLoading(true)} />
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
                        { label: 'Principal', value: 70 },
                        { label: 'Interest', value: 30 }
                      ]} />
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Total Cost Comparison</h3>
                      <BarChart data={[
                        { term: '36 months', cost: 25000 },
                        { term: '60 months', cost: 28000 }
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
                    <AutoLoanCalculator />
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
                  Understanding Auto Loans
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mt-6 mb-3">How Auto Loans Work</h3>
                  <p className="mb-4">
                    An auto loan is a secured loan used to purchase a vehicle. The car serves as collateral, 
                    and you make monthly payments over a set term until the loan is paid off. Understanding 
                    auto loan terms and rates is crucial for making informed car-buying decisions.
                  </p>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Auto Loan Payment Formula</h3>
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <p className="font-mono text-lg">Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1)</p>
                    <p className="text-sm text-gray-600 mt-2">Where: P = Loan Amount, r = Monthly Interest Rate, n = Number of Payments</p>
                  </div>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">Key Factors to Consider</h3>
                  <ul className="list-disc pl-5 space-y-2 mb-6">
                    <li><strong>Vehicle Price:</strong> The total cost of the car you want to buy</li>
                    <li><strong>Down Payment:</strong> Reduces loan amount and monthly payments</li>
                    <li><strong>Interest Rate:</strong> Affects total cost and monthly payments</li>
                    <li><strong>Loan Term:</strong> Longer terms mean lower payments but more interest</li>
                    <li><strong>Credit Score:</strong> Impacts interest rate and loan approval</li>
                    <li><strong>Trade-in Value:</strong> Reduces the amount you need to finance</li>
                    <li><strong>Total Cost:</strong> Consider all expenses, not just the payment</li>
                    <li><strong>Insurance Costs:</strong> Factor in comprehensive and collision coverage</li>
                  </ul>
                  
                  <h3 className="text-xl font-semibold mt-6 mb-3">How to Use This Calculator</h3>
                  <ol className="list-decimal pl-5 space-y-2 mb-6">
                    {howToSteps.map((step, index) => (
                      <li key={index}>
                        <strong>{step.name}:</strong> {step.text}
                      </li>
                    ))}
                  </ol>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Auto Loan Types Explained</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">New Car Loan</h4>
                      <p className="text-sm text-blue-700">Lower interest rates, longer terms available, and better financing options for new vehicles.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Used Car Loan</h4>
                      <p className="text-sm text-green-700">Higher interest rates, shorter terms, but lower vehicle costs and depreciation.</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Current Auto Loan Rates 2024</h3>
                  <p className="mb-4">
                    Auto loan rates vary based on your credit score, loan term, and vehicle type. 
                    As of 2024, average rates for new cars range from 4.5% to 6.5%, while used car 
                    rates are typically 1-2% higher. Your actual rate depends on your credit score, 
                    down payment, and loan amount.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">Buying vs Leasing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Buying Advantages</h4>
                      <ul className="text-sm text-purple-700 list-disc pl-4">
                        <li>Build equity in the vehicle</li>
                        <li>No mileage restrictions</li>
                        <li>Own the car after loan payoff</li>
                        <li>Can customize the vehicle</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-orange-900">Leasing Advantages</h4>
                      <ul className="text-sm text-orange-700 list-disc pl-4">
                        <li>Lower monthly payments</li>
                        <li>Drive newer cars more often</li>
                        <li>Warranty coverage during lease</li>
                        <li>No trade-in hassles</li>
                      </ul>
                    </div>
                  </div>
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
                  Car Buying Tips
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

export default AutoLoanCalculatorPage;