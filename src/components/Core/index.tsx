import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react'

import { Context } from '../../context'
import { useCore } from '../../hooks'
import { CoreProps, CoreRef } from '../../types'

import { Wrap } from './Wrap'

const DEFAULT_SCALE = 1

const DEFAULT_SPRING = {
  damping: 50,
  mass: 1.25,
  stiffness: 200
}

export const Core = forwardRef<CoreRef, CoreProps>(
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

    const contextValue = useMemo(
      () => ({ scrollX, scrollY, x, y }),
      [scrollX, scrollY, x, y]
    )

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
        <Context.Provider value={contextValue}>{children}</Context.Provider>
      </Wrap>
    )
  }
)

Core.displayName = 'ScrollerMotion'
