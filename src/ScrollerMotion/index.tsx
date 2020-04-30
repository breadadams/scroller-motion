import React, { Fragment, useEffect, useState } from 'react'

import Core, { CoreProps } from './Core'

interface Props extends CoreProps {
  disabled?: boolean
}

const ScrollerMotion: React.FC<Props> = ({ children, disabled, ...props }) => {
  const [render, setRender] = useState(false)

  useEffect(() => {
    setRender(true)
  }, [])

  if (!render || disabled) {
    return <Fragment>{children}</Fragment>
  }

  return <Core {...props}>{children}</Core>
}

export default ScrollerMotion
