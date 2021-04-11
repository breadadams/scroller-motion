import { DetailedHTMLProps, HTMLAttributes, MutableRefObject } from 'react'
import { SpringOptions } from 'popmotion'
import { MotionValue } from 'framer-motion'

type ChildrenRef = MutableRefObject<HTMLDivElement | null>

type DivElementProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type DOMSize = { height: number; width: number }

type OnUpdateProp = (payload: {
  scrollX: MotionValue
  scrollY: MotionValue
  x: MotionValue
  y: MotionValue
}) => void

type ScaleProp = number

type SpringProp = SpringOptions | null | undefined | false

export type {
  ChildrenRef,
  DivElementProps,
  DOMSize,
  MotionValue,
  OnUpdateProp,
  ScaleProp,
  SpringOptions,
  SpringProp
}
