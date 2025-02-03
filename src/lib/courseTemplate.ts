interface CourseModule {
    title: string;
    description: string;
    learningObjectives: string[];
    content: {
      lecture: string;
      readings: Array<{
        title: string;
        content: string;
        estimatedTime: string;
      }>;
      videos: Array<{
        title: string;
        description: string;
        duration: string;
      }>;
      labs: Array<{
        title: string;
        instructions: string;
        objectives: string[];
        tasks: string[];
      }>;
    };
    assessment: {
      quiz: Array<{
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      }>;
      exercises: string[];
    };
  }
  
  interface CourseTemplate {
    title: string;
    description: string;
    targetAudience: string;
    prerequisites: string[];
    modules: CourseModule[];
    finalExam?: {
      questions: Array<{
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      }>;
    };
  }
  
  export type { CourseTemplate, CourseModule };