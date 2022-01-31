import { FC, useCallback, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { motion, useCycle, Variants } from 'framer-motion'

interface BlocksProps {
  isVertical?: boolean
}

interface ColorProps {
  background: string
  isVertical?: boolean
}

const COLOR_HORIZONTAL_VARIANTS: Variants = {
  default: {
    width: '250px',
    height: '300px'
  },
  expanded: {
    width: '500px',
    height: '300px'
  }
}

const COLOR_VERTICAL_VARIANTS: Variants = {
  default: {
    height: '250px',
    width: '100%'
  },
  expanded: {
    height: '500px',
    width: '100%'
  }
}

const ColorsWrap = styled.div<BlocksProps>`
  padding: 0 30px 30px;
  display: flex;
  flex-direction: ${({ isVertical }) => (isVertical ? 'column' : 'row')};

  &::after {
    content: '';
    display: ${({ isVertical }) => (isVertical ? 'none' : 'block')};
    flex: 0 0 30px;
  }
`

const Color = styled(motion.section)<ColorProps>`
  box-shadow: 0 4px 12px rgba(29, 29, 29, 0.175);
  background: ${({ background }) => background};
  cursor: pointer;
  border-radius: 10px;
  flex: 1 0 auto;

  &:not(:last-child) {
    ${({ isVertical }) =>
      isVertical
        ? css`
            margin-bottom: 30px;
          `
        : css`
            margin-right: 30px;
          `};
  }
`

const ColorSection: FC<ColorProps> = ({ background, isVertical }) => {
  const [variant, cycleVariant] = useCycle('default', 'expanded')
  const onClick = useCallback(() => cycleVariant(), [cycleVariant])
  const variants = useMemo(
    () => (isVertical ? COLOR_VERTICAL_VARIANTS : COLOR_HORIZONTAL_VARIANTS),
    [isVertical]
  )

  return (
    <Color
      animate={variant}
      background={background}
      initial={false}
      isVertical={isVertical}
      onClick={onClick}
      variants={variants}
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

export const ColorBlocks: FC<BlocksProps> = ({ isVertical = true }) => (
  <ColorsWrap isVertical={isVertical}>
    {bgs.map((bg) => (
      <ColorSection key={bg} background={bg} isVertical={isVertical} />
    ))}
  </ColorsWrap>
)
