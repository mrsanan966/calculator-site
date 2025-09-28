# Calculator App

A comprehensive calculator application with various financial, mathematical, and business calculators.

## Project Structure

```
src/
├── components/         # Reusable UI components
├── config/            # Configuration files
│   ├── calculators.js # Calculator definitions
│   └── site.js       # Site-wide configuration
├── hooks/             # Custom React hooks
├── pages/             # Calculator pages
│   ├── financial/     # Financial calculators
│   ├── mathematical/  # Mathematical calculators
│   ├── business/      # Business calculators
│   └── general/       # General calculators
└── utils/             # Utility functions

scripts/
├── validate-calculator-config.js  # Validates calculator configurations
├── validate-seo-config.js         # Validates SEO configurations
└── validate-canonical-tags.js     # Validates canonical URLs
```

## Calculator Categories

- Financial
  - Loans
  - Mortgages
  - Taxes
  - Investments
- Mathematical
  - Basic
  - Advanced
- Business
- Education
- General

## Validation Scripts

The project includes several validation scripts to ensure code quality and consistency:

### Calculator Configuration Validation

```bash
npm run validate:calculators
```

Validates:
- Required fields for each calculator
- Path format and uniqueness
- Category and subcategory validity
- Component file existence

### SEO Configuration Validation

```bash
npm run validate:seo
```

Validates:
- Required SEO fields
- Title and description lengths
- Keywords count and format
- Schema.org markup
- SEO implementation in components

### Canonical URL Validation

```bash
npm run validate:canonical
```

Validates:
- Canonical URL presence
- URL format
- Duplicate URLs
- URL consistency with calculator paths

### Run All Validations

```bash
npm run validate
```

Runs all validation scripts in sequence.

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Run validations:
```bash
npm run validate
```

## Building for Production

```bash
npm run build
```

## Testing

```bash
npm test
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Run validations to ensure code quality
4. Submit a pull request

## License

MIT 