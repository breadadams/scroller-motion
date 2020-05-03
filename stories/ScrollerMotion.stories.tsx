import React, { useCallback, useState } from 'react'
import { useMotionValue, MotionValue } from 'framer-motion'

import ScrollerMotion from '../src'
import { OnUpdateProp } from '../src/types'

import { ColorBlocks, CornerControls, Intro, ScrollMarker } from './parts'

const useYListener = (): [MotionValue, OnUpdateProp] => {
  const innerY = useMotionValue(0)

  const onUpdate = useCallback(
    ({ y }) => window.requestAnimationFrame(() => innerY.set(y.get() * -1)),
    [innerY]
  )

  return [innerY, onUpdate]
}

export default {
  title: 'ScrollerMotion',
  component: ScrollerMotion
}

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
DefaultStoryContents.displayName = 'StoryContents'

export const DefaultStory = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [y, onUpdate] = useYListener()

  return (
    <ScrollerMotion disabled={!enabled} onUpdate={onUpdate}>
      <DefaultStoryContents />

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => {
          setEnabled(!enabled)
        }}
        yPos={y}
      />
    </ScrollerMotion>
  )
}
DefaultStory.story = {
  name: 'Default',
  parameters: {
    jsx: {
      filterProps: ['isEnabled', 'onToggleEnable', 'onUpdate', 'yPos'],
      showFunctions: false
    }
  }
}

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
ScaleStoryContents.displayName = 'StoryContents'

export const CustomScale = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [y, onUpdate] = useYListener()

  return (
    <ScrollerMotion disabled={!enabled} onUpdate={onUpdate} scale={1.5}>
      <ScaleStoryContents />

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => {
          setEnabled(!enabled)
        }}
        yPos={y}
      />
    </ScrollerMotion>
  )
}
CustomScale.story = {
  parameters: {
    jsx: {
      filterProps: ['isEnabled', 'onToggleEnable', 'onUpdate', 'yPos'],
      showFunctions: false
    }
  }
}

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
CustomSpringContents.displayName = 'StoryContents'

export const CustomSpring = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const [y, onUpdate] = useYListener()

  return (
    <ScrollerMotion
      disabled={!enabled}
      onUpdate={onUpdate}
      spring={{
        mass: 2,
        stiffness: 50,
        damping: 200
      }}
    >
      <CustomSpringContents />
      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => {
          setEnabled(!enabled)
        }}
        yPos={y}
      />
    </ScrollerMotion>
  )
}
CustomSpring.story = {
  parameters: {
    jsx: {
      filterProps: ['isEnabled', 'onToggleEnable', 'onUpdate', 'yPos'],
      showFunctions: false
    }
  }
}

const WithListenerContents: React.FC = () => (
  <>
    <Intro>
      The <code>onUpdate</code> props allows you to access the inner{' '}
      <code>MotionValue</code>'s for the scroll and the CSS transform.
    </Intro>
    <ColorBlocks />
  </>
)

WithListenerContents.displayName = 'StoryContents'

export const WithListener = (): JSX.Element => {
  const [enabled, setEnabled] = useState(true)
  const scrollY = useMotionValue(0)
  const y = useMotionValue(0)

  const onUpdate = (payload) =>
    window.requestAnimationFrame(() => {
      scrollY.set(payload.scrollY.get())
      y.set(payload.y.get())
    })

  return (
    <ScrollerMotion disabled={!enabled} onUpdate={onUpdate}>
      <WithListenerContents />

      {enabled && <ScrollMarker scrollY={scrollY} y={y} />}

      <CornerControls
        isEnabled={enabled}
        onToggleEnable={() => {
          setEnabled(!enabled)
        }}
        yPos={scrollY}
      />
    </ScrollerMotion>
  )
}
WithListener.story = {
  parameters: {
    jsx: {
      filterProps: ['isEnabled', 'onToggleEnable', 'yPos']
    }
  }
}
