import { useCallback, useEffect, useState } from 'react'
import actual from 'actual'

const useWindowHeight = (): number => {
  const [height, setHeight] = useState(0)

  const onResize = useCallback(() => setHeight(actual('height', 'px')), [])

  useEffect(() => {
    onResize()

    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [onResize])

  return height
}

export default useWindowHeight
