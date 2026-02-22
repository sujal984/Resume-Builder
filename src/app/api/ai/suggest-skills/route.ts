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

    const { jobTitle, currentSkills, industry } = await req.json();

    if (!jobTitle) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    const prompt = `Suggest relevant skills for a ${jobTitle} position${industry ? ` in the ${industry} industry` : ""}.
${currentSkills ? `\nCurrent skills: ${currentSkills.join(", ")}` : ""}

Provide a JSON response with:
{
  "technical": [<array of 5-8 technical skills>],
  "soft": [<array of 4-6 soft skills>],
  "trending": [<array of 3-5 trending/in-demand skills>]
}

Focus on industry-standard, ATS-friendly skill names.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a career advisor and skills expert. Suggest relevant, in-demand skills for job positions. Always respond with valid JSON only.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 400,
      response_format: { type: "json_object" },
    });

    const suggestions = JSON.parse(
      completion.choices[0]?.message?.content || "{}"
    );

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Skill Suggestion Error:", error);
    return NextResponse.json(
      { error: "Failed to suggest skills" },
      { status: 500 }
    );
  }
}
