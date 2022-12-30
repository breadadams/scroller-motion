/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'

import { useSize } from '../useSize'

test('should return a `width` and `height`', () => {
  const el = document.createElement('div')
  const { result } = renderHook(() => useSize({ current: el }))

  expect(result.current.height).toBe(0)
  expect(result.current.width).toBe(0)
})
