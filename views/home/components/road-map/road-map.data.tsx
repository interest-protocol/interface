import { IRoadMapItem } from './road-map.types';

export const ROAD_MAP_DATA: ReadonlyArray<IRoadMapItem> = [
  {
    next: 'Q2 2022',
    title: 'Q1 2022',
    list: [
      <>
        Launch lending Markets <br />
        v1 Test Net
      </>,
    ],
    status: 1,
  },
  {
    next: 'Q3 2022',
    title: 'Q2 2022',
    list: [
      <>Pre-Seed</>,
      <>Audit (Certik)</>,
      <>
        Launch Dinero lending
        <br /> Markets v1 on Main Net (BSC)
      </>,
      <>Intial hires</>,
    ],
    status: 2,
  },
  {
    next: 'Q4 2022',
    title: 'Q3 2022',
    list: [<>Launch lending Markets V2</>, <>Launch Dinero vault</>],
    status: 2,
  },
  {
    next: '',
    title: 'Q4 2022',
    list: [
      <>Token sale / Pre-sale / IDO</>,
      <>Launch multi-asset lending Markets</>,
      <>Deploy on polygon</>,
    ],
    status: 2,
  },
];
