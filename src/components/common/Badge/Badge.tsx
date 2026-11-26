import type { ReactNode } from 'react'
import styles from './Badge.module.css'

interface BadgeProps {
  children: ReactNode
  variant?: 'sage' | 'moss' | 'sand' | 'dark' | 'outline'
  dot?: boolean
  className?: string
}

export function Badge({
  children,
  variant = 'moss',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}

