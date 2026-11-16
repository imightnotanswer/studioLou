'use client'

import { useState, useEffect } from 'react'

/**
 * Square Booking Modal Component
 * 
 * Uses iframe with Square's direct booking link for reliable, fast loading.
 * This is more reliable than trying to use Square's embed script dynamically.
 */
export function SquareBookingModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpenBooking = () => setIsOpen(true)
    window.addEventListener('openSquareBooking', handleOpenBooking)
    return () => window.removeEventListener('openSquareBooking', handleOpenBooking)
  }, [])

  const handleClose = () => setIsOpen(false)

  // While open: lock page scroll (html is the scroll container on this site, so lock both
  // html and body) and allow Escape to close. Everything is restored on close.
  useEffect(() => {
    if (!isOpen) return
    const html = document.documentElement
    const body = document.body
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    }
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    html.style.overscrollBehavior = 'none'

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      html.style.overflow = prev.htmlOverflow
      body.style.overflow = prev.bodyOverflow
      html.style.overscrollBehavior = prev.htmlOverscroll
      window.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-end md:justify-center bg-black/60 backdrop-blur-sm overscroll-none"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book an appointment"
        className="relative w-full h-[95dvh] pb-[env(safe-area-inset-bottom)] md:pb-0 md:h-[90%] md:w-[90%] md:max-w-4xl md:max-h-[800px] bg-white rounded-t-2xl md:rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close bar: sits above the iframe so it never covers Square's own controls */}
        <div className="flex shrink-0 items-center justify-end bg-white px-2 py-1.5">
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close booking"
            className="flex h-9 w-9 items-center justify-center rounded-full text-black/70 hover:text-black transition-colors duration-200 hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {/* Square Booking Iframe - Direct link, loads instantly */}
        <iframe
          src="https://app.squareup.com/appointments/book/54nx9qz78e2p8w/LS3MZ80C6P0VA/start"
          className="w-full flex-1 border-0"
          title="Book an appointment"
          allow="payment"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  )
}

/**
 * Function to open the Square booking modal
 */
export function openSquareBooking() {
  window.dispatchEvent(new CustomEvent('openSquareBooking'))
}
