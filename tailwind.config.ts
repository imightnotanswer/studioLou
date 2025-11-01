import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        olive: "#a1aa2e",
        blueSoft: "#9ab4c1",
        brownDeep: "#440a09",
        cream: "#f4ecd3",
        sage: "#818642",
        orangeBurnt: "#b72b0f",
        navy: "#0b3249",
        maroon: "#700303",
      },
      fontFamily: {
        heading: ["var(--font-presicav)", "var(--font-acme-gothic)", "sans-serif"],
        body: ["var(--font-figtree)", "var(--font-bricolage)", "sans-serif"],
        accent: ["var(--font-accent)", "sans-serif"],
      },
      borderRadius: {
        full: "9999px",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
}
export default config

