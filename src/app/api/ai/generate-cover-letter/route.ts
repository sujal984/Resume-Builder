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

    const { resumeData, jobTitle, companyName, jobDescription } = await req.json();

    if (!resumeData || !jobTitle) {
      return NextResponse.json(
        { error: "Resume data and job title are required" },
        { status: 400 }
      );
    }

    const resumeText = JSON.stringify(resumeData, null, 2);

    const prompt = `Generate a professional cover letter for a ${jobTitle} position${companyName ? ` at ${companyName}` : ""}.

Resume Summary:
${resumeText}

${jobDescription ? `Job Description:\n${jobDescription}\n` : ""}

Write a compelling, personalized cover letter that:
1. Opens with a strong hook
2. Highlights relevant experience and achievements from the resume
3. Shows enthusiasm for the role and company
4. Demonstrates cultural fit
5. Closes with a call to action

Keep it concise (3-4 paragraphs), professional, and tailored to the job.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert cover letter writer. Create compelling, personalized cover letters that showcase the candidate's strengths and fit for the role.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    });

    const coverLetter = completion.choices[0]?.message?.content?.trim();

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Cover Letter Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
