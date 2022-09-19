import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';
import { InfoSVG, ProgressSVG } from '@/svg';
import { toFixedToPrecision } from '@/utils';

import { UserLTVProps } from './user-ltv.types';

const UserLTV: FC<UserLTVProps> = ({ isLoading, ltv }) => {
  const t = useTranslations();
  return (
    <Box p="XL" order={1} gridArea="b" bg="foreground" borderRadius="L">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="normal" display="flex" alignItems="center">
          <Box
            mr="M"
            as="span"
            width="1rem"
            cursor="help"
            display="inline-block"
            data-tip={t('dineroMarketAddress.userLTVTip')}
          >
            <InfoSVG width="100%" />
          </Box>
          {t('dineroMarketAddress.userLTVTitle')}
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
            toFixedToPrecision(ltv, 4)
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
};
export default UserLTV;
