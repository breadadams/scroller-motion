import React, { Fragment, useEffect, useState } from 'react'

import Core, { CoreProps } from './Core'

const ScrollerMotion: React.FC<CoreProps> = ({ children, ...props }) => {
  const [render, setRender] = useState(false)

  useEffect(() => {
    setRender(true)
  }, [])

  if (!render) {
    return <Fragment>{children}</Fragment>
  }

  return <Core {...props}>{children}</Core>
}

export default ScrollerMotion
