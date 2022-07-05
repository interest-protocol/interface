import { css } from '@emotion/react';

import fontSizes from '../../common/font-sizes';
import radii from '../../common/radii';
import space from '../../common/space';
import colors from '../colors';

const primary = css`
  border: none;
  height: 65px;
  width: 183px;
  outline: none;
  cursor: pointer;
  position: relative;
  font-weight: bold;
  display: inline-block;
  border-radius: ${radii.S};
  text-transform: uppercase;
  font-size: ${fontSizes.button};
  color: ${colors.foreground};
  background: ${colors.accent};
  transition: all 0.3s ease-in-out;
  padding: ${space.L};
`;

const secondary = css`
  border: none;
  height: 45px;
  outline: none;
  cursor: pointer;
  position: relative;
  font-weight: bold;
  display: inline-block;
  border-radius: ${radii.S};
  text-transform: uppercase;
  font-size: ${fontSizes.button};
  color: ${colors.foreground};
  background: ${colors.text};
  transition: all 0.3s ease-in-out;
  padding-left: calc(${space.L} + ${space.S});
  padding-right: calc(${space.L} + ${space.S});
`;

const tertiary = css`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: ${radii.S};
  color: ${colors.foreground};
  background: ${colors.accent};
  padding: ${space.L} ${space.XL};
`;

const neutral = css`
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  color: ${colors.text};
  display: inline-block;
  border-radius: ${radii.S};
  background: ${colors.outline};
  padding: ${space.L} ${space.XL};
`;

export default {
  primary,
  secondary,
  tertiary,
  neutral,
};
