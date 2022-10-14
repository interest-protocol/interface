import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box } from '@/elements';

export const DesktopVaultSkeletonRow = [
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
      <Box key={v4()}>
        <Skeleton />
      </Box>,
      <Box key={v4()}>
        <Skeleton />
      </Box>,
    ],
  },
];

export const MobileVaultSkeletonRow = [
  {
    mobileSide: (
      <Box
        display="flex"
        flexDirection={['column', 'column', 'column', 'row']}
        alignItems="center"
      >
        <Skeleton height="100%" />
      </Box>
    ),
    button: (
      <Box
        mb="L"
        key={v4()}
        minWidth="8rem"
        minHeight="2.5rem"
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
      <Box key={v4()}>
        <Skeleton />
      </Box>,
    ],
  },
];
