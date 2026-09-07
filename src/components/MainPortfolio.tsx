'use client';

import { useState, useEffect } from 'react';
import { AmbientBackground } from '@/src/components/AmbientBackground';
import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { Experience } from '@/src/components/Experience';
import { Projects } from '@/src/components/Projects';
import { Skills } from '@/src/components/Skills';
import { Education } from '@/src/components/Education';
import { Contact } from '@/src/components/Contact';
import { Footer } from '@/src/components/Footer';
import { downloadResume } from '@/src/utils/downloadResume';
import type { PersonalDetails, Project, ExperienceItem, SkillCategory, EducationItem } from '@/src/data/portfolioData';

interface MainPortfolioProps {
  initialSiteSettings?: any;
  initialHeroData?: (PersonalDetails & { greetingPrefix?: string }) | null;
  initialExperience?: ExperienceItem[];
  initialProjects?: Project[];
  initialSkills?: SkillCategory[];
  initialEducation?: EducationItem | null;
}

export function MainPortfolio({
  initialSiteSettings,
  initialHeroData,
  initialExperience = [],
  initialProjects = [],
  initialSkills = [],
  initialEducation,
}: MainPortfolioProps) {
  const [accent, setAccent] = useState<string>('emerald');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  }, [accent]);

  return (
    <div className="min-h-screen relative bg-[#030509] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Dynamic Ambient Light Backdrop */}
      <AmbientBackground accent={accent} />

      {/* Main Page Content */}
      <div className="relative z-10">
        <Navbar
          accent={accent}
          setAccent={setAccent}
          onOpenResume={() => downloadResume(initialSiteSettings)}
          siteSettings={initialSiteSettings}
        />

        <main className="space-y-8 sm:space-y-12">
          {initialHeroData && (
            <Hero 
              data={initialHeroData} 
              siteSettings={initialSiteSettings} 
              onOpenResume={() => downloadResume(initialSiteSettings)} 
            />
          )}
          {initialExperience && initialExperience.length > 0 && (
            <Experience data={initialExperience} siteSettings={initialSiteSettings} />
          )}
          {initialProjects && initialProjects.length > 0 && (
            <Projects data={initialProjects} siteSettings={initialSiteSettings} />
          )}
          {initialSkills && initialSkills.length > 0 && (
            <Skills data={initialSkills} siteSettings={initialSiteSettings} />
          )}
          {initialEducation && initialEducation.degree && (
            <Education data={initialEducation} siteSettings={initialSiteSettings} />
          )}
          <Contact siteSettings={initialSiteSettings} aboutData={initialHeroData} />
        </main>

        <Footer siteSettings={initialSiteSettings} />
      </div>
    </div>
  );
}
