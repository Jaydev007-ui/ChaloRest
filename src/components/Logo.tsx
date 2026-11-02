import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'main' | 'horizontal' | 'icon-only';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  href?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  className = '',
  href = '/',
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 36, text: 'text-2xl', sub: 'text-[11px]' },
    lg: { icon: 48, text: 'text-3xl', sub: 'text-xs' },
    xl: { icon: 60, text: 'text-4xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];
  const isLight = theme === 'light';

  const iconElement = (
    <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: currentSize.icon, height: currentSize.icon }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        {/* Outer Wheel Tire Contour */}
        <circle cx="50" cy="50" r="46" stroke="#25292E" strokeWidth="7" strokeDasharray="6 3" />
        
        {/* Highway Ribbon forming Letter C */}
        <path
          d="M 68 22 C 34 20, 18 36, 18 50 C 18 64, 34 80, 68 78"
          stroke="#FF8A24"
          strokeWidth="11"
          strokeLinecap="round"
        />
        
        {/* Highway Yellow Center Road Dash Markings along C curve */}
        <path
          d="M 64 22 C 37 22, 23 37, 23 50 C 23 63, 37 78, 64 78"
          stroke="#FFC928"
          strokeWidth="2.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />

        {/* Circular Wheel Rim Hub */}
        <circle cx="50" cy="50" r="16" fill="#17191C" stroke="#FF8A24" strokeWidth="2.5" />
        
        {/* Subtle Bed / Rest Stop Symbol in Hub */}
        <path
          d="M 43 53 L 43 47 C 43 45.5 44 45 45.5 45 L 53 45 C 54.5 45 55.5 45.5 55.5 47 L 55.5 53 M 41 53 L 57 53 M 44 49 C 44 47.9 44.9 47 46 47 C 47.1 47 48 47.9 48 49 Z"
          stroke="#FFC928"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Speed marker dot */}
        <circle cx="70" cy="50" r="3.5" fill="#24A36A" />
      </svg>
    </div>
  );

  const textElement = (
    <div className="flex flex-col leading-none ml-2.5">
      <div className="flex items-center">
        <span className={`font-black tracking-tight ${currentSize.text} ${isLight ? 'text-gray-900' : 'text-white'}`}>
          CHALO<span className="text-highway-orange">REST</span>
        </span>
      </div>
      {variant !== 'icon-only' && size !== 'sm' && (
        <span className={`font-semibold tracking-wider uppercase ${currentSize.sub} ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
          Hourly Highway Rest
        </span>
      )}
    </div>
  );

  const content = (
    <div className={`inline-flex items-center select-none group transition-transform ${className}`}>
      {iconElement}
      {variant !== 'icon-only' && textElement}
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-block">{content}</Link>;
  }

  return content;
};
