import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import useSeo from '@/hooks/useSeo';
import Footer from '@/components/Footer';
import { 
  generateCalculatorSchema, 
  generateFaqSchema, 
  generateHowToSchema 
} from '@/utils/seoUtils';

/**
 * Calculator Page Template
 * Provides consistent SEO implementation for all calculator pages
 */
const CalculatorPage = ({
  // Required props
  calculatorName,
  calculatorDescription,
  calculatorComponent: CalculatorComponent,
  
  // SEO props
  seoTitle,
  seoDescription,
  seoKeywords = '',
  
  // Schema props
  calculatorInputs = [],
  calculatorOutputs = [],
  faqs = [],
  howToSteps = [],
  howToSupplies = [],
  howToTotalTime = 'PT5M',
  
  // Additional props to pass to the calculator component
  ...calculatorProps 
}) => {
  const location = useLocation();
  const canonicalPath = location.pathname;
  
  // Generate schema.org structured data
  const calculatorSchema = generateCalculatorSchema({
    name: calculatorName,
    description: calculatorDescription,
    keywords: seoKeywords,
    inputs: calculatorInputs,
    outputs: calculatorOutputs
  });
  
  const faqSchema = faqs.length > 0 ? generateFaqSchema(faqs) : null;
  
  const howToSchema = howToSteps.length > 0 
    ? generateHowToSchema({
        name: `How to Use the ${calculatorName} Calculator`,
        description: `Learn how to use our ${calculatorName} calculator with this step-by-step guide.`,
        steps: howToSteps,
        supplies: howToSupplies,
        totalTime: howToTotalTime
      })
    : null;
  
  // Combine all schema data
  const schemaMarkup = [
    calculatorSchema,
    ...(faqSchema ? [faqSchema] : []),
    ...(howToSchema ? [howToSchema] : [])
  ];
  
  // Set up SEO metadata
  useSeo({
    title: seoTitle || `${calculatorName} Calculator`,
    description: seoDescription || calculatorDescription,
    keywords: seoKeywords,
    schemaMarkup,
    canonical: canonicalPath,
    type: 'tool',
  });
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{calculatorName} Calculator</h1>
        <p className="text-lg text-muted-foreground">{calculatorDescription}</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg shadow-md p-4 sm:p-6">
            <CalculatorComponent {...calculatorProps} />
          </div>
          
          {faqs.length > 0 && (
            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-medium">{faq.question}</h3>
                    <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-4">Related Calculators</h2>
            <div className="space-y-4">
              {/* Add related calculators here */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

CalculatorPage.propTypes = {
  // Required props
  calculatorName: PropTypes.string.isRequired,
  calculatorDescription: PropTypes.string.isRequired,
  calculatorComponent: PropTypes.elementType.isRequired,
  
  // SEO props
  seoTitle: PropTypes.string,
  seoDescription: PropTypes.string,
  seoKeywords: PropTypes.string,
  
  // Schema props
  calculatorInputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      unit: PropTypes.string,
      required: PropTypes.bool,
    })
  ),
  calculatorOutputs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      unit: PropTypes.string,
    })
  ),
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ),
  howToSteps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ),
  howToSupplies: PropTypes.arrayOf(PropTypes.string),
  howToTotalTime: PropTypes.string,
};

export default CalculatorPage;
