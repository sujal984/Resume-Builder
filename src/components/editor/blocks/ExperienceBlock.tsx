"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ResumeItem } from "@/types/resume";

export default function ExperienceBlock() {
    const { resumeData, addItem, removeItem, updateItem } = useResumeStore();
    const section = resumeData.sections.find((s) => s.id === "experience");

    if (!section) return null;

    const handleAdd = () => {
        addItem(section.id, {
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
        });
    };

    const handleChange = (itemId: string, field: string, value: string) => {
        updateItem(section.id, itemId, { [field]: value });
    };

    return (
        <div className="space-y-4">
            {section.items.map((item) => (
                <div key={item.id} className="rounded-lg border p-4 space-y-3 bg-card">
                    <div className="flex justify-between items-start">
                        <h4 className="text-sm font-semibold">Position</h4>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive h-6 w-6"
                            onClick={() => removeItem(section.id, item.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="space-y-1">
                            <Label htmlFor={`title-${item.id}`} className="text-xs">Job Title</Label>
                            <Input
                                id={`title-${item.id}`}
                                value={item.title || ""}
                                onChange={(e) => handleChange(item.id, "title", e.target.value)}
                                placeholder="Senior Developer"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`company-${item.id}`} className="text-xs">Company</Label>
                            <Input
                                id={`company-${item.id}`}
                                value={item.company || ""}
                                onChange={(e) => handleChange(item.id, "company", e.target.value)}
                                placeholder="Acme Corp"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`start-${item.id}`} className="text-xs">Start Date</Label>
                            <Input
                                id={`start-${item.id}`}
                                value={item.startDate || ""}
                                onChange={(e) => handleChange(item.id, "startDate", e.target.value)}
                                placeholder="Jan 2020"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`end-${item.id}`} className="text-xs">End Date</Label>
                            <Input
                                id={`end-${item.id}`}
                                value={item.endDate || ""}
                                onChange={(e) => handleChange(item.id, "endDate", e.target.value)}
                                placeholder="Present"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor={`desc-${item.id}`} className="text-xs">Description</Label>
                        <Textarea
                            id={`desc-${item.id}`}
                            value={item.description || ""}
                            onChange={(e) => handleChange(item.id, "description", e.target.value)}
                            placeholder="Key responsibilities and achievements..."
                        />
                    </div>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> Add Position
            </Button>
        </div>
    );
}
