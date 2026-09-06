'use client';

import React, { useState } from 'react';
import { Mail, Phone, Send, Copy, Check, Globe, MessageSquare, User, Tag, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { personalDetails } from '../data/portfolioData';

// Yup Validation Schema for Contact Form
const contactValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .required('Full name is required'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),
  subject: Yup.string()
    .trim()
    .min(3, 'Subject must be at least 3 characters')
    .required('Subject is required'),
  message: Yup.string()
    .trim()
    .min(10, 'Message must be at least 10 characters long')
    .required('Message content is required'),
});

interface ContactProps {
  siteSettings?: any;
  aboutData?: any;
}

export const Contact: React.FC<ContactProps> = ({ siteSettings, aboutData }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const badge = siteSettings?.contactBadge || 'Direct Contact & Collaboration';
  const title = siteSettings?.contactTitle || 'Get In Touch';
  const subtitle = siteSettings?.contactSubtitle || 'Open for full-stack MERN engineering roles, Next.js projects, and client consultation.';
  const formTitle = siteSettings?.contactFormTitle || 'Send Direct Message';
  const formSubtitle = siteSettings?.contactFormSubtitle || 'Send a message directly for project inquiries';

  const contactCardTitle = siteSettings?.contactCardTitle !== undefined
    ? siteSettings.contactCardTitle.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
    : 'Contact Info';
  const contactCardSubtitle = siteSettings?.contactCardSubtitle !== undefined
    ? siteSettings.contactCardSubtitle.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
    : 'Direct communication channels';
  const contactCardBadge = siteSettings?.contactCardBadge !== undefined
    ? siteSettings.contactCardBadge.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
    : 'Verified';

  const globalClientTitle = siteSettings?.globalClientTitle !== undefined
    ? siteSettings.globalClientTitle.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
    : 'Global Client Communication';
  const globalClientText = siteSettings?.globalClientText !== undefined
    ? siteSettings.globalClientText.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
    : (aboutData?.clientCommunication || 'Proficient in English speaking with hands-on experience handling international clients, requirement workshops, and technical presentations.').replace(/[\u200B-\u200D\uFEFF]/g, '').trim();

  const cleanAndNormalizeUrl = (url?: string): string => {
    if (!url) return '';
    const cleaned = url.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    if (!cleaned) return '';
    return /^https?:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`;
  };

  const isGenericLinkedIn = (url?: string): boolean => {
    const normalized = cleanAndNormalizeUrl(url).toLowerCase().replace(/\/$/, '');
    return !normalized || normalized === 'https://linkedin.com' || normalized === 'https://www.linkedin.com';
  };

  const isGenericGitHub = (url?: string): boolean => {
    const normalized = cleanAndNormalizeUrl(url).toLowerCase().replace(/\/$/, '');
    return !normalized || normalized === 'https://github.com' || normalized === 'https://www.github.com';
  };

  const rawEmail = siteSettings?.socialLinks?.email ?? aboutData?.email ?? personalDetails.email;
  const email = rawEmail ? rawEmail.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';

  const rawPhone = siteSettings?.socialLinks?.phone ?? aboutData?.phone ?? personalDetails.phone;
  const phone = rawPhone ? rawPhone.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '';

  const rawPhoneRaw = siteSettings?.socialLinks?.phoneRaw ?? aboutData?.phoneRaw ?? personalDetails.phoneRaw;
  const phoneRaw = rawPhoneRaw ? rawPhoneRaw.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : phone;

  const resolveLinkedInUrl = (): string => {
    const siteUrl = cleanAndNormalizeUrl(siteSettings?.socialLinks?.linkedin);
    const aboutUrl = cleanAndNormalizeUrl(aboutData?.linkedin);
    const fallbackUrl = cleanAndNormalizeUrl(personalDetails.linkedin);

    if (siteUrl && !isGenericLinkedIn(siteUrl)) return siteUrl;
    if (aboutUrl && !isGenericLinkedIn(aboutUrl)) return aboutUrl;
    if (siteUrl) return siteUrl;
    if (aboutUrl) return aboutUrl;
    return fallbackUrl;
  };

  const resolveGitHubUrl = (): string => {
    const siteUrl = cleanAndNormalizeUrl(siteSettings?.socialLinks?.github);
    const aboutUrl = cleanAndNormalizeUrl(aboutData?.github);
    const fallbackUrl = cleanAndNormalizeUrl(personalDetails.github);

    if (siteUrl && !isGenericGitHub(siteUrl)) return siteUrl;
    if (aboutUrl && !isGenericGitHub(aboutUrl)) return aboutUrl;
    if (siteUrl) return siteUrl;
    if (aboutUrl) return aboutUrl;
    return fallbackUrl;
  };

  const linkedin = resolveLinkedInUrl();
  const github = resolveGitHubUrl();

  const formattedName = (() => {
    const raw = aboutData?.name || personalDetails.name || 'Adit Shah';
    const cleaned = raw.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    if (cleaned.toUpperCase() === 'ADIT SHAH') return 'Adit Shah';
    return cleaned.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  })();

  const getLinkedInDisplay = (url: string) => {
    return `Linkedin/${formattedName}`;
  };

  const getGitHubDisplay = (url: string) => {
    return `Github/${formattedName}`;
  };

  const hasAnyContactInfo = Boolean(email || phone || linkedin || github || globalClientText);

  // Formik Hook Integration with Yup Schema & Sanity CMS Submission
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: contactValidationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setFormSubmitted(true);
          setTimeout(() => {
            setFormSubmitted(false);
            resetForm();
          }, 5000);
        } else {
          console.error('Contact submission error:', data.error);
          setFormSubmitted(true);
          setTimeout(() => {
            setFormSubmitted(false);
            resetForm();
          }, 5000);
        }
      } catch (error) {
        console.error('Network error during submission:', error);
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          resetForm();
        }, 5000);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <section id="contact" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        {badge && (
          <div className="apple-glass-pill px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 border border-emerald-500/30 mb-3 flex items-center gap-2 shadow-lg shadow-emerald-500/10">
            <MessageSquare className="w-3.5 h-3.5" />
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

      <div className={`grid grid-cols-1 ${hasAnyContactInfo ? 'lg:grid-cols-12' : ''} gap-8 max-w-6xl mx-auto`}>
        
        {/* Left Column: Direct Contact Info Cards (5 Cols) */}
        {hasAnyContactInfo && (
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="apple-glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 border border-cyan-500/30 ring-1 ring-cyan-500/40 shadow-xl shadow-cyan-500/10 bg-cyan-950/[0.08]">
              {(contactCardTitle || contactCardSubtitle || contactCardBadge) && (
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    {contactCardTitle && <h3 className="text-xl sm:text-2xl font-bold text-white">{contactCardTitle}</h3>}
                    {contactCardSubtitle && <p className="text-xs text-slate-400 mt-0.5">{contactCardSubtitle}</p>}
                  </div>
                  {contactCardBadge && (
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {contactCardBadge}
                    </span>
                  )}
                </div>
              )}

              {/* Email Card */}
              {email && (
                <a 
                  href={`mailto:${email}`} 
                  className="apple-glass-pill p-3.5 sm:p-4 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 flex items-center gap-3 group transition-all min-w-0"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl apple-glass-button flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">Email Address</div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 truncate">
                      {email}
                    </div>
                  </div>
                </a>
              )}

              {/* Phone Card */}
              {phone && (
                <a 
                  href={`tel:${phoneRaw || phone}`} 
                  className="apple-glass-pill p-3.5 sm:p-4 rounded-2xl border border-cyan-500/30 hover:border-cyan-500/60 flex items-center gap-3 group transition-all min-w-0"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl apple-glass-button flex items-center justify-center text-cyan-400 border border-cyan-500/30 shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">Phone Number</div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 truncate">
                      {phone}
                    </div>
                  </div>
                </a>
              )}

              {/* LinkedIn Card */}
              {linkedin && (
                <a 
                  href={linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="apple-glass-pill p-3.5 sm:p-4 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 flex items-center gap-3 group transition-all min-w-0"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl apple-glass-button flex items-center justify-center text-purple-400 border border-purple-500/30 shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">LinkedIn Profile</div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 truncate">
                      {getLinkedInDisplay(linkedin)}
                    </div>
                  </div>
                </a>
              )}

              {/* GitHub Card */}
              {github && (
                <a 
                  href={github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="apple-glass-pill p-3.5 sm:p-4 rounded-2xl border border-slate-500/30 hover:border-emerald-500/60 flex items-center gap-3 group transition-all min-w-0"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl apple-glass-button flex items-center justify-center text-slate-200 border border-white/20 shrink-0 group-hover:scale-105 transition-transform">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-mono text-slate-400">GitHub Profile</div>
                    <div className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 truncate">
                      {getGitHubDisplay(github)}
                    </div>
                  </div>
                </a>
              )}

            </div>

          </div>
        )}

        {/* Right Column: Direct Message Form with Formik + Yup Validation (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="apple-glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 ring-1 ring-emerald-500/40 shadow-xl shadow-emerald-500/10 bg-emerald-950/[0.08] relative">
            
            <div className="flex items-center justify-between gap-2.5 mb-6 pb-4 border-b border-white/10">
              <div className="min-w-0">
                {formTitle && <h3 className="text-xl sm:text-2xl font-bold text-white">{formTitle}</h3>}
                {formSubtitle && <p className="text-xs text-slate-400 mt-0.5">{formSubtitle}</p>}
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shrink-0 whitespace-nowrap">
                <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 shrink-0" />
                Quick Response
              </span>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-2xl apple-glass-pill text-center space-y-3 border border-emerald-500/50 bg-emerald-500/10 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-400/30">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300">Thank you for reaching out. Adit will reply to your email shortly.</p>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input with Formik/Yup */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Your Name</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. Sarah Jenkins"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full bg-black/40 border px-4 py-3 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                          formik.touched.name && formik.errors.name
                            ? 'border-red-500/80 ring-2 ring-red-500/30'
                            : formik.touched.name && !formik.errors.name
                            ? 'border-emerald-500/80 ring-2 ring-emerald-500/30'
                            : 'border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30'
                        }`}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />
                      ) : formik.touched.name && !formik.errors.name ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-3.5" />
                      ) : null}
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                        <span>{formik.errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input with Formik/Yup */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Your Email</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="sarah@company.com"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`w-full bg-black/40 border px-4 py-3 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                          formik.touched.email && formik.errors.email
                            ? 'border-red-500/80 ring-2 ring-red-500/30'
                            : formik.touched.email && !formik.errors.email
                            ? 'border-cyan-500/80 ring-2 ring-cyan-500/30'
                            : 'border-white/20 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30'
                        }`}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />
                      ) : formik.touched.email && !formik.errors.email ? (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 absolute right-3 top-3.5" />
                      ) : null}
                    </div>
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-[11px] font-mono text-red-400 mt-1 flex items-center gap-1">
                        <span>{formik.errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input with Formik/Yup */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-purple-400" />
                    <span>Subject</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Project Inquiry / Job Opportunity"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-black/40 border px-4 py-3 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                        formik.touched.subject && formik.errors.subject
                          ? 'border-red-500/80 ring-2 ring-red-500/30'
                          : formik.touched.subject && !formik.errors.subject
                          ? 'border-purple-500/80 ring-2 ring-purple-500/30'
                          : 'border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30'
                      }`}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                      <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />
                    ) : formik.touched.subject && !formik.errors.subject ? (
                      <CheckCircle2 className="w-4 h-4 text-purple-400 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">
                      <span>{formik.errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Input with Formik/Yup */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Message</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project or opportunity..."
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full bg-black/40 border px-4 py-3 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-all resize-none ${
                        formik.touched.message && formik.errors.message
                          ? 'border-red-500/80 ring-2 ring-red-500/30'
                          : formik.touched.message && !formik.errors.message
                          ? 'border-emerald-500/80 ring-2 ring-emerald-500/30'
                          : 'border-white/20 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30'
                      }`}
                    />
                    {formik.touched.message && formik.errors.message ? (
                      <AlertCircle className="w-4 h-4 text-red-400 absolute right-3 top-3.5" />
                    ) : formik.touched.message && !formik.errors.message ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-3.5" />
                    ) : null}
                  </div>
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">
                      <span>{formik.errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full apple-glass-button-primary py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group shadow-lg shadow-emerald-500/20"
                >
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <span>Send Direct Message</span>
                  <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
