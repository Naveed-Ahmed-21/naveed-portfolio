import type { ReactNode, HTMLAttributes } from 'react'
import styles from './Container.module.css'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  narrow?: boolean
  className?: string
}

export function Container({
  children,
  narrow = false,
  className = '',
  ...props
}: ContainerProps) {
  return (
    <div
      className={`${narrow ? styles.narrow : styles.container} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

