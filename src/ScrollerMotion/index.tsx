import React, { useEffect, useMemo, useState } from 'react'

import { CoreProps, CoreRef } from '../types'
import { Core } from './Core'

// https://github.com/JedWatson/exenv/blob/master/index.js
const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const ScrollerMotion = React.forwardRef<CoreRef, CoreProps>(
  ({ children, disabled, ...props }, ref) => {
    const [render, setRender] = useState(canUseDOM)

    const isDisabled = useMemo(() => !render || disabled, [disabled, render])

    useEffect(() => {
      setRender(true)
    }, [])

    return (
      <Core {...props} disabled={isDisabled} ref={ref}>
        {children}
      </Core>
    )
  }
)
