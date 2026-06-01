export type TabSeo = {
  id: string;
  title: string;
  description: string;
  og_title: string;
  og_description: string;
  keywords: string[];
  og_image_headline: string;
  og_image_sub: string;
};

export const SEO_DEFAULTS: Record<string, TabSeo> = {
  home: {
    id: "home",
    title: "Mandjaku — Langue & Culture Manjak",
    description: "Découvrez la langue, l'alphabet, l'histoire et la culture du peuple Manjak de Guinée-Bissau, Sénégal et Gambie.",
    og_title: "Mandjaku",
    og_description: "Langue, alphabet et culture du peuple Manjak",
    keywords: ["manjak", "mandjaku", "langue africaine", "guinée-bissau"],
    og_image_headline: "Mandjaku",
    og_image_sub: "Kabu lëp Manjak",
  },
  alphabet: {
    id: "alphabet",
    title: "Alphabet Manjak — 24 lettres, tons et classes",
    description: "Apprenez les 24 lettres de l'alphabet Manjak, leurs prononciations, tons et classes nominales.",
    og_title: "Alphabet Manjak",
    og_description: "24 lettres, tons et classes nominales du Mandjaku",
    keywords: ["alphabet manjak", "lettres manjak", "écriture africaine"],
    og_image_headline: "Alphabet",
    og_image_sub: "Mandjaku",
  },
  learn: {
    id: "learn",
    title: "Apprendre le Mandjaku — Leçons & Quiz",
    description: "Leçons interactives, vocabulaire et quiz pour apprendre la langue Mandjaku étape par étape.",
    og_title: "Apprendre le Mandjaku",
    og_description: "Leçons interactives et quiz pour apprendre le Manjak",
    keywords: ["apprendre manjak", "cours manjak", "langue africaine"],
    og_image_headline: "Apprendre",
    og_image_sub: "le Mandjaku",
  },
  history: {
    id: "history",
    title: "Histoire du Peuple Manjak — Des origines à nos jours",
    description: "L'histoire des Manjak : origines, royaumes, colonisation, résistance et diaspora mondiale.",
    og_title: "Histoire Manjak",
    og_description: "Des royaumes à la diaspora — l'histoire du peuple Manjak",
    keywords: ["histoire manjak", "peuple manjak", "guinée-bissau histoire"],
    og_image_headline: "Histoire",
    og_image_sub: "du Peuple Manjak",
  },
  culture: {
    id: "culture",
    title: "Culture Manjak — Traditions, Musique & Rites",
    description: "Textiles, musique, rites initiatiques et proverbes du peuple Manjak de Guinée-Bissau.",
    og_title: "Culture Manjak",
    og_description: "Traditions, musique et rites du peuple Manjak",
    keywords: ["culture manjak", "traditions africaines", "rites manjak"],
    og_image_headline: "Culture",
    og_image_sub: "Mandjaku",
  },
  dictionary: {
    id: "dictionary",
    title: "Dictionnaire Manjak — FR / EN / PT",
    description: "Dictionnaire Mandjaku trilingue : français, anglais et portugais. Plus de 200 mots avec catégories.",
    og_title: "Dictionnaire Mandjaku",
    og_description: "Dictionnaire trilingue Manjak — français, anglais, portugais",
    keywords: ["dictionnaire manjak", "mots manjak", "traduction manjak"],
    og_image_headline: "Dictionnaire",
    og_image_sub: "Mandjaku",
  },
  keyboard: {
    id: "keyboard",
    title: "Clavier Manjak — Téléchargements pour tous OS",
    description: "Téléchargez le clavier Mandjaku pour macOS, Windows, Linux, iOS, Android et HarmonyOS.",
    og_title: "Clavier Manjak",
    og_description: "Claviers Mandjaku pour tous les systèmes d'exploitation",
    keywords: ["clavier manjak", "keyboard layout", "QMK manjak"],
    og_image_headline: "Clavier",
    og_image_sub: "Mandjaku",
  },
  media: {
    id: "media",
    title: "Médias Manjak — Vidéos, Galerie & Ressources",
    description: "Documentaires, musique, photos et ressources pour explorer la culture Manjak par l'image et le son.",
    og_title: "Médias Mandjaku",
    og_description: "Vidéos, documentaires et galerie culturelle Manjak",
    keywords: ["médias manjak", "vidéos manjak", "documentaire afrique"],
    og_image_headline: "Médias",
    og_image_sub: "Mandjaku",
  },
};
