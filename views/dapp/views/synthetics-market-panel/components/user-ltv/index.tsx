import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Box, Typography } from '@/elements';
import { InfoSVG, ProgressSVG } from '@/svg';
import { toFixedToPrecision } from '@/utils';

import { UserLTVProps } from './user-ltv.types';

const UserLTV: FC<UserLTVProps> = ({ ltv }) => {
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
            data-tip={t('syntheticsMarketAddress.userLTVTip')}
          >
            <InfoSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
          {t('syntheticsMarketAddress.userLTVTitle')}
        </Typography>
        <Box textAlign="right" whiteSpace="nowrap" color="textSecondary">
          {ltv >= 100 ? 100 : toFixedToPrecision(ltv, 4)}
          {t('syntheticsMarketAddress.rangeOf')}
        </Box>
      </Box>
      <Box color={(ltv ?? 0) > 70 ? 'error' : 'accent'} mt="L">
        <ProgressSVG
          progress={ltv || 0}
          width="100%"
          height="100%"
          maxHeight="10rem"
          maxWidth="10rem"
        />
      </Box>
    </Box>
  );
};

export default UserLTV;
