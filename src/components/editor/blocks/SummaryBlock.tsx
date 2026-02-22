"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SummaryBlock() {
    const { resumeData, updateItem } = useResumeStore();
    const section = resumeData.sections.find((s) => s.id === "summary");
    const item = section?.items[0];

    if (!section || !item) return null;

    const handleChange = (value: string) => {
        updateItem(section.id, item.id, { content: value });
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
                id="summary"
                value={item.content || ""}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Briefly describe your professional background and goals..."
                className="min-h-[100px]"
            />
        </div>
    );
}
