import { useMemo } from 'react'
import { useElementScroll, useSpring, useViewportScroll } from 'framer-motion'

import { ElementRef, MotionValue, SpringProp, SpringOptions } from '../../types'

export const useSpringScroll = (
  springConfig: SpringProp,
  ref: ElementRef,
  isElement?: boolean
) => {
  const scrollHook = useMemo(
    () => (!isElement ? useViewportScroll : useElementScroll),
    [isElement]
  )
  const { scrollX, scrollY } = scrollHook(ref)

  const config = typeof springConfig === 'object' ? springConfig : undefined
  const springX: MotionValue<number> = useSpring(
    scrollX,
    config as SpringOptions
  )
  const springY: MotionValue<number> = useSpring(
    scrollY,
    config as SpringOptions
  )

  return {
    x: config ? springX : scrollX,
    y: config ? springY : scrollY
  }
}
