"use client"

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Book, Video, Calendar, ArrowLeft, ArrowRight } from 'lucide-react';
import QuizView from './QuizView';

interface StudentModuleViewProps {
  modules: any[];
  onBack: () => void;
}

export default function StudentModuleView({ modules, onBack }: StudentModuleViewProps) {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('content');
  
  const currentModule = modules[currentModuleIndex];

  const navigateModule = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    } else if (direction === 'next' && currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'content':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">Lecture Content</h3>
              <p className="whitespace-pre-wrap">{currentModule.content.lecture}</p>
            </div>
          </div>
        );

        case 'quiz':
          return (
            <QuizView 
              questions={currentModule.quiz.questions}
              onComplete={(score) => {
                console.log('Quiz completed with score:', score);
                // You can add functionality here to save the score
              }}
              onBack={() => setActiveTab('content')}
            />
          );
      
      case 'readings':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Required Readings</h3>
            {currentModule.content.readings.map((reading: any, idx: number) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{reading.title}</h4>
                  <p className="text-sm text-gray-600">Pages: {reading.pages}</p>
                  {reading.link && (
                    <a 
                      href={reading.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#2D4F1E] hover:underline text-sm"
                    >
                      Access Reading Material
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case 'videos':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Video Lectures</h3>
            {currentModule.content.videos.map((video: any, idx: number) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2">{video.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                  <p className="text-sm text-gray-600 mb-2">Duration: {video.duration}</p>
                  <a 
                    href={video.link || "https://youtube.com/watch?v=example"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-[#2D4F1E] text-white px-4 py-2 rounded hover:bg-[#1F3614] transition-colors"
                  >
                    Watch Video
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        );
      
      case 'quiz':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Module Quiz</h3>
            {currentModule.quiz.questions.map((question: any, idx: number) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <p className="font-medium mb-4">{idx + 1}. {question.question}</p>
                  <div className="space-y-2">
                    {question.options.map((option: string, optIdx: number) => (
                      <div 
                        key={optIdx}
                        className="p-2 border rounded hover:bg-[#FAF6F1] cursor-pointer transition-colors"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#2D4F1E] hover:underline"
        >
          <ArrowLeft size={20} />
          Back to Overview
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateModule('prev')}
            disabled={currentModuleIndex === 0}
            className="disabled:opacity-50"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-medium">
            Module {currentModuleIndex + 1} of {modules.length}
          </span>
          <button
            onClick={() => navigateModule('next')}
            disabled={currentModuleIndex === modules.length - 1}
            className="disabled:opacity-50"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <Card className="border-2 border-[#2D4F1E]">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-2">{currentModule.title}</h2>
          <p className="text-gray-600 mb-6">{currentModule.description}</p>

          <div className="flex gap-2 mb-6 border-b">
            {['content', 'readings', 'videos', 'quiz'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 capitalize ${
                  activeTab === tab 
                    ? 'border-b-2 border-[#2D4F1E] font-medium' 
                    : 'text-gray-600 hover:text-[#2D4F1E]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}