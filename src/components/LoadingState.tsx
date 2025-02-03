"use client"

import React from 'react';
import { BookOpen, Layout, FileText, Video, Brain } from 'lucide-react';

const LoadingState = ({ currentTask }) => {
  const tasks = [
    { icon: Layout, text: "Structuring course outline..." },
    { icon: BookOpen, text: "Generating learning materials..." },
    { icon: FileText, text: "Creating assessments..." },
    { icon: Video, text: "Curating video content..." },
    { icon: Brain, text: "Finalizing course content..." }
  ];

  const getCurrentTaskIndex = () => {
    return Math.min(
      tasks.findIndex(task => task.text.toLowerCase().includes(currentTask?.toLowerCase())) + 1,
      tasks.length - 1
    );
  };

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="text-2xl font-bold text-center mb-8">Generating Your Course</h2>
        
        <div className="space-y-6">
          {tasks.map((task, index) => {
            const TaskIcon = task.icon;
            const isCurrentTask = index === getCurrentTaskIndex();
            const isCompleted = index < getCurrentTaskIndex();

            return (
              <div 
                key={index}
                className={`flex items-center space-x-4 transition-all duration-500 ${
                  isCurrentTask ? 'scale-105' : ''
                }`}
              >
                <div className={`
                  p-2 rounded-full
                  ${isCompleted ? 'bg-green-100 text-green-600' : 
                    isCurrentTask ? 'bg-blue-100 text-blue-600 animate-pulse' : 
                    'bg-gray-100 text-gray-400'}
                `}>
                  <TaskIcon size={24} />
                </div>
                <span className={`
                  ${isCompleted ? 'text-green-600' : 
                    isCurrentTask ? 'text-blue-600' : 
                    'text-gray-400'}
                `}>
                  {task.text}
                </span>
                {isCompleted && (
                  <span className="text-green-600">✓</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center text-gray-600">
          This might take a minute...
        </div>
      </div>
    </div>
  );
};

export default LoadingState;