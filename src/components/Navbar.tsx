'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, FileText, Download, Sparkles, Code, User, Briefcase, FolderGit2, GraduationCap, Mail, Sun, Moon } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import { downloadResume } from '../utils/downloadResume';
import { sanityAttr } from '@/src/sanity/lib/dataAttr';

interface NavbarProps {
  onOpenResume?: () => void;
  siteSettings?: any;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume, siteSettings }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Bulletproof IntersectionObserver for accurate scroll spy
    const sectionIds = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
    
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-15% 0px -50% 0px', // Triggers accurately as section enters viewport center
      threshold: 0
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', icon: User, id: 'about' },
    { name: 'Experience', href: '#experience', icon: Briefcase, id: 'experience' },
    { name: 'Projects', href: '#projects', icon: FolderGit2, id: 'projects' },
    { name: 'Skills', href: '#skills', icon: Code, id: 'skills' },
    { name: 'Education', href: '#education', icon: GraduationCap, id: 'education' },
    { name: 'Contact', href: '#contact', icon: Mail, id: 'contact' },
  ].map((link) => {
    // Label comes from Sanity when a matching entry exists (matched by anchor)
    const cms = siteSettings?.navLinks?.find((l: any) => l.href === link.href);
    return {
      ...link,
      name: cms?.label || link.name,
      attr: cms?._key ? sanityAttr(siteSettings, `navLinks[_key=="${cms._key}"].label`) : {},
    };
  });

  const brandName = siteSettings?.brandName || personalDetails.name;
  const brandRole = siteSettings?.brandRole || personalDetails.title;
  const logoText = siteSettings?.logoText || 'AS';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 px-2 sm:px-8 py-2 sm:py-5 transition-all duration-300 ${
        mobileMenuOpen ? 'hidden xl:block' : ''
      }`}>
        <div className={`max-w-7xl mx-auto rounded-full transition-all duration-300 backdrop-blur-2xl backdrop-saturate-200 border border-white/20 shadow-2xl ${
          scrolled 
            ? 'bg-slate-950/60 py-2 pl-2 sm:pl-3.5 pr-2 sm:pr-3.5 ring-1 ring-white/15' 
            : 'bg-slate-950/35 py-2.5 pl-2.5 sm:pl-4 pr-2.5 sm:pr-4 border-white/20'
        }`}>
          <div className="flex items-center justify-between">
            
            {/* Logo Brand (Non-clickable) */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-default select-none">
              <div className="w-10 h-10 aspect-square rounded-full apple-glass-pill flex items-center justify-center border border-white/30 shadow-md shrink-0">
                <span {...sanityAttr(siteSettings, 'logoText')} className="font-extrabold text-sm text-gradient-accent">{logoText}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span {...sanityAttr(siteSettings, 'brandName')} className="font-extrabold tracking-tight text-base sm:text-sm 2xl:text-base text-white truncate">
                  {brandName}
                </span>
                <span {...sanityAttr(siteSettings, 'brandRole')} className="text-[10px] sm:text-xs font-mono opacity-70 hidden 2xl:flex items-center gap-1.5 truncate text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {brandRole}
                </span>
              </div>
            </div>

            {/* Clean Floating Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  {...link.attr}
                  className={`px-3 py-1.5 2xl:px-4 2xl:py-2 text-xs 2xl:text-sm font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                    activeSection === link.id
                      ? 'bg-white/20 text-white shadow-md font-bold border border-white/30 backdrop-blur-sm scale-105'
                      : 'opacity-80 hover:opacity-100 hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Actions: Resume Button */}
            <div className="hidden xl:flex items-center gap-3 2xl:gap-5 shrink-0">
              
              {/* Resume Button */}
              <button
                onClick={() => downloadResume(siteSettings)}
                className="apple-glass-button-primary px-4 py-2 2xl:px-6 2xl:py-2.5 rounded-full text-xs 2xl:text-sm font-bold text-white flex items-center gap-2 shadow-lg hover:scale-105 transition-all group min-h-[36px] 2xl:min-h-[40px] shrink-0"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-white group-hover:translate-y-0.5 transition-transform" />
                <span>Resume PDF</span>
              </button>
            </div>

            {/* Mobile/Tablet Actions: Resume + Hamburger Menu Button */}
            <div className="flex xl:hidden items-center gap-2 shrink-0">
              <button
                onClick={() => downloadResume(siteSettings)}
                className="apple-glass-button-primary px-3 sm:px-4 py-2 rounded-full text-[11px] sm:text-xs font-bold text-white flex items-center gap-1.5 min-h-[38px]"
                title="Download Resume PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 sm:p-2.5 rounded-full apple-glass-button w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] aspect-square shrink-0 flex items-center justify-center"
                aria-label="Open side menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden animate-fade-in touch-none">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity touch-none"
            onClick={() => setMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Full-Screen Mobile Navigation Panel */}
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 w-full min-h-[100dvh] bg-[#080b12] px-6 pt-5 pb-7 z-50 flex flex-col overflow-y-auto overscroll-contain"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 aspect-square rounded-full border border-white/15 flex items-center justify-center shrink-0 bg-white/[0.04]">
                  <span className="font-extrabold text-sm text-emerald-400">{logoText}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-white text-lg tracking-tight truncate">{brandName}</span>
                  <span className="text-xs font-mono text-slate-400 truncate">{brandRole}</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 aspect-square flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white shrink-0"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links: big, numbered, staggered in */}
            <nav className="mt-10 flex flex-col">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.id;
                return (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    {...link.attr}
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.12 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center gap-4 py-4 border-b border-white/[0.07]"
                  >
                    <span className={`flex-1 text-[28px] leading-none font-semibold tracking-tight transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-active:text-white'}`}>
                      {link.name}
                    </span>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-slate-700 shrink-0" />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-auto pt-10 space-y-5 border-t border-white/[0.07]"
            >
              {(siteSettings?.socialLinks?.email || personalDetails.email) && (
                <a
                  href={`mailto:${siteSettings?.socialLinks?.email || personalDetails.email}`}
                  className="flex items-center gap-3 text-base font-medium text-slate-200 min-w-0"
                >
                  <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="truncate">{siteSettings?.socialLinks?.email || personalDetails.email}</span>
                </a>
              )}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  downloadResume(siteSettings);
                }}
                className="w-full apple-glass-button-primary py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </>
  );
};
