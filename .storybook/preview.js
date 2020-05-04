import '!style-loader!css-loader!./boa4.min.css';
import '!style-loader!css-loader!./fix-code-block-in-preview.css';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);