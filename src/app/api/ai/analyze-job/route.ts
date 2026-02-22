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

    const { jobDescription, resumeData } = await req.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    const resumeText = resumeData ? JSON.stringify(resumeData) : "";

    const prompt = `You are an expert ATS (Applicant Tracking System) analyzer and career coach.

Job Description:
${jobDescription}

${resumeText ? `Current Resume:\n${resumeText}\n` : ""}

Analyze this job description and provide:

1. **Required Keywords**: Extract the most important keywords and skills mentioned
2. **Skill Gaps**: If resume provided, identify missing skills
3. **ATS Match Score**: Calculate compatibility (0-100)
4. **Priority Skills**: Top 5 skills to highlight
5. **Recommendations**: Specific actions to improve match
6. **Red Flags**: Any concerns or missing qualifications
7. **Company Culture Insights**: What the job description reveals about company culture

Provide response as JSON:
{
  "matchScore": <number 0-100>,
  "requiredKeywords": {
    "technical": [<array of technical keywords>],
    "soft": [<array of soft skills>],
    "tools": [<array of tools/technologies>]
  },
  "skillGaps": [<array of missing skills>],
  "prioritySkills": [<top 5 skills to emphasize>],
  "recommendations": [<specific actionable recommendations>],
  "redFlags": [<concerns or missing qualifications>],
  "cultureInsights": [<company culture observations>],
  "experienceLevel": "<entry/mid/senior/executive>",
  "industryFocus": "<primary industry>"
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert ATS analyzer and career coach who helps job seekers optimize their resumes for specific job descriptions. You provide detailed, actionable insights and accurate match scoring."
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const analysis = JSON.parse(completion.choices[0]?.message?.content || "{}");

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("Job Analysis Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze job description" },
      { status: 500 }
    );
  }
}
