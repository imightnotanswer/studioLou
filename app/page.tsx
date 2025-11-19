'use client'

import { Button } from '@/components/Button'
import WaterRippleBackground from '@/components/WaterRippleBackground'

export default function HomePage() {
  return (
    <div className="bg-blueSoft w-full h-full flex items-center justify-center relative overflow-hidden">
      <WaterRippleBackground />

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

