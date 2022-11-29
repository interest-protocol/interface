import { BigNumber } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { getDineroMarketSVGByAddress, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { FixedPointMath, SECONDS_IN_A_YEAR } from '@/sdk';
import { capitalize, formatDollars, formatMoney } from '@/utils';

import { handleFilterDineroMarkets } from '../../dinero-market.utils';
import { BorrowTableProps } from './borrow-table.types';

const BorrowTable: FC<BorrowTableProps> = ({ control, markets, chainId }) => {
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
      <Box display={['none', 'none', 'none', 'block']}>
        <Table
          hasButton
          separated
          key={v4()}
          headings={[
            {
              item: (
                <Typography
                  as="span"
                  fontSize="S"
                  variant="normal"
                  textAlign="center"
                  display={['none', 'block']}
                >
                  {t('dineroMarket.tableHeaderCollateral')}
                </Typography>
              ),
            },
            {
              tip: t('dineroMarket.tableHeaderTVLTip'),
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  TVL
                </Typography>
              ),
            },
            {
              tip: t('dineroMarket.tableHeaderBorrowingTip'),
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  {t('dineroMarket.tableHeaderBorrowing')}
                </Typography>
              ),
            },
            {
              tip: t('dineroMarket.tableHeaderLTVTip'),
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  LTV
                </Typography>
              ),
            },
            {
              tip: t('dineroMarket.tableHeaderInterestCostTip'),
              item: <>{t('dineroMarket.tableHeaderInterestCost')}</>,
            },
            {
              tip: t('dineroMarket.tableHeaderLiquidationTip'),
              item: <>{t('dineroMarket.tableHeaderLiquidation')}</>,
            },
          ]}
          data={filteredMarkets.map((x) => ({
            handleClick: () =>
              push({
                pathname: Routes[RoutesEnum.DineroMarketBorrow],
                query: { address: x.marketAddress },
              }),
            button: (
              <Link
                href={{
                  pathname: Routes[RoutesEnum.DineroMarketBorrow],
                  query: { address: x.marketAddress },
                }}
              >
                <Button variant="primary" hover={{ bg: 'accentActive' }}>
                  {capitalize(t('common.enter'))}
                </Button>
              </Link>
            ),
            items: [
              <Box key={v4()} display="flex" alignItems="center">
                {getDineroMarketSVGByAddress(chainId, x.marketAddress).map(
                  ({ SVG, highZIndex }, index) => (
                    <Box
                      mr="M"
                      key={v4()}
                      width="1.6rem"
                      ml={index != 0 ? '-1rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" maxHeight="1.6rem" maxWidth="1.6rem" />
                    </Box>
                  )
                )}
                <Typography variant="normal" ml="M">
                  {x.name}
                </Typography>
              </Box>,
              formatDollars(
                FixedPointMath.from(
                  x.totalCollateral
                    .mul(x.collateralUSDPrice)
                    .div(BigNumber.from(10).pow(x.collateralDecimals))
                ).toNumber()
              ),
              formatMoney(FixedPointMath.toNumber(x.userElasticLoan)),
              FixedPointMath.from(x.LTV).toPercentage(0),
              x.interestRate.isZero()
                ? 'N/A'
                : FixedPointMath.from(
                    x.interestRate.mul(SECONDS_IN_A_YEAR)
                  ).toPercentage(2),
              FixedPointMath.from(x.liquidationFee).toPercentage(2),
            ],
          }))}
        />
      </Box>
      <Box display={['flex', 'flex', 'flex', 'none']} alignItems="center">
        <Table
          key={v4()}
          headings={[
            {
              item: (
                <Typography
                  as="span"
                  key={v4()}
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                  data-tip="TVL info"
                >
                  TVL
                </Typography>
              ),
            },
            {
              item: (
                <Typography
                  as="span"
                  key={v4()}
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                  data-tip="TVL info"
                >
                  {t('dineroMarket.tableHeaderBorrowing')}
                </Typography>
              ),
            },
            {
              item: (
                <Typography
                  as="span"
                  key={v4()}
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                  data-tip="LTV info"
                >
                  LTV
                </Typography>
              ),
            },
            {
              item: <>{t('dineroMarket.tableHeaderInterestCost')}</>,
            },
            {
              item: <>{t('dineroMarket.tableHeaderLiquidation')}</>,
            },
          ]}
          data={filteredMarkets.map((x) => {
            return {
              mobileSide: (
                <Box
                  flex="1"
                  key={v4()}
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Box display="flex" ml="M">
                    {getDineroMarketSVGByAddress(chainId, x.marketAddress).map(
                      ({ SVG, highZIndex }, index) => (
                        <Box
                          mr="M"
                          as="span"
                          key={v4()}
                          width="1.6rem"
                          display="inline-block"
                          ml={index != 0 ? '-1rem' : 'NONE'}
                          zIndex={index == 0 && highZIndex ? 3 : 'unset'}
                        >
                          <SVG
                            width="100%"
                            maxHeight="1.6rem"
                            maxWidth="1.6rem"
                          />
                        </Box>
                      )
                    )}
                  </Box>
                  <Typography variant="normal" textAlign="center" mt="M">
                    {x.name}
                  </Typography>
                </Box>
              ),
              button: (
                <Link
                  href={{
                    pathname: Routes[RoutesEnum.DineroMarketBorrow],
                    query: { address: x.marketAddress },
                  }}
                >
                  <Button
                    key={v4()}
                    variant="primary"
                    hover={{ bg: 'accentActive' }}
                  >
                    {capitalize(t('common.enter'))}
                  </Button>
                </Link>
              ),
              items: [
                formatDollars(
                  FixedPointMath.from(
                    x.totalCollateral
                      .mul(x.collateralUSDPrice)
                      .div(BigNumber.from(10).pow(x.collateralDecimals))
                  ).toNumber()
                ),
                formatMoney(FixedPointMath.toNumber(x.userElasticLoan)),
                FixedPointMath.from(x.LTV).toPercentage(0),
                x.interestRate.isZero()
                  ? 'N/A'
                  : FixedPointMath.from(
                      x.interestRate.mul(SECONDS_IN_A_YEAR)
                    ).toPercentage(2),
                FixedPointMath.from(x.liquidationFee).toPercentage(2),
              ],
            };
          })}
        />
      </Box>
    </>
  );
};

export default BorrowTable;
