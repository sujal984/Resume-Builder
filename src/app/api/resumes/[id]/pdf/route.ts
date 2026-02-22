import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { PDFGenerator } from "@/lib/export/pdf-generator";
import { JSONResume } from "@/lib/templates/types";
import { resumeDataToJSONResume } from "@/lib/export/transform";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
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
    let jsonResume: JSONResume;
    if ((resume.data as any)?.sections) {
      jsonResume = resumeDataToJSONResume(resume.data as any);
    } else {
      jsonResume = resume.data as any;
    }

    // Generate PDF
    const pdfBuffer = await PDFGenerator.generatePDF(jsonResume, {
      template: resume.templateId || "modern",
      theme: {
        primaryColor: (resume.data as any)?.themeColor || "#6366F1",
        headingFont:
          (resume.data as any)?.fontFamily ||
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        bodyFont:
          (resume.data as any)?.fontFamily ||
          "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
        lineHeight: {
          heading: 1.3,
          body: (resume.data as any)?.lineHeight || 1.6,
        },
        spacingScale: {
          xs: 4,
          sm: 8,
          md: 12,
          lg: (resume.data as any)?.sectionSpacing || 16,
          xl: 24,
        },
      },
      format: "A4",
    });

    // Return PDF
    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${resume.title.replace(/[^a-z0-9]/gi, "_")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
