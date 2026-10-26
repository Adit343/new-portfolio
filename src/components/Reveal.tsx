'use client';

import React, { useEffect, useRef } from 'react';
import { motion, MotionConfig, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  delay?: number;
  x?: number;
  y?: number;
}

/** Fades + lifts its children into place the first time they scroll into view. */
export const Reveal: React.FC<RevealProps> = ({ delay = 0, x = 0, y = 24, children, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, x, y, scale: 0.96 }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    {...rest}
  >
    {children}
  </motion.div>
);

/** Thin accent progress bar tied to page scroll, plus reduced-motion support for all animations. */
export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100] pointer-events-none"
        style={{ scaleX, background: 'var(--accent-hex)' }}
      />
      <CursorGlow />
      {children}
    </MotionConfig>
  );
};

/** Headline whose words rise out of a mask one after another. */
export const SplitText: React.FC<{
  text: string;
  delay?: number;
  wordClassName?: string;
}> = ({ text, delay = 0, wordClassName = '' }) => (
  <span aria-label={text}>
    {text.split(' ').map((word, i) => (
      <React.Fragment key={i}>
        <span aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className={`inline-block ${wordClassName}`}
            initial={{ y: '115%', rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * 0.07, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>{' '}
      </React.Fragment>
    ))}
  </span>
);

/** 3D tilt toward the cursor with an accent spotlight that follows it. Mouse only. */
export const TiltCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  radius?: string;
  max?: number;
}> = ({ children, className = '', radius = 'rounded-3xl', max = 7 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group/tilt relative ${className}`}
    >
      {children}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${radius} opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-300`}
        style={{
          background:
            'radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.06), transparent 60%)',
        }}
      />
    </motion.div>
  );
};

/** Gentle endless bobbing. */
export const Float: React.FC<{ children: React.ReactNode; amount?: number }> = ({ children, amount = 10 }) => (
  <motion.div
    animate={{ y: [0, -amount, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

/** Soft accent spotlight trailing the mouse. */
const CursorGlow: React.FC = () => {
  const x = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(-400), { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="hidden md:block fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[1]"
      style={{
        x,
        y,
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.035) 0%, transparent 65%)',
      }}
    />
  );
};

/** Timeline spine that fills as you scroll through it. */
export const ScrollLine: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 24, mass: 0.3 });

  return (
    <div ref={ref} className={`bg-white/10 rounded-full ${className}`}>
      <motion.div
        className="w-full h-full origin-top rounded-full bg-[var(--accent-hex)]"
        style={{ scaleY }}
      />
    </div>
  );
};

/** Types the text out one letter at a time, holds the full text, then starts over. */
export const Typewriter: React.FC<{
  text: string;
  speed?: number;
  hold?: number;
  pause?: number;
}> = ({ text, speed = 280, hold = 2200, pause = 500 }) => {
  const reduced = useReducedMotion();
  const [tick, setTick] = React.useState(0);

  // One steady clock; position in the loop is derived from it, so it can never stall at the end.
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), speed);
    return () => clearInterval(id);
  }, [speed, reduced]);

  const holdTicks = Math.ceil(hold / speed);
  const pauseTicks = Math.ceil(pause / speed);
  const step = tick % (text.length + holdTicks + pauseTicks);
  const shown = reduced ? text : text.slice(0, Math.min(step, text.length));

  return (
    <span aria-label={text} className="inline-grid">
      {/* Invisible full text reserves the final size so nothing jumps while typing */}
      <span aria-hidden className="invisible col-start-1 row-start-1">{text}</span>
      <span aria-hidden className="col-start-1 row-start-1">
        {shown}
        <span className="inline-block w-[0.06em] h-[0.85em] ml-[0.06em] align-baseline bg-[var(--accent-hex)] animate-caret" />
      </span>
    </span>
  );
};
