import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

import { ChildrenRef, DivElementProps, MotionValue } from '../../types'

interface Props extends DivElementProps {
  childrenRef: ChildrenRef
  disabled?: boolean
  height: number
  width: number
  x: MotionValue
  y: MotionValue
}

const FIXED_STYLE = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
}

export const Wrap: React.FC<Props> = ({
  children,
  childrenRef,
  disabled,
  height,
  style,
  width,
  x,
  y,
  ...props
}) => {
  const outerStyle = useMemo(
    () => ({ ...style, ...(!disabled ? { height, width } : {}) }),
    [disabled, height, style, width]
  )
  const fixedStyle = useMemo(() => (!disabled ? FIXED_STYLE : {}), [disabled])
  const motionStyle = useMemo(
    () => ({ x: !disabled ? x : 0, y: !disabled ? y : 0 }),
    [disabled, x, y]
  )

  return (
    <div {...props} style={outerStyle}>
      <div style={fixedStyle}>
        <motion.div style={motionStyle} ref={childrenRef}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
