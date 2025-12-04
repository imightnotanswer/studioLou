'use client'

import { Header } from './Header'
import { Footer } from './Footer'
import { EmailPopup } from './EmailPopup'
import { SquareBookingModal } from './SquareBookingWidget'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        min-h-[100dvh]               /* dynamic viewport height (iOS/Android safe) */
        grid grid-rows-[auto_1fr_auto]  /* header | main (fills) | footer */
        bg-cream text-brownDeep
        w-full
      "
    >
      <Header />
      <main className="min-w-0 w-full">{children}</main>
      <Footer />
      <EmailPopup />
      <SquareBookingModal />
    </div>
  )
}
