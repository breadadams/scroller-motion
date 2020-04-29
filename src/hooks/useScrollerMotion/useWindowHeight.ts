import { useCallback, useEffect, useState } from 'react'

const getWindowHeight = (): number => window.innerHeight

const useWindowHeight = (): number => {
  const [height, setHeight] = useState(getWindowHeight())

  const onResize = useCallback(() => setHeight(getWindowHeight()), [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [onResize])

  return height
}

export default useWindowHeight
