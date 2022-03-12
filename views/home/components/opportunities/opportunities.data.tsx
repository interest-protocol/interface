import {
  CrossChainSVG,
  NFTSVG,
  ProfitsSVG,
  SupportSVG,
} from '../../../../components/svg';
import { OpportunitiesCardProps } from './opportunities.types';

export const OPPORTUNITIES_DATA: ReadonlyArray<OpportunitiesCardProps> = [
  {
    Icon: SupportSVG,
    title: (
      <>
        We support <br />
        multiple assets
      </>
    ),
    description: (
      <>
        Our multi-asset isolated lending Markets <br /> provide security and
        market for any token.
      </>
    ),
  },
  {
    Icon: CrossChainSVG,
    title: (
      <>
        Cross-chain <br />
        loans
      </>
    ),
    description: (
      <>
        Borrow and lend across different <br /> networks.
      </>
    ),
  },
  {
    Icon: NFTSVG,
    title: (
      <>
        Use exotic assets <br />
        as collateral
      </>
    ),
    description: (
      <>
        We accept LP tokens, interest-bearing <br />
        tokens, and NFTs as collateral.
      </>
    ),
  },
  {
    Icon: ProfitsSVG,
    title: (
      <>
        Maximize your profits
        <br />
        with our low and fixed
        <br />
        interest loans
      </>
    ),
    description: (
      <>
        Our stablecoin, Dinero, is backed by loans&apos;
        <br /> collateral and our leverage vault of fiat pegged
        <br /> tokens.
      </>
    ),
  },
];
