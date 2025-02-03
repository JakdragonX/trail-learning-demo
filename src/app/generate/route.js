import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { moduleTitle } = body;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful course content creator."
        },
        {
          role: "user",
          content: `Generate a brief course module description for: ${moduleTitle}`
        }
      ]
    });

    return NextResponse.json({ 
      description: completion.choices[0].message.content 
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate description' },
      { status: 500 }
    );
  }
}