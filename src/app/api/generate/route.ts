import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const config = await request.json();
    console.log('Received config:', config);

    // First, generate a response format example
    const formatExample = {
      title: "Example Course Title",
      description: "Course description example",
      modules: [{
        id: 1,
        title: "Module Example",
        description: "Module description example",
        content: {
          lecture: "Lecture content example",
          readings: [{ title: "Reading 1", pages: "1-10" }],
          videos: [{ title: "Video 1", duration: "10:00" }],
          exercises: ["Exercise 1"]
        },
        quiz: {
          questions: [{
            question: "Sample question?",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correct: 0,
            explanation: "Example explanation"
          }]
        }
      }]
    };

    const systemPrompt = `You are an expert course creator. Your task is to generate a course structure exactly matching this JSON format:
    ${JSON.stringify(formatExample, null, 2)}
    
    Rules:
    1. Your response must be valid JSON
    2. Follow the exact structure shown
    3. Generate ${config.moduleCount} modules
    4. Include ONLY the specified fields
    5. Do not add any explanation or text outside the JSON structure`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Create a ${config.courseType} course about: ${config.courseSpecs?.courseTitle || 'Default Course'}.
          Target audience: ${config.courseSpecs?.targetAudience || 'General audience'}.
          Description: ${config.courseSpecs?.courseDescription || 'No description provided'}.
          Include ${config.examCount} exams.
          ${config.includeNotes ? 'Include study notes.' : ''}`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }  // Add this to ensure JSON response
    });

    console.log('AI Response:', completion.choices[0].message.content);

    try {
      const generatedContent = JSON.parse(completion.choices[0].message.content || '{}');
      
      // Validate the response has the required structure
      if (!generatedContent.modules || !Array.isArray(generatedContent.modules)) {
        throw new Error('Invalid response structure');
      }

      return NextResponse.json({ 
        success: true,
        course: generatedContent
      });
    } catch (parseError) {
      console.error('Failed to parse AI response:', completion.choices[0].message.content);
      console.error('Parse error:', parseError);
      return NextResponse.json(
        { error: 'Failed to parse course content', details: parseError.message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Course generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate course content', details: error.message },
      { status: 500 }
    );
  }
}