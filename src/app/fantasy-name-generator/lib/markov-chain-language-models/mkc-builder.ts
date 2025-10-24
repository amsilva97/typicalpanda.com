import { LanguageDefinition } from "./core";

// Configuration constants
const DEFAULT_MAX_NODE_LENGTH = 5;
const DEFAULT_OUTLIER_THRESHOLD = 0.01; // 1%
const CONSONANTS_PATTERN = /[bcdfghjklmnpqrstvwxz]{2,}/i;
const REPEATED_LETTER_PATTERN = /(.)\1/;
const CLUSTER_MIN_LENGTH = 3;

// Language-agnostic quality constants
const MIN_NAME_LENGTH = 4; // Increased to prevent short fragments like "eri", "rin"
const MAX_PHONEME_REPETITION = 3; // Limit repeated sounds like "mereradoc"
const IMPROVED_LOOKBACK_THRESHOLD = 0.8; // Stricter than 70%
const VOWEL_PATTERN = /[aeiouAEIOU]/;
const MAX_ENDING_DOMINANCE = 0.2; // Reduce ending pattern dominance to 20%

/**
 * Create an empty language definition with undefined options (all disabled by default)
 */
export function createEmptyLanguageDefinition(): LanguageDefinition {
    return {
        patterns: {},
        options: {
            name: 'Custom Markov Chain',
            minNodes: undefined,
            maxNodes: undefined,
            consecutiveSingleLetterLimit: undefined,
            nonConsecutiveSingleLetterLimit: undefined,
            duplicateClusterLimit: undefined,
            totalClusterLimit: undefined
        }
    };
}

/**
 * Generates all possible ways to segment a word into substrings.
 * Uses bit manipulation to generate 2^(n-1) different groupings,
 * where n is the word length. Each bit position represents a potential
 * split point between characters.
 * 
 * @param word - The word to segment
 * @returns Array of all possible segmentations, each as an array of substrings
 * @example allGroupings("cat") returns [["cat"], ["c", "at"], ["ca", "t"], ["c", "a", "t"]]
 */
function allGroupings(word: string): string[][] {
    const n = word.length;
    const results: string[][] = [];

    // Generate all possible splits using bit manipulation
    // Each bit represents a split point between characters
    for (let mask = 0; mask < (1 << (n - 1)); mask++) {
        const grouping: string[] = [];
        let current = word[0];
        
        for (let i = 0; i < n - 1; i++) {
            if (mask & (1 << i)) {
                // Split at this position
                grouping.push(current);
                current = word[i + 1];
            } else {
                // Continue current segment
                current += word[i + 1];
            }
        }
        grouping.push(current);
        results.push(grouping);
    }

    return results;
}

/**
 * Language-agnostic quality validation for name segments.
 * Applies universal linguistic principles to filter out low-quality patterns.
 * 
 * @param segments - Array of name segments to validate
 * @returns True if segments meet quality standards
 */
function isHighQualityPattern(segments: string[]): boolean {
    const fullName = segments.join('');
    
    // Minimum name length check (prevents fragments like "dog")
    if (fullName.length < MIN_NAME_LENGTH) {
        return false;
    }
    
    // Check for excessive phoneme repetition (prevents "mereradoc" type issues)
    if (hasExcessivePhonemeRepetition(fullName)) {
        return false;
    }
    
    // Check for unnatural consonant clusters at word start
    if (hasUnaturalStartCluster(fullName)) {
        return false;
    }
    
    // Ensure reasonable vowel distribution
    if (!hasReasonableVowelDistribution(segments)) {
        return false;
    }
    
    // Final check for very short segments that might slip through
    if (segments.length === 1 && segments[0].length < MIN_NAME_LENGTH) {
        return false;
    }
    
    return true;
}

/**
 * Detects excessive repetition of similar phonemes that create unnatural sounds.
 */
function hasExcessivePhonemeRepetition(name: string): boolean {
    const lower = name.toLowerCase();
    
    // Check for repeated syllable-like patterns (er-er-er, wa-wa, etc.)
    if (hasRepeatedSyllablePatterns(lower)) {
        return true;
    }
    
    // Check for excessive single consonant repetition
    const consonantGroups = lower.match(/[bcdfghjklmnpqrstvwxz]+/g) || [];
    
    for (const group of consonantGroups) {
        // Check for excessive repetition of same consonant type
        const rCount = (group.match(/r/g) || []).length;
        const lCount = (group.match(/l/g) || []).length;
        const nCount = (group.match(/n/g) || []).length;
        const wCount = (group.match(/w/g) || []).length;
        
        if (rCount > 2 || lCount > 2 || nCount > 2 || wCount > 2) {
            return true;
        }
    }
    
    // Check for alternating vowel-consonant repetition patterns
    if (hasAlternatingRepetition(lower)) {
        return true;
    }
    
    return false;
}

