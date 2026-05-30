"use client";

import { useState } from "react";
import { MANJAK_ALPHABET } from "@/data/alphabet";
import { DICTIONARY } from "@/data/dictionary";

type Lesson = "intro" | "vowels" | "consonants" | "greetings" | "numbers" | "quiz";

const LESSONS: { id: Lesson; title: string; emoji: string; desc: string }[] = [
  { id: "intro", title: "Introduction", emoji: "👋", desc: "Qu'est-ce que le Mandjaku ?" },
  { id: "vowels", title: "Les Voyelles", emoji: "🔊", desc: "10 voyelles & leurs tons" },
  { id: "consonants", title: "Les Consonnes", emoji: "🔤", desc: "Consonnes & digrammes" },
  { id: "greetings", title: "Salutations", emoji: "🤝", desc: "Premiers mots à apprendre" },
  { id: "numbers", title: "Les Nombres", emoji: "🔢", desc: "Compter en Mandjaku" },
  { id: "quiz", title: "Quiz", emoji: "🧠", desc: "Testez vos connaissances" },
];

const QUIZ_QUESTIONS = [
  { question: "Comment dit-on 'père' en Mandjaku ?", options: ["napats", "asin", "nandjak", "nawar"], answer: "asin" },
  { question: "Quel préfixe désigne les noms de personnes (classe 1) ?", options: ["ba-", "ù-", "a-/n-/na-", "gë-"], answer: "a-/n-/na-" },
  { question: "Comment dit-on 'eau' en Mandjaku ?", options: ["bëgas", "mëndur", "ùcaak", "bërol"], answer: "mëndur" },
  { question: "Quelle lettre représente le son /ŋ/ (nasal vélaire) ?", options: ["ng", "gn", "nh", "nk"], answer: "ng" },
  { question: "Comment dit-on 'Bonjour / Salut !' en Mandjaku ?", options: ["Natu!", "War mban!", "Obi!", "Kulam?"], answer: "Obi!" },
  { question: "Combien de voyelles compte l'alphabet Mandjaku ?", options: ["7", "5", "10", "12"], answer: "10" },
  { question: "Comment dit-on 'enfant' en Mandjaku ?", options: ["nabang", "napats", "nawar", "asin"], answer: "napats" },
  { question: "Quelle est la structure de la phrase en Mandjaku ?", options: ["SVO (Sujet-Verbe-Objet)", "SOV (Sujet-Objet-Verbe)", "VSO (Verbe-Sujet-Objet)", "OVS"], answer: "SOV (Sujet-Objet-Verbe)" },
];

