import { createContext } from 'react'

import { ScrollerMotionValues } from './types'

export const Context = createContext<ScrollerMotionValues | undefined>(
  undefined
)
