import React from "react";
import { Link } from "react-router-dom";
import { Calculator, Heart, ChevronRight } from "lucide-react";
import { calculators } from "@/data/calculators.jsx";
import { Helmet } from "react-helmet-async";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Group calculators by category
  const calculatorsByCategory = calculators.reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {});

  // Get top 6 financial calculators
  const topFinancialCalculators = calculatorsByCategory["Financial"]?.slice(0, 6) || [];

  // Generate schema markup for footer
  const footerSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Footer Navigation",
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Financial Calculators",
        "url": "/",
        "description": "Access our collection of financial calculators"
      },
      {
        "@type": "WebPage",
        "name": "About Us",
        "url": "/about-us",
        "description": "Learn more about FinCalc"
      },
      {
        "@type": "WebPage",
        "name": "Contact Us",
        "url": "/contact-us",
        "description": "Get in touch with FinCalc"
      }
    ]
  };

  return (
    <footer className="border-t bg-background mt-16" role="contentinfo" aria-label="Site Footer">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(footerSchema)}
        </script>
      </Helmet>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 flex flex-col space-y-4 mb-8 lg:mb-0">
            <Link to="/" className="flex items-center space-x-2" aria-label="FinCalc Home">
              <img 
                src="/logo.png" 
                alt="FinCalc - Finance Loan Calculator Logo" 
                className="h-10 w-auto"
                width="40"
                height="40"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for financial and utility calculations.
            </p>
          </div>

          {/* Financial Calculators */}
          <nav aria-label="Financial Calculators">
            <h3 className="mb-4 text-sm font-semibold">Financial Calculators</h3>
            <ul className="space-y-2 text-sm">
              {topFinancialCalculators.map((calc) => (
                <li key={calc.path}>
                  <Link 
                    to={calc.path} 
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`${calc.title} Calculator`}
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  to="/" 
                  className="text-primary hover:text-primary/80 flex items-center"
                  aria-label="View all calculators"
                >
                  View All Calculators
                  <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Academic & Utility Calculators */}
          <nav aria-label="Academic and Utility Calculators">
            <h3 className="mb-4 text-sm font-semibold">Academic & Utility</h3>
            <ul className="space-y-2 text-sm">
              {calculatorsByCategory["Academic & Utility"]?.map((calc) => (
                <li key={calc.path}>
                  <Link 
                    to={calc.path} 
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`${calc.title} Calculator`}
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Fun Calculators */}
          <nav aria-label="Fun Calculators">
            <h3 className="mb-4 text-sm font-semibold">Fun Calculators</h3>
            <ul className="space-y-2 text-sm">
              {calculatorsByCategory["Fun"]?.map((calc) => (
                <li key={calc.path}>
                  <Link 
                    to={calc.path} 
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={`${calc.title} Calculator`}
                  >
                    {calc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav aria-label="Company Information">
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/about-us" 
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="About FinCalc"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact-us" 
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Contact FinCalc"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Privacy Policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms-of-service" 
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Terms of Service"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} FinCalc by financeloancalc.com. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" aria-hidden="true" /> for your planning success
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  