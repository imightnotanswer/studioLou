'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import popupImage from '@/app/assets/summer-skin-series-popup.png'
import { openSquareBooking } from '@/components/SquareBookingWidget'

export function EmailPopup() {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('gpf-popup-dismissed')

    if (hasSeenPopup) {
      return
    }

    const timer = window.setTimeout(() => {
      setShowPopup(true)
      sessionStorage.setItem('gpf-popup-dismissed', 'true')
    }, 10000)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (showPopup) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [showPopup])

  const handleClose = () => {
    setShowPopup(false)
  }

  const handleBookNow = () => {
    setShowPopup(false)
    openSquareBooking()
  }

  if (!showPopup) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-blueSoft/30 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[min(100%,320px)] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={popupImage}
          alt="The EDIT Summer Skin Series — a two part summer facial"
          className="h-auto w-full rounded-xl"
          priority
        />

        <button
          onClick={handleClose}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-cream/95 text-brownDeep shadow-md transition-colors hover:bg-cream"
          aria-label="Close popup"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="absolute bottom-[19%] left-1/2 w-[72%] -translate-x-1/2">
          <button
            onClick={handleBookNow}
            className="w-full rounded-full bg-[#8b9440] px-6 py-2.5 font-accent text-sm font-medium uppercase tracking-wide text-white shadow-md transition-colors duration-200 hover:bg-olive"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  )
}
