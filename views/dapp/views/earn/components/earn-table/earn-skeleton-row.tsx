import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box } from '@/elements';

export const DesktopEarnSkeletonRow = [
  {
    items: [
      <Box key={v4()}>
        <Skeleton />
      </Box>,
      <Box key={v4()}>
        <Skeleton />
      </Box>,
      <Box key={v4()}>
        <Skeleton />
      </Box>,
      <Box key={v4()}>
        <Skeleton />
      </Box>,
    ],
  },
];

export const MobileEarnSkeletonRow = [
  {
    sideContent: (
      <Box
        mb="L"
        key={v4()}
        minWidth="6rem"
        minHeight="4rem"
        borderRadius="L"
        overflow="hidden"
      >
        <Skeleton height="100%" />
      </Box>
    ),
    items: [
      <Box key={v4()}>
        <Skeleton />
      </Box>,
      <Box key={v4()}>
        <Skeleton />
      </Box>,
      <Box key={v4()}>
        <Skeleton />
      </Box>,
    ],
  },
];
