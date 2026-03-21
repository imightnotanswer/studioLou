import { BookingButton } from '@/components/BookingButton'
import { ServiceCard } from '@/components/ServiceCard'

export const metadata = {
  title: 'Services | Greenpoint Facialist',
  description: 'Explore our facial treatments: The Edit, Heaven + Earth, The Remedy, and The Essentials.',
}

export default function ServicesPage() {
  const services = [
    {
      title: 'The Edit',
      duration: '60 or 90 minutes',
      description:
        `Visible results meet deep relaxation in this comprehensive treatment designed for every complexion and concern. Whether you're seeking deep hydration, barrier support, refined texture, a brighter and more even tone, visible firming, or care for reactive, inflamed skin conditions like acne or rosacea, the Edit delivers. Skin emerges hydrated, calm, radiant, and deeply restored.`,
      durationOptions: [
        {
          duration: '60 minutes',
          description: (
            <>
              <strong>60 minutes |</strong> This comprehensive hour-long facial is the foundation of 'The Edit.'  A double cleanse, customized exfoliation, extractions as needed, techniques that may include tension-relieving facial massage and Dr. Vodder technique manual lymphatic drainage, a customized mask treatment, an Ionized oxygen infusion, and regenerative décolleté care are featured.
            </>
          ),
          whoFor: `This facial is ideal for skin showing signs of congestion, breakouts, dullness, dehydration, or uneven texture and tone. It's designed to deliver visible results and a sense of calm and renewal, whether your skin needs a fresh start or a regular dose of balance and vitality.`,
        },
        {
          duration: '90 minutes',
          description: (
            <>
              <strong>90 minutes |</strong> With 30 additional minutes, two advanced treatments are added and may include any of the following; a plant-based AHA peel, lifting and toning microcurrent, and an extended LED light therapy session with a peptide enhancement.
            </>
          ),
          whoFor: `Anyone looking for an advanced, luxe facial that delivers both visible results and a restorative experience. Ideal for skin showing early signs of laxity, dullness, or fatigue, and for anyone looking to tame inflammatory skin conditions like acne, dermatitis, or rosacea with a combination of advanced clinical and botanical skincare.`,
        },
      ],
    },
    {
      title: 'Heaven + Earth',
      duration: '70 minutes',
      description:
        `Where renewal meets release. This facial will leave your skin and self feeling completely uplifted, yet it's uniquely grounding. This facial harnesses powerful plant-based skincare with an extended focus on facial massage, including sculptural techniques, Dr.Vodder manual lymphatic drainage, and gentle cupping, all working in harmony to de-puff, release deep tension, and lift the skin with visible vitality. Each element is designed to reset both skin and spirit: skin emerges divinely fresh, luminous, and nourished, while your whole being feels deeply restored when you come back earthside.`,
      whoFor: `Designed for those who carry tension in the face or jaw, experience puffiness, or simply for skin that feels dull, dry, and depleted. Perfect for when skin is feeling lackluster, during high-stress seasons, or whenever your skin needs a revitalizing reset and your body a full exhale.`,
      highlights: `Treatment Highlights | Ceremonial Matcha Cleanse, Bioactive Rose Gommage Peel, extended facial massage, MLD + cupping, extended LED light therapy session with a peptide enhancement, Ionized oxygen infusion, and functional aromatherapy. This treatment does not include extractions. Option to add on a plant-based AHA peel.`,
    },
    {
      title: 'The Remedy',
      duration: '70 minutes',
      description: (
        <>
          <p>
            This treatment is a corrective reset for skin in need of visible results. Clinical results meet holistic skincare with this non-invasive, professional-grade treatment to accelerate skin renewal. Odacite's Nano-infusion Nanoneedling gently opens thousands of microchannels in the skin to deliver potent actives more deeply and effectively, fast-tracking results without the downtime. Based on your skincare goals, one of the following treatments will be selected:
          </p>
          <div className="mt-4 space-y-2">
            <p><strong>Brighten:</strong> Improves overall skin radiance, sun damage and hyperpigmentation, while boosting hydration.</p>
            <p><strong>Renew:</strong> Plumps fine lines and wrinkles and corrects uneven texture, while firming and hydrating the skin.</p>
            <p><strong>Clarify:</strong> Improves congestion, targets enlarged pores and uneven texture, while boosting skin hydration.</p>
          </div>
        </>
      ),
      whoFor: `Designed for anyone seeking a non-invasive, professional-grade treatment that delivers both corrective results and restorative care. This treatment effectively addresses pigmentation, fine lines and wrinkles, uneven texture, dryness, congestion, and breakouts while supporting overall skin health and vitality. This is your go-to pre-event treatment; fresh, glowing skin without the downtime.`,
      highlights: `Treatment Highlights | Plant-based AHA peel, facial massage, Odacite Nanoneedling infusion, extended LED light therapy session with a peptide enhancement, Ionized oxygen infusion, and functional aromatherapy.`,
    },
    {
      title: 'The Essentials',
      duration: '45 minutes',
      description:
        `This 45-minute treatment delivers a thoughtful edit of the fundamentals - from a deep cleanse to restorative touch that leaves skin fresh and renewed. Designed for maintenance between regular facial treatments, The Essentials delivers exactly what your skin needs.`,
      whoFor: `Clients looking to maintain results between treatments, who are short on time, or in need of a straightforward refresh.`,
      highlights: `Treatment Highlights | Double cleanse, gentle customized exfoliation, extractions as needed, and an express LED session with a hydrating booster. Option to add on a plant-based AHA peel.`,
    },
  ]

  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter mb-6">
            Facial Services
          </h1>
          <div className="text-brownDeep leading-relaxed max-w-3xl">
            <p>
              All facial treatments are an intentional blend of results-driven care and restorative ritual tailored to meet your skin's current mood. Your facial will feature luxurious, bioactive botanical skincare that is thoughtfully paired with select clinical formulas and advanced technologies to achieve visible results. Intentional touch and massage are the heart of every treatment, while functional aromatherapy deepens the sensory experience and supports overall balance. Services can be thoughtfully tailored to accommodate pregnancy and sensitivity.
            </p>
          </div>
          <div className="mt-8">
            <BookingButton>BOOK NOW</BookingButton>
          </div>
        </div>

        <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-12 md:mt-16 pt-8 flex">
          <BookingButton>BOOK NOW</BookingButton>
        </div>
      </div>
    </div>
  )
}

