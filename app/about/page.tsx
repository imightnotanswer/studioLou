export const metadata = {
  title: 'About | Greenpoint Facialist',
  description: 'Learn about Greenpoint Facialist and Ashley Guttuso, New York State Licensed Aesthetician.',
}

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft mb-8">
            Treatments tailored to your skin&apos;s every mood
          </h1>
        </div>

        <div className="space-y-8 md:space-y-10 mb-12 md:mb-16">
          <div className="space-y-6 text-brownDeep leading-relaxed max-w-3xl mx-auto md:mx-0">
            <p>
              Greenpoint Facialist was born from a love of skincare and connection. Every facial treatment centers around skin health - when your skin is supported and understood, radiance, clarity, and calmness follow. Greenpoint Facialist prioritizes natural, bioactive plant based skincare, paired with select clinical formulas and technology for your best skin.
            </p>
          </div>
        </div>

        <div className="border-t border-brownDeep pt-12 md:pt-16">
          <div className="space-y-6 mb-8 text-center md:text-left">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brownDeep mb-2">
              The Aesthetician
            </h2>
            <div className="space-y-2 mb-6">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-brownDeep">
                Ashley Guttuso
              </h3>
              <p className="text-brownDeep/80 text-sm md:text-base font-medium">
                New York State licensed aesthetician
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
            <div className="md:w-1/3">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {/* Placeholder for Ashley's portrait image */}
                <div className="absolute inset-0 flex items-center justify-center text-brownDeep/30">
                  <svg
                    className="w-24 h-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="md:w-2/3 space-y-4 text-brownDeep leading-relaxed text-center md:text-left">
              <p>
                Ashley's work is guided by an appreciation for both precision and presence - where technique meets touch, and results unfold through care as much as craft. Her experience spans from the rhythm of a fast-paced Manhattan spa to the intimacy of a boutique facial studio, shaping a philosophy that honors the skin's natural intelligence. With a focus on intentional, restorative touch, Ashley views the hands as her most essential tools - a means to communicate calm, lift tension, and invite the nervous system into balance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

