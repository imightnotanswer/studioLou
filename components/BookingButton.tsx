'use client'

import { Button } from './Button'
import { openSquareBooking } from './SquareBookingWidget'

interface BookingButtonProps {
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary'
}

/**
 * BookingButton - A wrapper around Button that triggers Square booking widget
 * Use this instead of Button with onClick={openSquareBooking} in server components
 */
export function BookingButton({ children, className, variant }: BookingButtonProps) {
  return (
    <Button onClick={openSquareBooking} className={className} variant={variant}>
      {children}
    </Button>
  )
}

