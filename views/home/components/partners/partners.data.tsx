import { EthosSVG, MartianSVG, RedStoneSVG } from '@/svg';

import { Image } from './partners.styles';

export const SETTINGS = {
  dots: false,
  infinite: true,
  arrows: false,
  autoplay: true,
  draggable: true,
  speed: 250, //ms
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1152, //px
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024, //px
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 880, //px
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 676, //px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const PARTNERS_DATA = [
  {
    link: 'https://martianwallet.xyz ',
    icon: <MartianSVG maxHeight={''} maxWidth={''} height="100%" />,
    name: 'Martian Wallet',
  },
  {
    link: 'https://ethoswallet.xyz',
    icon: <EthosSVG maxHeight={''} maxWidth={''} height="100%" />,
    name: 'Ethos Wallet',
  },
  {
    link: 'https://redstone.finance',
    icon: <RedStoneSVG maxHeight={''} maxWidth={''} height="100%" />,
    name: 'Redstone',
  },
  {
    link: 'https://suistart.com/',
    icon: (
      <Image
        alt="SUIS"
        height="100%"
        loading="lazy"
        decoding="async"
        src={`/images/web/partners/suis.webp`}
      />
    ),
    name: 'SuiS',
  },
  {
    link: 'https://suipiens.com/',
    icon: (
      <Image
        alt="SUIS"
        height="100%"
        loading="lazy"
        decoding="async"
        src={`/images/web/partners/suipiens.webp`}
      />
    ),
    name: 'Suipiens',
  },
  {
    link: 'https://suins.io/',
    icon: (
      <Image
        alt="SUIS"
        height="100%"
        loading="lazy"
        decoding="async"
        src={`/images/web/partners/suins.webp`}
      />
    ),
    name: 'SuiNS',
  },
  {
    link: 'https://link3.to/suiwhale',
    icon: (
      <Image
        alt="SUIS"
        height="100%"
        loading="lazy"
        decoding="async"
        src={`/images/web/partners/sui-whale.webp`}
      />
    ),
    name: 'Sui Whale',
  },
  {
    link: 'https://suiecosystem.top/',
    icon: (
      <Image
        alt="SUIS"
        height="100%"
        loading="lazy"
        decoding="async"
        src={`/images/web/partners/sui-ecosystem.webp`}
      />
    ),
    name: 'Sui Ecosystem',
  },
  {
    link: 'https://www.mises.site/',
    icon: (
      <Image
        alt="SUIS"
        height="100%"
        loading="lazy"
        decoding="async"
        src={`/images/web/partners/mises.webp`}
      />
    ),
    name: 'Mises Browser',
  },
];
