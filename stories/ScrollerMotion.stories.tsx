import React from 'react'
import useState from 'storybook-addon-state'

import ScrollerMotion from '@/ScrollerMotion'

import { StoryControls, StorySections } from './parts'

export default {
  title: 'ScrollerMotion',
  component: ScrollerMotion
}

export const DefaultStory = (): JSX.Element => {
  const [enabled, setEnabled] = useState('enabled', true)

  return (
    <>
      <ScrollerMotion disabled={!enabled}>
        <StorySections />
      </ScrollerMotion>

      <StoryControls
        isEnabled={enabled}
        onToggleEnable={() => {
          setEnabled(!enabled)
        }}
      />
    </>
  )
}
DefaultStory.story = {
  name: 'Default'
}

export const CustomScale = (): JSX.Element => {
  const [enabled, setEnabled] = useState('enabled', true)

  return (
    <>
      <ScrollerMotion disabled={!enabled} scale={1.5}>
        <StorySections />
      </ScrollerMotion>

      <StoryControls
        isEnabled={enabled}
        onToggleEnable={() => {
          setEnabled(!enabled)
        }}
      />
    </>
  )
}

export const CustomSpring = (): JSX.Element => {
  const [enabled, setEnabled] = useState('enabled', true)

  return (
    <>
      <ScrollerMotion
        disabled={!enabled}
        spring={{
          mass: 2,
          stiffness: 50,
          damping: 200
        }}
      >
        <StorySections />
      </ScrollerMotion>

      <StoryControls
        isEnabled={enabled}
        onToggleEnable={() => {
          setEnabled(!enabled)
        }}
      />
    </>
  )
}
