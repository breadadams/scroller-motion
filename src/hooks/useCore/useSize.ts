import { useCallback, useLayoutEffect, useState } from 'react'
import debounceFn from 'debounce-fn'

import { ChildrenRef, DOMSize } from '@/types'

const getSize = (el: HTMLElement): DOMSize => ({
  height: el?.scrollHeight ?? 0,
  width: el?.scrollWidth ?? 0
})

const useResizeListeners = (ref: ChildrenRef, onResize: () => void) => {
  useLayoutEffect(() => {
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
}

export const useSize = (ref: ChildrenRef): DOMSize => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  const updateSize = useCallback(() => {
    if (ref.current) {
      setSize(getSize(ref.current))
    }
  }, [])

  useResizeListeners(ref, updateSize)

  return size
}
