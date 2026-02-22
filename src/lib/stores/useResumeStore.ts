import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ResumeData, ResumeSection, ResumeItem, initialResumeState } from "@/types/resume";

interface ResumeStore {
    resumeData: ResumeData;
    isLoading: boolean;

    // Actions
    setResumeData: (data: ResumeData) => void;
    updateSectionTitle: (sectionId: string, title: string) => void;
    toggleSectionVisibility: (sectionId: string) => void;

    // Item Actions
    addItem: (sectionId: string, item: Partial<ResumeItem>) => void;
    removeItem: (sectionId: string, itemId: string) => void;
    updateItem: (sectionId: string, itemId: string, data: Partial<ResumeItem>) => void;

    // Reordering
    reorderSection: (oldIndex: number, newIndex: number) => void;
    reorderItem: (sectionId: string, oldIndex: number, newIndex: number) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
    resumeData: initialResumeState,
    isLoading: false,

    setResumeData: (data) => set({ resumeData: data }),

    updateSectionTitle: (sectionId, title) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                sections: state.resumeData.sections.map((section) =>
                    section.id === sectionId ? { ...section, title } : section
                ),
            },
        })),

    toggleSectionVisibility: (sectionId) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                sections: state.resumeData.sections.map((section) =>
                    section.id === sectionId ? { ...section, isVisible: !section.isVisible } : section
                ),
            },
        })),

    addItem: (sectionId, item) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                sections: state.resumeData.sections.map((section) =>
                    section.id === sectionId
                        ? { ...section, items: [...section.items, { id: uuidv4(), ...item }] }
                        : section
                ),
            },
        })),

    removeItem: (sectionId, itemId) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                sections: state.resumeData.sections.map((section) =>
                    section.id === sectionId
                        ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
                        : section
                ),
            },
        })),

    updateItem: (sectionId, itemId, data) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                sections: state.resumeData.sections.map((section) =>
                    section.id === sectionId
                        ? {
                            ...section,
                            items: section.items.map((item) =>
                                item.id === itemId ? { ...item, ...data } : item
                            ),
                        }
                        : section
                ),
            },
        })),

    reorderSection: (oldIndex, newIndex) =>
        set((state) => {
            const sections = [...state.resumeData.sections];
            const [removed] = sections.splice(oldIndex, 1);
            sections.splice(newIndex, 0, removed);
            return { resumeData: { ...state.resumeData, sections } };
        }),

    reorderItem: (sectionId, oldIndex, newIndex) =>
        set((state) => ({
            resumeData: {
                ...state.resumeData,
                sections: state.resumeData.sections.map((section) => {
                    if (section.id === sectionId) {
                        const items = [...section.items];
                        const [removed] = items.splice(oldIndex, 1);
                        items.splice(newIndex, 0, removed);
                        return { ...section, items };
                    }
                    return section;
                }),
            },
        })),
}));
