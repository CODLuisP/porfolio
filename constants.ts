import { TechItem, Project, Skill, TimelineItem, Testimonial } from './types';
import { Cpu, Shield, Target, Activity, Brain, LayoutTemplate, Bug, Zap } from 'lucide-react';

export const TRANSLATIONS = {
  en: {
    nav: {
      strategies: "Strategies",
      arsenal: "Arsenal",
      missions: "Missions",
      intel: "Intel",
      contact: "Contact",
      deploy: "Deploy"
    },
    hero: {
      status: "System Online • Ready for Deployment",
      title: "OWEN",
      subtitle: "FULL STACK WARRIOR",
      separator: "|",
      exp: "2 YEARS IN THE CODE BATTLEFIELD",
      btn_mission: "Initiate Mission",
      btn_arsenal: "View Arsenal",
      coords: "COORDS: 45.4215° N, 75.6972° W",
      system_status: "STATUS: OPERATIONAL"
    },
    strategies: {
      title: "Battle Strategies",
      subtitle: "Core protocols for software engagement and dominance.",
      items: [
        { title: 'Algorithms', desc: 'Attack route optimization', icon: 'Cpu' },
        { title: 'Clean Code', desc: 'Armor plating integrity', icon: 'Shield' },
        { title: 'Design Patterns', desc: 'Battle-tested tactics', icon: 'Target' },
        { title: 'Agile Ops', desc: 'Adaptability in chaos', icon: 'Activity' }
      ]
    },
    arsenal: {
      title: "Weapons Arsenal",
      items: [
        { name: 'React', role: 'Tactical UI Builder', category: 'frontend' },
        { name: 'Next.js', role: 'Server Side Ops', category: 'frontend' },
        { name: 'TypeScript', role: 'Type Safety Armor', category: 'tools' },
        { name: 'Node.js', role: 'Command Center', category: 'backend' },
        { name: 'Docker', role: 'Container Deployment', category: 'tools' },
        { name: 'C#', role: 'Heavy Artillery', category: 'backend' },
        { name: 'ASP.NET', role: 'Enterprise Core', category: 'backend' },
        { name: 'MongoDB', role: 'NoSQL Logistics', category: 'backend' },
        { name: 'SQL Server', role: 'Relational Data', category: 'backend' },
        { name: 'Git', role: 'Version Strategy', category: 'tools' },
        { name: 'Linux', role: 'Base Environment', category: 'tools' },
        { name: 'Astro', role: 'Speed Optimization', category: 'frontend' },
        { name: 'React Native', role: 'Mobile Warfare', category: 'mobile' },
        { name: 'Tailwind', role: 'Stealth Styling', category: 'frontend' },
        { name: 'Java', role: 'Legacy Integration', category: 'backend' },
      ] as TechItem[]
    },
    skills: {
      title: "Tactical Skills",
      subtitle: "Combat-ready cognitive capabilities.",
      items: [
        { title: 'Logical Reasoning', description: 'Advanced battlefield analysis and pathfinding.', icon: 'Brain' },
        { title: 'Problem Solving', description: 'Threat neutralization and bug elimination.', icon: 'Target' },
        { title: 'Critical Thinking', description: 'Strategic evaluation of technical debt.', icon: 'Shield' },
        { title: 'Architecture', description: 'Designing scalable fortress systems.', icon: 'LayoutTemplate' },
        { title: 'Debugging', description: 'Code bomb disposal and forensics.', icon: 'Bug' },
        { title: 'Optimization', description: 'Resource efficiency in combat.', icon: 'Zap' },
      ] as Skill[]
    },
    missions: {
      title: "Mission Reports",
      subtitle: "Declassified records of successful operations.",
      filters: {
        all: "ALL OPS",
        frontend: "FRONTEND OPS",
        backend: "BACKEND OPS",
        mobile: "MOBILE OPS"
      },
      status: {
        completed: "MISSION COMPLETE",
        progress: "IN PROGRESS"
      },
      btn_intel: "Intel",
      btn_source: "Source",
      items: [
        {
            id: '001',
            title: 'Project Aegis',
            codename: 'OP-AEGIS',
            description: 'A comprehensive dashboard for monitoring real-time supply chain logistics using WebSockets.',
            stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            type: 'fullstack',
            status: 'completed',
          },
          {
            id: '002',
            title: 'Crypto Vanguard',
            codename: 'OP-VANGUARD',
            description: 'High-frequency trading simulation platform with sub-millisecond latency updates.',
            stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
            image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=800&q=80',
            type: 'frontend',
            status: 'completed',
          },
          {
            id: '003',
            title: 'Task Force Mobile',
            codename: 'OP-TF-M',
            description: 'Field operations management app for remote teams with offline capabilities.',
            stack: ['React Native', 'Firebase', 'Redux'],
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
            type: 'mobile',
            status: 'completed',
          },
          {
            id: '004',
            title: 'Neural Nexus',
            codename: 'OP-NEXUS',
            description: 'Backend API microservices architecture for processing AI model requests.',
            stack: ['C#', '.NET Core', 'Docker', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1558494949-ef20254b8c8c?auto=format&fit=crop&w=800&q=80',
            type: 'backend',
            status: 'completed',
          },
      ] as Project[]
    },
    history: {
      title: "Service History",
      timeline: [
        {
            year: '2022 - PRESENT',
            title: 'Full Stack Developer',
            role: 'Special Forces Unit (Current Company)',
            description: 'Leading frontend architecture and backend optimization. Deployed 15+ mission-critical modules.',
          },
          {
            year: '2021 - 2022',
            title: 'Junior Developer',
            role: 'Bootcamp Graduate & Freelance Mercenary',
            description: 'Intensive training followed by contract missions. Mastered the React ecosystem.',
          },
      ] as TimelineItem[],
      testimonials_title: "Ally Recommendations",
      testimonials: [
        { name: 'Cmdr. Sarah Jenkins', role: 'Lead Engineer', quote: 'Owen is the soldier you want in the foxhole when the server is down. Unshakable.' },
        { name: 'Lt. Mark Vance', role: 'Product Manager', quote: 'Delivery precision is 100%. He treats every bug like a personal enemy.' },
        { name: 'Sgt. Alex Chen', role: 'UI/UX Designer', quote: 'Translates designs into code with pixel-perfect accuracy. A true craftsman.' },
      ] as Testimonial[]
    },
    contact: {
      title: "Join the Squad",
      subtitle: "Initiate encrypted communication channel.",
      desc: "Ready to deploy high-performance code to your frontline? Send briefing details below.",
      location: "BASE OF OPERATIONS: REMOTE / GLOBAL",
      status: "STATUS: AVAILABLE FOR HIRE",
      email_label: "ENCRYPTED: owen.dev@secure-line.com",
      form: {
        name: "Recruiter ID (Name)",
        name_ph: "COMMANDER NAME",
        email: "Frequency (Email)",
        email_ph: "SECURE@CHANNEL.COM",
        msg: "Mission Brief (Message)",
        msg_ph: "OPERATION DETAILS...",
        btn: "Transmit Data"
      }
    },
    footer: {
        end: "END TRANSMISSION // SYSTEM SHUTDOWN",
        rights: "ALL RIGHTS RESERVED."
    },
    loading: {
        boot: "SYSTEM_BOOT",
        init: "INITIALIZING...",
        modules: "LOADING MODULES...",
        secure: "ESTABLISHING SECURE CONNECTION...",
        decrypt: "DECRYPTING PORTFOLIO DATA...",
        ready: "SYSTEM READY",
        select_lang: "SELECT INTERFACE LANGUAGE / SELECCIONE IDIOMA"
    }
  },
  es: {
    nav: {
      strategies: "Estrategias",
      arsenal: "Arsenal",
      missions: "Misiones",
      intel: "Intel",
      contact: "Contacto",
      deploy: "Desplegar"
    },
    hero: {
      status: "Sistema En Línea • Listo para Despliegue",
      title: "OWEN",
      subtitle: "GUERRERO FULL STACK",
      separator: "|",
      exp: "2 AÑOS EN EL CAMPO DE BATALLA DEL CÓDIGO",
      btn_mission: "Iniciar Misión",
      btn_arsenal: "Ver Arsenal",
      coords: "COORDS: 45.4215° N, 75.6972° O",
      system_status: "ESTADO: OPERATIVO"
    },
    strategies: {
      title: "Estrategias de Batalla",
      subtitle: "Protocolos centrales para enfrentamiento de software y dominio.",
      items: [
        { title: 'Algoritmos', desc: 'Optimización de rutas de ataque', icon: 'Cpu' },
        { title: 'Código Limpio', desc: 'Integridad de armadura', icon: 'Shield' },
        { title: 'Patrones', desc: 'Tácticas probadas en batalla', icon: 'Target' },
        { title: 'Ops Ágiles', desc: 'Adaptabilidad en caos', icon: 'Activity' }
      ]
    },
    arsenal: {
      title: "Arsenal de Armas",
      items: [
        { name: 'React', role: 'Constructor de UI Táctico', category: 'frontend' },
        { name: 'Next.js', role: 'Ops del Lado del Servidor', category: 'frontend' },
        { name: 'TypeScript', role: 'Armadura de Tipado', category: 'tools' },
        { name: 'Node.js', role: 'Centro de Comando', category: 'backend' },
        { name: 'Docker', role: 'Despliegue de Contenedores', category: 'tools' },
        { name: 'C#', role: 'Artillería Pesada', category: 'backend' },
        { name: 'ASP.NET', role: 'Núcleo Empresarial', category: 'backend' },
        { name: 'MongoDB', role: 'Logística NoSQL', category: 'backend' },
        { name: 'SQL Server', role: 'Datos Relacionales', category: 'backend' },
        { name: 'Git', role: 'Estrategia de Versiones', category: 'tools' },
        { name: 'Linux', role: 'Entorno Base', category: 'tools' },
        { name: 'Astro', role: 'Optimización de Velocidad', category: 'frontend' },
        { name: 'React Native', role: 'Guerra Móvil', category: 'mobile' },
        { name: 'Tailwind', role: 'Estilo Sigiloso', category: 'frontend' },
        { name: 'Java', role: 'Integración Legacy', category: 'backend' },
      ] as TechItem[]
    },
    skills: {
      title: "Habilidades Tácticas",
      subtitle: "Capacidades cognitivas listas para combate.",
      items: [
        { title: 'Razonamiento Lógico', description: 'Análisis avanzado del campo de batalla.', icon: 'Brain' },
        { title: 'Resolución de Problemas', description: 'Neutralización de amenazas y eliminación de bugs.', icon: 'Target' },
        { title: 'Pensamiento Crítico', description: 'Evaluación estratégica de deuda técnica.', icon: 'Shield' },
        { title: 'Arquitectura', description: 'Diseño de sistemas fortaleza escalables.', icon: 'LayoutTemplate' },
        { title: 'Debugging', description: 'Desactivación de bombas de código y forense.', icon: 'Bug' },
        { title: 'Optimización', description: 'Eficiencia de recursos en combate.', icon: 'Zap' },
      ] as Skill[]
    },
    missions: {
      title: "Reportes de Misión",
      subtitle: "Registros desclasificados de operaciones exitosas.",
      filters: {
        all: "TODAS",
        frontend: "FRONTEND",
        backend: "BACKEND",
        mobile: "MÓVIL"
      },
      status: {
        completed: "MISIÓN COMPLETADA",
        progress: "EN PROGRESO"
      },
      btn_intel: "Intel",
      btn_source: "Código",
      items: [
        {
            id: '001',
            title: 'Proyecto Aegis',
            codename: 'OP-AEGIS',
            description: 'Dashboard integral para monitoreo de logística en tiempo real usando WebSockets.',
            stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            type: 'fullstack',
            status: 'completed',
          },
          {
            id: '002',
            title: 'Cripto Vanguard',
            codename: 'OP-VANGUARD',
            description: 'Plataforma de simulación de trading de alta frecuencia con latencia sub-milisegundo.',
            stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
            image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=800&q=80',
            type: 'frontend',
            status: 'completed',
          },
          {
            id: '003',
            title: 'Task Force Mobile',
            codename: 'OP-TF-M',
            description: 'App de gestión de operaciones de campo para equipos remotos con capacidades offline.',
            stack: ['React Native', 'Firebase', 'Redux'],
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
            type: 'mobile',
            status: 'completed',
          },
          {
            id: '004',
            title: 'Neural Nexus',
            codename: 'OP-NEXUS',
            description: 'Arquitectura de microservicios Backend para procesar peticiones de modelos de IA.',
            stack: ['C#', '.NET Core', 'Docker', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1558494949-ef20254b8c8c?auto=format&fit=crop&w=800&q=80',
            type: 'backend',
            status: 'completed',
          },
      ] as Project[]
    },
    history: {
      title: "Historial de Servicio",
      timeline: [
        {
            year: '2022 - PRESENTE',
            title: 'Desarrollador Full Stack',
            role: 'Unidad de Fuerzas Especiales (Empresa Actual)',
            description: 'Liderando arquitectura frontend y optimización backend. Desplegados 15+ módulos de misión crítica.',
          },
          {
            year: '2021 - 2022',
            title: 'Desarrollador Junior',
            role: 'Graduado de Bootcamp & Mercenario Freelance',
            description: 'Entrenamiento intensivo seguido de misiones por contrato. Maestría en el ecosistema React.',
          },
      ] as TimelineItem[],
      testimonials_title: "Recomendaciones de Aliados",
      testimonials: [
        { name: 'Cmdr. Sarah Jenkins', role: 'Ingeniera Líder', quote: 'Owen es el soldado que quieres en la trinchera cuando el servidor cae. Inquebrantable.' },
        { name: 'Lt. Mark Vance', role: 'Product Manager', quote: 'Precisión de entrega al 100%. Trata cada bug como un enemigo personal.' },
        { name: 'Sgt. Alex Chen', role: 'Diseñador UI/UX', quote: 'Traduce diseños a código con precisión pixel-perfect. Un verdadero artesano.' },
      ] as Testimonial[]
    },
    contact: {
      title: "Únete al Escuadrón",
      subtitle: "Iniciar canal de comunicación encriptado.",
      desc: "Listo para desplegar código de alto rendimiento en tu frente de batalla? Envía detalles del briefing abajo.",
      location: "BASE DE OPERACIONES: REMOTO / GLOBAL",
      status: "ESTADO: DISPONIBLE PARA CONTRATACIÓN",
      email_label: "ENCRIPTADO: owen.dev@secure-line.com",
      form: {
        name: "ID del Reclutador (Nombre)",
        name_ph: "NOMBRE COMANDANTE",
        email: "Frecuencia (Email)",
        email_ph: "CANAL@SEGURO.COM",
        msg: "Briefing de Misión (Mensaje)",
        msg_ph: "DETALLES DE OPERACIÓN...",
        btn: "Transmitir Datos"
      }
    },
    footer: {
        end: "FIN DE TRANSMISIÓN // APAGADO DE SISTEMA",
        rights: "TODOS LOS DERECHOS RESERVADOS."
    },
    loading: {
        boot: "INICIO_SISTEMA",
        init: "INICIALIZANDO...",
        modules: "CARGANDO MÓDULOS...",
        secure: "ESTABLECIENDO CONEXIÓN SEGURA...",
        decrypt: "DESENCRIPTANDO DATOS DEL PORTFOLIO...",
        ready: "SISTEMA LISTO",
        select_lang: "SELECCIONE IDIOMA / SELECT LANGUAGE"
    }
  }
};