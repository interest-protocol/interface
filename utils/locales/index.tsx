import { ReactElement } from 'react';

import { LocalesEnum } from '@/constants/locale';
import { BRFlagSVG, PTFlagSVG, USFlagSVG } from '@/svg';

const SVG_RECORD = {
  [LocalesEnum.EN]: (
    <USFlagSVG
      width="100%"
      height="100%"
      maxHeight="1.25rem"
      maxWidth="1.25rem"
    />
  ),
  [LocalesEnum.PT]: (
    <PTFlagSVG
      width="100%"
      height="100%"
      maxHeight="1.25rem"
      maxWidth="1.25rem"
    />
  ),
  [LocalesEnum.BR]: (
    <BRFlagSVG
      width="100%"
      height="100%"
      maxHeight="1.25rem"
      maxWidth="1.25rem"
    />
  ),
} as { [key: string]: ReactElement };

export const getSafeLocaleSVG = (locale: string): ReactElement =>
  SVG_RECORD[locale] ?? (
    <USFlagSVG
      width="100%"
      height="100%"
      maxHeight="1.25rem"
      maxWidth="1.25rem"
    />
  );
