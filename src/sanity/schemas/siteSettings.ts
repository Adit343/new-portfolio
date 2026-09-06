import { defineType, defineField, Rule } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings (Header, Footer & Headings)',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name / Header Title',
      type: 'string',
      initialValue: 'ADIT SHAH',
      validation: (rule: any) => rule.required(),
    }),
    defineField({
      name: 'brandRole',
      title: 'Brand Subtitle / Role',
      type: 'string',
      initialValue: 'MERN Stack Developer',
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Initials / Monogram',
      type: 'string',
      initialValue: 'AS',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Section Anchor / URL' },
          ],
        },
      ],
      initialValue: [
        { label: 'About', href: '#about' },
        { label: 'Experience', href: '#experience' },
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Education', href: '#education' },
        { label: 'Contact', href: '#contact' },
      ],
    }),

    // Section Titles & Badges for Presentation Editing
    defineField({
      name: 'heroStatusPill',
      title: 'Hero Status Pill Text',
      type: 'string',
      initialValue: 'Available for MERN & Full-Stack Engineering Roles',
    }),
    defineField({
      name: 'heroProjectsCtaText',
      title: 'Hero Projects Button Text',
      type: 'string',
      initialValue: 'Explore Production Projects',
    }),
    defineField({
      name: 'recruiterSummaryTitle',
      title: 'Recruiter Quick Summary Title',
      type: 'string',
      initialValue: 'Recruiter Quick Summary',
    }),
    defineField({
      name: 'experienceBadge',
      title: 'Experience Section Badge Tag',
      type: 'string',
      initialValue: 'Industry Career Track',
    }),
    defineField({
      name: 'experienceTitle',
      title: 'Experience Section Heading Title',
      type: 'string',
      initialValue: 'Work Experience',
    }),
    defineField({
      name: 'experienceSubtitle',
      title: 'Experience Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Proven track record developing production MERN & Next.js applications at Inheritx Solutions.',
    }),
    defineField({
      name: 'projectsBadge',
      title: 'Projects Section Badge Tag',
      type: 'string',
      initialValue: 'Featured Production Applications',
    }),
    defineField({
      name: 'projectsTitle',
      title: 'Projects Section Heading Title',
      type: 'string',
      initialValue: 'Production Projects',
    }),
    defineField({
      name: 'projectsSubtitle',
      title: 'Projects Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Scanned direct from resume: Enterprise EV charging platforms, quality control analytics dashboards, and real-time football scouting software.',
    }),
    defineField({
      name: 'skillsBadge',
      title: 'Skills Section Badge Tag',
      type: 'string',
      initialValue: 'Technical Competencies & Stack',
    }),
    defineField({
      name: 'skillsTitle',
      title: 'Skills Section Heading Title',
      type: 'string',
      initialValue: 'Skills & Technologies',
    }),
    defineField({
      name: 'skillsSubtitle',
      title: 'Skills Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Comprehensive breakdown of modern web engineering technologies, tools, and productivity frameworks.',
    }),
    defineField({
      name: 'educationBadge',
      title: 'Education Section Badge Tag',
      type: 'string',
      initialValue: 'Academic Background',
    }),
    defineField({
      name: 'educationTitle',
      title: 'Education Section Heading Title',
      type: 'string',
      initialValue: 'Education & Degree',
    }),
    defineField({
      name: 'educationSubtitle',
      title: 'Education Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Engineering foundation from LJUniversity with strong academic performance in Computer Science.',
    }),
    defineField({
      name: 'contactBadge',
      title: 'Contact Section Badge Tag',
      type: 'string',
      initialValue: 'Direct Contact & Collaboration',
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact Section Heading Title',
      type: 'string',
      initialValue: 'Get In Touch',
    }),
    defineField({
      name: 'contactSubtitle',
      title: 'Contact Section Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Open for full-stack MERN engineering roles, Next.js projects, and client consultation.',
    }),
    defineField({
      name: 'contactFormTitle',
      title: 'Contact Form Card Title',
      type: 'string',
      initialValue: 'Send Direct Message',
    }),
    defineField({
      name: 'contactFormSubtitle',
      title: 'Contact Form Card Subtitle',
      type: 'string',
      initialValue: 'Send a message directly for project inquiries',
    }),
    defineField({
      name: 'contactCardTitle',
      title: 'Contact Info Card Title',
      type: 'string',
      initialValue: 'Contact Info',
    }),
    defineField({
      name: 'contactCardSubtitle',
      title: 'Contact Info Card Subtitle',
      type: 'string',
      initialValue: 'Direct communication channels',
    }),
    defineField({
      name: 'contactCardBadge',
      title: 'Contact Info Card Badge Tag',
      type: 'string',
      initialValue: 'Verified',
    }),
    defineField({
      name: 'globalClientTitle',
      title: 'Global Client Communication Title',
      type: 'string',
      initialValue: 'Global Client Communication',
    }),
    defineField({
      name: 'globalClientText',
      title: 'Global Client Communication Text',
      type: 'text',
      rows: 3,
      initialValue: 'Proficient in English speaking with hands-on experience handling international clients, requirement workshops, and technical presentations.',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social & Communication Links',
      type: 'object',
      fields: [
        { name: 'email', type: 'string', title: 'Email Address' },
        { name: 'phone', type: 'string', title: 'Formatted Phone Number' },
        { name: 'phoneRaw', type: 'string', title: 'Raw Phone Number (for tel: link)' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
        { name: 'github', type: 'url', title: 'GitHub URL' },
      ],
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF Document Upload',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Upload your PDF resume document here to enable the Download PDF button in the Resume modal.',
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume Direct Link / File URL',
      type: 'string',
      description: 'Alternative direct URL to your resume PDF (used if no file is uploaded).',
    }),
    defineField({
      name: 'footerCopyright',
      title: 'Footer Copyright Text',
      type: 'string',
      initialValue: '© 2026 Adit Shah. All rights reserved.',
    }),
  ],
});
