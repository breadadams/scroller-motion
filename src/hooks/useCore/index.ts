import { useMemo } from 'react'

import { ChildrenRef, SpringProp } from '../../types'

import { useAxis } from './useAxis'
import { useSize } from './useSize'
import { useSpringScroll } from './useSpringScroll'
import { useWindowSize } from './useWindowSize'

interface Options {
  ref: ChildrenRef
  scale: number
  spring: SpringProp
}

export const useCore = ({ ref, scale, spring }: Options) => {
  const innerScale = useMemo(() => Math.max(1, scale), [scale])

  const { height: windowHeight, width: windowWidth } = useWindowSize()
  const { height: refHeight, width: refWidth } = useSize(ref)

  const { x: springX, y: springY } = useSpringScroll(spring)

  const {
    axis: x,
    progress: progressX,
    size: width
  } = useAxis({
    axisSpring: springX,
    scale: innerScale,
    refSize: refWidth,
    windowSize: windowWidth
  })

  const {
    axis: y,
    progress: progressY,
    size: height
  } = useAxis({
    axisSpring: springY,
    scale: innerScale,
    refSize: refHeight,
    windowSize: windowHeight
  })

  return {
    height,
    width,
    scrollX: springX,
    scrollXProgress: progressX,
    scrollY: springY,
    scrollYProgress: progressY,
    x,
    y
  }
}
