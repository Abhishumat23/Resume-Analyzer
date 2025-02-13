'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const text = await file.text();
        setExtractedText(text);
        setResumeText(text);
        setError('');
      } catch (error) {
        setError('Error reading file. Please make sure you upload a valid text file.');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.doc', '.docx', '.pdf'],
    },
    multiple: false,
  });

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      setError('Please upload a resume or paste your resume text.');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: resumeText }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearExtractedText = () => {
    setExtractedText('');
    setResumeText('');
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Drag and drop your resume file here, or click to select a file
          </p>
        </div>

        {error && (
          <div className="mt-4 p-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/10 rounded-md">
            {error}
          </div>
        )}

        {extractedText && (
          <div className="mt-4 flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              File uploaded successfully! Extracted text is being used.
            </p>
            <Button variant="ghost" onClick={clearExtractedText}>
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        )}

        {!extractedText && (
          <div className="mt-6">
            <Textarea
              placeholder="Or paste your resume text here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
        )}

        <Button
          onClick={analyzeResume}
          disabled={isAnalyzing || !resumeText.trim()}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Resume'
          )}
        </Button>
      </Card>

      {analysis && (
        <Card className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b pb-2">Analysis Results</h2>
          <div className="prose dark:prose-invert max-w-none">
            {analysis.split('\n').map((line, index) => {
              // Check if line is a section header (starts with a number)
              if (/^\d\./.test(line)) {
                return (
                  <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-blue-600 dark:text-blue-400">
                    {line}
                  </h3>
                );
              }
              // Regular content with special formatting for **text**
              return (
                <p key={index} className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-2">
                  {line.split(/(\*\*.*?\*\*)/).map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      // Remove the asterisks and apply special styling
                      return (
                        <span key={i} className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {part.slice(2, -2)}
                        </span>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
