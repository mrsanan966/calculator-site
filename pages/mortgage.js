import React, { useState, Suspense } from "react";
import Head from 'next/head';
import MortgageCalculator from "@/components/calculators/mortgage/MortgageCalculator";
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { FaCalculator, FaQuestionCircle, FaChartLine, FaHome, FaDollarSign, FaBook, FaLink, FaLightbulb, FaChartBar, FaSpinner, FaTwitter, FaFacebook, FaLinkedin, FaPrint, FaFilePdf, FaFileExcel, FaMoneyCheckAlt } from "react-icons/fa";
import { PieChart, BarChart, LineChart } from '@/components/charts';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Tooltip } from '@/components/ui/Tooltip';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Spinner } from '@/components/ui/Spinner';
import { generateCalculatorSEO, generateFAQs, generateSchemaMarkup } from '@/utils/seoGenerator';

export default function MortgageCalculatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [savedCalculations, setSavedCalculations] = useState([]);

  // Generate SEO data
  const seoData = generateCalculatorSEO('mortgage');
  const faqs = generateFAQs('mortgage');
  const schemaMarkup = generateSchemaMarkup('mortgage', seoData);

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
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <link rel="canonical" href="https://financeloancalc.com/mortgage" />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://financeloancalc.com/mortgage" />
        <meta property="og:image" content="https://financeloancalc.com/images/mortgage-calculator.jpg" />
        <meta property="og:site_name" content="Finance Loan Calc" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content="https://financeloancalc.com/images/mortgage-calculator.jpg" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Finance Loan Calc" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Structured Data */}
        {schemaMarkup.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <Breadcrumbs />
            
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {seoData.h1}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {seoData.content.intro}
              </p>
              
              {/* Key Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {seoData.content.benefits.map((benefit, index) => (
                  <div key={index} className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900">{benefit}</h3>
                  </div>
                ))}
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
                
                <section className="bg-white rounded-lg shadow-md p-6 mb-8" id="analysis">
                  <h2 className="text-2xl font-semibold mb-6 flex items-center">
                    <FaChartLine className="mr-2 text-blue-600" />
                    {seoData.content.educational.title}
                  </h2>
                  <div className="prose max-w-none">
                    <p className="mb-4">{seoData.content.educational.content}</p>
                    
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
    </>
  );
}
