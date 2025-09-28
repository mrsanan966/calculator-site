# SEO Implementation Guide for Calculator Pages

This guide explains how to properly implement SEO for new calculator pages using our standardized components and patterns.

## Table of Contents
1. [Calculator Page Template](#calculator-page-template)
2. [Required SEO Elements](#required-seo-elements)
3. [Schema.org Markup](#schemaorg-markup)
4. [Breadcrumbs](#breadcrumbs)
5. [FAQ Section](#faq-section)
6. [How-To Guide](#how-to-guide)
7. [Best Practices](#best-practices)

## Calculator Page Template

All calculator pages should use the `CalculatorPage` template component which handles most of the SEO implementation automatically:

```jsx
import React from 'react';
import CalculatorPage from '@/templates/CalculatorPage';
import YourCalculatorComponent from '@/components/calculators/your-calculator';

const YourCalculatorPage = () => {
  return (
    <CalculatorPage
      // Required props
      calculatorName="Your Calculator Name"
      calculatorComponent={YourCalculatorComponent}
      calculatorDescription="Brief description of what this calculator does and who it's for."
      
      // SEO Metadata
      seoTitle="Your Calculator Name - Specific Title | FinCalc"
      seoDescription="Detailed 150-160 character description for search engines."
      seoKeywords="comma, separated, keywords, for, this, calculator"
      
      // Schema.org structured data
      calculatorInputs={[...]}
      calculatorOutputs={[...]}
      faqs={[...]}
      howToSteps={[...]}
      howToSupplies={[...]}
      howToTotalTime="PT5M"
    />
  );
};

export default YourCalculatorPage;
```

## Required SEO Elements

### 1. Page Title
- Format: `{Calculator Name} Calculator - {Specific Benefit/Feature} | {Site Name}`
- Keep under 60 characters
- Include primary keyword at the beginning
- Example: `Mortgage Calculator - Estimate Your Monthly Payments | FinCalc`

### 2. Meta Description
- 150-160 characters
- Include primary keyword and value proposition
- Clear call-to-action
- Example: "Calculate your monthly mortgage payments, compare loan terms, and understand total interest costs with our free mortgage calculator. See how much house you can afford today!"

### 3. URL Structure
- Format: `/calculator-name-calculator`
- Use hyphens to separate words
- Keep it short and descriptive
- Example: `/mortgage-calculator`

## Schema.org Markup

The template automatically generates the following schema types:

### 1. SoftwareApplication Schema
- Describes the calculator as a web application
- Includes input/output parameters
- Shows rating and pricing information

### 2. FAQ Schema
- For the FAQ section
- Appears as rich results in search
- Improves click-through rates

### 3. HowTo Schema
- Step-by-step instructions
- Appears in search results
- Increases visibility

## Breadcrumbs

The breadcrumb navigation is automatically generated based on the URL structure. To customize:

1. Update the `breadcrumbNameMap` in `src/components/Breadcrumbs.jsx`
2. Add your calculator's path and display name

```javascript
const breadcrumbNameMap = {
  // ... existing mappings
  'your-calculator': 'Your Calculator Display Name',
};
```

## FAQ Section

Include 5-10 relevant FAQs for your calculator. Each should:
- Answer common user questions
- Include relevant keywords naturally
- Be concise but informative

```javascript
const faqs = [
  {
    question: "How is the monthly payment calculated?",
    answer: "The monthly payment is calculated using the standard formula..."
  },
  // More FAQs...
];
```

## How-To Guide

Provide step-by-step instructions for using the calculator:

```javascript
const howToSteps = [
  {
    name: "Enter Your Information",
    text: "Input the required fields in the calculator form.",
    url: "#calculator-form"
  },
  // More steps...
];

const howToSupplies = [
  "Loan amount",
  "Interest rate",
  // More supplies...
];
```

## Best Practices

1. **Keyword Research**
   - Use tools like Google Keyword Planner
   - Target long-tail keywords
   - Include location-based terms if relevant

2. **Content Quality**
   - Write unique, valuable content
   - Use headings properly (H1, H2, H3)
   - Include relevant images with alt text

3. **Performance**
   - Ensure fast loading times
   - Optimize images
   - Use lazy loading for below-the-fold content

4. **Mobile Optimization**
   - Ensure calculator is fully responsive
   - Test on various devices
   - Use touch-friendly controls

5. **Internal Linking**
   - Link to related calculators
   - Link to relevant blog posts
   - Use descriptive anchor text

6. **Structured Data**
   - Validate with Google's Rich Results Test
   - Keep schema markup up to date
   - Monitor for errors in Search Console

7. **User Experience**
   - Make the calculator easy to use
   - Provide clear instructions
   - Show example values

## Monitoring and Maintenance

1. **Google Search Console**
   - Monitor for crawl errors
   - Check search performance
   - Fix any reported issues

2. **Analytics**
   - Track user interactions
   - Monitor bounce rates
   - Identify popular calculators

3. **Regular Updates**
   - Update content regularly
   - Refresh FAQs based on user queries
   - Keep up with algorithm changes

By following these guidelines, you'll ensure that each calculator page is optimized for search engines while providing the best possible experience for your users.
