import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { motion, MotionValue } from 'framer-motion'

interface Props {
  scrollX: MotionValue
  scrollY: MotionValue
  x: MotionValue
  y: MotionValue
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

export const ScrollMarker: React.FC<Props> = ({ scrollX, scrollY, x, y }) => {
  const [scrollXRaw, setScrollXRaw] = useState(0)
  const [scrollYRaw, setScrollYRaw] = useState(0)
  const [xRaw, setXRaw] = useState(0)
  const [yRaw, setYRaw] = useState(0)

  useEffect(() => {
    const onChangeScrollX = () => setScrollXRaw(scrollX.get())
    const onChangeScrollY = () => setScrollYRaw(scrollY.get())
    const onChangeX = () => setXRaw(x.get())
    const onChangeY = () => setYRaw(y.get())

    const unsubScrollX = scrollX.onChange(onChangeScrollX)
    const unsubScrollY = scrollY.onChange(onChangeScrollY)
    const unsubX = x.onChange(onChangeX)
    const unsubY = y.onChange(onChangeY)

    return () => {
      unsubScrollX()
      unsubScrollY()
      unsubX()
      unsubY()
    }
  }, [scrollY, y])

  return (
    <MarkerWrap style={{ x: scrollX, y: scrollY }}>
      <code>scrollX: {scrollXRaw}px</code> <br />
      <code>scrollY: {scrollYRaw}px</code> <br />
      <code>x: {xRaw}px</code> <br />
      <code>y: {yRaw}px</code>
    </MarkerWrap>
  )
}
