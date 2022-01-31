import { renderHook } from '@testing-library/react-hooks'
import { motionValue } from 'framer-motion'

import { useAxis } from '../useAxis'

const AXIS_SPRING = motionValue(0)
const WINDOW_SIZE = 1000
const CONTENT_SIZE = 2000
const SCALE = 1

test('should return an `axis` and `size`', () => {
  const { result } = renderHook(() =>
    useAxis({
      axisSpring: AXIS_SPRING,
      scale: SCALE,
      refSize: CONTENT_SIZE,
      windowSize: WINDOW_SIZE
    })
  )

  expect(typeof result.current.size).toBe('number')
  expect(typeof result.current.axis).toBe('object')

  expect(result.current.size).toBe(CONTENT_SIZE)
  expect(result.current.axis.get()).toBe(0)
})

test('should scale correctly', () => {
  const { result } = renderHook(() =>
    useAxis({
      axisSpring: AXIS_SPRING,
      scale: 1.5,
      refSize: CONTENT_SIZE,
      windowSize: WINDOW_SIZE
    })
  )
  expect(result.current.size).toBe(CONTENT_SIZE * 1.5)
})
