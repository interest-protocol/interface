import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { InfoSVG } from '@/svg';

import { LOAN_INFO } from '../../dinero-market.data';
import { LoanInfoProps } from './loan-info.types';

const LoanInfo: FC<LoanInfoProps> = ({ isLoading, loanInfoData }) => (
  <Box py="XL" px="XXL" order={4} gridArea="c" bg="foreground" borderRadius="L">
    {LOAN_INFO.map(({ name, tip }, i) => (
      <Box my="L" key={v4()} display="flex" justifyContent="space-between">
        <Typography variant="normal" display="flex" alignItems="center">
          <Box
            mr="M"
            as="span"
            cursor="help"
            data-tip={tip}
            display="inline-block"
          >
            <InfoSVG width="1rem" />
          </Box>
          {name}
        </Typography>
        <Typography as="div" variant="normal" color="textSecondary">
          {isLoading ? (
            <Typography
              as="span"
              width="3rem"
              variant="normal"
              display="inline-block"
            >
              <Skeleton />
            </Typography>
          ) : (
            loanInfoData[i]
          )}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default LoanInfo;
