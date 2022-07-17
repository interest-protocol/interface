import breakpoints from '../common/breakpoints';
import fontSizes from '../common/font-sizes';
import radii from '../common/radii';
import space from '../common/space';
import colors from './colors';
import { buttons, effects, typography } from './variants';

const LandingPageTheme = {
  radii,
  space,
  colors,
  effects,
  buttons,
  fontSizes,
  typography,
  breakpoints,
};

export type Theme = typeof LandingPageTheme;

export default LandingPageTheme;
