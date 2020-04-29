import React from 'react'
import { motion } from 'framer-motion'

import { ChildrenRef, DivElementProps, MotionValue } from '@/types'

interface Props extends DivElementProps {
  childrenRef: ChildrenRef
  height: number
  y: MotionValue
}

const Wrap: React.FC<Props> = ({
  children,
  childrenRef,
  height,
  y,
  ...props
}) => {
  const { style, ...rest } = props

  return (
    <div {...props} style={{ ...style, height }}>
      <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0 }}>
        <motion.div style={{ y }} ref={childrenRef}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}

export default Wrap
