import { DetailedHTMLProps, HTMLAttributes, MutableRefObject } from 'react'

export { MotionValue } from 'framer-motion'
export type { SpringProps as SpringProp } from 'popmotion'

export type ChildrenRef = MutableRefObject<HTMLDivElement | null>

export type ScaleProp = number

export type DivElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>
