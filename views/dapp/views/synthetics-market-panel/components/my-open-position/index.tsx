import { useTranslations } from 'next-intl';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import { Box, Typography } from '@/elements';
import { TTranslatedMessage } from '@/interface';
import { FixedPointMath } from '@/sdk/entities/fixed-point-math';
import { InfoSVG } from '@/svg';
import { capitalize, formatDollars } from '@/utils';

import { TInfo } from '../../synthetics-market.types';
import { MyOpenPositionProps } from './my-open-position.types';

const MY_POSITION: TInfo = [1, 2, 3, 4, 5, 6].map((item) => ({
  name: ('syntheticsMarketAddress.positionName' + item) as TTranslatedMessage,
  tip: ('syntheticsMarketAddress.positionTip' + item) as TTranslatedMessage,
}));

const MyOpenPosition: FC<MyOpenPositionProps> = ({
  symbol,
  isLoading,
  myPositionData,
  syntUSDPrice,
}) => {
  const t = useTranslations();

  const translationValues = {
    syntheticSymbol: symbol,
  };

  return (
    <Box p="XL" order={5} gridArea="c" bg="foreground" borderRadius="L">
      <Typography variant="normal" textTransform="uppercase" mt="L">
        {t('syntheticsMarketAddress.positionTitle')}:
      </Typography>
      {MY_POSITION.map(({ name, tip }, i) => (
        <Box
          my="L"
          key={v4()}
          display={['block', 'block', 'block', 'flex']}
          justifyContent={['unset', 'unset', 'unset', 'space-between']}
        >
          <Typography variant="normal" display="flex" alignItems="center">
            <Box
              mr="M"
              as="span"
              width="1rem"
              cursor="help"
              data-tip={capitalize(t(tip, translationValues))}
              display="inline-block"
            >
              <InfoSVG width="100%" />
            </Box>
            {t(name, translationValues)}
          </Typography>
          <Typography
            variant="normal"
            overflow="hidden"
            color="textSecondary"
            ml={['XL', 'XL', 'XL', 'L']}
            mt={['M', 'M', 'M', 'unset']}
            textAlign={['unset', 'unset', 'unset', 'right']}
          >
            {myPositionData[i]}
          </Typography>
        </Box>
      ))}
      <Box mt="XL">
        <Box textAlign="center" mb="M">
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
            `${symbol}: ${formatDollars(
              FixedPointMath.from(syntUSDPrice).toNumber()
            )}`
          )}
        </Box>
        <Typography variant="normal" textAlign="center" mb="M">
          BUSD: {formatDollars(1)}
        </Typography>
      </Box>
    </Box>
  );
};
export default MyOpenPosition;
