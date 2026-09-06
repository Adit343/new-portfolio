'use client';

import React from 'react';
import { GraduationCap, Award, Calendar, CheckCircle, BookOpen } from 'lucide-react';
import { EducationItem } from '../data/portfolioData';

interface EducationProps {
  data?: EducationItem;
  siteSettings?: any;
}

export const Education: React.FC<EducationProps> = ({ data, siteSettings }) => {
  if (!data || !data.degree) return null;
  const educationData = data;

  const badge = siteSettings?.educationBadge || 'Academic Background';
  const title = siteSettings?.educationTitle || 'Education & Degree';
  const subtitle = siteSettings?.educationSubtitle || 'Engineering foundation from LJUniversity with strong academic performance in Computer Science.';

  return (
    <section id="education" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        {badge && (
          <div className="apple-glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/30 mb-3 flex items-center gap-2 shadow-lg shadow-emerald-500/10">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
        )}
        {title && (
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-3 text-slate-400 max-w-2xl text-sm sm:text-base">
            {subtitle}
          </p>
        )}
      </div>

      {/* Education Glass Card Container */}
      <div className="max-w-4xl mx-auto">
        <div className="apple-glass-panel p-5 sm:p-10 rounded-2xl sm:rounded-3xl relative overflow-hidden border border-white/10 group shadow-2xl">
          
          {/* Ambient Glow Blob */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-white/10">
            
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl apple-glass-pill flex items-center justify-center border border-white/20 shrink-0">
                <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
              </div>
              <div>
                {educationData.degree && (
                  <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">
                    {educationData.degree}
                  </h3>
                )}
                {educationData.institution && (
                  <p className="text-xs sm:text-sm font-semibold text-emerald-400 mt-1 flex items-center gap-2">
                    <span>{educationData.institution}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              {educationData.period && (
                <span className="text-xs font-mono px-3.5 py-1.5 rounded-full apple-glass-pill text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 whitespace-nowrap shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {educationData.period.replace('May 2025', 'Nov 2025')}
                </span>
              )}
              {educationData.cgpa && (
                <span className="text-xs font-mono font-bold px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-md shadow-emerald-500/10 whitespace-nowrap shrink-0">
                  <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {educationData.cgpa}
                </span>
              )}
            </div>

          </div>

          {/* Academic Highlights List */}
          {educationData.highlights && educationData.highlights.length > 0 && (
            <div className="mt-6 pt-2">
              <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
                Academic & Engineering Highlights
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {educationData.highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="apple-glass-pill p-3.5 rounded-2xl flex items-start gap-3 border border-white/10 hover:border-white/20 transition-all text-xs text-slate-200"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
};
