import '!style-loader!css-loader!../dist/core-components-angular-lib/global.scss';
import '!style-loader!css-loader!./fix-code-block-in-preview.css';
import { withA11y } from '@storybook/addon-a11y';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { addDecorator } from '@storybook/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);
addDecorator(withA11y);