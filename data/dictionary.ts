export interface DictionaryEntry {
  manjak: string;
  french: string;
  english: string;
  portuguese: string;
  category: string;
  pronunciation?: string;
  nominalClass?: number;
}

export const DICTIONARY: DictionaryEntry[] = [
  // Greetings
  { manjak: "Ku war?", french: "Comment vas-tu ?", english: "How are you?", portuguese: "Como vai?", category: "salutations", pronunciation: "ku war" },
  { manjak: "War mban!", french: "Très bien !", english: "Very well!", portuguese: "Muito bem!", category: "salutations" },
  { manjak: "Obi!", french: "Bonjour / Salut !", english: "Hello!", portuguese: "Olá!", category: "salutations" },
  { manjak: "Natu!", french: "Merci !", english: "Thank you!", portuguese: "Obrigado!", category: "salutations" },
  { manjak: "Kulam?", french: "Comment tu t'appelles ?", english: "What is your name?", portuguese: "Como te chamas?", category: "salutations" },

  // Family
  { manjak: "asin", french: "père", english: "father", portuguese: "pai", category: "famille", nominalClass: 1 },
  { manjak: "nandjak", french: "mère", english: "mother", portuguese: "mãe", category: "famille", nominalClass: 1 },
  { manjak: "napats", french: "enfant", english: "child", portuguese: "criança", category: "famille", nominalClass: 1 },
  { manjak: "bapats", french: "enfants", english: "children", portuguese: "crianças", category: "famille", nominalClass: 2 },
  { manjak: "nawar", french: "femme / épouse", english: "woman / wife", portuguese: "mulher / esposa", category: "famille", nominalClass: 1 },
  { manjak: "nabang", french: "homme / mari", english: "man / husband", portuguese: "homem / marido", category: "famille", nominalClass: 1 },
  { manjak: "napukin", french: "grand-mère", english: "grandmother", portuguese: "avó", category: "famille", nominalClass: 1 },
  { manjak: "natum", french: "frère", english: "brother", portuguese: "irmão", category: "famille", nominalClass: 1 },
  { manjak: "naser", french: "sœur", english: "sister", portuguese: "irmã", category: "famille", nominalClass: 1 },

  // Nature
  { manjak: "mëndur", french: "eau", english: "water", portuguese: "água", category: "nature", nominalClass: 6 },
  { manjak: "bëgas", french: "forêt", english: "forest", portuguese: "floresta", category: "nature", nominalClass: 5 },
  { manjak: "ùcaak", french: "pays / terre", english: "country / land", portuguese: "terra / país", category: "nature", nominalClass: 3 },
  { manjak: "ùnguru", french: "hippopotame", english: "hippopotamus", portuguese: "hipopótamo", category: "nature", nominalClass: 3 },
  { manjak: "ùgal", french: "chien", english: "dog", portuguese: "cão", category: "nature", nominalClass: 3 },
  { manjak: "bërol", french: "rônier (palmier)", english: "borassus palm", portuguese: "palmeira-leque", category: "nature", nominalClass: 5 },
  { manjak: "bapam", french: "palmier à huile", english: "oil palm", portuguese: "palmeira-de-óleo", category: "nature", nominalClass: 5 },

  // Body
  { manjak: "nakam", french: "tête", english: "head", portuguese: "cabeça", category: "corps", nominalClass: 1 },
  { manjak: "nalek", french: "main", english: "hand", portuguese: "mão", category: "corps", nominalClass: 1 },
  { manjak: "nankë", french: "pied", english: "foot", portuguese: "pé", category: "corps", nominalClass: 1 },
  { manjak: "nadjël", french: "œil", english: "eye", portuguese: "olho", category: "corps", nominalClass: 1 },
  { manjak: "nagor", french: "ventre", english: "stomach", portuguese: "barriga", category: "corps", nominalClass: 1 },

  // Numbers
  { manjak: "bëk", french: "un", english: "one", portuguese: "um", category: "nombres" },
  { manjak: "ùbok", french: "deux", english: "two", portuguese: "dois", category: "nombres" },
  { manjak: "ùsabok", french: "trois", english: "three", portuguese: "três", category: "nombres" },
  { manjak: "ùnabok", french: "quatre", english: "four", portuguese: "quatro", category: "nombres" },
  { manjak: "ùkarak", french: "cinq", english: "five", portuguese: "cinco", category: "nombres" },
  { manjak: "ùkëdël", french: "dix", english: "ten", portuguese: "dez", category: "nombres" },

  // Colors
  { manjak: "tiës", french: "petit / peu", english: "small / little", portuguese: "pequeno", category: "descriptions" },
  { manjak: "mban", french: "grand / gros", english: "big / large", portuguese: "grande", category: "descriptions" },
  { manjak: "war", french: "bon / beau", english: "good / beautiful", portuguese: "bom / bonito", category: "descriptions" },
  { manjak: "ndjum", french: "noir", english: "black", portuguese: "preto", category: "descriptions" },
  { manjak: "mbëng", french: "blanc", english: "white", portuguese: "branco", category: "descriptions" },
  { manjak: "kuf", french: "rouge", english: "red", portuguese: "vermelho", category: "descriptions" },

  // Verbs
  { manjak: "ndjël", french: "voir", english: "to see", portuguese: "ver", category: "verbes" },
  { manjak: "djum", french: "manger", english: "to eat", portuguese: "comer", category: "verbes" },
  { manjak: "ndam", french: "boire", english: "to drink", portuguese: "beber", category: "verbes" },
  { manjak: "kas", french: "aller", english: "to go", portuguese: "ir", category: "verbes" },
  { manjak: "bòk", french: "venir", english: "to come", portuguese: "vir", category: "verbes" },
  { manjak: "dôk", french: "parler / dire", english: "to speak / say", portuguese: "falar / dizer", category: "verbes" },
  { manjak: "tol", french: "travailler", english: "to work", portuguese: "trabalhar", category: "verbes" },
  { manjak: "war", french: "être bon / aimer", english: "to be good / to love", portuguese: "ser bom / amar", category: "verbes" },
];

export const CATEGORIES = [
  { id: "all", label: "Tous les mots", emoji: "📚" },
  { id: "salutations", label: "Salutations", emoji: "👋" },
  { id: "famille", label: "Famille", emoji: "👨‍👩‍👧" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "corps", label: "Corps humain", emoji: "🫀" },
  { id: "nombres", label: "Nombres", emoji: "🔢" },
  { id: "descriptions", label: "Descriptions", emoji: "✨" },
  { id: "verbes", label: "Verbes", emoji: "⚡" },
];
