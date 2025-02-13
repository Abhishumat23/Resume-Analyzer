'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, Upload } from 'lucide-react';
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
        setExtractedText(text); // Store extracted text but don't display it yet
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
      setError('Please paste your resume text or upload a PDF-file.');
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
          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={() => setResumeText(extractedText)}
          >
            View Extracted Text
          </Button>
        )}

        <div className="mt-6">
          <Textarea
            placeholder="Or paste your resume text here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="min-h-[200px]"
          />
        </div>

        <Button
          onClick={analyzeResume}
          disabled={isAnalyzing || !resumeText.trim()}
          className="mt-4 w-full"
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
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          <div className="prose dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-sm">{analysis}</pre>
          </div>
        </Card>
      )}
    </div>
  );
}
