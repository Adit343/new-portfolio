export interface Project {
  id: string;
  title: string;
  badge: string;
  subtitle: string;
  category: string;
  tech: string[];
  summary: string;
  description: string;
  role: string;
  keyFeatures: string[];
  metrics?: { label: string; value: string }[];
  accentColor: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  location: string;
  highlights: string[];
  tech: string[];
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: { name: string; level?: string; tag?: string }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  highlights: string[];
}

export interface PersonalDetails {
  name: string;
  title: string;
  yearsExperience: string;
  email: string;
  phone: string;
  phoneRaw: string;
  linkedin: string;
  github: string;
  location: string;
  englishProficiency: string;
  clientCommunication: string;
  summary: string;
  highlights: string[];
}

export const personalDetails: PersonalDetails = {
  name: "ADIT SHAH",
  title: "MERN Stack Developer",
  yearsExperience: "2 Years Hands-on",
  email: "shahadit68@gmail.com",
  phone: "+91 9265955849",
  phoneRaw: "9265955849",
  linkedin: "https://linkedin.com",
  github: "https://github.com",
  location: "India",
  englishProficiency: "Proficient English Speaking",
  clientCommunication: "Excellent Client Communication & Management",
  summary: "MERN Stack Developer with 2 years of hands-on experience, specializing in building fast, responsive, and user-centric web applications using React.js and Next.js. Skilled in component-based architecture, efficient state management, and seamless API integration. Known for writing clean, maintainable code and delivering high-quality features that enhance performance, usability, and overall product value.",
  highlights: [
    "React.js & Next.js Ecosystem Expert",
    "Component-Based Frontend Architecture",
    "Scalable State Management (Redux)",
    "Real-time WebSockets & Canvas Video Trimmer",
    "Multilingual UI Support (EN/FR/AR with RTL)",
    "Client Communication & Requirement Engineering"
  ]
};

