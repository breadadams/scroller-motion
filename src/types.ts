import { DetailedHTMLProps, HTMLAttributes, MutableRefObject } from 'react'
import { SpringProps as SpringConfig } from 'popmotion'
import { MotionValue } from 'framer-motion'

type ChildrenRef = MutableRefObject<HTMLDivElement | null>

type DivElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type OnUpdateProp = (payload: { scrollY: MotionValue; y: MotionValue }) => void

type ScaleProp = number

type SpringProp = SpringConfig | null | false

export type {
  ChildrenRef,
  DivElementProps,
  MotionValue,
  OnUpdateProp,
  ScaleProp,
  SpringConfig,
  SpringProp
}
