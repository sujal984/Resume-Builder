"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PersonalInfoBlock() {
    const { resumeData, updateItem } = useResumeStore();
    const section = resumeData.sections.find((s) => s.id === "personal");
    const item = section?.items[0];

    if (!section || !item) return null;

    const handleChange = (field: string, value: string) => {
        updateItem(section.id, item.id, { [field]: value });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        value={item.fullName || ""}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={item.email || ""}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={item.phone || ""}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                        id="jobTitle"
                        value={item.jobTitle || ""}
                        onChange={(e) => handleChange("jobTitle", e.target.value)}
                        placeholder="Software Engineer"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        value={item.website || ""}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://johndoe.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        value={item.linkedin || ""}
                        onChange={(e) => handleChange("linkedin", e.target.value)}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
            </div>
        </div>
    );
}
