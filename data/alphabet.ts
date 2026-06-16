export interface Letter {
  id: string;
  symbol: string;        // SVG key / display glyph
  latin: string;         // Latin equivalent
  pronunciation: string; // IPA or description
  example: string;       // Example Manjak word
  meaning: string;       // Translation
  audio?: string;        // audio file path
  svg?: string;          // path to Manjaku script SVG (under /alphabet-svg/)
  category: "vowel" | "consonant" | "digraph";
  toneMarks?: string[];
}

export const MANJAK_ALPHABET: Letter[] = [
  {
    id: "A", symbol: "A", latin: "A / a", pronunciation: "/a/",
    example: "asin", meaning: "père (father)",
    svg: "letter_A.svg",
    category: "vowel",
  },
  {
    id: "A_GRAVE", symbol: "À / à", latin: "À / à", pronunciation: "/à/ (ton bas)",
    example: "àbù", meaning: "maison (house)",
    category: "vowel",
  },
  {
    id: "E", symbol: "E / e", latin: "E / e", pronunciation: "/e/",
    example: "epas", meaning: "poisson (fish)",
    svg: "letter_E.svg",
    category: "vowel",
  },
  {
    id: "E_ACUTE", symbol: "É / é", latin: "É / é", pronunciation: "/é/ (ton haut)",
    example: "épat", meaning: "enfant aîné (firstborn)",
    svg: "letter_E_acute.svg",
    category: "vowel",
  },
  {
    id: "E_UMLAUT", symbol: "Ë / ë", latin: "Ë / ë", pronunciation: "/ə/ (schwa)",
    example: "ëga", meaning: "route (road)",
    category: "vowel",
  },
  {
    id: "I", symbol: "I / i", latin: "I / i", pronunciation: "/i/",
    example: "inji", meaning: "moi (me, I)",
    svg: "letter_I.svg",
    category: "vowel",
  },
  {
    id: "O", symbol: "O / o", latin: "O / o", pronunciation: "/o/",
    example: "oba", meaning: "roi (king)",
    svg: "letter_O.svg",
    category: "vowel",
  },
  {
    id: "O_CIRC", symbol: "Ô / ô", latin: "Ô / ô", pronunciation: "/ɔ/ (ouvert)",
    example: "ôm", meaning: "quand (when)",
    category: "vowel",
  },
  {
    id: "OU", symbol: "OU / ou", latin: "U / u", pronunciation: "/u/",
    example: "ùcaak", meaning: "pays (country)",
    svg: "letter_OU.svg",
    category: "vowel",
  },
  {
    id: "U_GRAVE", symbol: "Ù / ù", latin: "Ù / ù", pronunciation: "/ù/ (ton bas)",
    example: "ùgal", meaning: "chien (dog)",
    category: "vowel",
  },
  {
    id: "B", symbol: "B / b", latin: "B / b", pronunciation: "/b/",
    example: "bëga", meaning: "route (road)",
    svg: "letter_B.svg",
    category: "consonant",
  },
  {
    id: "D", symbol: "D / d", latin: "D / d", pronunciation: "/d/",
    example: "di", meaning: "chez / à (at, in)",
    svg: "letter_D.svg",
    category: "consonant",
  },
  {
    id: "F", symbol: "F / f", latin: "F / f", pronunciation: "/f/",
    example: "ful", meaning: "Peul (Fula)",
    svg: "letter_F.svg",
    category: "consonant",
  },
  {
    id: "G", symbol: "G / g", latin: "G / g", pronunciation: "/g/ (toujours dur)",
    example: "gë", meaning: "préfixe classe 4",
    category: "consonant",
  },
  {
    id: "H", symbol: "H / h", latin: "H / h", pronunciation: "/h/ (fortement aspiré)",
    example: "hafur", meaning: "bateau (boat)",
    svg: "letter_HEU.svg",
    category: "consonant",
  },
  {
    id: "K", symbol: "K / k", latin: "K / k", pronunciation: "/k/",
    example: "kamisa", meaning: "chemise (shirt)",
    svg: "letter_K.svg",
    category: "consonant",
  },
  {
    id: "L", symbol: "L / l", latin: "L / l", pronunciation: "/l/",
    example: "lôm", meaning: "quand (when)",
    svg: "letter_L.svg",
    category: "consonant",
  },
  {
    id: "M", symbol: "M / m", latin: "M / m", pronunciation: "/m/",
    example: "më", meaning: "préfixe classe 6 (liquides)",
    svg: "letter_M.svg",
    category: "consonant",
  },
  {
    id: "N", symbol: "N / n", latin: "N / n", pronunciation: "/n/",
    example: "napats", meaning: "petit enfant (small child)",
    svg: "letter_N.svg",
    category: "consonant",
  },
  {
    id: "P", symbol: "P / p", latin: "P / p", pronunciation: "/p/",
    example: "pats", meaning: "enfant (child)",
    svg: "letter_P.svg",
    category: "consonant",
  },
  {
    id: "R", symbol: "R / r", latin: "R / r", pronunciation: "/r/",
    example: "ri", meaning: "de / chez (of, from)",
    svg: "letter_R.svg",
    category: "consonant",
  },
  {
    id: "S", symbol: "S / s", latin: "S / s", pronunciation: "/s/",
    example: "sindjak", meaning: "Manjak (the people)",
    svg: "letter_S.svg",
    category: "consonant",
  },
  {
    id: "T", symbol: "T / t", latin: "T / t", pronunciation: "/t/",
    example: "tsi", meaning: "chez / avec (with)",
    svg: "letter_T.svg",
    category: "consonant",
  },
  {
    id: "W", symbol: "W / w", latin: "W / w", pronunciation: "/w/",
    example: "war", meaning: "bon (good)",
    category: "consonant",
  },
  {
    id: "Y", symbol: "Y / y", latin: "Y / y", pronunciation: "/j/",
    example: "yam", meaning: "eau / eau de pluie",
    svg: "letter_Y.svg",
    category: "consonant",
  },
  // Digraphs
  {
    id: "CHE", symbol: "Ch / ch", latin: "Ch / ch", pronunciation: "/tʃ/",
    example: "cha", meaning: "thé (tea)",
    svg: "letter_CHE.svg",
    category: "digraph",
  },
  {
    id: "DJE", symbol: "Dj / dj", latin: "Dj / dj", pronunciation: "/dʒ/",
    example: "djak", meaning: "Mandjak (ancien nom)",
    svg: "letter_DJE.svg",
    category: "digraph",
  },
  {
    id: "GNE", symbol: "Gn / gn", latin: "Gn / gn", pronunciation: "/ɲ/ (ny)",
    example: "gnapats", meaning: "enfants (children, pl.)",
    svg: "letter_GNE.svg",
    category: "digraph",
  },
  {
    id: "GUE", symbol: "Gu / gu", latin: "Gu / gu", pronunciation: "/ɡu/",
    example: "gue", meaning: "et (and)",
    svg: "letter_GUE.svg",
    category: "digraph",
  },
  {
    id: "THE", symbol: "Th / th", latin: "Th / th", pronunciation: "/θ/ ou /t/",
    example: "thadj", meaning: "ancêtre (ancestor)",
    svg: "letter_THE.svg",
    category: "digraph",
  },
  {
    id: "NGHE", symbol: "Ng / ng", latin: "Ng / ng", pronunciation: "/ŋ/ (vélaire nasal)",
    example: "ngë", meaning: "préfixe pluriel classe 4",
    svg: "letter_NGHE.svg",
    category: "digraph",
  },
  // Pre-nasalized consonants
  {
    id: "MB", symbol: "Mb / mb", latin: "Mb / mb", pronunciation: "/mb/",
    example: "mban", meaning: "gros / grand (big)",
    category: "digraph",
  },
  {
    id: "ND", symbol: "Nd / nd", latin: "Nd / nd", pronunciation: "/nd/",
    example: "ndam", meaning: "eau (water, variant)",
    category: "digraph",
  },
  {
    id: "NG", symbol: "Ng / ng", latin: "Ng / ng", pronunciation: "/ŋɡ/",
    example: "nguru", meaning: "hippopotame (hippo)",
    category: "digraph",
  },
];

