import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { Readable } from 'stream';
import { glob } from 'glob';

// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://financeloancalc.com';
const PAGES_DIR = path.join(__dirname, '../src/pages');
const OUTPUT_FILE = path.join(__dirname, '../dist/sitemap.xml');
const SITEMAP_MAX_ENTRIES = 50000; // Google's limit per sitemap file

// Priority levels for different page types
const PRIORITY = {
  HOME: 1.0,
  CALCULATOR: 0.9,
  BLOG: 0.8,
  INFO: 0.7,
  LEGAL: 0.3
};

// Static pages that should be included in the sitemap
const STATIC_PAGES = [
  { url: '/', priority: PRIORITY.HOME, changefreq: 'daily' },
  { url: '/about-us', priority: PRIORITY.INFO, changefreq: 'monthly' },
  { url: '/privacy-policy', priority: PRIORITY.LEGAL, changefreq: 'monthly' },
  { url: '/terms-of-service', priority: PRIORITY.LEGAL, changefreq: 'monthly' },
  { url: '/contact-us', priority: PRIORITY.INFO, changefreq: 'monthly' },
];

// Map of file names to their canonical URLs
const ROUTE_MAP = {
  'MortgageCalculatorPage': '/mortgage',
  'HelocCalculatorPage': '/heloc',
  'LoanCalculatorPage': '/loan',
  'StudentLoanCalculatorPage': '/student-loan',
  'AutoLoanCalculatorPage': '/auto-loan',
  'TaxCalculatorPage': '/tax',
  'RefinanceCalculatorPage': '/refinance',
  'PersonalLoanCalculatorPage': '/personal-loan',
  'InvestmentGrowthCalculatorPage': '/finance',
  'MarginCalculatorPage': '/margin',
  'ProfitMarginCalculatorPage': '/profit-margin',
  'GrossMarginCalculatorPage': '/gross-margin',
  'AdpPaycheckCalculatorPage': '/adp-paycheck',
  'CaliforniaPaycheckCalculatorPage': '/california-paycheck',
  'CitPlatinumSavingsCalculatorPage': '/cit-platinum-savings',
  'OddsCalculatorPage': '/odds',
  'ParlayCalculatorPage': '/parlay',
  'LandLoanCalculatorPage': '/land-loan',
  'SnowDayCalculatorPage': '/snow-day',
  'DunkCalculatorPage': '/dunk',
  'GradeCalculatorPage': '/grade',
  'AgeCalculatorPage': '/age',
  'GpaCalculatorPage': '/gpa',
  'TimeCalculatorPage': '/time',
  'BigQueryCostCalculatorPage': '/bigquery-cost',
  'BirthNegligenceCompensationCalculatorPage': '/birth-negligence',
  'CitBankCalculatorPage': '/cit-bank',
  'CitBankHighYieldSavingsCalculatorPage': '/cit-high-yield-savings',
  'CitHysaCalculatorPage': '/cit-hysa',
  'RocketMortgageCalculatorPage': '/rocket-mortgage',
  'AutoLoanRefinanceCalculatorPage': '/auto-loan-refinance',
  'BudgetCalculatorPage': '/budget',
  'CarAffordabilityCalculatorPage': '/car-affordability',
  'CarPaymentCalculatorPage': '/car-payment',
  'CostOfLivingCalculatorPage': '/cost-of-living',
  'DebtConsolidationCalculatorPage': '/debt-consolidation',
  'DebtPayoffCalculatorPage': '/debt-payoff',
  'LoanComparisonCalculatorPage': '/loan-comparison',
  'SalaryCalculatorPage': '/salary',
  'SavingsCalculatorPage': '/savings',
  // New calculators
  'DecimalCalculatorPage': '/decimal',
  'FractionCalculatorPage': '/fraction',
  'PercentageCalculatorPage': '/percentage',
  'DateCalculatorPage': '/date',
  'RoiCalculatorPage': '/roi',
  'StockReturnCalculatorPage': '/stock-return',
  'TipCalculatorPage': '/tip',
  'TaxRefundCalculatorPage': '/tax-refund',
  'ZillowRentCalculatorPage': '/zillow-rent-calculator',
  'ZillowRoiCalculatorPage': '/zillow-roi-calculator',
  'ZillowMortgageCalculatorPage': '/zillow-mortgage-calculator',
  'ZillowHomeValueCalculatorPage': '/zillow-home-value-calculator',
  'WeddingLoanCalculatorPage': '/wedding-loan',
  'VaLoanCalculatorPage': '/va-loan',
  'SnowLoadCalculator': '/snow-load'
};

