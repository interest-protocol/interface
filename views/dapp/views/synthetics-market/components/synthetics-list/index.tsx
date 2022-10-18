import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import {
  getSyntheticsMarketSVGByAddress,
  Routes,
  RoutesEnum,
} from '@/constants';
import { Box, Typography } from '@/elements';
import { FixedPointMath, SECONDS_IN_A_YEAR } from '@/sdk';
import { formatDollars, formatMoney } from '@/utils';

import { handleFilterDineroMarkets } from '../../synthetics-market.utils';
import { SyntheticsListProps } from './synthetics-list.types';

const SyntheticsList: FC<SyntheticsListProps> = ({
  control,
  markets,
  chainId,
}) => {
  const t = useTranslations();
  const { push } = useRouter();
  const sortBy = useWatch({ control, name: 'sortBy' });
  const search = useWatch({ control, name: 'search' });
  const onlyBorrowing = useWatch({ control, name: 'onlyBorrowing' });

  const filteredMarkets = handleFilterDineroMarkets(
    markets,
    sortBy,
    search,
    onlyBorrowing
  );

  return (
    <>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gridGap="1rem">
        {filteredMarkets.map((x) => (
          <Box
            p="XL"
            key={v4()}
            display="flex"
            bg="foreground"
            cursor="pointer"
            borderRadius="L"
            border="1px solid"
            borderColor="foreground"
            hover={{
              borderColor: 'accent',
            }}
            flexDirection="column"
            onClick={() =>
              push({
                pathname: Routes[RoutesEnum.SyntheticsMarketBorrow],
                query: { address: x.marketAddress },
              })
            }
          >
            <Box
              key={v4()}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box display="flex">
                {getSyntheticsMarketSVGByAddress(chainId, x.marketAddress).map(
                  ({ SVG, highZIndex }, index) => (
                    <Box
                      key={v4()}
                      width="4rem"
                      ml={index != 0 ? '-1rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" />
                    </Box>
                  )
                )}
              </Box>
              <Typography variant="normal" textAlign="center" my="M">
                {x.name}
              </Typography>
              <Typography
                cursor="help"
                fontSize="L"
                fontWeight="600"
                variant="normal"
                data-tip={t('syntheticsMarket.tableHeading.TVLTip')}
              >
                {formatDollars(
                  FixedPointMath.from(
                    x.totalCollateral
                      .mul(x.collateralUSDPrice)
                      .div(BigNumber.from(10).pow(x.collateralDecimals))
                  ).toNumber()
                )}
              </Typography>
              <Typography
                my="S"
                fontSize="S"
                cursor="help"
                variant="normal"
                data-tip={t('syntheticsMarket.tableHeading.synthesizedTip')}
              >
                {formatMoney(FixedPointMath.toNumber(x.userElasticLoan))}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="L">
              <Box my="S" fontSize="S">
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                  data-tip={t('syntheticsMarket.tableHeading.LTVTip')}
                >
                  LTV
                </Typography>
                : {FixedPointMath.from(x.LTV).toPercentage(0)}
              </Box>
              <Box my="S" fontSize="S">
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                  data-tip={t('syntheticsMarket.tableHeading.feeTip')}
                >
                  {t('syntheticsMarket.tableHeading.fee')}
                </Typography>
                :{' '}
                {x.interestRate.isZero()
                  ? 'N/A'
                  : FixedPointMath.from(
                      x.interestRate.mul(SECONDS_IN_A_YEAR)
                    ).toPercentage(2)}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default SyntheticsList;
