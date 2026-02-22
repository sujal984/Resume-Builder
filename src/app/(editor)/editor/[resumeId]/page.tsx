import EditorLayoutClient from "@/components/editor/EditorLayoutClient";
import EditorSidebar from "@/components/editor/EditorSidebar";
import EditorCanvas from "@/components/editor/EditorCanvas";
import ResumePreviewWrapper from "@/components/editor/ResumePreviewWrapper";
import AISuggestionsPanel from "@/components/editor/AISuggestionsPanel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import EditorProvider from "@/components/editor/EditorProvider";

export default async function EditorPage({ params }: { params: Promise<{ resumeId: string }> }) {
    const session = await auth();
    if (!session?.user?.id) {
        redirect("/login");
    }

    const { resumeId } = await params;

    // Create-on-new support
    if (resumeId === "new") {
        const slug = `resume-${Date.now()}`;
        const defaultData = {
            id: "",
            title: "Untitled Resume",
            slug,
            sections: [
                {
                    id: "personal",
                    type: "personal",
                    title: "Personal Information",
                    isVisible: true,
                    items: [
                        {
                            id: "default-personal",
                            fullName: "",
                            email: "",
                            phone: "",
                            address: "",
                            jobTitle: "",
                            website: "",
                            linkedin: "",
                        },
                    ],
                },
                {
                    id: "summary",
                    type: "summary",
                    title: "Professional Summary",
                    isVisible: true,
                    items: [
                        {
                            id: "default-summary",
                            content: "",
                        },
                    ],
                },
                { id: "experience", type: "experience", title: "Work Experience", isVisible: true, items: [] },
                { id: "education", type: "education", title: "Education", isVisible: true, items: [] },
                { id: "skills", type: "skills", title: "Skills", isVisible: true, items: [] },
            ],
            themeColor: "#6366F1",
            fontFamily: "Inter",
            templateId: "professional",
            lineHeight: 1.6,
            sectionSpacing: 16,
            columnRatio: "30/70",
        };
        const inserted = await db
            .insert(resumes)
            .values({
                userId: session.user.id,
                title: "Untitled Resume",
                slug,
                data: defaultData,
                templateId: "professional",
            })
            .returning({ id: resumes.id });
        if (inserted?.[0]?.id) {
            redirect(`/editor/${inserted[0].id}`);
        }
    }

    const [resume] = await db
        .select()
        .from(resumes)
        .where(and(eq(resumes.id, resumeId), eq(resumes.userId, session.user.id)))
        .limit(1);

    if (!resume) {
        redirect("/dashboard");
    }

    return (
        <EditorProvider initialResume={resume}>
            <main className="flex-1 overflow-hidden flex flex-col h-screen">
                <EditorLayoutClient
                    Sidebar={<EditorSidebar />}
                    Canvas={<EditorCanvas />}
                    Preview={<ResumePreviewWrapper />}
                    AIPanel={<AISuggestionsPanel resumeData={resume.data} />}
                />
            </main>
        </EditorProvider>
    );
}
