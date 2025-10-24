'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildChain } from '../lib/markov-chain-language-models/mkc-builder';
import { LanguageDefinition } from '../lib/markov-chain-language-models/core';
import { generateNames } from '../lib/markov-chain-language-models/generations';

export default function MkcBuilder() {
  const [namesInput, setNamesInput] = useState<string>('');
  const [markovChainResult, setMarkovChainResult] = useState<LanguageDefinition | null>(null);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    
    // Clear previous errors
    setError(null);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      try {
        const result = buildChain(names);
        setMarkovChainResult(result);
        
        console.log('Built chain result:', result);
        console.log('Chain patterns:', Object.keys(result.patterns));
        
        // Generate 50 names using the built Markov chain
        const generated = generateNames(result, 50);
        console.log('Generated names:', generated);
        
        if (generated.length === 0) {
          setError('No names could be generated from the provided input. Try providing more diverse names or check that your input contains valid names.');
        } else {
          setError(null);
        }
        
        setGeneratedNames(generated);
      } catch (error) {
        console.error('Error during chain building or name generation:', error);
        setError(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        setGeneratedNames([]);
        setMarkovChainResult(null);
      }
      
      setIsBuilding(false);
    }, 500);
  };

  const clearResults = () => {
    setMarkovChainResult(null);
    setGeneratedNames([]);
    setNamesInput('');
    setError(null);
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
              
              {(markovChainResult || error) && (
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

          {/* Error Section */}
          {error && (
            <div className="panda-card p-4 mb-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                    Generation Failed
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Generated Names Section */}
          {markovChainResult && !error && (
            <div className="panda-card p-6 mb-6">
              <h2 className="text-xl font-semibold panda-text-primary mb-4">
                Generated Names ({generatedNames.length})
              </h2>
              {generatedNames.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-4">
                    {generatedNames.map((name, index) => (
                      <div
                        key={index}
                        onClick={() => navigator.clipboard.writeText(name)}
                        className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
                                 px-3 py-2 rounded-lg text-center cursor-pointer transition-colors duration-200
                                 text-gray-700 dark:text-gray-300 text-sm font-medium border 
                                 border-gray-200 dark:border-gray-600"
                        title="Click to copy"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs panda-text-secondary text-center">
                    Click any name to copy it to clipboard
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="text-gray-400 dark:text-gray-500 mb-2">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No names were generated. The Markov chain may need more diverse input data.
                  </p>
                </div>
              )}
            </div>
          )}

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
                  <strong>Generated:</strong> {generatedNames.length} unique names using the custom Markov chain
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}