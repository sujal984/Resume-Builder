"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export default function SkillsBlock() {
    const { resumeData, addItem, removeItem, updateItem } = useResumeStore();
    const section = resumeData.sections.find((s) => s.id === "skills");

    if (!section) return null;

    const handleAdd = () => {
        addItem(section.id, {
            name: "New Skill",
            level: 3,
        });
    };

    const handleChange = (itemId: string, field: string, value: string) => {
        updateItem(section.id, itemId, { [field]: value });
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                        <Input
                            className="h-6 w-24 p-0 text-sm bg-transparent border-none focus-visible:ring-0"
                            value={item.name || ""}
                            onChange={(e) => handleChange(item.id, "name", e.target.value)}
                        />
                        <button
                            onClick={() => removeItem(section.id, item.id)}
                            className="text-muted-foreground hover:text-destructive"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Button>
        </div>
    );
}
