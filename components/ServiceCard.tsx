'use client'

import React, { useState } from 'react'

interface DurationOption {
  duration: string
  description: string | React.ReactNode
  whoFor: string
}

interface ServiceCardProps {
  id?: string
  title: string
  duration: string
  tagline?: string
  subnote?: React.ReactNode
  description: string | React.ReactNode
  whoFor?: string | string[]
  features?: string
  highlights?: string | React.ReactNode
  durationOptions?: DurationOption[]
  packageNote?: string | React.ReactNode
  notice?: React.ReactNode
  featured?: boolean
}

function WhoForDropdown({ whoFor, id }: { whoFor: string; id: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-base md:text-lg font-semibold text-brownDeep mb-3 hover:text-olive transition-all duration-300 w-full text-left group"
        aria-expanded={isOpen}
        aria-controls={id}
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
        id={id}
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0 overflow-hidden'
        }`}
      >
        <p className="text-brownDeep/80 text-sm leading-relaxed">{whoFor}</p>
      </div>
    </div>
  )
}

export function ServiceCard({
  id,
  title,
  duration,
  tagline,
  subnote,
  description,
  whoFor,
  features,
  highlights,
  durationOptions,
  packageNote,
  notice,
  featured = false,
}: ServiceCardProps) {
  return (
    <div
      id={id}
      className={`rounded-lg p-6 md:p-8 space-y-4 hover:shadow-lg transition-shadow duration-200 shadow-sm w-full max-w-full md:max-w-none border-t border-r border-b ${
        featured
          ? 'bg-blueSoft/15 border-l-4 border-olive'
          : 'bg-cream border-l-4 border-orangeBurnt'
      }`}
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <h3 className="font-heading text-xl md:text-2xl text-brownDeep font-bold">{title}</h3>
        <span className="text-orangeBurnt font-accent text-sm md:text-base font-medium text-right whitespace-nowrap">
          {duration}
        </span>
      </div>
      {tagline && <p className="text-brownDeep/80 italic leading-relaxed">{tagline}</p>}
      {subnote && <p className="text-brownDeep/80 text-sm leading-relaxed -mt-2">{subnote}</p>}
      {notice && (
        <div className="notice-sheen relative overflow-hidden rounded-lg border-l-4 border-navy bg-blueSoft px-5 py-4 pl-12 text-left text-sm md:text-base leading-relaxed text-navy font-medium shadow-md">
          <span aria-hidden="true" className="notice-beacon absolute left-5 top-[1.35rem]" />
          <div className="relative">{notice}</div>
        </div>
      )}
      <div className="text-brownDeep leading-relaxed text-base">
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
      <div className="pt-4 border-t border-brownDeep space-y-6">
        {durationOptions ? (
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
          </div>
        ) : (
          whoFor && (
            <WhoForDropdown
              whoFor={Array.isArray(whoFor) ? whoFor.join(' ') : whoFor}
              id={title}
            />
          )
        )}
        {features && (
          <div>
            <p className="text-base md:text-lg font-semibold text-brownDeep mb-2">Features</p>
            <p className="text-brownDeep/80 text-sm leading-relaxed">{features}</p>
          </div>
        )}
        {highlights && (
          <div>
            {typeof highlights === 'string' ? (
              <p className="text-brownDeep/80 text-sm leading-relaxed">
                {(() => {
                  const [labelPart, ...rest] = highlights.split('|')
                  if (labelPart && rest.length > 0) {
                    return (
                      <>
                        <strong className="text-brownDeep">{labelPart.trim()} |</strong>{' '}
                        {rest.join('|').trim()}
                      </>
                    )
                  }
                  return highlights.trim()
                })()}
              </p>
            ) : (
              highlights
            )}
          </div>
        )}
        {packageNote && (
          <div className="text-brownDeep/80 text-sm leading-relaxed italic">
            {typeof packageNote === 'string' ? <p>{packageNote}</p> : packageNote}
          </div>
        )}
      </div>
    </div>
  )
}
