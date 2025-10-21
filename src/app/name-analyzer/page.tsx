'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { analyzeName } from '../lib/patterns/analyzer';
import { generateNameVariations, NameVariation } from '../lib/patterns/regeneration';
import { getSupportedLanguages } from '../lib/patterns/core';
import { SupportedLanguage } from '../lib/patterns/core';

export default function NameAnalyzer() {
  const searchParams = useSearchParams();
  const [inputName, setInputName] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(getSupportedLanguages()[0]);
  const [analysisResults, setAnalysisResults] = useState<string[][]>([]);
  const [nameVariations, setNameVariations] = useState<NameVariation[][]>([]);

  // Handle URL parameters
  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl) {
      setInputName(nameFromUrl);
      // Auto-analyze if name is provided via URL
      setTimeout(() => {
        analyzeAndGenerateVariations(nameFromUrl);
      }, 100);
    }
  }, [searchParams, selectedLanguage]);

  const analyzeAndGenerateVariations = (nameToAnalyze: string) => {
    const results = analyzeName(nameToAnalyze, selectedLanguage);
    setAnalysisResults(results);
    
    // Generate variations for each path
    const variations = results.map(segments => 
      generateNameVariations(segments, selectedLanguage, nameToAnalyze)
    );
    setNameVariations(variations);
  };

  const handleAnalyze = () => {
    if (!inputName.trim()) return;
    analyzeAndGenerateVariations(inputName.trim());
  };

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="px-6 py-8">
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

        <div className="max-w-md mx-auto mb-8">
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
        </div>

        {/* Results Section */}
        {analysisResults.length > 0 && (
          <div className="w-full">
            <div className="panda-card p-6">
              <h3 className="text-xl font-bold panda-text-primary mb-4">
                Analysis Results for "{inputName}"
              </h3>
              <div className="space-y-6">
                {analysisResults.map((path, index) => (
                  <div key={index} className="border-b border-gray-600 pb-6 last:border-b-0">
                    {/* Path Header */}
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/50 mb-4">
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

                    {/* Variations */}
                    {nameVariations[index] && (
                      <div>
                        <h4 className="text-lg font-semibold panda-text-primary mb-3">
                          Generated Variations
                        </h4>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          {nameVariations[index].map((variation, varIndex) => (
                            <div
                              key={varIndex}
                              className={`p-3 rounded-lg border transition-all ${
                                variation.type === 'original'
                                  ? 'bg-green-900/30 border-green-600'
                                  : variation.isValid
                                  ? 'bg-blue-900/30 border-blue-600 hover:bg-blue-900/50'
                                  : 'bg-red-900/30 border-red-600'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className={`font-medium ${
                                  variation.type === 'original'
                                    ? 'text-green-300'
                                    : variation.isValid
                                    ? 'panda-text-primary'
                                    : 'text-red-300'
                                }`}>
                                  {variation.name}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${
                                  variation.type === 'original'
                                    ? 'bg-green-600 text-white'
                                    : variation.type === 'remove'
                                    ? 'bg-orange-600 text-white'
                                    : variation.type === 'add'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-yellow-600 text-black'
                                }`}>
                                  {variation.type}
                                </span>
                              </div>
                              <p className="text-xs panda-text-secondary mb-2">
                                {variation.description}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {variation.segments.map((segment, segIndex) => (
                                  <span 
                                    key={segIndex}
                                    className="px-1 py-0.5 bg-gray-600 text-white text-xs rounded font-mono"
                                  >
                                    {segment}
                                  </span>
                                ))}
                              </div>
                              {!variation.isValid && variation.type !== 'original' && (
                                <div className="mt-2 text-xs text-red-400">
                                  ⚠️ Invalid pattern combination
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
