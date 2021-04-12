import React, { useImperativeHandle, useRef } from 'react'

import { useCore } from '../hooks'
import { CoreProps, CoreRef } from '../types'

import { Wrap } from './Wrap'

const DEFAULT_SCALE = 1

const DEFAULT_SPRING = {
  damping: 50,
  mass: 1.25,
  stiffness: 200
}

export const Core = React.forwardRef<CoreRef, CoreProps>(
  (
    {
      children,
      disabled,
      scale = DEFAULT_SCALE,
      spring = DEFAULT_SPRING,
      ...props
    },
    ref
  ) => {
    const childrenRef = useRef(null)

    const { height, width, scrollX, scrollY, x, y } = useCore({
      ref: childrenRef,
      scale,
      spring
    })

    useImperativeHandle(ref, () => ({ scrollX, scrollY, x, y }), [
      scrollX,
      scrollY,
      x,
      y
    ])

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
)
