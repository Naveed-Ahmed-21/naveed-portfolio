import type { ReactNode } from 'react'
import { useMagnetic } from '@/animations'

interface MagneticProps {
  children: ReactNode
  strength?: number
  className?: string
}

export function Magnetic({
  children,
  strength = 0.3,
  className = '',
}: MagneticProps) {
  const ref = useMagnetic<HTMLDivElement>(strength)

  return (
    <div
      ref={ref}
      style={{ display: 'inline-flex', verticalAlign: 'middle' }}
      className={className}
    >
      {children}
    </div>
  )
}
