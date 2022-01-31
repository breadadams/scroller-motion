import { renderHook } from '@testing-library/react-hooks'

import { useSpringScroll } from '../useSpringScroll'

test('should return an `x` and `y`', () => {
  const { result } = renderHook(() => useSpringScroll(undefined))

  expect(result.current.x.get()).toBe(0)
  expect(result.current.y.get()).toBe(0)
})
