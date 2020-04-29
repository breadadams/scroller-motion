import { useCallback, useLayoutEffect, useState } from 'react'
import debounceFn from 'debounce-fn'

import { ChildrenRef } from '@/types'

const getHeight = (el: HTMLElement): number => {
  const { height = 0 } = el?.getBoundingClientRect() ?? {}

  return height
}

type UseResizeListeners = (ref: ChildrenRef, onResize: () => void) => void

const useResizeListeners: UseResizeListeners = (ref, onResize) => {
  useLayoutEffect(() => {
    const { current: el } = ref

    if (el) {
      onResize()

      const supportsResizeObserver = typeof ResizeObserver === 'function'
      let resizeObserver: ResizeObserver | null = null

      const debouncedOnResize = debounceFn(onResize, { wait: 400 })

      window.addEventListener('resize', debouncedOnResize, false)

      if (supportsResizeObserver) {
        resizeObserver = new ResizeObserver(onResize)
        resizeObserver.observe(el)
      }

      return () => {
        window.removeEventListener('resize', debouncedOnResize, false)

        if (supportsResizeObserver && resizeObserver) {
          resizeObserver.disconnect()
        }
      }
    }
  }, [ref.current, onResize])
}

type UseHeight = (ref: ChildrenRef) => number

const useHeight: UseHeight = (ref) => {
  const [height, setHeight] = useState(0)

  const updateHeight = useCallback(() => {
    if (ref.current) {
      setHeight(getHeight(ref.current))
    }
  }, [ref.current])

  useResizeListeners(ref, updateHeight)

  return height
}

export default useHeight