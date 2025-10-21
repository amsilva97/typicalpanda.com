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
            // "b", "c", "d", "f", "h", "m", "n", "r", "s", "t", "v",

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
        "la": ["b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y"],
        "le": ["a", "b", "c", "d", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y"],
        "li": ["a", "b", "c", "d", "e", "f", "h", "m", "n", "o", "r", "s", "t", "u", "v", "y"],
        "lo": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "r", "s", "t", "u", "v", "y"],
        "lu": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "v", "y"],
        "ly": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v"],

        // Vowels
        "a": ["b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y", "el", "il", "ol", "ul", "yl", "$"],
        "e": ["a", "b", "c", "d", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y", "al", "il", "ol", "ul", "yl", "$"],
        "i": ["a", "b", "c", "d", "e", "f", "h", "m", "n", "o", "r", "s", "t", "u", "v", "y", "al", "el", "ol", "ul", "yl", "$"],
        "o": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ul", "yl", "$"],
        "u": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "v", "y", "al", "el", "il", "ol", "yl", "$"],
        "y": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "al", "el", "il", "ol", "ul", "$"],

        // Consonants
        "b": ["a", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "c": ["a", "b", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "d": ["a", "b", "c", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "f": ["a", "b", "c", "d", "e", "h", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "h": ["a", "b", "c", "d", "e", "f", "i", "m", "n", "o", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "m": ["a", "b", "c", "d", "e", "f", "h", "i", "n", "o", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "n": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "o", "r", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],        
        "r": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "s", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "s": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "t", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "t": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "u", "v", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
        "v": ["a", "b", "c", "d", "e", "f", "h", "i", "m", "n", "o", "r", "s", "t", "u", "y", "al", "el", "il", "ol", "ul", "yl", "$"],
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
