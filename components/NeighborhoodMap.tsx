'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Map as LeafletMap, PointExpression } from 'leaflet'
import type * as LeafletNamespace from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface NeighborhoodSpot {
  name: string
  address: string
  lat: number
  lng: number
}

interface NeighborhoodMapProps {
  spots: NeighborhoodSpot[]
}

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

type LeafletModule = typeof import('leaflet')
type ReactLeafletModule = typeof import('react-leaflet')

function createMarkerIcon(L: LeafletModule) {
  return L.divIcon({
    html: `<div class="leaflet-marker-custom" aria-hidden="true"></div>`,
    className: '',
    iconSize: [38, 38],
    iconAnchor: [19, 32],
    popupAnchor: [0, -32],
  })
}

export function NeighborhoodMap({ spots }: NeighborhoodMapProps) {
  const mapRef = useRef<LeafletMap | null>(null)
  const [leafletLib, setLeafletLib] = useState<LeafletModule | null>(null)
  const [reactLeaflet, setReactLeaflet] = useState<ReactLeafletModule | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let isMounted = true

    ;(async () => {
      try {
        const [leafletModule, reactLeafletModule] = await Promise.all([
          import('leaflet'),
          import('react-leaflet'),
        ])

        if (!isMounted) {
          return
        }

        const loadedLeaflet = (leafletModule.default ?? leafletModule) as LeafletModule
        setLeafletLib(loadedLeaflet)
        setReactLeaflet(reactLeafletModule)
      } catch (error) {
        console.error('Failed to load map libraries', error)
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const averagePosition = useMemo(() => {
    if (spots.length === 0) return { lat: 40.7321, lng: -73.955 }
    const sum = spots.reduce(
      (acc, spot) => ({
        lat: acc.lat + spot.lat,
        lng: acc.lng + spot.lng,
      }),
      { lat: 0, lng: 0 }
    )
    return {
      lat: sum.lat / spots.length,
      lng: sum.lng / spots.length,
    }
  }, [spots])

  const spotsWithIcons = useMemo(() => {
    if (!leafletLib) return []

    return spots.map((spot) => ({
      ...spot,
      icon: createMarkerIcon(leafletLib),
      googleUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.address)}`,
    }))
  }, [leafletLib, spots])

  const bounds = useMemo(() => {
    if (!leafletLib || spots.length === 0) return null
    return leafletLib.latLngBounds(
      spots.map((spot) => [spot.lat, spot.lng] as LeafletNamespace.LatLngExpression)
    )
  }, [leafletLib, spots])

  const applyFit = (map: LeafletMap) => {
    if (!bounds || typeof window === 'undefined') return
    const width = window.innerWidth
    const isTablet = width < 1024 && width >= 768
    const isMobile = width < 768
    const maxZoom = isMobile ? 12 : isTablet ? 13.5 : 15
    const padding: PointExpression = isMobile ? [70, 70] : isTablet ? [56, 56] : [40, 40]
    map.fitBounds(bounds, { padding: padding as [number, number], maxZoom })
  }

  useEffect(() => {
    if (mapRef.current) {
      applyFit(mapRef.current)
    }
  }, [bounds])

  useEffect(() => {
    if (
      !mapRef.current ||
      !bounds ||
      typeof window === 'undefined' ||
      typeof ResizeObserver === 'undefined'
    ) {
      return
    }

    const handleResize = () => {
      if (!mapRef.current) return
      applyFit(mapRef.current)
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(mapRef.current.getContainer())

    return () => {
      observer.disconnect()
    }
  }, [bounds])

  if (!leafletLib || !reactLeaflet) {
    return (
      <div className="relative w-full max-w-xl aspect-square mx-auto rounded-3xl border border-brownDeep/20 overflow-hidden shadow-inner md:max-w-md lg:max-w-sm bg-blueSoft/10" />
    )
  }

  const { MapContainer, Marker, Popup, TileLayer } = reactLeaflet

  return (
    <div className="relative w-full max-w-xl aspect-square mx-auto rounded-3xl border border-brownDeep/20 overflow-hidden shadow-inner md:max-w-md lg:max-w-sm">
      <MapContainer
        center={[averagePosition.lat, averagePosition.lng]}
        zoom={16}
        scrollWheelZoom={false}
        className="h-full w-full"
        ref={mapRef}
        preferCanvas
      >
        <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
        {spotsWithIcons.map((spot) => (
          <Marker
            key={spot.name}
            position={[spot.lat, spot.lng]}
            icon={spot.icon}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
            }}
          >
            <Popup className="leaflet-popup-custom">
              <div className="space-y-1 px-3 py-2 text-center">
                <p className="font-semibold text-blueSoft text-sm">{spot.name}</p>
                <p className="text-xs text-brownDeep/70">{spot.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="pointer-events-none absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-brownDeep uppercase tracking-wide shadow-sm border border-brownDeep/10">
        Greenpoint Highlights
      </div>
    </div>
  )
}

