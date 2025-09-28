/**
 * This script checks for broken links in the application.
 * Run with: node scripts/check-broken-links.js
 */

const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const axios = require('axios');
const cheerio = require('cheerio');

// Configuration
const SITE_DOMAIN = 'financeloancalc.com'; // Change this to your local development domain
const BASE_URL = `https://${SITE_DOMAIN}`;
const MAX_CONCURRENT_REQUESTS = 5;
const TIMEOUT = 10000; // 10 seconds

// File extensions to check for links
const FILE_EXTENSIONS = ['.html', '.jsx', '.tsx', '.js', '.ts'];

// Directories to scan
const SCAN_DIRECTORIES = [
  'src',
  'public',
];

// Files to exclude
const EXCLUDE_FILES = [
  'node_modules',
  '.git',
  '.next',
  'build',
  'dist',
  '*.d.ts',
];

// Track links
const linkStatus = new Map(); // url -> { status, referringPages: Set() }
const pagesToVisit = new Set();
const visitedPages = new Set();
const externalDomains = new Set();

// HTTP client with retry
const http = axios.create({
  timeout: TIMEOUT,
  validateStatus: () => true, // Don't throw on HTTP errors
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

// Find all files in the specified directories
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip excluded files and directories
    if (EXCLUDE_FILES.some(exclude => 
      filePath.includes(exclude) || 
      exclude.startsWith('*.') && file.endsWith(exclude.slice(1))
    )) {
      return;
    }
    
    if (stat.isDirectory()) {
      findFiles(filePath, fileList);
    } else if (FILE_EXTENSIONS.includes(path.extname(filePath).toLowerCase())) {
      fileList.push({
        path: filePath,
        url: filePath
          .replace(/\\/g, '/') // Convert Windows paths
          .replace(/^public\//, '') // Remove public/ prefix
          .replace(/\/index\.html$/, '') // Convert /index.html to /
          .replace(/\.html$/, '') // Remove .html extension
      });
    }
  });
  
  return fileList;
}

// Check if a URL is external
function isExternalUrl(url) {
  try {
    const domain = new URL(url, BASE_URL).hostname;
    return !domain.endsWith(SITE_DOMAIN) && domain !== SITE_DOMAIN;
  } catch (e) {
    return false;
  }
}

// Normalize URL
function normalizeUrl(url, baseUrl) {
  try {
    // Handle relative URLs
    if (!url.startsWith('http')) {
      // Handle root-relative URLs
      if (url.startsWith('/')) {
        url = new URL(url, BASE_URL).toString();
      } else {
        // Handle relative URLs
        const base = new URL(baseUrl || BASE_URL);
        base.pathname = path.posix.join(
          path.posix.dirname(base.pathname || '/'),
          url
        );
        url = base.toString();
      }
    }
    
    // Remove hash fragments
    const urlObj = new URL(url);
    urlObj.hash = '';
    
    // Normalize trailing slashes
    let normalized = urlObj.toString();
    if (!normalized.endsWith('/') && !path.extname(urlObj.pathname)) {
      normalized += '/';
    }
    
    return normalized;
  } catch (e) {
    console.error(`Error normalizing URL ${url}:`, e.message);
    return url;
  }
}

// Extract links from HTML content
function extractLinks(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = [];
  
  // Find all links
  $('a[href]').each((i, el) => {
    const href = $(el).attr('href');
    if (href && !href.startsWith('#')) {
      links.push(normalizeUrl(href, baseUrl));
    }
  });
  
  // Find all script and image sources
  $('script[src], img[src], link[rel="stylesheet"]').each((i, el) => {
    const src = $(el).attr('src') || $(el).attr('href');
    if (src) {
      links.push(normalizeUrl(src, baseUrl));
    }
  });
  
  return links;
}

