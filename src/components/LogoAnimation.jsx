'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function LogoAnimation({ size = 'md', showText = true, withLink = true }) {
  const [homeLink, setHomeLink] = useState('/');
  const pathname = usePathname();
  const isLoggedIn = pathname?.includes('/dashboard');
  const isProvider = pathname?.includes('/provider');

  // Determine the correct home link based on authentication state
  useEffect(() => {
    if (isLoggedIn) {
      setHomeLink(isProvider ? '/dashboard/provider' : '/dashboard');
    } else {
      setHomeLink('/');
    }
  }, [isLoggedIn, isProvider]);

  // Size variants for the logo image only (no circular container)
  const sizes = {
    sm: { imgSize: 32, textSize: 'text-lg' },
    md: { imgSize: 40, textSize: 'text-xl' },
    lg: { imgSize: 48, textSize: 'text-2xl' },
    xl: { imgSize: 64, textSize: 'text-3xl' },
    xxl: { imgSize: { default: 96, md: 128 }, textSize: 'text-4xl' },
    nav: { imgSize: 72, textSize: 'text-2xl' }, // Special larger size for navbar
    auth: { imgSize: { default: 128, md: 160, lg: 192 }, textSize: 'text-5xl' }
  };

  const currentSize = sizes[size] || sizes.md;
  
  // Get the correct image size based on responsive breakpoints if defined
  const getImageSize = (sizeObj) => {
    return typeof sizeObj === 'object' ? sizeObj.default : sizeObj;
  };
  
  // Simple logo without motion animations or circular container
  const logoContent = (
    <div className="flex items-center space-x-3 group">
      <div className="group-hover:scale-105 transition-transform">
        <Image 
          src="/images/logo/logo.png"
          alt="Cityसेवा Logo"
          width={typeof currentSize.imgSize === 'object' ? currentSize.imgSize.default : currentSize.imgSize}
          height={typeof currentSize.imgSize === 'object' ? currentSize.imgSize.default : currentSize.imgSize}
          className={`object-contain ${size === 'auth' ? 'animate-fade-in' : ''} ${
            // Apply responsive sizing for xxl and auth variants
            size === 'xxl' ? 'md:w-32 md:h-32' : 
            size === 'auth' ? 'md:w-40 md:h-40 lg:w-48 lg:h-48' : ''
          }`}
          priority
        />
      </div>
      {showText && (
        <span className={`font-bold text-foreground ${currentSize.textSize} group-hover:text-accent-custom transition-colors ${size === 'auth' ? 'animate-slide-up' : ''}`}>
          Cityसेवा
        </span>
      )}
    </div>
  );

  // Return with or without link wrapper
  if (withLink) {
    return <Link href={homeLink}>{logoContent}</Link>;
  }
  
  return logoContent;
}
