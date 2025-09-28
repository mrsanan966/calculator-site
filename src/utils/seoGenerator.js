/**
 * SEO Content Generator
 * Generates unique, SEO-optimized content for each calculator page
 */

export const generateCalculatorSEO = (calculatorType, calculatorData) => {
  const seoTemplates = {
    mortgage: {
      title: "Free Mortgage Calculator 2024 - Calculate Monthly Payments & Amortization",
      description: "Calculate your monthly mortgage payments with our free mortgage calculator. Get accurate estimates for principal, interest, PMI, taxes, and insurance. View amortization schedules and compare loan options.",
      keywords: "mortgage calculator, mortgage payment calculator, home loan calculator, mortgage calculator with PMI, mortgage calculator with taxes, mortgage amortization calculator, mortgage calculator 2024, free mortgage calculator, monthly mortgage payment calculator, mortgage interest calculator, home affordability calculator",
      h1: "Free Mortgage Calculator 2024 - Calculate Monthly Payments & Amortization",
      content: {
        intro: "Calculate your monthly mortgage payments with our comprehensive mortgage calculator. Get accurate estimates for principal, interest, PMI, taxes, and insurance. View detailed amortization schedules and compare different loan options to make informed home-buying decisions.",
        benefits: [
          "Accurate calculations including PMI, taxes, and insurance",
          "Detailed amortization schedule showing principal vs interest",
          "Compare different loan terms and down payments",
          "Export results to PDF or Excel for your records"
        ],
        educational: {
          title: "Understanding Mortgages",
          content: "A mortgage is a loan used to purchase real estate. The property serves as collateral, and you make monthly payments over a set term until the loan is paid off. Understanding how mortgages work is crucial for making informed home-buying decisions."
        }
      }
    },
    'auto-loan': {
      title: "Free Auto Loan Calculator 2024 - Calculate Car Payment & Interest",
      description: "Calculate your monthly auto loan payments with our free auto loan calculator. Get accurate estimates for car payments, total interest, and loan costs. Compare different terms and rates.",
      keywords: "auto loan calculator, car loan calculator, auto loan payment calculator, car payment calculator, vehicle loan calculator, auto loan calculator 2024, free auto loan calculator, monthly car payment calculator, auto loan interest calculator, car financing calculator",
      h1: "Free Auto Loan Calculator 2024 - Calculate Car Payment & Interest",
      content: {
        intro: "Calculate your monthly auto loan payments with our comprehensive auto loan calculator. Get accurate estimates for car payments, total interest, and loan costs. Compare different terms, rates, and down payments to find the best auto financing option.",
        benefits: [
          "Accurate calculations including principal and interest",
          "Compare different loan terms and down payments",
          "Total cost analysis for informed decisions",
          "Affordability check to ensure payments fit your budget"
        ],
        educational: {
          title: "Understanding Auto Loans",
          content: "An auto loan is a secured loan used to purchase a vehicle. The car serves as collateral, and you make monthly payments over a set term until the loan is paid off. Understanding auto loan terms and rates is crucial for making informed car-buying decisions."
        }
      }
    },
    'student-loan': {
      title: "Free Student Loan Calculator 2024 - Calculate Payments & Forgiveness",
      description: "Calculate your monthly student loan payments with our free student loan calculator. Compare repayment plans, estimate loan forgiveness, and plan your payoff strategy.",
      keywords: "student loan calculator, student loan payment calculator, federal student loan calculator, student loan repayment calculator, student loan forgiveness calculator, student loan calculator 2024, free student loan calculator, monthly student loan payment calculator, student loan interest calculator, student loan payoff calculator",
      h1: "Free Student Loan Calculator 2024 - Calculate Payments & Forgiveness",
      content: {
        intro: "Calculate your monthly student loan payments with our comprehensive student loan calculator. Compare different repayment plans, estimate loan forgiveness benefits, and plan your student loan payoff strategy. Make informed decisions about your education debt.",
        benefits: [
          "Compare standard, income-driven, and graduated repayment plans",
          "Estimate potential loan forgiveness benefits",
          "See total interest paid under different plans",
          "Plan your student loan payoff strategy"
        ],
        educational: {
          title: "Understanding Student Loans",
          content: "Student loans are designed to help pay for education expenses. Federal loans offer flexible repayment options and borrower protections, while private loans may have lower rates for borrowers with excellent credit. Understanding your options is crucial for managing education debt."
        }
      }
    },
    'loan': {
      title: "Free Loan Calculator 2024 - Calculate Personal Loan Payments & Interest",
      description: "Calculate your monthly loan payments with our free loan calculator. Get accurate estimates for personal loans, total interest, and loan costs. Compare different terms and rates.",
      keywords: "loan calculator, personal loan calculator, loan payment calculator, loan interest calculator, loan calculator 2024, free loan calculator, monthly loan payment calculator, loan amortization calculator, personal loan payment calculator, loan payoff calculator",
      h1: "Free Loan Calculator 2024 - Calculate Personal Loan Payments & Interest",
      content: {
        intro: "Calculate your monthly loan payments with our comprehensive loan calculator. Get accurate estimates for personal loans, total interest, and loan costs. Compare different terms, rates, and loan amounts to find the best financing option.",
        benefits: [
          "Accurate calculations for any type of loan",
          "Compare different loan terms and interest rates",
          "Total cost analysis for informed decisions",
          "Amortization schedule showing payment breakdown"
        ],
        educational: {
          title: "Understanding Personal Loans",
          content: "A personal loan is an unsecured loan that can be used for various purposes. Unlike secured loans, personal loans don't require collateral but typically have higher interest rates. Understanding loan terms and rates is crucial for making informed borrowing decisions."
        }
      }
    },
    'investment': {
      title: "Free Investment Calculator 2024 - Calculate Growth & Returns",
      description: "Calculate your investment growth with our free investment calculator. Get accurate estimates for compound interest, future value, and investment returns. Plan your financial future.",
      keywords: "investment calculator, compound interest calculator, investment growth calculator, future value calculator, investment return calculator, investment calculator 2024, free investment calculator, retirement calculator, investment planning calculator, wealth calculator",
      h1: "Free Investment Calculator 2024 - Calculate Growth & Returns",
      content: {
        intro: "Calculate your investment growth with our comprehensive investment calculator. Get accurate estimates for compound interest, future value, and investment returns. Plan your financial future and achieve your investment goals.",
        benefits: [
          "Calculate compound interest and future value",
          "Compare different investment scenarios",
          "Plan for retirement and long-term goals",
          "See the power of consistent investing"
        ],
        educational: {
          title: "Understanding Investment Growth",
          content: "Investment growth is driven by compound interest, where your earnings generate additional earnings over time. Understanding how investments grow is crucial for building long-term wealth and achieving financial goals."
        }
      }
    }
  };

  return seoTemplates[calculatorType] || seoTemplates['loan'];
};

