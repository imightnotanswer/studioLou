'use client'

import { useState } from 'react'

export function Map() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <a
      href="https://www.google.com/maps/place/Held+Space/@40.7318194,-73.955206,17.68z/data=!4m6!3m5!1s0x89c259ea27870f2f:0xa1ef21ea1c1cf9a9!8m2!3d40.732074!4d-73.9543115!16s%2Fg%2F11s7ftpqtk?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D"
      target="_blank"
      rel="noopener noreferrer"
      className="relative bg-blueSoft rounded-lg overflow-hidden aspect-square block hover:opacity-90 transition-opacity duration-200 group"
      aria-label="Open Held Space in Google Maps"
    >
      {/* Placeholder image that loads instantly */}
      <div className="absolute inset-0 bg-blueSoft flex items-center justify-center">
        <div className="text-center text-brownDeep/30">
          <svg
            className="w-16 h-16 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.4479796375!2d-73.9543115!3d40.732074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259ea27870f2f%3A0xa1ef21ea1c1cf9a9!2sHeld%20Space!5e0!3m2!1sen!2sus!4v1699123456789!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
          iframeLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIframeLoaded(true)}
      ></iframe>
      <div className="absolute inset-0 bg-transparent pointer-events-auto"></div>
    </a>
  )
}

