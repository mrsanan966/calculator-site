# URL Management System

This document describes the URL management system used in the FinCalc application to ensure consistent and maintainable URL handling.

## Overview

The URL management system provides:

1. **Consistent URL generation** - All URLs are generated using a centralized configuration
2. **Type safety** - URL generation is type-safe with TypeScript
3. **Environment awareness** - URLs automatically adjust based on the environment (development, staging, production)
4. **Security** - External links automatically get appropriate security attributes
5. **Maintainability** - URLs are defined in a single location and reused throughout the application

## Core Components

### 1. URL Configuration (`src/config/site.js`)

Centralized configuration for all site URLs and metadata:

```js
// Base URL is automatically determined based on the environment
const baseUrl = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:3000';

export const SITE_CONFIG = {
  siteName: 'FinCalc',
  siteDescription: 'Smart Financial & Utility Calculators',
  baseUrl,
  // Other site-wide configuration
};
```

### 2. URL Utilities (`src/utils/urls.js`)

Helper functions for working with URLs:

- `getFullUrl(path)` - Generates a full URL for the given path
- `getCanonicalUrl(path)` - Generates a canonical URL (without query parameters)
- `isExternalUrl(url)` - Checks if a URL is external

### 3. Link Components

#### `Link` Component (`src/components/Link.jsx`)

A smart link component that automatically handles both internal and external links:

```jsx
import Link from '@/components/Link';

// Internal link
<Link to="/about">About Us</Link>

// External link (automatically adds security attributes)
<Link to="https://example.com">External Site</Link>

// With custom attributes
<Link 
  to="/privacy" 
  className="text-blue-500"
  target="_blank"
  rel="noopener noreferrer"
>
  Privacy Policy
</Link>
```

#### `ExternalLink` Component (`src/components/ExternalLink.jsx`)

For explicitly external links with more control:

```jsx
import { ExternalLink } from '@/components/ExternalLink';

<ExternalLink 
  href="https://example.com"
  noFollow={true}
  noOpener={true}
  noReferrer={true}
>
  External Site
</ExternalLink>
```

## Best Practices

### 1. Always Use the Link Component

✅ **Do**:
```jsx
import Link from '@/components/Link';

<Link to="/about">About</Link>
```

❌ **Don't**:
```jsx
<a href="/about">About</a>  // Loses automatic external link handling
```

### 2. Use URL Utilities for Dynamic URLs

✅ **Do**:
```jsx
import { getFullUrl } from '@/utils/urls';

const apiUrl = getFullUrl('/api/data');
```

❌ **Don't**:
```jsx
const apiUrl = 'https://financeloancalc.com/api/data'; // Hardcoded URL
```

### 3. Handle External Links Properly

✅ **Do**:
```jsx
<Link to="https://external-site.com">External</Link>
// or
<ExternalLink href="https://external-site.com">External</ExternalLink>
```

❌ **Don't**:
```jsx
<a href="https://external-site.com">External</a> // Missing security attributes
```

## Development Tools

### Available Scripts

- `npm run check:urls` - Find all external links in the codebase
- `npm run check:broken` - Check for broken links
- `npm run fix:urls` - Fix hardcoded URLs in the codebase
- `npm run check:all` - Run all URL checks

### Adding a New Environment Variable

1. Add the variable to `.env`:
   ```
   VITE_APP_MY_VARIABLE=value
   ```

2. Access it in your code:
   ```js
   const myVar = import.meta.env.VITE_APP_MY_VARIABLE;
   ```

## Common Issues and Solutions

### Links Don't Work in Production

**Issue**: Links work in development but break in production.

**Solution**:
1. Ensure all URLs are generated using `getFullUrl` or the `Link` component
2. Check that the `baseUrl` in `site.js` is correctly set for production
3. Verify that the Vite base configuration is correct in `vite.config.js`

### External Links Open in the Same Tab

**Issue**: External links open in the same tab instead of a new tab.

**Solution**:
The `Link` component opens external links in a new tab by default. If you need to override this:

```jsx
<Link to="https://example.com" target="_self">Same Tab</Link>
```

### Duplicate Content Due to Trailing Slashes

**Issue**: The same content is accessible with and without a trailing slash.

**Solution**:
Ensure consistent use of trailing slashes in your routing configuration and link generation. The URL utilities automatically handle this.
