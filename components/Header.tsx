'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/Button'
import { openSquareBooking } from '@/components/SquareBookingWidget'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isHomepage = pathname === '/'
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/services', label: 'SERVICES' },
    { href: '/packages', label: 'PACKAGES' },
    { href: '/about', label: 'ABOUT' },
    { href: '/faqs', label: 'FAQs' },
    { href: '/contact', label: 'CONTACT' },
  ]

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href === '/faqs' && pathname === '/faqs') return true
    if (href === '/services' && pathname === '/services') return true
    if (href === '/packages' && pathname === '/packages') return true
    if (href === '/about' && pathname === '/about') return true
    if (href === '/contact' && pathname === '/contact') return true
    return false
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isHomepage && !scrolled
        ? 'bg-transparent'
        : 'bg-cream shadow-sm'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative flex items-center justify-between h-12 md:h-20">
          <div className="flex-1 flex items-center justify-start">
            <Button
              onClick={openSquareBooking}
              className="px-3 py-1 text-xs md:px-5 md:py-1.5 md:text-sm bg-brownDeep/90 hover:bg-brownDeep"
            >
              Book
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-accent uppercase tracking-wide transition-colors duration-200 ${isActive(link.href)
                  ? 'text-olive border-b-2 border-olive'
                  : 'text-brownDeep hover:text-olive'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div ref={mobileMenuRef} className="md:hidden flex flex-1 justify-end items-center">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-2 p-2 text-brownDeep hover:text-olive transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  // X icon when menu is open
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon when menu is closed
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <span className="text-xs font-accent uppercase tracking-wide">MENU</span>
            </button>

            {/* Mobile Menu Dropdown */}
            <div
              className={`absolute top-full left-0 right-0 bg-cream shadow-lg border-t border-brownDeep/10 overflow-hidden transition-all duration-300 ease-out ${isMobileMenuOpen
                ? 'max-h-96 opacity-100'
                : 'max-h-0 opacity-0'
                }`}
            >
              <div className="py-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-6 py-3 text-sm font-accent uppercase tracking-wide transition-all duration-300 ${isActive(link.href)
                      ? 'text-olive bg-cream/50 border-l-4 border-olive'
                      : 'text-brownDeep hover:text-olive hover:bg-cream/30'
                      }`}
                    style={{
                      animation: isMobileMenuOpen
                        ? `slideIn 0.4s ease-out ${index * 0.05}s both`
                        : 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
