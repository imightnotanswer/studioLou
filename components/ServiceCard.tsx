'use client'

import React, { useState } from 'react'

interface DurationOption {
  duration: string
  description: string | React.ReactNode
  whoFor: string
}

interface ServiceCardProps {
  title: string
  duration: string
  description: string | React.ReactNode
  whoFor?: string | string[]
  features?: string[]
  durationOptions?: DurationOption[]
  packageNote?: string
}

function WhoForDropdown({ whoFor, id }: { whoFor: string; id: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-base md:text-lg font-semibold text-brownDeep mb-3 hover:text-olive transition-all duration-300 w-full text-left group"
        aria-expanded={isOpen}
      >
        <span 
          className={`text-xl md:text-2xl font-light transition-all duration-300 ease-in-out inline-block ${
            isOpen ? 'rotate-90 text-olive' : 'rotate-0 group-hover:scale-110'
          }`}
        >
          +
        </span>
        <span className="flex-1">Who this is for</span>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-[500px] opacity-100 mb-4' 
            : 'max-h-0 opacity-0 mb-0 overflow-hidden'
        }`}
      >
        <p className="text-brownDeep/80 text-sm leading-relaxed transform transition-all duration-500 ease-in-out">
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
    </div>
  )
}

export function ServiceCard({
  title,
  duration,
  description,
  whoFor,
  features,
  durationOptions,
  packageNote,
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
      <div className="text-brownDeep leading-relaxed text-base">
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
      <div className="pt-4 border-t border-brownDeep space-y-6">
        {durationOptions ? (
          // Multiple duration options (like The Edit)
          <div className="space-y-6">
            {durationOptions.map((option, index) => (
              <div key={index} className="space-y-3">
                <div className="text-brownDeep leading-relaxed text-base">
                  {typeof option.description === 'string' ? (
                    <p>{option.description}</p>
                  ) : (
                    option.description
                  )}
                </div>
                <WhoForDropdown whoFor={option.whoFor} id={`${title}-${index}`} />
              </div>
            ))}
            {packageNote && (
              <p className="text-brownDeep/80 text-sm leading-relaxed italic">
                {packageNote}
              </p>
            )}
          </div>
        ) : (
          // Single "Who this is for" (like Heaven + Earth)
          whoFor && (
            <WhoForDropdown 
              whoFor={Array.isArray(whoFor) ? whoFor.join(' ') : whoFor} 
              id={title}
            />
          )
        )}
        {features && features.length > 0 && (
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
        )}
      </div>
    </div>
  )
}

