import '!style-loader!css-loader!../node_modules/@villemontreal/boite-outils4-web/dist/css/styles.min.css';
import '!style-loader!css-loader!./fix-code-block-in-preview.css';
import { withA11y } from '@storybook/addon-a11y';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { addDecorator } from '@storybook/angular';
import docJson from '../documentation.json';

setCompodocJson(docJson);
addDecorator(withA11y);