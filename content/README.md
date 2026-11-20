# Content translations

French is the source language of the site's long texts (data files and components).
`en.json` and `pt.json` map each French string to its translation; a string with no
entry is shown unchanged (Manjak words, names, video titles).

- `node scripts/extract-content.mjs` rewrites `data-strings.json`, the list of strings found in the data files.
- `keys.json` is the list that was sent for translation on 2026-11-20.
- Short interface texts live in `/messages/<locale>.json` (next-intl), not here.

Languages offered: French, Portuguese, English (see `i18n/routing.ts`).
