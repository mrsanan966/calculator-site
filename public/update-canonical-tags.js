import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all calculator pages
const calculatorPagesDir = path.join(__dirname, 'calculator-pages');

const canonicalBase = 'https://www.financeloancalc.com';

async function updateCanonicalTags() {
    try {
        const files = await fs.readdir(calculatorPagesDir);
        
        for (const file of files) {
            if (file.endsWith('.html')) {
                const filePath = path.join(calculatorPagesDir, file);
                const content = await fs.readFile(filePath, 'utf-8');
                
                // Get the calculator name from the filename (remove .html)
                const calculatorName = file.replace('.html', '');
                const canonicalUrl = `${canonicalBase}/${calculatorName}`;
                
                // Update canonical tag
                const newContent = content.replace(
                    /<link rel="canonical" href="[^"]+" \/>/,
                    `<link rel="canonical" href="${canonicalUrl}" />`
                );
                
                await fs.writeFile(filePath, newContent);
                console.log(`Updated canonical tag for ${file}`);
            }
        }
    } catch (error) {
        console.error('Error updating canonical tags:', error);
    }
}

updateCanonicalTags();
