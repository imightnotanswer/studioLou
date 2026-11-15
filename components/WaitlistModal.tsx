'use client'

import { FormEvent, useEffect, useState } from 'react'
import { FORMSPREE_EMAIL_URL } from '@/lib/siteLinks'

export function openWaitlist() {
  window.dispatchEvent(new CustomEvent('openWaitlist'))
}

export function WaitlistModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setSubmitted(false)
      document.body.style.overflow = 'hidden'
    }

    window.addEventListener('openWaitlist', handleOpen)
    return () => {
      window.removeEventListener('openWaitlist', handleOpen)
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    document.body.style.overflow = 'unset'
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')

    try {
      const response = await fetch(FORMSPREE_EMAIL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          _subject: 'Heaven + Earth waitlist',
        }),
      })

      if (!response.ok) {
        throw new Error('Form submission failed')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting waitlist email:', error)
      alert('There was an error submitting your email. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-brownDeep/30 backdrop-blur-sm px-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-sm rounded-xl border border-brownDeep/20 bg-cream p-6 shadow-2xl md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 text-brownDeep/60 transition-colors hover:text-brownDeep"
          aria-label="Close waitlist signup"
        >
          ✕
        </button>
        <h2 className="mb-2 font-heading text-xl text-brownDeep md:text-2xl">Heaven + Earth waitlist</h2>
        <p className="mb-4 text-sm leading-relaxed text-brownDeep/80 md:text-base">
          Enter your email to be notified when Heaven + Earth booking opens this winter.
        </p>
        {submitted ? (
          <p className="text-sm text-brownDeep md:text-base">Thank you! I&apos;ll be in touch when booking is available.</p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              required
              placeholder="Email address"
              disabled={isSubmitting}
              className="w-full rounded-full border border-brownDeep/20 bg-white px-4 py-2 text-sm text-brownDeep placeholder-brownDeep/40 focus:outline-none focus:ring-2 focus:ring-olive/60 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-brownDeep px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-olive disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
            >
              {isSubmitting ? 'Submitting...' : 'Sign up'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
