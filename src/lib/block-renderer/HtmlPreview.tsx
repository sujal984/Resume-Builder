import React, { useMemo, useState } from "react";
import { ResumeData, ResumeItem } from "@/types/resume";
import {
  DesignTokens,
  defaultTokens,
  mergeTokens,
  tokensToCSSVars,
  cssVarsStyle,
} from "@/lib/design-tokens";
import { LayoutConfig } from "@/lib/layout-engine/types";
import { gridTemplateColumns, areaForSection } from "@/lib/layout-engine/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useResumeStore } from "@/lib/stores/useResumeStore";

type HtmlPreviewProps = {
  data: ResumeData;
  layout: LayoutConfig;
  tokens?: Partial<DesignTokens>;
  onEdit?: (
    sectionId: string,
    itemId: string,
    field: string,
    value: string,
  ) => void;
};

type PersonalItem = {
  fullName?: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  linkedin?: string;
};

function toStr(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

export function HtmlPreview({
  data,
  layout,
  tokens,
  onEdit,
}: HtmlPreviewProps) {
  const { reorderSection, setResumeData } = useResumeStore();
  const [overrides, setOverrides] = useState<Partial<DesignTokens>>({});
  const mergedTokens = mergeTokens(defaultTokens, {
    primaryColor: data.themeColor || defaultTokens.primaryColor,
    fontFamily: data.fontFamily || defaultTokens.fontFamily,
    ...(tokens || {}),
  });
  const effectiveTokens = useMemo(
    () => mergeTokens(mergedTokens, overrides),
    [mergedTokens, overrides],
  );
  const vars = tokensToCSSVars(effectiveTokens);
  const gridCols = gridTemplateColumns(layout);

  const personal = data.sections.find((s) => s.type === "personal");

  const renderSectionHeader = (title: string) => {
    return (
      <div
        style={{
          marginBottom: "var(--space-sm)",
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
        }}
      >
        <span
          style={{
            fontSize: "var(--font-h3)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            color: "var(--color-primary)",
          }}
        >
          {title}
        </span>
        <span
          style={{
            flex: 1,
            height: 1,
            background: "rgba(99,102,241,0.25)",
          }}
        />
      </div>
    );
  };

  const onContentEdit =
    (sectionId: string, itemId: string, field: string) =>
    (e: React.FormEvent<HTMLDivElement>) => {
      const text = (e.target as HTMLDivElement).innerText;
      onEdit?.(sectionId, itemId, field, text);
    };

  const formatMonth = (ym?: string): string => {
    if (!ym) return "";
    const [y, m] = ym.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const mi = Number(m);
    const mm = mi >= 1 && mi <= 12 ? monthNames[mi - 1] : "";
    return [mm, y].filter(Boolean).join(" ");
  };

  const applyExec = (command: string, value?: string) => {
    try {
      document.execCommand(command, false, value);
    } catch {}
  };

  const applySelectionColor = (color: string) => {
    applyExec("foreColor", color);
  };

  const handlePrimaryColorChange = (color: string) => {
    setOverrides((o) => ({ ...o, primaryColor: color }));
    setResumeData({ ...data, themeColor: color });
  };

  const handleFontFamilyChange = (family: string) => {
    setOverrides((o) => ({
      ...o,
      fontFamily: family,
      bodyFont: family,
      headingFont: family,
    }));
    setResumeData({ ...data, fontFamily: family });
  };

  const handleFontScaleChange = (
    key: keyof DesignTokens["fontScale"],
    value: number,
  ) => {
    setOverrides((o) => ({
      ...o,
      fontScale: { ...(o.fontScale || mergedTokens.fontScale), [key]: value },
    }));
  };

  const handleLineHeightChange = (
    key: keyof DesignTokens["lineHeight"],
    value: number,
  ) => {
    setOverrides((o) => ({
      ...o,
      lineHeight: {
        ...(o.lineHeight || mergedTokens.lineHeight),
        [key]: value,
      },
    }));
  };

  return (
    <div
      style={{
        ...cssVarsStyle(vars),
        fontFamily: "var(--font-body)",
        color: "#111",
        background: "#fff",
        width: "794px",
        minHeight: "1123px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
        borderRadius: "var(--radius)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 12,
          top: 12,
          zIndex: 30,
          background: "rgba(255,255,255,0.95)",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          padding: 12,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Primary</span>
          <input
            type="color"
            value={effectiveTokens.primaryColor}
            onChange={(e) => handlePrimaryColorChange(e.target.value)}
            style={{
              width: 28,
              height: 20,
              padding: 0,
              border: "none",
              background: "transparent",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Font</span>
          <select
            value={effectiveTokens.fontFamily}
            onChange={(e) => handleFontFamilyChange(e.target.value)}
            style={{
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
            }}
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
            <option value="Lato">Lato</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Poppins">Poppins</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>H1</span>
          <input
            type="number"
            value={effectiveTokens.fontScale.h1}
            onChange={(e) =>
              handleFontScaleChange("h1", Number(e.target.value))
            }
            style={{
              width: 60,
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>H2</span>
          <input
            type="number"
            value={effectiveTokens.fontScale.h2}
            onChange={(e) =>
              handleFontScaleChange("h2", Number(e.target.value))
            }
            style={{
              width: 60,
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>Body</span>
          <input
            type="number"
            value={effectiveTokens.fontScale.body}
            onChange={(e) =>
              handleFontScaleChange("body", Number(e.target.value))
            }
            style={{
              width: 60,
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>LH</span>
          <input
            type="number"
            step="0.1"
            value={effectiveTokens.lineHeight.body}
            onChange={(e) =>
              handleLineHeightChange("body", Number(e.target.value))
            }
            style={{
              width: 60,
              fontSize: 12,
              padding: "2px 6px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button
            onClick={() => applyExec("bold")}
            style={{
              fontSize: 12,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
            }}
          >
            Bold
          </button>
          <button
            onClick={() => applyExec("italic")}
            style={{
              fontSize: 12,
              padding: "4px 8px",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
            }}
          >
            Italic
          </button>
          <input
            type="color"
            onChange={(e) => applySelectionColor(e.target.value)}
            style={{
              width: 28,
              height: 20,
              padding: 0,
              border: "none",
              background: "transparent",
            }}
            title="Selection color"
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridCols || "1fr",
          gap: "var(--space-lg)",
          padding: "32px",
        }}
      >
        {["left", "main", "right", "sidebar"].map((area) => {
          const areaSections = data.sections.filter(
            (s) => s.isVisible && areaForSection(layout, s.type) === area,
          );
          if (areaSections.length === 0) return null;
          return (
            <div
              key={area}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-lg)",
              }}
            >
              <DndContext
                onDragEnd={(event: DragEndEvent) => {
                  const { active, over } = event;
                  if (!over || active.id === over.id) return;
                  const ids = areaSections.map((s) => s.id);
                  const oldIndex = ids.indexOf(String(active.id));
                  const newIndex = ids.indexOf(String(over.id));
                  if (oldIndex >= 0 && newIndex >= 0)
                    reorderSection(oldIndex, newIndex);
                }}
              >
                <SortableContext
                  items={areaSections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {areaSections.map((section) => (
                    <SortableSection key={section.id} id={section.id}>
                      {renderSectionHeader(section.title)}

                      {section.type === "personal" && (
                        <div style={{ marginBottom: "var(--space-lg)" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "var(--space-xs)",
                              borderBottom: "2px solid var(--color-primary)",
                              paddingBottom: "var(--space-sm)",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "var(--font-h1)",
                                fontWeight: 800,
                                lineHeight: "var(--lh-heading)",
                              }}
                              contentEditable
                              suppressContentEditableWarning
                              onInput={onContentEdit(
                                "personal",
                                section.items[0]?.id || "default-personal",
                                "fullName",
                              )}
                            >
                              {toStr(
                                (section.items[0] as PersonalItem)?.fullName,
                              ) || "Your Name"}
                            </div>
                            <div
                              style={{
                                fontSize: "var(--font-h2)",
                                color: "var(--color-primary)",
                              }}
                            >
                              {toStr(
                                (section.items[0] as PersonalItem)?.jobTitle,
                              ) || "Professional Title"}
                            </div>
                            <div
                              style={{
                                fontSize: "var(--font-small)",
                                color: "#666",
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap",
                              }}
                            >
                              {toStr(
                                (section.items[0] as PersonalItem)?.email,
                              ) && (
                                <span>
                                  ✉️{" "}
                                  {toStr(
                                    (section.items[0] as PersonalItem)?.email,
                                  )}
                                </span>
                              )}
                              {toStr(
                                (section.items[0] as PersonalItem)?.phone,
                              ) && (
                                <span>
                                  ☎️{" "}
                                  {toStr(
                                    (section.items[0] as PersonalItem)?.phone,
                                  )}
                                </span>
                              )}
                              {toStr(
                                (section.items[0] as PersonalItem)?.website,
                              ) && (
                                <span>
                                  🔗{" "}
                                  {toStr(
                                    (section.items[0] as PersonalItem)?.website,
                                  )}
                                </span>
                              )}
                              {toStr(
                                (section.items[0] as PersonalItem)?.linkedin,
                              ) && (
                                <span>
                                  💼{" "}
                                  {toStr(
                                    (section.items[0] as PersonalItem)
                                      ?.linkedin,
                                  )}
                                </span>
                              )}
                              {toStr(
                                (section.items[0] as PersonalItem)?.address,
                              ) && (
                                <span>
                                  📍{" "}
                                  {toStr(
                                    (section.items[0] as PersonalItem)?.address,
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {section.type === "summary" &&
                        !!toStr(section.items[0]?.content) && (
                          <div
                            style={{
                              fontSize: "var(--font-size-body)",
                              lineHeight: "var(--lh-body)",
                              textAlign: "justify",
                            }}
                            contentEditable
                            suppressContentEditableWarning
                            onInput={onContentEdit(
                              "summary",
                              section.items[0].id,
                              "content",
                            )}
                          >
                            {toStr(section.items[0].content)}
                          </div>
                        )}

                      {section.type === "experience" &&
                        section.items.map((item) => (
                          <div
                            key={item.id}
                            style={{ marginBottom: "var(--space-md)" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "var(--space-xs)",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    fontWeight: 700,
                                    fontSize: "var(--font-h3)",
                                  }}
                                >
                                  {toStr(
                                    (item as ResumeItem).position ||
                                      (item as ResumeItem).title,
                                  )}
                                </div>
                                <div
                                  style={{
                                    color: "var(--color-primary)",
                                    fontWeight: 600,
                                  }}
                                >
                                  {toStr(item.company)}
                                </div>
                              </div>
                              <div
                                style={{
                                  color: "#666",
                                  fontSize: "var(--font-size-small)",
                                }}
                              >
                                {(() => {
                                  const start = formatMonth(
                                    toStr((item as ResumeItem).startDate),
                                  );
                                  const isCurrent = Boolean(
                                    (item as ResumeItem).current,
                                  );
                                  const endRaw = formatMonth(
                                    toStr((item as ResumeItem).endDate),
                                  );
                                  const end =
                                    isCurrent || !endRaw ? "Present" : endRaw;
                                  return [start, end]
                                    .filter(Boolean)
                                    .join(" - ");
                                })()}
                              </div>
                            </div>
                            {toStr(item.description) && (
                              <div
                                style={{
                                  fontSize: "var(--font-size-body)",
                                  lineHeight: "var(--lh-body)",
                                }}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={onContentEdit(
                                  "experience",
                                  item.id,
                                  "description",
                                )}
                              >
                                {toStr(item.description)}
                              </div>
                            )}
                            {Array.isArray((item as ResumeItem).highlights) &&
                              ((item as ResumeItem).highlights as string[])
                                .length > 0 && (
                                <ul
                                  style={{
                                    marginTop: "var(--space-xs)",
                                    paddingLeft: "1rem",
                                    listStyle: "disc",
                                  }}
                                >
                                  {(
                                    (item as ResumeItem).highlights as string[]
                                  ).map((h: unknown, idx: number) => (
                                    <li
                                      key={idx}
                                      style={{
                                        fontSize: "var(--font-size-body)",
                                        lineHeight: "var(--lh-body)",
                                      }}
                                    >
                                      {toStr(h)}
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </div>
                        ))}

                      {section.type === "education" &&
                        section.items.map((item) => (
                          <div
                            key={item.id}
                            style={{ marginBottom: "var(--space-md)" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "var(--space-xs)",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    fontWeight: 700,
                                    fontSize: "var(--font-h3)",
                                  }}
                                >
                                  {toStr(item.studyType)} in {toStr(item.area)}
                                </div>
                                <div
                                  style={{
                                    color: "var(--color-primary)",
                                    fontWeight: 600,
                                  }}
                                >
                                  {toStr(
                                    (item as ResumeItem).institution ||
                                      (item as ResumeItem).school,
                                  )}
                                </div>
                              </div>
                              <div
                                style={{
                                  color: "#666",
                                  fontSize: "var(--font-size-small)",
                                }}
                              >
                                {[
                                  formatMonth(
                                    toStr((item as ResumeItem).startDate),
                                  ),
                                  formatMonth(
                                    toStr((item as ResumeItem).endDate),
                                  ) || "Present",
                                ]
                                  .filter(Boolean)
                                  .join(" - ")}
                              </div>
                            </div>
                            {toStr(item.score) && (
                              <div>GPA: {toStr(item.score)}</div>
                            )}
                          </div>
                        ))}

                      {section.type === "skills" && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "var(--space-sm)",
                          }}
                        >
                          {section.items.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                background: "#F3F4F6",
                                padding: "6px 12px",
                                borderRadius: "var(--radius)",
                                fontSize: "var(--font-size-small)",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                              }}
                            >
                              <span>{toStr(item.name)}</span>
                              {typeof (item as ResumeItem).level ===
                                "number" && (
                                <div style={{ display: "flex", gap: 2 }}>
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <span
                                      key={i}
                                      style={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: 2,
                                        background:
                                          i < (item as ResumeItem).level!
                                            ? "var(--color-primary)"
                                            : "#CBD5E1",
                                      }}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </SortableSection>
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HtmlPreview;

function SortableSection({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: "relative",
    border: "1px dashed transparent",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.border =
          "1px dashed rgba(79,70,229,0.5)";
        (e.currentTarget as HTMLDivElement).style.borderRadius = "6px";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.border =
          "1px dashed transparent";
      }}
    >
      <div style={{ opacity: isDragging ? 0.6 : 1 }}>{children}</div>
      {isDragging && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            border: "2px solid rgba(79,70,229,0.6)",
            borderRadius: 6,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
