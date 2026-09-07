export function downloadResume(siteSettings?: any) {
  if (typeof window === 'undefined') return;

  const rawUrl = siteSettings?.resumeFileUrl || siteSettings?.resumeUrl || '/Resume_Adit_Shah.pdf';
  const pdfUrl = rawUrl ? rawUrl.replace(/[\u200B-\u200D\uFEFF]/g, '').trim() : '/Resume_Adit_Shah.pdf';

  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = 'Resume_Adit_Shah.pdf';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
