import Link from 'next/link'
import dynamic from 'next/dynamic'

const NeighborhoodMap = dynamic(
  () => import('@/components/NeighborhoodMap').then((mod) => mod.NeighborhoodMap),
  {
    ssr: false,
  }
)

const heldspaceSpot = [
  {
    name: 'Heldspace',
    address: '960 Manhattan Ave 4th Fl, Brooklyn, NY 11222',
    lat: 40.732062,
    lng: -73.9542784,
    url: 'https://share.google/8vCyjbnOiNXOzlrXu',
  },
]

export const metadata = {
  title: 'Contact | Greenpoint Facialist',
  description: 'Contact Greenpoint Facialist in Greenpoint, Brooklyn. Located at 960 Manhattan Ave, 4th Floor.',
}

export default function ContactPage() {
  return (
    <div className="bg-cream py-12 md:py-8 lg:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-8 md:mb-10">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter mb-4 md:mb-6">
            Contact
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-12 lg:gap-16 items-center md:items-start">
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-brownDeep mb-4">
                Location
              </h2>
              <div className="text-brownDeep leading-relaxed space-y-2">
                <p>960 Manhattan Ave, 4th Floor</p>
                <p>Brooklyn, New York 11222</p>
                <p className="text-brownDeep/80 text-sm mt-4">
                  Located within Held Space
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-xl md:text-2xl font-bold text-brownDeep mb-4">
                Get in touch
              </h2>
              <div className="text-brownDeep leading-relaxed space-y-2">
                <p>
                  <a
                    href="mailto:hello@greenpointfacialist.com"
                    className="hover:text-olive transition-colors duration-200"
                  >
                    hello@greenpointfacialist.com
                  </a>
                </p>
                <p>
                  <Link
                    href="https://instagram.com/greenpointfacialist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-olive transition-colors duration-200"
                  >
                    @greenpointfacialist
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <NeighborhoodMap spots={heldspaceSpot} enableMarkerLinks />
        </div>
      </div>
    </div>
  )
}

