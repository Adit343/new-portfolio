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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="apple-glass-panel w-full max-w-3xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative animate-scaleUp max-h-[92vh] flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span 
              className="text-xs font-mono font-bold px-3 py-1 rounded-full text-white shadow-sm"
              style={{ backgroundColor: `${project.accentColor}33`, border: `1px solid ${project.accentColor}` }}
            >
              {project.badge}
            </span>
            <span className="text-xs font-mono text-slate-400">{project.category}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl apple-glass-button text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
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
                <div key={idx} className="apple-glass-pill p-3.5 rounded-2xl text-center border-white/10">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{m.label}</div>
                  <div className="text-sm font-bold text-white mt-1">{m.value}</div>
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

