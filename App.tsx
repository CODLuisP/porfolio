import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Shield,
  Zap,
  Code,
  Terminal,
  Database,
  Cpu,
  Activity,
  FileCode,
  Send,
  ChevronRight,
  ExternalLink,
  Github,
  CheckCircle,
  MapPin,
  Crosshair,
  Menu,
  X,
  Monitor,
  Smartphone,
  Server,
  Globe,
} from "lucide-react";

import { TRANSLATIONS } from "./constants";
import {
  SectionWrapper,
  GlitchTitle,
  TacticalCard,
  TacticalButton,
} from "./components/TacticalUI";

type LangType = "en" | "es";

// --- Initial Loading Screen ---
const LoadingScreen = ({
  onComplete,
  lang,
}: {
  onComplete: () => void;
  lang: LangType;
}) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  const t = TRANSLATIONS[lang].loading;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const currentT = TRANSLATIONS[lang].loading;
    if (progress < 30) setText(currentT.modules);
    else if (progress < 60) setText(currentT.secure);
    else if (progress < 90) setText(currentT.decrypt);
    else setText(currentT.ready);
  }, [progress, lang]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md space-y-6 text-center relative z-10">
        <div className="flex justify-between font-mono-tech text-emerald-500 text-xs mb-8 border-b border-emerald-900/50 pb-2">
          <span>{t.boot}</span>
          <span>v.2.0.4</span>
        </div>

        <div className="space-y-4">
          <div className="h-1 bg-gray-900 w-full relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-emerald-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="font-mono-tech text-emerald-500 text-sm animate-pulse text-left truncate pr-4">
              {text}
            </span>
            <span className="font-mono-tech text-emerald-500 text-xl font-bold">
              {Math.min(progress, 100)}%
            </span>
          </div>
        </div>
      </div>
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20 tactical-grid" />
    </motion.div>
  );
};

