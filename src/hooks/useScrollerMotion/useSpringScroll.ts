import { useSpring, useViewportScroll } from 'framer-motion'

import { MotionValue, SpringProp, SpringOptions } from '@/types'

const useSpringScroll = (springConfig: SpringProp): MotionValue => {
  const { scrollY } = useViewportScroll()

  const config = typeof springConfig === 'object' ? springConfig : undefined
  const spring = useSpring(scrollY, config as SpringOptions)

  return config ? spring : scrollY
}

export default useSpringScroll
