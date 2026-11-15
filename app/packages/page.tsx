import { Button } from '@/components/Button'
import { ServiceCard } from '@/components/ServiceCard'
import { FOUNDATION_SERIES_PURCHASE_URL, RESTORE_SERIES_PURCHASE_URL } from '@/lib/siteLinks'

export const metadata = {
  title: 'Packages | Greenpoint Facialist',
  description:
    'Facial packages at Greenpoint Facialist: the Restore Nano Infusion Series and The Foundation Facial Series.',
}

export default function PackagesPage() {
  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter">
            Packages
          </h1>
        </div>

        <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-stretch">
          <ServiceCard
            id="restore-nano-infusion-series"
            title="Restore Nano Infusion Series"
            duration="$800"
            tagline="A series of three advanced nanoneedling treatments to accelerate skin renewal."
            description={
              <>
                <p>
                  Clinical results meet holistic skincare with this non-invasive, professional treatment.
                  Nanoneedling uses a surgical steel head with a .15 mm silicon nano tip to gently open
                  thousands of microchannels in the skin, allowing for deeper delivery of hyaluronic acid,
                  collagen, peptides, ceramides, and botanicals. These ingredients work to support firmer skin,
                  refine texture, brighten your complexion, and improve skin hydration.
                </p>
                <p className="mt-4">
                  <em>A note from your facialist:</em> Skin improves with each session. This series of three
                  treatments is recommended to be scheduled 2-4 weeks apart for longer lasting improvements in
                  skin firmness, hydration, and texture.
                </p>
              </>
            }
            features="double cleanse | customized exfoliation | extractions if needed | LED light therapy | hand and arm massage | nanoneedling | reparative OMAD biocellulose mask treatment | oxygen infusion"
            whoFor="Ideal for clients seeking surface refinement, improved firmness, a brighter complexion, and improvement in mild texture concerns. This treatment delivers visible results with little to no recovery time."
            packageNote="Packages must be redeemed within nine months. Additional promotions or sales do not apply to purchases of packages. Non refundable and non-transferable. An $855 value."
            action={<Button href={RESTORE_SERIES_PURCHASE_URL}>PURCHASE HERE</Button>}
          />

          <ServiceCard
            id="foundation-facial-series"
            title="The Foundation Facial Series"
            duration="$630"
            tagline="A series of three Foundation Facials."
            description="Everything your skin needs, and nothing it doesn’t. This facial pairs targeted, barrier supportive ingredients with soothing cryotherapy and a gentle touch to calm irritation, support a stressed barrier, and bring your skin back into balance. Gentle exfoliation is selected for skin as tolerated, followed by a tailored hydrating, soothing mask treatment. For skin that’s especially inflamed or irritated, a chlorophyll + urea treatment activated by LED is applied instead. Whether you’re managing breakouts, congestion, redness, or sensitivity, every step is chosen to quiet your skin rather than challenge it. Skin emerges more calm, clear, and comfortable, and with a more resilient barrier."
            features="double cleanse | customized exfoliation as skin tolerates | extractions if needed | facial massage as skin tolerates | customized masking treatment or chlorophyll & urea antiinflammatory treatment paired with LED | cryotherapy"
            whoFor="A calming, barrier-supportive facial for clients with acne, inflammation, redness, or a weakened skin barrier, and anyone whose skin feels reactive or sensitized. It’s also a great fit for congested, oily, reactive or breakout-prone skin, and a good starting point if you’re unsure what your skin needs."
            packageNote="Packages must be redeemed within nine months. Additional promotions or sales do not apply to purchases of packages. Non refundable and non-transferable. A $660 value."
            action={<Button href={FOUNDATION_SERIES_PURCHASE_URL}>PURCHASE HERE</Button>}
          />
        </div>
      </div>
    </div>
  )
}
