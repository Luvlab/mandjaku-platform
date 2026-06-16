"use client";

import { useMemo } from "react";
import { MANJAKU_GLYPHS, MANJAKU_DIGIT_GLYPHS, LETTER_TO_GLYPH } from "@/data/manjaku-glyphs";

export type GlyphVariant = "clean" | "sketch";

interface ManjakuGlyphProps {
  /** Letter ID from MANJAK_ALPHABET (e.g. "A", "CHE") OR glyph key (e.g. "letter_A") */
  id: string;
  /** Display size in px (square). Default 64 */
  size?: number;
  /** Stroke/fill colour. Default: Manjak green #009E49 */
  color?: string;
  /** "clean" = vectorised; "sketch" = hand-drawn wobble filter */
  variant?: GlyphVariant;
  className?: string;
  style?: React.CSSProperties;
  /** Accessible label. Defaults to "Symbole Manjaku — {id}" */
  title?: string;
}

/**
 * No-op kept for call-site API compatibility.
 * The data-URI approach no longer needs shared SVG filter defs in the document.
 */
export function ManjakuGlyphDefs() {
  return null;
}

/**
 * Renders a Manjaku script glyph as a plain <img> with a data:image/svg+xml
 * source. This avoids every React/Next.js SSR dangerouslySetInnerHTML SVG
 * quirk: no hydration mismatch, works in <img>, no CSS currentColor inheritance
 * needed.
 */
export default function ManjakuGlyph({
  id,
  size = 64,
  color = "#009E49",
  variant = "clean",
  className = "",
  style = {},
  title,
}: ManjakuGlyphProps) {
  // Resolve glyph key — accept "A" → "letter_A", pass-through "letter_A",
  // or look up digit glyphs directly via "digit_0" … "digit_9"
  const glyphKey = useMemo(() => {
    if (id.startsWith("letter_") || id.startsWith("digit_")) return id;
    return LETTER_TO_GLYPH[id] ?? null;
  }, [id]);

  const rawSvgInner = glyphKey
    ? (MANJAKU_GLYPHS[glyphKey] ?? MANJAKU_DIGIT_GLYPHS[glyphKey] ?? null)
    : null;

  // Build a self-contained SVG data URI. currentColor is replaced by the
  // resolved colour so the image is independent of any CSS context.
  const src = useMemo(() => {
    if (!rawSvgInner) return null;

    const strokeColor = color ?? "#009E49";
    // Replace all occurrences of currentColor (attribute values only)
    const paths = rawSvgInner.replace(/currentColor/g, strokeColor);

    let svgBody: string;
    if (variant === "sketch") {
      // Embed the displacement filter directly inside the SVG so no external
      // defs are needed.
      svgBody = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">',
        "<defs>",
        '<filter id="sk" x="-5%" y="-5%" width="110%" height="110%">',
        '<feTurbulence type="turbulence" baseFrequency="0.04 0.04"',
        ' numOctaves="3" seed="2" result="noise"/>',
        '<feDisplacementMap in="SourceGraphic" in2="noise"',
        ' scale="18" xChannelSelector="R" yChannelSelector="G"/>',
        "</filter>",
        "</defs>",
        '<g filter="url(#sk)">',
        paths,
        "</g>",
        "</svg>",
      ].join("");
    } else {
      svgBody = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">${paths}</svg>`;
    }

    return `data:image/svg+xml,${encodeURIComponent(svgBody)}`;
  }, [rawSvgInner, color, variant]);

  // Fallback: glyph not found → show the ID as text
  if (!src) {
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontSize: size * 0.38,
          fontWeight: 900,
          color: color ?? "currentColor",
          ...style,
        }}
      >
        {id}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={size}
      height={size}
      alt={title ?? `Symbole Manjaku — ${id}`}
      className={className}
      style={{ display: "block", flexShrink: 0, ...style }}
    />
  );
}