export const generateFAQs = (calculatorType) => {
  const faqTemplates = {
    mortgage: [
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
      }
    ],
    'auto-loan': [
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
      }
    ],
    'student-loan': [
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
      }
    ]
  };

  return faqTemplates[calculatorType] || faqTemplates['loan'] || [];
};

export const generateEducationalContent = (calculatorType) => {
  const contentTemplates = {
    mortgage: {
      title: "Understanding Mortgages",
      sections: [
        {
          title: "How Mortgages Work",
          content: "A mortgage is a loan used to purchase real estate. The property serves as collateral, and you make monthly payments over a set term until the loan is paid off. Understanding how mortgages work is crucial for making informed home-buying decisions."
        },
        {
          title: "Monthly Payment Formula",
          content: "Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1) where P = Principal, r = Monthly Interest Rate, n = Number of Payments"
        },
        {
          title: "Key Factors to Consider",
          content: "Down payment reduces loan amount and monthly payments. Interest rate affects total cost and monthly payments. Loan term impacts payment amount and total interest. Credit score impacts interest rate and loan approval."
        }
      ]
    },
    'auto-loan': {
      title: "Understanding Auto Loans",
      sections: [
        {
          title: "How Auto Loans Work",
          content: "An auto loan is a secured loan used to purchase a vehicle. The car serves as collateral, and you make monthly payments over a set term until the loan is paid off. Understanding auto loan terms and rates is crucial for making informed car-buying decisions."
        },
        {
          title: "Auto Loan Payment Formula",
          content: "Monthly Payment = P × (r × (1 + r)^n) / ((1 + r)^n - 1) where P = Loan Amount, r = Monthly Interest Rate, n = Number of Payments"
        },
        {
          title: "Key Factors to Consider",
          content: "Vehicle price affects loan amount. Down payment reduces loan amount and monthly payments. Interest rate affects total cost and monthly payments. Loan term impacts payment amount and total interest."
        }
      ]
    }
  };

  return contentTemplates[calculatorType] || contentTemplates['mortgage'];
};

export const generateSchemaMarkup = (calculatorType, seoData) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": seoData.title,
    "description": seoData.description,
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
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": generateFAQs(calculatorType).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return [baseSchema, faqSchema];
};
