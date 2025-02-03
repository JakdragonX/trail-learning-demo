"use client"

import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Upload, BookOpen, GraduationCap, FileText, Plus, X, ChevronDown, ChevronRight, GripVertical, Eye, ArrowLeft, Book, Calendar, Video, Link } from 'lucide-react';
import ContentSpecificationForm from './ContentSpecificationForm';
import StudentModuleView from './StudentModuleView';
import LoadingState from './LoadingState';
import LandingPage from './LandingPage';

const TrailDemo = () => {
  const [currentStep, setCurrentStep] = useState('welcome');
  const [courseType, setCourseType] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [configData, setConfigData] = useState({
    examCount: 1,
    moduleCount: 5,
    includeNotes: true
  });
  
  const [courseSpecs, setCourseSpecs] = useState({
    courseTitle: '',
    courseDescription: '',
    targetAudience: '',
    resources: []
  });
const [currentTask, setCurrentTask] = useState('');
const [courses, setCourses] = useState([]);
const [viewingLanding, setViewingLanding] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [dragging, setDragging] = useState(null);

  const styles = {
    container: "bg-[#FAF6F1] min-h-screen",
    header: "bg-[#2D4F1E] text-[#FAF6F1] p-6",
    card: "border-[#2D4F1E] border-2 bg-white transition-all duration-300 hover:shadow-lg",
    button: "bg-[#2D4F1E] text-[#FAF6F1] px-4 py-2 rounded hover:bg-[#1F3614] transition-all",
    moduleSection: "animate-fadeIn",
  };

  const mockContent = {
    modules: [
      {
        id: 1,
        title: "Introduction to Digital Security",
        description: "Foundation concepts of cybersecurity and digital privacy",
        content: {
          lecture: "In this foundational module, we explore the core principles of digital security...",
          readings: [
            { title: "The Art of Privacy", pages: "pp. 12-45" },
            { title: "Digital Security Basics", link: "#" }
          ],
          videos: [
            { title: "Understanding Encryption", duration: "15:30" },
            { title: "Privacy in the Digital Age", duration: "22:15" }
          ],
          exercises: [
            "Implement basic password policies",
            "Configure 2FA on your accounts"
          ]
        },
        quiz: {
          questions: [
            {
              question: "Which encryption method is most suitable for personal data?",
              options: ["AES-256", "Simple substitution", "Plain text", "ROT13"],
              correct: 0,
              explanation: "AES-256 is the industry standard for secure data encryption..."
            }
          ]
        },
        notes: "Key concepts:\n- CIA Triad\n- Authentication vs Authorization\n- Encryption basics"
      }
    ]
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleDragStart = (e, id) => {
    setDragging(id);
    e.target.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    setDragging(null);
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target && typeof target.className === 'string' && target.className.includes('draggable')) {
      target.style.borderTop = '2px solid #2D4F1E';
    }
  };

  const generateCourseContent = async () => {
    setIsGenerating(true);
    try {
      setCurrentTask('structuring');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseType,
          moduleCount: configData.moduleCount,
          examCount: configData.examCount,
          includeNotes: configData.includeNotes,
          courseSpecs
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        console.error('Error details:', data);
        throw new Error(data.error || 'Failed to generate content');
      }
  
      setCurrentTask('finalizing');
      console.log('Received data:', data);
      
      if (data.success) {
        const newCourse = {
          title: courseSpecs.courseTitle || 'Untitled Course',
          description: courseSpecs.courseDescription || 'No description provided',
          moduleCount: configData.moduleCount,
          lastAccessed: new Date().toLocaleDateString(),
          type: courseType
        };
        
        setCourses([...courses, newCourse]);
        setGeneratedContent(data.course);
        setCurrentStep('modules');
      } else {
        throw new Error(data.error || 'Failed to generate content');
      }
    } catch (error) {
      console.error('Error generating course:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  };

  const ModuleView = ({ isPreviewMode = false }) => (
    <div className="space-y-4">
      {generatedContent?.modules?.map((module, idx) => (
        <div
          key={module.id || idx}
          draggable={!isPreviewMode}
          onDragStart={(e) => handleDragStart(e, module.id)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          className={`${styles.card} p-6 draggable`}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-[#2D4F1E]">{module.title}</h3>
            <div className="flex gap-2">
              {!isPreviewMode && <GripVertical className="text-[#2D4F1E] cursor-move" />}
              <Eye 
                className="text-[#2D4F1E] cursor-pointer hover:opacity-70"
                onClick={() => setIsPreview(true)}
              />
            </div>
          </div>
  
          <p className="text-gray-600 mb-4">{module.description}</p>
  
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-[#FAF6F1] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Book className="text-[#2D4F1E]" />
                  <h4 className="font-medium">Readings</h4>
                </div>
                {module.content.readings.map((reading, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span>{reading.title}</span>
                    <span className="text-sm text-gray-600">{reading.pages}</span>
                  </div>
                ))}
              </div>
  
              <div className="bg-[#FAF6F1] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Video className="text-[#2D4F1E]" />
                  <h4 className="font-medium">Video Lectures</h4>
                </div>
                {module.content.videos.map((video, i) => (
                  <div key={i} className="flex justify-between items-center py-2">
                    <span>{video.title}</span>
                    <span className="text-sm text-gray-600">{video.duration}</span>
                  </div>
                ))}
              </div>
            </div>
  
            <div className="space-y-4">
              <div className="bg-[#FAF6F1] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="text-[#2D4F1E]" />
                  <h4 className="font-medium">Exercises</h4>
                </div>
                {module.content.exercises.map((exercise, i) => (
                  <div key={i} className="py-2">
                    <span>• {exercise}</span>
                  </div>
                ))}
              </div>
  
              <div className="bg-[#FAF6F1] p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Link className="text-[#2D4F1E]" />
                  <h4 className="font-medium">Resources</h4>
                </div>
                <div className="space-y-2">
                  <button className={`${styles.button} w-full text-sm`}>View Quiz</button>
                  {module.notes && (
                    <button className={`${styles.button} w-full text-sm`}>Download Notes</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWelcome = () => (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Trail</h1>
      <div className="grid grid-cols-2 gap-6">
        <Card 
          className={`${styles.card} p-6 cursor-pointer`}
          onClick={() => {
            setCourseType('traditional');
            setCurrentStep('import');
          }}>
          <CardContent className="text-center space-y-4">
            <BookOpen className="w-16 h-16 mx-auto text-[#2D4F1E]" />
            <h2 className="text-xl font-semibold">Traditional Course</h2>
            <p className="text-gray-600">All modules weighted equally</p>
          </CardContent>
        </Card>

        <Card 
          className={`${styles.card} p-6 cursor-pointer`}
          onClick={() => {
            setCourseType('college');
            setCurrentStep('import');
          }}>
          <CardContent className="text-center space-y-4">
            <GraduationCap className="w-16 h-16 mx-auto text-[#2D4F1E]" />
            <h2 className="text-xl font-semibold">College Course</h2>
            <p className="text-gray-600">Emphasis on midterm/final exams</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderImport = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Course Setup</h2>
        <button 
          className={styles.button}
          onClick={() => setCurrentStep('configure')}>
          Next
        </button>
      </div>
  
      <ContentSpecificationForm 
        onUpdate={(specs) => {
          setCourseSpecs(specs);
          // Optionally move to next step
          setCurrentStep('configure');
        }} 
      />

      <Card className={styles.card}>
        <CardContent className="space-y-4 p-6">
          <div className="border-2 border-dashed border-[#2D4F1E] rounded-lg p-8">
            <div className="text-center space-y-4">
              <Upload className="w-12 h-12 mx-auto text-[#2D4F1E]" />
              <div>
                <label className={`${styles.button} cursor-pointer`}>
                  Upload Files
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
              <p className="text-gray-600">Upload syllabi, study guides, or exam materials</p>
            </div>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Uploaded Files</h3>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-[#FAF6F1] rounded">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#2D4F1E]" />
                    <span>{file.name}</span>
                  </div>
                  <X 
                    className="w-4 h-4 text-[#2D4F1E] cursor-pointer hover:opacity-70"
                    onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderConfigure = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Course Configuration</h2>
        <button 
          className={styles.button}
          onClick={generateCourseContent}
          disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Course'}
        </button>
      </div>

      <Card className={styles.card}>
        <CardContent className="space-y-6 p-6">
          <div>
            <label className="block text-sm font-medium mb-2">Number of Modules</label>
            <input
              type="number"
              min="1"
              max="20"
              value={configData.moduleCount}
              onChange={(e) => setConfigData({...configData, moduleCount: parseInt(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Exams</label>
            <input
              type="number"
              min="1"
              max="5"
              value={configData.examCount}
              onChange={(e) => setConfigData({...configData, examCount: parseInt(e.target.value)})}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={configData.includeNotes}
              onChange={(e) => setConfigData({...configData, includeNotes: e.target.checked})}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Include Study Notes</label>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    if (viewingLanding) {
      return (
        <LandingPage 
          courses={courses}
          onCreateNew={() => {
            setViewingLanding(false);
            setCurrentStep('welcome');
          }}
          onSelectCourse={(course) => {
            // Handle course selection
            setViewingLanding(false);
            setGeneratedContent(course);
            setCurrentStep('modules');
          }}
        />
      );
    }
  
    if (isGenerating) {
      return <LoadingState currentTask={currentTask} />;
    }
    
    if (isPreview) {
      return (
        <StudentModuleView 
          modules={generatedContent.modules} 
          onBack={() => setIsPreview(false)}
        />
      );
    }
  
    switch (currentStep) {
      case 'welcome':
        return renderWelcome();
      case 'import':
        return renderImport();
      case 'configure':
        return renderConfigure();
      case 'modules':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Generated Course Content</h2>
              <button 
                className={styles.button}
                onClick={() => setIsPreview(true)}>
                Preview Student View
              </button>
            </div>
            <ModuleView />
          </div>
        );
      default:
        return null;
    }
  };

  const generateModuleContent = async (title: string) => {
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleTitle: title }),
      });
      
      if (!response.ok) throw new Error('Failed to generate content');
      
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error generating content:', error);
      return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div>
            <h1 className="text-4xl font-bold text-white">Trail</h1>
            <p className="text-lg text-white opacity-80">Your AI-Powered Learning Journey</p>
          </div>
          <button 
            className="text-white hover:underline"
            onClick={() => setViewingLanding(true)}>
            My Courses
          </button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6 bg-white">
        {renderContent()}
      </div>
    </div>
  );
};

export default TrailDemo;