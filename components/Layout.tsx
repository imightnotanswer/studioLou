'use client'

import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const isBookingPage = pathname === '/booking'

  return (
    <div className={(isHomepage || isBookingPage) ? 'h-screen flex flex-col overflow-hidden' : 'min-h-screen flex flex-col'}>
      <Header />
      <main className={(isHomepage || isBookingPage) ? 'flex-1 flex items-center overflow-hidden w-full min-h-0' : 'flex-grow'}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

