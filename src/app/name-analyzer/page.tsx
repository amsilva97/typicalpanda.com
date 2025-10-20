'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { analyzeNameGeneric, AnalysisResult } from '../lib/patterns';

export default function NameAnalyzer() {
  const [nameFromGenerator, setNameFromGenerator] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const searchParams = useSearchParams();

  // Check for name parameter from URL
  useEffect(() => {
    const nameFromUrl = searchParams.get('name');
    if (nameFromUrl) {
      setNameFromGenerator(nameFromUrl);
    }
  }, [searchParams]);

  const analyzeCurrentName = () => {
    if (nameFromGenerator) {
      const result = analyzeNameGeneric(nameFromGenerator);
      setAnalysisResult(result);
    }
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

        <div className="max-w-4xl mx-auto">
          <div className="panda-card p-6">
            {nameFromGenerator ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold panda-text-primary mb-4">
                  Analyzing Name:
                </h2>
                <div className="text-3xl font-bold panda-text-gradient-silver mb-4">
                  {nameFromGenerator}
                </div>
                
                <button
                  onClick={analyzeCurrentName}
                  className="panda-button-primary px-6 py-3 rounded-lg mb-4"
                >
                  🔬 Analyze This Name
                </button>

                {analysisResult ? (
                  <div className="mt-6">
                    <div className="text-left panda-card p-4">
                      <h3 className="text-lg font-bold panda-text-primary mb-2">Analysis Results:</h3>
                      <p className="panda-text-secondary mb-2">
                        <strong>Original Name:</strong> {analysisResult.originalName}
                      </p>
                      <p className="panda-text-secondary mb-2">
                        <strong>Is Generatable:</strong> {analysisResult.isGeneratable ? 'Yes' : 'No'}
                      </p>
                      <p className="panda-text-secondary mb-2">
                        <strong>Suggestions Found:</strong> {analysisResult.suggestions.length}
                      </p>
                      {analysisResult.suggestions.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-bold panda-text-primary mb-2">Suggestions:</h4>
                          <ul className="space-y-2">
                            {analysisResult.suggestions.map((suggestion, index) => (
                              <li key={index} className="panda-text-secondary">
                                <strong>{suggestion.name}</strong> ({suggestion.similarity}% match)
                                <br />
                                <em>{suggestion.reason}</em>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="panda-text-secondary">
                    Click the button above to analyze this name!
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p className="panda-text-secondary">
                  No name received. Please navigate from the name generator.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}