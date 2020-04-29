import { useMemo } from 'react'
import { useTransform } from 'framer-motion'

import { ChildrenRef, MotionValue, SpringProp } from '@/types'

import useHeight from './useHeight'
import useSpringScroll from './useSpringScroll'
import useWindowHeight from './useWindowHeight'

type UseScrollMotion = (
  ref: ChildrenRef,
  scale: number,
  spring: SpringProp
) => { y: MotionValue; height: number }

export const useScrollerMotion: UseScrollMotion = (ref, scale, spring) => {
  const windowHeight = useWindowHeight()
  const refHeight = useHeight(ref)
  const scaledHeight = useMemo(() => refHeight * scale, [refHeight, scale])

  const springScroll = useSpringScroll(spring)

  const yTransformFrom = useMemo(() => [0, scaledHeight - windowHeight], [
    scaledHeight,
    windowHeight
  ])
  const yTransformTo = useMemo(() => [0, (refHeight - windowHeight) * -1], [
    refHeight,
    windowHeight
  ])

  const y = useTransform(springScroll, yTransformFrom, yTransformTo)

  return { y, height: scaledHeight }
}
