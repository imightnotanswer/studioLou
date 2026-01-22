import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import studioImg from '@/app/assets/studio.jpg'

const NeighborhoodMap = dynamic(
  () => import('@/components/NeighborhoodMap').then((mod) => mod.NeighborhoodMap),
  { ssr: false }
)

const heldspaceSpot = [
  {
    name: 'Held Space',
    address: '960 Manhattan Ave 4th Fl, Brooklyn, NY 11222',
    lat: 40.732062,
    lng: -73.9542784,
    url: 'https://share.google/8vCyjbnOiNXOzlrXu',
  },
]

export default function ContactPage() {
  return (
    <div className="bg-cream py-12 md:py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Title */}
        <div className="mb-12 text-center md:text-left">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-blueSoft tracking-tighter">
            Contact
          </h1>
        </div>

        {/* Balanced 3-column layout */}
        <div className="grid items-center gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Left: Studio image */}
          <div className="flex justify-center">
            <div className="w-full max-w-[360px]">
              <div className="rounded-full border border-brownDeep/40 p-[4px]">
                <div className="relative h-[480px] rounded-full overflow-hidden bg-cream p-2">
                  <Image
                    src={studioImg}
                    alt="Greenpoint Facialist studio"
                    fill
                    className="object-cover"
                    sizes="360px"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Middle: Text */}
          <div className="flex justify-center">
            <div className="w-full max-w-[360px] text-center md:text-left space-y-14">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brownDeep mb-4">
                  Location
                </h2>
                <div className="text-brownDeep leading-relaxed space-y-2">
                  <p>960 Manhattan Ave, 4th Floor</p>
                  <p>Brooklyn, New York 11222</p>
                  <p className="text-brownDeep/75 text-sm mt-4">
                    Located within Held Space
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-brownDeep mb-4">
                  Get in touch
                </h2>
                <div className="text-brownDeep leading-relaxed space-y-3">
                  <p>
                    <a
                      href="mailto:hello@greenpointfacialist.com"
                      className="hover:text-olive transition-colors"
                    >
                      hello@greenpointfacialist.com
                    </a>
                  </p>
                  <p>
                    <Link
                      href="https://instagram.com/greenpointfacialist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-olive transition-colors"
                    >
                      @greenpointfacialist
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="flex justify-center lg:mt-16 xl:mt-20">
            <div className="w-full max-w-[360px]">
              <div className="relative h-[480px] rounded-[2rem] overflow-hidden">
                <NeighborhoodMap spots={heldspaceSpot} enableMarkerLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
















