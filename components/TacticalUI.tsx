import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- Section Wrapper ---
export const SectionWrapper: React.FC<{ children: React.ReactNode; id: string; className?: string }> = ({ children, id, className = "" }) => {
  return (
    <section id={id} className={`relative py-32 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
};

// --- Gradient Title (formerly GlitchTitle) ---
export const GlitchTitle: React.FC<{ text: string; subtext?: string }> = ({ text, subtext }) => {
  return (
    <div className="mb-20 text-center md:text-left">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-indigo-400 mb-6 tracking-widest uppercase">
          {text} Module
        </span>
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
          {text}
        </h2>
        {subtext && (
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            {subtext}
          </p>
        )}
      </motion.div>
    </div>
  );
};

// --- Glass Card (formerly TacticalCard) ---
export const TacticalCard: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative group bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-500 overflow-hidden ${className}`}
    >
      {/* Gradient Glow on Hover */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

// --- Premium Button (formerly TacticalButton) ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
}

export const TacticalButton: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, className = "", ...props }) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-display font-medium tracking-wide transition-all duration-300 group overflow-hidden";
  
  const variants = {
    primary: "bg-white text-black hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </button>
  );
};