"use client";
import { useState, useEffect } from "react";

export interface SvgPathData {
  paths: string[];            // 'd' attributes of every <path>
  originalStrokeWidth: number;
  viewBox: string;
}

// Module-level cache + listener map so all components share one fetch per file
const CACHE: Record<string, SvgPathData | "loading"> = {};
const LISTENERS: Record<string, Set<(d: SvgPathData) => void>> = {};

function notify(file: string, data: SvgPathData) {
  LISTENERS[file]?.forEach((fn) => fn(data));
}

function fetchSvg(file: string) {
  if (CACHE[file] !== undefined) return;
  CACHE[file] = "loading";

  fetch(`/alphabet-svg/${file}`)
    .then((r) => r.text())
    .then((text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "image/svg+xml");
      const svgEl = doc.querySelector("svg");
      const gEl = doc.querySelector("g");
      const paths = Array.from(doc.querySelectorAll("path"))
        .map((p) => p.getAttribute("d") ?? "")
        .filter(Boolean);

      const data: SvgPathData = {
        paths,
        originalStrokeWidth: parseInt(gEl?.getAttribute("stroke-width") ?? "60"),
        viewBox: svgEl?.getAttribute("viewBox") ?? "0 0 1000 1000",
      };

      CACHE[file] = data;
      notify(file, data);
    })
    .catch(() => {
      delete CACHE[file]; // allow retry
    });
}

export function useSvgPaths(filename: string | undefined): SvgPathData | null {
  const [data, setData] = useState<SvgPathData | null>(() => {
    if (!filename) return null;
    const c = CACHE[filename];
    return typeof c === "object" ? c : null;
  });

  useEffect(() => {
    if (!filename) return;

    const c = CACHE[filename];
    if (typeof c === "object") { setData(c); return; }

    if (!LISTENERS[filename]) LISTENERS[filename] = new Set();
    const handler = (d: SvgPathData) => setData(d);
    LISTENERS[filename].add(handler);

    fetchSvg(filename);

    return () => { LISTENERS[filename]?.delete(handler); };
  }, [filename]);

  return data;
}

/** Eagerly warm the cache for a list of files */
export function prefetchSvgs(files: string[]) {
  files.forEach(fetchSvg);
}
