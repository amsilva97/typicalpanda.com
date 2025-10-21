import { LanguageDefinition } from '../core';

/**
 * Custom Experimental language definition
 * Simple structure where every letter can connect to every other letter
 */
export const customExperimental: LanguageDefinition = {
    patterns: {
        /**
         * g, j, k, p, q, w, x, z are banned letters in this experimental pattern set
         */

        // Starting patterns - all single letters
        "^": [
            // Single Letters vowels
            "a", "e", "i", "o", "u", "y",

            // Single Letters consonants
            // "b", "c", "d", "f", "h", "l", "m", "n", "r", "s", "t", "v",

            // Two-Letter Clusters
            "al", "el", "il", "ol", "ul", "yl",
        ],

        // 'l' Vowel Cluster
        "al": ["la", "le", "li", "lo", "lu", "ly"],
        "el": ["la", "le", "li", "lo", "lu", "ly"],
        "il": ["la", "le", "li", "lo", "lu", "ly"],
        "ol": ["la", "le", "li", "lo", "lu", "ly"],
        "ul": ["la", "le", "li", "lo", "lu", "ly"],
        "yl": ["la", "le", "li", "lo", "lu", "ly"],
        "la": ["b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y"],
        "le": ["a", "b", "c", "d", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y"],
        "li": ["a", "b", "c", "d", "e", "f", "h", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y"],
        "lo": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "r", "s", "t", "u", "v", "y"],
        "lu": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "v", "y"],
        "ly": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v"],

        // Vowels
        "a": ["b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "e": ["a", "b", "c", "d", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "i": ["a", "b", "c", "d", "e", "f", "h", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "o": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "r", "s", "t", "u", "v", "y", "$"],
        "u": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "v", "y", "$"],
        "y": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "$"],

        // Consonants
        "b": ["a", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "c": ["a", "b", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "d": ["a", "b", "c", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "f": ["a", "b", "c", "d", "e", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "h": ["a", "b", "c", "d", "e", "f", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "l": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "m": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "n", "o", "r", "s", "t", "u", "v", "y", "$"],
        "n": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "o", "r", "s", "t", "u", "v", "y", "$"],        
        "r": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "s", "t", "u", "v", "y", "$"],
        "s": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "t", "u", "v", "y", "$"],
        "t": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "u", "v", "y", "$"],
        "v": ["a", "b", "c", "d", "e", "f", "h", "i", "l", "m", "n", "o", "r", "s", "t", "u", "y", "$"],
    },

    //Ignore meaning until we have a proper structure
    meanings: {},

    options: {
        name: "Custom Experimental",
        minLength: 6,
        maxLength: 12,
        startMarker: "^",
        endMarker: "$",
        maxLoops: 50,
        singleLetterLimiter: 99,  // Limit consecutive single letters to prevent "aaaaa"
        clusterLimiter: 2        // Limit repeated clusters
    }
};
