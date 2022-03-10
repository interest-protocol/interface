import breakpoints from '../common/breakpoints';
import fontSizes from '../common/font-sizes';
import radii from '../common/radii';
import space from '../common/space';
import colors from './colors';

const LightTheme = {
  radii,
  space,
  colors,
  fontSizes,
  breakpoints,
};

export type Theme = typeof LightTheme;

export default LightTheme;
