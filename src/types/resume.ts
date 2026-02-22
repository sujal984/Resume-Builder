export type ResumeItem = {
  id: string;
  [key: string]: any;
  highlights?: string[];
  level?: number;
};

export type ResumeSection = {
  id: string;
  type:
    | "personal"
    | "summary"
    | "experience"
    | "education"
    | "skills"
    | "projects"
    | "custom";
  title: string;
  isVisible: boolean;
  items: ResumeItem[];
  columns?: number; // For layout control
};

export type ResumeData = {
  id: string;
  title: string;
  slug: string;
  sections: ResumeSection[];
  themeColor: string;
  fontFamily: string;
  templateId: string;
  // Design overrides
  lineHeight?: number; // body line height, e.g., 1.4 - 2.0
  sectionSpacing?: number; // px, affects spacingScale.lg
  columnRatio?: "30/70" | "40/60" | "50/50";
  layoutMode?: "single-column" | "two-column"; // optional override independent of template
};

// Initial State helper
export const initialResumeState: ResumeData = {
  id: "",
  title: "Untitled Resume",
  slug: "untitled-resume",
  sections: [
    {
      id: "personal",
      type: "personal",
      title: "Personal Information",
      isVisible: true,
      items: [
        {
          id: "default-personal",
          fullName: "",
          email: "",
          phone: "",
          address: "",
          jobTitle: "",
          website: "",
          linkedin: "",
        },
      ],
    },
    {
      id: "summary",
      type: "summary",
      title: "Professional Summary",
      isVisible: true,
      items: [
        {
          id: "default-summary",
          content: "",
        },
      ],
    },
    {
      id: "experience",
      type: "experience",
      title: "Work Experience",
      isVisible: true,
      items: [],
    },
    {
      id: "education",
      type: "education",
      title: "Education",
      isVisible: true,
      items: [],
    },
    {
      id: "skills",
      type: "skills",
      title: "Skills",
      isVisible: true,
      items: [],
    },
  ],
  themeColor: "#6366F1", // Indigo-500
  fontFamily: "Inter",
  templateId: "professional",
  lineHeight: 1.6,
  sectionSpacing: 16,
  columnRatio: "30/70",
  layoutMode: undefined,
};
