/**
 * This script helps identify and replace hardcoded URLs in the codebase.
 * Run with: node scripts/fix-hardcoded-urls.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SITE_DOMAIN = 'financeloancalc.com';
const REPLACEMENT = '${SITE_CONFIG.baseUrl.replace(/^https?:\/\//, "")}';

// File extensions to check
const FILE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.md', '.html'];

// Directories to scan
const SCAN_DIRECTORIES = [
  'src',
  'public',
];

// Files to exclude
const EXCLUDE_FILES = [
  'vite.config.js',
  'node_modules',
  '.git',
  '.next',
  'build',
  'dist',
];

// Find all files in the specified directories
function findFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Skip excluded files and directories
    if (EXCLUDE_FILES.some(exclude => filePath.includes(exclude))) {
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

// Check if a file contains hardcoded URLs
function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`https?:\\/\\/(www\\.)?${SITE_DOMAIN.replace(/\./g, '\\.')}[^\\s"'<>\)\]]*`, 'g');
  const matches = content.match(regex) || [];
  
  if (matches.length > 0) {
    console.log(`\nFound ${matches.length} hardcoded URL(s) in ${filePath}:`);
    matches.forEach(match => {
      console.log(`  - ${match}`);
    });
    
    // Ask if user wants to replace
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    return new Promise(resolve => {
      readline.question('Replace with SITE_CONFIG.baseUrl? (y/n) ', answer => {
        readline.close();
        
        if (answer.toLowerCase() === 'y') {
          // Replace the URLs
          let newContent = content;
          matches.forEach(match => {
            const relativePath = match.replace(/^https?:\/\/(www\.)?[^/]+/, '');
            const replacement = `\`\${SITE_CONFIG.baseUrl}${relativePath}\``;
            newContent = newContent.replace(new RegExp(match.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
          });
          
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log('  ✓ Updated file');
          resolve(true);
        } else {
          console.log('  ✗ Skipped');
          resolve(false);
        }
      });
    });
  }
  
  return Promise.resolve(false);
}

// Main function
async function main() {
  console.log(`Searching for hardcoded ${SITE_DOMAIN} URLs...\n`);
  
  const files = [];
  SCAN_DIRECTORIES.forEach(dir => {
    if (fs.existsSync(dir)) {
      files.push(...findFiles(dir));
    }
  });
  
  console.log(`Found ${files.length} files to check.\n`);
  
  let updatedFiles = 0;
  
  for (const file of files) {
    const wasUpdated = await checkFile(file);
    if (wasUpdated) {
      updatedFiles++;
    }
  }
  
  console.log(`\nDone! Updated ${updatedFiles} files.`);
}

main().catch(console.error);
