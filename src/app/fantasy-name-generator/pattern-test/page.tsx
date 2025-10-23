'use client';

import { useState } from 'react';
import { generateNamesForLanguage } from '../lib/markov-chain-language-models/generations';
import { SupportedLanguage, getLanguageDefinition } from '../lib/markov-chain-language-models/core';

export default function PatternTest() {
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(SupportedLanguage.OLD_ENGLISH);
  const [isRunning, setIsRunning] = useState(false);
  
  const runPatternStructureTest = () => {
    console.log('🔍 === Pattern Structure Test ===');
    
    try {
      const languageDefinition = getLanguageDefinition(selectedLanguage);
      const patterns = languageDefinition.patterns;
      
      console.log('📊 Pattern Statistics:');
      console.log(`Total patterns: ${Object.keys(patterns).length}`);
      
      // Analyze pattern types
      const startPatterns = patterns['^'] || [];
      const endingPatterns = Object.keys(patterns).filter(key => 
        patterns[key].includes('$')
      );
      
      console.log(`Start patterns: ${startPatterns.length}`);
      console.log(`Patterns that can end: ${endingPatterns.length}`);
      
      // Check for orphaned patterns (patterns that are referenced but don't exist)
      const allReferencedPatterns = new Set<string>();
      Object.values(patterns).forEach((patternArray: string[]) => {
        patternArray.forEach((pattern: string) => {
          if (pattern !== '$') {
            allReferencedPatterns.add(pattern);
          }
        });
      });
      
      const orphanedPatterns = Array.from(allReferencedPatterns).filter(
        pattern => !patterns[pattern]
      );
      
      if (orphanedPatterns.length === 0) {
        console.log('✅ No orphaned patterns found');
      } else {
        console.log('❌ Orphaned patterns found:', orphanedPatterns);
      }
      
      // Check for dead-end patterns (patterns that exist but can't lead anywhere)
      const deadEndPatterns = Object.keys(patterns).filter(key => {
        const destinations = patterns[key];
        return key !== '^' && destinations.length === 0;
      });
      
      if (deadEndPatterns.length === 0) {
        console.log('✅ No dead-end patterns found');
      } else {
        console.log('⚠️  Dead-end patterns found:', deadEndPatterns);
      }
      
      // Show start patterns
      console.log('\n🚀 Start Patterns:', startPatterns);
      
      // Show most connected patterns
      const connectionCounts = new Map<string, number>();
      Object.entries(patterns).forEach(([key, destinations]) => {
        connectionCounts.set(key, (destinations as string[]).length);
      });
      
      const topConnected = Array.from(connectionCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      console.log('\n🔗 Most Connected Patterns:');
      topConnected.forEach(([pattern, count]) => {
        console.log(`  "${pattern}": ${count} connections -> [${patterns[pattern].slice(0, 3).join(', ')}${patterns[pattern].length > 3 ? '...' : ''}]`);
      });
      
    } catch (error) {
      console.error('❌ Pattern structure test failed:', error);
    }
    
    console.log('');
  };

  const runPatternFlowTest = () => {
    console.log('🌊 === Pattern Flow Test ===');
    
    try {
      const languageDefinition = getLanguageDefinition(selectedLanguage);
      const patterns = languageDefinition.patterns;
      
      // Test specific flows manually
      const testFlows = [
        ['ael', 'red'],
        ['god', 'ric'],
        ['wulf', 'stan'],
        ['aethel', 'wald'],
        ['ed', 'mund']
      ];
      
      console.log('Testing specific authentic flows:');
      testFlows.forEach(([start, expectedEnd]) => {
        const startDestinations = patterns[start] || [];
        if (startDestinations.includes(expectedEnd)) {
          console.log(`✅ ${start} -> ${expectedEnd} (creates "${start}${expectedEnd}")`);
        } else {
          console.log(`❌ ${start} -/-> ${expectedEnd} (missing connection)`);
          console.log(`   Available: [${startDestinations.join(', ')}]`);
        }
      });
      
      // Test that major elements can reach endings
      const majorElements = ['ael', 'god', 'wulf', 'aethel', 'ed', 'ead'];
      console.log('\nTesting paths to endings:');
      
      majorElements.forEach(element => {
        const canReachEnd = canReachEndingFrom(patterns, element, new Set());
        if (canReachEnd) {
          console.log(`✅ "${element}" can reach an ending`);
        } else {
          console.log(`❌ "${element}" cannot reach an ending`);
        }
      });
      
    } catch (error) {
      console.error('❌ Pattern flow test failed:', error);
    }
    
    console.log('');
  };

  const runGenerationPathTest = () => {
    console.log('🛤️  === Generation Path Test ===');
    
    try {
      // Generate names with debug info
      const names = generateNamesForLanguage(selectedLanguage, 5);
      
      console.log('Generated names with analysis:');
      names.forEach((name: string, index: number) => {
        console.log(`${index + 1}. "${name}" (${name.length} chars)`);
        
        // Try to analyze the name structure
        analyzeNameStructure(name);
      });
      
    } catch (error) {
      console.error('❌ Generation path test failed:', error);
    }
    
    console.log('');
  };

  const runPatternQualityTest = () => {
    console.log('⭐ === Pattern Quality Test ===');
    
    try {
      const names = generateNamesForLanguage(selectedLanguage, 20);
      
      // Test for authentic Old English characteristics
      const authenticityTests = {
        'Contains authentic prefixes': (name: string) => 
          ['ael', 'god', 'wulf', 'aethel', 'ed', 'ead'].some(prefix => name.startsWith(prefix)),
        
        'Contains authentic endings': (name: string) =>
          ['ric', 'mund', 'ward', 'win', 'wyn', 'red', 'fred', 'gar', 'stan', 'wald'].some(ending => name.endsWith(ending)),
        
        'No awkward single letters': (name: string) =>
          !/(^|[aeiou])[bcdfghjklmnpqrstvwxyz]([bcdfghjklmnpqrstvwxyz]|$)/i.test(name),
        
        'Pronounceable': (name: string) =>
          !/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(name) && !/[aeiou]{4,}/i.test(name),
        
        'Reasonable length': (name: string) =>
          name.length >= 4 && name.length <= 10
      };
      
      console.log('Quality test results:');
      Object.entries(authenticityTests).forEach(([testName, testFunc]) => {
        const passCount = names.filter(testFunc).length;
        const percentage = ((passCount / names.length) * 100).toFixed(1);
        
        if (passCount === names.length) {
          console.log(`✅ ${testName}: ${passCount}/${names.length} (${percentage}%)`);
        } else if (passCount >= names.length * 0.8) {
          console.log(`⚠️  ${testName}: ${passCount}/${names.length} (${percentage}%)`);
        } else {
          console.log(`❌ ${testName}: ${passCount}/${names.length} (${percentage}%)`);
        }
      });
      
      // Show some examples
      console.log('\nGenerated names:', names);
      
      // Find best and worst examples
      const scored = names.map((name: string) => ({
        name,
        score: Object.values(authenticityTests).filter(test => test(name)).length
      }));
      
      scored.sort((a: any, b: any) => b.score - a.score);
      
      console.log(`\nBest examples: ${scored.slice(0, 3).map((s: any) => `"${s.name}" (${s.score}/5)`).join(', ')}`);
      console.log(`Worst examples: ${scored.slice(-3).map((s: any) => `"${s.name}" (${s.score}/5)`).join(', ')}`);
      
    } catch (error) {
      console.error('❌ Pattern quality test failed:', error);
    }
    
    console.log('');
  };

  // Helper function to check if a pattern can reach an ending
  function canReachEndingFrom(patterns: { [key: string]: string[] }, start: string, visited: Set<string>): boolean {
    if (visited.has(start)) return false; // Avoid cycles
    
    const destinations = patterns[start] || [];
    
    if (destinations.includes('$')) return true;
    
    visited.add(start);
    
    for (const destination of destinations) {
      if (destination !== '$' && canReachEndingFrom(patterns, destination, new Set(visited))) {
        return true;
      }
    }
    
    return false;
  }

  // Helper function to analyze name structure
  function analyzeNameStructure(name: string) {
    const commonPrefixes = ['ael', 'god', 'wulf', 'aethel', 'ed', 'ead', 'alf', 'beorn', 'cyne'];
    const commonSuffixes = ['ric', 'mund', 'ward', 'win', 'wyn', 'red', 'fred', 'gar', 'stan', 'wald'];
    
    const foundPrefix = commonPrefixes.find(prefix => name.startsWith(prefix));
    const foundSuffix = commonSuffixes.find(suffix => name.endsWith(suffix));
    
    let analysis = '   ';
    
    if (foundPrefix) {
      analysis += `Prefix: "${foundPrefix}" `;
    }
    
    if (foundSuffix) {
      analysis += `Suffix: "${foundSuffix}" `;
    }
    
    if (foundPrefix && foundSuffix) {
      const middle = name.slice(foundPrefix.length, -foundSuffix.length);
      if (middle) {
        analysis += `Middle: "${middle}" `;
      }
      analysis += `(Structure: ${foundPrefix}+${middle || '∅'}+${foundSuffix})`;
    }
    
    if (analysis.trim()) {
      console.log(analysis);
    }
  }

  const runAllPatternTests = async () => {
    setIsRunning(true);
    console.log(`🧪 === Running All Pattern Tests for ${selectedLanguage} ===\n`);
    
    try {
      runPatternStructureTest();
      runPatternFlowTest();
      runGenerationPathTest();
      runPatternQualityTest();
      
      console.log('✅ All Pattern Tests Complete!');
    } catch (error) {
      console.error('❌ Pattern tests failed:', error);
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
            Pattern Test Suite
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
                onClick={runAllPatternTests}
                disabled={isRunning}
                className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                  isRunning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'panda-button-primary hover:scale-105 transition-transform'
                }`}
              >
                {isRunning ? 'Running Tests...' : '🧪 Run Pattern Tests'}
              </button>
            </div>
          </div>
          
          <div className="mt-4 p-3 panda-accent-bg rounded-md">
            <p className="panda-accent-text text-sm">
              💡 <strong>Tip:</strong> Open the browser console (F12 → Console) to see detailed test results and analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
