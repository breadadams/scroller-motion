import {
  ComponentType,
  DetailedHTMLProps,
  HTMLAttributes,
  RefObject
} from 'react'
import { SpringOptions } from 'popmotion'
import { MotionValue } from 'framer-motion'

type ElementRef = RefObject<HTMLElement>

interface CoreProps extends DivElementProps {
  as?: string | ComponentType<any>
  disabled?: boolean
  isElement?: boolean
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
  scrollY: MotionValue
  x: MotionValue
  y: MotionValue
}

type SpringProp = SpringOptions | null | undefined | false

export type {
  CoreProps,
  CoreRef,
  DivElementProps,
  ElementRef,
  MotionValue,
  ScrollerMotionValues,
  SpringOptions,
  SpringProp
}
