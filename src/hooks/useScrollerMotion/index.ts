import { useEffect, useMemo } from 'react'
import { useTransform } from 'framer-motion'

import { ChildrenRef, MotionValue, OnUpdateProp, SpringProp } from '@/types'

import useHeight from './useHeight'
import useSpringScroll from './useSpringScroll'
import useWindowHeight from './useWindowHeight'

type UseScrollMotion = (options: {
  onUpdate?: OnUpdateProp
  ref: ChildrenRef
  scale: number
  spring: SpringProp
}) => { y: MotionValue; height: number }

export const useScrollerMotion: UseScrollMotion = ({
  onUpdate,
  ref,
  scale,
  spring
}) => {
  const windowHeight = useWindowHeight()
  const refHeight = useHeight(ref)
  const innerScale = useMemo(() => Math.max(1, scale), [scale])
  const scaledHeight = useMemo(() => refHeight * innerScale, [
    innerScale,
    refHeight
  ])

  const springScroll = useSpringScroll(spring)

  const yTransformFrom = useMemo(() => [0, scaledHeight - windowHeight], [
    scaledHeight,
    windowHeight
  ])
  const yTransformTo = useMemo(() => [0, (refHeight - windowHeight) * -1], [
    refHeight,
    windowHeight
  ])

  const y = useTransform(springScroll, yTransformFrom, yTransformTo, {
    clamp: false
  })

  useEffect(() => {
    if (typeof onUpdate === 'function') {
      const onSpringChange = () => {
        onUpdate({
          scrollY: springScroll,
          y
        })
      }

      const unsubListener = springScroll.onChange(onSpringChange)

      return () => {
        unsubListener()
      }
    }
  }, [onUpdate, springScroll, y])

  return { y, height: scaledHeight }
}
