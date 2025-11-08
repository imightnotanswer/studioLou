import NeighborhoodGuide from '@/components/NeighborhoodGuide'

export const metadata = {
  title: 'About | Greenpoint Facialist',
  description: 'Learn about Greenpoint Facialist and Ashley Guttuso, New York State Licensed Aesthetician.',
}

const neighborhoodSpots = [
  {
    name: 'Paloma',
    address: '772 Manhattan Ave, Brooklyn, NY 11222',
    lat: 40.727244,
    lng: -73.95265,
  },
  {
    name: 'Held Space',
    address: '960 Manhattan Ave 4th Fl, Brooklyn, NY 11222',
    lat: 40.732062,
    lng: -73.9542784,
  },
  {
    name: 'Acre',
    address: '64 Meserole Ave, Brooklyn, NY 11222',
    lat: 40.726241,
    lng: -73.9546665,
  },
  {
    name: 'Transmitter Park',
    address: 'Transmitter Park, Brooklyn, NY 11222',
    lat: 40.7300774,
    lng: -73.9604149,
  },
  {
    name: 'Cecily',
    address: '80 Franklin St, Brooklyn, NY 11222',
    lat: 40.7273016,
    lng: -73.9570039,
  },
  {
    name: 'Oh Mercy',
    address: '128 Franklin St, Brooklyn, NY 11222',
    lat: 40.7292924,
    lng: -73.95735,
  },
  {
    name: 'P&P',
    address: '746 Manhattan Ave, Brooklyn, NY 11222',
    lat: 40.7265699,
    lng: -73.9522451,
    url: 'https://maps.app.goo.gl/Cnxg4eTPgraSBphCA',
  },
  {
    name: 'Caffè Panna',
    address: '16 Norman Ave, Brooklyn, NY 11222',
    lat: 40.7242739,
    lng: -73.9548547,
  },
  {
    name: 'Mirth Vintage',
    address: '606 Manhattan Ave, Brooklyn, NY 11222',
    lat: 40.7233457,
    lng: -73.9503257,
  },
  {
    name: 'Achilles\' Heel',
    address: '180 West St, Brooklyn, NY 11222',
    lat: 40.7331765,
    lng: -73.9596929,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <section className="space-y-10 md:space-y-12">
          <header className="space-y-4 md:space-y-6">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter">
              Treatments tailored to your skin’s every mood
            </h1>
            <p className="text-brownDeep leading-relaxed max-w-3xl mx-auto md:mx-0">
              Greenpoint Facialist was born from a love of skincare and connection. This is the place for completely customized facials, with every facial treatment centering around skin health and visible results. When your skin is supported and understood, radiance, clarity, and calmness follow. Treatments feature nutrient-rich, botanical skincare that is thoughtfully paired with select clinical formulas and technology for your best skin yet. Every facial can be tailored for pregnancy or sensitivities.
            </p>
          </header>

          <section className="border-t border-brownDeep pt-10 md:pt-12 space-y-6 text-center md:text-left">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brownDeep">
                The Aesthetician
              </h2>
              <p className="text-brownDeep/80 text-sm md:text-base font-medium mt-2">
                Ashley Guttuso, New York State licensed aesthetician
              </p>
            </div>
            <p className="text-brownDeep leading-relaxed max-w-3xl">
              My work is guided by an appreciation for both precision and presence - where technique meets touch, and results unfold through care. My experience spans from the rhythm of fast-paced Upper West Side and West Village spas to the intimacy of a boutique facial studio. I’m a firm believer in trusting our skin’s natural intelligence, and pairing the very best botanical skincare with thoroughly vetted clinical care for advanced results. With a focus on intentional, restorative touch, my hands are my most essential tool - a means to communicate calm, lift tension, and invite the nervous system into balance.
            </p>
          </section>

          <section className="space-y-6 pt-10 border-t border-brownDeep">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brownDeep text-center md:text-left">
              A Greenpoint Facialist guide to the neighborhood
            </h2>
            <p className="text-brownDeep/80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
              Some of my favorite places as a Greenpoint local – perfect for setting the mood before or after your facial.
            </p>
            <NeighborhoodGuide spots={neighborhoodSpots} />
          </section>
        </section>
      </div>
    </div>
  )
}

