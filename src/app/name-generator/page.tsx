'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { generateNamesWithMeaningsForLanguage, SupportedLanguage, getLanguageDisplayName } from '../lib/patterns/patterns';

const fantasyLanguages = {
  [getLanguageDisplayName(SupportedLanguage.OLD_ENGLISH)]: SupportedLanguage.OLD_ENGLISH
};

interface NameWithMeaning {
  name: string;
  meaning: string;
}

export default function NameGenerator() {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof fantasyLanguages>(getLanguageDisplayName(SupportedLanguage.OLD_ENGLISH));
  const [generatedNames, setGeneratedNames] = useState<NameWithMeaning[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const generateNames = () => {
    setIsGenerating(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      let names: NameWithMeaning[] = [];
      
      // Get the language enum value from the selected language
      const selectedLanguageEnum = fantasyLanguages[selectedLanguage];
      if (selectedLanguageEnum) {
        names = generateNamesWithMeaningsForLanguage(selectedLanguageEnum, 15); // Generate 15 names with meanings
      }
      
      setGeneratedNames(names);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    // You could add a toast notification here
  };

  const analyzeInNameAnalyzer = (name: string) => {
    router.push(`/name-analyzer?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-8">
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
          <p className="text-lg panda-text-secondary max-w-2xl mx-auto">
            Generate authentic fantasy names using pattern-based linguistic algorithms. Names ending with ~ indicate generation reached complexity limits.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Controls */}
          <div className="panda-card p-6 mb-6">
            <div className="mb-4">
              {/* Language Selection */}
              <div className="max-w-md mx-auto">
                <label className="block text-sm font-medium panda-text-primary mb-2 text-center">
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
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedLanguage === language
                          ? 'panda-selected'
                          : 'panda-unselected'
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
                Names marked with <span className="font-mono bg-red-600 text-white px-2 py-1 rounded">~</span> reached the complexity limit • <em>Meanings shown in italics</em>
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedNames.map((nameObj, index) => {
                  const isFailed = nameObj.name.endsWith('~');
                  const displayName = isFailed ? nameObj.name.slice(0, -1) : nameObj.name;
                  const meaning = nameObj.meaning;
                  
                  return (
                    <div
                      key={index}
                      className={`group transition-all transform hover:scale-[1.02] ${
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
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                analyzeInNameAnalyzer(displayName);
                              }}
                              className="p-1 rounded hover:bg-gray-700/50 transition-colors"
                              title="Analyze this name"
                            >
                              <svg 
                                className="w-4 h-4 panda-text-muted hover:panda-accent-gold flex-shrink-0"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                Hover over names to reveal copy and analyze buttons • Generated using linguistic pattern algorithms with authentic meanings
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}