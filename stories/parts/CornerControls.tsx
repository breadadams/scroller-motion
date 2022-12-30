import React from 'react'
import styled from 'styled-components'

interface Props {
  isEnabled: boolean
  isVertical: boolean
  onToggleDirection: () => void
  onToggleEnable: () => void
}

const CornerButtons = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 10;
  backface-visibility: hidden;
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

const Emoji = styled.span`
  font-family: 'Segoe UI Emoji', 'Segoe UI Symbol';
`

const resetScroll = () => window.scrollTo({ left: 0, top: 0 })
const scrollDown = () => window.scrollBy({ top: 250, behavior: 'smooth' })
const scrollRight = () => window.scrollBy({ left: 250, behavior: 'smooth' })

export const CornerControls = ({
  isEnabled,
  isVertical,
  onToggleDirection,
  onToggleEnable
}: Props) => (
  <CornerButtons>
    <CornerButton
      onClick={() => {
        onToggleDirection()
        resetScroll()
      }}
    >
      <Emoji>{isVertical ? '↔️' : '↕️'}</Emoji>{' '}
      {isVertical ? 'Horizontal' : 'Vertical'}
    </CornerButton>

    <CornerButton onClick={onToggleEnable}>
      <Emoji>{isEnabled ? '🚫' : '✅'}</Emoji>{' '}
      {isEnabled ? 'Disable' : 'Enable'}
    </CornerButton>

    <CornerButton onClick={isVertical ? scrollDown : scrollRight}>
      <Emoji>{isVertical ? '👇' : '👉'}</Emoji> Scroll{' '}
      {isVertical ? 'Down' : 'Right'}
    </CornerButton>
  </CornerButtons>
)

CornerControls.displayName = 'Controls'
