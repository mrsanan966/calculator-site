import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/homepage/HeroSection";
import CalculatorGridSection from "@/components/homepage/CalculatorGridSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import FaqSection from "@/components/homepage/FaqSection";
import RelatedContentSection from "@/components/homepage/RelatedContentSection";
import CtaSection from "@/components/homepage/CtaSection";
import PageLayout from "@/components/PageLayout";
import { calculators } from "@/data/calculators";
import { faqItems } from "@/data/faq";
import { relatedContent } from "@/data/relatedContent";
import { FaCalculator, FaChartLine, FaMoneyBillWave, FaUniversity, FaCar, FaHome, FaGraduationCap, FaClock } from "react-icons/fa";
import useSeo from '@/hooks/useSeo';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace("#", ""));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const pageTitle = "Free Financial & Utility Calculators 2025 - Smart Money Tools";
  const pageDescription = "Access our comprehensive collection of free financial and utility calculators. From mortgage and loan planning to academic and time management tools, make informed decisions with our easy-to-use calculators. Updated for 2025 with the latest rates and formulas.";

  const categories = [
    {
      title: "Financial Calculators",
      description: "Plan your finances with our comprehensive suite of financial calculators",
      icon: FaMoneyBillWave,
      items: [
        "Mortgage Calculator",
        "Loan Calculator",
        "Investment Growth Calculator",
        "Savings Calculator"
      ]
    },
    {
      title: "Academic Calculators",
      description: "Simplify your academic calculations with our educational tools",
      icon: FaGraduationCap,
      items: [
        "GPA Calculator",
        "Grade Calculator"
      ]
    },
    {
      title: "Time & Date Calculators",
      description: "Manage your time effectively with our time calculation tools",
      icon: FaClock,
      items: [
        "Time Calculator",
        "Age Calculator"
      ]
    },
    {
      title: "Specialized Calculators",
      description: "Access specialized tools for specific needs",
      icon: FaCalculator,
      items: [
        "Debt Payoff Calculator",
        "Budget Calculator",
        "Salary Calculator"
      ]
    }
  ];

  const benefits = [
    {
      title: "Free to Use",
      description: "All our calculators are completely free to use, with no hidden fees or subscriptions required."
    },
    {
      title: "Accurate Results",
      description: "Our calculators use up-to-date formulas and rates to provide accurate results for your calculations."
    },
    {
      title: "Easy to Use",
      description: "Simple, intuitive interfaces make it easy to get the results you need quickly and efficiently."
    },
    {
      title: "Comprehensive Tools",
      description: "From basic calculations to complex financial planning, we have tools for every need."
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Finance Loan Calc",
    "url": "https://financeloancalc.com",
    "description": pageDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://financeloancalc.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  useSeo({
    title: 'Home',
    description: 'Welcome to our financial calculator app.',
    keywords: 'financial, calculator, home',
    canonical: '/home',
    path: '/',
    ogType: 'website'
  });

  return (
    <PageLayout 
      title={pageTitle}
      description={pageDescription}
      path=""
      schemaMarkup={[schemaMarkup]}
      keywords="financial calculators, utility calculators, mortgage calculator, loan calculator, investment calculator, savings calculator, gpa calculator, grade calculator, percentage calculator, statistics calculator, date calculator, time calculator, age calculator, countdown timer, bmi calculator, calorie calculator, unit converter, currency converter"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-screen"
      >
        <HeroSection />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Calculator Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <category.icon className="text-4xl text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-gray-700">
                        <span className="text-blue-600 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CalculatorGridSection calculators={calculators} />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Calculators?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturesSection />
        <FaqSection faqItems={faqItems} />
        <RelatedContentSection relatedContent={relatedContent} />
        <CtaSection />
      </motion.div>
    </PageLayout>
  );
};

export default HomePage;
  