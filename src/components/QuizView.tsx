"use client"

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight, ChevronLeft, Award } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
  onBack?: () => void;
}

const QuizView = ({ questions, onComplete, onBack }: QuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  const handleAnswerSelect = (optionIndex: number) => {
    if (showExplanation || quizCompleted) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(true);
  };

  const moveToNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (!quizCompleted) {
      completeQuiz();
    }
  };

  const moveToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(selectedAnswers[currentQuestionIndex - 1] !== -1);
    }
  };

  const completeQuiz = () => {
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === questions[index].correct ? 1 : 0);
    }, 0);
    setQuizCompleted(true);
    onComplete?.(score);
  };

  const calculateProgress = () => {
    const answered = selectedAnswers.filter(answer => answer !== -1).length;
    return (answered / questions.length) * 100;
  };

  const getScore = () => {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index].correct
    ).length;
    return (correctAnswers / questions.length) * 100;
  };

  if (quizCompleted) {
    const score = getScore();
    return (
      <Card className="max-w-2xl mx-auto transition-all duration-500 ease-in-out">
        <CardContent className="p-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-4 text-[#2D4F1E]" />
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <div className="text-6xl font-bold text-[#2D4F1E] mb-4">
            {score.toFixed(0)}%
          </div>
          <p className="text-gray-600 mb-6">
            You got {selectedAnswers.filter((answer, index) => answer === questions[index].correct).length} out of {questions.length} questions correct
          </p>
          <div className="space-x-4">
            <button
              onClick={() => {
                setQuizCompleted(false);
                setCurrentQuestionIndex(0);
                setSelectedAnswers(new Array(questions.length).fill(-1));
                setShowExplanation(false);
              }}
              className="bg-[#2D4F1E] text-white px-6 py-2 rounded-lg hover:bg-[#1F3614] transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={onBack}
              className="border-2 border-[#2D4F1E] text-[#2D4F1E] px-6 py-2 rounded-lg hover:bg-[#FAF6F1] transition-colors"
            >
              Back to Module
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onBack}
          className="text-[#2D4F1E] hover:underline flex items-center gap-2"
        >
          <ChevronLeft /> Back to Module
        </button>
        <span className="text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#2D4F1E] transition-all duration-500 ease-in-out"
          style={{ width: `${calculateProgress()}%` }}
        />
      </div>

      <Card className="transition-all duration-500 ease-in-out">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-300 ease-in-out ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? showExplanation
                      ? index === currentQuestion.correct
                        ? 'bg-green-100 border-green-500'
                        : 'bg-red-100 border-red-500'
                      : 'bg-[#2D4F1E] text-white'
                    : 'bg-white border-2 border-gray-200 hover:border-[#2D4F1E]'
                } ${showExplanation ? 'cursor-default' : 'hover:border-[#2D4F1E]'}`}
                disabled={showExplanation}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showExplanation && index === selectedAnswers[currentQuestionIndex] && (
                    index === currentQuestion.correct 
                      ? <CheckCircle2 className="text-green-500" />
                      : <XCircle className="text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className={`mt-6 p-4 rounded-lg ${
              selectedAnswers[currentQuestionIndex] === currentQuestion.correct
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 text-[#2D4F1E]" />
                <div>
                  <p className="font-medium mb-1">
                    {selectedAnswers[currentQuestionIndex] === currentQuestion.correct
                      ? 'Correct!'
                      : 'Incorrect'}
                  </p>
                  <p className="text-gray-600">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <button
          onClick={moveToPreviousQuestion}
          className={`flex items-center gap-2 ${
            currentQuestionIndex === 0 ? 'invisible' : ''
          }`}
        >
          <ChevronLeft /> Previous
        </button>
        {showExplanation && (
          <button
            onClick={moveToNextQuestion}
            className="bg-[#2D4F1E] text-white px-6 py-2 rounded-lg hover:bg-[#1F3614] transition-colors flex items-center gap-2"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
            <ChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;