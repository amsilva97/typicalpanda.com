'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { analyzeName } from '../lib/patterns/analyzer';
import { SupportedLanguage, getSupportedLanguages, getLanguageDefinition } from '../lib/patterns/generations';

export default function NameAnalyzer() {
  const searchParams = useSearchParams();
  const [inputName, setInputName] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(getSupportedLanguages()[0]);
  const [analysisResults, setAnalysisResults] = useState<string[][]>([]);

  // Handle URL parameters
  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl) {
      setInputName(nameFromUrl);
      // Auto-analyze if name is provided via URL
      setTimeout(() => {
        const results = analyzeName(nameFromUrl, selectedLanguage);
        setAnalysisResults(results);
      }, 100);
    }
  }, [searchParams, selectedLanguage]);

  const handleAnalyze = () => {
    if (!inputName.trim()) return;
    const results = analyzeName(inputName.trim(), selectedLanguage);
    setAnalysisResults(results);
  };

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="panda-link inline-flex items-center text-sm mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold panda-text-primary mb-4">
            <span className="panda-text-gradient-gold">
              Name Analyzer
            </span>
          </h1>
        </div>

        <div className="max-w-md mx-auto">
          <div className="panda-card p-6">
            <div className="space-y-4">
              {/* Language Selector */}
              <div>
                <label className="block text-sm font-bold panda-text-primary mb-2">
                  Language:
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
                >
                  {getSupportedLanguages().map(language => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold panda-text-primary mb-2">
                  Name to Analyze:
                </label>
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="Enter a name to analyze..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 panda-text-primary focus:outline-none focus:border-blue-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAnalyze();
                    }
                  }}
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!inputName.trim()}
                className="w-full panda-button-primary px-6 py-3 rounded-lg disabled:opacity-50"
              >
                Analyze Name
              </button>
            </div>
          </div>

          {/* Results Section */}
          {analysisResults.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8">
              <div className="panda-card p-6">
                <h3 className="text-xl font-bold panda-text-primary mb-4">
                  Analysis Results for "{inputName}"
                </h3>
                <div className="space-y-3">
                  {analysisResults.map((path, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/50">
                      <span className="text-sm font-bold panda-text-secondary w-8">
                        #{index + 1}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {path.map((segment, segIndex) => (
                          <span 
                            key={segIndex}
                            className="px-2 py-1 bg-blue-600 text-white text-sm rounded font-mono"
                          >
                            {segment}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs panda-text-secondary ml-auto">
                        {path.length} segment{path.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
