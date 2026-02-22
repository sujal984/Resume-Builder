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

    const { bullet, context } = await req.json();

    if (!bullet) {
      return NextResponse.json(
        { error: "Bullet point is required" },
        { status: 400 }
      );
    }

    const prompt = `You are an expert resume writer specializing in creating impactful, quantified achievement statements.

Original bullet point: "${bullet}"

${context?.jobTitle ? `Job Title: ${context.jobTitle}` : ""}
${context?.company ? `Company: ${context.company}` : ""}
${context?.industry ? `Industry: ${context.industry}` : ""}

Transform this bullet point following these rules:
1. Start with a strong action verb (Led, Developed, Increased, Reduced, etc.)
2. Add specific metrics and numbers (%, $, time saved, etc.)
3. Include the impact/result of the action
4. Use the STAR method (Situation, Task, Action, Result)
5. Keep it concise (1-2 lines maximum)
6. Make it ATS-friendly with relevant keywords
7. Avoid weak words like "helped", "assisted", "responsible for"
8. Quantify everything possible
9. Show business impact (revenue, efficiency, quality, etc.)
10. Use past tense for previous roles

Provide 3 enhanced versions:
1. Standard Enhancement (balanced)
2. Metric-Focused (heavy on numbers)
3. Impact-Focused (emphasizes results)

Format as JSON:
{
  "standard": "enhanced bullet point",
  "metricFocused": "metric-heavy version",
  "impactFocused": "impact-heavy version",
  "suggestions": ["tip 1", "tip 2", "tip 3"]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert resume writer who transforms weak bullet points into powerful, quantified achievement statements. You always provide specific metrics and demonstrate clear business impact."
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 400,
      response_format: { type: "json_object" },
    });

    const enhanced = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return NextResponse.json(enhanced);
  } catch (error: any) {
    console.error("AI Bullet Enhancement Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to enhance bullet point" },
      { status: 500 }
    );
  }
}
