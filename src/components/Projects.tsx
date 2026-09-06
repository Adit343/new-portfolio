'use client';

import React, { useState } from 'react';
import { FolderGit2, Search, ArrowUpRight, Sliders } from 'lucide-react';
import type { Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';

interface ProjectsProps {
  data?: Project[];
  siteSettings?: any;
}

export const Projects: React.FC<ProjectsProps> = ({ data, siteSettings }) => {
  if (!data || data.length === 0) return null;
  const projectsData = data;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const badge = siteSettings?.projectsBadge || 'Featured Production Applications';
  const title = siteSettings?.projectsTitle || 'Production Projects';
  const subtitle = siteSettings?.projectsSubtitle || 'Scanned direct from resume: Enterprise EV charging platforms, quality control analytics dashboards, and real-time football scouting software.';

  const categories = ['All', 'NextJS', 'ReactJS', 'TypeScript', 'Redux', 'WebSockets'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = 
      selectedCategory === 'All' || 
      (project.tech && project.tech.some(t => t.toLowerCase() === selectedCategory.toLowerCase()));

    const matchesSearch = 
      (project.title && project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.tech && project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-12">
        {badge && (
          <div className="apple-glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 border border-cyan-500/30 mb-3 flex items-center gap-2 shadow-lg shadow-cyan-500/10">
            <FolderGit2 className="w-3.5 h-3.5" />
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

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto w-full">
        
        {/* Category Pills */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar items-center gap-1.5 sm:gap-2 apple-glass-pill p-1.5 rounded-2xl border border-white/10 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all duration-200 ${
                selectedCategory === cat
                  ? 'apple-glass-button-primary text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stack or features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full apple-glass-panel pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 border border-white/10 transition-colors"
          />
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id || idx}
            className="apple-glass-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative group cursor-pointer border border-white/15 overflow-hidden"
            onClick={() => setActiveProject(project)}
          >
            {/* Top Specular Line */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
              style={{ backgroundColor: project.accentColor || '#10b981' }}
            />

            <div>
              {/* Badge & Category */}
              <div className="flex items-center justify-between mb-4 pt-2">
                {project.badge && (
                  <span 
                    className="text-[11px] font-mono font-bold px-3 py-1 rounded-full text-white shadow-sm"
                    style={{ 
                      backgroundColor: `${project.accentColor || '#10b981'}33`, 
                      border: `1px solid ${project.accentColor || '#10b981'}66` 
                    }}
                  >
                    {project.badge}
                  </span>
                )}
                {project.category && <span className="text-[11px] font-mono text-slate-400">{project.category}</span>}
              </div>

              {/* Title & Subtitle */}
              {project.title && (
                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between tracking-tight">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>
              )}

              {project.subtitle && (
                <p className="mt-2 text-xs font-semibold text-cyan-300">
                  {project.subtitle}
                </p>
              )}

              {(project.description || project.summary) && (
                <p className="mt-4 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {project.description || project.summary}
                </p>
              )}
            </div>

            {/* Bottom Tech Badges & Interactive Demo Pill */}
            <div className="mt-6 pt-4 border-t border-white/10">
              {project.tech && project.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-lg apple-glass-pill text-slate-200 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Architecture & Live Demo</span>
                </span>
                <span className="text-slate-400 font-mono text-[10px]">Inspect</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

    </section>
  );
};
