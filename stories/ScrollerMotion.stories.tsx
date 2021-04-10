import React, { useState } from 'react'
import { useMotionValue } from 'framer-motion'

import ScrollerMotion from '../src'

import { ColorBlocks, CornerControls, Intro, ScrollMarker } from './parts'

export default {
  title: 'ScrollerMotion',
  component: ScrollerMotion
}

const CONTENTS_DISPLAY_NAME = 'StoryContents'
const STORY_PARAMETERS = {
  jsx: { filterProps: ['isEnabled', 'onToggleEnable'] }
}

/* Default Story */

const DefaultContents = () => (
  <>
    <Intro>
      The default appearance of <code>&lt;ScrollerMotion /&gt;</code>.<br />
      <br /> Try scrolling through this list of colors, you can click on each
      block to toggle its height.
    </Intro>

    <ColorBlocks />
  </>
)
DefaultContents.displayName = CONTENTS_DISPLAY_NAME

export const DefaultStory = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled}>
        <DefaultContents />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled((e) => !e)}
      />
    </>
  )
}
DefaultStory.storyName = 'Default'
DefaultStory.parameters = STORY_PARAMETERS

/* `scale` Story */

const ScaleContents = () => (
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
    <ColorBlocks />
  </>
)
ScaleContents.displayName = CONTENTS_DISPLAY_NAME

export const Scale = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled} scale={1.5}>
        <ScaleContents />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled(!enabled)}
      />
    </>
  )
}
Scale.parameters = STORY_PARAMETERS

/* `spring` Story */

const SpringContents = () => (
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
    <ColorBlocks />
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

  return (
    <>
      <ScrollerMotion disabled={!enabled} spring={CUSTOM_SPRING}>
        <SpringContents />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled(!enabled)}
      />
    </>
  )
}
Spring.parameters = STORY_PARAMETERS

/* `onUpdate` Story */

const OnUpdateContents: React.FC = () => (
  <>
    <Intro>
      The <code>onUpdate</code> props allows you to access the inner{' '}
      <code>MotionValue</code>'s for the scroll and the CSS transform.
    </Intro>
    <ColorBlocks />
  </>
)
OnUpdateContents.displayName = CONTENTS_DISPLAY_NAME

export const OnUpdate = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const scrollY = useMotionValue(0)
  const y = useMotionValue(0)

  const onUpdate = (payload) =>
    window.requestAnimationFrame(() => {
      scrollY.set(payload.scrollY.get())
      y.set(payload.y.get())
    })

  return (
    <>
      <ScrollerMotion disabled={!enabled} onUpdate={onUpdate}>
        <OnUpdateContents />

        {enabled && <ScrollMarker scrollY={scrollY} y={y} />}
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled(!enabled)}
      />
    </>
  )
}
OnUpdate.storyName = 'onUpdate'
OnUpdate.parameters = { ...STORY_PARAMETERS.jsx, showFunctions: false }
