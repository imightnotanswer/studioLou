'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type {
  Map as LeafletMap,
  PointExpression,
  LeafletMouseEvent,
  LeafletEvent as LeafletBaseEvent,
} from 'leaflet'
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
const TILE_ATTRIBUTION = ''

type LeafletModule = typeof import('leaflet')
type ReactLeafletModule = typeof import('react-leaflet')
type LeafletPointerEvent =
  | LeafletMouseEvent
  | (LeafletNamespace.LeafletEvent & { originalEvent: TouchEvent })

type ExtendedEventHandlerFnMap = LeafletNamespace.LeafletEventHandlerFnMap & Record<
  'touchstart' | 'touchcancel',
  LeafletNamespace.LeafletEventHandlerFn
>

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
  const popupRefs = useRef<Record<string, LeafletNamespace.Popup>>({})
  const skipNextMapClearRef = useRef(false)
  const lastCenteredSpotRef = useRef<string | null>(null)
  const [leafletLib, setLeafletLib] = useState<LeafletModule | null>(null)
  const [reactLeaflet, setReactLeaflet] = useState<ReactLeafletModule | null>(null)
  const [copiedSpot, setCopiedSpot] = useState<string | null>(null)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

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
    if (typeof window === 'undefined') {
      return
    }

    const updateSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    updateSmallScreen()
    window.addEventListener('resize', updateSmallScreen, { passive: true })

    return () => {
      window.removeEventListener('resize', updateSmallScreen)
    }
  }, [])

  useEffect(() => {
    markersRef.current = {}
    popupRefs.current = {}
    return () => {
      markersRef.current = {}
      popupRefs.current = {}
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
      icon: createMarkerIcon(leafletLib, {
        isActive:
          spot.name === activeSpotName ||
          (selectedSpotName ? spot.name === selectedSpotName : false),
      }),
      openUrl:
        spot.url ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot.address)}`,
    }))
  }, [leafletLib, spots, activeSpotName, selectedSpotName])

  const bounds = useMemo(() => {
    if (!leafletLib || spots.length === 0) return null
    return leafletLib.latLngBounds(
      spots.map((spot) => [spot.lat, spot.lng] as LeafletNamespace.LatLngExpression)
    )
  }, [leafletLib, spots])

  useEffect(() => {
    const markers = markersRef.current
    const selectionName = selectedSpotName ?? null
    const hoverName =
      activeSpotName && activeSpotName !== selectionName ? activeSpotName : null

    const map = mapRef.current

    Object.entries(markers).forEach(([name, rawMarker]) => {
      const marker = rawMarker as LeafletNamespace.Marker & { __gf_selected?: boolean }
      const wasPreviouslySelected = marker.__gf_selected === true
      const isSelected = selectionName === name
      const isHovered = hoverName === name
      const popup = popupRefs.current[name]

      if (isSelected) {
        if (typeof marker.closeTooltip === 'function') {
          marker.closeTooltip()
        }
        if (!enableMarkerLinks && popup && map) {
          const isOpen = typeof popup.isOpen === 'function' ? popup.isOpen() : false
          if (!isOpen) {
            popup.openOn(map)
          }
        }
        marker.setZIndexOffset(1500)
        marker.__gf_selected = true
        return
      }

      if (!enableMarkerLinks && popup) {
        const isOpen = typeof popup.isOpen === 'function' ? popup.isOpen() : false
        if (isOpen) {
          popup.close()
        }
      }

      if (isHovered) {
        const tooltipOpen =
          typeof marker.isTooltipOpen === 'function' ? marker.isTooltipOpen() : false
        if (!tooltipOpen && typeof marker.openTooltip === 'function') {
          marker.openTooltip()
        }
        marker.setZIndexOffset(1000)
        return
      }

      if (typeof marker.isTooltipOpen === 'function' && marker.isTooltipOpen()) {
        marker.closeTooltip()
      }

      marker.setZIndexOffset(0)
      if (wasPreviouslySelected) {
        marker.__gf_selected = false
      }
    })
  }, [activeSpotName, selectedSpotName, enableMarkerLinks])

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
    if (!mapRef.current || !leafletLib) return

    if (isSmallScreen) {
      lastCenteredSpotRef.current = null
      return
    }

    const targetName = selectedSpotName ?? null
    if (!targetName) {
      lastCenteredSpotRef.current = null
      return
    }

    if (targetName === lastCenteredSpotRef.current) {
      return
    }

    const selectedSpot = spots.find((spot) => spot.name === targetName)
    if (!selectedSpot) {
      return
    }

    const map = mapRef.current
    const latLng = leafletLib.latLng(selectedSpot.lat, selectedSpot.lng)
    const container = map.getContainer()
    const containerHeight = container?.clientHeight ?? 0
    const topPadding = Math.min(Math.max(containerHeight * 0.32, 128), 240)
    const bottomPadding = Math.min(Math.max(containerHeight * 0.12, 48), 120)
    const topPaddingPoint = leafletLib.point(0, topPadding)
    const bottomPaddingPoint = leafletLib.point(0, bottomPadding)

    const performPan = () => {
      if (typeof map.stop === 'function') {
        map.stop()
      }

      const panInside = (map as LeafletNamespace.Map & { panInside?: LeafletNamespace.Map['panInside'] }).panInside
      if (typeof panInside === 'function') {
        panInside.call(map, latLng, {
          paddingTopLeft: topPaddingPoint,
          paddingBottomRight: bottomPaddingPoint,
          animate: false,
        })
      } else {
        const currentZoom = map.getZoom()
        const projected = map.project(latLng, currentZoom)
        const adjustedPoint = projected.subtract(leafletLib.point(0, topPadding - bottomPadding))
        const targetLatLng = map.unproject(adjustedPoint, currentZoom)
        map.panTo(targetLatLng, { animate: false })
      }
    }

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(performPan)
    } else {
      performPan()
    }

    lastCenteredSpotRef.current = selectedSpot.name
  }, [leafletLib, selectedSpotName, spots, isSmallScreen])

  if (!leafletLib || !reactLeaflet) {
    return (
      <div className="relative w-full max-w-xl aspect-square mx-auto rounded-3xl border border-brownDeep/20 overflow-hidden shadow-inner md:max-w-md lg:max-w-sm bg-blueSoft/10" />
    )
  }

  const leafletComponents = reactLeaflet as typeof import('react-leaflet')
  const { MapContainer, Marker, Popup, TileLayer, Tooltip, useMapEvent } = leafletComponents

  const didEventOriginateFromMarker = (event: LeafletPointerEvent) => {
    const baseEvent = event as LeafletBaseEvent & {
      propagatedFrom?: LeafletNamespace.Layer
      layer?: LeafletNamespace.Layer
      originalEvent?: Event
    }

    const sourceLayer = baseEvent.propagatedFrom ?? baseEvent.layer ?? null
    if (sourceLayer && 'options' in sourceLayer) {
      const pane =
        (sourceLayer as LeafletNamespace.Layer & { options?: { pane?: string } }).options?.pane ?? ''
      if (typeof pane === 'string' && pane.includes('marker')) {
        return true
      }
    }

    const markerSelectors = ['.leaflet-marker-icon', '.leaflet-popup', '.leaflet-control']
    const elementMatchesMarker = (target: EventTarget | null | undefined) => {
      if (!(target instanceof HTMLElement)) {
        return false
      }

      return markerSelectors.some((selector) => Boolean(target.closest(selector)))
    }

    const originalEvent = baseEvent.originalEvent
    if (!originalEvent) {
      return false
    }

    const candidates: (EventTarget | null | undefined)[] = []
    candidates.push((originalEvent as { target?: EventTarget | null }).target ?? null)

    if ('composedPath' in originalEvent && typeof originalEvent.composedPath === 'function') {
      const path = originalEvent.composedPath()
      for (const node of path) {
        candidates.push(node as EventTarget | null)
      }
    }

    const isTouchEvent =
      typeof window !== 'undefined' &&
      typeof TouchEvent !== 'undefined' &&
      originalEvent instanceof TouchEvent

    if (isTouchEvent) {
      const touchEvent = originalEvent as TouchEvent
      const touchLists = [touchEvent.touches, touchEvent.changedTouches, touchEvent.targetTouches]
      for (const list of touchLists) {
        if (!list) continue
        for (let index = 0; index < list.length; index += 1) {
          candidates.push(list.item(index)?.target ?? null)
        }
      }
    }

    for (const candidate of candidates) {
      if (elementMatchesMarker(candidate)) {
        return true
      }
    }

    return false
  }

  const shouldSkipClear = (event: LeafletPointerEvent) => didEventOriginateFromMarker(event)

  const clearActiveStates = (event: LeafletPointerEvent) => {
    if (skipNextMapClearRef.current) {
      skipNextMapClearRef.current = false
      return
    }

    if (shouldSkipClear(event)) {
      return
    }

    const hasSelection = Boolean(selectedSpotName)
    const hasHover = Boolean(activeSpotName)

    if (!hasSelection && !hasHover) {
      return
    }

    if (hasHover) {
      onSpotHoverChange?.(null)
    }

    if (hasSelection) {
      onSpotSelect?.(null)
    }
  }

  const MapInteractionHandler = () => {
    useMapEvent('click', clearActiveStates)
    return null
  }

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
      >
        <MapInteractionHandler />
        <TileLayer attribution={TILE_ATTRIBUTION} url={TILE_URL} />
        {spotsWithIcons.map((spot) => {
          const isSelected = selectedSpotName === spot.name
          const isHovered = !isSelected && activeSpotName === spot.name

          const highlightSpot = () => {
            if (isSelected) {
              const marker = markersRef.current[spot.name]
              if (marker && typeof marker.closeTooltip === 'function') {
                marker.closeTooltip()
              }
              return
            }
            onSpotHoverChange?.(spot.name)
          }

          const clearHighlight = () => {
            if (isSelected) {
              const marker = markersRef.current[spot.name]
              if (marker && typeof marker.closeTooltip === 'function') {
                marker.closeTooltip()
              }
              return
            }
            onSpotHoverChange?.(null)
          }

          const selectSpot = (
            _eventType: string,
            event?: LeafletNamespace.LeafletEvent & {
              originalEvent?: Event
              target?: LeafletNamespace.Layer
            }
          ) => {
            if (selectedSpotName === spot.name) {
              if (event?.originalEvent) {
                if ('preventDefault' in event.originalEvent && typeof event.originalEvent.preventDefault === 'function') {
                  event.originalEvent.preventDefault()
                }
                if ('stopPropagation' in event.originalEvent && typeof event.originalEvent.stopPropagation === 'function') {
                  event.originalEvent.stopPropagation()
                }
              }
              const popup = popupRefs.current[spot.name]
              if (popup && typeof popup.isOpen === 'function' && popup.isOpen()) {
                popup.close()
              }
              const marker = markersRef.current[spot.name]
              if (marker && typeof marker.closeTooltip === 'function') {
                marker.closeTooltip()
              }
              onSpotSelect?.(null)
              onSpotHoverChange?.(null)
              return
            }

            if (event?.originalEvent) {
              if ('preventDefault' in event.originalEvent && typeof event.originalEvent.preventDefault === 'function') {
                event.originalEvent.preventDefault()
              }
              if ('stopPropagation' in event.originalEvent && typeof event.originalEvent.stopPropagation === 'function') {
                event.originalEvent.stopPropagation()
              }
            }

            skipNextMapClearRef.current = true
            if (typeof window !== 'undefined') {
              window.setTimeout(() => {
                skipNextMapClearRef.current = false
              }, 200)
            }
            const marker = markersRef.current[spot.name]
            if (marker && typeof marker.closeTooltip === 'function') {
              marker.closeTooltip()
            }
            onSpotSelect?.(spot.name)
            onSpotHoverChange?.(null)
          }

          const baseEvents: Partial<ExtendedEventHandlerFnMap> = {
            mouseover: highlightSpot,
            mouseout: clearHighlight,
            touchstart: highlightSpot,
            touchcancel: clearHighlight,
          }

          const markerEvents = enableMarkerLinks
            ? {
              ...baseEvents,
              click: (event: LeafletNamespace.LeafletEvent & { originalEvent?: Event }) => {
                selectSpot('click', event)
                if (typeof window !== 'undefined') {
                  window.open(spot.openUrl, '_blank', 'noopener,noreferrer')
                }
              },
              tap: (event: LeafletNamespace.LeafletEvent & { originalEvent?: Event }) => {
                selectSpot('tap', event)
                if (typeof window !== 'undefined') {
                  window.open(spot.openUrl, '_blank', 'noopener,noreferrer')
                }
              },
              touchend: (event: LeafletNamespace.LeafletEvent & { originalEvent?: Event }) => {
                selectSpot('touchend', event)
                if (typeof window !== 'undefined') {
                  window.open(spot.openUrl, '_blank', 'noopener,noreferrer')
                }
              },
              popupclose: () => {
                if (selectedSpotName === spot.name) {
                  onSpotSelect?.(null)
                }
                if (activeSpotName === spot.name) {
                  onSpotHoverChange?.(null)
                }
              },
            }
            : {
              ...baseEvents,
              click: (event: LeafletNamespace.LeafletEvent & { originalEvent?: Event }) =>
                selectSpot('click', event),
              tap: (event: LeafletNamespace.LeafletEvent & { originalEvent?: Event }) =>
                selectSpot('tap', event),
              touchend: (event: LeafletNamespace.LeafletEvent & { originalEvent?: Event }) =>
                selectSpot('touchend', event),
              popupclose: () => {
                if (selectedSpotName === spot.name) {
                  onSpotSelect?.(null)
                }
                if (activeSpotName === spot.name) {
                  onSpotHoverChange?.(null)
                }
              },
            }

          const tooltipClassName = isSelected
            ? 'leaflet-tooltip-custom leaflet-tooltip-custom--hidden'
            : 'leaflet-tooltip-custom'

          return (
            <Marker
              key={spot.name}
              position={[spot.lat, spot.lng]}
              icon={spot.icon}
              keyboard={false}
              ref={(markerInstance) => {
                if (markerInstance) {
                  markersRef.current[spot.name] = markerInstance
                } else {
                  delete markersRef.current[spot.name]
                }
              }}
              zIndexOffset={isSelected ? 1500 : isHovered ? 1000 : 0}
              eventHandlers={markerEvents}
            >
              {Tooltip && (
                <Tooltip
                  direction="top"
                  offset={[0, -18]}
                  opacity={isSelected ? 0 : 1}
                  className={tooltipClassName}
                  interactive={false}
                  permanent={false}
                >
                  {!isSelected && (
                    <div className="space-y-1 text-center pointer-events-none">
                      <p className="font-semibold text-blueSoft text-sm">{spot.name}</p>
                      <p className="text-xs text-brownDeep/70">{spot.address}</p>
                    </div>
                  )}
                </Tooltip>
              )}
              {!enableMarkerLinks && (
                <Popup
                  className="leaflet-popup-custom"
                  autoPan={isSmallScreen}
                  autoClose={false}
                  closeButton
                  autoPanPaddingTopLeft={isSmallScreen ? [12, 80] : undefined}
                  autoPanPaddingBottomRight={isSmallScreen ? [12, 40] : undefined}
                  ref={(popupInstance) => {
                    if (popupInstance) {
                      popupRefs.current[spot.name] = popupInstance
                    } else {
                      delete popupRefs.current[spot.name]
                    }
                  }}
                >
                  <div className="space-y-0.5 px-3 py-2 text-center">
                    <p className="font-semibold text-blueSoft text-sm">{spot.name}</p>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        if (navigator?.clipboard?.writeText) {
                          navigator.clipboard
                            .writeText(spot.address)
                            .then(() => setCopiedSpot(spot.name))
                            .catch(() => { })
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
        .leaflet-tooltip-custom--hidden {
          visibility: hidden;
          opacity: 0 !important;
          display: none !important;
        }
      `}</style>
    </div>
  )
}

