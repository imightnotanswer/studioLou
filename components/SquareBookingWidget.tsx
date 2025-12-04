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
    const handleOpenBooking = () => {
      setIsOpen(true)
      document.body.style.overflow = 'hidden'
    }

    window.addEventListener('openSquareBooking', handleOpenBooking)

    return () => {
      window.removeEventListener('openSquareBooking', handleOpenBooking)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-end md:justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      {/* Mobile hint - subtle tap indicator */}
      <div className="md:hidden w-full flex justify-center pt-2 pb-1">
        <button
          onClick={handleClose}
          className="text-white/70 hover:text-white text-xs flex items-center gap-1 transition-colors"
          aria-label="Tap to close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span>Tap outside to close</span>
        </button>
      </div>
      
      <div
        className="relative w-full h-[95vh] md:h-[90%] md:w-[90%] md:max-w-4xl md:max-h-[800px] bg-white rounded-t-2xl md:rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Square Booking Iframe - Direct link, loads instantly */}
        <iframe
          src="https://app.squareup.com/appointments/book/54nx9qz78e2p8w/LS3MZ80C6P0VA/start"
          className="w-full h-full border-0"
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
