// Font family model for the Manjaku symbol font studio
// Families are persisted in localStorage; these are the factory presets.

export interface FontFamilyStyle {
  strokeWidth: number;
  strokeLinecap: "round" | "square" | "butt";
  strokeLinejoin: "round" | "miter" | "bevel";
  bgColor: string;
  fgColor: string;
}

export interface FontFamily extends FontFamilyStyle {
  id: string;
  name: string;
  description: string;
  /** Per-symbol stroke-width override (by symbol id, e.g. "A" or "digit_2") */
  overrides: Record<string, Partial<FontFamilyStyle>>;
  isPreset?: boolean;
}

export const PRESET_FAMILIES: FontFamily[] = [
  {
    id: "regular",
    name: "Manjaku Regular",
    description: "Trait de base, arrondi — le poids standard",
    strokeWidth: 60,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    bgColor: "#000000",
    fgColor: "#ffffff",
    overrides: {},
    isPreset: true,
  },
  {
    id: "bold",
    name: "Manjaku Bold",
    description: "Trait épais, présence forte",
    strokeWidth: 90,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    bgColor: "#000000",
    fgColor: "#ffffff",
    overrides: {},
    isPreset: true,
  },
  {
    id: "thin",
    name: "Manjaku Thin",
    description: "Trait fin, élégant",
    strokeWidth: 28,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    bgColor: "#000000",
    fgColor: "#ffffff",
    overrides: {},
    isPreset: true,
  },
  {
    id: "display",
    name: "Manjaku Display",
    description: "Traits carrés, géométrique — titrage",
    strokeWidth: 50,
    strokeLinecap: "square",
    strokeLinejoin: "miter",
    bgColor: "#000000",
    fgColor: "#ffffff",
    overrides: {},
    isPreset: true,
  },
  {
    id: "outline",
    name: "Manjaku Outline",
    description: "Fond blanc, pour impression & broderie",
    strokeWidth: 30,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    bgColor: "#ffffff",
    fgColor: "#000000",
    overrides: {},
    isPreset: true,
  },
];

export const LS_KEY = "manjak-font-families-v1";

export function loadFamilies(): FontFamily[] {
  if (typeof window === "undefined") return PRESET_FAMILIES;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return PRESET_FAMILIES;
    const saved: FontFamily[] = JSON.parse(raw);
    // Merge: keep saved custom families, refresh presets from source
    const customFamilies = saved.filter((f) => !f.isPreset);
    return [...PRESET_FAMILIES, ...customFamilies];
  } catch {
    return PRESET_FAMILIES;
  }
}

export function saveFamilies(families: FontFamily[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LS_KEY, JSON.stringify(families));
}
