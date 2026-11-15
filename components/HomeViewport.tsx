'use client'

import Link from 'next/link'
import WaterRippleBackground from '@/components/WaterRippleBackground'
import { openSquareBooking } from '@/components/SquareBookingWidget'
import blackandwhite from '@/app/assets/blackandwhite.jpg'

export default function HomeViewport() {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="relative w-full h-full overflow-hidden">
        <WaterRippleBackground
          imageSrc={blackandwhite.src}
          focusY={0.68}
          distortionStrength={0.28}
          brushRadius={30}
          waveSpeed={1.0}
        />

        {/* Overlay: does not block pointer events so ripples work everywhere */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Link
            href="/facials"
            className="group pointer-events-auto absolute inset-x-0 top-0 flex items-center justify-center gap-x-3 gap-y-1 flex-wrap overflow-hidden bg-olive px-4 py-3 text-center font-accent text-[12px] sm:text-sm uppercase tracking-[0.18em] text-brownDeep shadow-md"
          >
            <span className="relative font-semibold">New treatment menu available</span>
            <span aria-hidden="true" className="relative hidden sm:inline opacity-60">|</span>
            <span className="relative inline-flex items-center gap-2 border-b border-brownDeep/60 pb-0.5 transition-colors duration-200 group-hover:border-brownDeep">
              Click here to view
              <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
          <div className="absolute left-4 bottom-4 sm:left-8 sm:bottom-8">
          <h1
            className="
                font-heading uppercase leading-[0.95]
                text-[28px] sm:text-[40px] md:text-[40px]
                text-[#9ab4c1]
                drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]
                max-w-[92vw]
            "
>
  Greenpoint
  <br />
  Facialist
</h1>

            <button
              onClick={openSquareBooking}
              className="
                pointer-events-auto
                mt-3 sm:mt-4
                inline-flex items-center justify-center
                rounded-full
                px-5 py-3 sm:px-6 sm:py-3
                text-[13px] sm:text-[14px]
                uppercase tracking-wide
                bg-[#9ab4c1] text-black
                hover:bg-[#a1aa2e] transition-colors
              "
            >
              Book a facial
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}







