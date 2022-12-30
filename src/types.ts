import { ComponentPropsWithoutRef, MutableRefObject } from 'react'
import { MotionValue, useSpring } from 'framer-motion'

type ChildrenRef = MutableRefObject<HTMLDivElement | null>

interface CoreProps extends DivElementProps {
  disabled?: boolean
  scale?: number
  spring?: SpringProp
}

type DivElementProps = ComponentPropsWithoutRef<'div'>

type CoreRef = ScrollerMotionValues | undefined

interface ScrollerMotionValues {
  scrollX: MotionValue
  scrollXProgress: MotionValue
  scrollY: MotionValue
  scrollYProgress: MotionValue
  x: MotionValue
  y: MotionValue
}

type SpringOptions = Parameters<typeof useSpring>[1]

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
