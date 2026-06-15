/**
 * Manjaku script glyphs — inline SVG path data.
 * viewBox is always "0 0 1000 1000". stroke="currentColor" → colour via CSS.
 */
export const MANJAKU_GLYPHS: Record<string, string> = {
  // ── Vowels ──────────────────────────────────────────────────────────────────
  letter_A: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M240 760 L760 240"/><path d="M760 760 L240 240"/></g>`,
  letter_E: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 300 C380 300 380 520 500 520 C620 520 620 740 500 740"/><path d="M500 300 C620 300 620 520 500 520"/></g>`,
  letter_E_acute: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 300 C380 300 380 520 500 520 C620 520 620 740 500 740"/><path d="M500 300 C620 300 620 520 500 520"/></g><circle cx="650" cy="240" r="40" fill="currentColor"/>`,
  letter_I: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M680 320 C560 300 420 360 420 520 C420 680 560 740 680 720"/><path d="M680 720 L680 780"/></g>`,
  letter_O: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"></g><circle cx="460" cy="520" r="200" fill="none" stroke="currentColor" stroke-width="60"/><g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M600 620 L720 760"/></g>`,
  letter_OU: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"></g><circle cx="420" cy="540" r="180" fill="none" stroke="currentColor" stroke-width="60"/><g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M580 540 L760 540"/></g>`,

  // ── Consonants ───────────────────────────────────────────────────────────────
  letter_B: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M260 240 L260 760"/><path d="M260 760 L700 760"/></g>`,
  letter_D: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M180 240 L300 760 L500 360 L700 760 L820 240"/></g>`,
  letter_F: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"></g><circle cx="420" cy="520" r="120" fill="none" stroke="currentColor" stroke-width="60"/><g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M260 740 L740 740" stroke-width="50"/></g>`,
  letter_HEU: `<circle cx="500" cy="360" r="140" fill="none" stroke="currentColor" stroke-width="60"/><g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 500 L500 800"/><path d="M380 560 L620 560"/></g>`,
  letter_K: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 240 L260 760 L740 760 Z"/></g>`,
  letter_L: `<circle cx="500" cy="540" r="240" fill="none" stroke="currentColor" stroke-width="60"/><g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M340 700 L660 380"/></g>`,
  letter_M: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M220 760 A280 260 0 0 1 780 760"/></g>`,
  letter_N: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M260 360 L740 660"/><path d="M300 760 A260 220 0 0 1 700 760"/></g>`,
  letter_P: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 240 L500 760"/><path d="M300 240 L700 240"/></g>`,
  letter_R: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 240 L500 760"/></g>`,
  letter_S: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M740 300 L360 300 L360 740"/></g>`,
  letter_T: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M260 300 L740 300"/><path d="M500 300 L500 760"/></g>`,
  letter_Y: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 260 L500 760"/><path d="M360 300 L500 440"/><path d="M640 300 L500 440"/></g>`,

  // ── Digraphs ─────────────────────────────────────────────────────────────────
  letter_CHE: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M280 300 L720 520 L280 740"/></g>`,
  letter_DJE: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M140 240 L300 760 L500 340 L700 760 L860 240"/></g>`,
  letter_GNE: `<circle cx="420" cy="520" r="120" fill="none" stroke="currentColor" stroke-width="60"/><g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M520 580 L660 760"/></g>`,
  letter_GUE: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M660 260 L340 260"/><path d="M500 260 L500 620 C500 740 420 780 340 780"/></g>`,
  letter_NGHE: `<circle cx="500" cy="360" r="140" fill="none" stroke="currentColor" stroke-width="60"/><g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M500 500 L500 800"/><path d="M360 560 L620 560"/><path d="M320 720 L680 880"/></g>`,
  letter_THE: `<g fill="none" stroke="currentColor" stroke-width="60" stroke-linecap="round" stroke-linejoin="round"><path d="M720 520 C720 360 560 300 420 360 C300 410 300 630 420 680 C560 740 720 680 720 520 Z"/><path d="M420 360 L420 220"/></g>`,
};

/** Map from alphabet letter ID to glyph key */
export const LETTER_TO_GLYPH: Record<string, string> = {
  A: "letter_A",
  E: "letter_E",
  E_ACUTE: "letter_E_acute",
  I: "letter_I",
  O: "letter_O",
  OU: "letter_OU",
  B: "letter_B",
  D: "letter_D",
  F: "letter_F",
  H: "letter_HEU",
  K: "letter_K",
  L: "letter_L",
  M: "letter_M",
  N: "letter_N",
  P: "letter_P",
  R: "letter_R",
  S: "letter_S",
  T: "letter_T",
  Y: "letter_Y",
  CHE: "letter_CHE",
  DJE: "letter_DJE",
  GNE: "letter_GNE",
  GUE: "letter_GUE",
  NGHE: "letter_NGHE",
  THE: "letter_THE",
};

/** Elder sketch photos — original hand-drawn alphabet references, Aug 2024 */
export const ELDER_SKETCHES = [
  { src: "/alphabet-svg/sketch_alphabet_1.jpg", label: "Croquis • Page 1" },
  { src: "/alphabet-svg/sketch_alphabet_2.jpg", label: "Croquis • Page 2" },
  { src: "/alphabet-svg/sketch_alphabet_3.png", label: "Croquis • Page 3" },
  { src: "/alphabet-svg/sketch_alphabet_4.jpeg", label: "Croquis • Page 4" },
];
