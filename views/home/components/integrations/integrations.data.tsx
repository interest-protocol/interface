import { ChainLinkSVG, EthosSVG, MartianSVG, RedStoneSVG } from '@/svg';

export const INTEGRATIONS_DATA = [
  {
    name: 'ChainLink',
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
    name: 'Martian',
    icon: (
      <MartianSVG maxHeight={''} maxWidth={''} height="100%" width="100%" />
    ),
  },
  {
    name: 'Ethos',
    icon: <EthosSVG maxHeight={''} maxWidth={''} height="100%" width="100%" />,
  },
  {
    name: 'RedStone',
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
