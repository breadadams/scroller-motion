/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'

import { useCore } from './index'

test('should return an object', () => {
  const el = document.createElement('div')

  const { result } = renderHook(() =>
    useCore({ ref: { current: el }, scale: 1, spring: false })
  )

  expect(result.current.width).toBe(0)
  expect(result.current.height).toBe(0)
  expect(result.current.x.get()).toBe(0)
  expect(result.current.y.get()).toBe(0)
  expect(result.current.scrollX.get()).toBe(0)
  expect(result.current.scrollY.get()).toBe(0)
})
