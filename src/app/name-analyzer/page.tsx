'use client';

import { useState } from 'react';
import { analyzeName } from '../lib/patterns/analyzer';
import { SupportedLanguage, getSupportedLanguages, getLanguageDefinition } from '../lib/patterns/generations';

export default function NameAnalyzer() {
  const [inputName, setInputName] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(getSupportedLanguages()[0]);

  const handleAnalyze = () => {
    if (!inputName.trim()) return;
    const languageDefinition = getLanguageDefinition(selectedLanguage);
    const results = analyzeName(inputName.trim(), selectedLanguage);
  };

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold panda-text-primary mb-4">
            <span className="panda-text-gradient-gold">
              Name Analyzer Test
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 panda-text-primary focus:outline-none focus:border-blue-500"
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
                Analyze Name & Read Patterns (Check Console)
              </button>

              <p className="text-xs panda-text-secondary text-center">
                Language patterns and analysis results will be logged to browser console (F12)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
