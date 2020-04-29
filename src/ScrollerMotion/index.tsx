import React, { Fragment } from 'react'

import Core, { CoreProps } from './Core'

interface Props extends CoreProps {
  disabled?: boolean
}

const ScrollerMotion: React.FC<Props> = ({ children, disabled, ...props }) => {
  if (disabled) {
    return <Fragment>{children}</Fragment>
  }

  return <Core {...props}>{children}</Core>
}

export default ScrollerMotion
