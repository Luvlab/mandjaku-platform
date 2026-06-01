"use client";

import { useState, useEffect, useCallback } from "react";
import { COURSES, type Unit, type Lesson, type Exercise } from "@/data/courses";

function getProgress(): Record<string, { stars: number; xp: number }> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem("manjak_progress") ?? "{}"); } catch { return {}; }
}
function saveProgress(lessonId: string, stars: number, xp: number) {
  const p = getProgress();
  if (!p[lessonId] || p[lessonId].stars < stars) p[lessonId] = { stars, xp };
  localStorage.setItem("manjak_progress", JSON.stringify(p));
}
function getTotalXP() { return Object.values(getProgress()).reduce((s, v) => s + v.xp, 0); }
function getStreak(): number {
  try {
    const d = JSON.parse(localStorage.getItem("manjak_streak") ?? "{}");
    return d.lastDate === new Date().toDateString() ? d.count : 0;
  } catch { return 0; }
}
function bumpStreak() {
  try {
    const d = JSON.parse(localStorage.getItem("manjak_streak") ?? "{}");
    const today = new Date().toDateString();
    localStorage.setItem("manjak_streak", JSON.stringify({ lastDate: today, count: d.lastDate === today ? d.count : (d.count ?? 0) + 1 }));
  } catch {}
}

type View = "map" | "lesson" | "result";

