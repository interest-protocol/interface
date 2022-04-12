import { MaybeArray } from 'interface';
import { FC, SVGAttributes } from 'react';

export type TToken = 'INT' | 'LP';

export type TValidTokens = ReadonlyArray<TToken>;

export type TTokenCurrency = Record<TToken, string>;

export type TTokenIcons = Record<
  TToken,
  MaybeArray<FC<SVGAttributes<SVGSVGElement>>>
>;

export interface EarnStakeModalProps {
  token: TToken;
  balance: number;
  handleClose: () => void;
  modal: 'stake' | 'unstake' | undefined;
}
