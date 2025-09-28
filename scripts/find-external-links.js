/**
 * This script finds all external links in the codebase.
 * Run with: node scripts/find-external-links.js
 */

import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import { fileURLToPath } from 'url';

// Get the current directory in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_DOMAIN = 'financeloancalc.com';
const IGNORE_DOMAINS = new Set([
  'localhost',
  '127.0.0.1',
  SITE_DOMAIN,
]);

// File extensions to check
const FILE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.md', '.html'];

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
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Extract URLs from content
function extractUrls(content) {
  // Match URLs in various contexts (href, src, etc.)
  const urlRegex = /(?:href|src|url|fetch|axios\.get|axios\.post|axios\.request|axios\.put|axios\.delete|axios\.patch|axios\.head|axios\.options)\s*[=:]\s*["'](https?:\/\/[^"']+)["']/gi;
  
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(content)) !== null) {
    try {
      const url = new URL(match[1]);
      urls.push({
        url: match[1],
        domain: url.hostname,
        protocol: url.protocol.replace(':', '')
      });
    } catch (e) {
      // Ignore invalid URLs
    }
  }
  
  return urls;
}

// Check if a URL is external
function isExternalUrl(url) {
  try {
    const domain = new URL(url).hostname;
    return !IGNORE_DOMAINS.has(domain) && 
           !domain.endsWith('.' + SITE_DOMAIN) && 
           domain !== SITE_DOMAIN;
  } catch (e) {
    return false;
  }
}

// Main function
function main() {
  console.log('Searching for external links...\n');
  
  const files = [];
  SCAN_DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
      files.push(...findFiles(dir));
    }
  });
  
  console.log(`Found ${files.length} files to check.\n`);
  
  const externalLinks = new Map(); // domain -> { count, urls: Set() }
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const urls = extractUrls(content);
      
      urls.forEach(({ url, domain, protocol }) => {
        if (isExternalUrl(url)) {
          if (!externalLinks.has(domain)) {
            externalLinks.set(domain, { 
              count: 0, 
              protocol,
              urls: new Set() 
            });
          }
          
          const domainData = externalLinks.get(domain);
          domainData.count++;
          domainData.urls.add(url);
        }
      });
    } catch (e) {
      console.error(`Error processing ${file}:`, e.message);
    }
  });
  
  // Sort by count (descending)
  const sortedDomains = Array.from(externalLinks.entries())
    .sort((a, b) => b[1].count - a[1].count);
  
  // Print results
  console.log('External links found (grouped by domain):\n');
  
  sortedDomains.forEach(([domain, { count, protocol, urls }]) => {
    console.log(`\n${domain} (${protocol}): ${count} occurrences`);
    console.log('  ' + Array.from(urls).join('\n  '));
  });
  
  console.log(`\nFound ${externalLinks.size} unique external domains.`);
}

// Execute the main function
main();
