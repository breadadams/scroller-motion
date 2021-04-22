import { useEffect, useState } from 'react'

import { ElementRef } from '../../types'

const getElementSize = (element?: HTMLElement | null) => {
  return {
    width: element?.clientWidth ?? 0,
    height: element?.clientHeight ?? 0
  }
}

const getWindowSize = () => ({
  width:
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
  height:
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
})

/*
 * Returns the width & height of the container,
 * if `isElement` is falsy the `window` is considered the container.
 */
export const useContainerSize = (ref: ElementRef, isElement?: boolean) => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  useEffect(() => {
    const onResize = () =>
      setSize(!isElement ? getWindowSize() : getElementSize(ref.current))

    onResize()
    window.addEventListener('resize', onResize, false)

    return () => window.removeEventListener('resize', onResize, false)
  }, [])

  return size
}
