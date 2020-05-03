import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { motion, MotionValue } from 'framer-motion'

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
`

export const ScrollMarker: React.FC<{
  scrollY: MotionValue
  y: MotionValue
}> = ({ scrollY, y }) => {
  const [scrollRaw, setScrollRaw] = useState(0)
  const [yRaw, setYRaw] = useState(0)

  useEffect(() => {
    const onChangeScroll = () => setScrollRaw(scrollY.get())
    const onChangeY = () => setYRaw(y.get())

    const unsubScroll = scrollY.onChange(onChangeScroll)
    const unsubY = y.onChange(onChangeY)

    return () => {
      unsubScroll()
      unsubY()
    }
  }, [scrollY, y])

  return (
    <MarkerWrap style={{ y: scrollY }}>
      <code>scrollY: {scrollRaw}px</code> <br />
      <code>y: {yRaw}px</code>
    </MarkerWrap>
  )
}
