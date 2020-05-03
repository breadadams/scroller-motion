import React, { useRef } from 'react'

import { useScrollerMotion } from '@/hooks'
import { DivElementProps, OnUpdateProp, ScaleProp, SpringProp } from '@/types'

import Wrap from './Wrap'

export interface CoreProps extends DivElementProps {
  onUpdate?: OnUpdateProp
  scale?: ScaleProp
  spring?: SpringProp
}

const DEFAULT_SCALE = 1

const DEFAULT_SPRING = {
  mass: 1.25,
  stiffness: 200,
  damping: 50
}

const Core: React.FC<CoreProps> = ({
  children,
  onUpdate,
  scale = DEFAULT_SCALE,
  spring = DEFAULT_SPRING,
  ...p
}) => {
  const childrenRef = useRef(null)
  const { height, y } = useScrollerMotion({
    onUpdate,
    ref: childrenRef,
    scale,
    spring
  })

  const props = {
    ...p,
    childrenRef,
    height,
    y
  }

  return <Wrap {...props}>{children}</Wrap>
}

export default Core