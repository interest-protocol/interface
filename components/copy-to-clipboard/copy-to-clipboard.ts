import { ReactNode } from 'react';

import { BoxProps } from './../../elements/box/box.types';

export interface CopyToClipboardProps extends BoxProps {
  address: string;
  children?: ReactNode;
}
