import { useEffect, useMemo } from 'react'

import { ChildrenRef, MotionValue, OnUpdateProp, SpringProp } from '@/types'

import { useAxis } from './useAxis'
import { useSize } from './useSize'
import { useSpringScroll } from './useSpringScroll'
import { useWindowSize } from './useWindowSize'

interface Options {
  onUpdate?: OnUpdateProp
  ref: ChildrenRef
  scale: number
  spring: SpringProp
}

export const useCore = ({ onUpdate, ref, scale, spring }: Options) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize()
  const { height: refHeight, width: refWidth } = useSize(ref)
  const innerScale = useMemo(() => Math.max(1, scale), [scale])

  const { x: xSpring, y: ySpring } = useSpringScroll(spring)

  const { axis: x, size: width } = useAxis({
    axisSpring: xSpring,
    scale: innerScale,
    refSize: refWidth,
    windowSize: windowWidth
  })

  const { axis: y, size: height } = useAxis({
    axisSpring: ySpring,
    scale: innerScale,
    refSize: refHeight,
    windowSize: windowHeight
  })

  useEffect(() => {
    let unsubscribeX: (() => void) | undefined
    let unsubscribeY: (() => void) | undefined

    if (typeof onUpdate === 'function') {
      const onSpringChange = () =>
        onUpdate({
          scrollX: xSpring,
          scrollY: ySpring,
          x,
          y
        })

      unsubscribeX = xSpring.onChange(onSpringChange)
      unsubscribeY = ySpring.onChange(onSpringChange)
    }

    return () => {
      if (unsubscribeX) {
        unsubscribeX()
      }
      if (unsubscribeY) {
        unsubscribeY()
      }
    }
  }, [onUpdate, x, xSpring, y, ySpring])

  return { height, width, x, y }
}
