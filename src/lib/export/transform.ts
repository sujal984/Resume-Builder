import { ResumeData } from "@/types/resume";
import { JSONResume } from "@/lib/templates/types";

function getString(obj: unknown, key: string): string {
  const v = (obj as Record<string, unknown>)[key];
  return typeof v === "string" ? v : "";
}

function getStringArray(obj: unknown, key: string): string[] {
  const v = (obj as Record<string, unknown>)[key];
  return Array.isArray(v)
    ? (v.filter((x) => typeof x === "string") as string[])
    : [];
}
function getSkillLevel(
  obj: unknown,
): "Beginner" | "Intermediate" | "Advanced" | "Expert" | undefined {
  const v = (obj as Record<string, unknown>)["level"];
  if (typeof v !== "string") return undefined;
  const allowed = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;
  type Level = (typeof allowed)[number];
  return allowed.includes(v as Level) ? (v as Level) : undefined;
}

export function resumeDataToJSONResume(data: ResumeData): JSONResume {
  const personal = data.sections.find((s) => s.type === "personal");
  const personalItem = (personal?.items[0] as Record<string, unknown>) || {};
  const summary = data.sections.find((s) => s.type === "summary");
  const experience = data.sections.find((s) => s.type === "experience");
  const education = data.sections.find((s) => s.type === "education");
  const skills = data.sections.find((s) => s.type === "skills");

  return {
    basics: {
      name: getString(personalItem, "fullName"),
      label: getString(personalItem, "jobTitle"),
      email: getString(personalItem, "email"),
      phone: getString(personalItem, "phone"),
      summary: getString(
        summary?.items?.[0] as Record<string, unknown>,
        "content",
      ),
      location: {
        city: getString(personalItem, "address"),
      },
      profiles: [
        ...(getString(personalItem, "website")
          ? [
              {
                network: "Website",
                username: "",
                url: getString(personalItem, "website"),
              },
            ]
          : []),
        ...(getString(personalItem, "linkedin")
          ? [
              {
                network: "LinkedIn",
                username: "",
                url: getString(personalItem, "linkedin"),
              },
            ]
          : []),
      ],
    },
    work: (experience?.items || []).map((item: unknown) => ({
      id: getString(item, "id"),
      name: getString(item, "company"),
      position: getString(item, "title"),
      startDate: getString(item, "startDate"),
      endDate: getString(item, "endDate"),
      summary: getString(item, "description"),
      highlights: getStringArray(item, "highlights"),
      location: getString(item, "location"),
    })),
    education: (education?.items || []).map((item: unknown) => ({
      id: getString(item, "id"),
      institution: getString(item, "school"),
      area: getString(item, "area") || getString(item, "field"),
      studyType: getString(item, "studyType") || getString(item, "degree"),
      startDate: getString(item, "startDate"),
      endDate: getString(item, "endDate"),
      score: getString(item, "score"),
      courses: getStringArray(item, "courses"),
    })),
    skills: (skills?.items || []).map((item: unknown) => ({
      id: getString(item, "id"),
      name: getString(item, "name"),
      level: getSkillLevel(item),
      keywords: getStringArray(item, "keywords"),
    })),
    meta: {
      version: "1.0.0",
    },
  };
}
