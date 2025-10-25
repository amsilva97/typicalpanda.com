'use client';

import { useState } from 'react';
import { SupportedLanguage } from '../lib/markov-chain-language-models/core';
import { generateNamesForLanguage } from '../lib/markov-chain-language-models/generator';
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

            // Use setTimeout to let the UI update before starting the heavy computation
            await new Promise(resolve => setTimeout(resolve, 100));

            const [nameCount, uniquePercentage, diversityScore] = await new Promise<[number, number, number]>((resolve) => {
                // Run the test in the next tick to allow UI to update
                setTimeout(() => {
                    const result = testNameDiversity(selectedLanguage);
                    resolve(result);
                }, 10);
            });

            setTestResults({
                nameCount,
                uniquePercentage,
                diversityScore
            });

            console.log(`Test complete! Generated ${nameCount} names, ${uniquePercentage.toFixed(2)}% unique, diversity score: ${diversityScore.toFixed(2)}`);

        } catch (error) {
            console.error('Test failed:', error);
        } finally {
            setIsRunning(false);
        }
    };

    return (
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
                                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${isRunning
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'panda-button-primary hover:scale-105 transition-transform'
                                    }`}
                            >
                                {isRunning ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Running Test...
                                    </div>
                                ) : 'Run Simple Diversity Test'}
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 p-3 panda-accent-bg rounded-md">
                        <p className="panda-accent-text text-sm">
                            <strong>Note:</strong> This test generates names one by one until uniqueness drops below 70%, then returns the results.
                        </p>
                    </div>
                </div>

                {isRunning && (
                    <div className="panda-card p-6 mb-6">
                        <div className="flex flex-col items-center justify-center py-12">
                            <svg className="animate-spin h-12 w-12 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <h3 className="text-lg font-semibold panda-text-primary mb-2">Running Diversity Test</h3>
                            <p className="panda-text-secondary text-center">
                                Generating names and analyzing patterns...<br />
                                This may take a few moments.
                            </p>
                        </div>
                    </div>
                )}

                {testResults && (
                    <div className="panda-card p-6 mb-6">
                        <h2 className="text-xl font-semibold panda-text-primary mb-4">Sample Names Generated</h2>
                        <div className="grid grid-cols-5 gap-2 text-sm panda-text-secondary">
                            {(() => {
                                // Generate sample names for display using generateNamesForLanguage
                                let generatedNames: string[] = [];

                                try {
                                    // Generate 50 names at once using the proper API
                                    generatedNames = generateNamesForLanguage(selectedLanguage, 50);
                                    
                                    // Fill remaining slots with '---' if we didn't get 50 names
                                    while (generatedNames.length < 50) {
                                        generatedNames.push('---');
                                    }
                                } catch (error) {
                                    console.error('Error generating sample names:', error);
                                    return <div className="col-span-5 text-center py-4 text-red-500">Error generating sample names</div>;
                                }

                                // Count occurrences to identify duplicates
                                const nameCounts = generatedNames.reduce((counts, name) => {
                                    counts[name] = (counts[name] || 0) + 1;
                                    return counts;
                                }, {} as Record<string, number>);

                                // Render with duplicate highlighting
                                return generatedNames.map((name, i) => {
                                    const isDuplicate = nameCounts[name] > 1;
                                    return (
                                        <div
                                            key={i}
                                            className={`p-2 rounded text-center truncate ${isDuplicate
                                                    ? 'bg-red-200 dark:bg-red-800 border-2 border-red-400 font-semibold'
                                                    : 'bg-gray-100 dark:bg-gray-700'
                                                }`}
                                        >
                                            {name}
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                )}

                {testResults && (
                    <div className="panda-card p-6">
                        <h2 className="text-xl font-semibold panda-text-primary mb-4">Uniqueness Test</h2>

                        <div className="grid md:grid-cols-3 gap-6 mb-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold panda-text-primary mb-2">
                                    {testResults.nameCount === -1 ? 'No Failure' : testResults.nameCount.toFixed(2)}
                                </div>
                                <div className="text-sm panda-text-secondary">Failure Point</div>
                                <div className="text-xs panda-text-secondary mt-1">
                                    {testResults.nameCount === -1 ? 'Never dropped below 70%' : 'When uniqueness dropped below 70%'}
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold panda-text-primary mb-2">
                                    {testResults.uniquePercentage.toFixed(2)}%
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

                        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <h3 className="font-semibold panda-text-primary mb-3">Understanding the Metrics:</h3>

                            <div className="grid md:grid-cols-2 gap-4 text-sm panda-text-secondary">
                                <div className="space-y-2">
                                    <h4 className="font-medium panda-text-primary">Core Measurements:</h4>
                                    <ul className="space-y-1 ml-2">
                                        <li><strong>Failure Point:</strong> The exact generation count when uniqueness first drops below 70%.</li>
                                        <li><strong>Final Uniqueness:</strong> The percentage of completely unique names out of 100 total generations. Higher percentages indicate better pattern diversity.</li>
                                        <li><strong>Diversity Score:</strong> Average Levenshtein edit distance between all name pairs. Higher scores indicate greater linguistic variation between generated names.</li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="font-medium panda-text-primary">Quality Classifications:</h4>
                                    <ul className="space-y-1 ml-2">
                                        <li><strong className="text-green-600">Excellent:</strong> No failure point OR 100+ names before failure, 90%+ uniqueness, 6.0+ diversity score</li>
                                        <li><strong className="text-yellow-600">Good:</strong> 50+ names before failure, 80%+ uniqueness, 4.0+ diversity score</li>
                                        <li><strong className="text-red-600">Poor:</strong> Early failure (&lt;50 names) or low diversity/uniqueness metrics</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                                <p className="text-xs panda-text-secondary italic">
                                    These metrics help evaluate how well the linguistic patterns generate diverse, authentic names while avoiding repetition and maintaining historical accuracy.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
