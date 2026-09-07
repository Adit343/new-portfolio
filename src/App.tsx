import { useState, useEffect } from 'react';
import { AmbientBackground } from './components/AmbientBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { downloadResume } from './utils/downloadResume';

export function App() {
  const [accent, setAccent] = useState<string>('emerald');

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
  }, [accent]);

  return (
    <div className="min-h-screen relative bg-[#030509] text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Dynamic Apple 2026 Ambient Light Mesh Backdrop */}
      <AmbientBackground accent={accent} />

      {/* Main Page Layout */}
      <div className="relative z-10">
        
        {/* Floating Apple Liquid Glass Navbar */}
        <Navbar
          accent={accent}
          setAccent={setAccent}
          onOpenResume={() => downloadResume()}
        />

        {/* Main Content Sections */}
        <main className="space-y-12 sm:space-y-20">
          <Hero 
            onOpenResume={() => downloadResume()}
          />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}

export default App;
