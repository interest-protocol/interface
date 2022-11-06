import styled from '@emotion/styled';
import InfiniteScroll_, { Props } from 'react-infinite-scroll-component';

import { Theme } from '@/design-system/landing-page-theme';
import { renderStyles } from '@/stylin';
import { TPseudos, TStyles } from '@/stylin/stylin.types';

import { BoxProps } from '../box/box.types';

const InfiniteScroll = styled(InfiniteScroll_)<BoxProps & Props>(
  ({ theme, ...styles }) =>
    renderStyles(
      { styles: styles as TStyles, pseudo: {} as TPseudos },
      theme as Theme
    )
);

export default InfiniteScroll;
