"use client";
import { useSvgPaths } from "./useSvgPaths";

interface Props {
  filename: string;
  strokeWidth?: number;
  strokeColor?: string;
  bgColor?: string;
  strokeLinecap?: "round" | "square" | "butt";
  strokeLinejoin?: "round" | "miter" | "bevel";
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Renders a Manjaku symbol inline as SVG so stroke params can be overridden at runtime. */
export function SymbolPreview({
  filename,
  strokeWidth = 60,
  strokeColor = "#ffffff",
  bgColor = "#000000",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  size = 120,
  className = "",
  style,
}: Props) {
  const data = useSvgPaths(filename);

  if (!data) {
    return (
      <div
        className={`animate-pulse ${className}`}
        style={{ width: size, height: size, background: bgColor, borderRadius: 6, ...style }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={data.viewBox}
      className={className}
      style={{ display: "block", flexShrink: 0, ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1000" height="1000" fill={bgColor} />
      <g
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        strokeLinejoin={strokeLinejoin}
      >
        {data.paths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
    </svg>
  );
}

/** Generate a downloadable SVG string from path data + style */
export function buildSvgString(
  paths: string[],
  opts: {
    strokeWidth: number;
    bgColor: string;
    fgColor: string;
    strokeLinecap: string;
    strokeLinejoin: string;
  }
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" fill="${opts.bgColor}"/>
  <g fill="none" stroke="${opts.fgColor}" stroke-width="${opts.strokeWidth}" stroke-linecap="${opts.strokeLinecap}" stroke-linejoin="${opts.strokeLinejoin}">
    ${paths.map((d) => `<path d="${d}"/>`).join("\n    ")}
  </g>
</svg>`;
}

export function downloadSvg(content: string, filename: string) {
  const blob = new Blob([content], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
