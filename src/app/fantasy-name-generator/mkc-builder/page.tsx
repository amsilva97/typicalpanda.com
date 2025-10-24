'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildChain } from '../lib/markov-chain-language-models/mkc-builder';
import { LanguageDefinition } from '../lib/markov-chain-language-models/core';

export default function MkcBuilder() {
  const [namesInput, setNamesInput] = useState<string>('');
  const [markovChainResult, setMarkovChainResult] = useState<LanguageDefinition | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);

  const handleBuildChain = () => {
    if (!namesInput.trim()) {
      return;
    }

    setIsBuilding(true);
    
    // Parse the comma-separated names
    const names = namesInput
      .split(',')
      .map(name => name.trim())
      .filter(name => name.length > 0);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const result = buildChain(names);
      setMarkovChainResult(result);
      setIsBuilding(false);
    }, 500);
  };

  const clearResults = () => {
    setMarkovChainResult(null);
    setNamesInput('');
  };

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/fantasy-name-generator"
            className="panda-link inline-flex items-center text-sm mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Fantasy Name Generator
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-bold panda-text-primary mb-4">
            <span className="panda-text-gradient-purple">
              Markov Chain Builder
            </span>
          </h1>
          <p className="text-lg panda-text-secondary max-w-3xl mx-auto">
            Create custom Markov chains from your own list of names. Enter comma-separated names 
            to build linguistic patterns for name generation.
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto">
          <div className="panda-card p-6 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium panda-text-primary mb-2">
                Names (comma-separated)
              </label>
              <textarea
                value={namesInput}
                onChange={(e) => setNamesInput(e.target.value)}
                placeholder="Enter names separated by commas, e.g.: Aragorn, Legolas, Gimli, Gandalf, Frodo..."
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                disabled={isBuilding}
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleBuildChain}
                disabled={!namesInput.trim() || isBuilding}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                         disabled:cursor-not-allowed text-white rounded-lg font-medium 
                         transition-colors duration-200"
              >
                {isBuilding ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Building Chain...
                  </span>
                ) : (
                  'Build Markov Chain'
                )}
              </button>
              
              {markovChainResult && (
                <button
                  onClick={clearResults}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 
                           text-gray-700 dark:text-gray-300 rounded-lg font-medium 
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results Section */}
          {markovChainResult && (
            <div className="panda-card p-6">
              <h2 className="text-xl font-semibold panda-text-primary mb-4">
                Markov Chain Result
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
                  {JSON.stringify(markovChainResult, null, 2)}
                </pre>
              </div>
              <div className="mt-4 text-sm panda-text-secondary">
                <p>
                  <strong>Status:</strong> Chain built successfully from {namesInput.split(',').filter(n => n.trim()).length} names
                </p>
                <p className="mt-1">
                  <strong>Note:</strong> This is currently displaying test data. The actual Markov chain implementation will be added in future updates.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}