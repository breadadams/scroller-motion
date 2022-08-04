import { useMemo } from 'react'
import { useTransform } from 'framer-motion'

import { MotionValue } from '../../types'

interface Options {
  axisSpring: MotionValue
  scale: number
  refSize: number
  windowSize: number
}

export const useAxis = ({
  axisSpring,
  scale,
  refSize,
  windowSize
}: Options) => {
  const scaledSize = useMemo(
    () => (refSize > windowSize ? refSize * scale : refSize),
    [refSize, scale, windowSize]
  )

  const transformFrom = useMemo(
    () => [0, scaledSize - windowSize],
    [scaledSize, windowSize]
  )
  const transformTo = useMemo(
    () => [0, (refSize - windowSize) * -1],
    [refSize, windowSize]
  )

  const axis = useTransform(axisSpring, transformFrom, transformTo, {
    clamp: false
  })

  const progress = useTransform(axis, transformTo, [0, 1], {
    clamp: true
  })

  return {
    axis,
    progress,
    size: scaledSize
  }
}
