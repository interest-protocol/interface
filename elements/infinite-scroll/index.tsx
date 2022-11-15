import InfiniteScroll_, { Props } from 'react-infinite-scroll-component';

import stylin from '@/stylin';

import { BoxProps } from '../box/box.types';

const InfiniteScroll = stylin<BoxProps & Props>(InfiniteScroll_ as any)();

export default InfiniteScroll;
