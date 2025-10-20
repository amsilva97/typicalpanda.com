'use client';

import { useState } from 'react';
import Link from 'next/link';
import { analyzeOldEnglishName, AnalysisResult, formatSegmentation } from '../lib/analyzer/oldEnglishAnalyzer';

export default function NameAnalyzer() {
  const [inputName, setInputName] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
              Name Analyzer
            </span>
          </h1>
          <p className="text-lg panda-text-secondary max-w-2xl mx-auto">
            Decode any name into its Old English components. Discover all possible ways to break down names into meaningful linguistic patterns.
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
                    Analysis: "{analysisResult.name}"
                  </h2>
                  
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
                    analysisResult.isGeneratable 
                      ? 'bg-green-900/30 text-green-300 border border-green-700' 
                      : 'bg-red-900/30 text-red-300 border border-red-700'
                  }`}>
                    {analysisResult.isGeneratable ? (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Generatable by our system
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Not generatable by our system
                      </>
                    )}
                  </div>
                  
                  {analysisResult.isGeneratable && (
                    <p className="panda-text-secondary">
                      Found {analysisResult.totalCombinations} valid segmentation{analysisResult.totalCombinations !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>

              {/* Segmentations */}
              {analysisResult.isGeneratable && analysisResult.segmentations.length > 0 && (
                <div className="panda-card p-6">
                  <h3 className="text-xl font-bold panda-text-primary mb-4">
                    🧩 Possible Segmentations
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    {analysisResult.segmentations.map((segmentation, index) => (
                      <div
                        key={index}
                        className="panda-name-card p-4 transition-all hover:scale-[1.02]"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium panda-text-primary">
                            Option {index + 1}
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
                      All segmentations follow valid Old English pattern rules and can be generated by our system
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