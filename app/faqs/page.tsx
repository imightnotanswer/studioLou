import { Button } from '@/components/Button'

export const metadata = {
  title: 'FAQs | Greenpoint Facialist',
  description:
    'Frequently asked questions about Greenpoint Facialist services, booking, and policies.',
}

const faqs = [
  {
    question: 'How can I book an appointment?',
    answer:
      'You can conveniently book online using the BOOK A FACIAL button or email hello@greenpointfacialist.com. The studio requires a deposit of 50% of your service cost at the time of booking. Refunds are automatically issued if your appointment is canceled according to the studio’s cancellation policy.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Appointments must be cancelled at least 36 hours in advance. Cancellations within 36 hours of your appointment forfeit the deposit. The full service fee is due for no-show appointments.',
  },
  {
    question: 'How should I prepare for my appointment?',
    answer:
      'Please discontinue actives and exfoliants at least five days prior to your appointment (AHAs, BHAs, retinoids, prescription topicals, physical scrubs, vitamin C). For Botox and filler, wait at least four weeks before scheduling your facial. Because each facial focuses on massage, your hair may become oily—bringing a hat to cover hair and protect skin post-facial is a good idea.',
  },
  {
    question: 'When are facials available?',
    answer:
      'Appointments are available every Friday of the month. Don’t see the time you’re looking for in the schedule? Email hello@greenpointfacialist.com with an appointment request and we’ll do our best to accommodate you.',
  },
  {
    question: 'Where is the studio located?',
    answer:
      'Greenpoint Facialist is located within the Heldspace offices on the 4th floor at 960 Manhattan Ave, Brooklyn. When you book, you’ll receive an email with instructions and a door code to enter the building. The practice is within Flossie McCall Acupuncture—we highly recommend her services and you can view her offerings via the link provided in your confirmation email.',
  },
  {
    question: 'Do you offer pregnancy safe facials?',
    answer:
      'All facials can be adapted for pregnancy. It’s an honor to care for you during this beautiful time in life. Once your appointment is booked, you will receive an intake form where you can indicate pregnancy, but please also share at the start of your appointment.',
  },
  {
    question: 'I don’t know what my skin needs, which service should I book?',
    answer:
      'The Edit facials—both 60 and 90 minutes—are fully customizable, meaning we work within the scheduled timeframe to give your skin exactly what it needs. Elevated add-ons like LED light therapy and clinical skincare upgrades are available with the 90-minute service. For first-time clients, the 90-minute session offers an in-depth skin analysis and treatment plan. Heaven + Earth is also appropriate for most skin types, but not recommended for active acne.',
  },
  {
    question: 'Do you offer packages?',
    answer:
      'A package of three 60-minute Edit facials is available to establish consistency in caring for your skin and to maximize your results. Purchase of the package includes a complimentary LED light therapy upgrade with each facial.',
  },
]

export default function FAQsPage() {
  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft mb-4 md:mb-6">
            FAQs
          </h1>
          <p className="text-brownDeep text-base md:text-lg leading-relaxed max-w-2xl">
            Find quick answers about booking, policies, and how we personalize every treatment. Update any prompt text below with your exact studio details.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((faq) => (
            <article
              key={faq.question}
              className="bg-cream border-l-4 border-orangeBurnt border-t border-r border-b border-navy rounded-lg p-6 shadow-sm"
            >
              <h2 className="font-heading text-xl md:text-2xl font-bold text-brownDeep mb-3">
                {faq.question}
              </h2>
              <p className="text-brownDeep/90 leading-relaxed">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center md:text-left">
          <Button href="https://squareup.com/appointments/book">
            BOOK A FACIAL
          </Button>
        </div>
      </div>
    </div>
  )
}


