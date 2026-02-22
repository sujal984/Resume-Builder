"use client";

import { ResumeData } from "@/types/resume";
import { useResumeStore } from "@/lib/stores/useResumeStore";
import HtmlPreview from "@/lib/block-renderer/HtmlPreview";
import { resolveLayoutConfig } from "@/lib/template-engine/layouts";
import { DesignTokens } from "@/lib/design-tokens";
import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ResumePreview({ data }: { data: ResumeData }) {
  const { updateItem } = useResumeStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const handleEdit = (
    sectionId: string,
    itemId: string,
    field: string,
    value: string,
  ) => {
    updateItem(sectionId, itemId, { [field]: value });
  };

  const layout = resolveLayoutConfig(
    data.templateId || "modern",
    data.layoutMode,
    data.columnRatio,
  );

  const tokenOverrides: Partial<DesignTokens> = useMemo(
    () => ({
      lineHeight: {
        heading: 1.3,
        body: data.lineHeight || 1.6,
      },
      spacingScale: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: data.sectionSpacing || 16,
        xl: 24,
      },
    }),
    [data.lineHeight, data.sectionSpacing],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const check = () => {
      const page = el.querySelector(
        "div[style*='width: 794px']",
      ) as HTMLDivElement | null;
      if (page) {
        setIsOverflow(page.scrollHeight > page.clientHeight + 2);
      }
    };
    check();
    const id = setInterval(check, 500);
    return () => clearInterval(id);
  }, [data, layout, tokenOverrides]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full bg-muted/20 p-4 md:p-8 flex items-center justify-center relative"
    >
      {isOverflow && (
        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs px-3 py-1 rounded">
          Content exceeds one page
        </div>
      )}
      <HtmlPreview
        data={data}
        layout={layout}
        tokens={tokenOverrides}
        onEdit={handleEdit}
      />
    </div>
  );
}
