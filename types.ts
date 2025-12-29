export interface TechItem {
    name: string;
    role: string;
    category: 'frontend' | 'backend' | 'tools' | 'mobile';
  }
  
  export interface Project {
    id: string;
    title: string;
    codename: string;
    description: string;
    stack: string[];
    image: string;
    type: 'frontend' | 'backend' | 'fullstack' | 'mobile';
    status: 'completed' | 'in-progress';
  }
  
  export interface Skill {
    title: string;
    description: string;
    icon: string;
  }
  
  export interface TimelineItem {
    year: string;
    title: string;
    role: string;
    description: string;
  }
  
  export interface Testimonial {
    name: string;
    role: string;
    quote: string;
  }