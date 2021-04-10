import { useLayoutEffect, useState } from 'react'
import actual from 'actual'

const useWindowHeight = (): number => {
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const onResize = () => setHeight(actual('height', 'px'))

    onResize()
    window.addEventListener('resize', onResize, false)

    return () => window.removeEventListener('resize', onResize, false)
  }, [])

  return height
}

export default useWindowHeight
