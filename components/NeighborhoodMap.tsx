'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Map as LeafletMap, PointExpression } from 'leaflet'
import type * as LeafletNamespace from 'leaflet'
import 'leaflet/dist/leaflet.css'

export interface NeighborhoodSpot {
  name: string
  address: string
  lat: number
  lng: number
  url?: string
}

interface NeighborhoodMapProps {
  spots: NeighborhoodSpot[]
  enableMarkerLinks?: boolean
  activeSpotName?: string
  selectedSpotName?: string | null
  onSpotHoverChange?: (spotName: string | null) => void
  onSpotSelect?: (spotName: string | null) => void
}

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const TILE_ATTRIBUTION =
  ''

type LeafletModule = typeof import('leaflet')
type ReactLeafletModule = typeof import('react-leaflet')

function createMarkerIcon(L: LeafletModule, { isActive = false }: { isActive?: boolean } = {}) {
  const baseClass = 'leaflet-marker-custom'
  const combinedClass = isActive ? `${baseClass} ${baseClass}--active` : baseClass

  return L.divIcon({
    html: `<div class="${combinedClass}" aria-hidden="true"></div>`,
    className: '',
    iconSize: [38, 38],
    iconAnchor: [19, 32],
    popupAnchor: [0, -32],
  })
}

export function NeighborhoodMap({
  spots,
  enableMarkerLinks = false,
  activeSpotName,
  selectedSpotName,
  onSpotHoverChange,
  onSpotSelect,
}: NeighborhoodMapProps) {
  const mapRef = useRef<LeafletMap | null>(null)
  const markersRef = useRef<Record<string, LeafletNamespace.Marker>>({})
  const lastCenteredSpotRef = useRef<string | null>(null)
  const [leafletLib, setLeafletLib] = useState<LeafletModule | null>(null)
  const [reactLeaflet, setReactLeaflet] = useState<ReactLeafletModule | null>(null)
  const [copiedSpot, setCopiedSpot] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let isMounted = true

      ; (async () => {
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

  useEffect(() => {
    markersRef.current = {}
    return () => {
      markersRef.current = {}
    }
  }, [spots])

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
      icon: createMarkerIcon(leafletLib, { isActive: spot.name === activeSpotName }),
      openUrl:
        spot.url ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.address)}`,
    }))
  }, [leafletLib, spots, activeSpotName])

  const bounds = useMemo(() => {
    if (!leafletLib || spots.length === 0) return null
    return leafletLib.latLngBounds(
      spots.map((spot) => [spot.lat, spot.lng] as LeafletNamespace.LatLngExpression)
    )
  }, [leafletLib, spots])

  const handleSelect = (spotName: string | null) => {
    onSpotSelect?.(spotName)
  }

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

  useEffect(() => {
    if (!copiedSpot) return
    const timeout = window.setTimeout(() => setCopiedSpot(null), 1800)
    return () => window.clearTimeout(timeout)
  }, [copiedSpot])

  useEffect(() => {
    const markers = markersRef.current
    const selectionName = selectedSpotName ?? null
    const hoverName = selectionName ? null : activeSpotName ?? null

    Object.entries(markers).forEach(([name, marker]) => {
      const isSelected = selectionName === name
      const isHovered = hoverName === name

      if (isSelected) {
        marker.closeTooltip()

        if (!enableMarkerLinks) {
          const alreadyOpen =
            typeof marker.isPopupOpen === 'function' ? marker.isPopupOpen() : false
          if (!alreadyOpen) {
            marker.openPopup()
          }
        } else {
          marker.closePopup()
        }

        marker.setZIndexOffset(1500)
        return
      }

      if (isHovered) {
        const tooltipOpen =
          typeof marker.isTooltipOpen === 'function' ? marker.isTooltipOpen() : false
        if (!tooltipOpen) {
          marker.openTooltip()
        }

        if (!enableMarkerLinks) {
          marker.closePopup()
        }

        marker.setZIndexOffset(1000)
        return
      }

      if (typeof marker.isTooltipOpen === 'function' ? marker.isTooltipOpen() : false) {
        marker.closeTooltip()
      }
      marker.closePopup()
      marker.setZIndexOffset(0)
    })
  }, [activeSpotName, selectedSpotName, enableMarkerLinks])

  useEffect(() => {
    if (!mapRef.current || !leafletLib) return

    if (!selectedSpotName) {
      lastCenteredSpotRef.current = null
      return
    }

    if (selectedSpotName === lastCenteredSpotRef.current) {
      return
    }

    const marker = markersRef.current[selectedSpotName]
    if (!marker) {
      return
    }

    const map = mapRef.current
    const latLng = marker.getLatLng()
    const container = map.getContainer()
    const containerHeight = container?.clientHeight ?? 0
    const preferredPadding = Math.min(Math.max(containerHeight * 0.22, 110), 220)
    const topPaddingPoint = leafletLib.point(0, preferredPadding)
    const bottomPaddingPoint = leafletLib.point(0, 32)

    const panInside = (map as LeafletNamespace.Map & { panInside?: LeafletNamespace.Map['panInside'] }).panInside
    if (typeof panInside === 'function') {
      panInside.call(map, latLng, {
        paddingTopLeft: topPaddingPoint,
        paddingBottomRight: bottomPaddingPoint,
        animate: true,
      })
    } else {
      const currentZoom = map.getZoom()
      const projected = map.project(latLng, currentZoom)
      const adjustedPoint = projected.subtract(leafletLib.point(0, preferredPadding - 32))
      const targetLatLng = map.unproject(adjustedPoint, currentZoom)
      map.panTo(targetLatLng, { animate: true })
    }

    lastCenteredSpotRef.current = selectedSpotName
  }, [leafletLib, selectedSpotName])

  if (!leafletLib || !reactLeaflet) {
    return (
      <div className="relative w-full max-w-xl aspect-square mx-auto rounded-3xl border border-brownDeep/20 overflow-hidden shadow-inner md:max-w-md lg:max-w-sm bg-blueSoft/10" />
    )
  }

  const leafletComponents = reactLeaflet as typeof import('react-leaflet')
  const { MapContainer, Marker, Popup, TileLayer, Tooltip } = leafletComponents

  return (
    <div className="relative w-full max-w-xl aspect-square mx-auto rounded-3xl border border-brownDeep/20 overflow-hidden shadow-inner md:max-w-md lg:max-w-sm">
      <MapContainer
        center={[averagePosition.lat, averagePosition.lng]}
        zoom={16}
        scrollWheelZoom={false}
        className="h-full w-full"
        ref={mapRef}
        preferCanvas
        attributionControl={false}
        closePopupOnClick={false}
      >
        <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
        {spotsWithIcons.map((spot) => {
          const baseEvents = {
            mouseover: () => {
              onSpotHoverChange?.(spot.name)
            },
            mouseout: () => {
              onSpotHoverChange?.(null)
            },
            focus: () => {
              onSpotHoverChange?.(spot.name)
            },
            blur: () => {
              onSpotHoverChange?.(null)
            },
          }

          const markerEvents = enableMarkerLinks
            ? {
              ...baseEvents,
              click: () => {
                handleSelect(spot.name)
                if (typeof window !== 'undefined') {
                  window.open(spot.openUrl, '_blank', 'noopener,noreferrer')
                }
              },
            }
            : {
              ...baseEvents,
              click: () => handleSelect(spot.name),
              popupopen: (event: LeafletNamespace.LeafletEvent) => {
                event.target.closeTooltip()
              },
              popupclose: () => {
                if (selectedSpotName === spot.name) {
                  handleSelect(null)
                }
              },
            }

          return (
            <Marker
              key={spot.name}
              position={[spot.lat, spot.lng]}
              icon={spot.icon}
              ref={(markerInstance) => {
                if (markerInstance) {
                  markersRef.current[spot.name] = markerInstance
                } else {
                  delete markersRef.current[spot.name]
                }
              }}
              eventHandlers={markerEvents}
            >
              {Tooltip && (
                <Tooltip
                  direction="top"
                  offset={[0, -18]}
                  opacity={1}
                  className="leaflet-tooltip-custom"
                >
                  <div className="space-y-1 text-center">
                    <p className="font-semibold text-blueSoft text-sm">{spot.name}</p>
                    <p className="text-xs text-brownDeep/70">{spot.address}</p>
                  </div>
                </Tooltip>
              )}
              {!enableMarkerLinks && (
                <Popup className="leaflet-popup-custom" autoPan={false}>
                  <div className="space-y-0.5 px-3 py-2 text-center">
                    <p className="font-semibold text-blueSoft text-sm">{spot.name}</p>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        if (navigator?.clipboard?.writeText) {
                          navigator.clipboard.writeText(spot.address).then(() => setCopiedSpot(spot.name)).catch(() => { })
                        }
                      }}
                      className="text-xs text-brownDeep/70 hover:text-olive transition-colors cursor-text"
                    >
                      {spot.address}
                    </button>
                    {copiedSpot === spot.name && (
                      <p className="text-[11px] text-olive font-medium">Copied!</p>
                    )}
                  </div>
                </Popup>
              )}
            </Marker>
          )
        })}
      </MapContainer>
      <div className="pointer-events-none absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-brownDeep uppercase tracking-wide shadow-sm border border-brownDeep/10">
        Greenpoint Highlights
      </div>
      <style jsx global>{`
        .leaflet-control-attribution {
          display: none !important;
        }
      `}</style>
    </div>
  )
}

