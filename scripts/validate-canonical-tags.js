import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CALCULATORS } from '../src/config/calculators.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract canonical URLs from a file
const extractCanonicalUrls = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const canonicalRegex = /canonical:\s*['"]([^'"]+)['"]/g;
  const urls = [];
  let match;

  while ((match = canonicalRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  return urls;
};

// Function to find all JSX files recursively
const findJsxFiles = (dir) => {
  const files = fs.readdirSync(dir);
  const jsxFiles = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      jsxFiles.push(...findJsxFiles(filePath));
    } else if (file.endsWith('.jsx')) {
      jsxFiles.push(filePath);
    }
  });

  return jsxFiles;
};

// Main validation function
const validateCanonicalUrls = () => {
  const pagesDir = path.join(__dirname, '../src/pages');
  const jsxFiles = findJsxFiles(pagesDir);
  const canonicalUrls = new Map();
  const duplicates = new Map();
  const missingCanonicals = [];
  const invalidCanonicals = [];

  // Check all JSX files
  jsxFiles.forEach(file => {
    const urls = extractCanonicalUrls(file);
    if (urls.length === 0) {
      missingCanonicals.push(file);
    } else {
      urls.forEach(url => {
        if (!canonicalUrls.has(url)) {
          canonicalUrls.set(url, file);
        } else {
          if (!duplicates.has(url)) {
            duplicates.set(url, [canonicalUrls.get(url)]);
          }
          duplicates.get(url).push(file);
        }

        // Validate URL format - accept both absolute and relative URLs
        if (!url.startsWith('https://') && !url.startsWith('http://') && !url.startsWith('/')) {
          invalidCanonicals.push({ file, url });
        }
      });
    }
  });

  // Check against calculator configuration
  Object.values(CALCULATORS).forEach(calculator => {
    const expectedUrl = `${calculator.path}`;
    if (!canonicalUrls.has(expectedUrl)) {
      missingCanonicals.push(`Calculator: ${calculator.name}`);
    }
  });

  // Print results
  console.log('\n=== Canonical URL Validation Results ===\n');

  if (duplicates.size > 0) {
    console.log('Duplicate Canonical URLs:');
    duplicates.forEach((files, url) => {
      console.log(`\nURL: ${url}`);
      files.forEach(file => console.log(`  - ${file}`));
    });
  }

  if (missingCanonicals.length > 0) {
    console.log('\nMissing Canonical URLs:');
    missingCanonicals.forEach(file => console.log(`  - ${file}`));
  }

  if (invalidCanonicals.length > 0) {
    console.log('\nInvalid Canonical URLs:');
    invalidCanonicals.forEach(({ file, url }) => {
      console.log(`  - ${file}: ${url}`);
    });
  }

  if (duplicates.size === 0 && missingCanonicals.length === 0 && invalidCanonicals.length === 0) {
    console.log('All canonical URLs are valid and unique!');
  }

  // Return results for potential CI/CD integration
  return {
    hasDuplicates: duplicates.size > 0,
    hasMissing: missingCanonicals.length > 0,
    hasInvalid: invalidCanonicals.length > 0,
    duplicates,
    missingCanonicals,
    invalidCanonicals
  };
};

// Run validation
validateCanonicalUrls(); 