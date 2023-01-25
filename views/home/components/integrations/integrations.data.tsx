import { ChainLinkSVG, EthosSVG, MartianSVG, RedStoneSVG } from '@/svg';

export const INTEGRATIONS_DATA = [
  {
    link: 'https://chain.link',
    icon: (
      <ChainLinkSVG
        full
        maxHeight={''}
        maxWidth={''}
        height="100%"
        width="100%"
      />
    ),
  },
  {
    link: 'https://martianwallet.xyz ',
    icon: (
      <MartianSVG maxHeight={''} maxWidth={''} height="100%" width="100%" />
    ),
  },
  {
    link: 'https://ethoswallet.xyz',
    icon: <EthosSVG maxHeight={''} maxWidth={''} height="100%" width="100%" />,
  },
  {
    link: 'https://redstone.finance',
    icon: (
      <RedStoneSVG
        full
        maxHeight={''}
        maxWidth={''}
        height="100%"
        width="100%"
      />
    ),
  },
];
