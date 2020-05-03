import React from 'react'
import styled from 'styled-components'
import { motion, MotionValue } from 'framer-motion'

const CornerButtons = styled(motion.div)`
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 10;
`

const CornerButton = styled.button`
  background: #fff;
  color: inherit;
  box-shadow: 0 1px 6px rgba(29, 29, 29, 0.25);
  border-radius: 4px;
  padding: 5px 14px 5px 12px;
  margin: 0;
  font-size: 15px;
  border: none;
  appearance: none;
  cursor: pointer;
  min-width: 102px;
  text-align: center;

  &:not(:last-child) {
    margin-right: 12px;
  }
`

export const CornerControls: React.FC<{
  isEnabled: boolean
  onToggleEnable: () => void
  yPos?: MotionValue
}> = ({ isEnabled, onToggleEnable, yPos }) => {
  const styles = isEnabled ? { y: yPos } : {}

  return (
    <CornerButtons style={styles}>
      <CornerButton onClick={onToggleEnable}>
        {isEnabled ? '🚫 Disable' : '✅ Enable'}
      </CornerButton>
      <CornerButton
        onClick={() => {
          window.scrollBy({
            top: 250,
            behavior: 'smooth'
          })
        }}
      >
        👇 Scroll Down
      </CornerButton>
    </CornerButtons>
  )
}

CornerControls.displayName = 'Controls'
