/**
 * Template Registry
 * Central registry for all resume templates
 */

import { ResumeTemplate } from './types';

export const TEMPLATE_REGISTRY: Record<string, ResumeTemplate> = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, contemporary design with a two-column layout. Perfect for tech and creative roles.',
    category: 'modern',
    thumbnail: '/templates/modern-thumb.png',
    isPremium: false,
    features: ['Two-column layout', 'Icon support', 'Color accents', 'ATS-friendly'],
    colors: {
      primary: '#6366F1',
      secondary: '#818CF8',
      accent: '#4F46E5',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    layout: 'two-column',
    atsScore: 95,
  },
  
  classic: {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional single-column format. Ideal for corporate and formal positions.',
    category: 'classic',
    thumbnail: '/templates/classic-thumb.png',
    isPremium: false,
    features: ['Single-column', 'Traditional format', 'Maximum ATS compatibility'],
    colors: {
      primary: '#1F2937',
      secondary: '#374151',
      accent: '#4B5563',
    },
    fonts: {
      heading: 'Georgia',
      body: 'Georgia',
    },
    layout: 'single-column',
    atsScore: 100,
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Minimalist design with maximum white space. Great for designers and creatives.',
    category: 'minimal',
    thumbnail: '/templates/minimal-thumb.png',
    isPremium: false,
    features: ['Minimalist design', 'Lots of white space', 'Clean typography'],
    colors: {
      primary: '#000000',
      secondary: '#404040',
      accent: '#666666',
    },
    fonts: {
      heading: 'Helvetica',
      body: 'Helvetica',
    },
    layout: 'single-column',
    atsScore: 98,
  },

  creative: {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Eye-catching design with bold colors. Perfect for creative industries.',
    category: 'creative',
    thumbnail: '/templates/creative-thumb.png',
    isPremium: true,
    features: ['Bold colors', 'Unique layout', 'Visual elements', 'Stand out design'],
    colors: {
      primary: '#EC4899',
      secondary: '#F472B6',
      accent: '#DB2777',
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Open Sans',
    },
    layout: 'sidebar',
    atsScore: 85,
  },

  executive: {
    id: 'executive',
    name: 'Executive Elite',
    description: 'Sophisticated design for senior-level positions. Premium feel with elegant typography.',
    category: 'executive',
    thumbnail: '/templates/executive-thumb.png',
    isPremium: true,
    features: ['Elegant design', 'Premium typography', 'Executive presence'],
    colors: {
      primary: '#0F172A',
      secondary: '#1E293B',
      accent: '#334155',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lora',
    },
    layout: 'single-column',
    atsScore: 92,
  },

  tech: {
    id: 'tech',
    name: 'Tech Modern',
    description: 'Modern tech-focused design with clean lines. Ideal for software engineers and developers.',
    category: 'modern',
    thumbnail: '/templates/tech-thumb.png',
    isPremium: true,
    features: ['Tech-focused', 'Code-friendly', 'Modern aesthetics', 'Skill visualization'],
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      accent: '#059669',
    },
    fonts: {
      heading: 'JetBrains Mono',
      body: 'Inter',
    },
    layout: 'two-column',
    atsScore: 94,
  },

  elegant: {
    id: 'elegant',
    name: 'Elegant Serif',
    description: 'Timeless elegance with serif typography. Perfect for traditional industries.',
    category: 'professional',
    thumbnail: '/templates/elegant-thumb.png',
    isPremium: true,
    features: ['Serif typography', 'Timeless design', 'Professional appearance'],
    colors: {
      primary: '#7C3AED',
      secondary: '#8B5CF6',
      accent: '#6D28D9',
    },
    fonts: {
      heading: 'Merriweather',
      body: 'Merriweather',
    },
    layout: 'single-column',
    atsScore: 96,
  },

  compact: {
    id: 'compact',
    name: 'Compact Pro',
    description: 'Space-efficient design that fits more content. Great for experienced professionals.',
    category: 'professional',
    thumbnail: '/templates/compact-thumb.png',
    isPremium: false,
    features: ['Space-efficient', 'Fits more content', 'Clean organization'],
    colors: {
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      accent: '#0284C7',
    },
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
    },
    layout: 'two-column',
    atsScore: 93,
  },

  colorful: {
    id: 'colorful',
    name: 'Colorful Modern',
    description: 'Vibrant and energetic design. Stand out in creative fields.',
    category: 'creative',
    thumbnail: '/templates/colorful-thumb.png',
    isPremium: true,
    features: ['Vibrant colors', 'Modern design', 'Eye-catching', 'Creative layout'],
    colors: {
      primary: '#F59E0B',
      secondary: '#FBBF24',
      accent: '#D97706',
    },
    fonts: {
      heading: 'Poppins',
      body: 'Nunito',
    },
    layout: 'sidebar',
    atsScore: 88,
  },

  simple: {
    id: 'simple',
    name: 'Simple & Clean',
    description: 'No-frills, straightforward design. Maximum readability and ATS compatibility.',
    category: 'minimal',
    thumbnail: '/templates/simple-thumb.png',
    isPremium: false,
    features: ['Maximum simplicity', 'Perfect ATS score', 'Easy to read'],
    colors: {
      primary: '#111827',
      secondary: '#1F2937',
      accent: '#374151',
    },
    fonts: {
      heading: 'Arial',
      body: 'Arial',
    },
    layout: 'single-column',
    atsScore: 100,
  },
};

export const getTemplate = (id: string): ResumeTemplate | undefined => {
  return TEMPLATE_REGISTRY[id];
};

export const getAllTemplates = (): ResumeTemplate[] => {
  return Object.values(TEMPLATE_REGISTRY);
};

export const getTemplatesByCategory = (category: string): ResumeTemplate[] => {
  return getAllTemplates().filter(t => t.category === category);
};

export const getFreeTemplates = (): ResumeTemplate[] => {
  return getAllTemplates().filter(t => !t.isPremium);
};

export const getPremiumTemplates = (): ResumeTemplate[] => {
  return getAllTemplates().filter(t => t.isPremium);
};
