import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import ExternalLink from './ExternalLink';
import { isExternalUrl } from '@/utils/urls';

/**
 * Smart link component that handles both internal and external links
 * @param {Object} props - Component props
 * @param {string} props.to - The URL to link to
 * @param {React.ReactNode} props.children - Link content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.noFollow] - Whether to add rel="nofollow" for external links
 * @param {boolean} [props.noOpener] - Whether to add rel="noopener" for external links
 * @param {boolean} [props.noReferrer] - Whether to add rel="noreferrer" for external links
 * @param {string} [props.target] - Target attribute
 * @returns {JSX.Element}
 */
const Link = ({
  to,
  children,
  className = '',
  noFollow = true,
  noOpener = true,
  noReferrer = true,
  target = '_self',
  ...props
}) => {
  // Handle empty or invalid links
  if (!to) {
    return <span className={className} {...props}>{children}</span>;
  }

  // Handle external links
  if (isExternalUrl(to)) {
    return (
      <ExternalLink
        href={to}
        className={className}
        noFollow={noFollow}
        noOpener={noOpener}
        noReferrer={noReferrer}
        target={target === '_self' ? '_blank' : target}
        {...props}
      >
        {children}
      </ExternalLink>
    );
  }

  // Handle anchor links
  if (to.startsWith('#')) {
    return (
      <a href={to} className={className} {...props}>
        {children}
      </a>
    );
  }

  // Handle internal links
  return (
    <RouterLink to={to} className={className} target={target} {...props}>
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noFollow: PropTypes.bool,
  noOpener: PropTypes.bool,
  noReferrer: PropTypes.bool,
  target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
};

export default Link;
