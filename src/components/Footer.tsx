'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Reveal } from './Reveal';
import { sanityAttr } from '@/src/sanity/lib/dataAttr';

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

  const lenis = useLenis();
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Sticky Circular Modern Back To Top Floating Button at Bottom Right */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 aspect-square shrink-0 rounded-full border-2 border-emerald-400/60 bg-slate-900/90 backdrop-blur-2xl text-emerald-400 hover:bg-emerald-500 hover:text-white hover:border-emerald-300 shadow-[0_0_25px_rgba(91,188,255,0.35)] hover:shadow-[0_0_35px_rgba(91,188,255,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center group animate-fadeIn ring-1 ring-white/20"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>
      )}

      {/* Clean Minimalist Footer */}
      <Reveal y={12} className="max-w-7xl mx-auto"><footer className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative border-t border-white/10 mt-8 sm:mt-12 text-center">
        <p {...sanityAttr(siteSettings, 'footerCopyright')} className="text-xs font-mono text-slate-400 tracking-wide">
          {siteSettings?.footerCopyright || `© ${new Date().getFullYear()} Adit Shah. All rights reserved.`}
        </p>
      </footer></Reveal>
    </>
  );
};
