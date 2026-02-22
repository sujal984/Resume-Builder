import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { DOCXGenerator } from "@/lib/export/docx-generator";
import { JSONResume } from "@/lib/templates/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const [resume] = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, session.user.id)))
      .limit(1);

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 });
    }

    // Convert resume data to JSON Resume format
    const jsonResume: JSONResume = resume.data as any;

    // Generate DOCX
    const docxBuffer = await DOCXGenerator.generateDOCX(jsonResume);

    // Return DOCX
    return new NextResponse(Buffer.from(docxBuffer), {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${resume.title.replace(/[^a-z0-9]/gi, '_')}.docx"`,
      },
    });
  } catch (error) {
    console.error("DOCX Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate DOCX" },
      { status: 500 }
    );
  }
}
