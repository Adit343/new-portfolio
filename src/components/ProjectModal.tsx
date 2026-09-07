'use client';

import React from 'react';
import { X, CheckCircle2, ShieldCheck, Zap, Code2 } from 'lucide-react';
import type { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  React.useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && project) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const getBadgeClasses = (badge: string) => {
    const lower = badge ? badge.toLowerCase() : '';
    if (lower.includes('ev') || lower.includes('infrastructure')) {
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
    }
    if (lower.includes('quality') || lower.includes('qa') || lower.includes('assurance')) {
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]';
    }
    if (lower.includes('football') || lower.includes('platform') || lower.includes('sports')) {
      return 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.25)]';
    }
    return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.25)]';
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn no-scrollbar"
      onClick={onClose}
    >
      <div 
        className="apple-glass-panel w-full max-w-3xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative animate-scaleUp max-h-[90vh] sm:max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-3.5 sm:p-5 border-b border-white/10 flex items-center justify-between gap-2.5 bg-white/[0.03] shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0 pr-1">
            {project.badge && (
              <span className={`text-[11px] sm:text-xs font-mono font-extrabold px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border whitespace-nowrap shrink-0 ${getBadgeClasses(project.badge)}`}>
                {project.badge}
              </span>
            )}
            {project.category && (
              <span className="text-[11px] sm:text-xs font-mono font-semibold text-cyan-300 tracking-wide whitespace-nowrap shrink-0">
                {project.category}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-xl apple-glass-button bg-slate-900/90 text-slate-100 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/40 border border-white/20 transition-all flex items-center justify-center shrink-0 shadow-lg cursor-pointer group ml-auto"
            aria-label="Close modal"
            title="Close Modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-100 group-hover:text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto no-scrollbar">
          
          {/* Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Metrics Row */}
          {project.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="apple-glass-pill p-4 rounded-2xl text-left flex flex-col items-start justify-center border border-white/10 bg-white/[0.02]">
                  <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">{m.label}</div>
                  <div className="text-sm font-extrabold text-white mt-1">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Project Overview & Architecture</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed apple-glass-pill p-4 rounded-2xl border border-white/5">
              {project.description}
            </p>
          </div>

          {/* Key Feature Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Key Technical Highlights</span>
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {project.keyFeatures.map((feature, i) => (
                <div key={i} className="apple-glass-pill p-3.5 rounded-xl flex items-start gap-3 border-white/10 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Technology Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span 
                  key={t}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium apple-glass-pill text-white border-white/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