// --- Navbar ---
const Navbar = ({
  lang,
  setLang,
}: {
  lang: LangType;
  setLang: (l: LangType) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  const toggleLang = () => {
    setLang(lang === "en" ? "es" : "en");
  };

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="hidden md:block">
            <div className="text-xs font-mono-tech text-emerald-500 tracking-widest">
              DEV
            </div>
            <div className="font-bold text-white leading-none">OWEN</div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 font-mono-tech text-sm items-center">
          {[
            { id: "strategies", label: t.strategies },
            { id: "arsenal", label: t.arsenal },
            { id: "missions", label: t.missions },
            { id: "intel", label: t.intel },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-gray-400 hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center gap-2 group"
            >
              <span className="w-1 h-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              {item.label}
            </a>
          ))}

          <div className="h-4 w-[1px] bg-white/20 mx-2" />

          <button
            onClick={toggleLang}
            className="text-emerald-500 hover:text-white transition-colors font-bold flex items-center gap-1"
          >
            <Globe size={14} />
            {lang.toUpperCase()}
          </button>

          <a href="#contact">
            <TacticalButton variant="outline" className="!py-1 !px-4 text-xs">
              {t.deploy}
            </TacticalButton>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLang}
            className="text-emerald-500 font-bold text-sm border border-emerald-500/30 px-2 py-1 rounded"
          >
            {lang.toUpperCase()}
          </button>
          <button
            className="text-emerald-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-black border-b border-emerald-900/50 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4 font-mono-tech">
              {[
                { id: "strategies", label: t.strategies },
                { id: "arsenal", label: t.arsenal },
                { id: "missions", label: t.missions },
                { id: "intel", label: t.intel },
                { id: "contact", label: t.contact },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-gray-300 hover:text-emerald-400 py-2 border-l-2 border-transparent hover:border-emerald-500 pl-4 transition-all"
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero Section ---
const Hero = ({ lang }: { lang: LangType }) => {
  const t = TRANSLATIONS[lang].hero;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background Elements - Enhanced */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-950/30 via-transparent to-transparent" />

      {/* Grid Patterns - Beautiful Gray Grids */}
      <div className="absolute inset-0 opacity-20">
        {/* Main Grid - Large */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(156, 163, 175, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(156, 163, 175, 0.15) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Medium Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(107, 114, 128, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(107, 114, 128, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Small Grid - Detail */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(75, 85, 99, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(75, 85, 99, 0.08) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Diagonal Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            rgba(156, 163, 175, 0.15) 40px,
            rgba(156, 163, 175, 0.15) 41px
          ),
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(156, 163, 175, 0.15) 40px,
            rgba(156, 163, 175, 0.15) 41px
          )
        `,
        }}
      />

      {/* Dots Pattern */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(156, 163, 175, 0.2) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Accent Grid Lines - Emerald */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />

        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-scanline opacity-5 pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-500/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Spotlight Effect - Enhanced */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(circle 450px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.08) 60%, transparent 80%)`,
        }}
      />

      <div className="mt-[-80px] relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left space-y-6"
        >
          {/* <div className="inline-flex items-center gap-3 px-4 py-2 border border-emerald-500/40 bg-gradient-to-r from-emerald-950/60 to-emerald-900/30 backdrop-blur-sm rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.15)] mb-6">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            </div>
            <span className="font-mono-tech text-emerald-400 text-xs tracking-[0.2em] uppercase font-semibold">
              {t.status}
            </span>
          </div> */}

          <div className="space-y-4 ">
            <h1
              className="text-4xl md:text-4xl xl:text-7xl font-orbitron font-black text-white tracking-tighter leading-[0.9] glitch-effect"
              data-text={t.title}
            >
              {t.title}
            </h1>

            {/* Accent Line */}
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-transparent mx-auto lg:mx-0" />
          </div>

          <h2 className="text-lg md:text-2xl font-rajdhani font-medium text-gray-400 flex flex-col md:flex-row lg:justify-start items-center lg:items-center justify-center gap-2 md:gap-4">
            <span className="text-emerald-400 font-bold text-xl md:text-3xl">
              {t.subtitle}
            </span>
            <span className="hidden md:inline text-emerald-500/50">
              {t.separator}
            </span>
            <span className="text-gray-500">{t.exp}</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
            <a href="#missions" className="w-full sm:w-auto">
              <TacticalButton className="group w-full">
                {t.btn_mission}
                <ChevronRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </TacticalButton>
            </a>
            <a href="#arsenal" className="w-full sm:w-auto">
              <TacticalButton variant="outline" className="group w-full">
                {t.btn_arsenal}
                <Database
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
              </TacticalButton>
            </a>
          </div>


          <div>
  <h2 className="mb-3 text-xl font-bold text-white">
    Sobre mí
  </h2>

  <p className="text-sm leading-relaxed text-white/80">
    Soy un <span className="font-semibold text-emerald-400">desarrollador Full Stack</span> con
    más de <span className="font-semibold text-emerald-400">2 años de experiencia</span> en el
    desarrollo de aplicaciones web modernas. Trabajo tanto en el frontend como en el backend,
    creando soluciones eficientes, escalables y enfocadas en una buena experiencia de usuario.
  </p>

  <p className="mt-3 text-sm leading-relaxed text-white/80">
    Me considero una persona inquieta y en constante aprendizaje, siempre explorando nuevas
    tecnologías y buenas prácticas para mejorar la calidad del software que desarrollo.
    Disfruto transformar ideas en productos funcionales y bien diseñados.
  </p>
</div>
        </motion.div>

        {/* Right: Developer Tactical Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Animated Background Rings */}
            <div className="absolute inset-0 -z-10">
              <div
                className="absolute inset-0 border-2 border-emerald-500/10 rounded-full animate-ping"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-4 border border-emerald-500/20 rounded-full animate-pulse"
                style={{ animationDuration: "2s" }}
              />
            </div>

            {/* Decorative Hex/Border - Enhanced */}
            <div className="absolute inset-0 border-2 border-emerald-500/40 rounded-lg rotate-6 scale-105 transition-all duration-500 hover:rotate-3 hover:border-emerald-500/60" />
            <div className="absolute inset-0 border border-emerald-500/20 rounded-lg -rotate-6 scale-110 transition-all duration-500 hover:-rotate-3 hover:border-emerald-500/40" />

            {/* Image Container - Enhanced */}
            <div className="w-full h-full overflow-hidden relative rounded-lg border-2 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.25)] group">
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-transparent to-black/50 z-10 mix-blend-overlay" />

              <img
                src="./public/owenlogo.png"
                alt="Tactical Developer"
                className="w-full h-full object-cover grayscale-[0.7] contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />

              {/* Overlay HUD lines - Enhanced */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Corner Brackets - Larger */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-emerald-500/60" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-emerald-500/60" />
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-emerald-500/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-emerald-500/40" />

                {/* Crosshair with Gradient */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />

                {/* Scanning Line Animation */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-scan" />
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Floating Badge - Enhanced */}
            <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-black via-emerald-950/90 to-black border-2 border-emerald-500 p-3 px-5 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-sm z-30 rounded-lg">
              <div className="text-[10px] font-mono-tech text-emerald-400/70 uppercase tracking-widest">
                Edad
              </div>
              <div className="text-emerald-400 font-bold font-orbitron text-lg">
                25 años
              </div>
            </div>

            {/* Online Status Badge */}
            <div className="absolute -top-6 -left-6 bg-gradient-to-br from-emerald-950/90 to-black border border-emerald-500/50 p-2 px-4 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-sm z-30 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono-tech text-emerald-400 uppercase tracking-wider">
                  Online
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      



      </div>

   

      {/* HUD Elements - Enhanced */}

    {/* HUD Elements - Enhanced - FUERA del div azul */}
<div className="absolute bottom-24 left-10 hidden md:block font-mono-tech text-xs text-gray-600 z-30">
  <div className="space-y-1 border-l-2 border-emerald-500/30 pl-4">
    <div className="flex items-center gap-2">
      <span className="text-emerald-500">▸</span>
      <span>{t.coords}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-emerald-500">▸</span>
      <span>{t.system_status}</span>
    </div>
  </div>
</div>

<div className="absolute bottom-24 right-10 hidden md:block z-30">
  <div className="flex items-end gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="w-1.5 bg-gradient-to-t from-emerald-500 to-emerald-300 animate-pulse"
        style={{
          height: `${i * 8}px`,
          animationDelay: `${i * 0.15}s`,
          animationDuration: "2s",
        }}
      />
    ))}
  </div>
</div>

{/* Scroll Indicator */}
<div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce z-30">
  <div className="text-xs font-mono-tech text-emerald-500/50 uppercase tracking-wider">
    Scroll
  </div>
  <ChevronRight size={16} className="text-emerald-500/50 rotate-90" />
</div>
    </section>
  );
};

// --- Strategies Section ---
const Strategies = ({ lang }: { lang: LangType }) => {
  const t = TRANSLATIONS[lang].strategies;

  const icons = {
    Cpu: <Cpu />,
    Shield: <Shield />,
    Target: <Target />,
    Activity: <Activity />,
  };

  return (
    <SectionWrapper id="strategies">
      <GlitchTitle text={t.title} subtext={t.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.items.map((item, idx) => (
          <TacticalCard key={idx} delay={idx * 0.1}>
            <div className="text-emerald-500 mb-4">
              {icons[item.icon as keyof typeof icons]}
            </div>
            <h3 className="text-xl font-orbitron font-bold text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-400 font-mono-tech text-sm">{item.desc}</p>
          </TacticalCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

// --- Arsenal Section (Infinite Marquee) ---
const Arsenal = ({ lang }: { lang: LangType }) => {
  const t = TRANSLATIONS[lang].arsenal;

  return (
    <section
      id="arsenal"
      className="py-20 bg-black relative overflow-hidden border-y border-emerald-900/30"
    >
      <div className="absolute inset-0 bg-emerald-900/5" />

      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <div className="flex items-center gap-4">
          <Database className="text-emerald-500" />
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white uppercase">
            {t.title}
          </h2>
        </div>
      </div>

      {/* Row 1 - Left */}
      <div className="flex gap-6 mb-8 overflow-hidden w-full">
        <div className="flex gap-6 animate-marquee min-w-full">
          {[...t.items, ...t.items].map((tech, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 bg-[#111] border border-white/5 p-4 flex items-center gap-4 hover:border-emerald-500 transition-colors group"
            >
              <div className="w-10 h-10 bg-emerald-900/20 flex items-center justify-center rounded text-emerald-500 group-hover:text-emerald-400">
                <Code size={20} />
              </div>
              <div>
                <div className="font-bold text-white font-orbitron">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-500 font-mono-tech uppercase">
                  {tech.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - Right */}
      <div className="flex gap-6 overflow-hidden w-full">
        <div className="flex gap-6 animate-marquee-reverse min-w-full">
          {[...t.items, ...t.items].reverse().map((tech, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-64 bg-[#111] border border-white/5 p-4 flex items-center gap-4 hover:border-orange-500 transition-colors group"
            >
              <div className="w-10 h-10 bg-orange-900/20 flex items-center justify-center rounded text-orange-500 group-hover:text-orange-400">
                <Terminal size={20} />
              </div>
              <div>
                <div className="font-bold text-white font-orbitron">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-500 font-mono-tech uppercase">
                  {tech.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  );
};

// --- Skills Section ---
const Skills = ({ lang }: { lang: LangType }) => {
  const t = TRANSLATIONS[lang].skills;

  return (
    <SectionWrapper id="skills">
      <GlitchTitle text={t.title} subtext={t.subtitle} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {t.items.map((skill, idx) => (
          <TacticalCard key={idx} delay={idx * 0.05} className="group">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400">
                {skill.icon === "Brain" && <Cpu />}
                {skill.icon === "Target" && <Target />}
                {skill.icon === "Shield" && <Shield />}
                {skill.icon === "LayoutTemplate" && <Database />}
                {skill.icon === "Bug" && <Code />}
                {skill.icon === "Zap" && <Zap />}
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">
                  {skill.title}
                </h4>
                <p className="text-sm text-gray-400 mt-1 font-mono-tech leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </div>
          </TacticalCard>
        ))}
      </div>
    </SectionWrapper>
  );
};

// --- Projects Section ---
const Missions = ({ lang }: { lang: LangType }) => {
  const [filter, setFilter] = useState<
    "all" | "frontend" | "backend" | "mobile"
  >("all");
  const t = TRANSLATIONS[lang].missions;

  const filteredProjects =
    filter === "all"
      ? t.items
      : t.items.filter((p) => p.type === filter || p.type === "fullstack");

  return (
    <SectionWrapper id="missions">
      <GlitchTitle text={t.title} subtext={t.subtitle} />

      {/* Filter */}
      <div className="flex flex-wrap gap-4 mb-12">
        {Object.keys(t.filters).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key as any)}
            className={`px-4 py-2 font-mono-tech text-sm uppercase tracking-wider border transition-all ${
              filter === key
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                : "border-white/10 text-gray-500 hover:border-emerald-500/50 hover:text-gray-300"
            }`}
          >
            {t.filters[key as keyof typeof t.filters]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-[#111] border border-white/10 hover:border-emerald-500/50 group relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 bg-emerald-600 px-3 py-1 text-xs font-bold font-mono-tech text-black z-20">
                  {project.status === "completed"
                    ? t.status.completed
                    : t.status.progress}
                </div>

                {/* Preview Image with Tactical Overlay */}
                <div className="h-48 relative overflow-hidden border-b border-white/5">
                  {/* Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />

                  {/* Overlay HUD */}
                  <div className="absolute inset-0 bg-emerald-900/30 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-80" />

                  {/* Scanline */}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

                  <div className="absolute bottom-4 left-4 font-mono-tech text-xs text-emerald-500 bg-black/80 px-2 py-1 border border-emerald-500/30">
                    ID: {project.codename}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative">
                  {/* Tactical Corner Markers */}
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-emerald-500/30" />

                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 flex-grow text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono-tech px-2 py-1 bg-white/5 text-gray-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-auto">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-emerald-500/20 text-sm font-mono-tech uppercase transition-colors border border-white/5 hover:border-emerald-500/50 text-white">
                      <ExternalLink size={14} /> {t.btn_intel}
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-sm font-mono-tech uppercase transition-colors border border-white/5 text-white">
                      <Github size={14} /> {t.btn_source}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
};

// --- History Section ---
const History = ({ lang }: { lang: LangType }) => {
  const t = TRANSLATIONS[lang].history;

  return (
    <SectionWrapper id="intel">
      <GlitchTitle text={t.title} />

      <div className="relative pl-8 border-l border-white/10 space-y-12">
        {t.timeline.map((item, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[37px] top-1 bg-[#050505] p-1 border border-emerald-500/50 rounded-full">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            </div>
            <div className="font-mono-tech text-emerald-500 text-sm mb-1">
              {item.year}
            </div>
            <h3 className="text-2xl font-orbitron font-bold text-white">
              {item.title}
            </h3>
            <div className="text-gray-500 font-mono-tech text-sm uppercase mb-4">
              {item.role}
            </div>
            <p className="text-gray-400 max-w-2xl">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-white/10">
        <h3 className="font-orbitron font-bold text-2xl mb-8 text-white uppercase">
          {t.testimonials_title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.map((item, i) => (
            <div
              key={i}
              className="bg-white/5 p-6 border border-white/5 rounded-sm relative"
            >
              <div className="text-4xl text-emerald-900 font-serif absolute top-4 right-4 opacity-50">
                "
              </div>
              <p className="text-gray-300 text-sm italic mb-6 z-10 relative">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center font-bold text-xs">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

// --- Contact Section ---
const Contact = ({ lang }: { lang: LangType }) => {
  const t = TRANSLATIONS[lang].contact;

  return (
    <SectionWrapper
      id="contact"
      className="bg-gradient-to-b from-black to-emerald-950/20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <GlitchTitle text={t.title} subtext={t.subtitle} />
          <p className="text-gray-400 mb-8">{t.desc}</p>

          <div className="space-y-6 font-mono-tech">
            <div className="flex items-center gap-4 text-gray-300">
              <MapPin className="text-emerald-500" />
              <span>{t.location}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <Activity className="text-emerald-500" />
              <span>{t.status}</span>
            </div>
            <div className="flex items-center gap-4 text-gray-300">
              <Send className="text-emerald-500" />
              <span>{t.email_label}</span>
            </div>
          </div>
        </div>

        <form className="space-y-6 bg-[#111] p-8 border border-white/5 relative">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-500" />

          <div>
            <label className="block text-xs font-mono-tech text-emerald-500 mb-2 uppercase">
              {t.form.name}
            </label>
            <input
              type="text"
              className="w-full bg-black border border-white/20 p-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder={t.form.name_ph}
            />
          </div>
          <div>
            <label className="block text-xs font-mono-tech text-emerald-500 mb-2 uppercase">
              {t.form.email}
            </label>
            <input
              type="email"
              className="w-full bg-black border border-white/20 p-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder={t.form.email_ph}
            />
          </div>
          <div>
            <label className="block text-xs font-mono-tech text-emerald-500 mb-2 uppercase">
              {t.form.msg}
            </label>
            <textarea
              rows={4}
              className="w-full bg-black border border-white/20 p-3 text-white focus:border-emerald-500 focus:outline-none transition-colors"
              placeholder={t.form.msg_ph}
            ></textarea>
          </div>
          <TacticalButton className="w-full">
            {t.form.btn} <Send size={16} />
          </TacticalButton>
        </form>
      </div>
    </SectionWrapper>
  );
};

// --- Footer ---
const Footer = ({ lang }: { lang: LangType }) => {
  const t = TRANSLATIONS[lang].footer;
  return (
    <footer className="py-8 bg-black border-t border-emerald-900/30 text-center font-mono-tech text-xs text-gray-600">
      <div className="flex justify-center gap-4 mb-4">
        <a href="#" className="hover:text-emerald-500 transition-colors">
          GITHUB
        </a>
        <a href="#" className="hover:text-emerald-500 transition-colors">
          LINKEDIN
        </a>
        <a href="#" className="hover:text-emerald-500 transition-colors">
          TWITTER
        </a>
      </div>
      <p className="mb-2">{t.end}</p>
      <p>
        &copy; {new Date().getFullYear()} OWEN. {t.rights}
      </p>
    </footer>
  );
};

// --- Main App Component ---
export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [lang, setLang] = useState<LangType>("es");
  const [konami, setKonami] = useState<string[]>([]);

  // Easter Egg
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami((prev) => {
        const updated = [...prev, e.key];
        if (updated.length > 10) updated.shift();
        return updated;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const code =
      "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
    if (konami.join("").includes(code)) {
      alert("CHEAT CODE ACTIVATED: GOD MODE ENABLED");
      setKonami([]);
    }
  }, [konami]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} lang={lang} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <main className="bg-[#050505] text-white min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200">
          <Navbar lang={lang} setLang={setLang} />
          <Hero lang={lang} />
          <Strategies lang={lang} />
          <Arsenal lang={lang} />
          <Skills lang={lang} />
          <Missions lang={lang} />
          <History lang={lang} />
          <Contact lang={lang} />
          <Footer lang={lang} />

          {/* Decorative Fixed Grid Overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 flex justify-between px-6 md:px-12 mix-blend-overlay opacity-20">
            <div className="w-[1px] h-full bg-white/10" />
            <div className="w-[1px] h-full bg-white/10 hidden md:block" />
            <div className="w-[1px] h-full bg-white/10" />
          </div>
        </main>
      )}
    </>
  );
}
