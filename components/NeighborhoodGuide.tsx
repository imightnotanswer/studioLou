'use client'

import { useState } from 'react'

import type { NeighborhoodSpot } from './NeighborhoodMap'
import { NeighborhoodMap } from './NeighborhoodMap'

interface NeighborhoodGuideProps {
    spots: NeighborhoodSpot[]
}

export default function NeighborhoodGuide({ spots }: NeighborhoodGuideProps) {
    const [hoveredSpot, setHoveredSpot] = useState<string | null>(null)
    const [selectedSpot, setSelectedSpot] = useState<string | null>(null)

    const handleHoverChange = (spotName: string | null) => {
        setHoveredSpot(spotName)
    }

    const handleSelectChange = (spotName: string | null) => {
        setSelectedSpot((current) => {
            if (!spotName) {
                return null
            }
            return current === spotName ? null : spotName
        })
    }

    return (
        <div className="flex flex-col md:flex-row md:items-start md:gap-14">
            <div className="text-brownDeep/90 text-sm md:text-base leading-relaxed grid grid-cols-2 gap-x-6 gap-y-2 text-center md:text-left max-w-xl md:max-w-none md:gap-x-10 mx-auto md:mx-0 justify-items-center md:justify-items-start">
                {spots.map((spot) => (
                    <p
                        key={spot.name}
                        onMouseEnter={() => handleHoverChange(spot.name)}
                        onMouseLeave={() => handleHoverChange(null)}
                        onFocus={() => handleHoverChange(spot.name)}
                        onBlur={() => handleHoverChange(null)}
                        onClick={() => handleSelectChange(spot.name)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                handleSelectChange(spot.name)
                            }
                            if (event.key === 'Escape') {
                                event.preventDefault()
                                handleHoverChange(null)
                                handleSelectChange(null)
                            }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={selectedSpot === spot.name}
                        className={`mb-0 cursor-pointer transition-colors duration-200 outline-none focus-visible:text-orangeBurnt focus-visible:underline ${hoveredSpot === spot.name || selectedSpot === spot.name ? 'text-orangeBurnt' : ''
                            }`}
                    >
                        {spot.name}
                    </p>
                ))}
            </div>
            <div className="mt-6 w-full md:mt-0 md:self-start md:flex-shrink-0 md:w-[360px] lg:w-[400px] md:ml-10 lg:ml-14">
                <NeighborhoodMap
                    spots={spots}
                    activeSpotName={hoveredSpot ?? undefined}
                    selectedSpotName={selectedSpot}
                    onSpotHoverChange={handleHoverChange}
                    onSpotSelect={handleSelectChange}
                />
            </div>
        </div>
    )
}

