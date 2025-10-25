'use client';

import { useState } from 'react';
import Link from 'next/link';
import { buildChain, createEmptyLanguageDefinition } from '../lib/markov-chain-language-models/mkc-builder';
import { LanguageDefinition } from '../lib/markov-chain-language-models/core';
import { generateNames } from '../lib/markov-chain-language-models/generator';

export default function MkcBuilder() {
  // Create persistent language definition
  const [languageDefinition, setLanguageDefinition] = useState<LanguageDefinition>(() => createEmptyLanguageDefinition());
  const [namesInput, setNamesInput] = useState<string>('');
  const [markovChainResult, setMarkovChainResult] = useState<LanguageDefinition | null>(null);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  
  // Helper functions to update options in the language definition
  const updateOption = <K extends keyof LanguageDefinition['options']>(key: K, value: LanguageDefinition['options'][K]) => {
    setLanguageDefinition(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: value
      }
    }));
  };

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
        // Build the chain using the persistent language definition
        const result = buildChain(names, languageDefinition);
        
        setMarkovChainResult(result);
        
        // Generate 50 names using the built Markov chain
        const generated = generateNames(result, 50);
        
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

  const handleRegenerateNames = () => {
    if (!markovChainResult) return;
    
    setIsRegenerating(true);
    setError(null);
    
    setTimeout(() => {
      try {
        // Use the current language definition (already updated with latest options)
        const generated = generateNames(languageDefinition, 50);
        
        if (generated.length === 0) {
          setError('No names could be generated with current options. Try adjusting the settings.');
        } else {
          setError(null);
        }
        
        setGeneratedNames(generated);
      } catch (error) {
        console.error('Error regenerating names:', error);
        setError(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
        setGeneratedNames([]);
      }
      
      setIsRegenerating(false);
    }, 300);
  };

  const clearResults = () => {
    setMarkovChainResult(null);
    setGeneratedNames([]);
    setNamesInput('');
    setError(null);
    setShowOptions(false);
    // Reset the language definition to empty state
    setLanguageDefinition(createEmptyLanguageDefinition());
  };

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-2">
            <Link 
              href="/"
              className="panda-link inline-flex items-center text-sm mr-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>
            <Link 
              href="/fantasy-name-generator"
              className="panda-link inline-flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Fantasy Name Generator
            </Link>
          </div>
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

          {/* Options and Regenerate Section */}
          {markovChainResult && (
            <div className="panda-card p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold panda-text-primary">
                  Generation Controls
                </h2>
                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 
                           text-gray-700 dark:text-gray-300 rounded-lg font-medium 
                           hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {showOptions ? 'Hide Options' : 'Show Options'}
                </button>
              </div>
              
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleRegenerateNames}
                  disabled={isRegenerating}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 
                           disabled:cursor-not-allowed text-white rounded-lg font-medium 
                           transition-colors duration-200"
                >
                  {isRegenerating ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Regenerating...
                    </span>
                  ) : (
                    '🔄 Generate New Names'
                  )}
                </button>
              </div>

              {/* Options Panel */}
              {showOptions && (
                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h3 className="text-md font-medium panda-text-primary mb-3">
                    Generation Options
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium panda-text-primary">
                          Min Nodes
                        </label>
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={languageDefinition.options.minNodes !== undefined}
                            onChange={(e) => updateOption('minNodes', e.target.checked ? 2 : undefined)}
                            className="mr-1"
                          />
                          Enable
                        </label>
                      </div>
                      {languageDefinition.options.minNodes !== undefined ? (
                        <>
                          <div className="text-xs panda-text-secondary mb-1">
                            Value: {languageDefinition.options.minNodes}
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={languageDefinition.options.minNodes}
                            onChange={(e) => updateOption('minNodes', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Disabled (unlimited)</div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium panda-text-primary">
                          Max Nodes
                        </label>
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={languageDefinition.options.maxNodes !== undefined}
                            onChange={(e) => updateOption('maxNodes', e.target.checked ? 6 : undefined)}
                            className="mr-1"
                          />
                          Enable
                        </label>
                      </div>
                      {languageDefinition.options.maxNodes !== undefined ? (
                        <>
                          <div className="text-xs panda-text-secondary mb-1">
                            Value: {languageDefinition.options.maxNodes}
                          </div>
                          <input
                            type="range"
                            min="2"
                            max="15"
                            value={languageDefinition.options.maxNodes}
                            onChange={(e) => updateOption('maxNodes', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Disabled (unlimited)</div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium panda-text-primary">
                          Consecutive Single Letter Limit
                        </label>
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={languageDefinition.options.consecutiveSingleLetterLimit !== undefined}
                            onChange={(e) => updateOption('consecutiveSingleLetterLimit', e.target.checked ? 2 : undefined)}
                            className="mr-1"
                          />
                          Enable
                        </label>
                      </div>
                      {languageDefinition.options.consecutiveSingleLetterLimit !== undefined ? (
                        <>
                          <div className="text-xs panda-text-secondary mb-1">
                            Value: {languageDefinition.options.consecutiveSingleLetterLimit}
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="5"
                            value={languageDefinition.options.consecutiveSingleLetterLimit}
                            onChange={(e) => updateOption('consecutiveSingleLetterLimit', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Disabled (unlimited)</div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium panda-text-primary">
                          Non-Consecutive Single Letter Limit
                        </label>
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={languageDefinition.options.nonConsecutiveSingleLetterLimit !== undefined}
                            onChange={(e) => updateOption('nonConsecutiveSingleLetterLimit', e.target.checked ? 3 : undefined)}
                            className="mr-1"
                          />
                          Enable
                        </label>
                      </div>
                      {languageDefinition.options.nonConsecutiveSingleLetterLimit !== undefined ? (
                        <>
                          <div className="text-xs panda-text-secondary mb-1">
                            Value: {languageDefinition.options.nonConsecutiveSingleLetterLimit}
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={languageDefinition.options.nonConsecutiveSingleLetterLimit}
                            onChange={(e) => updateOption('nonConsecutiveSingleLetterLimit', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Disabled (unlimited)</div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium panda-text-primary">
                          Duplicate Cluster Limit
                        </label>
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={languageDefinition.options.duplicateClusterLimit !== undefined}
                            onChange={(e) => updateOption('duplicateClusterLimit', e.target.checked ? 2 : undefined)}
                            className="mr-1"
                          />
                          Enable
                        </label>
                      </div>
                      {languageDefinition.options.duplicateClusterLimit !== undefined ? (
                        <>
                          <div className="text-xs panda-text-secondary mb-1">
                            Value: {languageDefinition.options.duplicateClusterLimit}
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="5"
                            value={languageDefinition.options.duplicateClusterLimit}
                            onChange={(e) => updateOption('duplicateClusterLimit', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Disabled (unlimited)</div>
                      )}
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium panda-text-primary">
                          Total Cluster Limit
                        </label>
                        <label className="flex items-center text-xs">
                          <input
                            type="checkbox"
                            checked={languageDefinition.options.totalClusterLimit !== undefined}
                            onChange={(e) => updateOption('totalClusterLimit', e.target.checked ? 3 : undefined)}
                            className="mr-1"
                          />
                          Enable
                        </label>
                      </div>
                      {languageDefinition.options.totalClusterLimit !== undefined ? (
                        <>
                          <div className="text-xs panda-text-secondary mb-1">
                            Value: {languageDefinition.options.totalClusterLimit}
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="10"
                            value={languageDefinition.options.totalClusterLimit}
                            onChange={(e) => updateOption('totalClusterLimit', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Disabled (unlimited)</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong>Tip:</strong> Adjust these values to control name generation. Lower values = shorter names, higher values = longer names. 
                      Use limits to prevent repetitive patterns.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

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

          {/* AI Analysis Data Collection Section */}
          {markovChainResult && (
            <div className="panda-card p-6 mb-6">
              <h2 className="text-xl font-semibold panda-text-primary mb-4">
                🤖 AI Agent Data Collection
              </h2>
              <p className="text-sm panda-text-secondary mb-4">
                Copy this comprehensive data section to get AI assistance with improving your Markov chain system:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 overflow-auto border border-gray-200 dark:border-gray-600">
                <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
{`=== MARKOV CHAIN ANALYSIS REQUEST ===

## CURRENT SYSTEM PERFORMANCE
- Input Names Count: ${namesInput.split(',').filter(n => n.trim()).length}
- Generated Names Count: ${generatedNames.length}
- Total Pattern Keys: ${Object.keys(markovChainResult.patterns).length}
- Start Patterns: ${markovChainResult.patterns['^']?.length || 0}

## ACTIVE GENERATION OPTIONS
- Min Nodes: ${languageDefinition.options.minNodes ?? 'Disabled'}
- Max Nodes: ${languageDefinition.options.maxNodes ?? 'Disabled'}  
- Consecutive Single Letter Limit: ${languageDefinition.options.consecutiveSingleLetterLimit ?? 'Disabled'}
- Non-Consecutive Single Letter Limit: ${languageDefinition.options.nonConsecutiveSingleLetterLimit ?? 'Disabled'}
- Duplicate Cluster Limit: ${languageDefinition.options.duplicateClusterLimit ?? 'Disabled'}
- Total Cluster Limit: ${languageDefinition.options.totalClusterLimit ?? 'Disabled'}

## INPUT DATASET
Names: ${namesInput}

## GENERATED OUTPUT SAMPLE (First 20)
${generatedNames.slice(0, 20).map((name, i) => `${i+1}. ${name}`).join('\n')}
${generatedNames.length > 20 ? `\n... and ${generatedNames.length - 20} more names` : ''}

## PATTERN ANALYSIS NEEDED
Please analyze:
1. **Quality Issues**: Are there repetitive patterns, unnatural combinations, or linguistic inconsistencies?
2. **Diversity Problems**: Too many similar names or lack of variation?
3. **Lookback Improvements**: Should we adjust the lookback artifact removal (currently 70% threshold, min 3 occurrences)?
4. **Filter Optimization**: Are the current filters (consonant clusters, repeated letters) working effectively?
5. **Option Tuning**: What settings would improve authenticity for this specific dataset?
6. **Pattern Distribution**: Are certain patterns dominating inappropriately?

## TECHNICAL CONTEXT  
- Using lookback artifact removal (70% dominance threshold)
- Outlier filtering (1% threshold) 
- Hard-coded filters: repeated letters, consonant clusters
- Max node length check temporarily disabled
- Bit manipulation for all possible word segmentations

## SPECIFIC IMPROVEMENTS REQUESTED
- Suggest optimal parameter values for this dataset
- Identify problematic generated names and root causes  
- Recommend additional filtering or preprocessing steps
- Propose linguistic rule enhancements
- Advise on dataset-specific optimizations

## PATTERN SAMPLE (Top 10 Start Patterns)
${markovChainResult.patterns['^']?.slice(0, 10).map((pattern, i) => `${i+1}. "${pattern}"`).join('\n') || 'No start patterns'}

## ERROR LOG
${error || 'No errors reported'}

Please provide detailed analysis and actionable recommendations for improving name generation quality.`}
                </pre>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <button
                  onClick={() => {
                    const dataText = document.querySelector('.bg-gray-50.dark\\:bg-gray-800 pre')?.textContent || '';
                    navigator.clipboard.writeText(dataText);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  📋 Copy Analysis Data
                </button>
                <span className="text-xs panda-text-secondary">
                  All system state, parameters, and output data for AI analysis
                </span>
              </div>
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