/**
 * Detects repeated syllable-like patterns that create stuttering effects.
 */
function hasRepeatedSyllablePatterns(name: string): boolean {
    // Check for 2-3 character patterns that repeat (like "er", "wa", "an")
    for (let patternLength = 2; patternLength <= 3; patternLength++) {
        for (let i = 0; i <= name.length - patternLength * 2; i++) {
            const pattern = name.substr(i, patternLength);
            const nextPattern = name.substr(i + patternLength, patternLength);
            
            if (pattern === nextPattern) {
                // Found immediate repetition, check if it continues
                let repetitions = 2;
                let nextIndex = i + patternLength * 2;
                
                while (nextIndex + patternLength <= name.length && 
                       name.substr(nextIndex, patternLength) === pattern) {
                    repetitions++;
                    nextIndex += patternLength;
                }
                
                // Flag if pattern repeats 3+ times or 2+ times for longer patterns
                if (repetitions >= 3 || (patternLength >= 3 && repetitions >= 2)) {
                    return true;
                }
            }
        }
    }
    
    return false;
}

/**
 * Detects alternating repetition patterns like "abab" or "cdcd".
 */
function hasAlternatingRepetition(name: string): boolean {
    // Check for alternating 2-character patterns
    for (let i = 0; i <= name.length - 4; i++) {
        const pattern1 = name.substr(i, 2);
        const pattern2 = name.substr(i + 2, 2);
        
        if (pattern1 === pattern2) {
            return true; // Found "abab" pattern
        }
    }
    
    return false;
}

/**
 * Detects unnatural consonant clusters at the beginning of names.
 */
function hasUnaturalStartCluster(name: string): boolean {
    // Check for difficult-to-pronounce consonant starts
    const unnaturalStarts = /^[bcdfghjklmnpqrstvwxz]{3,}/i;
    return unnaturalStarts.test(name);
}

/**
 * Ensures segments have reasonable vowel distribution for pronounceability.
 */
function hasReasonableVowelDistribution(segments: string[]): boolean {
    let totalSegments = segments.length;
    let segmentsWithVowels = 0;
    
    for (const segment of segments) {
        if (segment.length > 2 && VOWEL_PATTERN.test(segment)) {
            segmentsWithVowels++;
        } else if (segment.length <= 2) {
            // Short segments are usually okay
            segmentsWithVowels++;
        }
    }
    
    // At least 50% of multi-character segments should contain vowels
    return (segmentsWithVowels / totalSegments) >= 0.5;
}

/**
 * Filters out name segmentations that don't meet the specified constraints.
 * Applies both user-configurable options and hard-coded quality filters
 * to ensure generated names follow linguistic patterns.
 * 
 * @param nameSegments - Array of name segmentations to filter
 * @param languageDefinition - Contains filtering options and constraints
 * @returns Filtered array of valid name segmentations
 */
