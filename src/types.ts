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

type CoreRef =
  | {
      scrollX: MotionValue
      scrollY: MotionValue
      x: MotionValue
      y: MotionValue
    }
  | undefined

type SpringProp = SpringOptions | null | undefined | false

export type {
  ChildrenRef,
  CoreProps,
  DivElementProps,
  MotionValue,
  CoreRef,
  SpringOptions,
  SpringProp
}
