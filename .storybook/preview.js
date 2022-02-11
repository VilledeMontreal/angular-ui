import { setCompodocJson } from '@storybook/addon-docs/angular';
import { addDecorator } from '@storybook/angular';
import docJson from '../documentation.json';
import { withA11y } from '@storybook/addon-a11y';
setCompodocJson(docJson);
addDecorator(withA11y);
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: 'white'
      }
    ]
  },
  docs: { inlineStories: true },
  viewMode: 'docs'
};
