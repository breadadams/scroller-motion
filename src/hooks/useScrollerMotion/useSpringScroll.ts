import { useSpring, useViewportScroll } from 'framer-motion'

import { MotionValue, SpringProp, SpringOptions } from '@/types'

export const useSpringScroll = (
  springConfig: SpringProp
): { x: MotionValue; y: MotionValue } => {
  const { scrollX, scrollY } = useViewportScroll()

  const config = typeof springConfig === 'object' ? springConfig : undefined
  const springX = useSpring(scrollX, config as SpringOptions)
  const springY = useSpring(scrollY, config as SpringOptions)

  return {
    x: config ? springX : scrollX,
    y: config ? springY : scrollY
  }
}
