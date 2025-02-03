"use client"

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Plus, BookOpen, Clock, Calendar } from 'lucide-react';

interface Course {
  title: string;
  description: string;
  moduleCount: number;
  lastAccessed: string;
  type: 'traditional' | 'college';
}

interface LandingPageProps {
  courses: Course[];
  onCreateNew: () => void;
  onSelectCourse: (course: Course) => void;
}

const LandingPage = ({ courses, onCreateNew, onSelectCourse }: LandingPageProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Your Courses</h1>
        <button
          onClick={onCreateNew}
          className="bg-[#2D4F1E] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#1F3614] transition-colors"
        >
          <Plus size={20} />
          Create New Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          onClick={onCreateNew}
          className="border-2 border-dashed border-gray-300 hover:border-[#2D4F1E] transition-colors cursor-pointer h-[250px]"
        >
          <CardContent className="h-full flex flex-col items-center justify-center text-gray-500 hover:text-[#2D4F1E]">
            <Plus size={40} />
            <p className="mt-4 font-medium">Create New Course</p>
          </CardContent>
        </Card>

        {courses.map((course, index) => (
          <Card
            key={index}
            onClick={() => onSelectCourse(course)}
            className="border-2 border-[#2D4F1E] hover:shadow-lg transition-all cursor-pointer"
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-[#2D4F1E] flex-1">{course.title}</h3>
                <span className="text-sm px-2 py-1 bg-[#FAF6F1] rounded-full">
                  {course.type === 'traditional' ? 'Traditional' : 'College'}
                </span>
              </div>
              
              <p className="text-gray-600 line-clamp-2">{course.description}</p>
              
              <div className="pt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <BookOpen size={16} className="mr-2" />
                  <span className="text-sm">{course.moduleCount} modules</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">Last accessed {course.lastAccessed}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;