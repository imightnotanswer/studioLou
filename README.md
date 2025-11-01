# Greenpoint Facialist Website

A clean, modern, and intentionally calm website for Greenpoint Facialist, a facial studio located in Greenpoint, Brooklyn.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Fonts are already configured:
   - Local fonts: `presicav-bold.otf` and `acme-gothic-wide-semibold.otf` (already in `/fonts` folder)
   - Google Fonts: Figtree and Bricolage Grotesque are automatically imported via CSS
   - Accent font: Using Figtree (Malila Medium not available)

   See `/fonts/README.md` for more details.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
/app
  /page.tsx          # Homepage
  /about/page.tsx    # About page
  /services/page.tsx # Services page
  /contact/page.tsx  # Contact page
  /booking/page.tsx  # Booking page
  layout.tsx         # Root layout
  globals.css        # Global styles
  fonts.ts           # Font configuration

/components
  Header.tsx         # Navigation header
  Footer.tsx         # Footer component
  Layout.tsx         # Layout wrapper
  Button.tsx         # CTA button component
  ServiceCard.tsx    # Service card component

/fonts               # Custom font files

/styles
  (Tailwind config in tailwind.config.ts)
```

## 🎨 Design System

### Colors
- **Olive Green**: `#a1aa2e`
- **Soft Blue**: `#9ab4c1`
- **Deep Brown**: `#440a09`
- **Cream**: `#f4ecd3`
- **Sage Green**: `#818642`
- **Burnt Orange**: `#b72b0f`
- **Navy**: `#0b3249`
- **Maroon**: `#700303`

### Typography
- **Headings**: Presicav Bold / Acme Gothic SemiBold (local fonts)
- **Body**: Figtree / Bricolage Grotesque (Google Fonts)
- **Accent**: Figtree (Malila Medium not available)

## 🛠 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Notes

- Local font files are already in `/fonts` directory
- Booking page links to Square (https://squareup.com/appointments/book) - update with your actual booking URL when ready
- Add actual portrait image to `/app/about/page.tsx` when available (currently using placeholder)
- Add embedded map to `/app/contact/page.tsx` if desired (currently using placeholder)

## 🎯 Features

- ✅ Responsive design (mobile-first)
- ✅ Sticky navigation with scroll effects
- ✅ Smooth transitions and hover states
- ✅ SEO-friendly metadata
- ✅ TypeScript for type safety
- ✅ TailwindCSS for styling
- ✅ Next.js App Router

