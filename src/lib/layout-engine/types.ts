export type LayoutType = "single-column" | "two-column" | "grid" | "hybrid";

export type ColumnRatio = "30/70" | "40/60" | "50/50";

export type LayoutArea =
  | "left"
  | "right"
  | "main"
  | "sidebar"
  | "header"
  | "footer";

export type SectionKey =
  | "personal"
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "custom";

export type LayoutStructure = Array<{
  area: LayoutArea;
  sections: SectionKey[];
}>;

export type TypographySpec = {
  headingStyle: "center" | "left" | "right";
  sectionHeaderVariant: "line" | "accent" | "caps" | "pill";
};

export type SpacingSpec = {
  sectionGap: number;
  itemGap: number;
  lineHeight: number;
};

export type ComponentStyles = {
  header?: Record<string, string>;
  section?: Record<string, string>;
  badges?: Record<string, string>;
};

export type LayoutConfig = {
  id: string;
  type: LayoutType;
  columnRatio?: ColumnRatio;
  structure: LayoutStructure;
  typography: TypographySpec;
  spacing: SpacingSpec;
  componentStyles: ComponentStyles;
};
