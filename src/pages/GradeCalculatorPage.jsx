import React from 'react';
import GradeCalculator from '@/components/calculators/grade/GradeCalculator';
import useSeo from '@/hooks/useSeo';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';

const GradeCalculatorPage = () => {
  useSeo({
    
    
    title: "Grade Calculator - Calculate Your Course Grade",
    canonical: "/grade",
    path: "/grade",
    description: "Easily calculate your current course grade or determine what grade you need on future assignments to achieve your target overall grade. Supports weighted categories.",
    schemaMarkup: {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use the Grade Calculator",
      "description": "Calculate your current grade in a course or find out what you need on future assignments to achieve a desired overall grade.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Add Assignments/Categories",
          "text": "Enter each assignment or category name, its grade (e.g., 85/100 or 85%), and its weight in the overall course grade (e.g., 20%).",
          "url": "https://financeloancalc.com/grade#form"
        },
        {
          "@type": "HowToStep",
          "name": "Calculate Current Grade",
          "text": "The calculator will show your current weighted average grade based on the entered assignments.",
          "url": "https://financeloancalc.com/grade#results"
        },
        {
          "@type": "HowToStep",
          "name": "(Optional) Target Grade",
          "text": "Enter your desired final grade for the course to see what average you need on remaining assignments.",
          "url": "https://financeloancalc.com/grade#target"
        }
      ],
      "tool": [{ "@type": "HowToTool", "name": "FinCalc Grade Calculator" }],
      "totalTime": "PT2M"
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 py-8">
          <Breadcrumbs />
          <GradeCalculator />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GradeCalculatorPage; 