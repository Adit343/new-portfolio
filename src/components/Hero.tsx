'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, Sparkles, ChevronRight, ExternalLink } from 'lucide-react';
import { PersonalDetails } from '../data/portfolioData';

interface HeroProps {
  onOpenResume: () => void;
  data?: (PersonalDetails & { greetingPrefix?: string }) | null;
  siteSettings?: any;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, data, siteSettings }) => {
  if (!data) return null;
  const personalDetails = data;

  const statusPill = siteSettings?.heroStatusPill ? siteSettings.heroStatusPill.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';
  const ctaText = siteSettings?.heroProjectsCtaText || 'Explore Production Projects';
  const summaryTitle = siteSettings?.recruiterSummaryTitle || 'Recruiter Quick Summary';
  const greetingPrefix = personalDetails.greetingPrefix ? personalDetails.greetingPrefix.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';

  return (
    <section id="about" className="relative pt-28 pb-10 sm:pt-40 md:pt-44 lg:pt-48 md:pb-16 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Content (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6">
          
          {/* Status Pill */}
          {statusPill && (
            <div className="inline-flex items-center gap-2 apple-glass-pill px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-emerald-300 text-[11px] sm:text-xs font-semibold tracking-wide border border-emerald-500/30 shadow-lg shadow-emerald-500/10 max-w-full">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 glow-pulse shrink-0"></span>
              <span className="truncate">{statusPill}</span>
            </div>
          )}

          {/* Main Name & Title */}
          <div className="w-full">
            {personalDetails.name && (
              <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
                {greetingPrefix ? (
                  <>
                    <span>{greetingPrefix}</span> <br className="hidden sm:inline" />
                  </>
                ) : null}
                <span className="text-gradient-accent">{personalDetails.name}</span>
              </h1>
            )}
            <p className="mt-3 text-base sm:text-2xl font-semibold text-slate-300 flex flex-wrap items-center gap-2 sm:gap-3">
              {personalDetails.title && <span className="font-mono text-emerald-400 text-sm sm:text-xl">{personalDetails.title}</span>}
              {personalDetails.title && personalDetails.yearsExperience && <span className="text-slate-600 hidden xs:inline">•</span>}
              {personalDetails.yearsExperience && (
                <span className="text-slate-300 text-xs sm:text-sm font-normal apple-glass-pill px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl">
                  {personalDetails.yearsExperience}
                </span>
              )}
            </p>
          </div>

          {/* Personal Developer Philosophy Statement */}
          {personalDetails.summary && (
            <div className="apple-glass-pill p-3.5 sm:p-4 rounded-2xl border border-white/10 w-full">
              <p className="text-slate-200 text-xs sm:text-base leading-relaxed font-normal">
                "{personalDetails.summary}"
              </p>
            </div>
          )}

          {/* Human Touch & Recruiter Highlights */}
          <div className="flex flex-wrap gap-2 pt-1">
            {personalDetails.englishProficiency && (
              <div className="apple-glass-pill px-3 py-1.5 rounded-xl border border-cyan-500/40 text-cyan-300 text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{personalDetails.englishProficiency}</span>
              </div>
            )}

            {personalDetails.clientCommunication && (
              <div className="apple-glass-pill px-3 py-1.5 rounded-xl border border-purple-500/40 text-purple-300 text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>{personalDetails.clientCommunication}</span>
              </div>
            )}

            {personalDetails.location && (
              <div className="apple-glass-pill px-3 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{personalDetails.location}</span>
              </div>
            )}
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-3 w-full">
            {ctaText && (
              <a
                href="#projects"
                className="apple-glass-button-primary px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 group shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shrink-0 min-h-[46px]"
              >
                <span>{ctaText}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            )}

            {personalDetails.email && (
              <a
                href={`mailto:${personalDetails.email}`}
                className="apple-glass-button px-4 py-3.5 rounded-2xl font-medium text-xs sm:text-sm text-slate-200 hover:text-white flex items-center justify-center gap-2.5 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 w-full sm:w-auto sm:flex-1 min-w-0 min-h-[46px]"
                title="Send Direct Email"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{personalDetails.email}</span>
              </a>
            )}

            {personalDetails.phone && (
              <a
                href={`tel:${personalDetails.phoneRaw || personalDetails.phone}`}
                className="apple-glass-button px-4 py-3.5 rounded-2xl font-medium text-xs sm:text-sm text-slate-200 hover:text-white flex items-center justify-center gap-2.5 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 w-full sm:w-auto sm:flex-1 min-w-0 min-h-[46px]"
                title="Call Phone Number"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="truncate">{personalDetails.phone}</span>
              </a>
            )}
          </div>

        </div>

        {/* Right Content: Apple Glass Interactive Widget (5 Cols) */}
        <div className="lg:col-span-5 relative mt-4 lg:mt-0 w-full">
          
          {/* Main Apple Glass Profile Card */}
          <div className="apple-glass-panel p-5 sm:p-8 rounded-3xl relative overflow-hidden border border-white/15 group shadow-2xl">
            
            {/* Ambient Inner Glowing Spot */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl group-hover:bg-emerald-500/25 transition-all duration-700"></div>

            {/* Body: Recruiter Quick Summary */}
            {personalDetails.highlights && personalDetails.highlights.length > 0 && (
              <div className="space-y-3">
                {summaryTitle && (
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{summaryTitle}</h4>
                )}
                <div className="grid grid-cols-1 gap-2.5">
                  {personalDetails.highlights.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="apple-glass-pill p-3 rounded-xl flex items-center gap-3 text-xs text-slate-200 border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Link */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={onOpenResume}
                className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group"
              >
                <span>View Full PDF</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