export const projectsData: Project[] = [
  {
    id: "charge-pilot-pro",
    title: "Charge pilot pro",
    badge: "EV Infrastructure",
    subtitle: "End-to-End Electric Vehicle Charging Management Platform",
    category: "Full-Stack Enterprise",
    tech: ["NextJS", "TypeScript", "TailwindCSS", "Redux"],
    summary: "Next.js-based web application designed for end-to-end management of electric vehicle (EV) charging infrastructure.",
    description: "The platform enables administrators and operators to efficiently oversee charging stations through role-based authentication, real-time charger monitoring, user and station management, and integrated billing workflows.",
    role: "Lead Frontend Architect",
    keyFeatures: [
      "Role-based authentication & permissions for station operators and super-admins",
      "Real-time charger telemetry monitoring and fault alerting",
      "Comprehensive EV charging station & multi-tenant user management",
      "Automated integrated billing workflows & transaction invoicing",
      "Centralized state management with Redux Toolkit for seamless data synchronization"
    ],
    metrics: [
      { label: "Architecture", value: "Next.js App Router" },
      { label: "State", value: "Redux Toolkit" },
      { label: "Scope", value: "End-to-End EV Platform" }
    ],
    accentColor: "#10b981" // Emerald green EV style
  },
  {
    id: "qc-analytics-portal",
    title: "QC Analytics Portal",
    badge: "Quality Assurance",
    subtitle: "Enterprise Quality Control & Departmental Performance Dashboard",
    category: "Admin Panel / Analytics",
    tech: ["ReactJS", "TypeScript", "TailwindCSS", "ZOD", "shadcn UI"],
    summary: "Comprehensive web-based quality control management platform for tracking metrics and generating analytics reports.",
    description: "AdminPanel - A comprehensive web-based quality control management platform that enables organizations to manage QC processes, track product quality metrics, generate reports, and monitor departmental performance through an intuitive dashboard with real-time analytics and filtering capabilities.",
    role: "Frontend Developer & UI Engineer",
    keyFeatures: [
      "Intuitive dashboard with real-time analytics and multi-dimensional filtering",
      "Product quality metric tracking and historical inspection analytics",
      "Automated quality report generation with PDF/CSV export options",
      "Departmental performance monitoring across multiple inspection stages",
      "Strict form schema validation using ZOD & modern shadcn UI component library"
    ],
    metrics: [
      { label: "Validation", value: "ZOD Schema" },
      { label: "UI System", value: "shadcn UI" },
      { label: "Analytics", value: "Real-time Dashboards" }
    ],
    accentColor: "#06b6d4" // Cyan Analytics style
  },
  {
    id: "koravision",
    title: "KoraVision",
    badge: "Football Platform",
    subtitle: "Full-Stack Football Scouting, Real-time Chat & Social Platform",
    category: "Full-Stack Media",
    tech: ["NextJS", "ReactJS", "TypeScript", "TailwindCSS", "NextAuth v5", "WebSockets", "Firebase", "Canvas API"],
    summary: "Full-stack football scouting platform featuring role-based auth, real-time chat, canvas video trimmer, and social feed.",
    description: "Built a full-stack football scouting platform with role-based auth (NextAuth v5), real-time WebSocket chat with auto-reconnect, and a social feed with likes/comments/media uploads. Implemented an in-browser video trimmer using Canvas API + MediaRecorder, Firebase push notifications, supported multilingual UI (EN/FR/AR with RTL), and a document verification onboarding flow across three user roles (Player, Parent, Scout).",
    role: "Full-Stack Platform Engineer",
    keyFeatures: [
      "Role-based authentication (NextAuth v5) across Player, Parent, and Scout roles",
      "Real-time WebSocket chat with automatic connection recovery",
      "Social feed with media uploads, likes, comments, and real-time activity",
      "Custom in-browser video trimmer engine built using Canvas API & MediaRecorder",
      "Firebase push notifications for instant talent scout updates",
      "Multilingual internationalization (EN/FR/AR) with full Right-to-Left (RTL) support",
      "Secure document verification onboarding workflow for athlete validation"
    ],
    metrics: [
      { label: "Roles", value: "Player / Parent / Scout" },
      { label: "Media Engine", value: "Canvas API Trimmer" },
      { label: "Realtime", value: "WebSocket + Firebase" }
    ],
    accentColor: "#8b5cf6" // Violet sports/media style
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: "mern-developer",
    role: "MERN developer",
    company: "Inheritx Solutions",
    period: "Apr 2025 - Present",
    isCurrent: true,
    location: "Ahmedabad, India",
    highlights: [
      "Currently working on industry-level enterprise web applications with a strong focus on Next.js, React.js, and TypeScript.",
      "Actively involved in developing scalable, high-performance web applications while implementing best practices in frontend architecture and state management.",
      "Engaging directly in client communication, requirement analysis, and delivering client-centric features.",
      "Ensuring clean, maintainable, and modular component design with optimized API integrations."
    ],
    tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Redux", "REST APIs"]
  },
  {
    id: "mern-intern",
    role: "MERN intern",
    company: "Inheritx Solutions",
    period: "Dec 2024 - Mar 2025",
    isCurrent: false,
    location: "Ahmedabad, India",
    highlights: [
      "Gained hands-on experience in full-stack MERN development through practical production tasks and small-scale projects.",
      "Developed strong proficiency in React.js and Tailwind CSS, focusing on building ultra-responsive, intuitive user interfaces.",
      "Acquired foundational knowledge of Node.js and MongoDB, contributing to backend development and database schema management.",
      "Collaborated with senior engineers to implement UI components, fix bugs, and refine user experiences."
    ],
    tech: ["React.js", "Tailwind CSS", "JavaScript", "Node.js", "MongoDB", "Git"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend Architecture",
    iconName: "Code2",
    description: "Core expertise in building fast, accessible, and reactive user interfaces.",
    skills: [
      { name: "ReactJS", level: "Expert", tag: "Primary" },
      { name: "NextJS", level: "Expert", tag: "Primary" },
      { name: "TypeScript", level: "Advanced", tag: "Typed" },
      { name: "JavaScript (ES6+)", level: "Expert", tag: "Core" },
      { name: "Tailwind CSS", level: "Expert", tag: "Styling" },
      { name: "Redux", level: "Advanced", tag: "State" },
      { name: "ZOD", level: "Advanced", tag: "Validation" },
      { name: "shadcn UI", level: "Advanced", tag: "UI Components" }
    ]
  },
  {
    category: "Backend & Databases",
    iconName: "Database",
    description: "Server-side architecture, API designs, and modern database management.",
    skills: [
      { name: "NodeJS", level: "Proficient", tag: "Runtime" },
      { name: "MongoDB", level: "Proficient", tag: "NoSQL" },
      { name: "SQL", level: "Proficient", tag: "Relational" },
      { name: "REST API", level: "Advanced", tag: "Architecture" },
      { name: "Sanity CMS", level: "Proficient", tag: "Headless CMS" },
      { name: "Swagger", level: "Proficient", tag: "API Docs" }
    ]
  },
  {
    category: "AI Tools & Productivity Suite",
    iconName: "Sparkles",
    description: "Modern AI-assisted development tools & LLMs for rapid, high-quality output.",
    skills: [
      { name: "Amazon Q", level: "Familiar", tag: "AI Coding" },
      { name: "Cursor", level: "Familiar", tag: "AI IDE" },
      { name: "ChatGPT", level: "Familiar", tag: "LLM" },
      { name: "Claude", level: "Familiar", tag: "LLM" },
      { name: "Grok", level: "Familiar", tag: "LLM" },
      { name: "Gemini", level: "Familiar", tag: "LLM" },
      { name: "Perplexity", level: "Familiar", tag: "AI Research" }
    ]
  },
  {
    category: "Workflow & Developer Tools",
    iconName: "Wrench",
    description: "Version control, testing, API inspection, and collaborative platforms.",
    skills: [
      { name: "Visual Studio Code", level: "Expert", tag: "IDE" },
      { name: "Postman", level: "Advanced", tag: "API Testing" },
      { name: "Git", level: "Advanced", tag: "VCS" },
      { name: "GitHub", level: "Advanced", tag: "Platform" },
      { name: "GitLab", level: "Advanced", tag: "CI/CD & Repo" }
    ]
  }
];

export const educationData: EducationItem = {
  degree: "Bachelor of Engineering in Computer Science Engineering",
  institution: "LJUniversity",
  period: "Nov 2021 - Nov 2025",
  cgpa: "8.19 CGPA",
  highlights: [
    "Solid academic foundation in Computer Science Engineering principles",
    "Specialized coursework in Web Application Architecture, Algorithms & Database Systems",
    "8.19 cumulative CGPA reflecting consistent analytical & technical academic excellence",
    "Active participation in technical projects, MERN development, and software engineering practice"
  ]
};
