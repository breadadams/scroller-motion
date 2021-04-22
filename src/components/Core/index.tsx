import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from 'react'

import { Context } from '../../context'
import { useCore } from '../../hooks'
import { CoreProps, CoreRef } from '../../types'

import { Wrap } from './Wrap'

// https://github.com/JedWatson/exenv/blob/master/index.js
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const DEFAULT_SCALE = 1

const DEFAULT_SPRING = {
  damping: 50,
  mass: 1.25,
  stiffness: 200
}

export const Core = forwardRef<CoreRef, CoreProps>(
  (
    {
      as,
      children,
      disabled,
      isElement,
      scale = DEFAULT_SCALE,
      spring = DEFAULT_SPRING,
      ...props
    },
    ref
  ) => {
    const [render, setRender] = useState(canUseDOM)
    const containerRef = useRef(null)
    const contentRef = useRef(null)

    const { height, width, scrollX, scrollY, x, y } = useCore({
      containerRef: containerRef,
      isElement,
      ref: contentRef,
      scale,
      spring
    })

    useImperativeHandle(ref, () => ({ scrollX, scrollY, x, y }), [
      scrollX,
      scrollY,
      x,
      y
    ])

    const isDisabled = useMemo(() => !render || disabled, [disabled, render])

    const contextValue = useMemo(() => ({ scrollX, scrollY, x, y }), [
      scrollX,
      scrollY,
      x,
      y
    ])

    useEffect(() => {
      setRender(true)
    }, [])

    return (
      <Wrap
        {...props}
        as={as}
        containerRef={containerRef}
        contentRef={contentRef}
        disabled={isDisabled}
        height={height}
        isElement={isElement}
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
