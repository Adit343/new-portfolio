import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Mail, Phone, ExternalLink, Sparkles, Command } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  setAccent: (accent: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenResume, setAccent }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open trigger handled outside or via event
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'resume',
      title: 'View / Download Resume PDF',
      subtitle: 'Official Adit Shah CV document',
      icon: FileText,
      action: () => { onOpenResume(); onClose(); }
    },
    {
      id: 'email',
      title: `Email Adit Shah (${personalDetails.email})`,
      subtitle: 'Copy email or send message',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText(personalDetails.email);
        alert('Copied email: shahadit68@gmail.com');
        onClose();
      }
    },
    {
      id: 'phone',
      title: `Call / WhatsApp (${personalDetails.phone})`,
      subtitle: 'Direct phone contact',
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText(personalDetails.phoneRaw);
        alert('Copied phone: 9265955849');
        onClose();
      }
    },
    {
      id: 'accent-emerald',
      title: 'Switch Glow Theme: Apple Emerald',
      subtitle: 'Set ambient accent to Emerald Green',
      icon: Sparkles,
      action: () => { setAccent('emerald'); onClose(); }
    },
    {
      id: 'accent-cyan',
      title: 'Switch Glow Theme: Apple Cyan',
      subtitle: 'Set ambient accent to Cyan Blue',
      icon: Sparkles,
      action: () => { setAccent('cyan'); onClose(); }
    },
    {
      id: 'accent-violet',
      title: 'Switch Glow Theme: Apple Violet',
      subtitle: 'Set ambient accent to Deep Purple',
      icon: Sparkles,
      action: () => { setAccent('violet'); onClose(); }
    }
  ];

  const filteredActions = actions.filter(
    a => a.title.toLowerCase().includes(query.toLowerCase()) || a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn" onClick={onClose}>
      <div 
        className="apple-glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl animate-scaleUp"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a command, project, or skill... (Press ESC to close)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none font-medium"
          />
          <button onClick={onClose} className="p-1.5 rounded-xl apple-glass-button text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Items List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1">
          <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5">
            Quick Actions & Navigation
          </div>

          {filteredActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="w-full apple-glass-pill p-3 rounded-2xl flex items-center justify-between text-left hover:bg-white/10 transition-all group border-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300">{action.title}</div>
                    <div className="text-[11px] text-slate-400">{action.subtitle}</div>
                  </div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white" />
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Apple-style Command Palette</span>
          <span className="flex items-center gap-1"><Command className="w-3 h-3" /> + K</span>
        </div>

      </div>
    </div>
  );
};
