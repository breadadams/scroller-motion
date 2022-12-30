/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react'
import { act } from 'react-test-renderer'

import { useWindowSize } from '../useWindowSize'

const WIDTH = 1024
const HEIGHT = 768

const WIDTH_1 = 600
const HEIGHT_1 = 400

test('should return a `width` and `height`', () => {
  const { result } = renderHook(() => useWindowSize())

  expect(result.current.width).toBe(WIDTH)
  expect(result.current.height).toBe(HEIGHT)
})

test('should detect resizes', () => {
  const { result } = renderHook(() => useWindowSize())

  expect(result.current.width).toBe(WIDTH)
  expect(result.current.height).toBe(HEIGHT)

  act(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: WIDTH_1
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: HEIGHT_1
    })

    window.dispatchEvent(new Event('resize'))
  })

  expect(result.current.width).toBe(WIDTH_1)
  expect(result.current.height).toBe(HEIGHT_1)
})
