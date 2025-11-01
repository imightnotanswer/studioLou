import { Button } from '@/components/Button'

export const metadata = {
  title: 'Book a Facial | Greenpoint Facialist',
  description: 'Schedule your facial treatment at Greenpoint Facialist in Greenpoint, Brooklyn.',
}

export default function BookingPage() {
  return (
    <div className="bg-cream h-full w-full flex items-center justify-center py-2 md:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 md:space-y-8">
          <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-blueSoft mb-2 md:mb-6">
            Book a Facial
          </h1>
          <p className="text-brownDeep text-base md:text-xl leading-relaxed max-w-2xl mx-auto">
            Schedule your treatment below.
          </p>

          <div className="pt-2 md:pt-8">
            <div className="bg-cream rounded-lg p-4 md:p-8 lg:p-12">
              <p className="text-brownDeep mb-3 md:mb-6 text-sm md:text-base">
                Please use the booking link below to schedule your appointment.
              </p>
              <Button href="https://squareup.com/appointments/book">
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

