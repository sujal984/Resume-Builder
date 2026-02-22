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
