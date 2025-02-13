import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You must analyze the following resume and provide feedback with ALL of the following sections. Do not skip any section:

      1. Summary – Briefly summarize the resume’s overall impression.
      2. Key Strengths – Highlight major strengths with brief explanations.
      3. Areas for Improvement – Pinpoint specific weaknesses and how to fix them.
      4. Skills Assessment – Evaluate skill relevance, depth, and industry demand.
      5. Overall Score – Give an objective score with justification.
      6. Specific Recommendations for Enhancement – Suggest precise improvements.

      Format your response with clear section headers and ensure all 6 sections are included.

      Resume:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const analysis = result.response.text() || "Analysis failed.";

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}