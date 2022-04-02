import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { IntMath } from '@/sdk/entities/int-math';
import { InfoSVG } from '@/svg';
import { formatDollars } from '@/utils';

import { MY_POSITION } from '../../dinero-market.data';
import { MyOpenPositionProps } from './my-open-position.types';

const MyOpenPosition: FC<MyOpenPositionProps> = ({
  myPositionData,
  isLoading,
  exchangeRate,
}) => (
  <Box py="XL" px="XXL" order={5} gridArea="c" bg="foreground" borderRadius="L">
    <Typography variant="normal" textTransform="uppercase" mt="L">
      My open position:
    </Typography>
    {MY_POSITION.map(({ name, tip }, i) => (
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
        <Typography variant="normal" color="textSecondary">
          {myPositionData[i]}
        </Typography>
      </Box>
    ))}
    <Box mt="XL">
      <Typography variant="normal" textAlign="center" mb="M">
        DNR: {formatDollars(1)}
      </Typography>
      <Typography as="div" variant="normal" textAlign="center" mb="M">
        BTC:{' '}
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
          `${
            exchangeRate && formatDollars(IntMath.from(exchangeRate).toNumber())
          }`
        )}
      </Typography>
    </Box>
  </Box>
);

export default MyOpenPosition;
