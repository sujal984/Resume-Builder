"use client";

import { useResumeStore } from "@/lib/stores/useResumeStore";
import ResumePreview from "@/components/resume/ResumePreview";

export default function ResumePreviewWrapper() {
    const { resumeData } = useResumeStore();

    return (
        <div className="flex-1 h-full overflow-hidden border-l">
            <ResumePreview data={resumeData} />
        </div>
    );
}
