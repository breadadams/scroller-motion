import { FC, useMemo } from 'react'
import styled, { css } from 'styled-components'
import LinkTo from '@storybook/addon-links/react'

const IntroWrap = styled.header`
  padding: 40px 40px 20px;
`

const EMOJI_WRAP_SIZE = '100px'

const EmojiWrap = styled.div`
  width: ${EMOJI_WRAP_SIZE};
  height: ${EMOJI_WRAP_SIZE};
  line-height: ${EMOJI_WRAP_SIZE};
  box-shadow: 0 2px 12px rgba(180, 200, 48, 0.5);
  margin: 0 auto 20px;
  font-size: 54px;
  text-align: center;
  border-radius: 8px;
  user-select: none;
  background: #fff;
`

const IntroTitle = styled.h1`
  text-align: center;
  font-size: 46px;
  margin: 0 0 20px;
`

const Badges = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

const StoryNav = styled.nav`
  margin-bottom: 40px;
  text-align: center;
`

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const NavItem = styled.li`
  margin-bottom: 5px;

  &:not(:last-child) {
    &::after {
      content: '·';
      margin: 0 5px;
    }
  }
`

// @ts-ignore
const StoryLink = styled(({ isActive, ...props }) => <LinkTo {...props} />)`
  font-weight: 600;

  ${({ isActive = false }) =>
    css`
      color: ${isActive ? 'inherit' : '#b3c830'};
      text-decoration: ${isActive ? 'none' : 'underline'};
    `}
`

const IntroBody = styled.p`
  font-size: 18px;
  line-height: 1.35;
  width: 480px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  code {
    display: inline-block;
    padding: 2px 4px 1px;
    background: #b3c830;
    color: #fff;
    font-size: 0.9rem;
    border-radius: 3px;
  }

  a {
    color: inherit;
  }
`

const storyLinks = [
  { label: 'Default', path: 'default-story' },
  { label: 'Slow Scroll', path: 'scale' },
  { label: 'Custom Spring', path: 'spring' },
  { label: 'Custom Element', path: 'is-element' },
  { label: 'Motion Listeners', path: 'motion-listeners' },
  { label: 'useScrollerMotion', path: 'use-scroller-motion' }
]

const IntroLink: FC<{ path: string }> = ({ children, path }) => {
  const isActive = useMemo(() => window.location.href.includes(path), [path])

  return (
    <NavItem>
      <StoryLink isActive={isActive} story={path}>
        {children}
      </StoryLink>
    </NavItem>
  )
}

export const Intro: FC = ({ children }) => (
  <IntroWrap>
    <EmojiWrap>🛹</EmojiWrap>
    <IntroTitle>scroller-motion</IntroTitle>

    <Badges>
      <a href="https://www.npmjs.com/package/scroller-motion" target="_blank">
        <img
          src="https://img.shields.io/npm/v/scroller-motion?style=flat-square"
          alt="NPM Package Version"
        />
      </a>{' '}
      <a href="https://github.com/wombak/scroller-motion" target="_blank">
        <img
          src="https://img.shields.io/github/stars/wombak/scroller-motion?style=social"
          alt="Scroller-motion Repo stars"
        />
      </a>
    </Badges>

    <StoryNav>
      <NavList>
        {storyLinks.map((l) => (
          <IntroLink key={l.path} path={l.path}>
            {l.label}
          </IntroLink>
        ))}
      </NavList>
    </StoryNav>

    <IntroBody>{children}</IntroBody>
  </IntroWrap>
)
