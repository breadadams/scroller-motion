<h2 align="center">🛹 <br />scroller-motion</h2>

<p align="center">
  <a href="https://www.npmjs.com/package/scroller-motion" target="_blank">
    <img src="https://img.shields.io/npm/v/scroller-motion?style=flat-square" alt="NPM Package Version" />
  </a>
  <a href="https://scroller-motion.wombak.xyz/" target="_blank">
    <img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg" alt="Project Storybook">
  </a>
  <a href="https://github.com/wombak/scroller-motion/actions?query=workflow%3AFormatting" target="_blank">
    <img src="https://github.com/wombak/scroller-motion/workflows/Formatting/badge.svg" alt="Formatting Workflow Status" />
  </a>
</p>

<h4 align="center">Bringing motion scrolling to React, built upon <a href="https://github.com/framer/motion" target="_blank">framer-motion</a></h4>

---

1. [Installation](#installation)
1. [Usage](#usage)
1. [Props](#props)
1. [useScrollerMotion](#usescrollermotion-hook)
1. [Listeners](#motion-listeners)
1. [About](#about)
1. [Contributing](#contributing)
1. [License](#license)

---

### Installation

To begin you'll want to install **scroller-motion** as well as the peer dependencies:

```bash
npm install scroller-motion framer-motion react

# or

yarn add scroller-motion framer-motion react
```

> Note: Due to the use of [hooks](https://reactjs.org/docs/hooks-intro.html) the minimum required version of React is 16.8

### Usage

Implementing **scroller-motion** couldn't be easier, simply wrap your page with the `<ScrollerMotion>` component. For example in a [Next.js](https://nextjs.org/) app this might look like the following:

```jsx
/* pages/index.jsx */

import { ScrollerMotion } from 'scroller-motion'

export default () => (
  <ScrollerMotion>
    <MyComponent />
  </ScrollerMotion>
)
```

Most modern browsers implement an inertia bounce effect to the window while scrolling (upon reaching the start/end). This can cause unwanted visual effects, such as [flickering](https://github.com/wombak/scroller-motion/issues/7), when using **scroller-motion**.

To fix this, you can disable [`overscroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior) in your project with the following CSS:

```css
/* style.css */

html,
body {
  overscroll-behavior: none;
}
```

### Props

All props are optional.

#### `disabled`

type: `boolean` <br/>
default: `false`

Completly disables and unmounts the `ScrollerMotion` component. Any children will be rendered through a React `<Fragment>` in this case (thus falling back to native scrolling).

#### `scale`

type: `number` <br/>
default: `1`

[**View demo**](https://scroller-motion.wombak.xyz/?path=/story/scrollermotion--custom-scale)

Extends the scrollable length of the page, giving a "slow scroll" experience. For example if the page content is **1400px** in height, `<ScrollerMotion scale={1.5} />` would result in a scrollable length of **2100px** (`height * scale`).

The lowest this value can be is `1`, anything lower will be disregarded and `1` will be used in its place.

#### `spring`

type: [`SpringOptions`](https://github.com/Popmotion/popmotion/blob/ec4974a19789c3cebc4e14e1fde3b55cdeecf7b0/packages/popmotion/src/animations/spring/types.ts#L1) <br/>
default: `{ mass: 1.25, stiffness: 200, damping: 50 }`

[**View demo**](https://scroller-motion.wombak.xyz/?path=/story/scrollermotion--custom-spring)

The main configuration object for the scroll's spring transform, basically the 2nd parameter to framer-motion's [useSpring](https://www.framer.com/api/motion/types/#spring).

You can disable the spring scroll by passing a falsy value to this prop, for example: `<ScollerMotion spring={null} />`.

### `useScrollerMotion` hook

[**View demo**](https://scroller-motion.wombak.xyz/?path=/story/scrollermotion--use-scroller-motion)

This hook allows you to consume the internal `MotionValue` values, returning an object of the following type:

```ts
{ scrollX: MotionValue, scrollY: MotionValue, x: MotionValue, y: MotionValue }
```

- `scrollX` & `scrollY`: The current (spring) scroll position.
- `x` & `y`: The current transform (useful for calculating scroll position when `scale` is in-use).

It must be used within a `<ScrollerMotion />`, to read the values in the parent component see [Motion Listeners](#motion-listeners).

```tsx
import { ScrollerMotion, useScrollerMotion } from 'scroller-motion'
import { motion } from 'framer-motion'

const MyComponent = () => {
  const { x, y } = useScrollerMotion()

  return <motion.div style={{ x, y }}>Hello world</motion.div>
}

export default () => (
  <ScrollerMotion>
    <MyComponent />
  </ScrollerMotion>
)
```

### Motion Listeners

[**View demo**](https://scroller-motion.wombak.xyz/?path=/story/scrollermotion--motion-listeners)

Another approach if you need to read/use the internal `MotionValue` values is via the `ref` prop on `<ScrollerMotion />`. The type of the ref is the same as the object returned from [`useScrollerMotion`](#usescrollermotion-hook).

For example, if we want to use the y-axis scroll position:

```tsx
import React, { useEffect, useRef } from 'react'
import { useMotionValue } from 'framer-motion'
import { ScrollerMotion, ScrollerMotionRef } from 'scroller-motion'

export default () => {
  const scrollerMotion = useRef<ScrollerMotionRef>()
  const scrollY = useMotionValue(0)

  useEffect(() => {
    const unsubscribe = scrollerMotion.current.scrollY.onChange((v) =>
      scrollY.set(v)
    )

    return () => unsubscribe()
  }, [scrollY])

  return (
    <ScrollerMotion ref={scrollerMotion}>
      <MyComponent scrollPosition={scrollY} />
    </ScrollerMotion>
  )
}
```

For accessing the _native_ scroll value (without any spring motion) we suggest using framer-motion's [`useViewportScroll`](https://www.framer.com/api/motion/motionvalue/#useviewportscroll).

### About

**Scroller-motion** was born from the need for motion/smooth scrolling in a couple of React projects. Given the fact that we were already using the beloved [`framer-motion`](https://github.com/framer/motion) for the rest of the animations & transitions, we decided to try it out for page scrolling too - and the results were impressive! Time for an emoji list:

- 🏀 Configurable motion via the `spring` prop
- 🐌 "Slow scroll" via the `scale` prop
- 👂 Subscribe to the scroll values with `useScrollerMotion`
- ⚙️ SSR compatible
- 🤖 Fully typed w/ TypeScript
- 🎣 Built around React hooks
- ⚖️ Only 2.2kb gzipped

It's still considered a `beta` release, with a public roadmap for the stable v1 available [here](https://github.com/wombak/scroller-motion/projects/1).

> Note: Currently **scroller-motion** only supports motion scrolling on the main window/body. The stable release _should_ allow for motion scrolling on any DOM element.

### Contributing

Contributions are absolutely welcome, however given that the project is currently in beta an issue should be opened first - _if_ said contribution is development related. Check out the repository [projects](https://github.com/wombak/scroller-motion/projects) for information on the roadmap and other future ideas.

These are the current scripts available for development:

```bash
# Start Storybook
npm run start

# Build dist files
npm run build

# Build static Storybook
npm run build:storybook

# Apply Prettier formatting
npm run prettier:format

# Check Prettier formatting
npm run prettier:check
```

### License

Released under the [MIT](https://github.com/wombak/scroller-motion/blob/master/LICENSE) License.<br>
Authored and maintained by Wombak with help from [contributors](https://github.com/wombak/scroller-motion/contributors).

> [wombak.xyz](https://wombak.xyz) · GitHub [@wombak](https://github.com/wombak) · Twitter [@wombak_xyz](https://twitter.com/wombak_xyz)
