import React, { Fragment, useRef } from 'react'

import { useScrollerMotion } from '@/hooks'
import { DivElementProps, ScaleProp, SpringProp } from '@/types'

import Wrap from './Wrap'

interface Props extends DivElementProps {
  disabled?: boolean
  scale?: ScaleProp
  spring?: SpringProp
}

const DEFAULT_SCALE = 1

const DEFAULT_SPRING = {
  mass: 1.25,
  stiffness: 200,
  damping: 50
}

const ScrollerMotion: React.FC<Props> = ({
  children,
  disabled,
  scale = DEFAULT_SCALE,
  spring = DEFAULT_SPRING,
  ...p
}) => {
  const childrenRef = useRef(null)
  const { height, y } = useScrollerMotion(childrenRef, scale, spring)

  if (disabled) {
    return <Fragment>{children}</Fragment>
  }

  const props = {
    ...p,
    childrenRef,
    height,
    y
  }

  return <Wrap {...props}>{children}</Wrap>
}

export default ScrollerMotion
