import Link from 'next/link'
import { BookingButton } from '@/components/BookingButton'
import { HeavenEarthNotice } from '@/components/HeavenEarthNotice'
import { ServiceCard } from '@/components/ServiceCard'

export const metadata = {
  title: 'Facials | Greenpoint Facialist',
  description:
    'Explore facial treatments at Greenpoint Facialist: The Edit, Restore Nano Infusion, Heaven + Earth, The Foundation, and The Essentials.',
}

const linkClass = 'text-olive underline underline-offset-2 hover:text-brownDeep transition-colors duration-200'

export default function FacialsPage() {
  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter mb-6">
            Facials
          </h1>
          <div className="text-brownDeep leading-relaxed max-w-3xl">
            <p>
              Every facial is an intentional blend of results-driven care and restorative ritual tailored to
              meet your skin&apos;s current mood. Your facial will feature bioactive botanical skincare that is
              thoughtfully paired with select clinical formulas and advanced modalities to achieve visible
              results. Intentional touch and massage are the heart of every treatment. Services can be tailored
              to accommodate every skin type, sensitivities, and pregnancy.
            </p>
          </div>
          <div className="mt-8">
            <BookingButton>BOOK NOW</BookingButton>
          </div>
        </div>

        <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-stretch">
          <ServiceCard
            id="the-edit"
            title="The Edit"
            duration="75 minutes"
            tagline="Your skin, with the studio’s full toolkit."
            description={
              <>
                <p>
                  This signature, fully inclusive facial brings the best of the studio together in one entirely
                  personalized experience. Your skin and goals determine your facial plan for both immediate and
                  lasting results. Your visit begins with an in-depth skin analysis, followed by a tailored
                  treatment that’s curated from every modality offered in-studio: microcurrent, LED light
                  therapy, Carboxy Therapy, oxygen infusion, lymphatic drainage, marine algae modeling masks,
                  cryotherapy, and more.
                </p>
                <p className="mt-4 text-brownDeep/80 text-sm italic">
                  The Edit excludes nanoneedling.{' '}
                  <a href="#restore-nano-infusion" className={linkClass}>
                    See the Restore Nano Infusion facial
                  </a>
                  .
                </p>
              </>
            }
            features="double cleanse | customized exfoliation | extractions if needed | high frequency | sculptural facial massage | décolleté care | hand and arm massage | a personalized combination of advanced modalities chosen for your skin"
            whoFor="Anyone who wants a fully customized, advanced, results-driven facial that is also deeply restorative. This treatment can target congestion, dullness, pigmentation, dehydration, fine lines, early laxity, and reactive skin."
          />

          <ServiceCard
            id="restore-nano-infusion"
            title="Restore Nano Infusion"
            duration="75 minutes"
            tagline="An advanced nanoneedling treatment to accelerate skin renewal."
            subnote={
              <>
                *Also available in packages of three treatments.{' '}
                <a href="#restore-packages" className={linkClass}>
                  Learn more below
                </a>
                .
              </>
            }
            description={
              <>
                <p>
                  Clinical results meet holistic skincare with this non-invasive, professional treatment.
                  Nanoneedling uses a surgical steel head with a .15 mm silicon nano tip to gently open
                  thousands of microchannels in the skin, allowing for deeper delivery of hyaluronic acid,
                  collagen, peptides, ceramides, and botanicals. These ingredients work to support firmer skin,
                  refine texture, brighten your complexion, and improve skin hydration.
                </p>
                <p id="restore-packages" className="mt-4 scroll-mt-28">
                  Skin improves with each session, so a series of three treatments spaced 2-4 weeks apart is
                  recommended for longer lasting improvements in skin firmness, hydration, and texture.{' '}
                  <Link href="/packages#restore-nano-infusion-series" className={linkClass}>
                    See packages
                  </Link>{' '}
                  for more information.
                </p>
              </>
            }
            features="double cleanse | customized exfoliation | extractions if needed | LED light therapy | hand and arm massage | nanoneedling | reparative OMAD biocellulose mask treatment | oxygen infusion"
            whoFor="Ideal for clients seeking surface refinement, improved firmness, a brighter complexion, and improvement in mild texture concerns. This treatment delivers visible results with little to no recovery time."
          />

          <ServiceCard
            id="heaven-earth"
            title="Heaven + Earth"
            duration="60 minutes"
            featured
            tagline="A buccal massage treatment with sculptural massage to relieve facial tension and reveal facial contours."
            notice={<HeavenEarthNotice />}
            description="This treatment harnesses the sculpting and restorative power of facial massage, combining buccal (intraoral) massage and Dr. Vodder manual lymphatic drainage to release tension, reduce puffiness in the face and neck, and leave you with a more sculpted, lifted appearance. Buccal massage works gently through the muscles of the mouth and cheeks, making it a natural choice for those who clench, grind or hold tension in the jaw, including people living with TMJ discomfort. Lymphatic drainage works in harmony to encourage the movement of stagnant fluid, softening puffiness and improving the look of your facial contours and skin health. Skin emerges divinely fresh, luminous and nourished, and your whole being feels deeply restored when you come back earthside."
            features="double cleanse | customized exfoliation | intraoral buccal massage | manual lymphatic drainage | sculptural facial massage | express LED light therapy session | cryotherapy with OMAD balm | oxygen infusion"
            whoFor="For those experiencing jaw tension, clenching or grinding, facial puffiness, a desire for more defined contours, and dull skin in need of a refresh."
          />

          <ServiceCard
            id="the-foundation"
            title="The Foundation"
            duration="60 minutes"
            tagline="Healthy, radiant skin starts here."
            description="Everything your skin needs, and nothing it doesn’t. This facial pairs targeted, barrier supportive ingredients with soothing cryotherapy and a gentle touch to calm irritation, support a stressed barrier, and bring your skin back into balance. Gentle exfoliation is selected for skin as tolerated, followed by a tailored hydrating, soothing mask treatment. For skin that’s especially inflamed or irritated, a chlorophyll + urea treatment activated by LED is applied instead. Whether you’re managing breakouts, congestion, redness, or sensitivity, every step is chosen to quiet your skin rather than challenge it. Skin emerges more calm, clear, and comfortable, and with a more resilient barrier."
            features="double cleanse | customized exfoliation as skin tolerates | extractions if needed | facial massage as skin tolerates | customized masking treatment or chlorophyll & urea antiinflammatory treatment paired with LED | cryotherapy"
            whoFor="A calming, barrier-supportive facial for clients with acne, inflammation, redness, or a weakened skin barrier, and anyone whose skin feels reactive or sensitized. It’s also a great fit for congested, oily, reactive or breakout-prone skin, and a good starting point if you’re unsure what your skin needs."
          />

          <ServiceCard
            id="the-essentials"
            title="The Essentials"
            duration="45 minutes"
            tagline="Skin, edited to the essentials."
            description="When you want your skin to feel refreshed and radiant, and you only have 45 minutes. A considered, efficient treatment that brings back clarity, hydration, and radiance."
            features="Double cleanse, gentle customized exfoliation, light extractions as needed, and an express LED session with a hydrating booster."
            whoFor="Clients looking to maintain results between full treatments, in a busy season of life, a pre-travel or event refresh, or are in need of a straightforward reset."
          />
        </div>

        <div className="mt-12 md:mt-16 pt-8 flex">
          <BookingButton>BOOK NOW</BookingButton>
        </div>
      </div>
    </div>
  )
}
