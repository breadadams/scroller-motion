import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, MotionValue } from 'framer-motion'

interface Props {
  scrollX: MotionValue
  scrollY: MotionValue
}

const MarkerWrap = styled(motion.div)`
  background: #fff;
  box-shadow: 0 1px 6px rgba(29, 29, 29, 0.25);
  border-radius: 4px;
  position: fixed;
  left: 40px;
  top: 40px;
  padding: 4px 7px;
  font-size: 14px;
  line-height: 1.5;
  backface-visibility: hidden;
`

export const ScrollMarker: FC<Props> = ({ scrollX, scrollY }) => {
  const [scrollXRaw, setScrollXRaw] = useState(0)
  const [scrollYRaw, setScrollYRaw] = useState(0)

  useEffect(() => {
    const onChangeScrollX = () => setScrollXRaw(scrollX.get())
    const onChangeScrollY = () => setScrollYRaw(scrollY.get())

    const unsubScrollX = scrollX.onChange(onChangeScrollX)
    const unsubScrollY = scrollY.onChange(onChangeScrollY)

    return () => {
      unsubScrollX()
      unsubScrollY()
    }
  }, [scrollX, scrollY])

  return (
    <MarkerWrap style={{ x: scrollX, y: scrollY }}>
      scrollX: <code>{scrollXRaw}</code> <br />
      scrollY: <code>{scrollYRaw}</code>
    </MarkerWrap>
  )
}
