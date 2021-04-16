import { addDecorator } from '@storybook/react'
import { jsxDecorator } from 'storybook-addon-jsx'

addDecorator(jsxDecorator)

export const parameters = {
  layout: 'fullscreen'
}
