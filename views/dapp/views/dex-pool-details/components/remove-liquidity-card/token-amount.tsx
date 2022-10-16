import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { Box, Typography } from '@/elements';

import { TokenAmountProps } from './remove-liquidity-card.types';

const TokenAmount: FC<TokenAmountProps> = ({ Icon, symbol, control, name }) => {
  const t = useTranslations();
  const amount = useWatch({ control, name });
  return (
    <>
      {Icon}
      <Typography variant="normal" ml="M">
        {symbol == '???' ? (
          <Box width="2.5rem">
            <Skeleton />
          </Box>
        ) : (
          symbol
        )}
      </Typography>
      <Typography variant="normal">{t('special.colon') + amount}</Typography>
    </>
  );
};

export default TokenAmount;
