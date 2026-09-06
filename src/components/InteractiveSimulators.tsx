'use client';

import React, { useState } from 'react';
import { Zap, Video, Play, Pause, BarChart2 } from 'lucide-react';

export const ChargePilotSimulator: React.FC = () => {
  const [stationActive, setStationActive] = useState(true);
  const [kwOutput, setKwOutput] = useState(180);

  return (
    <div className="apple-glass-card p-5 rounded-2xl border-emerald-500/30 bg-emerald-950/20 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
          <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Charge Pilot Pro — Live Telemetry Simulator</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Redux State Synced
        </span>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="apple-glass-pill p-3 rounded-xl">
          <div className="text-[10px] font-mono text-slate-400">Grid Telemetry Output</div>
          <div className="text-lg font-bold text-white mt-0.5">{kwOutput} kW/h</div>
          <input
            type="range"
            min="50"
            max="350"
            value={kwOutput}
            onChange={(e) => setKwOutput(Number(e.target.value))}
            className="w-full mt-2 accent-emerald-400 cursor-pointer"
          />
        </div>

        <div className="apple-glass-pill p-3 rounded-xl flex flex-col justify-between">
          <div className="text-[10px] font-mono text-slate-400">Station Grid Status</div>
          <button
            onClick={() => setStationActive(!stationActive)}
            className={`mt-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
              stationActive 
                ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50' 
                : 'bg-red-500/30 text-red-300 border border-red-500/50'
            }`}
          >
            {stationActive ? 'ONLINE • 6 Bays Active' : 'OFFLINE • Grid Maintenance'}
          </button>
        </div>
      </div>

      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between border-t border-white/10 pt-2">
        <span>Estimated Billing: ${((kwOutput * 0.24) * 0.8).toFixed(2)}/hr</span>
        <span className="text-emerald-400">Role: SuperAdmin</span>
      </div>
    </div>
  );
};

export const QCAnalyticsSimulator: React.FC = () => {
  const [inspectionScore] = useState(96);
  const [formInput, setFormInput] = useState('BATCH-2026-X89');

  const isValid = formInput.length >= 5;

  return (
    <div className="apple-glass-card p-5 rounded-2xl border-cyan-500/30 bg-cyan-950/20 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
          <BarChart2 className="w-4 h-4 text-cyan-400" />
          <span>QC Analytics — ZOD Runtime Schema Tester</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
          shadcn UI + ZOD
        </span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-mono text-slate-400 block mb-1">Batch Number Validation (Min 5 chars)</label>
          <div className="relative">
            <input
              type="text"
              value={formInput}
              onChange={(e) => setFormInput(e.target.value)}
              className="w-full apple-glass-pill px-3 py-1.5 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
            />
            <span className={`absolute right-2 top-1.5 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
              isValid ? 'bg-emerald-500/30 text-emerald-300' : 'bg-red-500/30 text-red-300'
            }`}>
              {isValid ? 'ZOD: VALID 200' : 'ZOD: INVALID'}
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-1">
            <span>Product Quality Pass Rate</span>
            <span className="font-bold text-cyan-300">{inspectionScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${inspectionScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const KoraVisionSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userRole, setUserRole] = useState<'Scout' | 'Player' | 'Parent'>('Scout');
  const trimStart = 3;
  const trimEnd = 14;

  return (
    <div className="apple-glass-card p-5 rounded-2xl border-purple-500/30 bg-purple-950/20 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
          <Video className="w-4 h-4 text-purple-400" />
          <span>KoraVision — Canvas Video Trimmer Engine</span>
        </div>
        <div className="flex gap-1">
          {(['Scout', 'Player', 'Parent'] as const).map(r => (
            <button
              key={r}
              onClick={() => setUserRole(r)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-lg transition-colors ${
                userRole === r ? 'bg-purple-500 text-white font-bold' : 'apple-glass-pill text-slate-400'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="apple-glass-pill p-3 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/30 text-purple-300 hover:bg-purple-500/50 font-semibold"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Trimmer' : 'Play Highlight Clip'}</span>
          </button>
          <span className="font-mono text-[11px]">Trim Range: 00:0{trimStart} - 00:{trimEnd}s</span>
        </div>

        <div className="relative h-4 bg-slate-900 rounded-lg overflow-hidden border border-white/10 flex items-center px-1">
          <div 
            className="absolute h-full bg-purple-500/40 border-x-2 border-purple-400"
            style={{ left: `${(trimStart / 30) * 100}%`, right: `${100 - (trimEnd / 30) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
