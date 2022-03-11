import { IRoadMapItem } from './road-map.types';

export const ROAD_MAP_DATA: ReadonlyArray<IRoadMapItem> = [
  {
    next: 'Q2 2022',
    title: 'Q1 2022',
    list: [
      <>
        Lauch lending markets <br />
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
        Launch dinero lending
        <br /> markets v1 on Main Net (BSC)
      </>,
      <>Intial hires</>,
    ],
    status: 2,
  },
  {
    next: 'Q4 2022',
    title: 'Q3 2022',
    list: [<>Launch dinero vault</>, <>Launch lending market v2</>],
    status: 2,
  },
  {
    next: '',
    title: 'Q4 2022',
    list: [
      <>ICO / Pre - Sale / IDO</>,
      <>Community growth</>,
      <>Launch multi-asset lending market</>,
      <>Deploy polygon version</>,
    ],
    status: 2,
  },
];
