import { ethers } from 'ethers';
import Link from 'next/link';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Routes, RoutesEnum, TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Table, Typography } from '@/elements';
import { useGetDineroMarketErc20Summary } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import {
  CHAIN_ID,
  IntMath,
  LP_DINERO_MARKET_CONTRACTS,
  TOKEN_SYMBOL,
} from '@/sdk';
import { TimesSVG } from '@/svg';
import { formatDollars, getERC20Data } from '@/utils';

import Loading from '../../../../components/loading';

const LPBorrowTable: FC = () => {
  const { chainId } = useIdAccount();
  const { data, error } = useGetDineroMarketErc20Summary();

  if (error)
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          mb="L"
          width="10rem"
          height="10rem"
          color="error"
          overflow="hidden"
          borderRadius="50%"
          border="0.3rem solid"
        >
          <TimesSVG width="100%" height="100%" />
        </Box>
        <Typography variant="title3">Error fetching the contracts</Typography>
      </Box>
    );

  if (!data || !chainId) return <Loading />;

  return (
    <>
      <Box display={['none', 'none', 'none', 'block']}>
        <Table
          hasButton
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
                  Collateral
                </Typography>
              ),
            },
            {
              tip: 'Total Value Locked',
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
              tip: 'Loan to Value',
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
              tip: 'A penalty fee charged to a borrower when his/her position is liquidated.<br />It is expressed as a percentage of the loan',
              item: (
                <>
                  Liquidation <br />
                  Fee
                </>
              ),
            },
          ]}
          data={LP_DINERO_MARKET_CONTRACTS[chainId].map((x, index) => {
            const [tokenA, tokenB] = x.collateralAddress.map((address) =>
              getERC20Data(chainId, address)
            );

            const [Icon, PairIcon] = [
              TOKENS_SVG_MAP[tokenA.symbol] ??
                TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown],
              TOKENS_SVG_MAP[tokenB.symbol] ??
                TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown],
            ];

            return {
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
                    Enter
                  </Button>
                </Link>
              ),
              items: [
                <Box key={v4()} display="flex" alignItems="center">
                  <Box display="inline-block" as="span" width="1.4rem">
                    <Icon width="100%" />
                  </Box>
                  <Box
                    as="span"
                    ml="-0.5rem"
                    width="1.4rem"
                    display="inline-block"
                  >
                    <PairIcon width="100%" />
                  </Box>
                  <Typography variant="normal" ml="M">
                    {`LP (${tokenA.symbol} - ${tokenB.symbol})`}
                  </Typography>
                </Box>,
                formatDollars(
                  IntMath.from(data[index].totalCollateral)
                    .mul(data[index].exchangeRate)
                    .toNumber()
                ),
                IntMath.from(data[index].maxLTVRatio).toPercentage(0),
                IntMath.from(data[index].liquidationFee).toPercentage(2),
              ],
            };
          })}
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
                  data-tip="LTV info"
                >
                  LTV
                </Typography>
              ),
            },
            {
              tip: 'A penalty fee charged to a borrower when his/her position is liquidated.<br />It is expressed as a percentage of the loan',
              item: (
                <>
                  Liquidation <br />
                  Fee
                </>
              ),
            },
          ]}
          data={LP_DINERO_MARKET_CONTRACTS[CHAIN_ID.BNB_TEST_NET].map(
            (x, index) => {
              const [tokenA, tokenB] = x.collateralAddress.map((address) =>
                getERC20Data(chainId, address)
              );

              const [Icon, PairIcon] = [
                TOKENS_SVG_MAP[tokenA.symbol] ??
                  TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown],
                TOKENS_SVG_MAP[tokenB.symbol] ??
                  TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown],
              ];

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
                    <Box display="inline-block" as="span" width="1.4rem">
                      <Icon width="100%" />
                    </Box>
                    <Box
                      as="span"
                      ml="-0.5rem"
                      width="1.4rem"
                      display="inline-block"
                    >
                      <PairIcon width="100%" />
                    </Box>
                    <Typography variant="normal" textAlign="center" mt="M">
                      {`LP (${tokenA.symbol} - ${tokenB.symbol})`}
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
                      Enter
                    </Button>
                  </Link>
                ),
                items: [
                  formatDollars(
                    IntMath.from(data[index].totalCollateral)
                      .mul(data[index].exchangeRate)
                      .value()
                      .div(ethers.utils.parseEther('1'))
                      .toNumber()
                  ),
                  IntMath.from(data[index].maxLTVRatio).toPercentage(0),
                  IntMath.from(data[index].liquidationFee).toPercentage(2),
                ],
              };
            }
          )}
        />
      </Box>
    </>
  );
};

export default LPBorrowTable;
