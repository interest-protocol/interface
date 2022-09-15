import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk/entities/fixed-point-math';
import { InfoSVG } from '@/svg';
import { capitalize, formatDollars, maybeLPTokenName } from '@/utils';

import { MyOpenPositionProps } from './my-open-position.types';

const MY_POSITION = [1, 2, 3, 4, 5, 6].map((item) => ({
  name: 'dineroMarketAddress.positionName' + item,
  tip: 'dineroMarketAddress.positionTip' + item,
}));

const MyOpenPosition: FC<MyOpenPositionProps> = ({
  symbols,
  isLoading,
  myPositionData,
  collateralUSDPrice,
}) => {
  const t = useTranslations();

  return (
    <Box p="XL" order={5} gridArea="c" bg="foreground" borderRadius="L">
      <Typography variant="normal" textTransform="uppercase" mt="L">
        {t('dineroMarketAddress.positionTitle')}:
      </Typography>
      {MY_POSITION.map(({ name, tip }, i) => (
        <Box my="L" key={v4()} display="flex" justifyContent="space-between">
          <Typography variant="normal" display="flex" alignItems="center">
            <Box
              mr="M"
              as="span"
              width="1rem"
              cursor="help"
              data-tip={capitalize(t(tip))}
              display="inline-block"
            >
              <InfoSVG width="100%" />
            </Box>
            {capitalize(t(name))}
          </Typography>
          <Typography
            variant="normal"
            overflow="hidden"
            textAlign="right"
            whiteSpace="nowrap"
            color="textSecondary"
          >
            {myPositionData[i]}
          </Typography>
        </Box>
      ))}
      <Box mt="XL">
        <Typography variant="normal" textAlign="center" mb="M">
          DNR: {formatDollars(1)}
        </Typography>
        <Typography as="div" variant="normal" textAlign="center" mb="M">
          {isLoading ? (
            <Typography
              as="span"
              width="8rem"
              variant="normal"
              display="inline-block"
            >
              <Skeleton />
            </Typography>
          ) : (
            `${maybeLPTokenName(...symbols)}: ${
              collateralUSDPrice &&
              formatDollars(FixedPointMath.from(collateralUSDPrice).toNumber())
            }`
          )}
        </Typography>
      </Box>
    </Box>
  );
};
export default MyOpenPosition;
