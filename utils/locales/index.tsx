import { ReactElement } from 'react';

import { LocalesEnum } from '@/constants/locale';
import { BRFlagSVG, PTFlagSVG, USFlagSVG } from '@/svg';

const SVG_RECORD = {
  [LocalesEnum.EN]: <USFlagSVG width="100%" height="100%" />,
  [LocalesEnum.PT]: <PTFlagSVG width="100%" height="100%" />,
  [LocalesEnum.BR]: <BRFlagSVG width="100%" height="100%" />,
} as { [key: string]: ReactElement };

export const getSafeLocaleSVG = (locale: string): ReactElement =>
  SVG_RECORD[locale] ?? <USFlagSVG width="100%" height="100%" />;
