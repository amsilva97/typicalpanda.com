import { LanguageDefinition } from "./core";

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

function allGroupings(word: string): string[][] {
    const n = word.length;
    const results: string[][] = [];

    for (let mask = 0; mask < (1 << (n - 1)); mask++) {
        const grouping: string[] = [];
        let current = word[0];
        for (let i = 0; i < n - 1; i++) {
            if (mask & (1 << i)) {
                grouping.push(current);
                current = word[i + 1];
            } else {
                current += word[i + 1];
            }
        }
        grouping.push(current);
        results.push(grouping);
    }

    return results;
}

function removeInvalidPatterns(nameSegments: string[][], languageDefinition: LanguageDefinition): string[][] {
    const options = languageDefinition.options;

    // Enforce minimum nodes constraint
    if (options.minNodes !== undefined) {
        nameSegments = nameSegments.filter(segments => segments.length >= options.minNodes!);
    }

    // Enforce maximum nodes constraint
    if (options.maxNodes !== undefined) {
        nameSegments = nameSegments.filter(segments => segments.length <= options.maxNodes!);
    }

    // Enforce non-consecutive single letter limit
    if (options.nonConsecutiveSingleLetterLimit !== undefined) {
        nameSegments = nameSegments.filter(segments => {
            const singleLetterCount = segments.filter(s => s.length === 1).length;
            return singleLetterCount <= options.nonConsecutiveSingleLetterLimit!;
        })
    }

    // Enforce consecutive single letter limit
    if (options.consecutiveSingleLetterLimit !== undefined) {
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
            return maxConsecutive <= options.consecutiveSingleLetterLimit!;
        })
    }

    // Enforce total cluster limit
    if (options.totalClusterLimit !== undefined) {
        nameSegments = nameSegments.filter(segments => {
            const clusterCount = segments.filter(s => s.length >= 3).length;
            return clusterCount <= options.totalClusterLimit!;
        })
    }

    // Enforce duplicate cluster limit
    if (options.duplicateClusterLimit !== undefined) {
        nameSegments = nameSegments.filter(segments => {
            const clusterCounts: { [key: string]: number } = {};
            for (const s of segments) {
                if (s.length >= 3) {
                    clusterCounts[s] = (clusterCounts[s] || 0) + 1;
                    if (clusterCounts[s] > options.duplicateClusterLimit!) {
                        return false;
                    }
                }
            }
            return true;
        })
    }

    // Remove any thay have a node with 5 or more characters
    nameSegments = nameSegments.filter(segments => {
        return !segments.some(s => s.length >= 5);
    });

    // Remove any that have a node with the same letter twice in a row
    nameSegments = nameSegments.filter(segments => {
        return !segments.some(s => /(.)\1/.test(s));
    });

    // Remove any that have a node with double consonants (any two consecutive consonants)
    nameSegments = nameSegments.filter(segments => {
        return !segments.some(s => /[bcdfghjklmnpqrstvwxz]{2,}/i.test(s));
    });

    return nameSegments
}

function removeOutliers(nameGroupingList: string[][][]): string[][][] {
    const namesWereNodeExists: { [key: string]: number } = {};
    const totalNames = nameGroupingList.length;
    const outlierThreshold = (1/100); // Nodes appearing in less than n% of names are outliers

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
 * Build a Markov chain from a list of names
 * @param names Array of name strings
 * @returns Empty JSON object for testing purposes
 */
export function buildChain(names: string[], languageDefinition: LanguageDefinition): LanguageDefinition {
    // Reset patterns
    languageDefinition.patterns = {};

    let nameGroupingList: string[][][] = [];

    // Process each name to get valid groupings
    names.forEach(name => {
        const cleanName = name.toLowerCase().trim();
        if (cleanName.length === 0) return;
        let groupings = allGroupings(cleanName);
        groupings = removeInvalidPatterns(groupings, languageDefinition);
        nameGroupingList.push(groupings);
    });

    nameGroupingList = removeOutliers(nameGroupingList);

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

    return languageDefinition;
}