// Check a single URL
async function checkUrl(url, referringPage) {
  if (visitedPages.has(url)) {
    return;
  }
  
  visitedPages.add(url);
  
  try {
    const response = await http.get(url, { maxRedirects: 5 });
    const status = response.status;
    
    // Track the link status
    if (!linkStatus.has(url)) {
      linkStatus.set(url, {
        status,
        referringPages: new Set()
      });
    }
    
    if (referringPage) {
      linkStatus.get(url).referringPages.add(referringPage);
    }
    
    // If it's an HTML page and it's not an error, extract links
    const contentType = response.headers['content-type'] || '';
    if (status >= 200 && status < 300 && contentType.includes('text/html')) {
      const links = extractLinks(response.data, url);
      
      // Add new pages to visit
      links.forEach(link => {
        if (!visitedPages.has(link) && !isExternalUrl(link)) {
          pagesToVisit.add(link);
        } else if (isExternalUrl(link)) {
          externalDomains.add(new URL(link).hostname);
        }
      });
    }
    
    return status;
  } catch (error) {
    console.error(`Error checking ${url}:`, error.message);
    
    if (!linkStatus.has(url)) {
      linkStatus.set(url, {
        status: 'ERROR',
        error: error.message,
        referringPages: new Set()
      });
    }
    
    if (referringPage) {
      linkStatus.get(url).referringPages.add(referringPage);
    }
    
    return 'ERROR';
  }
}

// Process queue of pages to visit
async function processQueue() {
  const queue = Array.from(pagesToVisit);
  pagesToVisit.clear();
  
  // Process in batches to avoid too many concurrent requests
  for (let i = 0; i < queue.length; i += MAX_CONCURRENT_REQUESTS) {
    const batch = queue.slice(i, i + MAX_CONCURRENT_REQUESTS);
    await Promise.all(batch.map(url => checkUrl(url)));
  }
  
  // If new pages were added during processing, continue
  if (pagesToVisit.size > 0) {
    await processQueue();
  }
}

// Main function
async function main() {
  console.log('Starting broken link check...\n');
  
  // Find all HTML and component files
  const files = [];
  SCAN_DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
      findFiles(dir, files);
    }
  });
  
  console.log(`Found ${files.length} files to check.\n`);
  
  // Add all files to the queue
  files.forEach(file => {
    const url = `${BASE_URL}/${file.url}`.replace(/\/+/g, '/');
    pagesToVisit.add(url);
  });
  
  // Process the queue
  await processQueue();
  
  // Print results
  console.log('\n--- Link Check Results ---\n');
  
  const brokenLinks = [];
  const errorLinks = [];
  const successLinks = [];
  
  linkStatus.forEach((status, url) => {
    if (status.status === 'ERROR') {
      errorLinks.push({ url, ...status });
    } else if (status.status >= 400) {
      brokenLinks.push({ url, ...status });
    } else {
      successLinks.push({ url, ...status });
    }
  });
  
  // Print broken links
  if (brokenLinks.length > 0) {
    console.log('❌ Broken Links:');
    brokenLinks.forEach(({ url, status, referringPages }) => {
      console.log(`\n${status} - ${url}`);
      if (referringPages.size > 0) {
        console.log('  Referred from:');
        Array.from(referringPages).forEach(page => {
          console.log(`  - ${page}`);
        });
      }
    });
  }
  
  // Print error links
  if (errorLinks.length > 0) {
    console.log('\n❌ Error Links:');
    errorLinks.forEach(({ url, error, referringPages }) => {
      console.log(`\nERROR - ${url}`);
      console.log(`  ${error}`);
      if (referringPages.size > 0) {
        console.log('  Referred from:');
        Array.from(referringPages).forEach(page => {
          console.log(`  - ${page}`);
        });
      }
    });
  }
  
  // Print success stats
  console.log('\n✅ Summary:');
  console.log(`Total links checked: ${linkStatus.size}`);
  console.log(`✅ Working: ${successLinks.length}`);
  console.log(`❌ Broken: ${brokenLinks.length}`);
  console.log(`❌ Errors: ${errorLinks.length}`);
  console.log(`🌐 External domains found: ${externalDomains.size}`);
  
  // Exit with error code if there are broken links
  if (brokenLinks.length > 0 || errorLinks.length > 0) {
    process.exit(1);
  }
}

// Install required packages if not found
try {
  require('axios');
  require('cheerio');
} catch (e) {
  console.log('Installing required packages...');
  require('child_process').execSync('npm install axios cheerio', { stdio: 'inherit' });
  console.log('Packages installed. Please run the script again.');
  process.exit(0);
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
