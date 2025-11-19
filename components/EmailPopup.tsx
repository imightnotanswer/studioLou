'use client'

import { FormEvent, useEffect, useState } from 'react'

export function EmailPopup() {
    const [showPopup, setShowPopup] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Prevent body scrolling when popup is shown
    useEffect(() => {
        if (showPopup) {
            // Save the current scroll position
            const scrollY = window.scrollY
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
            document.body.style.overflow = 'hidden'
        } else {
            // Restore scrolling
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
            // Cleanup on unmount
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            document.body.style.overflow = ''
        }
    }, [showPopup])

    // Auto-close popup 5 seconds after submission
    useEffect(() => {
        if (submitted) {
            const timer = window.setTimeout(() => {
                setShowPopup(false)
            }, 3000)

            return () => window.clearTimeout(timer)
        }
    }, [submitted])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email')

        try {
            const response = await fetch('https://formspree.io/f/xanvoqbb', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setSubmitted(true)
            } else {
                throw new Error('Form submission failed')
            }
        } catch (error) {
            console.error('Error submitting form:', error)
            alert('There was an error submitting your email. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!showPopup) {
        return null
    }

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blueSoft/30 backdrop-blur-sm px-4">
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
                            name="email"
                            required
                            placeholder="Email address"
                            disabled={isSubmitting}
                            className="w-full rounded-full border border-brownDeep/20 bg-white px-4 py-2 text-sm md:text-base text-brownDeep placeholder-brownDeep/40 focus:outline-none focus:ring-2 focus:ring-olive/60 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full inline-flex items-center justify-center rounded-full px-5 py-2.5 bg-brownDeep text-white text-sm md:text-base font-medium hover:bg-olive transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

