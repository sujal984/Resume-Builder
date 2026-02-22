"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function EducationBlock() {
    const { resumeData, addItem, removeItem, updateItem } = useResumeStore();
    const section = resumeData.sections.find((s) => s.id === "education");

    if (!section) return null;

    const handleAdd = () => {
        addItem(section.id, {
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
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
                        <h4 className="text-sm font-semibold">Education</h4>
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
                            <Label htmlFor={`school-${item.id}`} className="text-xs">School / University</Label>
                            <Input
                                id={`school-${item.id}`}
                                value={item.school || ""}
                                onChange={(e) => handleChange(item.id, "school", e.target.value)}
                                placeholder="University of Tech"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`degree-${item.id}`} className="text-xs">Degree</Label>
                            <Input
                                id={`degree-${item.id}`}
                                value={item.degree || ""}
                                onChange={(e) => handleChange(item.id, "degree", e.target.value)}
                                placeholder="Bachelor of Science"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`start-${item.id}`} className="text-xs">Start Date</Label>
                            <Input
                                id={`start-${item.id}`}
                                value={item.startDate || ""}
                                onChange={(e) => handleChange(item.id, "startDate", e.target.value)}
                                placeholder="2016"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`end-${item.id}`} className="text-xs">End Date</Label>
                            <Input
                                id={`end-${item.id}`}
                                value={item.endDate || ""}
                                onChange={(e) => handleChange(item.id, "endDate", e.target.value)}
                                placeholder="2020"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
                <Plus className="mr-2 h-4 w-4" /> Add Education
            </Button>
        </div>
    );
}
