import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to extract meta tags from HTML
function extractMetaTags(html) {
    const metaTags = {
        title: [],
        description: [],
        keywords: [],
        ogTitle: [],
        ogDescription: [],
        ogImage: [],
        twitterTitle: [],
        twitterDescription: [],
        twitterImage: [],
        canonical: [],
        url: []
    };

    const regex = /<meta.*?>/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
        const meta = match[0];
        if (meta.includes('name="title"')) {
            metaTags.title.push(meta);
        } else if (meta.includes('name="description"')) {
            metaTags.description.push(meta);
        } else if (meta.includes('name="keywords"')) {
            metaTags.keywords.push(meta);
        } else if (meta.includes('property="og:title"')) {
            metaTags.ogTitle.push(meta);
        } else if (meta.includes('property="og:description"')) {
            metaTags.ogDescription.push(meta);
        } else if (meta.includes('property="og:image"')) {
            metaTags.ogImage.push(meta);
        } else if (meta.includes('name="twitter:title"')) {
            metaTags.twitterTitle.push(meta);
        } else if (meta.includes('name="twitter:description"')) {
            metaTags.twitterDescription.push(meta);
        } else if (meta.includes('name="twitter:image"')) {
            metaTags.twitterImage.push(meta);
        }
    }

    const canonicalRegex = /<link.*?>/g;
    while ((match = canonicalRegex.exec(html)) !== null) {
        const link = match[0];
        if (link.includes('rel="canonical"')) {
            metaTags.canonical.push(link);
        } else if (link.includes('property="og:url"')) {
            metaTags.url.push(link);
        }
    }

    return metaTags;
}

// Function to analyze duplicates
function analyzeDuplicates() {
    const calculatorsDir = path.join(__dirname, 'calculator-pages');
    const files = fs.readdirSync(calculatorsDir);
    const results = [];

    for (const file of files) {
        if (file.endsWith('.html')) {
            const filePath = path.join(calculatorsDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');
            const metaTags = extractMetaTags(content);
            
            // Check for duplicate tags
            const duplicates = {
                title: metaTags.title.length > 1,
                description: metaTags.description.length > 1,
                keywords: metaTags.keywords.length > 1,
                ogTitle: metaTags.ogTitle.length > 1,
                ogDescription: metaTags.ogDescription.length > 1,
                ogImage: metaTags.ogImage.length > 1,
                twitterTitle: metaTags.twitterTitle.length > 1,
                twitterDescription: metaTags.twitterDescription.length > 1,
                twitterImage: metaTags.twitterImage.length > 1,
                canonical: metaTags.canonical.length > 1,
                url: metaTags.url.length > 1
            };

            // Check for duplicate content
            const contentDuplicates = {
                title: new Set(metaTags.title.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.title.length,
                description: new Set(metaTags.description.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.description.length,
                keywords: new Set(metaTags.keywords.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.keywords.length,
                ogTitle: new Set(metaTags.ogTitle.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.ogTitle.length,
                ogDescription: new Set(metaTags.ogDescription.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.ogDescription.length,
                ogImage: new Set(metaTags.ogImage.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.ogImage.length,
                twitterTitle: new Set(metaTags.twitterTitle.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.twitterTitle.length,
                twitterDescription: new Set(metaTags.twitterDescription.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.twitterDescription.length,
                twitterImage: new Set(metaTags.twitterImage.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.twitterImage.length,
                canonical: new Set(metaTags.canonical.map(tag => tag.match(/href="(.*?)"/)[1])).size !== metaTags.canonical.length,
                url: new Set(metaTags.url.map(tag => tag.match(/content="(.*?)"/)[1])).size !== metaTags.url.length
            };

            results.push({
                file,
                duplicates,
                contentDuplicates
            });
        }
    }

    // Print results
    console.log('\nSEO Analysis Report:\n');
    console.log('1. Duplicate Tags Analysis:');
    results.forEach(result => {
        const hasDuplicates = Object.values(result.duplicates).some(d => d);
        if (hasDuplicates) {
            console.log(`\n${result.file} has duplicate tags:`);
            Object.entries(result.duplicates).forEach(([tag, hasDuplicate]) => {
                if (hasDuplicate) console.log(`- ${tag}`);
            });
        }
    });

    console.log('\n2. Duplicate Content Analysis:');
    results.forEach(result => {
        const hasDuplicateContent = Object.values(result.contentDuplicates).some(d => d);
        if (hasDuplicateContent) {
            console.log(`\n${result.file} has duplicate content:`);
            Object.entries(result.contentDuplicates).forEach(([tag, hasDuplicate]) => {
                if (hasDuplicate) console.log(`- ${tag}`);
            });
        }
    });

    // Check for duplicate canonical URLs across all pages
    const allCanonicals = results.flatMap(r => 
        extractMetaTags(fs.readFileSync(path.join(calculatorsDir, r.file), 'utf-8')).canonical
    );

    const canonicalMap = new Map();
    allCanonicals.forEach(canonical => {
        const url = canonical.match(/href="(.*?)"/)[1];
        if (canonicalMap.has(url)) {
            canonicalMap.get(url).push(canonical);
        } else {
            canonicalMap.set(url, [canonical]);
        }
    });

    console.log('\n3. Canonical URL Analysis:');
    canonicalMap.forEach((values, url) => {
        if (values.length > 1) {
            console.log(`\nDuplicate canonical URL found: ${url}`);
            values.forEach(v => {
                const file = v.split('/calculator-pages/')[1].split(':')[0];
                console.log(`- Found in: ${file}`);
            });
        }
    });
}

// Run the analysis
analyzeDuplicates();
