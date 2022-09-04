import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk/entities/fixed-point-math';
import { InfoSVG } from '@/svg';
import { formatDollars, maybeLPTokenName } from '@/utils';

import { MyOpenPositionProps } from './my-open-position.types';

const MyOpenPosition: FC<MyOpenPositionProps> = ({
  symbols,
  isLoading,
  myPositionData,
  collateralUSDPrice,
}) => {
  const t = useTranslations();
  const MY_POSITION = [1, 2, 3, 4, 5, 6].map((item) => ({
    name: t('dinero-market-address.positonName' + item),
    tip: t('dinero-market-address.positionTip' + item),
  }));

  return (
    <Box p="XL" order={5} gridArea="c" bg="foreground" borderRadius="L">
      <Typography variant="normal" textTransform="uppercase" mt="L">
        {t('dinero-market-address.positionTitle')}:
      </Typography>
      {MY_POSITION.map(({ name, tip }, i) => (
        <Box my="L" key={v4()} display="flex" justifyContent="space-between">
          <Typography variant="normal" display="flex" alignItems="center">
            <Box
              mr="M"
              as="span"
              width="1rem"
              cursor="help"
              data-tip={tip}
              display="inline-block"
            >
              <InfoSVG width="100%" />
            </Box>
            {name}
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
