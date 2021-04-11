import React, { useRef } from 'react'

import { useCore } from '@/hooks'
import { DivElementProps, OnUpdateProp, ScaleProp, SpringProp } from '@/types'

import Wrap from './Wrap'

export interface CoreProps extends DivElementProps {
  disabled?: boolean
  onUpdate?: OnUpdateProp
  scale?: ScaleProp
  spring?: SpringProp
}

const DEFAULT_SCALE = 1

const DEFAULT_SPRING = {
  damping: 50,
  mass: 1.25,
  stiffness: 200
}

const Core: React.FC<CoreProps> = ({
  children,
  disabled,
  onUpdate,
  scale = DEFAULT_SCALE,
  spring = DEFAULT_SPRING,
  ...props
}) => {
  const childrenRef = useRef(null)
  const { height, width, x, y } = useCore({
    onUpdate,
    ref: childrenRef,
    scale,
    spring
  })

  return (
    <Wrap
      {...props}
      childrenRef={childrenRef}
      disabled={disabled}
      height={height}
      width={width}
      x={x}
      y={y}
    >
      {children}
    </Wrap>
  )
}

export default Core
