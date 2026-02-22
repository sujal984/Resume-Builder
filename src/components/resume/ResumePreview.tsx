"use client";

import dynamic from "next/dynamic";
import { ResumeData } from "@/types/resume";
import { Loader2 } from "lucide-react";

// Dynamically import PDFViewer to avoid server-side rendering issues
const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        ),
    }
);

import ResumePDF from "./ResumePDF";

export default function ResumePreview({ data }: { data: ResumeData }) {
    return (
        <div className="h-full w-full bg-muted/20 p-4 md:p-8 flex items-center justify-center">
            <PDFViewer width="100%" height="100%" className="min-h-[500px] shadow-lg rounded-md border">
                <ResumePDF data={data} />
            </PDFViewer>
        </div>
    );
}
