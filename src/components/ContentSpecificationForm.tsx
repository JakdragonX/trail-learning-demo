"use client"

import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { FileText, Link as LinkIcon, X, AlertCircle } from 'lucide-react';

interface Resource {
  type: 'link' | 'book' | 'note';
  title: string;
  url?: string;
  author?: string;
  description?: string;
}

interface ContentSpecificationFormProps {
  onUpdate: (data: {
    courseTitle: string;
    courseDescription: string;
    targetAudience: string;
    resources: Resource[];
  }) => void;
}

export default function ContentSpecificationForm({ onUpdate }: ContentSpecificationFormProps) {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [resources, setResources] = useState<Resource[]>([]);
  const [newResource, setNewResource] = useState<Resource>({
    type: 'link',
    title: '',
  });

  const addResource = () => {
    if (newResource.title) {
      setResources([...resources, newResource]);
      setNewResource({ type: 'link', title: '' });
    }
  };

  const removeResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onUpdate({
      courseTitle,
      courseDescription,
      targetAudience,
      resources
    });
  };

  return (
    <Card className="border-2 border-[#2D4F1E]">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Course Specifications</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Course Title</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter course title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Course Description</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full p-2 border rounded-lg"
              rows={3}
              placeholder="Enter course description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Who is this course for?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Add Resources</label>
            <div className="flex gap-2 mb-2">
              <select
                value={newResource.type}
                onChange={(e) => setNewResource({ ...newResource, type: e.target.value as 'link' | 'book' | 'note' })}
                className="p-2 border rounded-lg"
              >
                <option value="link">Link</option>
                <option value="book">Book</option>
                <option value="note">Note</option>
              </select>
              <input
                type="text"
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                className="flex-1 p-2 border rounded-lg"
                placeholder="Resource title"
              />
              {newResource.type !== 'note' && (
                <input
                  type="text"
                  value={newResource.url || ''}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder={newResource.type === 'link' ? "URL" : "Author"}
                />
              )}
              <button
                onClick={addResource}
                className="bg-[#2D4F1E] text-white px-4 py-2 rounded hover:bg-[#1F3614]"
              >
                Add
              </button>
            </div>
          </div>

          {resources.length > 0 && (
            <div className="space-y-2">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    {resource.type === 'link' ? <LinkIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    <span>{resource.title}</span>
                  </div>
                  <X
                    className="w-4 h-4 cursor-pointer hover:text-red-500"
                    onClick={() => removeResource(index)}
                  />
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-[#2D4F1E] text-white px-4 py-2 rounded hover:bg-[#1F3614]"
          >
            Update Course Specifications
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

