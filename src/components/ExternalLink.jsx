import React from 'react';
import PropTypes from 'prop-types';

/**
 * ExternalLink component for consistent external linking
 * @param {Object} props - Component props
 * @param {string} props.href - The URL to link to
 * @param {React.ReactNode} props.children - Link content
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.noFollow=true] - Whether to add rel="nofollow"
 * @param {boolean} [props.noOpener=true] - Whether to add rel="noopener"
 * @param {boolean} [props.noReferrer=true] - Whether to add rel="noreferrer"
 * @param {string} [props.target='_blank'] - Target attribute
 * @returns {JSX.Element}
 */
const ExternalLink = ({
  href,
  children,
  className = '',
  noFollow = true,
  noOpener = true,
  noReferrer = true,
  target = '_blank',
  ...props
}) => {
  // Build the rel attribute
  const rel = [
    noFollow && 'nofollow',
    noOpener && 'noopener',
    noReferrer && 'noreferrer',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`text-primary hover:underline ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noFollow: PropTypes.bool,
  noOpener: PropTypes.bool,
  noReferrer: PropTypes.bool,
  target: PropTypes.string,
};

export default ExternalLink;
