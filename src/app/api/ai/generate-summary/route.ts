import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@/auth";

const getOpenAI = () => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const openai = getOpenAI();
    if (!openai) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const { jobTitle, experience, skills, industry, achievements } = await req.json();

    if (!jobTitle) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    // Build a comprehensive prompt
    const prompt = `You are an expert resume writer and career coach. Generate a compelling, ATS-optimized professional summary for a resume.

Job Title: ${jobTitle}
${experience ? `Experience Level: ${experience}` : ""}
${skills ? `Key Skills: ${skills}` : ""}
${industry ? `Industry: ${industry}` : ""}
${achievements ? `Notable Achievements: ${achievements}` : ""}

Requirements:
1. Write in first person without using "I" or "my"
2. Keep it concise (3-4 sentences, 80-120 words)
3. Start with a strong opening that captures attention
4. Highlight unique value proposition and key strengths
5. Include quantifiable achievements if possible
6. Use action-oriented language and power words
7. Make it ATS-friendly with relevant keywords
8. End with career goals or what you bring to the role
9. Avoid clichés like "hard-working" or "team player"
10. Make it specific to the ${jobTitle} role

Write ONLY the professional summary, no additional text or formatting.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer with 15+ years of experience helping professionals land their dream jobs. You specialize in creating compelling, ATS-optimized professional summaries that highlight unique value propositions and quantifiable achievements. You write in a confident, professional tone that captures attention while remaining authentic and specific to each individual's experience."
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 250,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    const summary = completion.choices[0]?.message?.content?.trim();

    if (!summary) {
      throw new Error("No summary generated");
    }

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("AI Summary Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate summary" },
      { status: 500 }
    );
  }
}
