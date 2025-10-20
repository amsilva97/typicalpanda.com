'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { analyzeName, NameAnalysis, GenerationPath, GenerationStep } from '../lib/patterns/analyzer';
import { SupportedLanguage } from '../lib/patterns/generations';

export default function NameAnalyzer() {
  const [nameFromGenerator, setNameFromGenerator] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<NameAnalysis[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage | null>(null);
  const searchParams = useSearchParams();

  // Check for name parameter from URL
  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl) {
      setNameFromGenerator(nameFromUrl);
    }
  }, [searchParams]);

  const analyzeCurrentName = async () => {
    if (nameFromGenerator) {
      setIsAnalyzing(true);
      try {
        // Analyze the name using the new comprehensive analyzer
        const results = analyzeName(nameFromGenerator);
        setAnalysisResults(results);
        if (results.length > 0) {
          setSelectedLanguage(results[0].language); // Default to best match
        }
      } catch (error) {
        console.error('Analysis failed:', error);
        setAnalysisResults([]);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const renderGenerationPath = (path: GenerationPath, index: number) => {
    return (
      <div key={index} className="border border-gray-600 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-sm font-bold panda-text-primary">
            Path {index + 1} {path.isValid ? '✅' : '⚠️'}
          </h5>
          <span className="text-xs panda-text-secondary">
            {(path.completionRate * 100).toFixed(1)}% coverage
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs panda-text-secondary px-2 py-1 bg-gray-700 rounded">
            START
          </span>
          {path.steps.map((step: GenerationStep, stepIndex: number) => (
            <span 
              key={stepIndex}
              className="text-xs panda-text-primary px-2 py-1 bg-blue-900 rounded"
              title={`Position ${step.position}: Added "${step.addedText}"`}
            >
              {step.pattern}
            </span>
          ))}
          {path.isValid && (
            <span className="text-xs panda-text-secondary px-2 py-1 bg-gray-700 rounded">
              END
            </span>
          )}
        </div>
        
        <div className="text-xs panda-text-secondary">
          Reconstruction: {path.steps.map(step => step.addedText).join('')}
        </div>
      </div>
    );
  };

  const renderLanguageAnalysis = (analysis: NameAnalysis) => {
    return (
      <div className="border border-gray-600 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-lg font-bold panda-text-primary">
            {analysis.language.replace('_', ' ').toUpperCase()}
          </h4>
          <div className="text-right">
            <div className="text-sm panda-text-primary font-bold">
              {(analysis.confidence * 100).toFixed(1)}% confidence
            </div>
            <div className="text-xs panda-text-secondary">
              {analysis.possiblePaths.length} possible path{analysis.possiblePaths.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {analysis.bestPath && (
          <div className="mb-4">
            <h5 className="text-sm font-bold panda-text-primary mb-2">Best Generation Path:</h5>
            {renderGenerationPath(analysis.bestPath, 0)}
          </div>
        )}

        {analysis.possiblePaths.length > 1 && (
          <div>
            <button
              onClick={() => setSelectedLanguage(
                selectedLanguage === analysis.language ? null : analysis.language
              )}
              className="text-sm panda-button-secondary px-3 py-1 rounded mb-3"
            >
              {selectedLanguage === analysis.language ? 'Hide' : 'Show'} All Paths ({analysis.possiblePaths.length})
            </button>
            
            {selectedLanguage === analysis.language && (
              <div className="space-y-2">
                <h5 className="text-sm font-bold panda-text-primary">All Possible Paths:</h5>
                {analysis.possiblePaths.map((path, index) => renderGenerationPath(path, index))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen panda-bg-primary">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold panda-text-primary mb-4">
            <span className="panda-text-gradient-gold">
              Name Analyzer
            </span>
          </h1>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="panda-card p-6">
            {nameFromGenerator ? (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold panda-text-primary mb-4">
                    Analyzing Name:
                  </h2>
                  <div className="text-3xl font-bold panda-text-gradient-silver mb-4">
                    {nameFromGenerator}
                  </div>
                  
                  <button
                    onClick={analyzeCurrentName}
                    disabled={isAnalyzing}
                    className="panda-button-primary px-6 py-3 rounded-lg mb-4 disabled:opacity-50"
                  >
                    {isAnalyzing ? '🔬 Analyzing...' : '🔬 Analyze This Name'}
                  </button>
                </div>

                {analysisResults && analysisResults.length > 0 ? (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold panda-text-primary mb-2">
                        Analysis Results
                      </h3>
                      <p className="panda-text-secondary">
                        Found {analysisResults.reduce((sum, analysis) => sum + analysis.possiblePaths.length, 0)} total generation paths
                        across {analysisResults.length} language{analysisResults.length !== 1 ? 's' : ''}
                      </p>
                    </div>

                    {/* Best Match Summary */}
                    {analysisResults[0].confidence > 0 && (
                      <div className="panda-card p-4 border-l-4 border-green-500 mb-6">
                        <h4 className="text-lg font-bold panda-text-primary mb-2">
                          🎯 Best Match: {analysisResults[0].language.replace('_', ' ').toUpperCase()}
                        </h4>
                        <p className="panda-text-secondary">
                          {(analysisResults[0].confidence * 100).toFixed(1)}% confidence - 
                          This name most likely comes from {analysisResults[0].language.replace('_', ' ')} patterns
                          {analysisResults[0].bestPath?.isValid ? ' and can be fully reconstructed' : ' but may be partially modified'}
                        </p>
                      </div>
                    )}

                    {/* Language-by-Language Analysis */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold panda-text-primary">
                        Detailed Analysis by Language:
                      </h4>
                      {analysisResults
                        .filter(analysis => analysis.confidence > 0 || analysis.possiblePaths.length > 0)
                        .map((analysis, index) => (
                          <div key={index}>
                            {renderLanguageAnalysis(analysis)}
                          </div>
                        ))}
                    </div>

                    {/* No matches found */}
                    {analysisResults.every(analysis => analysis.confidence === 0) && (
                      <div className="panda-card p-4 border-l-4 border-red-500">
                        <h4 className="text-lg font-bold panda-text-primary mb-2">
                          ❌ No Generation Paths Found
                        </h4>
                        <p className="panda-text-secondary">
                          This name doesn't appear to follow any of the supported language patterns. 
                          It may be from a different language system or created manually.
                        </p>
                      </div>
                    )}
                  </div>
                ) : analysisResults && analysisResults.length === 0 ? (
                  <div className="text-center panda-card p-4">
                    <p className="panda-text-secondary">
                      Analysis complete, but no patterns were found for this name.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="panda-text-secondary">
                      Click the button above to analyze this name and discover how it could have been generated!
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="panda-text-secondary mb-4">
                  No name received. Please navigate from the name generator or enter a name below.
                </p>
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    placeholder="Enter a name to analyze..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 panda-text-primary focus:outline-none focus:border-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        if (target.value.trim()) {
                          setNameFromGenerator(target.value.trim());
                        }
                      }
                    }}
                  />
                  <p className="text-xs panda-text-secondary mt-2">
                    Press Enter to analyze
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}