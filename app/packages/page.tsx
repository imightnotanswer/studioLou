import { Button } from '@/components/Button'

export const metadata = {
  title: 'Packages | Greenpoint Facialist',
  description: 'Purchase facial treatment packages to establish consistency and maximize your results.',
}

const packages = [
  {
    title: 'The Edit Package',
    description: 'A package of three 60-minute "The Edit" facials to establish consistency in caring for your skin and maximize your results.',
    benefits: 'Purchase of a package includes a complementary LED light therapy upgrade with each facial.',
    link: 'https://square.link/u/edhBF7Ef',
  },
  {
    title: 'The Remedy Package',
    description: 'A package of three "Remedy" nanoneedling facials to accelerate your results and maintain optimal skin health.',
    benefits: 'Perfect for those seeking accelerated, visible results through consistent professional-grade nanoneedling treatments.',
    link: 'https://square.link/u/jDGgOLbk',
  },
]

export default function PackagesPage() {
  return (
    <div className="bg-cream min-h-screen py-12 md:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <div className="mb-12 md:mb-16">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-blueSoft tracking-tighter mb-6">
            Facial Packages
          </h1>
          <div className="text-brownDeep leading-relaxed max-w-3xl">
            <p>
              Packages are available to establish consistency in caring for your skin and to maximize your results. 
              Consistent treatments allow your skin to build upon each session, creating a foundation for long-term 
              skin health and visible improvements.
            </p>
          </div>
        </div>

        <div className="space-y-8 md:space-y-10 flex flex-col items-center md:items-stretch">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-cream border-l-4 border-orangeBurnt border-t border-r border-b border-navy rounded-lg p-6 md:p-8 space-y-4 hover:shadow-lg transition-shadow duration-200 shadow-sm w-full max-w-full md:max-w-none"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-heading text-xl md:text-2xl text-brownDeep font-bold">
                  {pkg.title}
                </h3>
              </div>
              
              <div className="text-brownDeep leading-relaxed text-base space-y-4">
                <p>{pkg.description}</p>
                {pkg.benefits && (
                  <p className="text-brownDeep/80 italic">{pkg.benefits}</p>
                )}
              </div>

              <div className="pt-4 border-t border-brownDeep/20">
                <Button
                  href={pkg.link}
                  className="w-full md:w-auto"
                >
                  Purchase Package
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 pt-8 text-center">
          <p className="text-brownDeep/70 mb-4">
            Looking for individual treatments instead?
          </p>
          <Button href="/services" className="bg-blueSoft hover:bg-olive">
            View Services
          </Button>
        </div>
      </div>
    </div>
  )
}