function removeInvalidPatterns(nameSegments: string[][], languageDefinition: LanguageDefinition): string[][] {
    const options = languageDefinition.options;

    // Enforce minimum nodes constraint
    if (options.minNodes !== undefined) {
        const minNodes = options.minNodes;
        nameSegments = nameSegments.filter(segments => segments.length >= minNodes);
    }

    // Enforce maximum nodes constraint
    if (options.maxNodes !== undefined) {
        const maxNodes = options.maxNodes;
        nameSegments = nameSegments.filter(segments => segments.length <= maxNodes);
    }

    // Enforce non-consecutive single letter limit
    if (options.nonConsecutiveSingleLetterLimit !== undefined) {
        const limit = options.nonConsecutiveSingleLetterLimit;
        nameSegments = nameSegments.filter(segments => {
            const singleLetterCount = segments.filter(s => s.length === 1).length;
            return singleLetterCount <= limit;
        })
    }

    // Enforce consecutive single letter limit
    if (options.consecutiveSingleLetterLimit !== undefined) {
        const limit = options.consecutiveSingleLetterLimit;
        nameSegments = nameSegments.filter(segments => {
            let maxConsecutive = 0;
            let currentConsecutive = 0;
            segments.forEach(s => {
                if (s.length === 1) {
                    currentConsecutive++;
                    if (currentConsecutive > maxConsecutive) {
                        maxConsecutive = currentConsecutive;
                    }
                } else {
                    currentConsecutive = 0;
                }
            });
            return maxConsecutive <= limit;
        })
    }

    // Enforce total cluster limit
    if (options.totalClusterLimit !== undefined) {
        const limit = options.totalClusterLimit;
        nameSegments = nameSegments.filter(segments => {
            const clusterCount = segments.filter(s => s.length >= CLUSTER_MIN_LENGTH).length;
            return clusterCount <= limit;
        })
    }

    // Enforce duplicate cluster limit
    if (options.duplicateClusterLimit !== undefined) {
        const limit = options.duplicateClusterLimit;
        nameSegments = nameSegments.filter(segments => {
            const clusterCounts: { [key: string]: number } = {};
            for (const s of segments) {
                if (s.length >= CLUSTER_MIN_LENGTH) {
                    clusterCounts[s] = (clusterCounts[s] || 0) + 1;
                    if (clusterCounts[s] > limit) {
                        return false;
                    }
                }
            }
            return true;
        })
    }

    /* Temporarily remove this as the outlier should be able to this ones job */
    // // Remove any that have a node with 5 or more characters
    // nameSegments = nameSegments.filter(segments => {
    //     return !segments.some(s => s.length >= DEFAULT_MAX_NODE_LENGTH);
    // });

    // Remove any that have a node with the same letter twice in a row
    nameSegments = nameSegments.filter(segments => {
        return !segments.some(s => REPEATED_LETTER_PATTERN.test(s));
    });

    // Remove any that have a node with double consonants (any two consecutive consonants)
    nameSegments = nameSegments.filter(segments => {
        return !segments.some(s => CONSONANTS_PATTERN.test(s));
    });

    // Apply language-agnostic quality validation
    nameSegments = nameSegments.filter(segments => isHighQualityPattern(segments));

    return nameSegments
}

/**
 * Removes name segmentations that contain rarely occurring nodes (outliers).
 * This helps improve pattern quality by filtering out nodes that appear
 * in fewer than a threshold percentage of names, which are likely noise
 * or unusual patterns that shouldn't influence generation.
 * 
 * @param nameGroupingList - Array of all name groupings to analyze
 * @returns Filtered array with outlier-containing groupings removed
 */
function removeOutliers(nameGroupingList: string[][][]): string[][][] {
    const namesWereNodeExists: { [key: string]: number } = {};
    const totalNames = nameGroupingList.length;
    const outlierThreshold = DEFAULT_OUTLIER_THRESHOLD; // Nodes appearing in less than n% of names are outliers

    // Count occurrences of each node across all names
    nameGroupingList.forEach(groupings => {
        groupings.forEach(grouping => {
            // Use a set to avoid counting duplicates within the same name
            const uniqueNodes = new Set<string>(grouping);
            uniqueNodes.forEach(node => {
                namesWereNodeExists[node] = (namesWereNodeExists[node] || 0) + 1;
            });
        })
    })

    // Calculate frequency percentages of names a node appears in
    const nodeFrequencies: { [key: string]: number } = {};
    for (const node in namesWereNodeExists) {
        nodeFrequencies[node] = namesWereNodeExists[node] / totalNames;
    }

    // Remove groupings that contain outlier nodes
    nameGroupingList = nameGroupingList.map(groupings => {
        return groupings.filter(grouping => {
            return !grouping.some(node => nodeFrequencies[node] < outlierThreshold);
        });
    });

    return nameGroupingList;
}

/**
 * Analyzes groupings to identify nodes that are likely artificial splits
 * of natural linguistic clusters. Uses lookback analysis to detect when
 * a node is frequently preceded by specific characters, suggesting they
 * should be merged into a single cluster.
 * 
 * @param nameGroupingList - Array of all name groupings to analyze
 * @returns Filtered array with artificial splits removed
 */
