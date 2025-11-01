# Fonts Directory

## Local Fonts (Required)

Place these font files in this directory:

- **presicav-bold.otf** - for headings (currently in use)
- **acme-gothic-wide-semibold.otf** - fallback for headings (currently in use)

These fonts are loaded using `next/font/local` in `app/fonts.ts`.

## Google Fonts (Auto-imported)

The following fonts are automatically imported via Google Fonts in `app/globals.css`:

- **Figtree** - for body text (weights: 400, 600)
- **Bricolage Grotesque** - fallback for body (weights: 200-800)

## Accent Font

- **Accent font** - Using Figtree (Malila Medium not available)

## Notes

- Local fonts should be `.otf`, `.woff2`, `.woff`, or `.ttf` format
- Google Fonts are loaded via CSS `@import` in `globals.css`
- All fonts are configured in `app/fonts.ts` and `app/globals.css`

