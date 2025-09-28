import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the sitemap
const sitemapContent = fs.readFileSync('sitemap.xml', 'utf8');

// Extract all calculator URLs
const calculatorUrls = sitemapContent.match(/<url>.*?<loc>(https:\/\/financeloancalc\.com\/.*?calculator)<\/loc>/g);

// Generate redirect rules
const redirects = [];

// Helper function to create redirect rules
function createRedirectRule(fromUrl, toUrl) {
    return {
        from: fromUrl,
        to: toUrl,
        status: 301
    };
}

// Process each calculator URL
if (calculatorUrls) {
    calculatorUrls.forEach(url => {
        // Extract the URL path
        const match = url.match(/financeloancalc\.com\/(.*?)calculator/);
        if (match) {
            const baseName = match[1];
            const hyphenatedName = baseName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            
            // Create redirect rules
            redirects.push(
                createRedirectRule(`www.financeloancalc.com/${baseName}calculator`, `https://www.financeloancalc.com/${hyphenatedName}-calculator`),
                createRedirectRule(`financeloancalc.com/${baseName}calculator`, `https://www.financeloancalc.com/${hyphenatedName}-calculator`),
                createRedirectRule(`financeloancalc.com/${hyphenatedName}-calculator`, `https://www.financeloancalc.com/${hyphenatedName}-calculator`)
            );
        }
    });
}

// Add special case redirects
const specialCases = [
    {
        from: 'www.financeloancalc.com/timecalculator',
        to: 'https://www.financeloancalc.com/time'
    },
    {
        from: 'financeloancalc.com/timecalculator',
        to: 'https://www.financeloancalc.com/time'
    },
    {
        from: 'financeloancalc.com/time',
        to: 'https://www.financeloancalc.com/time'
    }
];

specialCases.forEach(sc => redirects.push(createRedirectRule(sc.from, sc.to)));

// Write the redirects to a file
const redirectsJson = {
    redirects: redirects,
    canonical_urls: redirects.map(r => r.to)
};

fs.writeFileSync('calculator-redirects.json', JSON.stringify(redirectsJson, null, 2));

console.log(`Generated ${redirects.length} redirect rules.`);
