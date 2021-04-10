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

const DefaultStoryContents = () => (
  <>
    <Intro>
      The default appearance of <code>&lt;ScrollerMotion /&gt;</code>.<br />
      <br /> Try scrolling through this list of colors, you can click on each
      block to toggle it's height.
    </Intro>

    <ColorBlocks />
  </>
)
DefaultStoryContents.displayName = CONTENTS_DISPLAY_NAME

export const DefaultStory = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled}>
        <DefaultStoryContents />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled((e) => !e)}
      />
    </>
  )
}
DefaultStory.story = { name: 'Default', parameters: STORY_PARAMETERS }

/* `scale` Story */

const ScaleStoryContents = () => (
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
ScaleStoryContents.displayName = CONTENTS_DISPLAY_NAME

export const CustomScale = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled} scale={1.5}>
        <ScaleStoryContents />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled(!enabled)}
      />
    </>
  )
}
CustomScale.story = { parameters: STORY_PARAMETERS }

/* `spring` Story */

const CustomSpringContents = () => (
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
CustomSpringContents.displayName = CONTENTS_DISPLAY_NAME

const CUSTOM_SPRING = {
  damping: 50,
  mass: 10,
  stiffness: 100
}

export const CustomSpring = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)

  return (
    <>
      <ScrollerMotion disabled={!enabled} spring={CUSTOM_SPRING}>
        <CustomSpringContents />
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled(!enabled)}
      />
    </>
  )
}
CustomSpring.story = { parameters: STORY_PARAMETERS }

/* `onUpdate` Story */

const WithOnUpdateContents: React.FC = () => (
  <>
    <Intro>
      The <code>onUpdate</code> props allows you to access the inner{' '}
      <code>MotionValue</code>'s for the scroll and the CSS transform.
    </Intro>
    <ColorBlocks />
  </>
)
WithOnUpdateContents.displayName = CONTENTS_DISPLAY_NAME

export const WithOnUpdate = (): JSX.Element => {
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
        <WithOnUpdateContents />

        {enabled && <ScrollMarker scrollY={scrollY} y={y} />}
      </ScrollerMotion>

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => setEnabled(!enabled)}
      />
    </>
  )
}
WithOnUpdate.story = {
  parameters: { jsx: { ...STORY_PARAMETERS.jsx, showFunctions: false } }
}
