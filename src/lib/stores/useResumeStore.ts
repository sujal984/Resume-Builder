import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  ResumeData,
  ResumeSection,
  ResumeItem,
  initialResumeState,
} from "@/types/resume";

interface ResumeStore {
  resumeData: ResumeData;
  isLoading: boolean;
  past?: ResumeData[];
  future?: ResumeData[];

  // Actions
  setResumeData: (data: ResumeData) => void;
  addSection: (title?: string, type?: ResumeSection["type"]) => void;
  updateSectionTitle: (sectionId: string, title: string) => void;
  toggleSectionVisibility: (sectionId: string) => void;

  // Item Actions
  addItem: (sectionId: string, item: Partial<ResumeItem>) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  updateItem: (
    sectionId: string,
    itemId: string,
    data: Partial<ResumeItem>,
  ) => void;

  // Reordering
  reorderSection: (oldIndex: number, newIndex: number) => void;
  reorderItem: (sectionId: string, oldIndex: number, newIndex: number) => void;

  // History
  undo: () => void;
  redo: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeState,
  isLoading: false,
  past: [],
  future: [],

  setResumeData: (data) =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
      resumeData: data,
    })),

  addSection: (title = "Custom Section", type = "custom") =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
      resumeData: {
        ...state.resumeData,
        sections: [
          ...state.resumeData.sections,
          {
            id: uuidv4(),
            type,
            title,
            isVisible: true,
            items: [],
          },
        ],
      },
    })),

  updateSectionTitle: (sectionId, title) =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
      resumeData: {
        ...state.resumeData,
        sections: state.resumeData.sections.map((section) =>
          section.id === sectionId ? { ...section, title } : section,
        ),
      },
    })),

  toggleSectionVisibility: (sectionId) =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
      resumeData: {
        ...state.resumeData,
        sections: state.resumeData.sections.map((section) =>
          section.id === sectionId
            ? { ...section, isVisible: !section.isVisible }
            : section,
        ),
      },
    })),

  addItem: (sectionId, item) =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
      resumeData: {
        ...state.resumeData,
        sections: state.resumeData.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                items: [...section.items, { id: uuidv4(), ...item }],
              }
            : section,
        ),
      },
    })),

  removeItem: (sectionId, itemId) =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
      resumeData: {
        ...state.resumeData,
        sections: state.resumeData.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                items: section.items.filter((item) => item.id !== itemId),
              }
            : section,
        ),
      },
    })),

  updateItem: (sectionId, itemId, data) =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
      resumeData: {
        ...state.resumeData,
        sections: state.resumeData.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                items: section.items.map((item) =>
                  item.id === itemId ? { ...item, ...data } : item,
                ),
              }
            : section,
        ),
      },
    })),

  reorderSection: (oldIndex, newIndex) =>
    set((state) => {
      const sections = [...state.resumeData.sections];
      const [removed] = sections.splice(oldIndex, 1);
      sections.splice(newIndex, 0, removed);
      return {
        past: [...(state.past || []), state.resumeData],
        future: [],
        resumeData: { ...state.resumeData, sections },
      };
    }),

  reorderItem: (sectionId, oldIndex, newIndex) =>
    set((state) => ({
      past: [...(state.past || []), state.resumeData],
      future: [],
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

  undo: () =>
    set((state) => {
      if (!state.past || state.past.length === 0) return state;
      const past = [...state.past];
      const previous = past.pop() as ResumeData;
      const future = [state.resumeData, ...(state.future || [])];
      return { resumeData: previous, past, future };
    }),

  redo: () =>
    set((state) => {
      if (!state.future || state.future.length === 0) return state;
      const [next, ...rest] = state.future;
      const past = [...(state.past || []), state.resumeData];
      return { resumeData: next, past, future: rest };
    }),
}));
