<h2 align="center">🛹 <br />scroller-motion</h2>

<p align="center">
  <a href="https://www.npmjs.com/package/scroller-motion" target="_blank">
    <img src="https://img.shields.io/npm/v/scroller-motion?style=flat-square" alt="NPM Package Version" />
  </a>
  <a href="https://scroller-motion.js.org/" target="_blank">
    <img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg" alt="Project Storybook">
  </a>
  <a href="https://github.com/breadadams/scroller-motion/actions/workflows/formatting.yml" target="_blank">
    <img src="https://github.com/breadadams/scroller-motion/actions/workflows/tests.yml/badge.svg" alt="Tests Workflow Status" />
  </a>
  <a href="https://github.com/breadadams/scroller-motion/actions/workflows/formatting.yml" target="_blank">
    <img src="https://github.com/breadadams/scroller-motion/actions/workflows/formatting.yml/badge.svg" alt="Formatting Workflow Status" />
  </a>
</p>

<h4 align="center">Bringing motion scrolling to React, built upon <a href="https://github.com/framer/motion" target="_blank">framer-motion</a></h4>

---

1. [Installation](#installation)
1. [Usage](#usage)
1. [Props](#props)
1. [useScrollerMotion](#usescrollermotion-hook)
1. [Listeners](#motion-listeners)
1. [Recipes](#recipes)
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

Most modern browsers implement an inertia bounce effect to the window while scrolling (upon reaching the start/end). This can cause unwanted visual effects, such as [flickering](https://github.com/breadadams/scroller-motion/issues/7), when using **scroller-motion**.

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

|                 |                                                                                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Type**        | `boolean`                                                                                                                                                                        |
| **Default**     | `false`                                                                                                                                                                          |
| **Description** | Completly disables and unmounts the `ScrollerMotion` component. Any children will be rendered through a React `<Fragment>` in this case (thus falling back to native scrolling). |

#### `scale`

|                 |                                                                                                                                                                                                                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Type**        | `number`                                                                                                                                                                                                                                                                                                                                                           |
| **Default**     | `1`                                                                                                                                                                                                                                                                                                                                                                |
| **Demo**        | [**View demo**](https://scroller-motion.js.org/?path=/story/scrollermotion--custom-scale)                                                                                                                                                                                                                                                                          |
| **Description** | Extends the scrollable length of the page, giving a "slow scroll" experience. For example if the page content is **1400px** in height, `<ScrollerMotion scale={1.5} />` would result in a scrollable length of **2100px** (`height * scale`).<br/><br/> The lowest this value can be is `1`, anything lower will be disregarded and `1` will be used in its place. |

#### `spring`

|                 |                                                                                                                                                                                                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Type**        | [`SpringOptions`](https://github.com/framer/motion/blob/2fa59a6e7c0a83647c8193ad37667a4f018143e2/packages/framer-motion/src/animation/types.ts#L31)                                                                                                                                                      |
| **Default**     | `{ mass: 1.25, stiffness: 200, damping: 50 }`                                                                                                                                                                                                                                                            |
| **Demo**        | [**View demo**](https://scroller-motion.js.org/?path=/story/scrollermotion--custom-spring)                                                                                                                                                                                                               |
| **Description** | The main configuration object for the scroll's spring transform, basically the 2nd parameter to framer-motion's [useSpring](https://www.framer.com/docs/use-spring/).<br/><br/> You can disable the spring scroll by passing a falsy value to this prop, for example: `<ScollerMotion spring={null} />`. |

### `useScrollerMotion` hook

[**View demo**](https://scroller-motion.js.org/?path=/story/scrollermotion--use-scroller-motion)

This hook allows you to consume the internal `MotionValue` values, returning an object of the following type:

```ts
{
  scrollX: MotionValue,
  scrollXProgress: MotionValue,
  scrollY: MotionValue,
  scrollYProgress: MotionValue,
  x: MotionValue,
  y: MotionValue
}
```

- `scrollX` & `scrollY`: The current scroll position.
- `scrollXProgress` & `scrollYProgress`: A `0` to `1` transform of `scrollX|scrollY`, similar to those returned by [`useScroll`](https://www.framer.com/docs/use-scroll/#usage).
- `x` & `y`: A negative representation of `scrollX|scrollY`.

It must be used within a `<ScrollerMotion />`, to read the values in the parent component see [Motion Listeners](#motion-listeners).

> ℹ️ For accessing _native_ scroll values (without spring motion or scale calculation) we suggest using framer-motion's [`useScroll`](https://www.framer.com/docs/use-scroll).

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

[**View demo**](https://scroller-motion.js.org/?path=/story/scrollermotion--motion-listeners)

Another approach if you need to read/use the internal `MotionValue` values is via the `ref` prop on `<ScrollerMotion />`. The type of the ref is the same as the object returned from [`useScrollerMotion`](#usescrollermotion-hook).

For example, if we want to use the y-axis scroll position:

```tsx
import { useEffect, useRef } from 'react'
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

> ℹ️ For accessing _native_ scroll values (without spring motion or scale calculation) we suggest using framer-motion's [`useScroll`](https://www.framer.com/docs/use-scroll).

### Recipes

- [**Hash anchor scroll**](https://github.com/breadadams/scroller-motion/issues/3#issuecomment-817216563): Scroll the window to a DOM element when clicking a `#hash` anchor.
- [**Horizontal scroll**](https://github.com/breadadams/scroller-motion/issues/24#issuecomment-1105743496): Convert vertical mousewheel events to horizontal window scroll.
- [**Tab scroll**](https://github.com/breadadams/scroller-motion/issues/22#issuecomment-1119969437): Scroll the window to a DOM element when pressing the Tab key (useful for a11y purposes).

### About

**Scroller-motion** was born from the need for motion/smooth scrolling in a couple of React projects. Given the fact that we were already using the beloved [`framer-motion`](https://github.com/framer/motion) for the rest of the animations & transitions, we decided to try it out for page scrolling too - and the results were impressive! Time for an emoji list:

- 🏀 Configurable motion via the `spring` prop
- 🖱 "Slow scroll" via the `scale` prop
- 📡 Subscribe to the scroll values with `useScrollerMotion`
- ⚙️ SSR compatible
- 🤖 Fully typed w/ TypeScript
- 🪝 Built around React hooks
- ⚖️ Only ~2kb gzipped

### Contributing

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

# Run tests
npm run test
```

### License

Released under the [MIT](https://github.com/breadadams/scroller-motion/blob/master/LICENSE) License.<br>
Authored and maintained by Brad Adams with help from [contributors](https://github.com/breadadams/scroller-motion/contributors).

> [breadadams.com](https://breadadams.com) · GitHub [@breadadams](https://github.com/breadadams) · Twitter [@breadadams](https://twitter.com/breadadams)
