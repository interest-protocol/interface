import { TRenderResponsiveStyles } from './stylin.types';
import { getBreakpoint } from './utils';

const renderResponsiveStyle: TRenderResponsiveStyles = (prop, value) => {
  if (!value) return [];

  if (!Array.isArray(value)) return [{ [prop]: value }];

  return (value as Array<string | number>).map((style, index) => {
    if (!style) return {};

    if (index == 0) return { [prop]: style };

    return {
      [`@media (min-width: ${getBreakpoint(index)})`]: {
        [prop]: style,
      },
    };
  }, []);
};

export default renderResponsiveStyle;
