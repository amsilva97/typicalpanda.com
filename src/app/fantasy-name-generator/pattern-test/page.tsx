'use client';

import { useState } from 'react';
import { SupportedLanguage } from '../lib/markov-chain-language-models/core';
import { testNameDiversity } from '../lib/markov-chain-language-models/tests';

export default function PatternTest() {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(SupportedLanguage.OLD_ENGLISH);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<{
    nameCount: number;
    uniquePercentage: number;
    diversityScore: number;
  } | null>(null);

  const runDiversityTest = async () => {
    setIsRunning(true);
    setTestResults(null);
    
    try {
      console.log(`Running simple diversity test for ${selectedLanguage}...`);
      
      const [nameCount, uniquePercentage, diversityScore] = testNameDiversity(selectedLanguage);
      
      setTestResults({
        nameCount,
        uniquePercentage,
        diversityScore
      });
      
      console.log(`Test complete! Generated ${nameCount} names, ${uniquePercentage.toFixed(1)}% unique, diversity score: ${diversityScore.toFixed(2)}`);
      
    } catch (error) {
      console.error('Test failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getQualityAssessment = () => {
    if (!testResults) return null;
    
    const { nameCount, uniquePercentage, diversityScore } = testResults;
    
    if (nameCount >= 100 && uniquePercentage >= 95 && diversityScore >= 3) {
      return { status: 'excellent', message: 'Excellent name generation quality', color: 'text-green-600' };
    } else if (nameCount >= 50 && uniquePercentage >= 90 && diversityScore >= 2) {
      return { status: 'good', message: 'Good quality with room for improvement', color: 'text-yellow-600' };
    } else {
      return { status: 'poor', message: 'Poor quality - low diversity or early failure', color: 'text-red-600' };
    }
  };  return (
    <div className="min-h-screen panda-bg-primary py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <a 
            href="/fantasy-name-generator" 
            className="panda-link text-sm font-medium"
          >
            ← Back to Fantasy Name Generator
          </a>
        </div>
        
        <h1 className="text-3xl font-bold panda-text-primary mb-8">
          <span className="panda-text-gradient-gold">
            Name Diversity Test
          </span>
        </h1>
        
        <div className="panda-card p-6 mb-6">
          <h2 className="text-xl font-semibold panda-text-primary mb-4">Test Configuration</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="language-select" className="block text-sm font-medium panda-text-primary mb-2">
                Select Language:
              </label>
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as SupportedLanguage)}
                className="w-full px-3 py-2 border panda-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent panda-bg-primary panda-text-primary"
              >
                {Object.values(SupportedLanguage).map((language) => (
                  <option key={language} value={language}>
                    {language.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-4">
              <button
                onClick={runDiversityTest}
                disabled={isRunning}
                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                  isRunning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'panda-button-primary hover:scale-105 transition-transform'
                }`}
              >
                {isRunning ? 'Running Test...' : 'Run Simple Diversity Test'}
              </button>
            </div>
          </div>
          
          <div className="mt-4 p-3 panda-accent-bg rounded-md">
            <p className="panda-accent-text text-sm">
              <strong>Note:</strong> This test generates names one by one until uniqueness drops below 95%, then returns the results.
            </p>
          </div>
        </div>

        {testResults && (
          <div className="panda-card p-6">
            <h2 className="text-xl font-semibold panda-text-primary mb-4">Test Results</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold panda-text-primary mb-2">
                  {testResults.nameCount}
                </div>
                <div className="text-sm panda-text-secondary">Names Generated</div>
                <div className="text-xs panda-text-secondary mt-1">
                  Before uniqueness failed
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold panda-text-primary mb-2">
                  {testResults.uniquePercentage.toFixed(1)}%
                </div>
                <div className="text-sm panda-text-secondary">Final Uniqueness</div>
                <div className="text-xs panda-text-secondary mt-1">
                  Percentage of unique names
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold panda-text-primary mb-2">
                  {testResults.diversityScore.toFixed(2)}
                </div>
                <div className="text-sm panda-text-secondary">Diversity Score</div>
                <div className="text-xs panda-text-secondary mt-1">
                  Average Levenshtein Distance
                </div>
              </div>
            </div>

            {getQualityAssessment() && (
              <div className={`text-center p-4 rounded-md border-2 ${
                getQualityAssessment()?.status === 'excellent' ? 'border-green-200 bg-green-50' :
                getQualityAssessment()?.status === 'good' ? 'border-yellow-200 bg-yellow-50' :
                'border-red-200 bg-red-50'
              }`}>
                <div className={`font-semibold ${getQualityAssessment()?.color}`}>
                  {getQualityAssessment()?.message}
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
              <h3 className="font-semibold panda-text-primary mb-2">Understanding the Metrics:</h3>
              <ul className="text-sm panda-text-secondary space-y-1">
                <li><strong>Names Generated:</strong> Total number of names created before uniqueness dropped below 95%</li>
                <li><strong>Final Uniqueness:</strong> Percentage of unique names in the final list</li>
                <li><strong>Diversity Score:</strong> Average edit distance between all name pairs (higher = more diverse)</li>
                <li><strong>Quality Guide:</strong> Excellent: 100+ names, 95%+ unique, 3+ diversity | Good: 50+ names, 90%+ unique, 2+ diversity</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
