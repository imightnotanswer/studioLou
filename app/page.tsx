'use client'

import { FormEvent, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import WaterRippleBackground from '@/components/WaterRippleBackground'

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('gpf-popup-dismissed')

    if (hasSeenPopup) {
      return
    }

    const timer = window.setTimeout(() => {
      setShowPopup(true)
      sessionStorage.setItem('gpf-popup-dismissed', 'true')
    }, 600)

    return () => window.clearTimeout(timer)
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-blueSoft w-full h-full flex items-center justify-center relative overflow-hidden">
      <WaterRippleBackground />

      {showPopup && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-brownDeep/30 backdrop-blur-sm px-4">
          <div className="relative bg-cream border border-brownDeep/20 rounded-xl shadow-2xl max-w-sm w-full p-6 md:p-8">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-brownDeep/60 hover:text-brownDeep transition-colors"
              aria-label="Close popup"
            >
              ✕
            </button>
            <h2 className="font-heading text-xl md:text-2xl text-brownDeep mb-2">
              Want an upgrade?
            </h2>
            <p className="text-brownDeep/80 text-sm md:text-base leading-relaxed mb-4">
              Enter your email address for a chance to receive a complimentary upgrade with your next facial.
            </p>

            {submitted ? (
              <p className="text-brownDeep text-sm md:text-base">
                Thank you! We&apos;ll reach out soon.
              </p>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-full border border-brownDeep/20 bg-white px-4 py-2 text-sm md:text-base text-brownDeep placeholder-brownDeep/40 focus:outline-none focus:ring-2 focus:ring-olive/60"
                />
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-brownDeep text-white text-sm md:text-base font-medium hover:bg-olive transition-colors duration-200"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="text-center space-y-1 md:space-y-8 w-full px-4 py-1 md:py-8 relative z-10">
        <div className="inline-flex">
          <h1 className="font-heading text-lg md:text-3xl lg:text-4xl xl:text-5xl font-bold text-brownDeep hover:text-cream transition-colors duration-200 cursor-default uppercase leading-tight md:leading-normal">
            Greenpoint<br />Facialist
          </h1>
        </div>
        <div className="pt-2 md:pt-4">
          <Button href="https://squareup.com/appointments/book" className="text-cream text-xs md:text-base py-1.5 px-3 md:py-3 md:px-6">BOOK A FACIAL</Button>
        </div>
      </div>
    </div>
  )
}

