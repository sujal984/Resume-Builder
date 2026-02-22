import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { resumes } from "@/lib/db/schema";
import { v4 as uuidv4 } from "uuid";
import { initialResumeState } from "@/types/resume";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${uuidv4().slice(0, 8)}`;

    const [newResume] = await db
      .insert(resumes)
      .values({
        userId: session.user.id,
        title,
        slug,
        data: initialResumeState,
        templateId: "professional",
        themeConfig: {
          color: "#6366F1",
          fontFamily: "Inter",
        },
      })
      .returning();

    return NextResponse.json({ resumeId: newResume.id });
  } catch (error) {
    console.error("Create Resume Error:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 }
    );
  }
}
