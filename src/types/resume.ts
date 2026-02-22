export type ResumeItem = {
    id: string;
    [key: string]: any; // Flexible for different block types (experience, education, etc.)
};

export type ResumeSection = {
    id: string;
    type: "personal" | "summary" | "experience" | "education" | "skills" | "projects" | "custom";
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
                }
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
};
