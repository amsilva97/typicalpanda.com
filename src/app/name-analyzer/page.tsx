'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { analyzeOldEnglishName, AnalysisResult, formatSegmentation } from '../lib/analyzer/oldEnglishAnalyzer';

export default function NameAnalyzer() {
  const [inputName, setInputName] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const searchParams = useSearchParams();

  // Check for name parameter from URL and auto-analyze
  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl) {
      setInputName(nameFromUrl);
      // Auto-analyze the name
      setIsAnalyzing(true);
      setTimeout(() => {
        const result = analyzeOldEnglishName(nameFromUrl);
        setAnalysisResult(result);
        setIsAnalyzing(false);
      }, 600);
    }
  }, [searchParams]);

  const analyzeName = () => {
    if (!inputName.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      const result = analyzeOldEnglishName(inputName);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      analyzeName();
    }
  };

  const copyToClipboard = (name: string) => {
    navigator.clipboard.writeText(name);
    // You could add a toast notification here
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
            <span className="panda-text-gradient-gold">
              Name Improver
            </span>
          </h1>
          <p className="text-lg panda-text-secondary max-w-2xl mx-auto">
            Transform any name into authentic Old English alternatives. Get better versions that are generatable by our system with meaningful components.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Input Section */}
          <div className="panda-card p-6 mb-6">
            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium panda-text-primary mb-2 text-center">
                🔍 Enter Name to Analyze
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="e.g., Aelmund, Sigwald, Thorwyn..."
                  className="flex-1 px-4 py-3 panda-input rounded-lg text-center"
                />
                <button
                  onClick={analyzeName}
                  disabled={isAnalyzing || !inputName.trim()}
                  className="panda-button-primary px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isAnalyzing ? (
                    <div className="panda-loading h-5 w-5"></div>
                  ) : (
                    '🔬'
                  )}
                </button>
              </div>
              <p className="text-xs panda-text-muted mt-2 text-center">
                Press Enter or click the analyze button
              </p>
            </div>
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="panda-card p-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold panda-text-primary mb-2">
                    Analysis: "{analysisResult.originalName}"
                  </h2>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                    analysisResult.isGeneratable 
                      ? 'bg-green-900/30 text-green-300 border border-green-700' 
                      : 'bg-yellow-900/30 text-yellow-300 border border-yellow-700'
                  }`}>
                    {analysisResult.isGeneratable ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Already perfect! But we found alternatives
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.734 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        Can be improved - see suggestions below
                      </>
                    )}
                  </div>
                  
                  <p className="panda-text-secondary">
                    {analysisResult.suggestions.length} suggestion{analysisResult.suggestions.length !== 1 ? 's' : ''} found
                    {analysisResult.isGeneratable && ` • ${analysisResult.totalCombinations} valid pattern${analysisResult.totalCombinations !== 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>

              {/* Suggestions */}
              {analysisResult.suggestions.length > 0 && (
                <div className="panda-card p-6">
                  <h3 className="text-xl font-bold panda-text-primary mb-4">
                    ✨ Suggested Improvements
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="panda-name-card p-4 transition-all hover:scale-[1.02] cursor-pointer"
                        onClick={() => copyToClipboard(suggestion.name)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-bold panda-text-primary">
                            {suggestion.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded-full">
                              {suggestion.similarity}% match
                            </span>
                            <svg 
                              className="w-4 h-4 panda-text-muted group-hover:panda-accent-gold opacity-0 hover:opacity-100 transition-opacity"
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                        
                        <div className="text-sm italic panda-text-secondary mb-2">
                          {suggestion.segments.map((segment, segIndex) => {
                            const meaning = suggestion.meanings[segIndex];
                            if (suggestion.segments.length === 1) {
                              return `${segment}: ${meaning}`;
                            } else if (segIndex === 0) {
                              return `${segment}-: ${meaning}`;
                            } else if (segIndex === suggestion.segments.length - 1) {
                              return `-${segment}: ${meaning}`;
                            } else {
                              return `-${segment}-: ${meaning}`;
                            }
                          }).join('\n').split('\n').map((line, lineIndex) => (
                            <div key={lineIndex}>{line}</div>
                          ))}
                        </div>
                        
                        <div className="text-xs panda-text-muted">
                          {suggestion.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm panda-text-muted">
                      Click any suggestion to copy it • All suggestions are generatable by our system
                    </p>
                  </div>
                </div>
              )}

              {/* Original Segmentations (if valid) */}
              {analysisResult.isGeneratable && analysisResult.segmentations.length > 0 && (
                <div className="panda-card p-6">
                  <h3 className="text-xl font-bold panda-text-primary mb-4">
                    🧩 Current Name Breakdown
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {analysisResult.segmentations.map((segmentation, index) => (
                      <div
                        key={index}
                        className="panda-name-card p-4 transition-all hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium panda-text-primary">
                            Pattern {index + 1}
                          </span>
                          <span className="text-xs panda-text-muted">
                            {segmentation.segments.length} part{segmentation.segments.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        
                        <div className="text-sm italic panda-text-secondary">
                          {formatSegmentation(segmentation).split('\n').map((line, lineIndex) => (
                            <div key={lineIndex}>{line}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <p className="text-sm panda-text-muted">
                      Your name is already valid! These show how it breaks down into Old English elements
                    </p>
                  </div>
                </div>
              )}

              {/* No Valid Segmentations */}
              {!analysisResult.isGeneratable && (
                <div className="panda-card p-6 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-4">🤔</div>
                    <h3 className="text-xl font-bold panda-text-primary mb-2">
                      No Valid Patterns Found
                    </h3>
                    <p className="panda-text-secondary mb-4">
                      This name cannot be broken down into valid Old English patterns that our generator could produce.
                    </p>
                    <div className="text-sm panda-text-muted">
                      <p className="mb-2">This could happen because:</p>
                      <ul className="text-left space-y-1">
                        <li>• The name uses non-Old English elements</li>
                        <li>• The pattern combinations don't exist in our rules</li>
                        <li>• The name structure doesn't follow Old English conventions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Links */}
          <div className="text-center mt-8">
            <Link
              href="/name-generator"
              className="panda-link inline-flex items-center"
            >
              ✨ Try the Name Generator
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}