import { useEffect, useState } from 'react'
import debounceFn from 'debounce-fn'

import { ChildrenRef } from '../../types'

const getSize = (el: HTMLElement | null) => ({
  height: el?.scrollHeight ?? 0,
  width: el?.scrollWidth ?? 0
})

const supportsResizeObserver = typeof ResizeObserver === 'function'

export const useSize = (ref: ChildrenRef) => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  useEffect(() => {
    const onResize = () => setSize(getSize(ref.current))
    const debouncedOnResize = debounceFn(onResize, { wait: 400 })
    let resizeObserver: ResizeObserver | null = null

    if (ref.current) {
      onResize()
      window.addEventListener('resize', debouncedOnResize)

      if (supportsResizeObserver) {
        resizeObserver = new ResizeObserver(onResize)
        resizeObserver.observe(ref.current)
      }
    }

    return () => {
      window.removeEventListener('resize', debouncedOnResize)

      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return size
}
