import { TechItem, Project, Skill, TimelineItem, Testimonial } from './types';
import { Cpu, Shield, Target, Activity, Brain, LayoutTemplate, Bug, Zap } from 'lucide-react';

export const TRANSLATIONS = {
  en: {
    nav: {
      strategies: "Expertise",
      arsenal: "Tech Stack",
      missions: "Projects",
      intel: "About",
      contact: "Contact",
      deploy: "Resume"
    },
    hero: {
      status: "Available for New Opportunities",
      title: "OWEN",
      subtitle: "FULL STACK ENGINEER",
      separator: "|",
      exp: "BUILDING DIGITAL EXCELLENCE",
      btn_mission: "View Projects",
      btn_arsenal: "Explore Tech",
      coords: "LOCATION: REMOTE / GLOBAL",
      system_status: "SYSTEM: ONLINE"
    },
    strategies: {
      title: "Core Capabilities",
      subtitle: "Delivering high-performance solutions with precision engineering.",
      items: [
        { title: 'Algorithmic Logic', desc: 'Optimized performance & scalability', icon: 'Cpu' },
        { title: 'Secure Systems', desc: 'Enterprise-grade security standards', icon: 'Shield' },
        { title: 'Strategic Design', desc: 'User-centric architecture', icon: 'Target' },
        { title: 'Agile Workflow', desc: 'Rapid iteration & adaptation', icon: 'Activity' }
      ]
    },
    arsenal: {
      title: "Technologies",
      items: [
        { name: 'React', role: 'UI Composition', category: 'frontend' },
        { name: 'Next.js', role: 'Full Stack Framework', category: 'frontend' },
        { name: 'TypeScript', role: 'Type Safety', category: 'tools' },
        { name: 'Node.js', role: 'Runtime Environment', category: 'backend' },
        { name: 'Docker', role: 'Containerization', category: 'tools' },
        { name: 'C#', role: 'Backend Logic', category: 'backend' },
        { name: 'ASP.NET', role: 'Enterprise Web API', category: 'backend' },
        { name: 'MongoDB', role: 'NoSQL Database', category: 'backend' },
        { name: 'SQL Server', role: 'Relational Data', category: 'backend' },
        { name: 'Git', role: 'Version Control', category: 'tools' },
        { name: 'Linux', role: 'Server Infrastructure', category: 'tools' },
        { name: 'Astro', role: 'Static Site Generation', category: 'frontend' },
        { name: 'React Native', role: 'Cross-Platform Mobile', category: 'mobile' },
        { name: 'Tailwind', role: 'Utility-First CSS', category: 'frontend' },
        { name: 'Java', role: 'Backend Systems', category: 'backend' },
      ] as TechItem[]
    },
    skills: {
      title: "Professional Skills",
      subtitle: "Cognitive capabilities for solving complex technical challenges.",
      items: [
        { title: 'Logical Analysis', description: 'Deep systemic understanding of complex problems.', icon: 'Brain' },
        { title: 'Problem Solving', description: 'Efficient resolution of technical blockers.', icon: 'Target' },
        { title: 'Critical Thinking', description: 'Evaluating trade-offs in architectural decisions.', icon: 'Shield' },
        { title: 'System Design', description: 'Architecting scalable and maintainable platforms.', icon: 'LayoutTemplate' },
        { title: 'Debugging', description: 'Advanced diagnostics and issue resolution.', icon: 'Bug' },
        { title: 'Optimization', description: 'Enhancing performance and resource efficiency.', icon: 'Zap' },
      ] as Skill[]
    },
    missions: {
      title: "Selected Projects",
      subtitle: "A showcase of technical implementations and delivered solutions.",
      filters: {
        all: "All",
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Mobile"
      },
      status: {
        completed: "COMPLETED",
        progress: "IN DEVELOPMENT"
      },
      btn_intel: "Details",
      btn_source: "Code",
      items: [
        {
            id: '001',
            title: 'Project Aegis',
            codename: 'LOGISTICS-DASH',
            description: 'Real-time logistics monitoring dashboard utilizing WebSockets for live data streaming.',
            stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            type: 'fullstack',
            status: 'completed',
          },
          {
            id: '002',
            title: 'Crypto Vanguard',
            codename: 'FINTECH-PLATFORM',
            description: 'High-frequency trading simulation platform optimized for sub-millisecond latency.',
            stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
            image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=800&q=80',
            type: 'frontend',
            status: 'completed',
          },
          {
            id: '003',
            title: 'Task Force Mobile',
            codename: 'FIELD-OPS-APP',
            description: 'Offline-first field operations management application for remote teams.',
            stack: ['React Native', 'Firebase', 'Redux'],
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
            type: 'mobile',
            status: 'completed',
          },
          {
            id: '004',
            title: 'Neural Nexus',
            codename: 'AI-MICROSERVICES',
            description: 'Scalable backend microservices architecture for processing AI model requests.',
            stack: ['C#', '.NET Core', 'Docker', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1558494949-ef20254b8c8c?auto=format&fit=crop&w=800&q=80',
            type: 'backend',
            status: 'completed',
          },
      ] as Project[]
    },
    history: {
      title: "Experience",
      timeline: [
        {
            year: '2022 - PRESENT',
            title: 'Full Stack Developer',
            role: 'Tech Innovators Inc (Current)',
            description: 'Leading frontend architecture and backend optimization. Delivered 15+ scalable modules.',
          },
        {
            year: '2021 - 2022',
            title: 'Junior Developer',
            role: 'Freelance & Contract',
            description: 'Executed client projects focused on React ecosystem and responsive design.',
          },
      ] as TimelineItem[],
      testimonials_title: "Endorsements",
      testimonials: [
        { name: 'Sarah Jenkins', role: 'Lead Engineer', quote: 'Owen is the engineer you want when stability is paramount. Unshakable focus.' },
        { name: 'Mark Vance', role: 'Product Manager', quote: '100% delivery precision. He approaches every challenge with a solution mindset.' },
        { name: 'Alex Chen', role: 'UI/UX Designer', quote: 'Translates complex designs into pixel-perfect code. A true craftsman.' },
      ] as Testimonial[]
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Open for collaboration and new opportunities.",
      desc: "Ready to build something extraordinary? Send me a message and let's discuss your project.",
      location: "LOCATION: REMOTE / GLOBAL",
      status: "STATUS: AVAILABLE FOR HIRE",
      email_label: "EMAIL: owen.dev@example.com",
      form: {
        name: "Name",
        name_ph: "Your Name",
        email: "Email",
        email_ph: "your@email.com",
        msg: "Message",
        msg_ph: "Tell me about your project...",
        btn: "Send Message"
      }
    },
    footer: {
        end: "DESIGNED & BUILT BY OWEN",
        rights: "ALL RIGHTS RESERVED."
    },
    loading: {
        boot: "SYSTEM_INIT",
        init: "INITIALIZING...",
        modules: "LOADING ASSETS...",
        secure: "CONNECTING...",
        decrypt: "PREPARING EXPERIENCE...",
        ready: "WELCOME",
        select_lang: "SELECT LANGUAGE"
    }
  },
  es: {
    nav: {
      strategies: "Expertise",
      arsenal: "Tecnologías",
      missions: "Proyectos",
      intel: "Sobre Mí",
      contact: "Contacto",
      deploy: "CV"
    },
    hero: {
      status: "Disponible para Nuevas Oportunidades",
      title: "OWEN",
      subtitle: "INGENIERO FULL STACK",
      separator: "|",
      exp: "CONSTRUYENDO EXCELENCIA DIGITAL",
      btn_mission: "Ver Proyectos",
      btn_arsenal: "Explorar Tech",
      coords: "UBICACIÓN: REMOTO / GLOBAL",
      system_status: "SISTEMA: EN LÍNEA"
    },
    strategies: {
      title: "Capacidades Core",
      subtitle: "Soluciones de alto rendimiento con ingeniería de precisión.",
      items: [
        { title: 'Lógica Algorítmica', desc: 'Rendimiento y escalabilidad optimizados', icon: 'Cpu' },
        { title: 'Sistemas Seguros', desc: 'Estándares de seguridad empresarial', icon: 'Shield' },
        { title: 'Diseño Estratégico', desc: 'Arquitectura centrada en el usuario', icon: 'Target' },
        { title: 'Flujo Ágil', desc: 'Iteración rápida y adaptación', icon: 'Activity' }
      ]
    },
    arsenal: {
      title: "Tecnologías",
      items: [
        { name: 'React', role: 'Composición UI', category: 'frontend' },
        { name: 'Next.js', role: 'Framework Full Stack', category: 'frontend' },
        { name: 'TypeScript', role: 'Seguridad de Tipos', category: 'tools' },
        { name: 'Node.js', role: 'Entorno de Ejecución', category: 'backend' },
        { name: 'Docker', role: 'Contenedorización', category: 'tools' },
        { name: 'C#', role: 'Lógica Backend', category: 'backend' },
        { name: 'ASP.NET', role: 'API Web Empresarial', category: 'backend' },
        { name: 'MongoDB', role: 'Base de Datos NoSQL', category: 'backend' },
        { name: 'SQL Server', role: 'Datos Relacionales', category: 'backend' },
        { name: 'Astro', role: 'Optimización de Velocidad', category: 'frontend' },
        { name: 'React Native', role: 'Móvil Multiplataforma', category: 'mobile' },
        { name: 'Tailwind', role: 'Estilo Sigiloso', category: 'frontend' },
        { name: 'Java', role: 'Integración Legacy', category: 'backend' },
      ] as TechItem[]
    },
    skills: {
      title: "Habilidades Profesionales",
      subtitle: "Capacidades cognitivas para resolver desafíos técnicos complejos.",
      items: [
        { title: 'Análisis Lógico', description: 'Comprensión sistémica profunda de problemas complejos.', icon: 'Brain' },
        { title: 'Resolución de Problemas', description: 'Resolución eficiente de bloqueos técnicos.', icon: 'Target' },
        { title: 'Pensamiento Crítico', description: 'Evaluación de trade-offs en decisiones de arquitectura.', icon: 'Shield' },
        { title: 'Diseño de Sistemas', description: 'Arquitectura de plataformas escalables y mantenibles.', icon: 'LayoutTemplate' },
        { title: 'Debugging', description: 'Diagnóstico avanzado y resolución de incidentes.', icon: 'Bug' },
        { title: 'Optimización', description: 'Mejora del rendimiento y eficiencia de recursos.', icon: 'Zap' },
      ] as Skill[]
    },
    missions: {
      title: "Proyectos Destacados",
      subtitle: "Una muestra de implementaciones técnicas y soluciones entregadas.",
      filters: {
        all: "Todos",
        frontend: "Frontend",
        backend: "Backend",
        mobile: "Móvil"
      },
      status: {
        completed: "COMPLETADO",
        progress: "EN DESARROLLO"
      },
      btn_intel: "Detalles",
      btn_source: "Código",
      items: [
        {
            id: '001',
            title: 'Proyecto Aegis',
            codename: 'LOGISTICS-DASH',
            description: 'Dashboard integral para monitoreo de logística en tiempo real usando WebSockets.',
            stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
            type: 'fullstack',
            status: 'completed',
          },
          {
            id: '002',
            title: 'Cripto Vanguard',
            codename: 'FINTECH-PLATFORM',
            description: 'Plataforma de simulación de trading de alta frecuencia con latencia sub-milisegundo.',
            stack: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase'],
            image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&w=800&q=80',
            type: 'frontend',
            status: 'completed',
          },
          {
            id: '003',
            title: 'Task Force Mobile',
            codename: 'FIELD-OPS-APP',
            description: 'App de gestión de operaciones de campo para equipos remotos con capacidades offline.',
            stack: ['React Native', 'Firebase', 'Redux'],
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=800&q=80',
            type: 'mobile',
            status: 'completed',
          },
          {
            id: '004',
            title: 'Neural Nexus',
            codename: 'AI-MICROSERVICES',
            description: 'Arquitectura de microservicios Backend para procesar peticiones de modelos de IA.',
            stack: ['C#', '.NET Core', 'Docker', 'PostgreSQL'],
            image: 'https://images.unsplash.com/photo-1558494949-ef20254b8c8c?auto=format&fit=crop&w=800&q=80',
            type: 'backend',
            status: 'completed',
          },
      ] as Project[]
    },
    history: {
      title: "Experiencia",
      timeline: [
        {
            year: '2022 - PRESENTE',
            title: 'Desarrollador Full Stack',
            role: 'Tech Innovators Inc (Actual)',
            description: 'Liderando arquitectura frontend y optimización backend. Desplegados 15+ módulos escalables.',
          },
        {
            year: '2021 - 2022',
            title: 'Desarrollador Junior',
            role: 'Freelance & Contratos',
            description: 'Ejecución de proyectos de clientes enfocados en el ecosistema React y diseño responsivo.',
          },
      ] as TimelineItem[],
      testimonials_title: "Respaldos",
      testimonials: [
        { name: 'Sarah Jenkins', role: 'Ingeniera Líder', quote: 'Owen es el ingeniero que quieres cuando la estabilidad es primordial. Enfoque inquebrantable.' },
        { name: 'Mark Vance', role: 'Product Manager', quote: 'Precisión de entrega al 100%. Aborda cada desafío con mentalidad de solución.' },
        { name: 'Alex Chen', role: 'Diseñador UI/UX', quote: 'Traduce diseños complejos a código pixel-perfect. Un verdadero artesano.' },
      ] as Testimonial[]
    },
    contact: {
      title: "Conectemos",
      subtitle: "Abierto a colaboración y nuevas oportunidades.",
      desc: "¿Listo para construir algo extraordinario? Envíame un mensaje y hablemos de tu proyecto.",
      location: "UBICACIÓN: REMOTO / GLOBAL",
      status: "ESTADO: DISPONIBLE",
      email_label: "EMAIL: owen.dev@example.com",
      form: {
        name: "Nombre",
        name_ph: "Tu Nombre",
        email: "Email",
        email_ph: "tu@email.com",
        msg: "Mensaje",
        msg_ph: "Cuéntame sobre tu proyecto...",
        btn: "Enviar Mensaje"
      }
    },
    footer: {
        end: "DISEÑADO Y CONSTRUIDO POR OWEN",
        rights: "TODOS LOS DERECHOS RESERVADOS."
    },
    loading: {
        boot: "INICIO_SISTEMA",
        init: "INICIALIZANDO...",
        modules: "CARGANDO ASSETS...",
        secure: "CONECTANDO...",
        decrypt: "PREPARANDO EXPERIENCIA...",
        ready: "BIENVENIDO",
        select_lang: "SELECCIONE IDIOMA"
    }
  }
};