import {
  type ButtonHTMLAttributes,
  type AnchorHTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from 'react'
import { useSmoothScroll } from '@/animations'
import { Magnetic } from '../Magnetic/Magnetic'
import styles from './Button.module.css'

type BaseButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  magnetic?: boolean
  className?: string
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsAnchor = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  magnetic = false,
  className = '',
  ...props
}: ButtonProps) {
  const { scrollTo } = useSmoothScroll()

  const combinedClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  if (props.href !== undefined) {
    const { href, onClick, ...anchorProps } = props as ButtonAsAnchor

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault()
        const offset = href === '#hero' ? 0 : -76
        scrollTo(href, { offset })
      }
      onClick?.(e)
    }

    const anchorElement = (
      <a href={href} onClick={handleClick} className={combinedClass} {...anchorProps}>
        <span className={styles.label}>{children}</span>
      </a>
    )

    return magnetic ? <Magnetic>{anchorElement}</Magnetic> : anchorElement
  }

  const buttonProps = props as ButtonAsButton
  const buttonElement = (
    <button className={combinedClass} {...buttonProps}>
      <span className={styles.label}>{children}</span>
    </button>
  )

  return magnetic ? <Magnetic>{buttonElement}</Magnetic> : buttonElement
}
