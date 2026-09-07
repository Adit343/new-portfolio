'use client';

import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building2, Code2 } from 'lucide-react';
import { ExperienceItem } from '../data/portfolioData';

interface ExperienceProps {
  data?: ExperienceItem[];
  siteSettings?: any;
}

export const Experience: React.FC<ExperienceProps> = ({ data, siteSettings }) => {
  if (!data || data.length === 0) return null;
  const experienceData = data;

  const badge = siteSettings?.experienceBadge || 'Industry Career Track';
  const title = siteSettings?.experienceTitle || 'Work Experience';
  const subtitle = siteSettings?.experienceSubtitle || 'Proven track record developing production MERN & Next.js applications at Inheritx Solutions.';

  return (
    <section id="experience" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        {badge && (
          <div className="apple-glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/30 mb-3 flex items-center gap-2 shadow-lg shadow-emerald-500/10">
            <Briefcase className="w-3.5 h-3.5" />
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

      {/* Zig-Zag Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        
        {/* Animated Central Vertical Glowing Connector Line */}
        <div className="absolute left-3.5 lg:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-emerald-400 via-cyan-400 to-purple-500 opacity-60 rounded-full transform lg:-translate-x-1/2 shadow-sm shadow-emerald-500/50"></div>

        {/* Experience Items in Alternating Zig-Zag Pattern */}
        <div className="space-y-8 sm:space-y-12">
          {experienceData.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={exp.id || index} 
                className={`relative flex flex-col lg:flex-row items-start ${
                  isEven ? 'lg:flex-row-reverse' : ''
                } group transition-all duration-300`}
              >
                
                {/* Timeline Node Badge */}
                <div className="absolute left-3.5 lg:left-1/2 transform -translate-x-1/2 z-10 w-8 h-8 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl apple-glass-panel border border-emerald-400/60 flex items-center justify-center group-hover:scale-115 transition-all duration-300 shadow-xl shadow-emerald-500/25 bg-slate-950">
                  <div className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full ${
                    exp.isCurrent 
                      ? 'bg-emerald-400 animate-ping' 
                      : 'bg-cyan-400'
                  }`} />
                  <span className="absolute w-full h-full rounded-xl sm:rounded-2xl border border-emerald-400/40 animate-pulse"></span>
                </div>

                {/* Glass Card Content */}
                <div className="w-full lg:w-[calc(50%-2rem)] pl-9 lg:pl-0">
                  <div 
                    className={`apple-glass-card p-4 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden transition-all duration-400 ${
                      exp.isCurrent
                        ? 'ring-1 ring-emerald-500/40 border-emerald-500/40 shadow-xl shadow-emerald-500/10 bg-emerald-950/[0.08]'
                        : 'ring-1 ring-cyan-500/40 border-cyan-500/40 shadow-xl shadow-cyan-500/10 bg-cyan-950/[0.08]'
                    }`}
                  >
                    
                    {/* Top Specular Line Accent */}
                    <div 
                      className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                        exp.isCurrent ? 'bg-gradient-to-r from-emerald-400 to-cyan-400' : 'bg-gradient-to-r from-cyan-400 to-purple-400'
                      }`}
                    />

                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pt-1">
                      {exp.period && (
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full apple-glass-pill border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 shadow-sm">
                          <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                          {exp.period}
                        </span>
                      )}

                      {exp.isCurrent ? (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          Present Role
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                          Completed Role
                        </span>
                      )}
                    </div>

                    {/* Role Title & Company */}
                    {exp.role && (
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                        {exp.role}
                      </h3>
                    )}
                    
                    <div className="text-sm font-semibold text-cyan-300 mt-1 flex flex-wrap items-center gap-2">
                      {exp.company && (
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-cyan-400" />
                          <span>{exp.company}</span>
                        </div>
                      )}
                      {exp.company && exp.location && <span className="text-slate-600">•</span>}
                      {exp.location && (
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {exp.location}
                        </span>
                      )}
                    </div>

                    {/* Bullet Highlights */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <div className="mt-5 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Key Achievements & Deliveries
                          </span>
                        </div>

                        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                          {exp.highlights.map((point, i) => (
                            <li key={i} className="flex items-start gap-3 apple-glass-pill p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="leading-relaxed font-medium">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Chips */}
                    {exp.tech && exp.tech.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5 mb-2">
                          <Code2 className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-[11px] font-mono text-slate-400">Tech & Architecture</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {exp.tech.map((t) => (
                            <span 
                              key={t}
                              className="text-[11px] font-mono font-medium px-3 py-1 rounded-xl apple-glass-pill text-slate-200 border border-white/15 hover:border-emerald-500/50 hover:text-white transition-all shadow-sm"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
