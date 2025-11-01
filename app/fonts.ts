import localFont from 'next/font/local'

// Heading fonts - local files
export const presicav = localFont({
  src: '../fonts/PresicavRg-Bold.ttf',
  variable: '--font-presicav',
  display: 'swap',
  fallback: ['sans-serif'],
})

export const acmeGothic = localFont({
  src: '../fonts/PresicavRg-Bold.ttf',
  variable: '--font-acme-gothic',
  display: 'swap',
  fallback: ['sans-serif'],
})

// Body fonts are imported via Google Fonts in globals.css
// Accent font - using Figtree as fallback since Malila is not available
// We'll define it in CSS using the imported Google Fonts
export const accent = {
  variable: '--font-accent',
}

