'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const isHomepage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/booking', label: 'BOOK' },
    { href: '/services', label: 'SERVICES' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ]

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href === '/booking' && pathname === '/booking') return true
    if (href === '/services' && pathname === '/services') return true
    if (href === '/about' && pathname === '/about') return true
    if (href === '/contact' && pathname === '/contact') return true
    return false
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isHomepage && !scrolled
          ? 'bg-transparent'
          : 'bg-cream shadow-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-10 md:h-20">
          <div className="flex gap-1.5 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs md:text-base font-accent uppercase tracking-wide transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-olive border-b-2 border-olive'
                    : 'text-brownDeep hover:text-olive'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

