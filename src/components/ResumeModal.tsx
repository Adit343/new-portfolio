'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Copy, Check, FileText } from 'lucide-react';
import { personalDetails, projectsData, experienceData, educationData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteSettings?: {
    resumeFileUrl?: string;
    resumeUrl?: string;
  } | null;
  resumeUrl?: string;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, siteSettings, resumeUrl }) => {
  const [copied, setCopied] = useState(false);

  const rawUrl = siteSettings?.resumeFileUrl || siteSettings?.resumeUrl || resumeUrl;
  const pdfUrl = rawUrl ? rawUrl.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const resumeText = `
ADIT SHAH
Email: ${personalDetails.email} | Phone: ${personalDetails.phone} | LinkedIn: linkedIn

SUMMARY
${personalDetails.summary} Excellent in client communication and handling clients and proficient in english speaking.

PROJECTS
- Charge pilot pro - (NextJS, TypeScript, TailwindCSS, Redux)
  Next.js-based web application designed for end-to-end management of electric vehicle (EV) charging infrastructure. The platform enables administrators and operators to efficiently oversee charging stations through role-based authentication, real-time charger monitoring, user and station management, and integrated billing workflows.

- QC Analytics Portal - (ReactJS, TypeScript, TailwindCSS, ZOD, shadcn UI)
  AdminPanel - A comprehensive web-based quality control management platform that enables organizations to manage QC processes, track product quality metrics, generate reports, and monitor departmental performance through an intuitive dashboard with real-time analytics and filtering capabilities.

- KoraVision - (NextJS, ReactJS, TypeScript, TailwindCSS)
  Built a full-stack football scouting platform with role-based auth (NextAuth v5), real-time WebSocket chat with auto-reconnect, and a social feed with likes/comments/media uploads. Implemented an in-browser video trimmer using Canvas API + MediaRecorder, Firebase push notifications, supported multilingual UI (EN/FR/AR with RTL), and a document verification onboarding flow across three user roles (Player, Parent, Scout).

WORK EXPERIENCE
- MERN developer, Inheritx Solutions (Apr 2025 - Present)
  Currently working on industry-level projects with a strong focus on Next.js, React.js, and TypeScript. Actively involved in developing scalable, high-performance web applications while implementing best practices in frontend architecture and state management.

- MERN intern, Inheritx Solutions (Dec 2024 - Mar 2025)
  Gained hands-on experience in full-stack development through practical tasks and small-scale projects. Developed strong proficiency in React.js and Tailwind CSS, focusing on building responsive, user-friendly interfaces. Additionally acquired foundational knowledge of Node.js and MongoDB, contributing to backend development and understanding of database operations.

SKILLS
- AI Tools: Familiar with LLMs like Amazon Q, Cursor, ChatGPT, Claude, Grok, Gemini, and Perplexity.
- Technical Skills: ReactJS, NextJS, TypeScript, Javascript, Tailwind CSS, NodeJS, MongoDB, Sanity CMS, Swagger, SQL, REST API, Postman, Visual Studio Code, Git, GitHub, Gitlab.

EDUCATION
- Bachelor of Engineering in Computer Science Engineering | LJUniversity (Nov 2021 - Nov 2025) | 8.19 CGPA
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-lg animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="glass-panel w-full max-w-2xl sm:max-w-3xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative my-auto max-h-[88vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Toolbar */}
        <div className="p-3.5 sm:p-6 border-b border-white/10 flex items-center justify-between gap-3 bg-white/[0.03] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl apple-glass-pill flex items-center justify-center border border-white/20 shrink-0">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-extrabold text-white truncate tracking-tight">Adit Shah — Resume</h2>
              <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 truncate">PDF Document Preview</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyText}
              className="apple-glass-button px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
              title="Copy plain resume text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden xs:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {pdfUrl && (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Resume_Adit_Shah.pdf"
                className="apple-glass-button-primary px-3.5 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-all cursor-pointer no-underline"
                title="Download PDF Resume"
              >
                <Download className="w-4 h-4" />
                <span className="hidden xs:inline">Download PDF</span>
              </a>
            )}

            {/* Clear, Accessible Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl apple-glass-button text-slate-300 hover:text-white hover:bg-rose-500/20 hover:border-rose-500/40 transition-all flex items-center justify-center shrink-0 border border-white/15 shadow-md"
              aria-label="Close modal"
              title="Close Modal"
            >
              <X className="w-5 h-5 text-slate-200" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto font-sans bg-slate-950/40 text-slate-200 text-sm">
          
          {/* Header */}
          <div className="text-center pb-6 border-b border-white/10">
            <h1 className="text-3xl font-extrabold text-white tracking-wider">ADIT SHAH</h1>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-300">
              <span>linkedIn</span>
              <span>•</span>
              <span>{personalDetails.phoneRaw}</span>
              <span>•</span>
              <span>{personalDetails.email}</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-white/10 pb-1 mb-3">
              SUMMARY
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {personalDetails.summary} Excellent in client communication and handling clients and proficient in english speaking.
            </p>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-white/10 pb-1 mb-4">
              PROJECTS
            </h3>
            <div className="space-y-4">
              {projectsData.map((p) => (
                <div key={p.id} className="space-y-1">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-bold text-white text-sm">• {p.title} -</span>
                    <span className="text-xs font-mono text-emerald-400">({p.tech.join(', ')})</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-white/10 pb-1 mb-4">
              WORK EXPERIENCE
            </h3>
            <div className="space-y-4">
              {experienceData.map((e) => (
                <div key={e.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">• {e.role}, {e.company}</span>
                    <span className="text-xs font-mono text-cyan-400">{e.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 pl-3">
                    {e.highlights.map((h, idx) => (
                      <li key={idx} className="leading-relaxed">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-white/10 pb-1 mb-3">
              SKILLS
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p>
                <strong className="text-white">• AI Tools:</strong> Familiar with LLMs like Amazon Q, Cursor, ChatGPT, Claude, Grok, Gemini, and Perplexity.
              </p>
              <p>
                <strong className="text-white">• Technical Skills:</strong> ReactJS, NextJS, TypeScript, Javascript, Tailwind CSS, NodeJS, MongoDB, Sanity CMS, Swagger, SQL, REST API, Postman, Visual Studio Code, Git, GitHub, Gitlab.
              </p>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase border-b border-white/10 pb-1 mb-3">
              EDUCATION
            </h3>
            <div className="flex flex-wrap items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white">• {educationData.degree}</span>
                <div className="text-slate-400 pl-3 font-semibold">{educationData.institution}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-emerald-400">Nov 2021 - Nov 2025</div>
                <div className="font-bold text-white">• {educationData.cgpa}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
