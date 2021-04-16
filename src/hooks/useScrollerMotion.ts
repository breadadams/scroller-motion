import { useContext } from 'react'

import { Context } from '../context'

export const useScrollerMotion = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error('useScrollerMotion must be used within ScrollerMotion')
  }

  return context
}
