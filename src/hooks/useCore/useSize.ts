import { useCallback, useEffect, useState } from 'react'
import debounceFn from 'debounce-fn'

import { ChildrenRef } from '../../types'

const getSize = (el: HTMLElement) => ({
  height: el?.scrollHeight ?? 0,
  width: el?.scrollWidth ?? 0
})

export const useSize = (ref: ChildrenRef) => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  const onResize = useCallback(() => {
    if (ref.current) {
      setSize(getSize(ref.current))
    }
  }, [])

  useEffect(() => {
    if (ref.current) {
      onResize()

      const supportsResizeObserver = typeof ResizeObserver === 'function'
      let resizeObserver: ResizeObserver | null = null

      const debouncedOnResize = debounceFn(onResize, { wait: 400 })

      window.addEventListener('resize', debouncedOnResize, false)

      if (supportsResizeObserver) {
        resizeObserver = new ResizeObserver(onResize)
        resizeObserver.observe(ref.current)
      }

      return () => {
        window.removeEventListener('resize', debouncedOnResize, false)

        if (supportsResizeObserver && resizeObserver) {
          resizeObserver.disconnect()
        }
      }
    }
  }, [onResize])

  return size
}
