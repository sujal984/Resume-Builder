import { LayoutConfig } from "@/lib/layout-engine/types";
import { MODERN_PRO } from "@/lib/layout-engine/utils";

const SINGLE_COLUMN_PRO: LayoutConfig = {
  id: "single-pro",
  type: "single-column",
  structure: [
    {
      area: "main",
      sections: ["summary", "experience", "education", "skills", "projects"],
    },
  ],
  typography: {
    headingStyle: "center",
    sectionHeaderVariant: "line",
  },
  spacing: {
    sectionGap: 16,
    itemGap: 10,
    lineHeight: 1.6,
  },
  componentStyles: {
    header: {
      borderBottom: "2px solid var(--color-primary)",
      paddingBottom: "var(--space-sm)",
      textAlign: "center",
    },
    section: {
      marginBottom: "var(--space-lg)",
    },
  },
};

export function getLayoutConfig(templateId: string): LayoutConfig {
  const twoColumnTemplates = new Set(["modern", "tech", "compact", "colorful"]);
  if (twoColumnTemplates.has(templateId)) return MODERN_PRO;
  return SINGLE_COLUMN_PRO;
}

export function resolveLayoutConfig(
  templateId: string,
  overrideMode?: "single-column" | "two-column",
  columnRatio?: "30/70" | "40/60" | "50/50",
): LayoutConfig {
  let base = getLayoutConfig(templateId);
  if (overrideMode === "single-column") {
    base = { ...base, type: "single-column" };
  } else if (overrideMode === "two-column") {
    base = { ...base, type: "two-column" };
  }
  if (columnRatio && base.type === "two-column") {
    base = { ...base, columnRatio };
  }
  return base;
}
