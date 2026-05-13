import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 100 80" 
        className="w-16 h-16 sm:w-24 sm:h-24 mb-2 text-brand-indigo"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Star */}
        <polygon 
          points="50,5 53,13 62,13 55,18 57,26 50,21 43,26 45,18 38,13 47,13" 
          fill="currentColor" 
          strokeWidth="0"
        />
        {/* A structure */}
        <path d="M 50 30 L 30 70" />
        <path d="M 50 30 L 70 70" />
        {/* V overlay */}
        <path d="M 25 50 L 50 65 L 75 50" strokeWidth="5" />
      </svg>
      <h1 className="text-2xl sm:text-3xl font-title font-bold tracking-[0.15em] text-brand-indigo mb-1">
        AUSTRAL MARKET
      </h1>
      <p className="text-[0.6rem] sm:text-xs text-brand-indigo/70 tracking-widest uppercase font-medium">
        Productos Regionales de Tierra del Fuego
      </p>
    </div>
  );
};

export default Logo;
