import { useEffect, useState } from 'react'

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

export const useWindowSize = () => {
  const [size, setSize] = useState({ height: 0, width: 0 })

  useEffect(() => {
    const onResize = () => setSize(getWindowSize())

    onResize()
    window.addEventListener('resize', onResize, false)

    return () => window.removeEventListener('resize', onResize, false)
  }, [])

  return size
}
