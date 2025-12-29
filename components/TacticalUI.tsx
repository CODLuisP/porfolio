import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Cursor removed as per user request

// --- Section Wrapper with Reveal ---
export const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; className?: string }> = ({ children, id, className = "" }) => {
  return (
    <section id={id} className={`relative py-24 px-6 overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-10 border-x border-emerald-900/30" />
    </section>
  );
};

// --- Glitch Title ---
export const GlitchTitle: React.FC<{ text: string; subtext?: string }> = ({ text, subtext }) => {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-2">
        <div className="h-[1px] w-12 bg-emerald-500/50" />
        <span className="font-mono-tech text-emerald-500 text-sm tracking-widest uppercase">System: {text}</span>
      </div>
      <h2 className="text-4xl md:text-6xl font-orbitron font-bold uppercase text-white glitch-effect" data-text={text}>
        {text}
      </h2>
      {subtext && <p className="mt-4 text-gray-400 max-w-2xl text-lg border-l-2 border-emerald-500/30 pl-4">{subtext}</p>}
    </div>
  );
};

// --- Tactical Card ---
export const TacticalCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      onAnimationComplete={() => setHasAnimated(true)}
      className={`relative group bg-[#0f0f0f] border border-white/5 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden ${className}`}
      style={{ willChange: hasAnimated ? 'auto' : 'transform, opacity' }}
    >
      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-emerald-500" />
      </div>
      <div className="absolute bottom-0 left-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-emerald-500" />
      </div>
      <div className="relative z-10 p-6 h-full">
        {children}
      </div>
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

// --- Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
}

export const TacticalButton: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className, ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-3 font-mono-tech uppercase tracking-wider transition-all duration-300 group overflow-hidden";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-black font-bold clip-path-slant",
    outline: "bg-transparent border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/20 skew-x-12 transition-transform duration-500 ease-out" />
      )}
    </button>
  );
};