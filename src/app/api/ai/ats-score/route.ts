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

    const { resumeData, jobDescription } = await req.json();

    if (!resumeData) {
      return NextResponse.json(
        { error: "Resume data is required" },
        { status: 400 }
      );
    }

    const resumeText = JSON.stringify(resumeData, null, 2);

    const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility and provide a score from 0-100.
${jobDescription ? `\nJob Description:\n${jobDescription}\n` : ""}

Resume:
${resumeText}

Provide a JSON response with:
{
  "score": <number 0-100>,
  "strengths": [<array of 3-5 strengths>],
  "improvements": [<array of 3-5 specific improvements>],
  "keywords": {
    "found": [<keywords found in resume>],
    "missing": [<important keywords missing>]
  },
  "formatting": {
    "score": <number 0-100>,
    "issues": [<formatting issues if any>]
  }
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an ATS expert. Analyze resumes for ATS compatibility, keyword optimization, and formatting. Always respond with valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 800,
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(
      completion.choices[0]?.message?.content || "{}"
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("ATS Score Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
