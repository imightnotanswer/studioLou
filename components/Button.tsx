'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
}

export function Button({
  href,
  onClick,
  children,
  variant = 'primary',
  className = '',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full px-6 py-3 font-accent text-sm md:text-base font-medium transition-all duration-200 whitespace-nowrap'

  const variantStyles = {
    primary:
      'bg-brownDeep text-white hover:bg-olive hover:text-white',
    secondary:
      'bg-blueSoft text-white hover:bg-olive',
  }

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${className}`

  if (href) {
    // Check if it's an external URL
    const isExternal = href.startsWith('http://') || href.startsWith('https://')
    
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      )
    }
    
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  )
}

