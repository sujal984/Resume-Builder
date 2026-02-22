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

    const { text, action = "improve" } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    let prompt = "";
    switch (action) {
      case "improve":
        prompt = `Improve this resume bullet point to be more impactful and professional:\n\n"${text}"\n\nMake it action-oriented, quantifiable, and achievement-focused. Use strong action verbs.`;
        break;
      case "grammar":
        prompt = `Fix grammar and improve clarity of this resume bullet point:\n\n"${text}"\n\nMaintain the original meaning but make it grammatically perfect and clear.`;
        break;
      case "ats":
        prompt = `Rewrite this resume bullet point to be ATS-friendly:\n\n"${text}"\n\nUse industry-standard keywords, avoid special characters, and make it easily parseable by ATS systems.`;
        break;
      case "impactful":
        prompt = `Make this resume bullet point more impactful and results-driven:\n\n"${text}"\n\nAdd metrics, quantify achievements, and emphasize business impact. Use the STAR method if applicable.`;
        break;
      default:
        prompt = `Improve this resume bullet point:\n\n"${text}"`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer. Improve bullet points to be concise, impactful, and ATS-friendly. Return only the improved bullet point without quotes or extra formatting.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const improved = completion.choices[0]?.message?.content?.trim();

    return NextResponse.json({ improved });
  } catch (error) {
    console.error("AI Bullet Improvement Error:", error);
    return NextResponse.json(
      { error: "Failed to improve bullet point" },
      { status: 500 }
    );
  }
}
