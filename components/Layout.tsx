'use client'

import { Header } from './Header'
import { Footer } from './Footer'
import { SquareBookingModal } from './SquareBookingWidget'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        min-h-[100dvh]
        grid grid-rows-[auto_1fr_auto]
        bg-cream text-brownDeep
        w-full
        overflow-hidden
      "
    >
      <Header />
      <main className="min-w-0 w-full h-full overflow-hidden">{children}</main>
      <Footer />
      <SquareBookingModal />
    </div>
  )
}

