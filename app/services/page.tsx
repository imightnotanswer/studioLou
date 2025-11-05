import { Button } from '@/components/Button'
import { ServiceCard } from '@/components/ServiceCard'

export const metadata = {
  title: 'Services | Greenpoint Facialist',
  description: 'Explore our facial treatments: The Edit and Heaven + Earth.',
}

export default function ServicesPage() {
  const services = [
    {
      title: 'The Edit',
      duration: '60 or 90 minutes',
      description:
        `Visible results meet deep relaxation in this comprehensive treatment designed for every complexion, every concern, every mood. Each treatment begins with an in-depth skin analysis to determine your needs and goals. Whether you're seeking deep hydration, barrier support, refined texture, a brighter and more even tone, visible firming, or care for reactive, inflamed skin conditions like acne or rosacea, the Edit delivers. Your skin will emerge hydrated, calm, radiant, and deeply restored.`,
      durationOptions: [
        {
          duration: '60 minutes',
          description: (
            <>
              <strong>60 minutes |</strong> This comprehensive hour-long facial is the foundation of ‘The Edit.’ Customized exfoliation, extractions (as needed), techniques that may include tension-relieving facial massage and manual lymphatic drainage, regenerative décolleté care, and a targeted treatment mask are included in this well-rounded facial to effectively address your goals.
            </>
          ),
          whoFor: `For anyone seeking an effective yet restorative facial experience - perfect as a seasonal reset, regular maintenance facial, or introduction to Greenpoint Facialist treatments. This facial is ideal for skin showing signs of congestion, breakouts, dullness, mild dehydration, or uneven texture and tone. It’s designed to deliver visible results and a sense of calm and renewal, whether your skin needs a fresh start or a regular dose of balance and vitality.`,
        },
        {
          duration: '90 minutes',
          description: (
            <>
              <strong>90 minutes |</strong> With 30 additional minutes, two advanced technologies are included; a <strong>lifting microcurrent treatment</strong> and <strong>LED light therapy with a peptide enhancement</strong> to encourage tone, cellular renewal, and boost long-term skin vitality. Additional upgraded skin treatments may include a clinical <strong>alginate treatment mask</strong> or an extended focus on <strong>sculpting facial massage</strong> and <strong>manual lymphatic drainage</strong>.
            </>
          ),
          whoFor: `For anyone looking for an advanced, luxe facial that delivers both visible results and a restorative experience. Ideal for skin showing early signs of laxity, dullness, or fatigue, and for anyone looking to maintain firmness through advanced, non-invasive technology combined with botanical skincare.`,
        },
      ],
      packageNote: `A package of three 60 minute facials is available. View booking page for details.`,
    },
    {
      title: 'Heaven + Earth',
      duration: '60 minutes',
      description:
        `Where renewal meets release. This facial will leave your skin and self feeling completely uplifted, yet it's uniquely grounding. This facial harnesses luscious, plant-based skincare with an extended focus on facial massage, including sculptural techniques, manual lymphatic drainage, and gentle cupping, all working in harmony to de-puff, release deep tension, and lift the skin with visible vitality. Each element is designed to reset both skin and spirit: skin emerges divinely fresh, luminous, and nourished, while your whole being feels deeply restored when you come back earthside.`,
      whoFor: `Designed for those who carry tension in the face or jaw, experience puffiness, or simply for skin that feels dull, dry, and depleted. Perfect for when skin is feeling lackluster, during high-stress seasons, or whenever your skin needs a revitalizing reset and your body a full exhale.`,
      features: [
        'Skin analysis',
        'Odacite Ceremonial Matcha Cleanse',
        'Odacite Bioactive gommage peel',
        'Extended facial massage',
        'MLD + cupping',
        'LED with Sachi Skin peptide enhancement',
        'This treatment does not include extractions',
      ],
    },
  ]

  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft mb-6">
            Facial Services
          </h1>
          <div className="text-brownDeep leading-relaxed max-w-3xl">
            <p>
              Greenpoint Facialist treatments are an intentional blend of results-driven care and restorative ritual. Each service is fully tailored to meet your skin's current mood. Your facial will feature luxurious, bioactive botanical skincare that is thoughtfully paired with select clinical formulas and advanced technologies to achieve visible results. Intentional touch and massage are the heart of every treatment, while functional aromatherapy deepens the sensory experience and supports overall balance. All services can be thoughtfully tailored to accommodate pregnancy and sensitivity, so you can feel nurtured, supported, and radiant in your skin.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/booking">BOOK NOW</Button>
          </div>
        </div>

        <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <div className="mt-12 md:mt-16 pt-8">
          <Button href="/booking">BOOK NOW</Button>
        </div>
      </div>
    </div>
  )
}

