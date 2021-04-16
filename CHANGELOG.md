# Scroller-motion Change Log

## v0.0.2

**Breaking Changes**

- Removed default export, now a named `ScrollerMotion` export
- Removed `onUpdate` prop

- Feature: Add `useScrollerMotion` hook (cff376f5e9798f66faade8794fe25de0051541c6)
- Feature: Expose motion values on `ref` (1e9c73e798e23dac80e318697c0a62f0ee580d26)
- Feature: Add support for X axis (8e6ddd49e1711552184153d31287fdc2b3ab42b1)
- Misc: Update docs and bump dependencies

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