export default function LearnTab() {
  const [view, setView] = useState<View>("map");
  const [progress, setProgress] = useState<Record<string, { stars: number; xp: number }>>({});
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [activeLesson, setActiveLesson] = useState<{ unit: Unit; lesson: Lesson } | null>(null);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [resultStars, setResultStars] = useState(0);
  const [resultXP, setResultXP] = useState(0);

  useEffect(() => { setProgress(getProgress()); setTotalXP(getTotalXP()); setStreak(getStreak()); }, []);

  const startLesson = useCallback((unit: Unit, lesson: Lesson) => {
    setActiveLesson({ unit, lesson }); setExerciseIdx(0); setHearts(5);
    setSelected(null); setTyped(""); setConfirmed(false); setCorrect(null); setWrongCount(0);
    setView("lesson"); bumpStreak(); setStreak(getStreak());
  }, []);

  const handleCheck = useCallback(() => {
    if (!activeLesson) return;
    const ex = activeLesson.lesson.exercises[exerciseIdx];
    const ans = ex.type === "type_answer" ? typed.trim() : selected;
    const ok = ans?.toLowerCase() === ex.answer.toLowerCase();
    setCorrect(ok); setConfirmed(true);
    if (!ok) { setHearts((h) => Math.max(0, h - 1)); setWrongCount((w) => w + 1); }
  }, [activeLesson, exerciseIdx, selected, typed]);

  const handleNext = useCallback(() => {
    if (!activeLesson) return;
    const exs = activeLesson.lesson.exercises;
    if (exerciseIdx + 1 >= exs.length) {
      const stars = wrongCount === 0 ? 3 : wrongCount <= 2 ? 2 : 1;
      const xp = activeLesson.lesson.xp * stars;
      saveProgress(activeLesson.lesson.id, stars, xp);
      setResultStars(stars); setResultXP(xp);
      setProgress(getProgress()); setTotalXP(getTotalXP());
      setView("result");
    } else {
      setExerciseIdx((i) => i + 1); setSelected(null); setTyped(""); setConfirmed(false); setCorrect(null);
    }
  }, [activeLesson, exerciseIdx, wrongCount]);

  // MAP
  if (view === "map") {
    const level = Math.floor(totalXP / 100) + 1;
    const levelXP = totalXP % 100;
    return (
      <div className="max-w-2xl mx-auto pb-24">
        {/* XP bar */}
        <div className="card p-4 mb-6 sticky top-[104px] z-30">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white"
              style={{ background: "linear-gradient(135deg,#009E49,#007A38)", flexShrink: 0 }}>
              {level}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                <span>{totalXP} XP</span><span>Niv. {level + 1} dans {100 - levelXP} XP</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "var(--surface2)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${levelXP}%`, background: "linear-gradient(90deg,#009E49,#00C45A)" }} />
              </div>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="text-xl">🔥</div>
              <div className="text-xs font-bold" style={{ color: "#FCD116" }}>{streak} j</div>
            </div>
          </div>
        </div>

        {COURSES.map((unit, ui) => {
          const prevDone = ui === 0 || COURSES[ui - 1].lessons.every((l) => (progress[l.id]?.stars ?? 0) > 0);
          const unitDone = unit.lessons.every((l) => (progress[l.id]?.stars ?? 0) > 0);
          return (
            <div key={unit.id} className="mb-10">
              <div className="rounded-2xl p-4 mb-4" style={{
                background: `${unit.color}12`, border: `1.5px solid ${unitDone ? unit.color : "var(--border)"}`,
                opacity: !prevDone ? 0.45 : 1,
              }}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{unit.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: prevDone ? unit.color : "var(--text-muted)" }}>Unité {ui + 1}</div>
                    <div className="font-bold" style={{ color: "var(--text)" }}>{unit.titleFr}</div>
                  </div>
                  {unitDone ? <span className="text-xl">🏆</span> : !prevDone ? <span className="text-xl">🔒</span> : null}
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                {unit.lessons.map((lesson, li) => {
                  const p = progress[lesson.id];
                  const done = (p?.stars ?? 0) > 0;
                  const unlocked = prevDone && (li === 0 || (progress[unit.lessons[li - 1].id]?.stars ?? 0) > 0);
                  return (
                    <div key={lesson.id} className={`w-full max-w-xs ${li % 2 === 1 ? "ml-10 sm:ml-16" : ""}`}>
                      <button disabled={!unlocked} onClick={() => unlocked && startLesson(unit, lesson)}
                        className="w-full rounded-2xl p-4 flex items-center gap-3 transition-all"
                        style={{
                          background: done ? `${unit.color}15` : unlocked ? "var(--surface)" : "var(--surface2)",
                          border: `2px solid ${done ? unit.color : unlocked ? "var(--border)" : "transparent"}`,
                          opacity: !unlocked ? 0.4 : 1,
                          boxShadow: unlocked && !done ? "var(--shadow-md)" : "none",
                        }}>
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: done ? `linear-gradient(135deg,${unit.color},${unit.colorDark})` : "var(--surface2)" }}>
                          {!unlocked ? "🔒" : lesson.icon}
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <div className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>{lesson.titleFr}</div>
                          <div className="text-xs" style={{ color: "var(--text-muted)" }}>{lesson.exercises.length} exos · {lesson.xp} XP</div>
                          <div className="flex gap-0.5 mt-1">{[1,2,3].map((s) => <span key={s} style={{ opacity: (p?.stars ?? 0) >= s ? 1 : 0.2 }}>⭐</span>)}</div>
                        </div>
                        {done && <span className="text-xs font-bold px-2 py-1 rounded-full flex-shrink-0" style={{ background: `${unit.color}25`, color: unit.color }}>+{p.xp}XP</span>}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="card p-5 text-center mt-2" style={{ opacity: 0.55 }}>
          <div className="text-3xl mb-2">🚧</div>
          <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>Plus de leçons à venir</p>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Corps humain · Nature · Traditions · Grammaire…</p>
        </div>
      </div>
    );
  }

  // LESSON
  if (view === "lesson" && activeLesson) {
    const exs = activeLesson.lesson.exercises;
    const ex = exs[exerciseIdx];
    const pct = (exerciseIdx / exs.length) * 100;
    const canCheck = ex.type === "type_answer" ? typed.trim().length > 0 : selected !== null;

    return (
      <div className="max-w-xl mx-auto pb-32">
        <div className="flex items-center gap-3 mb-8 sticky top-[104px] z-30 py-3" style={{ background: "var(--bg)" }}>
          <button onClick={() => setView("map")} className="text-xl leading-none" style={{ color: "var(--text-muted)" }}>✕</button>
          <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--surface2)" }}>
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${pct}%`, background: `linear-gradient(90deg,${activeLesson.unit.color},#00C45A)` }} />
          </div>
          <div className="flex gap-0.5 flex-shrink-0">
            {[...Array(5)].map((_, i) => <span key={i} style={{ opacity: i < hearts ? 1 : 0.2, fontSize: "14px" }}>❤️</span>)}
          </div>
        </div>

        <div className="text-center mb-8">
          {ex.emoji && <div className="text-6xl mb-4 animate-fade-up">{ex.emoji}</div>}
          <div className="badge badge-green mb-3 mx-auto">
            {ex.type === "translate" ? "Traduction" : ex.type === "type_answer" ? "Complétez" : "Choisissez la bonne réponse"}
          </div>
          <h2 className="heading-md px-4" style={{ color: "var(--text)" }}>{ex.prompt}</h2>
        </div>

        {(ex.type === "multiple_choice" || ex.type === "translate") && ex.options && (
          <div className="grid grid-cols-1 gap-3">
            {ex.options.map((opt) => {
              let bg = "var(--surface)", border = "1px solid var(--border)", color = "var(--text)";
              if (confirmed) {
                if (opt === ex.answer) { bg = "rgba(0,158,73,0.15)"; border = "2px solid #009E49"; color = "#009E49"; }
                else if (opt === selected) { bg = "rgba(206,17,38,0.12)"; border = "2px solid #CE1126"; color = "#CE1126"; }
              } else if (selected === opt) { bg = "rgba(0,158,73,0.10)"; border = "2px solid #009E49"; color = "#009E49"; }
              return (
                <button key={opt} disabled={confirmed} onClick={() => setSelected(opt)}
                  className="w-full p-4 rounded-2xl text-left font-semibold transition-all flex items-center justify-between"
                  style={{ background: bg, border, color }}>
                  <span>{opt}</span>
                  {confirmed && opt === ex.answer && <span>✓</span>}
                  {confirmed && opt === selected && opt !== ex.answer && <span>✗</span>}
                </button>
              );
            })}
          </div>
        )}

        {ex.type === "type_answer" && (
          <div>
            <input value={typed} onChange={(e) => setTyped(e.target.value)} disabled={confirmed}
              className="w-full p-4 rounded-2xl text-lg font-semibold text-center border-2 outline-none transition-all"
              style={{
                background: confirmed ? (correct ? "rgba(0,158,73,0.12)" : "rgba(206,17,38,0.10)") : "var(--surface2)",
                borderColor: confirmed ? (correct ? "#009E49" : "#CE1126") : "var(--border)", color: "var(--text)",
              }}
              placeholder="Tapez votre réponse…"
              onKeyDown={(e) => e.key === "Enter" && canCheck && !confirmed && handleCheck()} />
          </div>
        )}

        {confirmed && (
          <div className="rounded-2xl p-4 mt-5 flex items-center gap-3 animate-fade-up"
            style={{ background: correct ? "rgba(0,158,73,0.12)" : "rgba(206,17,38,0.10)", border: `1.5px solid ${correct ? "#009E49" : "#CE1126"}` }}>
            <span className="text-2xl">{correct ? "🎉" : "💡"}</span>
            <div>
              <div className="font-bold text-sm" style={{ color: correct ? "#009E49" : "#CE1126" }}>{correct ? "Excellent !" : "Pas tout à fait…"}</div>
              {!correct && <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Réponse : <strong>{ex.answer}</strong></div>}
            </div>
          </div>
        )}

        <div className="fixed bottom-20 left-0 right-0 px-4 z-40 lg:relative lg:bottom-auto lg:px-0 lg:mt-8">
          {!confirmed
            ? <button disabled={!canCheck} onClick={handleCheck} className="btn btn-primary w-full justify-center py-4 rounded-2xl text-base" style={{ opacity: canCheck ? 1 : 0.4 }}>Vérifier</button>
            : <button onClick={handleNext} className="btn w-full justify-center py-4 rounded-2xl text-base font-bold" style={{ background: correct ? "#009E49" : "#CE1126", color: "#fff" }}>
                {exerciseIdx + 1 >= exs.length ? "Terminer la leçon 🎯" : "Continuer →"}
              </button>
          }
        </div>
      </div>
    );
  }

  // RESULT
  if (view === "result" && activeLesson) {
    const nextLessonIdx = activeLesson.unit.lessons.indexOf(activeLesson.lesson) + 1;
    const nextLesson = activeLesson.unit.lessons[nextLessonIdx];
    return (
      <div className="max-w-xl mx-auto text-center pt-8 pb-24 animate-fade-up">
        <div className="text-7xl mb-6">{resultStars === 3 ? "🏆" : resultStars === 2 ? "⭐" : "👍"}</div>
        <div className="heading-lg mb-2" style={{ color: "#009E49" }}>{resultStars === 3 ? "Parfait !" : resultStars === 2 ? "Bien joué !" : "Continue !"}</div>
        <div className="body-lg mb-8">{activeLesson.lesson.titleFr}</div>
        <div className="flex justify-center gap-3 mb-8">
          {[1,2,3].map((s) => <span key={s} className="text-5xl" style={{ opacity: resultStars >= s ? 1 : 0.2 }}>⭐</span>)}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[{ label: "XP gagnés", value: `+${resultXP}`, e: "⚡" }, { label: "Total XP", value: totalXP, e: "🎯" }, { label: "Série", value: `${streak}🔥`, e: "🔥" }].map((s) => (
            <div key={s.label} className="card p-4">
              <div className="text-2xl mb-1">{s.e}</div>
              <div className="text-xl font-black" style={{ color: "#009E49" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => setView("map")} className="btn btn-outline">← Carte</button>
          {nextLesson && <button onClick={() => startLesson(activeLesson.unit, nextLesson)} className="btn btn-primary">Leçon suivante →</button>}
        </div>
      </div>
    );
  }

  return null;
}
