'use client';

import { useState } from 'react';
import Link from 'next/link';
import { generateOldEnglishNames } from '../lib/patterns/oldEnglish';

const fantasyLanguages = {
  'Old English': 'oldEnglish'
};

export default function NameGenerator() {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof fantasyLanguages>('Old English');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNames = () => {
    setIsGenerating(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      let names: string[] = [];
      
      // For now, we only have Old English patterns implemented
      if (selectedLanguage === 'Old English') {
        names = generateOldEnglishNames(15); // Generate 15 names
      }
      
      setGeneratedNames(names);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Fantasy Name Generator
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate authentic fantasy names using pattern-based linguistic algorithms. Names ending with ~ indicate generation reached complexity limits.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              {/* Language Selection */}
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                  🏛️ Language Pattern
                </label>
                <div className="grid gap-2">
                  {Object.keys(fantasyLanguages).map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setSelectedLanguage(language as keyof typeof fantasyLanguages);
                        setGeneratedNames([]);
                      }}
                      className={`p-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedLanguage === language
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateNames}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white py-4 px-6 rounded-xl font-medium text-lg hover:from-purple-700 hover:via-indigo-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Weaving Names from Ancient Patterns...
                </div>
              ) : (
                '✨ Generate Fantasy Names'
              )}
            </button>
          </div>

          {/* Results */}
          {generatedNames.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                🏰 Generated {selectedLanguage} Names
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Names marked with <span className="font-mono bg-red-100 dark:bg-red-900 px-1 rounded">~</span> reached the 20-loop complexity limit
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {generatedNames.map((name, index) => {
                  const isFailed = name.endsWith('~');
                  const displayName = isFailed ? name.slice(0, -1) : name;
                  
                  return (
                    <div
                      key={index}
                      className={`group rounded-lg p-4 transition-all cursor-pointer transform hover:scale-[1.02] ${
                        isFailed
                          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30'
                          : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30'
                      }`}
                      onClick={() => copyToClipboard(displayName)}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${
                          isFailed 
                            ? 'text-red-800 dark:text-red-300' 
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {displayName}
                          {isFailed && <span className="text-red-500 ml-1">~</span>}
                        </span>
                        <svg 
                          className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
                Click on any name to copy it to your clipboard • Generated using linguistic pattern algorithms
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}