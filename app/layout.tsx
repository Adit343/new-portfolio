import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adit Shah — MERN Stack Developer | Next.js Portfolio',
  description: 'Portfolio of Adit Shah, MERN Stack Developer with 2 years of hands-on experience building production Next.js, React.js, and TypeScript web applications.',
  keywords: ['Adit Shah', 'MERN Stack Developer', 'Next.js Developer', 'React.js', 'TypeScript', 'Portfolio'],
  authors: [{ name: 'Adit Shah' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#030509] text-slate-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
