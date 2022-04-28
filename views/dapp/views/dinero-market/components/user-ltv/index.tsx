import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { InfoSVG, ProgressSVG } from '@/svg';

import { UserLTVProps } from './user-ltv.types';

const UserLTV: FC<UserLTVProps> = ({ isLoading, ltv }) => (
  <Box
    py="XL"
    order={1}
    gridArea="b"
    bg="foreground"
    borderRadius="L"
    px={['XL', 'XXL']}
  >
    <Box display="flex" justifyContent="space-between">
      <Typography variant="normal" display="flex" alignItems="center">
        <Box
          mr="M"
          as="span"
          display="inline-block"
          cursor="help"
          data-tip="If this value reaches 100%, you might get liquidated"
        >
          <InfoSVG width="1rem" height="1rem" />
        </Box>
        Risk
      </Typography>
      <Typography
        as="div"
        variant="normal"
        textAlign="right"
        whiteSpace="nowrap"
        color="textSecondary"
      >
        {isLoading ? (
          <Typography
            as="span"
            width="4rem"
            variant="normal"
            display="inline-block"
          >
            <Skeleton />
          </Typography>
        ) : ltv > 100 ? (
          100
        ) : (
          ltv
        )}
        {'% '}
        of 100%
      </Typography>
    </Box>
    <Box color={(ltv ?? 0) > 70 ? 'error' : 'accent'} mt="L">
      <ProgressSVG progress={ltv || 0} width="100%" height="100%" />
    </Box>
  </Box>
);

export default UserLTV;
