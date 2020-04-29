import { useSpring, useViewportScroll } from 'framer-motion'

import { MotionValue, SpringProp } from '@/types'

const useSpringScroll = (springConfig: SpringProp): MotionValue => {
  const { scrollY } = useViewportScroll()

  const springScroll = useSpring(scrollY, springConfig)

  return springConfig !== undefined ? springScroll : scrollY
}

export default useSpringScroll
