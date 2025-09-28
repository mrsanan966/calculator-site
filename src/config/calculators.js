import { SITE_CONFIG } from './site.js';

// Calculator Categories
export const CALCULATOR_CATEGORIES = {
  FINANCIAL: 'financial',
  MATHEMATICAL: 'mathematical',
  BUSINESS: 'business',
  EDUCATION: 'education',
  GENERAL: 'general'
};

// Calculator Subcategories
export const CALCULATOR_SUBCATEGORIES = {
  LOANS: 'loans',
  MORTGAGES: 'mortgages',
  TAXES: 'taxes',
  INVESTMENTS: 'investments',
  BASIC: 'basic',
  ADVANCED: 'advanced',
  PERSONAL: 'personal',
  BUSINESS: 'business'
};

// Centralized Calculator Configuration
export const CALCULATORS = {
  // Financial Calculators
  'loan-calculator': {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    path: '/loan-calculator',
    category: CALCULATOR_CATEGORIES.FINANCIAL,
    subcategory: CALCULATOR_SUBCATEGORIES.LOANS,
    description: 'Calculate your loan payments, monthly payments, and total interest with our free loan calculator. Get accurate estimates for personal and auto loans.',
    component: 'LoanCalculatorPage',
    keywords: 'loan calculator, calculate loan payments, monthly payments calculator, loan amortization, loan interest calculator',
    icon: 'FaMoneyBillWave',
    inputs: [
      { name: 'Loan Amount', description: 'Total amount to borrow', unit: 'USD', required: true },
      { name: 'Interest Rate', description: 'Annual interest rate', unit: '%', required: true },
      { name: 'Loan Term', description: 'Duration of the loan', unit: 'years', required: true }
    ],
    outputs: [
      { name: 'Monthly Payment', description: 'Monthly payment amount', unit: 'USD' },
      { name: 'Total Interest', description: 'Total interest paid', unit: 'USD' },
      { name: 'Total Cost', description: 'Total cost of the loan', unit: 'USD' }
    ],
    faqs: [
      {
        question: 'How do I calculate loan payments?',
        answer: 'Enter the loan amount, interest rate, and loan term. The calculator will show your monthly payment, total interest, and total cost.'
      },
      {
        question: 'What factors affect my loan payment?',
        answer: 'Your loan payment is affected by the loan amount, interest rate, loan term, and any additional fees. Your credit score can significantly impact the interest rate you receive.'
      }
    ],
    relatedCalculators: [
      'mortgage-calculator',
      'auto-loan-calculator',
      'personal-loan-calculator',
      'student-loan-calculator'
    ],
    schema: {
      '@type': 'WebApplication',
      'applicationCategory': 'FinanceApplication',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }
  },

  'mortgage-calculator': {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    path: '/mortgage-calculator',
    category: CALCULATOR_CATEGORIES.FINANCIAL,
    subcategory: CALCULATOR_SUBCATEGORIES.MORTGAGES,
    description: 'Calculate your mortgage payments, monthly payments, and total interest with our free mortgage calculator. Get accurate estimates for home loans.',
    component: 'MortgageCalculatorPage',
    keywords: 'mortgage calculator, calculate mortgage payments, monthly mortgage payments calculator, mortgage amortization, mortgage interest calculator',
    icon: 'FaHome',
    inputs: [
      { name: 'Home Price', description: 'Price of the home', unit: 'USD', required: true },
      { name: 'Down Payment', description: 'Amount of down payment', unit: 'USD', required: true },
      { name: 'Interest Rate', description: 'Annual interest rate', unit: '%', required: true },
      { name: 'Loan Term', description: 'Duration of the loan', unit: 'years', required: true }
    ],
    outputs: [
      { name: 'Monthly Payment', description: 'Monthly mortgage payment', unit: 'USD' },
      { name: 'Total Interest', description: 'Total interest paid', unit: 'USD' },
      { name: 'Total Cost', description: 'Total cost of the mortgage', unit: 'USD' }
    ],
    faqs: [
      {
        question: 'How do I calculate mortgage payments?',
        answer: 'Enter the home price, down payment, interest rate, and loan term. The calculator will show your monthly payment, total interest, and total cost.'
      },
      {
        question: 'What factors affect my mortgage payment?',
        answer: 'Your mortgage payment is affected by the home price, down payment, interest rate, loan term, and any additional fees. Your credit score can significantly impact the interest rate you receive.'
      }
    ],
    relatedCalculators: [
      'loan-calculator',
      'refinance-calculator',
      'home-equity-loan-calculator',
      'property-tax-calculator'
    ],
    schema: {
      '@type': 'WebApplication',
      'applicationCategory': 'FinanceApplication',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }
  }
};

// Helper Functions
export const getCalculatorById = (id) => CALCULATORS[id];

export const getCalculatorsByCategory = (category) => 
  Object.values(CALCULATORS).filter(calc => calc.category === category);

export const getCalculatorsBySubcategory = (subcategory) =>
  Object.values(CALCULATORS).filter(calc => calc.subcategory === subcategory);

export const getRelatedCalculators = (calculatorId) => {
  const calculator = CALCULATORS[calculatorId];
  if (!calculator) return [];
  
  return calculator.relatedCalculators
    .map(id => CALCULATORS[id])
    .filter(Boolean);
};

// SEO Helper Functions
export const generateCalculatorSeo = (calculatorId) => {
  const calculator = CALCULATORS[calculatorId];
  if (!calculator) return null;

  const { name, description, keywords, path } = calculator;
  const currentYear = new Date().getFullYear();
  const baseUrl = `${SITE_CONFIG.baseUrl}${path}`;

  return {
    title: `${name} Calculator ${currentYear} - Free Online Calculator`,
    description: description,
    keywords: keywords,
    canonical: baseUrl,
    openGraph: {
      title: `${name} Calculator - Free Online ${name} Calculator`,
      description: description,
      url: baseUrl,
      type: 'website',
      site_name: SITE_CONFIG.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} Calculator - Free Online ${name} Calculator`,
      description: description,
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': `${name} Calculator`,
      'description': description,
      'url': baseUrl,
      'applicationCategory': 'FinanceApplication',
      'operatingSystem': 'Web Browser',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    }
  };
}; 