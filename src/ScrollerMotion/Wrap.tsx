import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

import { ChildrenRef, DivElementProps, MotionValue } from '@/types'

interface Props extends DivElementProps {
  childrenRef: ChildrenRef
  disabled?: boolean
  height: number
  y: MotionValue
}

const FIXED_STYLE = {
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
}

const Wrap: React.FC<Props> = ({
  children,
  childrenRef,
  disabled,
  height,
  style,
  y,
  ...props
}) => {
  const outerStyle = useMemo(
    () => ({ ...style, ...(!disabled ? { height } : {}) }),
    [disabled, height, style]
  )
  const fixedStyle = useMemo(() => (!disabled ? FIXED_STYLE : {}), [disabled])
  const motionStyle = useMemo(() => ({ y: !disabled ? y : 0 }), [disabled, y])

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

export default Wrap
