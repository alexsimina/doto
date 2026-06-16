export const roEnWords = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "pentru", "daca", "atunci", "masina", "calculator", "programare", "tastatura",
  "monitor", "carte", "scoala", "profesor", "elev", "bursa", "romania", "engleza",
  "limba", "vorbi", "asculta", "citeste", "scrie", "cod", "erori", "rezolvare",
  "problema", "solutie", "algoritm", "date", "structura", "timp", "spatiu",
  "complexitate", "optim", "bun", "rau", "mare", "mic", "lung", "scurt",
  "frumos", "urata", "zi", "noapte", "soare", "luna", "stele", "cer", "pamant",
  "apa", "foc", "aer", "viata", "om", "lume", "tara", "oras", "sat", "strada",
  "casa", "bloc", "usa", "fereastra", "masa", "scaun", "pat", "dulap", "televizor",
  "telefon", "cablu", "priza", "curent", "baterie", "ecran", "buton", "meniu",
  "internet", "retea", "parola", "utilizator", "cont", "profil", "mesaj", "mail",
  "familie", "prieten", "coleg", "munca", "vacanta", "munte", "mare", "padure",
  "drum", "masina", "tren", "avion", "bicicleta", "autobuz", "statie", "parc",
  "istorie", "geografie", "matematica", "fizica", "chimie", "biologie", "sport"
];

export const cppWords = [
  "int", "float", "double", "char", "bool", "void", "auto", "const",
  "class", "struct", "enum", "union", "template", "typename",
  "public", "private", "protected", "friend", "virtual", "override",
  "inline", "static", "extern", "volatile", "mutable", "register",
  "if", "else", "switch", "case", "default", "for", "while", "do",
  "break", "continue", "return", "goto", "try", "catch", "throw",
  "new", "delete", "sizeof", "typeid", "decltype", "constexpr",
  "namespace", "using", "typedef", "include", "define", "pragma",
  "std", "cout", "cin", "cerr", "endl", "string", "vector", "list",
  "deque", "queue", "stack", "map", "set", "unordered_map", "unordered_set",
  "pair", "tuple", "make_pair", "make_tuple", "push_back", "pop_back",
  "push_front", "pop_front", "insert", "erase", "clear", "empty", "size",
  "begin", "end", "rbegin", "rend", "front", "back", "top", "push", "pop",
  "sort", "reverse", "find", "count", "lower_bound", "upper_bound",
  "binary_search", "max", "min", "swap", "abs", "pow", "sqrt", "cin.tie",
  "ios_base", "sync_with_stdio", "main", "argc", "argv", "return 0",
  "iterator", "const_iterator", "auto", "nullptr", "this", "operator",
  "algorithm", "iostream", "cmath", "cstring", "cassert", "cstdio", "cstdlib",
  "vector<int>", "long", "short", "unsigned", "signed", "int_fast32_t", "size_t",
  "true", "false", "NULL", "pointer", "reference", "dereference", "address",
  "matrix", "array", "graph", "tree", "node", "edge", "vertex", "path",
  "dynamic_cast", "static_cast", "reinterpret_cast", "const_cast", "explicit",
  "inline", "virtual", "exception", "logic_error", "runtime_error", "out_of_range",
  "ifstream", "ofstream", "fstream", "stringstream", "getline", "ignore"
];

// Helper to generate a weighted random list of words based on difficult letters and words
export function generateWords(count, globalStats, dictionaryType = 'roEn') {
  const dictionary = dictionaryType === 'cpp' ? cppWords : roEnWords;

  // If no stats, just return random words
  if (!globalStats || Object.keys(globalStats).length === 0) {
    return Array.from({ length: count }, () => dictionary[Math.floor(Math.random() * dictionary.length)]);
  }

  // Calculate error rates for each letter
  const errorRates = {};
  let maxErrorRate = 0.01; // Avoid 0
  for (const [key, stats] of Object.entries(globalStats)) {
    if (key === 'lastRun' || key === 'words') continue; 
    if (stats.typed > 0) {
      const rate = stats.errors / stats.typed;
      errorRates[key] = rate;
      if (rate > maxErrorRate) maxErrorRate = rate;
    }
  }

  // Calculate error rates for whole words
  const wordErrorRates = {};
  if (globalStats.words) {
    for (const [word, stats] of Object.entries(globalStats.words)) {
      if (stats.typed > 0) {
        wordErrorRates[word] = stats.errors / stats.typed;
      }
    }
  }

  // Score each word based on how many "difficult" letters it contains AND if the word itself is difficult
  const scoredWords = dictionary.map(word => {
    let score = 0;
    
    // 1. Base score from letter difficulties
    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      if (errorRates[char]) {
        score += errorRates[char];
      }
    }
    
    // 2. MASSIVE boost if the entire word has a history of errors
    if (wordErrorRates[word]) {
      // If a word is frequently mistyped, boost its score by a huge multiplier
      // Multiply by 10 to ensure it dominates letter-level stats
      score += (wordErrorRates[word] * maxErrorRate * 10 * word.length);
    }

    // Add a bit of randomness so we don't always get the exact same sequence
    score += Math.random() * (maxErrorRate * 0.5);
    return { word, score };
  });

  // Sort by score descending
  scoredWords.sort((a, b) => b.score - a.score);

  // Pick the top 'count' words, but maybe add some randomness in selection
  const poolSize = Math.min(count * 2, scoredWords.length);
  const pool = scoredWords.slice(0, poolSize);
  
  const selectedWords = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    selectedWords.push(pool[randomIndex].word);
  }

  return selectedWords;
}
