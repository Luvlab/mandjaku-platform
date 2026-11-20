// Collects every human-readable string from the data files, for translation.
// Run: node scripts/extract-content.mjs  (Node 23+ strips TypeScript types itself)
import { writeFileSync } from "node:fs";
const files = ["alphabet", "courses", "dictionary", "fonts", "history", "keyboards", "seo"];
const out = new Set();
const skip = (s) =>
  s.length < 2 || /^(https?:|\/[\w.\/?=&-]*$|#|[\w.-]+\.(svg|png|jpg|jpeg|exe|zip|apk|gz|keylayout)$)/.test(s) ||
  /^[a-z0-9_]*[0-9_][a-z0-9_-]*$/.test(s) || /^[\d\s.,~+%€-]+$/.test(s) || /^<|stroke=|^M[\d ]/.test(s) || !/[A-Za-zÀ-ÿ]{2}/.test(s);
const walk = (v) => {
  if (typeof v === "string") { if (!skip(v)) out.add(v); }
  else if (Array.isArray(v)) v.forEach(walk);
  else if (v && typeof v === "object") Object.values(v).forEach(walk);
};
for (const f of files) walk(await import(`../data/${f}.ts`));
writeFileSync(new URL("../content/data-strings.json", import.meta.url), JSON.stringify([...out], null, 1));
console.log(out.size, "strings", [...out].join(" ").length, "chars");
