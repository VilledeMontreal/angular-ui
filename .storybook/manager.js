import { addons } from '@storybook/addons';
import { create } from "@storybook/theming";
import logo from './public/logo.svg';

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: 'VilledeMontreal - Storybook',
    brandImage: logo,
  }),
});