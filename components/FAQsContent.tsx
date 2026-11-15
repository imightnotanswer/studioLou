'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { openSquareBooking } from '@/components/SquareBookingWidget'

interface FAQItem {
  question: string
  answer: ReactNode
}

const linkClass = 'text-brownDeep/70 hover:text-olive transition-colors duration-200'
const faqs: FAQItem[] = [
  {
    question: 'How can I book an appointment?',
    answer: (
      <p>
        You can conveniently book online{' '}
        <button
          onClick={openSquareBooking}
          className={`${linkClass} underline cursor-pointer`}
        >
          here
        </button>
        , or email{' '}
        <a href="mailto:hello@greenpointfacialist.com" className={linkClass}>
          hello@greenpointfacialist.com
        </a>
        . The studio requires a deposit of 50% of your service cost at the time of booking. Refunds are automatically
        issued if your appointment is canceled according to the studio&apos;s cancellation policy (read more below).
      </p>
    ),
  },
  {
    question: 'What is your cancellation policy?',
    answer: (
      <p>
        Appointments must be canceled at least 24 hours in advance. Cancellations within 24 hours of your appointment
        forfeit the deposit. 100% of the service cost is due for no-show appointments.
      </p>
    ),
  },
  {
    question: 'What is your rescheduling policy?',
    answer: (
      <p>
        Appointments may be rescheduled up to two times, with at least 24 hours&apos; notice. Appointments cannot be
        rescheduled within 24 hours of the start time, and changes requested inside that window will be treated as a
        cancellation with the deposit forfeited. Any additional reschedule beyond two will also be treated as a
        cancellation. Because my schedule is limited, I&apos;m unable to hold appointment times indefinitely. If an
        emergency comes up, please email{' '}
        <a href="mailto:hello@greenpointfacialist.com" className={linkClass}>
          hello@greenpointfacialist.com
        </a>{' '}
        and I will do my best to work with you.
      </p>
    ),
  },
  {
    question: 'How can I pay for my service?',
    answer: (
      <p>
        The studio accepts credit and debit card payments. Cash is accepted for the remaining balance of your service
        and retail products, but please note that limited cash is kept on hand for change.
      </p>
    ),
  },
  {
    question: 'How should I prepare for my appointment?',
    answer: (
      <p>
        Please discontinue actives and exfoliants at least 5 days prior to your appointment (AHAs, BHAs, retinoids,
        prescription topicals, physical scrubs, vitamin c). For botox and filler, please wait to schedule your facial
        at least 4 weeks after you receive either. Because each facial has a focus on massage, your hair may become
        oily, so bringing a hat to cover hair and protect skin post-facial is a good idea.
      </p>
    ),
  },
  {
    question: 'Where is the studio located?',
    answer: (
      <p>
        Greenpoint Facialist is located within the beautiful Held Space offices on the 4th floor at 960 Manhattan Ave,
        Brooklyn in the Greenpoint neighborhood. When you book, you will be sent an email with instructions and a door
        code to enter the building. I practice within Flossie McCall Acupuncture, I highly recommend her services. You
        can view her offerings{' '}
        <a
          href="https://www.flossiemccallacupuncture.com/"
          className={linkClass}
        >
          here
        </a>
        .
      </p>
    ),
  },
  {
    question: 'Do you offer pregnancy safe facials?',
    answer: (
      <p>
        THE EDIT, THE FOUNDATION and HEAVEN + EARTH can all be adapted for pregnancy. Once your appointment is booked,
        you will receive an intake form where you can indicate pregnancy, but please be sure to inform me at the start
        of your appointment.
      </p>
    ),
  },
  {
    question: 'Which facial is right for me?',
    answer: (
      <div className="space-y-4">
        <p>
          First visit to the studio? I recommend starting with THE EDIT, the studio&apos;s signature, comprehensive
          facial that offers the most versatility and access to advanced modalities. Choose THE FOUNDATION if your
          skin is currently inflamed, feeling sensitive, or experiencing breakouts.
        </p>
        <p>
          At your first appointment, I will do a full skin assessment and recommend the best plan for your skin going
          forward.
        </p>
      </div>
    ),
  },
]

export default function FAQsContent({ embedded = false }: { embedded?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash !== '#faqs') return
    document.getElementById('faqs')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div
      id="faqs"
      className={embedded ? 'pt-10 md:pt-12' : 'bg-cream min-h-screen py-12 md:py-16 lg:py-20'}
    >
      <div className={embedded ? '' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left'}>
        <div className={embedded ? 'mb-8 md:mb-10' : 'mb-12 md:mb-16'}>
          {embedded ? (
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brownDeep tracking-tighter">FAQs</h2>
          ) : (
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter mb-4 md:mb-6">
              FAQs
            </h1>
          )}
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <article
                key={faq.question}
                className="bg-cream border-l-4 border-orangeBurnt border-t border-r border-b border-navy rounded-lg p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left flex items-center justify-between gap-4 group"
                >
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-brownDeep flex-1">{faq.question}</h3>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <svg
                      className={`w-5 h-5 text-brownDeep group-hover:text-olive transition-all duration-200 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="text-brownDeep/90 leading-relaxed">{faq.answer}</div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
