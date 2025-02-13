# AI Resume Analyzer

An AI-powered resume analysis tool built with Next.js and Google's Gemini Pro AI that provides detailed feedback on resumes.

## Features

- Real-time resume analysis
- Structured feedback in 6 key areas
- Modern UI with toast notifications
- Error handling and loading states

## Prerequisites

- Node.js 18+ installed
- Google AI (Gemini) API key
- npm or yarn package manager

## Setup Steps

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd ai-resume-analyzer
   npm install
   ```

2. **Environment Setup**
   Create a `.env` file in the root directory:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Install Required Dependencies**
   ```bash
   npm install @google/generative-ai @radix-ui/react-toast class-variance-authority clsx tailwind-merge lucide-react
   ```

4. **Project Structure**
   ```
   ├── app/
   │   ├── api/
   │   │   └── analyze/
   │   │       └── route.ts    # API endpoint
   │   ├── layout.tsx
   │   └── page.tsx            # Main page
   ├── components/
   │   └── resume-analyzer.tsx # Main component
   ├── hooks/
   │   └── use-toast.ts       # Toast notifications
   └── lib/
       └── utils.ts           # Utility functions
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000`

## Usage

1. Open the application in your browser
2. Paste your resume text into the input area
3. Click "Analyze Resume"
4. View the detailed analysis with feedback in 6 sections:
   - Summary
   - Key Strengths
   - Areas for Improvement
   - Skills Assessment
   - Overall Score
   - Specific Recommendations

## Error Handling

The application includes:
- Input validation
- API error handling
- Loading states
- Fallback responses

## Technologies Used

- Next.js 14
- Google Generative AI (Gemini Pro)
- TypeScript
- Tailwind CSS
- Radix UI Components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details 