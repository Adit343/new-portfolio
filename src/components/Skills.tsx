'use client';

import React, { useState } from 'react';
import { Code2, Database, Sparkles, Wrench, Search, CheckCircle, Cpu } from 'lucide-react';
import { SkillCategory } from '../data/portfolioData';

interface SkillsProps {
  data?: SkillCategory[];
  siteSettings?: any;
}

export const Skills: React.FC<SkillsProps> = ({ data, siteSettings }) => {
  if (!data || data.length === 0) return null;
  const skillCategories = data;
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('All');

  const badge = siteSettings?.skillsBadge || 'Technical Competencies & Stack';
  const title = siteSettings?.skillsTitle || 'Skills & Technologies';
  const subtitle = siteSettings?.skillsSubtitle || 'Comprehensive breakdown of modern web engineering technologies, tools, and productivity frameworks.';

  const iconsMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5 text-emerald-400" />,
    Database: <Database className="w-5 h-5 text-cyan-400" />,
    Sparkles: <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />,
    Wrench: <Wrench className="w-5 h-5 text-amber-400" />
  };

  const categoryStyles: Record<string, { ring: string; badgeBg: string; badgeText: string; border: string; badgeLabel: string }> = {
    'Frontend Architecture': {
      ring: 'ring-1 ring-emerald-500/40 border-emerald-500/30 shadow-xl shadow-emerald-500/10 bg-emerald-950/[0.08]',
      badgeBg: 'bg-emerald-500/20',
      badgeText: 'text-emerald-300',
      border: 'border-emerald-500/30',
      badgeLabel: 'Frontend Architecture'
    },
    'Backend & Databases': {
      ring: 'ring-1 ring-cyan-500/40 border-cyan-500/30 shadow-xl shadow-cyan-500/10 bg-cyan-950/[0.08]',
      badgeBg: 'bg-cyan-500/20',
      badgeText: 'text-cyan-300',
      border: 'border-cyan-500/30',
      badgeLabel: 'Backend & Data'
    },
    'AI Tools & Productivity Suite': {
      ring: 'ring-1 ring-purple-500/40 border-purple-500/30 shadow-xl shadow-purple-500/10 bg-purple-950/[0.08]',
      badgeBg: 'bg-purple-500/20',
      badgeText: 'text-purple-300',
      border: 'border-purple-500/30',
      badgeLabel: 'AI & Developer Tools'
    },
    'Workflow & Developer Tools': {
      ring: 'ring-1 ring-amber-500/40 border-amber-500/30 shadow-xl shadow-amber-500/10 bg-amber-950/[0.08]',
      badgeBg: 'bg-amber-500/20',
      badgeText: 'text-amber-300',
      border: 'border-amber-500/30',
      badgeLabel: 'DevOps & Tooling'
    }
  };

  const tabs = ['All', 'Frontend', 'Backend', 'AI & Tools'];

  const filteredCategories = skillCategories.filter((cat) => {
    const matchesTab = 
      activeTab === 'All' ||
      (activeTab === 'Frontend' && cat.category.includes('Frontend')) ||
      (activeTab === 'Backend' && cat.category.includes('Backend')) ||
      (activeTab === 'AI & Tools' && (cat.category.includes('AI') || cat.category.includes('Workflow')));

    const matchesSearch = 
      !skillSearch ||
      cat.category.toLowerCase().includes(skillSearch.toLowerCase()) ||
      cat.description.toLowerCase().includes(skillSearch.toLowerCase()) ||
      (cat.skills && cat.skills.some(s => s.name.toLowerCase().includes(skillSearch.toLowerCase())));

    return matchesTab && matchesSearch;
  });

  return (
    <section id="skills" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Section Title */}
      <div className="flex flex-col items-center text-center mb-12">
        {badge && (
          <div className="apple-glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-purple-400 border border-purple-500/30 mb-3 flex items-center gap-2 shadow-lg shadow-purple-500/10">
            <Cpu className="w-3.5 h-3.5" />
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
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all duration-200 ${
                activeTab === tab
                  ? 'apple-glass-button-primary text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter skills (e.g. React, Redux, Node)..."
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
            className="w-full apple-glass-panel pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 border border-white/10 transition-colors"
          />
        </div>

      </div>

      {/* 4 Categorized Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCategories.map((cat, idx) => {
          const style = categoryStyles[cat.category] || {
            ring: 'ring-1 ring-emerald-500/40 border-emerald-500/30 shadow-xl shadow-emerald-500/10 bg-emerald-950/[0.08]',
            badgeBg: 'bg-emerald-500/20',
            badgeText: 'text-emerald-300',
            border: 'border-emerald-500/30',
            badgeLabel: cat.category
          };

          return (
            <div 
              key={cat.category || idx} 
              className={`apple-glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden transition-all duration-300 ${style.ring}`}
            >
              
              {/* Category Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl apple-glass-pill flex items-center justify-center border border-white/15">
                    {iconsMap[cat.iconName] || <Code2 className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">{cat.category}</h3>
                    {cat.description && <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>}
                  </div>
                </div>
              </div>

              {/* Skill Tags List */}
              {cat.skills && cat.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
                  {cat.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="apple-glass-pill px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 border border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.08] transition-all group cursor-default max-w-full min-w-0"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-white truncate">{skill.name}</span>
                      {skill.tag && (
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md bg-white/10 text-slate-300 uppercase shrink-0">
                          {skill.tag}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
};
