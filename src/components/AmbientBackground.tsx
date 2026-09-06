'use client';

import React from 'react';

interface AmbientBackgroundProps {
  accent: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ accent }) => {
  const primaryGlowMap: Record<string, string> = {
    emerald: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
    cyan: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
    violet: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
    amber: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
    rose: 'radial-gradient(circle, #f43f5e 0%, transparent 70%)',
    indigo: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
    teal: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)',
  };

  const secondaryGlowMap: Record<string, string> = {
    emerald: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
    cyan: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
    violet: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
    amber: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
    rose: 'radial-gradient(circle, #fb7185 0%, transparent 70%)',
    indigo: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
    teal: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
  };

  const bottomGlowMap: Record<string, string> = {
    emerald: 'radial-gradient(circle, #059669 0%, transparent 70%)',
    cyan: 'radial-gradient(circle, #0284c7 0%, transparent 70%)',
    violet: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
    amber: 'radial-gradient(circle, #d97706 0%, transparent 70%)',
    rose: 'radial-gradient(circle, #e11d48 0%, transparent 70%)',
    indigo: 'radial-gradient(circle, #4f46e5 0%, transparent 70%)',
    teal: 'radial-gradient(circle, #0d9488 0%, transparent 70%)',
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Primary Light Spot */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full blur-[120px] opacity-25 animate-blob transition-all duration-700"
        style={{
          background: primaryGlowMap[accent] || primaryGlowMap.emerald
        }}
      />

      {/* Dynamic Secondary Light Spot */}
      <div 
        className="absolute top-1/3 -right-32 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full blur-[140px] opacity-20 animate-blob-delayed transition-all duration-700"
        style={{
          background: secondaryGlowMap[accent] || secondaryGlowMap.emerald
        }}
      />

      {/* Dynamic Bottom Light Spot */}
      <div 
        className="absolute -bottom-32 left-1/4 w-96 h-96 md:w-[550px] md:h-[550px] rounded-full blur-[130px] opacity-15 animate-blob transition-all duration-700"
        style={{
          background: bottomGlowMap[accent] || bottomGlowMap.emerald
        }}
      />

      {/* Subtle Tech Grid Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
};
