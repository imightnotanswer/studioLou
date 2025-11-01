'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isBookingPage = pathname === '/booking'

  // For homepage and booking page: fit everything on screen (no scroll needed)
  if (isHomepage || isBookingPage) {
    return (
      <div className="h-screen h-dvh flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 flex items-center overflow-hidden w-full min-h-0">
          {children}
        </main>
        <Footer />
      </div>
    )
  }

  // For all other pages: footer starts below the fold (requires scroll)
  return (
    <div className="grid grid-rows-[auto_minmax(100dvh,auto)_auto] min-h-screen">
      <Header />
      <main className="min-w-0 min-h-[100dvh] min-h-[100svh] flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}

