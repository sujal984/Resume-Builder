import { JSONResume } from "@/lib/templates/types";
import { DesignTokens, defaultTokens, mergeTokens } from "@/lib/design-tokens";
import { LayoutConfig } from "@/lib/layout-engine/types";
import { gridTemplateColumns } from "@/lib/layout-engine/utils";

export function tokensToCSS(tokens: DesignTokens): string {
  return `
    :root{
      --color-primary:${tokens.primaryColor};
      --color-secondary:${tokens.secondaryColor};
      --color-accent:${tokens.accentColor || tokens.primaryColor};
      --font-heading:${tokens.headingFont};
      --font-body:${tokens.bodyFont};
      --font-h1:${tokens.fontScale.h1}pt;
      --font-h2:${tokens.fontScale.h2}pt;
      --font-h3:${tokens.fontScale.h3}pt;
      --font-size-body:${tokens.fontScale.body}pt;
      --font-size-small:${tokens.fontScale.small}pt;
      --space-xs:${tokens.spacingScale.xs}px;
      --space-sm:${tokens.spacingScale.sm}px;
      --space-md:${tokens.spacingScale.md}px;
      --space-lg:${tokens.spacingScale.lg}px;
      --space-xl:${tokens.spacingScale.xl}px;
      --radius:${tokens.borderRadius}px;
      --lh-heading:${tokens.lineHeight.heading};
      --lh-body:${tokens.lineHeight.body};
    }
    body{font-family:${tokens.bodyFont}; color:#111;}
  `;
}

export function generateHTMLFromJSON(
  resume: JSONResume,
  layout: LayoutConfig,
  tokens?: Partial<DesignTokens>,
): string {
  const merged = mergeTokens(defaultTokens, tokens);
  const gridCols = gridTemplateColumns(layout) || "1fr";

  const headerHTML = `
    <div style="margin-bottom:var(--space-lg)">
      <div style="display:flex;flex-direction:column;gap:var(--space-xs);border-bottom:2px solid var(--color-primary);padding-bottom:var(--space-sm)">
        <div style="font-size:var(--font-h1);font-weight:800;line-height:var(--lh-heading)">${resume.basics.name || "Your Name"}</div>
        <div style="font-size:var(--font-h2);color:var(--color-primary)">${resume.basics.label || "Professional Title"}</div>
        <div style="font-size:var(--font-size-small);color:#666">
          ${[resume.basics.email, resume.basics.phone, resume.basics.location?.city].filter(Boolean).join(" • ")}
        </div>
      </div>
    </div>
  `;

  const sectionHeader = (title: string) => `
    <div style="margin-bottom:var(--space-sm);display:flex;align-items:center;gap:var(--space-sm)">
      <span style="font-size:var(--font-h3);font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--color-primary)">${title}</span>
      <span style="flex:1;height:1px;background:rgba(99,102,241,.25)"></span>
    </div>
  `;

  const summaryHTML = resume.basics.summary
    ? `
      <div>
        ${sectionHeader("Professional Summary")}
        <div style="font-size:var(--font-size-body);line-height:var(--lh-body);text-align:justify">${resume.basics.summary}</div>
      </div>`
    : "";

  const experienceHTML =
    resume.work && resume.work.length
      ? `
      <div>
        ${sectionHeader("Work Experience")}
        ${resume.work
          .map(
            (job) => `
          <div style="margin-bottom:var(--space-md)">
            <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs)">
              <div>
                <div style="font-weight:700;font-size:var(--font-h3)">${job.position}</div>
                <div style="color:var(--color-primary);font-weight:600">${job.name}</div>
              </div>
              <div style="color:#666;font-size:var(--font-size-small)">${job.startDate} - ${job.endDate || "Present"}</div>
            </div>
            ${
              job.highlights && job.highlights.length
                ? `<ul style="margin-left:20px">${job.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>`
                : ""
            }
          </div>
        `,
          )
          .join("")}
      </div>`
      : "";

  const educationHTML =
    resume.education && resume.education.length
      ? `
      <div>
        ${sectionHeader("Education")}
        ${resume.education
          .map(
            (edu) => `
          <div style="margin-bottom:var(--space-md)">
            <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-xs)">
              <div>
                <div style="font-weight:700;font-size:var(--font-h3)">${edu.studyType} in ${edu.area}</div>
                <div style="color:var(--color-primary);font-weight:600">${edu.institution}</div>
              </div>
              <div style="color:#666;font-size:var(--font-size-small)">${edu.startDate} - ${edu.endDate || "Present"}</div>
            </div>
            ${edu.score ? `<div>GPA: ${edu.score}</div>` : ""}
          </div>
        `,
          )
          .join("")}
      </div>`
      : "";

  const skillsHTML =
    resume.skills && resume.skills.length
      ? `
      <div>
        ${sectionHeader("Skills")}
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-sm)">
          ${resume.skills
            .map(
              (skill) =>
                `<div style="background:#F3F4F6;padding:6px 12px;border-radius:var(--radius);font-size:var(--font-size-small)">${skill.name}</div>`,
            )
            .join("")}
        </div>
      </div>`
      : "";

  const leftColumn = [educationHTML, skillsHTML].filter(Boolean).join("");
  const rightColumn = [headerHTML, summaryHTML, experienceHTML]
    .filter(Boolean)
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    ${tokensToCSS(merged)}
    .page{
      width:794px;min-height:1123px;background:#fff;border-radius:var(--radius);
      box-shadow:0 8px 24px rgba(0,0,0,.08);overflow:hidden;
    }
    .grid{display:grid;grid-template-columns:${gridCols};gap:var(--space-lg);padding:32px}
  </style>
</head>
<body>
  <div class="page">
    <div class="grid">
      ${
        layout.type === "two-column"
          ? `<div>${leftColumn}</div><div>${rightColumn}</div>`
          : `${rightColumn}`
      }
    </div>
  </div>
</body>
</html>`;
}
