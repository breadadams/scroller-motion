import { DetailedHTMLProps, HTMLAttributes, MutableRefObject } from 'react'
import { SpringOptions } from 'popmotion'
import { MotionValue } from 'framer-motion'

type ChildrenRef = MutableRefObject<HTMLDivElement | null>

interface CoreProps extends DivElementProps {
  disabled?: boolean
  scale?: number
  spring?: SpringProp
}

type DivElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type CoreRef = ScrollerMotionValues | undefined

interface ScrollerMotionValues {
  scrollX: MotionValue
  scrollXProgress: MotionValue
  scrollY: MotionValue
  scrollYProgress: MotionValue
  x: MotionValue
  y: MotionValue
}

type SpringProp = SpringOptions | null | undefined | false

export type {
  ChildrenRef,
  CoreProps,
  CoreRef,
  DivElementProps,
  MotionValue,
  ScrollerMotionValues,
  SpringOptions,
  SpringProp
}
