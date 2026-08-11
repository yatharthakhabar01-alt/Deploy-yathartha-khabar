import React from 'react';
import { LogoSettings } from '../types';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSlogan?: boolean;
  className?: string;
  settings?: LogoSettings;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showSlogan, 
  className = '',
  settings 
}) => {
  // Default fallback settings
  const primaryText = settings?.primaryText ?? 'यथार्थ';
  const secondaryText = settings?.secondaryText ?? 'खबर';
  const sloganText = settings?.sloganText ?? '';
  const primaryColor = settings?.primaryColor || '#003399';
  const secondaryColor = settings?.secondaryColor || '#C8102E';
  const logoType = settings?.logoType || 'IMAGE';
  const logoImageUrl = settings?.logoImageUrl || '/logo.svg';
  const shouldShowSlogan = showSlogan !== undefined ? showSlogan : (settings?.showSlogan ?? false);
  const borderStyle = settings?.borderStyle || 'NONE';

  // Size mapping presets
  const sizeClasses = {
    sm: { icon: 'w-8 h-8', title: 'text-2xl', slogan: 'text-[9px]', imgHeight: 38 },
    md: { icon: 'w-12 h-12', title: 'text-3xl sm:text-4xl', slogan: 'text-xs', imgHeight: 52 },
    lg: { icon: 'w-14 h-14', title: 'text-4xl sm:text-4.5xl', slogan: 'text-xs', imgHeight: 62 },
    xl: { icon: 'w-18 h-18', title: 'text-5xl sm:text-6xl', slogan: 'text-sm', imgHeight: 80 }
  }[size];

  // Border styling for custom image logo
  const borderClasses = {
    NONE: '',
    ROUNDED: 'rounded-xl border border-slate-200 shadow-xs p-1 bg-white',
    CIRCLE: 'rounded-full border-2 border-red-500 shadow-md p-1 bg-white object-cover',
    SHADOW: 'rounded-lg shadow-lg border border-slate-300 p-1 bg-white'
  }[borderStyle];

  // Calculated custom height style if specified in settings
  const customImgHeight = settings?.logoHeightPx ? `${settings.logoHeightPx}px` : `${sizeClasses.imgHeight}px`;

  // Effective logo image source
  const effectiveImgSrc = logoImageUrl || '/logo.svg';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      
      {/* 1. ORIGINAL / IMAGE LOGO MODE */}
      {logoType === 'IMAGE' && effectiveImgSrc ? (
        <div className="relative flex flex-col justify-center shrink-0">
          <img 
            src={effectiveImgSrc} 
            alt={`${primaryText} ${secondaryText} Logo`}
            className={`object-contain max-w-full transition-all duration-200 ${borderClasses}`}
            style={{ height: customImgHeight }}
            onError={(e) => {
              // Fallback to text if image fails
              (e.target as HTMLImageElement).src = '/logo.svg';
            }}
          />
          {shouldShowSlogan && sloganText && (
            <span 
              className={`font-bold tracking-wide ${sizeClasses.slogan} opacity-90 mt-1`}
              style={{ 
                fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                color: secondaryColor
              }}
            >
              {sloganText}
            </span>
          )}
        </div>
      ) : (
        /* 2. HIGH-PRECISION VECTOR EMBLEM LOGO MODE (Matching original logo.svg emblem) */
        <div className="inline-flex items-center gap-2.5">
          <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses.icon}`}>
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-xs" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Magnifying Glass Handle */}
              <path d="M72 74 L98 100 Q106 108 100 114 Q94 120 86 112 L60 86 Z" fill={primaryColor} />
              <path d="M68 70 L92 94 C100 102 108 110 100 116 C92 122 84 114 76 106 L52 82 Z" fill={primaryColor} />

              {/* Outer RED Ring */}
              <circle cx="52" cy="52" r="44" stroke={secondaryColor} strokeWidth="5" fill="#FFFFFF" />

              {/* Inner BLUE Ring */}
              <circle cx="52" cy="52" r="37" stroke={primaryColor} strokeWidth="2.5" fill="none" />

              {/* Fountain Pen Nib Inside Lens */}
              <g transform="translate(52, 52) rotate(-38) translate(-22, -28)">
                <path d="M12 44 L36 44 L33 52 L15 52 Z" fill={primaryColor} />
                <path d="M24 0 L38 30 L34 44 L14 44 L10 30 Z" fill={secondaryColor} />
                <path d="M24 0 L38 30 L34 44 L24 44 Z" fill="#A80C24" />
                <line x1="24" y1="0" x2="24" y2="24" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
                <path d="M24 30 L26 34 L30 34 L27 36.5 L28 40.5 L24 38 L20 40.5 L21 36.5 L18 34 L22 34 Z" fill="#FFFFFF" />
              </g>
            </svg>
          </div>

          {/* Typography: Primary & Secondary Brand Name */}
          {(primaryText || secondaryText) && (
            <div className="flex flex-col justify-center leading-none">
              <div 
                className={`font-black tracking-tight ${sizeClasses.title} flex items-center gap-1.5`}
                style={{ fontFamily: "'Mukta', 'Noto Sans Devanagari', 'Kalimati', sans-serif" }}
              >
                <span className="font-black tracking-tight" style={{ color: primaryColor }}>
                  {primaryText}
                </span>
                <span className="font-black tracking-tight" style={{ color: secondaryColor }}>
                  {secondaryText}
                </span>
              </div>
              
              {shouldShowSlogan && sloganText && (
                <span 
                  className={`font-bold tracking-wide ${sizeClasses.slogan} opacity-90 mt-1`}
                  style={{ 
                    fontFamily: "'Mukta', 'Noto Sans Devanagari', sans-serif",
                    color: secondaryColor
                  }}
                >
                  {sloganText}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
