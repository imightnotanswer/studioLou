'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { openSquareBooking } from '@/components/SquareBookingWidget'

interface FAQItem {
  question: string
  answer: ReactNode
}

const faqs: FAQItem[] = [
  {
    question: 'How can I book an appointment?',
    answer: (
      <p>
        You can conveniently book online{' '}
        <button
          onClick={openSquareBooking}
          className="text-brownDeep/70 hover:text-olive transition-colors duration-200 underline cursor-pointer"
        >
          here
        </button>
        , or email{' '}
        <a
          href="mailto:hello@greenpointfacialist.com"
          className="text-brownDeep/70 hover:text-olive transition-colors duration-200"
        >
          hello@greenpointfacialist.com
        </a>
        . The studio requires a deposit of 50% of your service cost at the time of booking. Refunds are automatically
        issued if your appointment is canceled according to the studio's cancellation policy (read more below).
      </p>
    ),
  },
  {
    question: 'What is your cancellation policy?',
    answer: (
      <p>
        Appointments must be canceled at least 24 hours in advance. Cancellations within 24 hours of your appointment forfeit
        the deposit. 100% of the service cost is due for no-show appointments.
      </p>
    ),
  },
  {
    question: 'How can I pay for my service?',
    answer: (
      <p>
        The studio accepts credit and debit card payments. Cash is accepted for the remaining balance of your service and retail products, but please note that limited cash is kept on hand for change.
      </p>
    ),
  },
  {
    question: 'Do you offer gift cards?',
    answer: (
      <p>
        Yes! Digital gift cards are currently available. You can purchase cards in any amount starting at $75.{' '}
        <a
          href="https://app.squareup.com/gift/MLQC4NQAETPE4/order"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brownDeep/70 hover:text-olive transition-colors duration-200 underline"
        >
          Click here to purchase a gift card
        </a>
        .
      </p>
    ),
  },
  {
    question: 'How should I prepare for my appointment?',
    answer: (
      <p>
        Please discontinue actives and exfoliants at least 5 days prior to your appointment (AHAs, BHAs, retinoids,
        prescription topicals, physical scrubs, vitamin c). For botox and filler, please wait to schedule your facial at
        least 4 weeks after you receive either. Because each facial has a focus on massage, your hair may become oily, so
        bringing a hat to cover hair and protect skin post-facial is a good idea.
      </p>
    ),
  },
  {
    question: 'When are facials available?',
    answer: (
      <p>
        Appointments are available every Friday of the month. Don't see the time you're looking for in my schedule? Please
        email{' '}
        <a
          href="mailto:hello@greenpointfacialist.com"
          className="text-brownDeep/70 hover:text-olive transition-colors duration-200"
        >
          hello@greenpointfacialist.com
        </a>{' '}
        with an appointment request and I will do my best to accommodate you!
      </p>
    ),
  },
  {
    question: 'Where is the studio located?',
    answer: (
      <p>
        Greenpoint Facialist is located within the beautiful Held Space offices on the 4th floor at 960 Manhattan Ave,
        Brooklyn in the Greenpoint neighborhood. When you book, you will be sent an email with instructions and a door code
        to enter the building. I practice within Flossie McCall Acupuncture, I highly recommend her services. You can view
        her offerings{' '}
        <a
          href="https://www.flossiemccallacupuncture.com/"
          className="text-brownDeep/70 hover:text-olive transition-colors duration-200"
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
        I'm happy to share that all facials can be adapted for pregnancy. It's an honor to care for you during this
        beautiful time in life. Once your appointment is booked, you will receive an intake form where you can indicate
        pregnancy, but please be sure to inform me at the start of your appointment.
      </p>
    ),
  },
  {
    question: "I don't know what my skin needs, which service should I book?",
    answer: (
      <p>
        <strong>The Edit</strong> facials - both 60 and 90 minutes - are fully customizable, meaning I work within the scheduled time frame
        to give your skin exactly what it needs. Elevated add ons like LED light therapy and clinical skincare upgrades are
        available with the 90 minute service. For first-time clients, I recommend a 90 minute session for an in-depth skin
        analysis and treatment plan. <strong>Heaven + Earth</strong> is also appropriate for most skin types, but not recommended for active
        acne. <strong>The Remedy</strong> facial is a holistic-meets-clinical treatment for accelerated results. I recommend first-time clients book a 60 or 90 minute Edit facial prior to a nanoneedling facial. Learn more about Greenpoint Facialist treatments{' '}
        <a
          href="https://www.greenpointfacialist.com/services"
          className="text-brownDeep/70 hover:text-olive transition-colors duration-200"
        >
          here
        </a>
        .
      </p>
    ),
  },
  {
    question: 'Do you offer packages?',
    answer: (
      <p>
        Yes! Customized packages are created for individual clients based upon goals, budget, and overall needs. Purchasing a
        package offers a small savings on each individual service. Please email{' '}
        <a
          href="mailto:hello@greenpointfacialist.com"
          className="text-brownDeep/70 hover:text-olive transition-colors duration-200"
        >
          hello@greenpointfacialist.com
        </a>{' '}
        to learn more.
      </p>
    ),
  },
]

export default function FAQsContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter mb-4 md:mb-6">
            FAQs
          </h1>
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
                  <h2 className="font-heading text-xl md:text-2xl font-bold text-brownDeep flex-1">
                    {faq.question}
                  </h2>
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <svg
                      className={`w-5 h-5 text-brownDeep group-hover:text-olive transition-all duration-200 ${isOpen ? 'rotate-45' : ''
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0'
                    }`}
                >
                  <div className="text-brownDeep/90 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}

