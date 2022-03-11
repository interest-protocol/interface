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
    list: [
      <>Launch lending markets V2</>,
      <>All dinero with capital D please</>,
    ],
    status: 2,
  },
  {
    next: '',
    title: 'Q4 2022',
    list: [
      <>Token sale instead of ICO</>,
      <>Launch multi-asset lending markets</>,
      <>Deploy on polygon version</>,
    ],
    status: 2,
  },
];
