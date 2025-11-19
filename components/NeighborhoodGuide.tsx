'use client'

import { useMemo, useState, useRef } from 'react'

import type { NeighborhoodSpot } from './NeighborhoodMap'
import { NeighborhoodMap } from './NeighborhoodMap'

interface NeighborhoodGuideProps {
    spots: NeighborhoodSpot[]
}

export default function NeighborhoodGuide({ spots }: NeighborhoodGuideProps) {
    const [hoveredSpot, setHoveredSpot] = useState<string | null>(null)
    const [selectedSpot, setSelectedSpot] = useState<string | null>(null)
    const explicitlySelectedRef = useRef<string | null>(null)

    const groupedSpots = useMemo(() => {
        const midpoint = Math.ceil(spots.length / 2)
        return [spots.slice(0, midpoint), spots.slice(midpoint)]
    }, [spots])

    const handleHoverChange = (spotName: string | null) => {
        setHoveredSpot(spotName)
    }

    const handleSpotSelect = (spotName: string | null) => {
        setSelectedSpot(spotName)
        explicitlySelectedRef.current = spotName
        if (!spotName) {
            setHoveredSpot(null)
            explicitlySelectedRef.current = null
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-start md:gap-14">
            <div className="text-brownDeep/90 text-sm md:text-base leading-relaxed grid grid-cols-2 gap-x-6 gap-y-2 text-center md:text-left max-w-xl md:max-w-none md:gap-x-10 mx-auto md:mx-0 justify-items-center md:justify-items-start">
                {groupedSpots.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-col gap-y-2 min-w-[7.5rem] md:min-w-[8.5rem]">
                        {column.map((spot) => {
                            const isActive = hoveredSpot === spot.name || selectedSpot === spot.name
                            return (
                                <span
                                    key={spot.name}
                                    onMouseEnter={() => {
                                        if (window.innerWidth >= 768) {
                                            setHoveredSpot(spot.name)
                                            setSelectedSpot(spot.name)
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (window.innerWidth >= 768) {
                                            // Only clear if this spot wasn't explicitly selected via click
                                            if (explicitlySelectedRef.current !== spot.name) {
                                                setHoveredSpot(null)
                                                setSelectedSpot(null)
                                            }
                                        }
                                    }}
                                    className={`block transition-all duration-200 cursor-pointer ${isActive ? 'font-semibold text-olive' : 'font-normal text-brownDeep/80'
                                        }`}
                                >
                                    {spot.name}
                                </span>
                            )
                        })}
                    </div>
                ))}
            </div>
            <div className="mt-6 w-full md:mt-0 md:self-start md:flex-shrink-0 md:w-[360px] lg:w-[400px] md:ml-10 lg:ml-14">
                <NeighborhoodMap
                    spots={spots}
                    activeSpotName={hoveredSpot ?? undefined}
                    selectedSpotName={selectedSpot}
                    onSpotHoverChange={handleHoverChange}
                    onSpotSelect={(spotName) => {
                        handleSpotSelect(spotName)
                    }}
                />
            </div>
        </div>
    )
}

