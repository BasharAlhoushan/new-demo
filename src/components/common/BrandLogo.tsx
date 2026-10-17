import React from 'react';
import { Link } from 'react-router-dom';

export interface BrandLogoProps {
  /**
   * 'black' for light surfaces, 'white' for dark/transparent surfaces.
   * Default: 'black'
   */
  variant?: 'black' | 'white';
  /**
   * Size preset or custom height class
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to wrap in a router Link to '/'
   */
  asLink?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'black',
  size = 'md',
  asLink = true,
  className = '',
}) => {
  const logoSrc = variant === 'white' ? '/images/logo/logo-white.png' : '/the-one-real-estate-logo.svg';

  const sizeClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-9 sm:h-11',
    lg: 'h-11 sm:h-14',
    xl: 'h-14 sm:h-18',
  }[size];

  const imageElement = (
    <div
      dir="ltr"
      style={{ direction: 'ltr', transform: 'none' }}
      className={`inline-flex items-center select-none flex-shrink-0 ${className}`}
    >
      <img
        src={logoSrc}
        alt="THE ONE REAL ESTATE"
        loading="eager"
        decoding="async"
        className={`${sizeClasses} w-auto max-w-[260px] sm:max-w-[320px] object-contain transition-opacity duration-300 pointer-events-auto`}
        style={{ transform: 'none' }}
      />
    </div>
  );

  if (asLink) {
    return (
      <Link
        to="/"
        dir="ltr"
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B69A70] rounded-sm transition-transform duration-200 hover:opacity-95"
        aria-label="THE ONE Real Estate - Home"
      >
        {imageElement}
      </Link>
    );
  }

  return imageElement;
};

export default BrandLogo;
