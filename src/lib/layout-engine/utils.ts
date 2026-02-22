import { ColumnRatio, LayoutConfig, SectionKey } from "./types";

export function ratioToPercents(ratio: ColumnRatio): [number, number] {
  const [a, b] = ratio.split("/") as [string, string];
  return [parseInt(a, 10), parseInt(b, 10)];
}

export function gridTemplateColumns(config: LayoutConfig): string | undefined {
  if (config.type === "two-column") {
    const [left, right] = ratioToPercents(config.columnRatio || "50/50");
    return `${left}fr ${right}fr`;
  }
  return undefined;
}

export function areaForSection(config: LayoutConfig, section: string): string {
  const found = config.structure.find((s) =>
    s.sections.includes(section as SectionKey),
  );
  return found?.area || "main";
}

export const MODERN_PRO: LayoutConfig = {
  id: "modern-pro",
  type: "two-column",
  columnRatio: "30/70",
  structure: [
    { area: "left", sections: ["personal", "skills", "education"] },
    { area: "right", sections: ["summary", "experience", "projects"] },
  ],
  typography: {
    headingStyle: "left",
    sectionHeaderVariant: "accent",
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
    },
    section: {
      marginBottom: "var(--space-lg)",
    },
    badges: {
      background: "#F3F4F6",
      borderRadius: "var(--radius)",
    },
  },
};