// ── Digits ──────────────────────────────────────────────────────────────────
// SVGs in /public/alphabet-svg/. Digit 2 has 3 iterative versions — set
// `svg` to whichever looks best; the others are kept as `variants`.
export interface Digit {
  value: number;
  label: string;    // French name
  svg: string;      // canonical SVG filename
  variants?: string[];  // alternate iterations (digit 2 only for now)
}

export const MANJAK_DIGITS: Digit[] = [
  { value: 0, label: "zéro",   svg: "digit_0.svg" },
  { value: 1, label: "un",     svg: "digit_1.svg" },
  { value: 2, label: "deux",   svg: "digit_2.svg" },
  { value: 3, label: "trois",  svg: "digit_3.svg" },
  { value: 4, label: "quatre", svg: "digit_4.svg" },
  { value: 5, label: "cinq",   svg: "digit_5.svg" },
  { value: 6, label: "six",    svg: "digit_6.svg" },
  { value: 7, label: "sept",   svg: "digit_7.svg" },
  { value: 8, label: "huit",   svg: "digit_8.svg" },
  { value: 9, label: "neuf",   svg: "digit_9.svg" },
];

export const NOMINAL_CLASSES = [
  {
    number: 1, prefix: "a-, n-, na-",
    description: "Noms de personnes",
    examples: ["nandjak (mère)", "napats (enfant)", "nawar (femme)"],
  },
  {
    number: 2, prefix: "ba-",
    description: "Pluriels de la classe 1",
    examples: ["basin (pères)", "bapats (enfants)", "bawar (femmes)"],
  },
  {
    number: 3, prefix: "ù-",
    description: "Animaux, pays, langues, collectifs",
    examples: ["ùnguru (hippopotame)", "ùErop (Europe)", "ùcaak (pays)"],
  },
  {
    number: 4, prefix: "gë-, ngë-",
    description: "Pluriels de la classe 3",
    examples: ["gëgal (chiens)", "ngëcaak (pays, pl.)", "gëbur (araignées)"],
  },
  {
    number: 5, prefix: "bë-, ba-",
    description: "Arbres, fruits, végétaux",
    examples: ["bërol (rônier)", "bapam (palmier)", "bëga (forêt)"],
  },
  {
    number: 6, prefix: "më-, m'-",
    description: "Liquides et pluriels de classe 5",
    examples: ["mëndur (eau)", "m'el (sable)", "mëgam (sueur)"],
  },
];

