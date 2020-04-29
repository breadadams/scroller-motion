import React from 'react'
import styled from 'styled-components'
import { motion, useCycle, Variants } from 'framer-motion'

// Example Story contents

const SECTION_VARIANTS: Variants = {
  default: {
    height: '250px'
  },
  expanded: {
    height: '500px'
  }
}

const SectionsWrap = styled.div`
  padding: 30px;
`

const Section = styled(motion.section)`
  box-shadow: 0 4px 12px rgba(29, 29, 29, 0.175);
  cursor: pointer;
  border-radius: 10px;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

const StorySection: React.FC<{ background: string }> = ({ background }) => {
  const [variant, cycleVariant] = useCycle('default', 'expanded')

  return (
    <Section
      variants={SECTION_VARIANTS}
      onClick={() => cycleVariant()}
      style={{ background }}
      initial={false}
      animate={variant}
    />
  )
}

const bgs: string[] = [
  'teal',
  'darkorange',
  'palevioletred',
  'steelblue',
  'indianred',
  'gold',
  'thistle',
  'darkseagreen',
  'rosybrown',
  'cadetblue',
  'darkslateblue',
  'lightsalmon',
  'firebrick',
  'palegreen',
  'khaki',
  'pink'
]

export const StorySections: React.FC = () => (
  <SectionsWrap>
    {bgs.map((bg) => (
      <StorySection key={bg} background={bg} />
    ))}
  </SectionsWrap>
)

// Story Corner Controls

const CornerButtons = styled.div`
  position: fixed;
  top: 40px;
  right: 40px;
  z-index: 10;
`

const CornerButton = styled.button`
  padding: 5px 14px 5px 12px;
  font-size: 15px;
  border: none;
  appearance: none;
  background: white;
  color: black;
  box-shadow: 0 1px 6px rgba(29, 29, 29, 0.25);
  cursor: pointer;
  border-radius: 4px;
  min-width: 102px;
  text-align: center;

  &:not(:last-child) {
    margin-right: 12px;
  }
`

export const StoryControls: React.FC<{
  isEnabled: boolean
  onToggleEnable: () => void
}> = ({ isEnabled, onToggleEnable }) => (
  <CornerButtons>
    <CornerButton onClick={onToggleEnable}>
      {isEnabled ? '🧯 Disable' : '🔥 Enable'}
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
