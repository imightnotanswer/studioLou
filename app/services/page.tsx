import { Button } from '@/components/Button'
import { ServiceCard } from '@/components/ServiceCard'

export const metadata = {
  title: 'Services | Greenpoint Facialist',
  description: 'Explore our facial treatments: The Edit, Heaven + Earth, The Refreshed, The Lifted, and The Resilient.',
}

export default function ServicesPage() {
  const services = [
    {
      title: 'The Edit',
      duration: '90 minutes',
      description:
        `Visible results meet deep relaxation in this comprehensive 90 minute treatment. Luscious plant-based botanicals and elevated, sensorial touches meet clinical technology. Whether it's deep hydration, clarifying support, texture refinement, brightening, barrier repair, an age-supporting boost, or simply a deeply restorative experience, the 'Edit' delivers. Your skin will emerge fresh, toned, radiant, and deeply restored.`,
      whoFor: `For those looking for visible results and deep relaxation. The Edit is designed to be fully customizable for every complexion, every concern, every mood. It's especially well-suited for anyone looking for an advanced, luxe facial. Your treatment will be completely customized to address your specific skincare concerns and goals. For skin that looks as good as this treatment feels, this is your go-to.`,
      features: [
        'Skin analysis',
        'Customized Linné or Odacité exfoliation',
        'Extractions',
        'Extended sculpting facial massage',
        'Targeted treatment mask',
        'Regenerative decolette + hand care',
        'Microcurrent',
        'LED with Sachi Skin peptide enhancement',
      ],
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
    {
      title: 'The Refreshed',
      duration: '60 minutes',
      description:
        `Your skin, refreshed. This comprehensive-yet-grounding treatment restores clarity, balance, and vitality to your skin. Tailored to meet your skin's current mood - whether in need of decongesting, smoothed texture, alleviation from dryness, calming breakouts, or brightening dull, uneven skin tone. Tension-relieving facial massage is a focus, incorporating manual lymphatic drainage when needed to clear stagnation and support both skin health and inner calm. Skin is left feeling renewed, hydrated, and radiant. Available with a LED upgrade chosen for your skin at the time of your service. Blue LED kills c. acnes, the acne-causing bacteria, while reducing active breakouts & helping to prevent the formation of new breakouts. Red LED encourages new collagen production, stimulates circulation & calms inflammation.`,
      whoFor: `For anyone seeking an effective yet restorative facial experience - perfect as a seasonal reset, regular maintenance facial, or introduction to Greenpoint Facialist treatments. This facial is ideal for skin showing signs of congestion, dullness, mild dehydration, or uneven texture and tone. It's designed to deliver visible results and a sense of calm and renewal, whether your skin needs a fresh start or a regular dose of balance and vitality.`,
      features: [
        'Skin analysis',
        'Customized exfoliation',
        'Extractions',
        'Facial massage',
        'Targeted treatment mask',
        'Optional add on: LED with Sachi Skin peptide enhancement',
      ],
    },
    {
      title: 'The Lifted',
      duration: '60 minutes',
      description:
        `This advanced treatment combines microcurrent and LED light therapy to refine, firm, and awaken your skin. Microcurrent technology gently reeducates facial muscles to enhance tone and definition, while LED light supports collagen production, cellular renewal, and overall radiance. Together, they promote visible lift and long-term skin vitality for skin that appears brighter, smoother, and more sculpted.`,
      whoFor: `For those seeking a treatment that delivers both visible results and a restorative experience. Ideal for skin showing early signs of laxity, dullness, or fatigue, and for anyone looking to maintain firmness through advanced, non-invasive technology combined with botanical skincare.`,
      features: [
        'Skin analysis',
        'Customized Linné or Odacité exfoliation',
        'Microcurrent',
        'LED with Sachi Skin peptide enhancement',
        'This treatment does not include extractions',
      ],
    },
    {
      title: 'The Resilient',
      duration: '75 minutes',
      description:
        `A transformative facial to replenish even the most fragile of skin. This restorative treatment carefully addresses irritation and imbalance, focusing on skin barrier repair and clearing stagnation with manual lymphatic drainage. The result is skin that feels calm and comforted, clearer, and more resilient - nourished from the inside out.`,
      whoFor: `Designed specifically for anyone struggling with persistent reactive, inflammatory skin conditions including acne, dermatitis, or rosacea. This treatment is designed to reduce redness, neutralize breakouts, calm inflammation, speed up healing, and support skin barrier health, while restoring balance and skin resilience. For optimal results, see 'The Resilient Series' for a package of 3 treatments.`,
      features: [
        'Skin analysis',
        'Exfoliation tailored for acne, psoriasis or dermatitis conditions',
        'Extractions as needed',
        'Manual lymphatic drainage',
        'Targeted treatment mask',
        'LED light therapy',
        'Cooling ice globe massage',
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
          <div className="space-y-4 text-brownDeep leading-relaxed max-w-3xl">
            <p>
              Every Greenpoint Facialist treatment is an intentional blend of results-driven care and restorative ritual. Each service begins with a double cleanse using luxurious plant oils, followed by bioactive botanical skincare that is thoughtfully paired with select clinical formulas and advanced technologies to achieve visible results. Intentional touch and massage are the heart of every treatment, while functional aromatherapy deepens the sensory experience and supports overall balance. Most services can be thoughtfully tailored to accommodate pregnancy and sensitivity, so you can feel nurtured, supported, and radiant in your skin.
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

        <div className="mt-12 md:mt-16 pt-8 border-t border-brownDeep">
          <Button href="/booking">BOOK NOW</Button>
        </div>
      </div>
    </div>
  )
}

