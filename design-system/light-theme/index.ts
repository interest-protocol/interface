import breakpoints from '../common/breakpoints';
import fontSizes from '../common/font-sizes';
import radii from '../common/radii';
import space from '../common/space';
import colors from './colors';
import { buttons, typography } from './variants';

const LightTheme = {
  radii,
  space,
  colors,
  buttons,
  fontSizes,
  breakpoints,
  typography,
};

export type Theme = typeof LightTheme;

export default LightTheme;
