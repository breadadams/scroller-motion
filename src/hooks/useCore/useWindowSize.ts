import { useLayoutEffect, useState } from 'react'
import actual from 'actual'

import { DOMSize } from '@/types'

export const useWindowSize = (): DOMSize => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  useLayoutEffect(() => {
    const onResize = () =>
      setSize({
        height: actual('height', 'px'),
        width: actual('width', 'px')
      })

    onResize()
    window.addEventListener('resize', onResize, false)

    return () => window.removeEventListener('resize', onResize, false)
  }, [])

  return size
}
