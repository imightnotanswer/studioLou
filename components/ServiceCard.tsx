interface ServiceCardProps {
  title: string
  duration: string
  description: string
  whoFor: string
  features: string[]
}

export function ServiceCard({
  title,
  duration,
  description,
  whoFor,
  features,
}: ServiceCardProps) {
  return (
    <div className="bg-cream border-l-4 border-orangeBurnt border-t border-r border-b border-navy rounded-lg p-6 md:p-8 space-y-4 hover:shadow-lg transition-shadow duration-200 shadow-sm w-full max-w-full md:max-w-none">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-heading text-xl md:text-2xl text-brownDeep font-bold">
          {title}
        </h3>
        <span className="text-orangeBurnt font-accent text-sm md:text-base font-medium">
          {duration}
        </span>
      </div>
      <p className="text-brownDeep leading-relaxed text-base">{description}</p>
      <div className="pt-4 border-t border-brownDeep space-y-4">
        <div>
          <p className="text-base md:text-lg font-semibold text-brownDeep mb-3">
            Who this is for
          </p>
          <p className="text-brownDeep/80 text-sm leading-relaxed">
            {whoFor.includes("For optimal results") ? (
              <>
                {whoFor.split("For optimal results")[0]}
                <em className="italic">For optimal results{whoFor.split("For optimal results")[1]}</em>
              </>
            ) : (
              whoFor
            )}
          </p>
        </div>
        <div>
          <p className="text-base md:text-lg font-semibold text-brownDeep mb-3">Treatment features</p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li
                key={index}
                className="text-brownDeep/80 text-sm leading-relaxed"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

