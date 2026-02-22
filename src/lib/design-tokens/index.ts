export type DesignTokens = {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
  fontFamily: string;
  headingFont: string;
  bodyFont: string;
  fontScale: {
    h1: number;
    h2: number;
    h3: number;
    body: number;
    small: number;
  };
  spacingScale: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: number;
  layoutDensity: "compact" | "comfortable";
  lineHeight: {
    heading: number;
    body: number;
  };
};

export const defaultTokens: DesignTokens = {
  primaryColor: "#6366F1",
  secondaryColor: "#1F2937",
  accentColor: "#10B981",
  fontFamily:
    "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  headingFont:
    "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  bodyFont:
    "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
  fontScale: {
    h1: 24,
    h2: 18,
    h3: 14,
    body: 11,
    small: 10,
  },
  spacingScale: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  borderRadius: 6,
  layoutDensity: "comfortable",
  lineHeight: {
    heading: 1.3,
    body: 1.6,
  },
};

export function mergeTokens(
  base: DesignTokens,
  overrides?: Partial<DesignTokens>,
): DesignTokens {
  if (!overrides) return base;
  return {
    ...base,
    ...overrides,
    fontScale: { ...base.fontScale, ...(overrides.fontScale || {}) },
    spacingScale: { ...base.spacingScale, ...(overrides.spacingScale || {}) },
    lineHeight: { ...base.lineHeight, ...(overrides.lineHeight || {}) },
  };
}

export function tokensToCSSVars(tokens: DesignTokens): Record<string, string> {
  return {
    "--color-primary": tokens.primaryColor,
    "--color-secondary": tokens.secondaryColor,
    "--color-accent": tokens.accentColor || tokens.primaryColor,
    "--font-family": tokens.fontFamily,
    "--font-heading": tokens.headingFont,
    "--font-body": tokens.bodyFont,
    "--font-h1": `${tokens.fontScale.h1}pt`,
    "--font-h2": `${tokens.fontScale.h2}pt`,
    "--font-h3": `${tokens.fontScale.h3}pt`,
    "--font-size-body": `${tokens.fontScale.body}pt`,
    "--font-size-small": `${tokens.fontScale.small}pt`,
    "--space-xs": `${tokens.spacingScale.xs}px`,
    "--space-sm": `${tokens.spacingScale.sm}px`,
    "--space-md": `${tokens.spacingScale.md}px`,
    "--space-lg": `${tokens.spacingScale.lg}px`,
    "--space-xl": `${tokens.spacingScale.xl}px`,
    "--radius": `${tokens.borderRadius}px`,
    "--lh-heading": `${tokens.lineHeight.heading}`,
    "--lh-body": `${tokens.lineHeight.body}`,
    "--density": tokens.layoutDensity,
  };
}

export function cssVarsStyle(
  vars: Record<string, string>,
): React.CSSProperties {
  const style: Record<string, string> = {};
  Object.entries(vars).forEach(([k, v]) => {
    style[k] = v;
  });
  return style as unknown as React.CSSProperties;
}
