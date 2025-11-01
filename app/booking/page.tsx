import { Button } from '@/components/Button'

export const metadata = {
  title: 'Book a Facial | Greenpoint Facialist',
  description: 'Schedule your facial treatment at Greenpoint Facialist in Greenpoint, Brooklyn.',
}

export default function BookingPage() {
  return (
    <div className="bg-cream h-full w-full flex items-center justify-center overflow-hidden py-0 md:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-1 md:space-y-8">
          <h1 className="font-heading text-xl md:text-4xl lg:text-5xl font-bold text-blueSoft mb-0 md:mb-6 leading-tight md:leading-normal">
            Book a Facial
          </h1>
          <p className="text-brownDeep text-sm md:text-xl leading-relaxed max-w-2xl mx-auto">
            Schedule your treatment below.
          </p>

          <div className="pt-1 md:pt-8">
            <div className="bg-cream rounded-lg p-2 md:p-8 lg:p-12">
              <p className="text-brownDeep mb-2 md:mb-6 text-xs md:text-base">
                Please use the booking link below to schedule your appointment.
              </p>
              <Button href="https://squareup.com/appointments/book" className="text-xs md:text-base py-2 px-4 md:py-3 md:px-6">
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

