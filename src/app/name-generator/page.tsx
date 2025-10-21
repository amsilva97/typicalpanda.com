'use client';

import { useState } from 'react';
import Link from 'next/link';
import { generateNamesWithMeaningsForLanguage } from '../lib/patterns/generations';
import { getLanguageDisplayName } from '../lib/patterns/core';
import { getSupportedLanguages } from '../lib/patterns/core';
import { SupportedLanguage } from '../lib/patterns/core';

// Create dynamic language mapping from all supported languages
const createLanguageMapping = () => {
  const mapping: { [key: string]: SupportedLanguage } = {};
  getSupportedLanguages().forEach(lang => {
    mapping[getLanguageDisplayName(lang)] = lang;
  });
  return mapping;
};

const fantasyLanguages = createLanguageMapping();

interface NameWithMeaning {
  name: string;
  meaning: string;
}

export default function NameGenerator() {
  // Get the first available language as default
  const defaultLanguage = getLanguageDisplayName(getSupportedLanguages()[0]);
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof fantasyLanguages>(defaultLanguage);
  const [generatedNames, setGeneratedNames] = useState<NameWithMeaning[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const rows = 5;
  const cols = 5;

  const generateNames = () => {
    setIsGenerating(true);
    
    // Calculate total names needed
    const totalNames = rows * cols;
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      let names: NameWithMeaning[] = [];
      
      // Get the language enum value from the selected language
      const selectedLanguageEnum = fantasyLanguages[selectedLanguage];
      if (selectedLanguageEnum) {
        names = generateNamesWithMeaningsForLanguage(selectedLanguageEnum, totalNames);
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
    <div className="min-h-screen panda-bg-primary">
      <div className="px-6 py-8">
        {/* Header */}
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
            <span className="panda-text-gradient-silver">
              Fantasy Name Generator
            </span>
          </h1>
          <p className="text-lg panda-text-secondary">
            Generate authentic fantasy names using pattern-based linguistic algorithms. Names ending with ~ indicate generation reached complexity limits.
          </p>
        </div>

        <div>
          {/* Controls */}
          <div className="panda-card p-6 mb-6">
            <div className="mb-4">
              {/* Language Selection */}
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium panda-text-primary mb-2 text-center">
                  🏛️ Language Pattern
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value as keyof typeof fantasyLanguages);
                    setGeneratedNames([]);
                  }}
                >
                  {Object.keys(fantasyLanguages).map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateNames}
              disabled={isGenerating}
              className="w-full panda-button-primary py-3 px-5 rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center">
                  <div className="panda-loading h-5 w-5 mr-2"></div>
                  Weaving Names from Ancient Patterns...
                </div>
              ) : (
                '✨ Generate Fantasy Names'
              )}
            </button>
          </div>

          {/* Results */}
          {generatedNames.length > 0 && (
            <div className="panda-card p-6">
              <h2 className="text-2xl font-bold panda-text-primary mb-3">
                🏰 Generated {selectedLanguage} Names
              </h2>
              <p className="text-sm panda-text-muted mb-4">
                Names marked with <span className="font-mono bg-red-600 text-white px-2 py-1 rounded">~</span> reached the complexity limit • <em>Meanings shown in italics</em> • Click any name to analyze it
              </p>
              
              <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                {generatedNames.map((nameObj, index) => {
                  const isFailed = nameObj.name.endsWith('~');
                  const displayName = isFailed ? nameObj.name.slice(0, -1) : nameObj.name;
                  const meaning = nameObj.meaning;
                  
                  return (
                    <div
                      key={index}
                      className={`group transition-all transform hover:scale-[1.02] cursor-pointer ${
                        isFailed
                          ? 'panda-name-card-failed'
                          : 'panda-name-card'
                      }`}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-medium text-lg ${
                            isFailed 
                              ? 'text-red-300' 
                              : 'panda-text-primary'
                          }`}>
                            {displayName}
                            {isFailed && <span className="text-red-400 ml-1">~</span>}
                          </span>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(displayName);
                              }}
                              className="p-1 rounded hover:bg-gray-700/50 transition-colors"
                              title="Copy to clipboard"
                            >
                              <svg 
                                className="w-4 h-4 panda-text-muted hover:panda-accent-gold flex-shrink-0"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        {meaning && (
                          <div className={`text-sm italic ${
                            isFailed 
                              ? 'text-red-400' 
                              : 'panda-text-secondary'
                          }`}>
                            {meaning.split('\n').map((line, lineIndex) => (
                              <div key={lineIndex}>{line}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-sm panda-text-muted mt-4 text-center">
                Click any name to analyze it • Hover over names to reveal copy and analyze buttons • Generated using linguistic pattern algorithms with authentic meanings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}