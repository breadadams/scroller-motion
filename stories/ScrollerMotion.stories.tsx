import { FC, useEffect, useRef, useState } from 'react'
import { useMotionValue } from 'framer-motion'
import LinkTo from '@storybook/addon-links/react'

import { ScrollerMotion, ScrollerMotionRef, useScrollerMotion } from '../src'

import { ColorBlocks, CornerControls, Intro, ScrollMarker } from './parts'

export default {
  title: 'ScrollerMotion',
  component: ScrollerMotion
}

const CONTENTS_DISPLAY_NAME = 'StoryContents'
const STORY_PARAMETERS = {
  jsx: {
    filterProps: [
      'isEnabled',
      'isVertical',
      'onToggleDirection',
      'onToggleEnable'
    ]
  }
}

type ContentsType = FC<{ isVertical: boolean }>

/* Default Story */

const DefaultContents: ContentsType = ({ isVertical }) => (
  <>
    <Intro>
      The default appearance of <code>&lt;ScrollerMotion /&gt;</code>.<br />
      <br /> Try scrolling through this list of colors, you can click on each
      block to toggle its size.
    </Intro>

    <ColorBlocks isVertical={isVertical} />
  </>
)
DefaultContents.displayName = CONTENTS_DISPLAY_NAME

export const DefaultStory = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [isVertical, setIsVertical] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled}>
        <DefaultContents isVertical={isVertical} />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        isVertical={isVertical}
        onToggleDirection={() => setIsVertical((v) => !v)}
        onToggleEnable={() => setEnabled((e) => !e)}
      />
    </>
  )
}
DefaultStory.storyName = 'Default'
DefaultStory.parameters = STORY_PARAMETERS

/* `scale` Story */

const ScaleContents: ContentsType = ({ isVertical }) => (
  <>
    <Intro>
      Custom <code>scale</code> prop.
      <br />
      <br />
      This increases the scrollable length of the page{' '}
      <span style={{ whiteSpace: 'nowrap' }}>
        (<code>pageHeight * scale</code>)
      </span>
      , resulting in a <em>slow scroll</em> experience.
    </Intro>
    <ColorBlocks isVertical={isVertical} />
  </>
)
ScaleContents.displayName = CONTENTS_DISPLAY_NAME

export const Scale = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [isVertical, setIsVertical] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled} scale={1.5}>
        <ScaleContents isVertical={isVertical} />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        isVertical={isVertical}
        onToggleDirection={() => setIsVertical((v) => !v)}
        onToggleEnable={() => setEnabled((e) => !e)}
      />
    </>
  )
}
Scale.parameters = STORY_PARAMETERS

/* `spring` Story */

const SpringContents: ContentsType = ({ isVertical }) => (
  <>
    <Intro>
      Custom <code>spring</code> prop.
      <br />
      <br />
      This allows for a custom scroll motion, the API for this prop is that of{' '}
      <a href="https://www.framer.com/api/motion/types/#spring" target="_blank">
        framer-motion's spring
      </a>
      .
    </Intro>
    <ColorBlocks isVertical={isVertical} />
  </>
)
SpringContents.displayName = CONTENTS_DISPLAY_NAME

const CUSTOM_SPRING = {
  damping: 50,
  mass: 10,
  stiffness: 100
}

export const Spring = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [isVertical, setIsVertical] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled} spring={CUSTOM_SPRING}>
        <SpringContents isVertical={isVertical} />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        isVertical={isVertical}
        onToggleDirection={() => setIsVertical((v) => !v)}
        onToggleEnable={() => setEnabled((e) => !e)}
      />
    </>
  )
}
Spring.parameters = STORY_PARAMETERS

/* Motion Listeners Story */

const MotionListenersContents: ContentsType = ({ isVertical }) => (
  <>
    <Intro>
      Event listeners via the <code>ref</code> prop.
      <br />
      <br />
      To attach listeners, you can obtain the inner <code>
        MotionValue
      </code>{' '}
      values for the scroll and the CSS transform via the <code>ref</code> on{' '}
      <code>{'<ScrollerMotion />'}</code>. Alternatively, see {/* @ts-ignore */}
      <LinkTo story="use-scroller-motion">useScrollerMotion</LinkTo>.{' '}
    </Intro>
    <ColorBlocks isVertical={isVertical} />
  </>
)
MotionListenersContents.displayName = CONTENTS_DISPLAY_NAME

export const MotionListeners = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [isVertical, setIsVertical] = useState(true)

  const scrollerMotion = useRef<ScrollerMotionRef>()
  const scrollX = useMotionValue(0)
  const scrollY = useMotionValue(0)

  useEffect(() => {
    const listeners: Array<(() => void) | undefined> = []

    if (scrollerMotion.current) {
      listeners.push(
        scrollerMotion.current.scrollX.onChange((e) => scrollX.set(e))
      )
      listeners.push(
        scrollerMotion.current.scrollY.onChange((e) => scrollY.set(e))
      )
    }

    return () => listeners.forEach((func) => func && func())
  }, [scrollX, scrollY])

  return (
    <>
      <ScrollerMotion disabled={!enabled} ref={scrollerMotion}>
        <MotionListenersContents isVertical={isVertical} />

        {enabled && <ScrollMarker scrollX={scrollX} scrollY={scrollY} />}
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        isVertical={isVertical}
        onToggleDirection={() => setIsVertical((v) => !v)}
        onToggleEnable={() => setEnabled((e) => !e)}
      />
    </>
  )
}
MotionListeners.parameters = {
  jsx: {
    filterProps: [...STORY_PARAMETERS.jsx.filterProps, 'scrollX', 'scrollY'],
    showFunctions: false
  }
}

/* `useScrollerMotion` Story */

const UseScrollerMotionContents: ContentsType = ({ isVertical }) => (
  <>
    <Intro>
      Reading values via the <code>useScrollerMotion</code> hook.
      <br />
      <br />
      Same example as <em>Motion Listeners</em>, however here the{' '}
      <code>{'<ScrollMarker />'}</code> component obtains its values via the
      hook (using Context API).
    </Intro>
    <ColorBlocks isVertical={isVertical} />
  </>
)
UseScrollerMotionContents.displayName = CONTENTS_DISPLAY_NAME

const ContextScrollMarker = () => {
  const { scrollX, scrollY } = useScrollerMotion()

  return <ScrollMarker scrollX={scrollX} scrollY={scrollY} />
}

export const UseScrollerMotion = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [isVertical, setIsVertical] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled}>
        <UseScrollerMotionContents isVertical={isVertical} />

        {enabled && <ContextScrollMarker />}
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        isVertical={isVertical}
        onToggleDirection={() => setIsVertical((v) => !v)}
        onToggleEnable={() => setEnabled((e) => !e)}
      />
    </>
  )
}
UseScrollerMotion.storyName = 'useScrollerMotion'
UseScrollerMotion.parameters = STORY_PARAMETERS
