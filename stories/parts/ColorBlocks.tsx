import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { motion, useCycle, Variants } from 'framer-motion'

const COLOR_VARIANTS: Variants = {
  default: {
    height: '250px'
  },
  expanded: {
    height: '500px'
  }
}

const ColorsWrap = styled.div`
  padding: 0 30px 30px;
`

const Color = styled(motion.section)`
  box-shadow: 0 4px 12px rgba(29, 29, 29, 0.175);
  cursor: pointer;
  border-radius: 10px;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

const ColorSection: React.FC<{ background: string }> = ({ background }) => {
  const [variant, cycleVariant] = useCycle('default', 'expanded')
  const onClick = useCallback(() => cycleVariant(), [cycleVariant])
  const style = useMemo(() => ({ background }), [background])

  return (
    <Color
      variants={COLOR_VARIANTS}
      onClick={onClick}
      style={style}
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

export const ColorBlocks: React.FC = () => (
  <ColorsWrap>
    {bgs.map((bg) => (
      <ColorSection key={bg} background={bg} />
    ))}
  </ColorsWrap>
)
