import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    _id,
    _type,
    brandName,
    brandRole,
    logoText,
    navLinks,
    heroStatusPill,
    heroProjectsCtaText,
    recruiterSummaryTitle,
    experienceBadge,
    experienceTitle,
    experienceSubtitle,
    projectsBadge,
    projectsTitle,
    projectsSubtitle,
    skillsBadge,
    skillsTitle,
    skillsSubtitle,
    educationBadge,
    educationTitle,
    educationSubtitle,
    contactBadge,
    contactTitle,
    contactSubtitle,
    contactFormTitle,
    contactFormSubtitle,
    contactCardTitle,
    contactCardSubtitle,
    contactCardBadge,
    globalClientTitle,
    globalClientText,
    socialLinks,
    resumeUrl,
    "resumeFileUrl": resumeFile.asset->url,
    footerCopyright
  }
`;

export const aboutQuery = groq`
  *[_type == "about"][0]{
    _id,
    _type,
    greetingPrefix,
    name,
    title,
    yearsExperience,
    email,
    phone,
    phoneRaw,
    location,
    linkedin,
    github,
    englishProficiency,
    clientCommunication,
    summary,
    highlights
  }
`;

export const experienceQuery = groq`
  *[_type == "experience"] | order(order asc) {
    _id,
    _type,
    role,
    company,
    period,
    isCurrent,
    location,
    highlights,
    tech,
    order
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    _type,
    "id": slug.current,
    title,
    badge,
    subtitle,
    category,
    tech,
    summary,
    description,
    role,
    keyFeatures,
    metrics,
    accentColor,
    "coverImage": coverImage.asset->url,
    liveUrl,
    githubUrl,
    order
  }
`;

export const skillsQuery = groq`
  *[_type == "skillCategory"] | order(order asc) {
    _id,
    _type,
    category,
    iconName,
    description,
    skills,
    order
  }
`;

export const educationQuery = groq`
  *[_type == "education"] | order(order asc) [0] {
    _id,
    _type,
    degree,
    institution,
    period,
    cgpa,
    highlights
  }
`;
