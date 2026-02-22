"use client";

import { useState } from "react";
import { useResumeStore } from "@/lib/stores/useResumeStore";
import { cn } from "@/lib/utils";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  LayoutGrid,
  Palette,
  Plus,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ThemeSettings from "./ThemeSettings";
import { Collapse, Badge } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableSection from "./SortableSection";

export default function EditorSidebar() {
  const { resumeData, toggleSectionVisibility, reorderSection, addSection } =
    useResumeStore();
  const sections = resumeData.sections;

  const getIcon = (type: string) => {
    switch (type) {
      case "personal":
        return <User className="h-4 w-4" />;
      case "summary":
        return <FileText className="h-4 w-4" />;
      case "experience":
        return <Briefcase className="h-4 w-4" />;
      case "education":
        return <GraduationCap className="h-4 w-4" />;
      case "skills":
        return <Wrench className="h-4 w-4" />;
      default:
        return <LayoutGrid className="h-4 w-4" />;
    }
  };

  const getSectionItemCount = (section: any) => {
    if (section.type === "personal" || section.type === "summary") {
      return null;
    }
    return section.items?.length || 0;
  };

  return (
    <aside className="flex flex-col h-full bg-white">
      <Tabs defaultValue="content" className="w-full flex-1 flex flex-col">
        <div className="px-4 py-3 border-b bg-gray-50">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="content"
          className="flex-1 overflow-y-auto p-4 m-0 space-y-4"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Resume Sections
              </h2>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => addSection()}
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
            <DndContext
              onDragEnd={(event: DragEndEvent) => {
                const { active, over } = event;
                if (!over || active.id === over.id) return;
                const oldIndex = sections.findIndex(
                  (s) => s.id === String(active.id),
                );
                const newIndex = sections.findIndex(
                  (s) => s.id === String(over.id),
                );
                if (oldIndex >= 0 && newIndex >= 0)
                  reorderSection(oldIndex, newIndex);
              }}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <SortableSection key={section.id} id={section.id}>
                      <div
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-violet-50 border border-transparent hover:border-violet-200",
                          section.isVisible
                            ? "bg-white"
                            : "bg-gray-50 opacity-60",
                        )}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <div
                            className={cn(
                              "p-1.5 rounded-md",
                              section.isVisible
                                ? "bg-violet-100 text-violet-600"
                                : "bg-gray-200 text-gray-500",
                            )}
                          >
                            {getIcon(section.type)}
                          </div>
                          <span
                            className={cn(
                              "flex-1",
                              section.isVisible
                                ? "text-gray-900"
                                : "text-gray-500",
                            )}
                          >
                            {section.title}
                          </span>
                          {getSectionItemCount(section) !== null && (
                            <Badge
                              count={getSectionItemCount(section)}
                              showZero
                              className="bg-violet-100 text-violet-600"
                            />
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={() => toggleSectionVisibility(section.id)}
                          >
                            {section.isVisible ? (
                              <EyeOutlined className="h-3.5 w-3.5" />
                            ) : (
                              <EyeInvisibleOutlined className="h-3.5 w-3.5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </SortableSection>
                  ))}
                </nav>
              </SortableContext>
            </DndContext>
          </div>

          <div className="pt-4 border-t">
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-lg p-4 border border-violet-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                💡 Quick Tips
              </h3>
              <ul className="text-xs text-gray-600 space-y-1.5">
                <li>• Use action verbs to start bullet points</li>
                <li>• Quantify achievements with numbers</li>
                <li>• Keep it concise and relevant</li>
                <li>• Use AI to improve your content</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="design" className="flex-1 overflow-y-auto p-4 m-0">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Theme Settings
              </h2>
              <ThemeSettings />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-auto p-4 border-t bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>Auto-saved</span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Just now
          </span>
        </div>
      </div>
    </aside>
  );
}
