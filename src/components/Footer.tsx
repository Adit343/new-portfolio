'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  siteSettings?: any;
}

export const Footer: React.FC<FooterProps> = ({ siteSettings }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Circular Modern Back To Top Floating Button at Bottom Right */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full border-2 border-emerald-400/60 bg-slate-900/90 backdrop-blur-2xl text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center group animate-fadeIn ring-1 ring-white/20"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}

      {/* Clean Minimalist Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-t border-white/10 mt-8 sm:mt-12 text-center">
        <p className="text-xs font-mono text-slate-400 tracking-wide">
          © {new Date().getFullYear()} Adit Shah. All rights reserved.
        </p>
      </footer>
    </>
  );
};