function removeLookbackArtifacts(nameGroupingList: string[][][]): string[][][] {
    const LOOKBACK_THRESHOLD = IMPROVED_LOOKBACK_THRESHOLD; // Stricter 80% threshold
    const MIN_OCCURRENCES = 4; // Higher minimum for better statistical reliability
    
    // Track predecessors for each node across all groupings
    const nodePredecessors: { [node: string]: { [predecessor: string]: number } } = {};
    const nodeTotalOccurrences: { [node: string]: number } = {};
    
    // Analyze all groupings to build predecessor statistics
    nameGroupingList.forEach(groupings => {
        groupings.forEach(grouping => {
            for (let i = 1; i < grouping.length; i++) {
                const node = grouping[i];
                const predecessor = grouping[i - 1];
                
                if (!nodePredecessors[node]) {
                    nodePredecessors[node] = {};
                    nodeTotalOccurrences[node] = 0;
                }
                
                nodePredecessors[node][predecessor] = (nodePredecessors[node][predecessor] || 0) + 1;
                nodeTotalOccurrences[node]++;
            }
        });
    });
    
    // Identify nodes that are likely artificial splits
    const artificialNodes = new Set<string>();
    
    Object.entries(nodePredecessors).forEach(([node, predecessors]) => {
        const totalOccurrences = nodeTotalOccurrences[node];
        
        // Skip if not enough occurrences for meaningful analysis
        if (totalOccurrences < MIN_OCCURRENCES) return;
        
        // Find the most common predecessor
        let maxCount = 0;
        let dominantPredecessor = '';
        
        Object.entries(predecessors).forEach(([predecessor, count]) => {
            if (count > maxCount) {
                maxCount = count;
                dominantPredecessor = predecessor;
            }
        });
        
        // If one predecessor dominates, this node is likely an artificial split
        const dominanceRatio = maxCount / totalOccurrences;
        if (dominanceRatio >= LOOKBACK_THRESHOLD) {
            // Additional check: the combined cluster should be reasonable length
            const combinedLength = dominantPredecessor.length + node.length;
            if (combinedLength <= 4) { // Don't create overly long clusters
                artificialNodes.add(node);
                console.log(`Identified artificial split: '${node}' (${dominanceRatio.toFixed(2)} ratio with predecessor '${dominantPredecessor}')`);
            }
        }
    });
    
    // Filter out groupings that contain artificial splits
    return nameGroupingList.map(groupings => {
        return groupings.filter(grouping => {
            // Remove groupings where any node (except the first) is identified as artificial
            for (let i = 1; i < grouping.length; i++) {
                if (artificialNodes.has(grouping[i])) {
                    return false;
                }
            }
            return true;
        });
    });
}

/**
 * Balances specific overused patterns to prevent dominance of particular suffixes.
 * 
 * @param patterns - Current patterns array
 * @param key - Pattern key being processed
 * @param languageDefinition - Language definition to modify
 */
function balanceSpecificPatterns(patterns: string[], key: string, languageDefinition: LanguageDefinition): void {
    const MAX_PATTERN_INSTANCES = 3; // Limit any single pattern to 3 instances
    
    // Count occurrences of each pattern
    const patternCounts: { [pattern: string]: number } = {};
    patterns.forEach(pattern => {
        patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
    });
    
    // Find overused patterns
    const overusedPatterns = Object.entries(patternCounts)
        .filter(([pattern, count]) => count > MAX_PATTERN_INSTANCES)
        .map(([pattern, count]) => pattern);
    
    if (overusedPatterns.length > 0) {
        // Rebuild patterns array with limited instances
        const balancedPatterns: string[] = [];
        
        for (const [pattern, count] of Object.entries(patternCounts)) {
            const allowedCount = Math.min(count, MAX_PATTERN_INSTANCES);
            for (let i = 0; i < allowedCount; i++) {
                balancedPatterns.push(pattern);
            }
        }
        
        languageDefinition.patterns[key] = balancedPatterns;
        
        // Log significant reductions
        overusedPatterns.forEach(pattern => {
            console.log(`Balanced overused pattern '${pattern}' in key '${key}' (was ${patternCounts[pattern]}, now ${MAX_PATTERN_INSTANCES})`);
        });
    }
}

/**
 * Balances pattern frequencies to prevent certain endings or transitions
 * from dominating the generation process. Applies caps to overly frequent patterns.
 * 
 * @param languageDefinition - Language definition to balance
 */
