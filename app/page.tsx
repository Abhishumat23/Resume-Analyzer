import ResumeAnalyzer from '@/components/resume-analyzer';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-900 shadow-xl rounded-3xl p-10 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 mb-4 tracking-tight">
             AI PDF-Resume Analyzer
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Get instant, professional feedback on your resume powered by Gemini. <br />
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              Supports only PDF files.
            </span>
          </p>
        </div>
        <ResumeAnalyzer />
      </div>
    </main>
  );
}
