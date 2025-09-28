// Calculator SEO Implementation
const calculators = {
  "loan": {
    title: "Loan Calculator - Calculate Your Loan Payments | FinCalc",
    description: "Calculate your loan payments with our free online loan calculator. Get accurate monthly payments, total interest, and loan amortization schedule.",
    keywords: "loan calculator, calculate loan payments, monthly payments calculator, loan amortization, loan interest calculator",
    image: "loan-calculator.jpg",
    schema: {
      name: "Loan Calculator",
      description: "Calculate your loan payments with our free online loan calculator. Get accurate monthly payments, total interest, and loan amortization schedule."
    }
  },
  "mortgage": {
    title: "Mortgage Calculator - Calculate Your Mortgage Payments | FinCalc",
    description: "Calculate your mortgage payments with our free online mortgage calculator. Get accurate monthly payments, total interest, and amortization schedule.",
    keywords: "mortgage calculator, calculate mortgage payments, monthly mortgage payments calculator, mortgage amortization, mortgage interest calculator",
    image: "mortgage-calculator.jpg",
    schema: {
      name: "Mortgage Calculator",
      description: "Calculate your mortgage payments with our free online mortgage calculator. Get accurate monthly payments, total interest, and amortization schedule."
    }
  },
  "tax": {
    title: "Tax Calculator - Calculate Your Tax Liability | FinCalc",
    description: "Calculate your tax liability with our free online tax calculator. Get accurate tax calculations and understand your tax obligations.",
    keywords: "tax calculator, calculate tax liability, tax calculation, income tax calculator, tax estimation calculator",
    image: "tax-calculator.jpg",
    schema: {
      name: "Tax Calculator",
      description: "Calculate your tax liability with our free online tax calculator. Get accurate tax calculations and understand your tax obligations."
    }
  },
  "student-loan": {
    title: "Student Loan Calculator - Calculate Your Student Loan Payments | FinCalc",
    description: "Calculate your student loan payments with our free online student loan calculator. Get accurate monthly payments and understand your repayment options.",
    keywords: "student loan calculator, calculate student loan payments, student loan repayment calculator, student loan interest calculator",
    image: "student-loan-calculator.jpg",
    schema: {
      name: "Student Loan Calculator",
      description: "Calculate your student loan payments with our free online student loan calculator. Get accurate monthly payments and understand your repayment options."
    }
  },
  "auto-loan": {
    title: "Auto Loan Calculator - Calculate Your Car Loan Payments | FinCalc",
    description: "Calculate your car loan payments with our free online auto loan calculator. Get accurate monthly payments and understand your financing options.",
    keywords: "auto loan calculator, car loan calculator, calculate car payments, auto loan repayment calculator",
    image: "auto-loan-calculator.jpg",
    schema: {
      name: "Auto Loan Calculator",
      description: "Calculate your car loan payments with our free online auto loan calculator. Get accurate monthly payments and understand your financing options."
    }
  },
  "time": {
    title: "Time Calculator - Calculate Time Duration | FinCalc",
    description: "Calculate time duration with our free online time calculator. Get accurate time calculations for various time periods and units.",
    keywords: "time calculator, calculate time duration, time conversion calculator, time difference calculator",
    image: "time-calculator.jpg",
    schema: {
      name: "Time Calculator",
      description: "Calculate time duration with our free online time calculator. Get accurate time calculations for various time periods and units."
    }
  }
};

// Function to generate SEO implementation for a calculator page
function generateCalculatorSEO(calculatorName) {
  const calculator = calculators[calculatorName];
  const url = `https://www.financeloancalc.com/${calculatorName}-calculator`;
  
  return {
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": calculator.schema.name,
      "description": calculator.schema.description,
      "applicationCategory": "Finance",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "itemOffered": {
          "@type": "SoftwareApplication",
          "name": calculator.schema.name,
          "operatingSystem": "Any",
          "applicationCategory": "Finance"
        }
      }
    },
    metaTags: {
      title: calculator.title,
      description: calculator.description,
      keywords: calculator.keywords,
      ogTitle: calculator.title,
      ogDescription: calculator.description,
      ogImage: `https://www.financeloancalc.com/images/${calculator.image}`,
      twitterCard: "summary_large_image",
      twitterTitle: calculator.title,
      twitterDescription: calculator.description,
      twitterImage: `https://www.financeloancalc.com/images/${calculator.image}`
    },
    canonical: url,
    breadcrumbs: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.financeloancalc.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Calculators",
          "item": "https://www.financeloancalc.com/calculators"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": calculator.schema.name,
          "item": url
        }
      ]
    }
  };
}

// Example usage:
// const loanCalculatorSEO = generateCalculatorSEO('loan');
module.exports = {
  calculators,
  generateCalculatorSEO
};
