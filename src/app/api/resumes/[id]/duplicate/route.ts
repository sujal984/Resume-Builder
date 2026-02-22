import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const [originalResume] = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, session.user.id)))
      .limit(1);

    if (!originalResume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    const newTitle = `${originalResume.title} (Copy)`;
    const newSlug = `${originalResume.slug}-copy-${uuidv4().slice(0, 8)}`;

    const [duplicatedResume] = await db
      .insert(resumes)
      .values({
        userId: session.user.id,
        title: newTitle,
        slug: newSlug,
        data: originalResume.data,
        templateId: originalResume.templateId,
        themeConfig: originalResume.themeConfig,
      })
      .returning();

    return NextResponse.json({ resumeId: duplicatedResume.id });
  } catch (error) {
    console.error("Duplicate Resume Error:", error);
    return NextResponse.json(
      { error: "Failed to duplicate resume" },
      { status: 500 }
    );
  }
}
