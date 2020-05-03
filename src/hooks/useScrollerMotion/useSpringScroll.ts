import { useMemo } from 'react'
import { useSpring, useViewportScroll } from 'framer-motion'

import { MotionValue, SpringProp, SpringConfig } from '@/types'

const useSpringScroll = (springConfig: SpringProp): MotionValue => {
  const { scrollY } = useViewportScroll()

  const enableSpring = useMemo(() => typeof springConfig === 'object', [
    springConfig
  ])

  const config = useMemo(
    () => (enableSpring ? (springConfig as SpringConfig) : undefined),
    [enableSpring, springConfig]
  )

  const springScroll = useSpring(scrollY, config)

  return enableSpring ? springScroll : scrollY
}

export default useSpringScroll