export default function LearnPage() {
  const [activeLesson, setActiveLesson] = useState<Lesson>("intro");
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const vowels = MANJAK_ALPHABET.filter((l) => l.category === "vowel");
  const consonants = MANJAK_ALPHABET.filter((l) => l.category === "consonant");
  const greetings = DICTIONARY.filter((d) => d.category === "salutations");
  const numbers = DICTIONARY.filter((d) => d.category === "nombres");

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    if (answer === QUIZ_QUESTIONS[quizIndex].answer) {
      setQuizScore((s) => s + 1);
    }
    setTimeout(() => {
      if (quizIndex + 1 < QUIZ_QUESTIONS.length) {
        setQuizIndex((i) => i + 1);
        setQuizAnswer(null);
      } else {
        setQuizDone(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setQuizAnswer(null);
    setQuizScore(0);
    setQuizDone(false);
  };

  return (
    <div className="min-h-screen pattern-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C8882A]/30 text-[#C8882A] text-sm font-medium mb-6">
            📚 Cours Interactifs
          </div>
          <h1 className="text-4xl sm:text-5xl font-black mb-4">
            <span className="text-gradient">Apprendre le Mandjaku</span>
          </h1>
          <p className="text-[#F5EDD3]/60 max-w-2xl mx-auto">
            Leçons interactives, quiz et outils pour apprendre la langue Mandjaku
            à votre rythme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-4 space-y-1 sticky top-24">
              {LESSONS.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                    activeLesson === lesson.id
                      ? "bg-[#C8882A]/20 border border-[#C8882A]/40 text-[#E8A94A]"
                      : "text-[#F5EDD3]/60 hover:text-[#F5EDD3] hover:bg-white/5"
                  }`}
                >
                  <span className="mr-2">{lesson.emoji}</span>
                  <span className="font-medium text-sm">{lesson.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Intro */}
            {activeLesson === "intro" && (
              <div className="space-y-6">
                <div className="glass rounded-2xl p-8">
                  <h2 className="text-2xl font-black mb-4 text-gradient">Bienvenue en Mandjaku</h2>
                  <div className="space-y-4 text-[#F5EDD3]/70 leading-relaxed">
                    <p>Le <strong className="text-[#C8882A]">Mandjaku</strong> (aussi orthographié Manjak, Manjaco, Mankanya) est une langue atlantique occidentale de la famille Niger-Congo. Elle est parlée par environ <strong className="text-[#C8882A]">300,000 personnes</strong> principalement en :</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>🇬🇼 <strong>Guinée-Bissau</strong> — régions de Cacheu et Oio</li>
                      <li>🇸🇳 <strong>Sénégal</strong> — principalement en Casamance</li>
                      <li>🇬🇲 <strong>Gambie</strong> — autour de Banjul</li>
                    </ul>
                    <p>La langue se caractérise par :</p>
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {[
                        ["🔊", "Système tonal (3 tons)"],
                        ["📏", "Voyelles longues & courtes"],
                        ["🏷️", "6 classes nominales"],
                        ["📐", "Structure SOV"],
                      ].map(([icon, text]) => (
                        <div key={text} className="bg-[#C8882A]/10 rounded-xl p-3 flex items-center gap-2">
                          <span>{icon}</span>
                          <span className="text-sm text-[#F5EDD3]/80">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold text-[#F5EDD3] mb-3">Première phrase utile :</h3>
                  <div className="bg-[#C8882A]/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-black text-gradient mb-2">Ku war?</div>
                    <div className="text-[#F5EDD3]/60">Comment vas-tu ? / How are you?</div>
                  </div>
                  <div className="bg-[#2D5016]/20 rounded-xl p-4 text-center mt-3">
                    <div className="text-3xl font-black text-[#6AB040] mb-2">War mban!</div>
                    <div className="text-[#F5EDD3]/60">Très bien ! / Very well!</div>
                  </div>
                </div>
              </div>
            )}

            {/* Vowels */}
            {activeLesson === "vowels" && (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-black mb-2 text-gradient">Les 10 Voyelles Mandjaku</h2>
                  <p className="text-[#F5EDD3]/60 text-sm">Chaque voyelle peut être courte ou longue (doublée). Cliquez sur une voyelle pour voir un exemple.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {vowels.map((v) => (
                    <div key={v.id} className="glass rounded-2xl p-5 text-center hover:border-[#2D5016]/60 transition-all">
                      <div className="text-4xl font-black text-[#6AB040] mb-2">{v.symbol}</div>
                      <div className="text-[#F5EDD3]/50 text-xs font-mono mb-2">{v.pronunciation}</div>
                      <div className="bg-[#2D5016]/15 rounded-lg px-3 py-2">
                        <div className="text-[#6AB040] font-bold text-sm">{v.example}</div>
                        <div className="text-[#F5EDD3]/40 text-xs">{v.meaning}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Consonants */}
            {activeLesson === "consonants" && (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 mb-2">
                  <h2 className="text-2xl font-black mb-2 text-gradient">Consonnes & Digrammes</h2>
                  <p className="text-[#F5EDD3]/60 text-sm">21 consonnes + digrammes spéciaux pour les sons particuliers du Mandjaku, dont des consonnes prénasalisées.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {consonants.map((c) => (
                    <div key={c.id} className="glass rounded-xl p-4 text-center hover:border-[#C8882A]/40 transition-all">
                      <div className="text-3xl font-black text-gradient mb-1">{c.symbol}</div>
                      <div className="text-[#F5EDD3]/40 text-xs font-mono mb-2">{c.pronunciation}</div>
                      <div className="text-[#E8A94A] text-xs font-semibold">{c.example}</div>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-bold text-[#C8882A] mb-3">Consonnes prénasalisées</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {["mb", "mp", "nc", "nd", "ng", "nj", "nk", "nt"].map((c) => (
                      <div key={c} className="bg-[#B85C38]/10 border border-[#B85C38]/20 rounded-lg p-2 text-center">
                        <span className="text-[#D4876A] font-bold">{c}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[#F5EDD3]/50 text-xs mt-3">Ces consonnes combinent un son nasal avec une consonne — caractéristique distinctive du Mandjaku.</p>
                </div>
              </div>
            )}

            {/* Greetings */}
            {activeLesson === "greetings" && (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 mb-2">
                  <h2 className="text-2xl font-black mb-2 text-gradient">Salutations & Phrases de base</h2>
                  <p className="text-[#F5EDD3]/60 text-sm">Les premiers mots essentiels pour commencer à parler Mandjaku.</p>
                </div>
                {greetings.map((g) => (
                  <div key={g.manjak} className="glass rounded-2xl p-6 flex flex-wrap items-center gap-6">
                    <div className="text-2xl font-black text-gradient min-w-0">{g.manjak}</div>
                    <div className="flex-1 space-y-1">
                      <div className="text-[#F5EDD3]/70 text-sm">🇫🇷 {g.french}</div>
                      <div className="text-[#F5EDD3]/50 text-sm">🇬🇧 {g.english}</div>
                      <div className="text-[#F5EDD3]/40 text-sm">🇵🇹 {g.portuguese}</div>
                    </div>
                    {g.pronunciation && (
                      <div className="text-[#C8882A] font-mono text-sm bg-[#C8882A]/10 px-3 py-1 rounded-lg">
                        [{g.pronunciation}]
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Numbers */}
            {activeLesson === "numbers" && (
              <div className="space-y-4">
                <div className="glass rounded-2xl p-6 mb-2">
                  <h2 className="text-2xl font-black mb-2 text-gradient">Les Nombres en Mandjaku</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {numbers.map((n, i) => (
                    <div key={n.manjak} className="glass rounded-2xl p-5 text-center hover:border-[#C8882A]/40 transition-all">
                      <div className="text-4xl font-black text-gradient mb-2">{i + 1}</div>
                      <div className="text-[#E8A94A] font-bold text-xl mb-1">{n.manjak}</div>
                      <div className="text-[#F5EDD3]/50 text-sm">{n.french} · {n.english}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz */}
            {activeLesson === "quiz" && (
              <div className="glass rounded-2xl p-8">
                {quizDone ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {quizScore >= 6 ? "🏆" : quizScore >= 4 ? "⭐" : "💪"}
                    </div>
                    <h2 className="text-3xl font-black text-gradient mb-2">
                      {quizScore} / {QUIZ_QUESTIONS.length}
                    </h2>
                    <p className="text-[#F5EDD3]/60 mb-6">
                      {quizScore >= 6 ? "Excellent ! Vous maîtrisez les bases du Mandjaku !" : quizScore >= 4 ? "Bon travail ! Continuez à pratiquer." : "Continuez à étudier — vous progressez !"}
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 rounded-xl bg-[#C8882A] text-white font-bold hover:bg-[#9B6810] transition-colors"
                    >
                      Recommencer le Quiz
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-[#F5EDD3]/50 text-sm">Question {quizIndex + 1} / {QUIZ_QUESTIONS.length}</span>
                      <span className="text-[#C8882A] font-semibold">Score: {quizScore}</span>
                    </div>
                    <div className="h-2 bg-[#C8882A]/20 rounded-full mb-8">
                      <div
                        className="h-2 bg-[#C8882A] rounded-full transition-all"
                        style={{ width: `${((quizIndex) / QUIZ_QUESTIONS.length) * 100}%` }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#F5EDD3] mb-6">
                      {QUIZ_QUESTIONS[quizIndex].question}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {QUIZ_QUESTIONS[quizIndex].options.map((opt) => {
                        const isCorrect = opt === QUIZ_QUESTIONS[quizIndex].answer;
                        const isSelected = opt === quizAnswer;
                        return (
                          <button
                            key={opt}
                            onClick={() => !quizAnswer && handleQuizAnswer(opt)}
                            disabled={!!quizAnswer}
                            className={`p-4 rounded-xl font-medium text-sm text-left transition-all ${
                              quizAnswer
                                ? isCorrect
                                  ? "bg-[#2D5016]/40 border-2 border-[#6AB040] text-[#6AB040]"
                                  : isSelected
                                  ? "bg-[#B85C38]/40 border-2 border-[#B85C38] text-[#D4876A]"
                                  : "glass opacity-40"
                                : "glass hover:border-[#C8882A]/40 hover:bg-[#C8882A]/5 cursor-pointer"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
