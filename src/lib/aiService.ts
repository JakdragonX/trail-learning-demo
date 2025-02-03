import OpenAI from 'openai';
import { CourseTemplate, CourseModule } from './courseTemplate';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface CourseConfig {
  courseType: 'traditional' | 'college';
  title: string;
  moduleCount: number;
  examCount: number;
  includeNotes: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export async function generateCourseContent(config: CourseConfig): Promise<CourseTemplate> {
  const systemPrompt = `You are an expert course creator specializing in ${config.courseType} education.
Create a detailed course with ${config.moduleCount} modules following academic best practices.
The course should be at a ${config.difficulty} level.`;

  const modules: CourseModule[] = [];

  // Generate course overview
  const overviewResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: `Create a course overview for: ${config.title}. Include description and prerequisites.`
      }
    ]
  });

  // Parse overview response and create base course structure
  const overview = JSON.parse(overviewResponse.choices[0].message.content || '{}');

  // Generate each module
  for (let i = 0; i < config.moduleCount; i++) {
    const moduleResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `${systemPrompt}\nCreating module ${i + 1} of ${config.moduleCount}`
        },
        {
          role: "user",
          content: `Create a complete module for the course: ${config.title}. 
          Include lecture content, readings, videos, labs, and assessments.
          Return the response in JSON format matching the CourseModule interface.`
        }
      ]
    });

    const moduleContent = JSON.parse(moduleResponse.choices[0].message.content || '{}');
    modules.push(moduleContent);
  }

  // Generate final exam if needed
  let finalExam = undefined;
  if (config.examCount > 0) {
    const examResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Create a comprehensive final exam for the course: ${config.title}. 
          Include a mix of question types covering all modules.`
        }
      ]
    });

    finalExam = JSON.parse(examResponse.choices[0].message.content || '{}');
  }

  return {
    ...overview,
    modules,
    finalExam
  };
}