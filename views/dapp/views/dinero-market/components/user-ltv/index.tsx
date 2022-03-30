import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { InfoSVG, ProgressSVG } from '@/svg';

import { UserLTVProps } from './user-ltv.types';

const UserLTV: FC<UserLTVProps> = ({ isLoading, ltv }) => (
  <Box py="XL" px="XXL" order={1} gridArea="b" bg="foreground" borderRadius="L">
    <Box display="flex" justifyContent="space-between">
      <Typography variant="normal" display="flex" alignItems="center">
        <Box mr="M" as="span" display="inline-block" data-tip="Loan to value">
          <InfoSVG width="1rem" />
        </Box>
        LTV
      </Typography>
      <Typography as="div" variant="normal" color="textSecondary">
        {isLoading ? (
          <Typography
            as="span"
            width="4rem"
            variant="normal"
            display="inline-block"
          >
            <Skeleton />
          </Typography>
        ) : (
          ltv || '0'
        )}
        {'% '}
        of 100%
      </Typography>
    </Box>
    <Box color="accent" mt="L">
      <ProgressSVG progress={ltv || 0} />
    </Box>
  </Box>
);

export default UserLTV;
