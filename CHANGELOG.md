# Scroller-motion Change Log

## v0.0.2

- Feature: Add `useScrollerMotion` hook ([cff376f5](https://github.com/wombak/scroller-motion/commit/cff376f5))
- Feature: Expose motion values on `ref` ([1e9c73e7](https://github.com/wombak/scroller-motion/commit/1e9c73e7))
- Feature: Add support for X axis ([8e6ddd49](https://github.com/wombak/scroller-motion/commit/8e6ddd49))
- Misc: Update docs and bump dependencies

**⚠️ Breaking Changes**

- Removed default export, now a named `ScrollerMotion` export
- Removed `onUpdate` prop

## v0.0.1-beta.3

- Feature: Add `onUpdate` prop
- Docs: Update README with initial documentation
- Docs: Improve Storybook demos

## v0.0.1-beta.2

- Feature: SSR compatibility
- Feature: Improve viewport size detection via [`actual`](https://github.com/ryanve/actual) dependency
- Fix: Unmount hooks correctly on `disabled` state
- CI: Automated NPM publishing via GitHub workflow

## v0.0.1-beta.0

**Initial Beta**

🛹 Smooth window scrolling for React apps, via framer-motion
