import { FC, RefObject, useMemo } from 'react'
import { motion } from 'framer-motion'

import {
  ElementRef,
  CoreProps,
  DivElementProps,
  MotionValue
} from '../../types'

interface Props extends Exclude<CoreProps, 'scale | spring'>, DivElementProps {
  containerRef: ElementRef
  contentRef: ElementRef
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

const ABSOLUTE_STYLE = {
  ...FIXED_STYLE,
  position: 'absolute'
}

export const Wrap: FC<Props> = ({
  as: Component = 'div',
  children,
  containerRef,
  contentRef,
  disabled,
  height,
  isElement,
  style,
  width,
  x,
  y,
  ...props
}) => {
  const containerStyle = useMemo(() => {
    if (!disabled) {
      return {
        ...style,
        ...(!isElement ? { height, width } : { position: 'relative' })
      }
    }

    return style
  }, [disabled, height, isElement, style, width])

  const containerInnerStyle = useMemo(() => {
    if (!disabled && isElement) {
      return { height: height / 2, width: width / 2 }
    }

    return {}
  }, [disabled, height, isElement, width])

  const contentFrameStyle = useMemo(() => {
    if (!disabled) {
      return !isElement ? FIXED_STYLE : ABSOLUTE_STYLE
    }

    return {}
  }, [disabled, isElement])

  const contentStyle = useMemo(
    () => ({ x: !disabled ? x : 0, y: !disabled ? y : 0 }),
    [disabled, x, y]
  )

  return (
    <Component {...props} ref={containerRef} style={containerStyle}>
      <div style={containerInnerStyle}>
        <div style={contentFrameStyle}>
          <motion.div
            style={contentStyle}
            ref={contentRef as RefObject<HTMLDivElement>}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </Component>
  )
}
