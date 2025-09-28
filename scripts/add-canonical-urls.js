import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of page files to their canonical paths
const pagePathMapping = {
  'AboutUsPage.jsx': '/about-us',
  'AgeCalculatorPage.jsx': '/age',
  'AutoLoanRefinanceCalculatorPage.jsx': '/auto-loan-refinance',
  'BigQueryCostCalculatorPage.jsx': '/bigquery-cost',
  'BudgetCalculatorPage.jsx': '/budget',
  'CalculatorsPage.jsx': '/calculators',
  'CaliforniaPaycheckCalculatorPage.jsx': '/california-paycheck',
  'CarAffordabilityCalculatorPage.jsx': '/car-affordability',
  'CarPaymentCalculatorPage.jsx': '/car-payment',
  'CitBankCalculatorPage.jsx': '/cit-bank',
  'CitBankHighYieldSavingsCalculatorPage.jsx': '/cit-high-yield-savings',
  'CitHysaCalculatorPage.jsx': '/cit-hysa',
  'CitMoneyMarketCalculatorPage.jsx': '/cit-money-market',
  'CitPlatinumSavingsCalculatorPage.jsx': '/cit-platinum-savings',
  'ContactUsPage.jsx': '/contact-us',
  'CostOfLivingCalculatorPage.jsx': '/cost-of-living',
  'DateCalculatorPage.jsx': '/date',
  'DebtConsolidationCalculatorPage.jsx': '/debt-consolidation',
  'DebtPayoffCalculatorPage.jsx': '/debt-payoff',
  'DunkCalculatorPage.jsx': '/dunk',
  'GradeCalculatorPage.jsx': '/grade',
  'GpaCalculatorPage.jsx': '/gpa',
  'GrossMarginCalculatorPage.jsx': '/gross-margin',
  'HelocCalculatorPage.jsx': '/heloc',
  'HomePage.jsx': '/home',
  'InvestmentGrowthCalculatorPage.jsx': '/finance',
  'LandLoanCalculatorPage.jsx': '/land-loan',
  'LoanComparisonCalculatorPage.jsx': '/loan-comparison',
  'MarginCalculatorPage.jsx': '/margin',
  'NotFoundPage.jsx': '/404',
  'OddsCalculatorPage.jsx': '/odds',
  'ParlayCalculatorPage.jsx': '/parlay',
  'PersonalLoanCalculatorPage.jsx': '/personal-loan',
  'PrivacyPolicyPage.jsx': '/privacy-policy',
  'ProfitMarginCalculatorPage.jsx': '/profit-margin',
  'RefinanceCalculatorPage.jsx': '/refinance',
  'RentCalculatorPage.jsx': '/rent',
  'RocketMortgageCalculatorPage.jsx': '/rocket-mortgage',
  'SalaryCalculatorPage.jsx': '/salary',
  'SavingsCalculatorPage.jsx': '/savings',
  'SnowDayCalculatorPage.jsx': '/snow-day',
  'StudentLoanCalculatorPage.jsx': '/student-loan',
  'TaxCalculatorPage.jsx': '/tax',
  'TermsOfServicePage.jsx': '/terms-of-service',
  'TimeCalculatorPage.jsx': '/time',
  'ZillowHomeValueCalculatorPage.jsx': '/zillow-home-value-calculator',
  'ZillowMortgageCalculatorPage.jsx': '/zillow-mortgage-calculator',
  'ZillowRentCalculatorPage.jsx': '/zillow-rent-calculator',
  'ZillowRoiCalculatorPage.jsx': '/zillow-roi-calculator',
  'ZillowZestimateCalculatorPage.jsx': '/zillow-zestimate-calculator'
};

const pagesDir = path.join(__dirname, '../src/pages');

console.log('Starting canonical URL addition process...\n');

let processedCount = 0;
let addedCount = 0;
let skippedCount = 0;

// Read all page files and add missing canonical URLs
Object.entries(pagePathMapping).forEach(([filename, canonicalPath]) => {
  const filePath = path.join(pagesDir, filename);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file has useSeo but no canonical property
    if (content.includes('useSeo({') && !content.includes(`canonical: "${canonicalPath}"`)) {
      // Find the useSeo call and add the canonical parameter
      const useSeoRegex = /useSeo\(\s*\{([^}]+)\}/;
      const match = content.match(useSeoRegex);
      
      if (match) {
        const useSeoContent = match[1];
        // Add canonical parameter after the first property
        const updatedUseSeo = useSeoContent.replace(
          /(title:\s*"[^"]+",?\s*)/,
          `$1canonical: "${canonicalPath}",\n    `
        );
        
        content = content.replace(useSeoRegex, `useSeo({\n    ${updatedUseSeo}}`);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Added canonical URL to ${filename}`);
        addedCount++;
      } else {
        console.log(`⚠️  Could not find useSeo call in ${filename}`);
        skippedCount++;
      }
    } else {
      console.log(`ℹ️  ${filename} already has canonical URL or no useSeo call`);
      skippedCount++;
    }
    processedCount++;
  } else {
    console.log(`❌ File not found: ${filename}`);
    skippedCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`- Processed: ${processedCount} files`);
console.log(`- Added canonical URLs: ${addedCount} files`);
console.log(`- Skipped: ${skippedCount} files`);
console.log('\n🎉 Canonical URLs addition process completed!'); 