'use client';

import React from 'react';

export const AmbientBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
    {/* Faint dot grid */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }}
    />
  </div>
);
