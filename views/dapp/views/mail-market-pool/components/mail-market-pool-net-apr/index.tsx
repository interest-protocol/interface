import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { InfoSVG } from '@/svg';
import { toFixedToPrecision } from '@/utils';

import { MAILMarketPoolNetAprProps } from '../../mail-market-pool.types';

const MAILMarketPoolNetApr: FC<MAILMarketPoolNetAprProps> = ({
  loading,
  data,
}) => {
  const { locale } = useRouter();
  const t = useTranslations();
  return (
    <Box p="XL" bg="foreground" borderRadius="L">
      <Typography mb="M" variant="normal" pb="L">
        {t('mail-market-pool.mailMarketPoolNetTitle')}
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="1rem">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            mb="M"
            fontSize="S"
            variant="normal"
            color="textSecondary"
            textTransform="uppercase"
          >
            {t('common.net')} APR
            <Box
              as="span"
              cursor="help"
              data-tip={t('mail-market-pool.poolNetTip', {
                locale,
                type: t(
                  data.net.isPositive
                    ? 'mail-market-pool.earning'
                    : 'mail-market-pool.paying'
                ),
              })}
              display="inline-block"
              ml="M"
            >
              <InfoSVG width="0.8rem" />
            </Box>
          </Typography>
          <Typography variant="normal" fontWeight="500" fontSize="XL">
            {loading ? (
              <Skeleton width="80%" />
            ) : (
              `${data.net.isPositive ? '' : '-'}${toFixedToPrecision(
                FixedPointMath.from(data.net.rate).toNumber(16, 4, 4),
                4,
                3
              )}%`
            )}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            mb="M"
            fontSize="S"
            display="flex"
            variant="normal"
            alignItems="center"
            color="textSecondary"
            textTransform="uppercase"
          >
            {t('common.supply')} APR
            <Box
              as="span"
              cursor="help"
              data-tip={t('mail-market-pool.poolSupplyTip')}
              display="inline-block"
              ml="M"
            >
              <InfoSVG width="0.8rem" />
            </Box>
          </Typography>
          <Typography variant="normal" fontWeight="500" fontSize="XL">
            {loading ? (
              <Skeleton width="80%" />
            ) : (
              `${toFixedToPrecision(
                FixedPointMath.from(data.mySupplyRate).toNumber(16, 4, 4),
                4,
                3
              )}%`
            )}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography
            mb="M"
            fontSize="S"
            display="flex"
            variant="normal"
            alignItems="center"
            color="textSecondary"
            textTransform="uppercase"
          >
            {t('common.borrow')} APR
            <Box
              as="span"
              cursor="help"
              data-tip={t('mail-market-pool.poolBorrowTip')}
              display="inline-block"
              ml="M"
            >
              <InfoSVG width="0.8rem" />
            </Box>
          </Typography>
          <Typography variant="normal" fontWeight="500" fontSize="XL">
            {loading ? (
              <Skeleton width="80%" />
            ) : (
              `-${toFixedToPrecision(
                FixedPointMath.from(data.myBorrowRate).toNumber(16, 4, 4),
                4,
                3
              )}%`
            )}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MAILMarketPoolNetApr;
