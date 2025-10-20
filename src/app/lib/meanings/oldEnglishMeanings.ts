/**
 * Old English name element meanings for semantic name interpretation
 */

export const oldEnglishMeanings: { [key: string]: string } = {
  // Classic Old English name elements
  "ael": "elf, supernatural being",
  "aed": "fire, prosperity", 
  "alf": "elf, wise counselor",
  "aethel": "noble, nobility",
  "beorn": "warrior, bear-like man",
  "cyne": "royal, kingly",
  "ead": "blessed, fortunate",
  "ed": "blessed, wealth",
  "god": "good, divine",
  "hild": "battle, war",
  "leod": "people, folk",
  "ost": "divine, east",
  "raed": "counsel, advice",
  "sig": "victory, triumph",
  "theod": "people, nation",
  "wulf": "wolf",
  "wyn": "joy, friend",

  // Ending clusters with meanings
  "ric": "ruler, king, powerful",
  "wald": "rule, power, authority",
  "mund": "protection, guardian",
  "helm": "helmet, protector",
  "bert": "bright, shining",
  "fred": "peace, peaceful",
  "win": "friend, beloved",
  "red": "counsel, advisor", 
  "grim": "fierce, masked warrior",
  "bald": "bold, brave",
  "stan": "stone, steadfast",
  "weard": "guard, protector",
  "wine": "friend, lord",
  "thane": "servant, warrior",
  "here": "army, host",
  "flee": "refuge, sanctuary",
  "geat": "gate, way",
  "mon": "man, person",
  "noth": "boldness, daring",
  "hard": "hardy, strong",
  "fast": "firm, steadfast",
  "leof": "dear, beloved",
  "maer": "famous, renowned",
  "mod": "courage, spirit",
  "wig": "war, battle",
  "hun": "bear cub, young warrior",
  "ulf": "wolf",
  "ing": "meadow, descendant of",
  "ton": "enclosure, settlement",
  "ham": "home, village",
  "ley": "meadow, clearing",
  "ford": "river crossing",
  "burg": "fortress, fortified town",
  "wick": "village, dwelling place",
  "eth": "noble heritage",
  "en": "one who",
  "ar": "honor, glory", 
  "er": "honor, glory",
  "el": "nobility",
  "id": "time, season",
  "od": "wealth, fortune",
  "ad": "nobility, heritage",

  // Additional elements that might appear
  "ward": "guardian, protector",
  "gar": "spear, warrior"
};

/**
 * Attempts to break down a generated name into meaningful components
 * and construct a semantic meaning with visible word parts
 */
export function getNameMeaning(name: string): string {
  const lowercaseName = name.toLowerCase();
  const meanings: string[] = [];
  const parts: string[] = [];
  let remainingName = lowercaseName;

  // Try to find the longest matching elements first
  const sortedElements = Object.keys(oldEnglishMeanings).sort((a, b) => b.length - a.length);
  
  while (remainingName.length > 0) {
    let foundMatch = false;
    
    // Look for matching elements starting from the beginning of remaining name
    for (const element of sortedElements) {
      if (remainingName.startsWith(element)) {
        parts.push(element);
        meanings.push(oldEnglishMeanings[element]);
        remainingName = remainingName.slice(element.length);
        foundMatch = true;
        break;
      }
    }
    
    // If no match found, skip one character and continue
    if (!foundMatch) {
      remainingName = remainingName.slice(1);
    }
  }

  // Construct meaning with parts on separate lines
  if (parts.length === 0) {
    return "";
  } else if (parts.length === 1) {
    return `${parts[0]}: ${meanings[0]}`;
  } else {
    // Format each part with prefix/suffix notation
    const formattedParts = parts.map((part, index) => {
      if (index === 0) {
        return `${part}-: ${meanings[index]}`;
      } else if (index === parts.length - 1) {
        return `-${part}: ${meanings[index]}`;
      } else {
        return `-${part}-: ${meanings[index]}`;
      }
    });
    
    return formattedParts.join('\n');
  }
}

/**
 * Extended function that returns both name and meaning
 */
export function generateNameWithMeaning(name: string): { name: string, meaning: string } {
  return {
    name: name,
    meaning: getNameMeaning(name)
  };
}