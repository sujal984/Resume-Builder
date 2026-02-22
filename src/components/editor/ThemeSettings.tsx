"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TEMPLATE_REGISTRY } from "@/lib/templates/registry";
import { Card } from "antd";
import { Slider } from "antd";

const PRESET_COLORS = [
  { name: "Indigo", value: "#6366F1" },
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#A855F7" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Orange", value: "#F97316" },
  { name: "Green", value: "#10B981" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Gray", value: "#6B7280" },
  { name: "Black", value: "#000000" },
];

const FONT_FAMILIES = [
  { name: "Inter", value: "Inter" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Lato", value: "Lato" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Poppins", value: "Poppins" },
  { name: "Raleway", value: "Raleway" },
  { name: "Playfair Display", value: "Playfair Display" },
  { name: "Merriweather", value: "Merriweather" },
  { name: "Source Sans Pro", value: "Source Sans Pro" },
  { name: "PT Sans", value: "PT Sans" },
  { name: "Nunito", value: "Nunito" },
];

const FONT_SIZES = [
  { name: "Small (10pt)", value: "10pt" },
  { name: "Medium (11pt)", value: "11pt" },
  { name: "Large (12pt)", value: "12pt" },
  { name: "Extra Large (14pt)", value: "14pt" },
];

const LINE_HEIGHTS = [
  { name: "Compact (1.2)", value: "1.2" },
  { name: "Normal (1.5)", value: "1.5" },
  { name: "Relaxed (1.8)", value: "1.8" },
  { name: "Loose (2.0)", value: "2.0" },
];

const MARGINS = [
  { name: "Narrow (0.5in)", value: "0.5in" },
  { name: "Normal (0.75in)", value: "0.75in" },
  { name: "Wide (1in)", value: "1in" },
];

export default function ThemeSettings() {
    const { resumeData, setResumeData } = useResumeStore();

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResumeData({ ...resumeData, themeColor: e.target.value });
    };

    const handlePresetColorChange = (color: string) => {
        setResumeData({ ...resumeData, themeColor: color });
    };

    const handleFontChange = (value: string) => {
        setResumeData({ ...resumeData, fontFamily: value });
    };

    const handleTemplateChange = (value: string) => {
        setResumeData({ ...resumeData, templateId: value });
    };

    const handleLineHeightChange = (value: string) => {
        const lh = parseFloat(value);
        setResumeData({ ...resumeData, lineHeight: isNaN(lh) ? resumeData.lineHeight : lh });
    };

    const handleSectionSpacingChange = (value: number) => {
        setResumeData({ ...resumeData, sectionSpacing: value });
    };

    const handleLayoutModeChange = (value: string) => {
        const mode = value === "single-column" ? "single-column" : "two-column";
        setResumeData({ ...resumeData, layoutMode: mode });
    };

    const handleColumnRatioChange = (value: string) => {
        const ratio = (["30/70", "40/60", "50/50"].includes(value) ? value : "30/70") as "30/70" | "40/60" | "50/50";
        setResumeData({ ...resumeData, columnRatio: ratio });
    };

    return (
        <div className="space-y-6 p-4">
            {/* Template Selection */}
            <Card title="Template" size="small" className="shadow-sm">
                <div className="space-y-2">
                    <Label>Choose Template</Label>
                    <Select value={resumeData.templateId || 'professional'} onValueChange={handleTemplateChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(TEMPLATE_REGISTRY).map((template) => (
                                <SelectItem key={template?.id} value={template?.id}>
                                    {template?.name} {template?.isPremium ? "⭐" : ""}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {/* Color Customization */}
            <Card title="Colors" size="small" className="shadow-sm">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Theme Color</Label>
                        <div className="flex gap-2 items-center">
                            <Input
                                type="color"
                                value={resumeData.themeColor}
                                onChange={handleColorChange}
                                className="w-12 h-12 p-1 rounded-md cursor-pointer"
                            />
                            <Input
                                type="text"
                                value={resumeData.themeColor}
                                onChange={handleColorChange}
                                className="flex-1"
                                placeholder="#000000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Preset Colors</Label>
                        <div className="grid grid-cols-5 gap-2">
                            {PRESET_COLORS.map((color) => (
                                <button
                                    key={color.value}
                                    onClick={() => handlePresetColorChange(color.value)}
                                    className={`w-full h-10 rounded-md border-2 transition-all hover:scale-110 ${
                                        resumeData.themeColor === color.value
                                            ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900"
                                            : "border-gray-300"
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Typography */}
            <Card title="Typography" size="small" className="shadow-sm">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Font Family</Label>
                        <Select value={resumeData.fontFamily} onValueChange={handleFontChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select font" />
                            </SelectTrigger>
                            <SelectContent>
                                {FONT_FAMILIES.map((font) => (
                                    <SelectItem key={font.value} value={font.value}>
                                        <span style={{ fontFamily: font.value }}>{font.name}</span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Select defaultValue="11pt">
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                {FONT_SIZES.map((size) => (
                                    <SelectItem key={size.value} value={size.value}>
                                        {size.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Line Height</Label>
                        <Select value={(resumeData.lineHeight || 1.6).toString()} onValueChange={handleLineHeightChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select line height" />
                            </SelectTrigger>
                            <SelectContent>
                                {LINE_HEIGHTS.map((height) => (
                                    <SelectItem key={height.value} value={height.value}>
                                        {height.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Layout */}
            <Card title="Layout" size="small" className="shadow-sm">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Page Margins</Label>
                        <Select defaultValue="0.75in">
                            <SelectTrigger>
                                <SelectValue placeholder="Select margins" />
                            </SelectTrigger>
                            <SelectContent>
                                {MARGINS.map((margin) => (
                                    <SelectItem key={margin.value} value={margin.value}>
                                        {margin.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Section Spacing</Label>
                        <Slider
                            value={resumeData.sectionSpacing || 16}
                            onChange={handleSectionSpacingChange}
                            min={8}
                            max={32}
                            marks={{
                                8: "Tight",
                                16: "Normal",
                                24: "Relaxed",
                                32: "Loose",
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Layout Mode</Label>
                        <Select value={resumeData.layoutMode || "two-column"} onValueChange={handleLayoutModeChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select layout" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="single-column">Single Column</SelectItem>
                                <SelectItem value="two-column">Two Column</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Column Ratio</Label>
                        <Select value={resumeData.columnRatio || "30/70"} onValueChange={handleColumnRatioChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select ratio" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30/70">30 / 70</SelectItem>
                                <SelectItem value="40/60">40 / 60</SelectItem>
                                <SelectItem value="50/50">50 / 50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Advanced Options */}
            <Card title="Advanced" size="small" className="shadow-sm">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Header Style</Label>
                        <Select defaultValue="bold">
                            <SelectTrigger>
                                <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bold">Bold</SelectItem>
                                <SelectItem value="uppercase">Uppercase</SelectItem>
                                <SelectItem value="underline">Underline</SelectItem>
                                <SelectItem value="colored">Colored</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Bullet Style</Label>
                        <Select defaultValue="disc">
                            <SelectTrigger>
                                <SelectValue placeholder="Select bullet" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="disc">• Disc</SelectItem>
                                <SelectItem value="circle">○ Circle</SelectItem>
                                <SelectItem value="square">▪ Square</SelectItem>
                                <SelectItem value="arrow">→ Arrow</SelectItem>
                                <SelectItem value="check">✓ Check</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Date Format</Label>
                        <Select defaultValue="mmm-yyyy">
                            <SelectTrigger>
                                <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mmm-yyyy">Jan 2024</SelectItem>
                                <SelectItem value="mm-yyyy">01/2024</SelectItem>
                                <SelectItem value="yyyy-mm">2024-01</SelectItem>
                                <SelectItem value="full">January 2024</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>

            {/* Tips */}
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-800 font-medium mb-1">💡 Design Tips:</p>
                <ul className="text-xs text-blue-700 space-y-1 ml-3">
                    <li>• Use professional colors (blue, gray, black)</li>
                    <li>• Keep fonts readable (11-12pt)</li>
                    <li>• Maintain consistent spacing</li>
                    <li>• Test print preview before downloading</li>
                </ul>
            </div>
        </div>
    );
}
