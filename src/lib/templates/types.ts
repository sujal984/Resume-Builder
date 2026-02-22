/**
 * Template System Type Definitions
 * Defines the structure for resume templates and rendering
 */

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'minimal' | 'creative' | 'professional' | 'executive';
  thumbnail: string;
  isPremium: boolean;
  features: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  layout: 'single-column' | 'two-column' | 'sidebar';
  atsScore: number; // How ATS-friendly this template is (0-100)
}

export interface TemplateTheme {
  mode: 'light' | 'dark';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  fontSize: {
    heading: string;
    subheading: string;
    body: string;
    small: string;
  };
  spacing: {
    section: string;
    item: string;
  };
}

export interface TemplateConfig {
  template: ResumeTemplate;
  theme: TemplateTheme;
  customizations?: {
    showPhoto?: boolean;
    showIcons?: boolean;
    sectionOrder?: string[];
    columnRatio?: string;
  };
}

// JSON Resume Standard Compatible Schema
export interface JSONResume {
  basics: {
    name: string;
    label: string; // Job title
    image?: string;
    email: string;
    phone: string;
    url?: string;
    summary: string;
    location: {
      address?: string;
      postalCode?: string;
      city: string;
      countryCode?: string;
      region?: string;
    };
    profiles: Array<{
      network: string;
      username: string;
      url: string;
    }>;
  };
  work: Array<{
    id: string;
    name: string; // Company
    position: string;
    url?: string;
    startDate: string;
    endDate?: string;
    summary?: string;
    highlights: string[];
    location?: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    url?: string;
    area: string; // Field of study
    studyType: string; // Degree
    startDate: string;
    endDate?: string;
    score?: string; // GPA
    courses?: string[];
  }>;
  skills: Array<{
    id: string;
    name: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    keywords: string[];
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    highlights: string[];
    keywords: string[];
    startDate?: string;
    endDate?: string;
    url?: string;
    roles?: string[];
  }>;
  certificates?: Array<{
    id: string;
    name: string;
    date: string;
    issuer: string;
    url?: string;
  }>;
  languages?: Array<{
    id: string;
    language: string;
    fluency: 'Native' | 'Fluent' | 'Professional' | 'Limited';
  }>;
  interests?: Array<{
    id: string;
    name: string;
    keywords: string[];
  }>;
  references?: Array<{
    id: string;
    name: string;
    reference: string;
  }>;
  meta?: {
    canonical?: string;
    version?: string;
    lastModified?: string;
  };
}