// Find all page files in the pages directory
async function findPageFiles() {
  try {
    const files = await glob('**/*.jsx', { cwd: PAGES_DIR });
    return files;
  } catch (err) {
    console.error('Error finding page files:', err);
    throw err;
  }
}

// Convert file path to URL and get metadata
function getPageMetadata(filePath) {
  // Get the base name without extension
  const baseName = path.basename(filePath, '.jsx');
  
  // Get the URL from the route map
  const url = ROUTE_MAP[baseName];
  
  // Skip if no mapping found
  if (!url) {
    return null;
  }
  
  // Set priority based on page type
  let priority = PRIORITY.INFO;
  let changefreq = 'weekly';
  
  // Set priority for calculator pages
  if (baseName.includes('Calculator')) {
    priority = PRIORITY.CALCULATOR;
    changefreq = 'weekly';
  }
  
  return {
    url,
    priority,
    changefreq,
    lastmod: new Date().toISOString()
  };
}

// Generate sitemap
async function generateSitemap() {
  try {
    console.log('🚀 Starting sitemap generation...');
    
    // Find all page files
    const files = await findPageFiles();
    console.log(`📂 Found ${files.length} page files`);
    
    // Filter out special pages (_app, _document, etc.) and test files
    const pageFiles = files.filter(file => 
      !file.startsWith('_') && 
      !file.includes('[') && 
      !file.includes('test') &&
      !file.includes('Test')
    );
    
    console.log(`📄 Processing ${pageFiles.length} valid pages`);
    
    // Create a map to store URLs and ensure uniqueness
    const urlMap = new Map();
    const now = new Date().toISOString();
    
    // Process static pages first
    STATIC_PAGES.forEach(page => {
      const url = page.url;
      urlMap.set(url, { 
        ...page, 
        lastmod: now 
      });
    });
    
    // Process dynamic pages
    pageFiles.forEach(file => {
      const page = getPageMetadata(file);
      if (page) {
        const url = page.url;
        // If URL already exists, keep the one with higher priority
        if (!urlMap.has(url) || urlMap.get(url).priority < page.priority) {
          urlMap.set(url, {
            ...page,
            lastmod: now
          });
        }
      }
    });
    
    // Convert map back to array and sort by priority
    const pages = Array.from(urlMap.values()).sort((a, b) => b.priority - a.priority);
    
    // Create sitemap stream with proper configuration
    const sitemapConfig = {
      hostname: SITE_URL,
      lastmod: true,
      xmlns: {
        image: false,
        video: false,
        news: false,
        xhtml: true,
        custom: [
          'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
          'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        ]
      },
      pretty: true
    };
    
    const stream = new SitemapStream(sitemapConfig);
    
    // Convert pages to a readable stream
    const readable = Readable.from(pages);
    
    // Ensure the dist directory exists
    const distDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Pipe the readable stream to the sitemap stream
    readable.pipe(stream);
    
    // Convert the stream to a promise and get the sitemap
    const sitemap = await streamToPromise(stream);
    
    // Write the sitemap to file
    fs.writeFileSync(OUTPUT_FILE, sitemap.toString());
    
    // Create gzipped version
    const gzip = createGzip();
    const gzipStream = fs.createWriteStream(`${OUTPUT_FILE}.gz`);
    Readable.from(sitemap.toString()).pipe(gzip).pipe(gzipStream);
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`📝 Sitemap written to: ${OUTPUT_FILE}`);
    console.log(`📦 Gzipped sitemap written to: ${OUTPUT_FILE}.gz`);
    
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
    throw err;
  }
}

// Run the sitemap generation
generateSitemap().catch(console.error);
