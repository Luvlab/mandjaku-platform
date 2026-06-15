"use client";

import { useMemo } from "react";
import { MANJAKU_GLYPHS, LETTER_TO_GLYPH } from "@/data/manjaku-glyphs";

export type GlyphVariant = "clean" | "sketch";

interface ManjakuGlyphProps {
  /** Letter ID from MANJAK_ALPHABET (e.g. "A", "CHE", "NGHE") OR a glyph key (e.g. "letter_A") */
  id: string;
  /** Size in px (width = height). Default 64 */
  size?: number;
  /** Colour for stroke. Uses currentColor from container if omitted. */
  color?: string;
  /** "clean" = vectorised symbol; "sketch" = hand-drawn rough filter */
  variant?: GlyphVariant;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

const FILTER_ID = "mjk-sketch-filter";

/** Shared SVG filter definitions — rendered once, reused everywhere */
export function ManjakuGlyphDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute", pointerEvents: "none" }}>
      <defs>
        {/* Sketch / hand-drawn effect */}
        <filter id={FILTER_ID} x="-5%" y="-5%" width="110%" height="110%">
          {/* Slight displacement to mimic pen wobble */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.04 0.04"
            numOctaves="3"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* Slight blur then sharpen to mimic ink diffusion */}
          <feGaussianBlur in="displaced" stdDeviation="3" result="blurred" />
          <feComposite in="displaced" in2="blurred" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export default function ManjakuGlyph({
  id,
  size = 64,
  color,
  variant = "clean",
  className = "",
  style = {},
  title,
}: ManjakuGlyphProps) {
  // Resolve glyph key: accept both "A" and "letter_A"
  const glyphKey = useMemo(() => {
    if (id.startsWith("letter_")) return id;
    return LETTER_TO_GLYPH[id] ?? null;
  }, [id]);

  const innerSvg = glyphKey ? (MANJAKU_GLYPHS[glyphKey] ?? null) : null;

  if (!innerSvg) {
    // Fallback: unsupported glyph
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          fontSize: size * 0.4,
          fontWeight: 900,
          color: color ?? "currentColor",
          ...style,
        }}
      >
        {id}
      </span>
    );
  }

  const filterProp =
    variant === "sketch" ? `url(#${FILTER_ID})` : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      className={className}
      style={{
        color: color ?? "currentColor",
        display: "block",
        flexShrink: 0,
        filter: filterProp,
        ...style,
      }}
      aria-label={title ?? `Symbole Manjaku — ${id}`}
      role="img"
      dangerouslySetInnerHTML={{ __html: innerSvg }}
    />
  );
}
