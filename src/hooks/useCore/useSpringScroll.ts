import { useSpring, useViewportScroll } from 'framer-motion'

import { MotionValue, SpringProp, SpringOptions } from '../../types'

export const useSpringScroll = (springConfig: SpringProp) => {
  const { scrollX, scrollY } = useViewportScroll()

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
