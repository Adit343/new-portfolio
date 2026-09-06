import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...values] = trimmed.split('=');
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token || projectId === 'dummy_project_id') {
  console.error('Error: Please configure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local before seeding.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-01',
  useCdn: false,
  token,
});

async function seedSanity() {
  console.log(`Starting auto-population into Sanity project: ${projectId} (${dataset})...`);

  // 1. Site Settings Document
  console.log('Creating Site Settings document...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'ADIT SHAH',
    brandRole: 'MERN Stack Developer',
    logoText: 'AS',
    navLinks: [
      { label: 'About', href: '#about' },
      { label: 'Experience', href: '#experience' },
      { label: 'Projects', href: '#projects' },
      { label: 'Skills', href: '#skills' },
      { label: 'Education', href: '#education' },
      { label: 'Contact', href: '#contact' },
    ],
    heroStatusPill: 'Available for MERN & Full-Stack Engineering Roles',
    heroProjectsCtaText: 'Explore Production Projects',
    recruiterSummaryTitle: 'Recruiter Quick Summary',
    experienceBadge: 'Industry Career Track',
    experienceTitle: 'Work Experience',
    experienceSubtitle: 'Proven track record developing production MERN & Next.js applications at Inheritx Solutions.',
    projectsBadge: 'Featured Production Applications',
    projectsTitle: 'Production Projects',
    projectsSubtitle: 'Scanned direct from resume: Enterprise EV charging platforms, quality control analytics dashboards, and real-time football scouting software.',
    skillsBadge: 'Technical Competencies & Stack',
    skillsTitle: 'Skills & Technologies',
    skillsSubtitle: 'Comprehensive breakdown of modern web engineering technologies, tools, and productivity frameworks.',
    educationBadge: 'Academic Background',
    educationTitle: 'Education & Degree',
    educationSubtitle: 'Engineering foundation from LJUniversity with strong academic performance in Computer Science.',
    contactBadge: 'Direct Contact & Collaboration',
    contactTitle: 'Get In Touch',
    contactSubtitle: 'Open for full-stack MERN engineering roles, Next.js projects, and client consultation.',
    contactFormTitle: 'Send Direct Message',
    contactFormSubtitle: 'Send a message directly for project inquiries',
    socialLinks: {
      email: 'shahadit68@gmail.com',
      phone: '+91 9265955849',
      phoneRaw: '9265955849',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    footerCopyright: '© 2026 Adit Shah. All rights reserved.',
  });

  // 2. About Profile Document
  console.log('Creating About Profile document...');
  await client.createOrReplace({
    _id: 'about',
    _type: 'about',
    greetingPrefix: "Hello, I'm",
    name: 'ADIT SHAH',
    title: 'MERN Stack Developer',
    yearsExperience: '2 Years Hands-on',
    email: 'shahadit68@gmail.com',
    phone: '+91 9265955849',
    phoneRaw: '9265955849',
    location: 'India',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    englishProficiency: 'Proficient English Speaking',
    clientCommunication: 'Excellent Client Communication & Management',
    summary: 'MERN Stack Developer with 2 years of hands-on experience, specializing in building fast, responsive, and user-centric web applications using React.js and Next.js. Skilled in component-based architecture, efficient state management, and seamless API integration. Known for writing clean, maintainable code and delivering high-quality features that enhance performance, usability, and overall product value.',
    highlights: [
      'React.js & Next.js Ecosystem Expert',
      'Component-Based Frontend Architecture',
      'Scalable State Management (Redux)',
      'Real-time WebSockets & Canvas Video Trimmer',
      'Multilingual UI Support (EN/FR/AR with RTL)',
      'Client Communication & Requirement Engineering',
    ],
  });

  console.log('Successfully auto-populated all section headings & titles into Sanity CMS!');
}

seedSanity().catch((err) => {
  console.error('Failed to seed Sanity CMS:', err);
  process.exit(1);
});
