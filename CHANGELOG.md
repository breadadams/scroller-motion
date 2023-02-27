# `scroller-motion` Changelog

## [v1.2.3](https://github.com/breadadams/scroller-motion/releases/tag/v1.2.3)

- Fix: `framer-motion` v9 and v10 peer-dependency warnings (#37)
- Chore: Internal dependency and test updates

## [v1.2.2](https://github.com/breadadams/scroller-motion/releases/tag/v1.2.2)

- Fix: `framer-motion` v8 peer-dependency warnings ([0a9063f](https://github.com/breadadams/scroller-motion/commit/0a9063f))
- Chore: Internal dependency updates (React 18, Framer-motion 8, @testing-library, Storybook) ([0a9063f](https://github.com/breadadams/scroller-motion/commit/0a9063f))

## [v1.2.1](https://github.com/breadadams/scroller-motion/releases/tag/v1.2.1)

- Fix: `framer-motion` v7 peer-dependency warnings ([#30](https://github.com/breadadams/scroller-motion/pull/30))

## [v1.2.0](https://github.com/breadadams/scroller-motion/releases/tag/v1.2.0)

- Feature: Expose new `scrollXProgress` and `scrollYProgress` values ([85b2847](https://github.com/breadadams/scroller-motion/commit/85b2847))
- Chore: Update framer-motion dependency, deprecating useViewportScroll. This isn't a breaking change, however `^6.5.0` is the new advised version, expect peer dependency warnings ([0923d34](https://github.com/breadadams/scroller-motion/commit/0923d34))
- Chore: Vulnerable dependency updates ([169a350](https://github.com/breadadams/scroller-motion/commit/169a350))

## [v1.1.1](https://github.com/breadadams/scroller-motion/releases/tag/v1.1.1)

- Fix: Dependency version warning ([6405b1e](https://github.com/breadadams/scroller-motion/commit/6405b1e))
- Chore: Vulnerable dependency updates ([a3d970d](https://github.com/breadadams/scroller-motion/commit/a3d970d))
- Chore: Add more recipes to README ([4e95d91](https://github.com/breadadams/scroller-motion/commit/4e95d91))

## [v1.1.0](https://github.com/breadadams/scroller-motion/releases/tag/v1.1.0)

- Refactor: Tweaks and remove old code
- Chore: Reduce required Node engine
- Chore: Dev dependency updates and adjust peer dependency versioning

## [v1.0.0](https://github.com/breadadams/scroller-motion/releases/tag/v1.0.0)

- Misc: Documentation improvements, dependency updates

## [v0.0.2](https://github.com/breadadams/scroller-motion/releases/tag/v0.0.2)

- Feature: Add `useScrollerMotion` hook ([cff376f5](https://github.com/breadadams/scroller-motion/commit/cff376f5))
- Feature: Expose motion values on `ref` ([1e9c73e7](https://github.com/breadadams/scroller-motion/commit/1e9c73e7))
- Feature: Add support for X axis ([8e6ddd49](https://github.com/breadadams/scroller-motion/commit/8e6ddd49))
- Misc: Update docs and bump dependencies

**⚠️ Breaking Changes**

- Removed default export, now a named `ScrollerMotion` export
- Removed `onUpdate` prop

## [v0.0.1-beta.3](https://github.com/breadadams/scroller-motion/releases/tag/v0.0.1-beta.3)

- Feature: Add `onUpdate` prop
- Docs: Update README with initial documentation
- Docs: Improve Storybook demos

## [v0.0.1-beta.2](https://github.com/breadadams/scroller-motion/releases/tag/v0.0.1-beta.2)

- Feature: SSR compatibility
- Feature: Improve viewport size detection via [`actual`](https://github.com/ryanve/actual) dependency
- Fix: Unmount hooks correctly on `disabled` state
- CI: Automated NPM publishing via GitHub workflow

## [v0.0.1-beta.0](https://github.com/breadadams/scroller-motion/releases/tag/v0.0.1-beta.0)

**Initial Beta**

🛹 Smooth window scrolling for React apps, via framer-motion
