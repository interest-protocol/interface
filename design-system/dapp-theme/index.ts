import breakpoints from '../common/breakpoints';
import fontSizes from '../common/font-sizes';
import radii from '../common/radii';
import space from '../common/space';
import darkColors from './dark-mode/colors';
import {
  buttons as darkButtons,
  effects as darkEffects,
  typography as darkTypography,
} from './dark-mode/variants';
import lightColors from './light-mode/colors';
import {
  buttons as lightButtons,
  effects as lightEffects,
  typography as lightTypography,
} from './light-mode/variants';

export const DAppLightTheme = {
  radii,
  dark: false,
  space,
  colors: lightColors,
  buttons: lightButtons,
  effects: lightEffects,
  fontSizes,
  typography: lightTypography,
  breakpoints,
};

export const DAppDarkTheme = {
  radii,
  dark: true,
  space,
  colors: darkColors,
  buttons: darkButtons,
  effects: darkEffects,
  fontSizes,
  typography: darkTypography,
  breakpoints,
};

export type Theme = typeof DAppLightTheme;
