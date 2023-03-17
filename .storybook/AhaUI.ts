import { create } from '@storybook/theming';
import logo from '../libs/assets/origin/ahaui-logo-with-text.svg';
import favicon from '../libs/assets/origin/aha-favicon.svg';

const link = document.createElement('link');
link.setAttribute('rel', 'shortcut icon');
link.setAttribute('href', favicon);
document.head.appendChild(link);

export default create({
  base: 'light',
  brandTitle: 'AhaUI Storybook',
  brandImage: logo,
  colorPrimary: '#375de7',
});
