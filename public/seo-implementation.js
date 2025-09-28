// SEO Implementation for Calculator Pages

// Schema Markup for Calculator Pages
const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Finance Loan Calculator",
  "description": "Free online calculators for finance, loans, and personal finance calculations",
  "applicationCategory": "Finance",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "itemOffered": {
      "@type": "SoftwareApplication",
      "name": "Finance Loan Calculator",
      "operatingSystem": "Any",
      "applicationCategory": "Finance"
    }
  }
};

// Breadcrumb Schema
const calculatorBreadcrumb = {
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
    }
  ]
};

// SEO Meta Tags for Calculator Pages
const calculatorMetaTags = {
  title: "Free Online Calculator | Finance Loan Calculator",
  description: "Free online calculators for finance, loans, and personal finance calculations. Use our calculators to make informed financial decisions.",
  keywords: "calculator, finance calculator, loan calculator, online calculator, financial tools",
  ogTitle: "Finance Loan Calculator - Free Online Calculators",
  ogDescription: "Free online calculators for finance, loans, and personal finance calculations. Make informed financial decisions with our calculators.",
  ogImage: "https://www.financeloancalc.com/images/calculator-share.jpg",
  twitterCard: "summary_large_image",
  twitterTitle: "Finance Loan Calculator",
  twitterDescription: "Free online calculators for finance, loans, and personal finance calculations.",
  twitterImage: "https://www.financeloancalc.com/images/calculator-share.jpg"
};

// Function to generate SEO tags for each calculator page
function generateCalculatorSEO(calculatorName) {
  const seoTags = {
    title: `${calculatorName} Calculator | Finance Loan Calculator`,
    description: `Free ${calculatorName.toLowerCase()} calculator online. Calculate ${calculatorName.toLowerCase()} easily with our accurate calculator.`,
    keywords: `${calculatorName.toLowerCase()} calculator, ${calculatorName.toLowerCase()} calculation, online ${calculatorName.toLowerCase()} calculator`,
    ogTitle: `${calculatorName} Calculator | Finance Loan Calculator`,
    ogDescription: `Free ${calculatorName.toLowerCase()} calculator online. Calculate ${calculatorName.toLowerCase()} easily with our accurate calculator.`,
    ogImage: `https://www.financeloancalc.com/images/${calculatorName.toLowerCase()}-calculator.jpg`,
    twitterCard: "summary_large_image",
    twitterTitle: `${calculatorName} Calculator`,
    twitterDescription: `Free ${calculatorName.toLowerCase()} calculator online. Calculate ${calculatorName.toLowerCase()} easily with our accurate calculator.`,
    twitterImage: `https://www.financeloancalc.com/images/${calculatorName.toLowerCase()}-calculator.jpg`
  };
  
  return seoTags;
}

// List of all calculator pages
const calculatorPages = [
  "time",
  "tax",
  "student-loan",
  "rocket-mortgage",
  "mortgage",
  "profit-margin",
  "personal-loan",
  "parlay",
  "odds",
  "margin",
  "loan",
  "land-loan",
  "investment-growth",
  "grade",
  "gpa",
  "auto-loan",
  "age"
];

// Generate SEO implementation for all calculator pages
const seoImplementation = {
  schema: calculatorSchema,
  breadcrumb: calculatorBreadcrumb,
  metaTags: calculatorMetaTags,
  calculatorPages: calculatorPages.map(page => ({
    name: page,
    seo: generateCalculatorSEO(page.replace(/-/g, " "))
  }))
};

// Export SEO implementation
module.exports = seoImplementation;
