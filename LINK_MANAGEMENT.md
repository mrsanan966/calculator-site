# Link Management Guide

This document outlines the recommended approach for handling links in the FinCalc application.

## Link Components

### 1. `Link` Component

Use the `Link` component from `@/components/Link` for all navigational links. This component automatically handles both internal and external links with appropriate security attributes.

**Example:**
```jsx
import Link from '@/components/Link';

// Internal link
<Link to="/about-us">About Us</Link>

// External link (automatically adds security attributes)
<Link to="https://example.com">External Site</Link>
```

### 2. `ExternalLink` Component

For explicitly external links where you need more control, use the `ExternalLink` component.

**Example:**
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

## URL Generation

### 1. Generating Full URLs

Use the `getFullUrl` utility function to generate absolute URLs:

```js
import { getFullUrl } from '@/utils/urls';

const url = getFullUrl('/about');
// Returns: "https://financeloancalc.com/about" in production
```

### 2. Generating Canonical URLs

For canonical URLs, use `getCanonicalUrl` which removes query parameters:

```js
import { getCanonicalUrl } from '@/utils/urls';

const canonicalUrl = getCanonicalUrl('/blog/post-1?utm=source');
// Returns: "https://financeloancalc.com/blog/post-1"
```

## Environment Configuration

Base URLs are configured in:
- `vite.config.js` - Sets the base URL based on the environment
- `.env` - Local development environment variables
- `src/config/site.js` - Site-wide configuration

## Best Practices

1. **Always use the `Link` component** for navigation to ensure consistent behavior.
2. **Never hardcode full URLs** - use the URL utilities to generate them.
3. **External links** automatically get security attributes (noopener, noreferrer, nofollow).
4. **For forms and redirects**, use the URL utilities to generate full URLs.
5. **Test links** in both development and production environments.

## Updating the Base URL

1. Update `vite.config.js` to set the production URL
2. Update `.env` for local development
3. The `SITE_CONFIG` in `src/config/site.js` will automatically use the correct URL based on the environment.
