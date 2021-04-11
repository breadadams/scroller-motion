import { useMemo } from 'react'
import { useTransform } from 'framer-motion'

import { MotionValue } from '@/types'

interface Params {
  axisSpring: MotionValue
  scale: number
  refSize: number
  windowSize: number
}

export const useAxis = ({ axisSpring, scale, refSize, windowSize }: Params) => {
  const scaledSize = useMemo(() => refSize * scale, [refSize, scale])

  const transformFrom = useMemo(() => [0, scaledSize - windowSize], [
    scaledSize,
    windowSize
  ])
  const transformTo = useMemo(() => [0, (refSize - windowSize) * -1], [
    refSize,
    windowSize
  ])

  const axis = useTransform(axisSpring, transformFrom, transformTo, {
    clamp: false
  })

  return {
    axis,
    size: scaledSize
  }
}
