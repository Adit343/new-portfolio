'use client';

import React from 'react';
import { Mail, Phone, MapPin, Globe, Award, Sparkles, ChevronRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { PersonalDetails } from '../data/portfolioData';
import { downloadResume } from '../utils/downloadResume';
import { sanityAttr } from '@/src/sanity/lib/dataAttr';
import { Reveal, Typewriter, TiltCard } from './Reveal';

interface HeroProps {
  onOpenResume?: () => void;
  data?: PersonalDetails | null;
  siteSettings?: any;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume, data, siteSettings }) => {
  if (!data) return null;
  const personalDetails = data;

  const statusPill = siteSettings?.heroStatusPill ? siteSettings.heroStatusPill.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';
  const ctaText = siteSettings?.heroProjectsCtaText || 'Explore Production Projects';
  const summaryTitle = siteSettings?.recruiterSummaryTitle || 'Recruiter Quick Summary';

  return (
    <section id="about" className="relative pt-24 pb-10 sm:pt-40 md:pt-44 lg:pt-48 md:pb-16 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-w-0">
        
        {/* Left Content (7 Cols) */}
        <Reveal y={30} className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 min-w-0 w-full">
          
          {/* Status Pill */}
          {statusPill && (
            <div {...sanityAttr(siteSettings, 'heroStatusPill')} className="inline-flex items-center gap-2 apple-glass-pill px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-emerald-300 text-[11px] sm:text-xs font-semibold tracking-wide border border-emerald-500/30 shadow-lg shadow-emerald-500/10 max-w-full">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-400 glow-pulse shrink-0"></span>
              <span className="truncate">{statusPill}</span>
            </div>
          )}

          {/* Main Name & Title */}
          <div className="w-full">
            {personalDetails.name && (
              <div>
                <h1 {...sanityAttr(personalDetails, 'name')} className="text-[2.6rem] min-[400px]:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-extrabold tracking-tight text-white leading-tight sm:leading-none break-words max-w-full">
                  <Typewriter text={personalDetails.name} />
                </h1>
              </div>
            )}
            <p className="mt-3 sm:mt-4 text-base sm:text-2xl font-semibold text-slate-300 flex flex-wrap items-center gap-2 sm:gap-3">
              {personalDetails.title && <span {...sanityAttr(personalDetails, 'title')} className="font-mono text-emerald-400 text-sm sm:text-xl">{personalDetails.title}</span>}
              {personalDetails.title && personalDetails.yearsExperience && <span className="text-slate-600 hidden sm:inline">•</span>}
              {personalDetails.yearsExperience && (
                <span {...sanityAttr(personalDetails, 'yearsExperience')} className="text-slate-300 text-xs sm:text-sm font-normal apple-glass-pill px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl">
                  {personalDetails.yearsExperience}
                </span>
              )}
            </p>
          </div>

          {/* Personal Developer Philosophy Statement */}
          {personalDetails.summary && (
            <div className="apple-glass-pill p-3.5 sm:p-4 rounded-2xl border border-white/10 w-full">
              <p {...sanityAttr(personalDetails, 'summary')} className="text-slate-200 text-xs sm:text-base leading-relaxed font-normal">
                "{personalDetails.summary}"
              </p>
            </div>
          )}

          {/* Human Touch & Recruiter Highlights */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {personalDetails.englishProficiency && (
              <div className="apple-glass-pill px-3 py-1.5 rounded-xl border border-cyan-500/40 text-cyan-300 text-[11px] sm:text-xs font-medium flex items-center gap-1.5 shrink-0">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span {...sanityAttr(personalDetails, 'englishProficiency')}>{personalDetails.englishProficiency}</span>
              </div>
            )}

            {personalDetails.location && (
              <div className="apple-glass-pill px-3 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-medium flex items-center gap-1.5 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span {...sanityAttr(personalDetails, 'location')}>{personalDetails.location}</span>
              </div>
            )}

            {personalDetails.clientCommunication && (
              <div className="apple-glass-pill px-3 py-1.5 rounded-xl border border-purple-500/40 text-purple-300 text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span {...sanityAttr(personalDetails, 'clientCommunication')}>{personalDetails.clientCommunication}</span>
              </div>
            )}
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-3 w-full">
            {ctaText && (
              <a
                href="#projects"
                className="apple-glass-button-primary px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 group shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] col-span-2 sm:col-span-1 w-full sm:w-auto shrink-0 min-h-[46px]"
              >
                <span {...sanityAttr(siteSettings, 'heroProjectsCtaText')}>{ctaText}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            )}

            {personalDetails.email && (
              <a
                href={`mailto:${personalDetails.email}`}
                className="apple-glass-button px-2.5 sm:px-4 py-3.5 rounded-2xl font-medium text-xs sm:text-sm text-slate-200 hover:text-white flex items-center justify-center gap-2 sm:gap-2.5 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10 w-full sm:w-auto sm:flex-1 min-w-0 min-h-[46px]"
                title="Send Direct Email"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span {...sanityAttr(personalDetails, 'email')} className="truncate">{personalDetails.email}</span>
              </a>
            )}

            {personalDetails.phone && (
              <a
                href={`tel:${personalDetails.phoneRaw || personalDetails.phone}`}
                className="apple-glass-button px-2.5 sm:px-4 py-3.5 rounded-2xl font-medium text-xs sm:text-sm text-slate-200 hover:text-white flex items-center justify-center gap-2 sm:gap-2.5 transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10 w-full sm:w-auto sm:flex-1 min-w-0 min-h-[46px]"
                title="Call Phone Number"
              >
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span {...sanityAttr(personalDetails, 'phone')} className="truncate">{personalDetails.phone}</span>
              </a>
            )}
          </div>

        </Reveal>

        {/* Right Content: Apple Glass Interactive Widget (5 Cols) */}
        <Reveal x={40} y={0} delay={0.2} className="lg:col-span-5 relative mt-4 lg:mt-0 w-full">
          
          {/* Main Apple Glass Profile Card */}
          <TiltCard className="h-full" radius="rounded-3xl" max={5}>
          <div className="apple-glass-panel p-5 sm:p-8 rounded-3xl relative overflow-hidden border border-white/15 group shadow-2xl">
            
            {/* Ambient Inner Glowing Spot */}

            {/* Body: Recruiter Quick Summary */}
            {personalDetails.highlights && personalDetails.highlights.length > 0 && (
              <div className="space-y-3">
                {summaryTitle && (
                  <h4 {...sanityAttr(siteSettings, 'recruiterSummaryTitle')} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{summaryTitle}</h4>
                )}
                <div className="grid grid-cols-1 gap-2.5">
                  {personalDetails.highlights.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="apple-glass-pill p-3 rounded-xl flex items-center gap-3 text-xs text-slate-200 border border-white/5 hover:border-white/20 transition-all"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      <span {...sanityAttr(personalDetails, `highlights[${idx}]`)} className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Link */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end">
              <button
                onClick={() => downloadResume(siteSettings)}
                className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-2 group apple-glass-pill px-4 py-2 rounded-xl border border-emerald-500/30 hover:border-emerald-500/60 shadow-md hover:scale-105 transition-all cursor-pointer"
                title="Download Resume PDF"
              >
                <span>Download Resume PDF</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>
          </TiltCard>
        </Reveal>

      </div>
    </section>
  );
};