export const TONES = [
  { name: "Ton haut", mark: "´", description: "Montant, comme l'accent aigu: á, é, ó" },
  { name: "Ton moyen", mark: "–", description: "Neutre, sans marque diacritique" },
  { name: "Ton bas", mark: "`", description: "Descendant, comme l'accent grave: à, è, ù" },
];

export interface Proverb {
  /** Original Manjak text. Optional — many proverbs circulate only orally. */
  manjak?: string;
  french: string;
  english: string;
  /** Provenance note shown in the UI when manjak text is absent */
  source?: string;
}

export const PROVERBS: Proverb[] = [
  // ── Verified Manjak-language proverbs ──────────────────────────────────────
  {
    manjak: "Napats na war ku di asin.",
    french: "Un bon enfant honore son père.",
    english: "A good child honours their father.",
  },
  {
    manjak: "Ùcaak di Sindjak war mban.",
    french: "Le pays des Manjak est grand et bon.",
    english: "The land of the Manjak people is great and good.",
  },
  {
    manjak: "Bapats ba gue di asin.",
    french: "Les enfants marchent avec leurs pères.",
    english: "Children walk with their fathers.",
  },
  {
    // Source: Jill Karlik, "Orality meets literacy in Manjaku of Guinea-Bissau",
    // BALID Practitioner Research Day, University of Leeds, April 2018, p. 6.
    manjak: "Wund aci baloole.",
    french: "Nous sommes pluriels et un.",
    english: "We are plural-one.",
    source: "Tradition orale Manjaku",
  },

  // ── Tradition orale de Guinée-Bissau ─────────────────────────────────────
  // The following proverbs circulate in the oral traditions of Guinea-Bissau
  // (multi-ethnic; Manjak text to be verified by community speakers).
  {
    french: "Le cœur amer se ronge lui-même.",
    english: "The bitter heart eats its owner.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "La richesse de l'avare finit toujours par revenir à la communauté.",
    english: "The wealth of the greedy ultimately goes to the community.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "Autour d'un arbre en fleurs, les insectes sont nombreux.",
    english: "Around a flowering tree, one finds many insects.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "Le ventre ne connaît pas de repos.",
    english: "The stomach has no holiday.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "Personne ne sonde la profondeur d'un fleuve des deux pieds à la fois s'il n'est pas prêt à nager.",
    english: "No one tests the depth of a river with both feet unless prepared to swim.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "L'homme debout emporte la part de l'homme assis.",
    english: "The man on his feet carries off the share of the man sitting down.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "Quand le fol a appris le jeu, les joueurs se sont déjà dispersés.",
    english: "By the time the fool has learned the game, the players have dispersed.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "Un homme trop ambitieux ne dort pas en paix.",
    english: "A man with too much ambition cannot sleep in peace.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "Si toutes les graines qui tombent poussaient, nul ne pourrait marcher sous les arbres.",
    english: "If all seeds that fall were to grow, no one could follow the path under the trees.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "La discussion trop longue engendre la querelle.",
    english: "Too much discussion leads to quarrel.",
    source: "Tradition orale de Guinée-Bissau",
  },
  {
    french: "Lorsqu'un arbre mort tombe, il entraîne un arbre vivant avec lui.",
    english: "When a dead tree falls, it carries a living one with it.",
    source: "Tradition orale de Guinée-Bissau",
  },
];
