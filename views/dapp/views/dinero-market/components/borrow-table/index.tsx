import { BigNumber } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { getDineroMarketSVGBySymbol, Routes, RoutesEnum } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { FixedPointMath, SECONDS_IN_A_YEAR } from '@/sdk';
import { formatDollars, formatMoney } from '@/utils';

import { handleFilterDineroMarkets } from '../../dinero-market.utils';
import { BorrowTableProps } from './borrow-table.types';

const BorrowTable: FC<BorrowTableProps> = ({ control, markets }) => {
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
                  {t('dinero-market.borrowTableHeaderCollateral')}
                </Typography>
              ),
            },
            {
              tip: t('dinero-market.borrowTableHeaderTVLTip'),
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
              tip: t('dinero-market.borrowTableHeaderBorrowingTip'),
              item: (
                <Typography
                  as="span"
                  cursor="help"
                  variant="normal"
                  fontSize="inherit"
                >
                  {t('dinero-market.borrowTableHeaderBorrowing')}
                </Typography>
              ),
            },
            {
              tip: t('dinero-market.borrowTableHeaderLTVTip'),
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
              tip: t('dinero-market.borrowTableHeaderInterestCostTip'),
              item: <>{t('dinero-market.borrowTableHeaderInterestCost')}</>,
            },
            {
              tip: t('dinero-market.borrowTableHeaderLiquidationTip'),
              item: <>{t('dinero-market.borrowTableHeaderLiquidation')}</>,
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
                <Button
                  as="div"
                  variant="primary"
                  hover={{ bg: 'accentActive' }}
                >
                  {t('common.enter')}
                </Button>
              </Link>
            ),
            items: [
              <Box key={v4()} display="flex" alignItems="center">
                {getDineroMarketSVGBySymbol(x.symbol0, x.symbol1).map(
                  ({ SVG, highZIndex }, index) => (
                    <Box
                      mr="M"
                      key={v4()}
                      width="1.6rem"
                      ml={index != 0 ? '-1rem' : 'NONE'}
                      zIndex={index == 0 ? (highZIndex ? 3 : 'unset') : 'unset'}
                    >
                      <SVG width="100%" />
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
                  {t('dinero-market.borrowTableHeaderBorrowing')}
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
              item: <>{t('dinero-market.borrowTableHeaderInterestCost')}</>,
            },
            {
              item: <>{t('dinero-market.borrowTableHeaderLiquidation')}</>,
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
                  <Box display="flex">
                    {getDineroMarketSVGBySymbol(x.symbol0, x.symbol1).map(
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
                          <SVG width="100%" />
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
                    as="div"
                    variant="primary"
                    hover={{ bg: 'accentActive' }}
                  >
                    {t('common.enter')}
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