function balancePatternFrequencies(languageDefinition: LanguageDefinition): void {
    const MAX_PATTERN_FREQUENCY = 6; // More aggressive capping
    const ENDING_BALANCE_RATIO = MAX_ENDING_DOMINANCE; // Use the stricter 20% limit
    
    // Balance general pattern frequencies
    for (const [key, patterns] of Object.entries(languageDefinition.patterns)) {
        if (patterns.length > MAX_PATTERN_FREQUENCY) {
            // Count frequency of each pattern
            const patternCounts: { [pattern: string]: number } = {};
            patterns.forEach(pattern => {
                patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
            });
            
            // Limit overrepresented patterns
            const balancedPatterns: string[] = [];
            const maxAllowed = Math.max(2, Math.floor(patterns.length / Object.keys(patternCounts).length * 1.5));
            
            for (const [pattern, count] of Object.entries(patternCounts)) {
                const allowedCount = Math.min(count, maxAllowed);
                for (let i = 0; i < allowedCount; i++) {
                    balancedPatterns.push(pattern);
                }
            }
            
            languageDefinition.patterns[key] = balancedPatterns;
        }
        
        // Balance specific overused suffix patterns (like "wyn")
        balanceSpecificPatterns(patterns, key, languageDefinition);
        
        // Special handling for ending patterns to prevent dominance
        if (patterns.includes('$')) {
            const endingCount = patterns.filter(p => p === '$').length;
            const totalCount = patterns.length;
            
            if (endingCount / totalCount > ENDING_BALANCE_RATIO) {
                // Reduce ending frequency to maintain balance
                const targetEndingCount = Math.floor(totalCount * ENDING_BALANCE_RATIO);
                const nonEndingPatterns = patterns.filter(p => p !== '$');
                const balancedPatterns = [...nonEndingPatterns];
                
                for (let i = 0; i < targetEndingCount; i++) {
                    balancedPatterns.push('$');
                }
                
                languageDefinition.patterns[key] = balancedPatterns;
            }
        }
    }
}

/**
 * Build a Markov chain from a list of names by analyzing all possible
 * segmentations of each name and creating transition patterns between segments.
 * 
 * @param names - Array of name strings to analyze
 * @param languageDefinition - Language definition to populate with patterns
 * @returns The updated language definition with generated patterns
 * @throws Error if inputs are invalid
 */
export function buildChain(names: string[], languageDefinition: LanguageDefinition): LanguageDefinition {
    // Input validation
    if (!Array.isArray(names)) {
        throw new Error('Names must be an array');
    }
    
    if (!languageDefinition || typeof languageDefinition !== 'object') {
        throw new Error('Language definition must be a valid object');
    }
    
    if (!languageDefinition.options || typeof languageDefinition.options !== 'object') {
        throw new Error('Language definition must have valid options object');
    }
    
    const validNames = names.filter(name => 
        typeof name === 'string' && name.trim().length > 0
    );
    
    if (validNames.length === 0) {
        throw new Error('At least one valid non-empty name is required');
    }

    // Reset patterns
    languageDefinition.patterns = {};

    let nameGroupingList: string[][][] = [];

    // Process each valid name to get valid groupings
    validNames.forEach(name => {
        const cleanName = name.toLowerCase().trim();
        let groupings = allGroupings(cleanName);
        groupings = removeInvalidPatterns(groupings, languageDefinition);
        nameGroupingList.push(groupings);
    });

    nameGroupingList = removeOutliers(nameGroupingList);
    nameGroupingList = removeLookbackArtifacts(nameGroupingList);

    // Build patterns from names
    nameGroupingList.forEach(groupings => {
        // Initialize pattern arrays if they don't exist
        if (!languageDefinition.patterns['^']) {
            languageDefinition.patterns['^'] = [];
        }

        // Process each possible grouping of the name
        groupings.forEach(grouping => {
            if (grouping.length === 0) return;

            // Add start pattern
            languageDefinition.patterns['^'].push(grouping[0]);

            // Add transitions between segments
            for (let i = 0; i < grouping.length - 1; i++) {
                const key = grouping[i];
                const next = grouping[i + 1];
                if (!languageDefinition.patterns[key]) {
                    languageDefinition.patterns[key] = [];
                }
                languageDefinition.patterns[key].push(next);
            }

            // Add end pattern
            const lastSegment = grouping[grouping.length - 1];
            if (!languageDefinition.patterns[lastSegment]) {
                languageDefinition.patterns[lastSegment] = [];
            }
            languageDefinition.patterns[lastSegment].push('$');
        });
    });

    // Remove duplicates in patterns
    for (const key in languageDefinition.patterns) {
        languageDefinition.patterns[key] = Array.from(new Set(languageDefinition.patterns[key]));
    }

    // Apply pattern frequency balancing to prevent dominance
    balancePatternFrequencies(languageDefinition);

    return languageDefinition;
}
