import type { Metadata } from 'next'
import './globals.css'
import { Layout } from '@/components/Layout'
import { presicav, acmeGothic, accent } from './fonts'

export const metadata: Metadata = {
  title: 'Greenpoint Facialist | Facial Studio in Greenpoint, Brooklyn',
  description: 'Intentional skincare treatments blending botanical care with clinical results. Located in Greenpoint, Brooklyn.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        {/* Preconnect to Square for faster booking widget loading */}
        <link rel="preconnect" href="https://square.site" />
        <link rel="preconnect" href="https://app.squareup.com" />
        <link rel="dns-prefetch" href="https://square.site" />
        <link rel="dns-prefetch" href="https://app.squareup.com" />
      </head>
      <body
        className={`${presicav.variable} ${acmeGothic.variable} ${accent.variable}`}
      >
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}

