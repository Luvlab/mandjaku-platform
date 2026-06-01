export type ExerciseType = "multiple_choice" | "type_answer" | "match_pairs" | "translate";

export type Exercise = {
  id: string;
  type: ExerciseType;
  prompt: string;
  promptLang: "manjak" | "fr" | "en";
  options?: string[];
  answer: string;
  emoji?: string;
  image?: string;
};

export type Lesson = {
  id: string;
  title: string;
  titleFr: string;
  icon: string;
  xp: number;
  exercises: Exercise[];
};

export type Unit = {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  icon: string;
  color: string;
  colorDark: string;
  lessons: Lesson[];
};

export const COURSES: Unit[] = [
  {
    id: "unit-1",
    title: "Salutations",
    titleFr: "Salutations & Présentations",
    description: "Apprenez à saluer et vous présenter en Mandjaku",
    icon: "👋",
    color: "#009E49",
    colorDark: "#007A38",
    lessons: [
      {
        id: "u1-l1",
        title: "Basic Greetings",
        titleFr: "Salutations de base",
        icon: "😊",
        xp: 10,
        exercises: [
          {
            id: "u1-l1-e1",
            type: "multiple_choice",
            prompt: "Que signifie « Obi! » ?",
            promptLang: "fr",
            options: ["Bonjour / Salut", "Merci", "Au revoir", "Comment tu t'appelles ?"],
            answer: "Bonjour / Salut",
            emoji: "👋",
          },
          {
            id: "u1-l1-e2",
            type: "multiple_choice",
            prompt: "Comment dit-on « Merci » en Mandjaku ?",
            promptLang: "fr",
            options: ["Djidjon", "Obi!", "Ku war?", "War mban!"],
            answer: "Djidjon",
            emoji: "🙏",
          },
          {
            id: "u1-l1-e3",
            type: "multiple_choice",
            prompt: "« Ku war? » signifie :",
            promptLang: "fr",
            options: ["Comment vas-tu ?", "Bonjour", "Bonsoir", "À bientôt"],
            answer: "Comment vas-tu ?",
            emoji: "🤔",
          },
          {
            id: "u1-l1-e4",
            type: "translate",
            prompt: "Traduisez : Très bien !",
            promptLang: "fr",
            options: ["War mban!", "Obi!", "Djidjon", "N kaba"],
            answer: "War mban!",
            emoji: "😄",
          },
          {
            id: "u1-l1-e5",
            type: "multiple_choice",
            prompt: "Comment dit-on « Au revoir » en Mandjaku ?",
            promptLang: "fr",
            options: ["N kaba", "Obi!", "War mban!", "Ku war?"],
            answer: "N kaba",
            emoji: "👋",
          },
        ],
      },
      {
        id: "u1-l2",
        title: "Polite Phrases",
        titleFr: "Formules de politesse",
        icon: "🤝",
        xp: 10,
        exercises: [
          {
            id: "u1-l2-e1",
            type: "multiple_choice",
            prompt: "Comment demander « Comment t'appelles-tu ? »",
            promptLang: "fr",
            options: ["Mani ubu?", "Ku war?", "Djidjon", "Obi!"],
            answer: "Mani ubu?",
            emoji: "🙋",
          },
          {
            id: "u1-l2-e2",
            type: "multiple_choice",
            prompt: "« N tche Ibrahima » signifie :",
            promptLang: "fr",
            options: ["Je m'appelle Ibrahima", "Je viens d'Ibrahima", "Ibrahima est là", "Mon ami Ibrahima"],
            answer: "Je m'appelle Ibrahima",
            emoji: "🪪",
          },
          {
            id: "u1-l2-e3",
            type: "translate",
            prompt: "Traduisez : S'il te plaît",
            promptLang: "fr",
            options: ["Balama", "Djidjon", "Obi!", "N kaba"],
            answer: "Balama",
            emoji: "🙏",
          },
          {
            id: "u1-l2-e4",
            type: "multiple_choice",
            prompt: "Comment dit-on « Excuse-moi » en Mandjaku ?",
            promptLang: "fr",
            options: ["Fia n'u", "Balama", "Djidjon", "War mban!"],
            answer: "Fia n'u",
            emoji: "😅",
          },
          {
            id: "u1-l2-e5",
            type: "multiple_choice",
            prompt: "« N ka sik » signifie :",
            promptLang: "fr",
            options: ["Je suis fatigué(e)", "Je suis content(e)", "J'ai faim", "Je pars"],
            answer: "Je suis fatigué(e)",
            emoji: "😴",
          },
        ],
      },
    ],
  },
  {
    id: "unit-2",
    title: "Famille",
    titleFr: "La Famille",
    description: "Vocabulaire sur la famille en Mandjaku",
    icon: "👨‍👩‍👧‍👦",
    color: "#CE1126",
    colorDark: "#A50D1E",
    lessons: [
      {
        id: "u2-l1",
        title: "Close Family",
        titleFr: "Famille proche",
        icon: "🏠",
        xp: 10,
        exercises: [
          {
            id: "u2-l1-e1",
            type: "multiple_choice",
            prompt: "Comment dit-on « mère » en Mandjaku ?",
            promptLang: "fr",
            options: ["Ndi", "Baba", "Yaya", "Ndjon"],
            answer: "Ndi",
            emoji: "👩",
          },
          {
            id: "u2-l1-e2",
            type: "multiple_choice",
            prompt: "« Baba » signifie :",
            promptLang: "fr",
            options: ["Père", "Frère", "Oncle", "Grand-père"],
            answer: "Père",
            emoji: "👨",
          },
          {
            id: "u2-l1-e3",
            type: "multiple_choice",
            prompt: "Comment dit-on « enfant » en Mandjaku ?",
            promptLang: "fr",
            options: ["Bëtche", "Yaya", "Ndi", "Baba"],
            answer: "Bëtche",
            emoji: "👶",
          },
          {
            id: "u2-l1-e4",
            type: "translate",
            prompt: "Traduisez : Grand-mère",
            promptLang: "fr",
            options: ["Mame", "Baba", "Yaya", "Ndi"],
            answer: "Mame",
            emoji: "👵",
          },
          {
            id: "u2-l1-e5",
            type: "multiple_choice",
            prompt: "« Yaya » signifie :",
            promptLang: "fr",
            options: ["Sœur aînée", "Mère", "Tante", "Cousine"],
            answer: "Sœur aînée",
            emoji: "👧",
          },
        ],
      },
    ],
  },
  {
    id: "unit-3",
    title: "Nombres",
    titleFr: "Les Nombres",
    description: "Apprenez à compter de 1 à 20 en Mandjaku",
    icon: "🔢",
    color: "#FCD116",
    colorDark: "#B8960A",
    lessons: [
      {
        id: "u3-l1",
        title: "Numbers 1–10",
        titleFr: "Nombres de 1 à 10",
        icon: "✋",
        xp: 10,
        exercises: [
          {
            id: "u3-l1-e1",
            type: "multiple_choice",
            prompt: "Comment dit-on « 1 » en Mandjaku ?",
            promptLang: "fr",
            options: ["Ufok", "Usi", "Utate", "Unaani"],
            answer: "Ufok",
            emoji: "1️⃣",
          },
          {
            id: "u3-l1-e2",
            type: "multiple_choice",
            prompt: "« Usi » signifie :",
            promptLang: "fr",
            options: ["2", "3", "4", "5"],
            answer: "2",
            emoji: "2️⃣",
          },
          {
            id: "u3-l1-e3",
            type: "translate",
            prompt: "Traduisez : 5",
            promptLang: "fr",
            options: ["Ufuum", "Unaani", "Utate", "Ufok"],
            answer: "Ufuum",
            emoji: "5️⃣",
          },
          {
            id: "u3-l1-e4",
            type: "multiple_choice",
            prompt: "Comment dit-on « 10 » en Mandjaku ?",
            promptLang: "fr",
            options: ["Fukum", "Ufok", "Ufuum", "Uwes"],
            answer: "Fukum",
            emoji: "🔟",
          },
          {
            id: "u3-l1-e5",
            type: "multiple_choice",
            prompt: "« Uwes » signifie :",
            promptLang: "fr",
            options: ["6", "7", "8", "9"],
            answer: "6",
            emoji: "6️⃣",
          },
        ],
      },
    ],
  },
  {
    id: "unit-4",
    title: "Couleurs",
    titleFr: "Les Couleurs",
    description: "Apprenez les couleurs en Mandjaku",
    icon: "🎨",
    color: "#7C3AED",
    colorDark: "#5B21B6",
    lessons: [
      {
        id: "u4-l1",
        title: "Basic Colors",
        titleFr: "Couleurs principales",
        icon: "🌈",
        xp: 10,
        exercises: [
          {
            id: "u4-l1-e1",
            type: "multiple_choice",
            prompt: "Comment dit-on « vert » en Mandjaku ?",
            promptLang: "fr",
            options: ["Ndëg ujop", "Ndëg usus", "Ndëg ulumbu", "Ndëg utëkël"],
            answer: "Ndëg ujop",
            emoji: "🟢",
          },
          {
            id: "u4-l1-e2",
            type: "translate",
            prompt: "Traduisez : Rouge",
            promptLang: "fr",
            options: ["Ndëg usus", "Ndëg ujop", "Ndëg bëbëng", "Ndëg utëkël"],
            answer: "Ndëg usus",
            emoji: "🔴",
          },
          {
            id: "u4-l1-e3",
            type: "multiple_choice",
            prompt: "« Ndëg bëbëng » signifie :",
            promptLang: "fr",
            options: ["Blanc", "Noir", "Bleu", "Jaune"],
            answer: "Blanc",
            emoji: "⚪",
          },
          {
            id: "u4-l1-e4",
            type: "multiple_choice",
            prompt: "Comment dit-on « jaune » en Mandjaku ?",
            promptLang: "fr",
            options: ["Ndëg ulumbu", "Ndëg usus", "Ndëg ujop", "Ndëg bëbëng"],
            answer: "Ndëg ulumbu",
            emoji: "🟡",
          },
          {
            id: "u4-l1-e5",
            type: "multiple_choice",
            prompt: "« Ndëg utëkël » signifie :",
            promptLang: "fr",
            options: ["Noir", "Rouge", "Vert", "Blanc"],
            answer: "Noir",
            emoji: "⚫",
          },
        ],
      },
    ],
  },
  {
    id: "unit-5",
    title: "Vie quotidienne",
    titleFr: "La Vie Quotidienne",
    description: "Expressions du quotidien en Mandjaku",
    icon: "🌅",
    color: "#0EA5E9",
    colorDark: "#0284C7",
    lessons: [
      {
        id: "u5-l1",
        title: "Daily Life",
        titleFr: "Expressions quotidiennes",
        icon: "☀️",
        xp: 10,
        exercises: [
          {
            id: "u5-l1-e1",
            type: "multiple_choice",
            prompt: "Comment dit-on « manger » en Mandjaku ?",
            promptLang: "fr",
            options: ["Di", "Nyu", "Dem", "Dëk"],
            answer: "Di",
            emoji: "🍽️",
          },
          {
            id: "u5-l1-e2",
            type: "multiple_choice",
            prompt: "« Nyu » signifie :",
            promptLang: "fr",
            options: ["Boire", "Manger", "Dormir", "Marcher"],
            answer: "Boire",
            emoji: "🥤",
          },
          {
            id: "u5-l1-e3",
            type: "translate",
            prompt: "Traduisez : Maison",
            promptLang: "fr",
            options: ["Bantaba", "Fulo", "Ndi", "Kabu"],
            answer: "Bantaba",
            emoji: "🏠",
          },
          {
            id: "u5-l1-e4",
            type: "multiple_choice",
            prompt: "« Dem » signifie :",
            promptLang: "fr",
            options: ["Partir / Aller", "Venir", "Rester", "Dormir"],
            answer: "Partir / Aller",
            emoji: "🚶",
          },
          {
            id: "u5-l1-e5",
            type: "multiple_choice",
            prompt: "Comment dit-on « eau » en Mandjaku ?",
            promptLang: "fr",
            options: ["Djiwo", "Fulo", "Kabu", "Bantaba"],
            answer: "Djiwo",
            emoji: "💧",
          },
        ],
      },
    ],
  },
];
