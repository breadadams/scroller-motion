import { useMemo } from 'react'

import { ElementRef, SpringProp } from '../../types'

import { useAxis } from './useAxis'
import { useContainerSize } from './useContainerSize'
import { useContentSize } from './useContentSize'
import { useSpringScroll } from './useSpringScroll'

interface Options {
  containerRef: ElementRef
  isElement?: boolean
  ref: ElementRef
  scale: number
  spring: SpringProp
}

export const useCore = ({
  containerRef,
  isElement,
  ref,
  scale,
  spring
}: Options) => {
  const innerScale = useMemo(() => Math.max(1, scale), [scale])

  const { height: containerHeight, width: containerWidth } = useContainerSize(
    containerRef,
    isElement
  )
  const { height: contentHeight, width: contentWidth } = useContentSize(ref)

  const { x: springX, y: springY } = useSpringScroll(
    spring,
    containerRef,
    isElement
  )

  const { axis: x, size: width } = useAxis({
    axisSpring: springX,
    scale: innerScale,
    refSize: contentWidth,
    windowSize: containerWidth
  })

  const { axis: y, size: height } = useAxis({
    axisSpring: springY,
    scale: innerScale,
    refSize: contentHeight,
    windowSize: containerHeight
  })

  return { height, width, scrollX: springX, scrollY: springY, x, y }
}
