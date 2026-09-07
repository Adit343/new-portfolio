'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Download, Sparkles, Code, User, Briefcase, FolderGit2, GraduationCap, Mail, Sun, Moon } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import { downloadResume } from '../utils/downloadResume';

interface NavbarProps {
  accent: string;
  setAccent: (accent: string) => void;
  onOpenResume?: () => void;
  siteSettings?: any;
}

export const Navbar: React.FC<NavbarProps> = ({ accent, setAccent, onOpenResume, siteSettings }) => {
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
  ];

  const accents = [
    { id: 'emerald', color: '#10b981', label: 'Emerald' },
    { id: 'cyan', color: '#06b6d4', label: 'Cyan' },
    { id: 'violet', color: '#8b5cf6', label: 'Violet' },
    { id: 'amber', color: '#f59e0b', label: 'Amber' },
    { id: 'rose', color: '#f43f5e', label: 'Rose' },
    { id: 'indigo', color: '#6366f1', label: 'Indigo' },
    { id: 'teal', color: '#14b8a6', label: 'Teal' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 px-2 sm:px-8 py-2 sm:py-5 transition-all duration-300 ${
        mobileMenuOpen ? 'hidden lg:block' : ''
      }`}>
        <div className={`max-w-7xl mx-auto rounded-full transition-all duration-300 backdrop-blur-2xl backdrop-saturate-200 border border-white/20 shadow-2xl ${
          scrolled 
            ? 'bg-slate-950/60 py-2 pl-2 sm:pl-3.5 pr-2 sm:pr-3.5 ring-1 ring-white/15' 
            : 'bg-slate-950/35 py-2.5 pl-2.5 sm:pl-4 pr-2.5 sm:pr-4 border-white/20'
        }`}>
          <div className="flex items-center justify-between">
            
            {/* Logo Brand (Non-clickable) */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-default select-none">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full apple-glass-pill flex items-center justify-center border border-white/30 shadow-md shrink-0">
                <span className="font-extrabold text-[11px] sm:text-sm text-gradient-accent">AS</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold tracking-tight text-xs sm:text-sm 2xl:text-base text-white truncate">
                  {personalDetails.name}
                </span>
                <span className="text-[10px] sm:text-xs font-mono opacity-70 hidden 2xl:flex items-center gap-1.5 truncate text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {personalDetails.title}
                </span>
              </div>
            </div>

            {/* Clean Floating Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
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

            {/* Right Actions: Theme Glow Switcher + Resume Button */}
            <div className="hidden xl:flex items-center gap-3 2xl:gap-5 shrink-0">
              
              {/* Ambient Accent Selector */}
              <div className="flex items-center gap-1.5 2xl:gap-2.5 apple-glass-pill px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full border-white/15 shadow-inner" title="Change Ambient Glow Accent">
                <Sparkles className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 text-emerald-400 opacity-80 mr-0.5 shrink-0" />
                <div className="flex items-center gap-1.5 2xl:gap-2.5">
                  {accents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAccent(item.id)}
                      className={`w-3.5 h-3.5 2xl:w-4 2xl:h-4 rounded-full transition-all duration-200 ${
                        accent === item.id ? 'scale-125 ring-2 ring-white shadow-md' : 'opacity-60 hover:opacity-100 hover:scale-110'
                      }`}
                      style={{ backgroundColor: item.color }}
                      aria-label={`Set theme accent to ${item.label}`}
                    />
                  ))}
                </div>
              </div>

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
                className="p-2 sm:p-2.5 rounded-full apple-glass-button min-w-[38px] min-h-[38px] flex items-center justify-center"
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
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in touch-none">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity touch-none"
            onClick={() => setMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
          />

          {/* Full-Screen Mobile Navigation Panel */}
          <div className="fixed inset-0 w-full min-h-[100dvh] bg-slate-950/98 backdrop-blur-2xl p-5 sm:p-6 z-50 flex flex-col justify-between shadow-2xl overflow-y-auto overscroll-contain animate-fade-in">
            
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full apple-glass-pill flex items-center justify-center border border-white/30 shrink-0">
                    <span className="font-extrabold text-sm text-gradient-accent">AS</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-extrabold text-white text-base truncate">
                      {personalDetails.name}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 truncate">
                      {personalDetails.title}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full apple-glass-button text-slate-300 hover:text-white shrink-0"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="mt-6 flex flex-col gap-2.5">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;

                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-white/20 text-white border border-white/30 shadow-lg scale-[1.02]'
                          : 'apple-glass-button text-slate-300 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-6 border-t border-white/10 space-y-4">

              {/* Accent Selector */}
              <div className="apple-glass-pill p-3 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ambient Glow:</span>
                  </span>
                  <span className="capitalize text-emerald-400 font-bold">{accent}</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  {accents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setAccent(item.id)}
                      className={`w-6 h-6 rounded-full transition-all duration-200 flex items-center justify-center ${
                        accent === item.id ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: item.color }}
                      aria-label={`Select ${item.label} theme`}
                    >
                      {accent === item.id && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resume Download CTA */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  downloadResume(siteSettings);
                }}
                className="w-full apple-glass-button-primary py-3.5 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
