/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { CHAIN_ID } from '@/constants/chains';
import { DINERO_MARKET_CONTRACTS } from '@/constants/dinero-market-contracts.data';
import { Box, Table, Typography } from '@/elements';
import { TimesSVG } from '@/svg';
import { formatDollars } from '@/utils';

import { Loading } from '../../../../components';
import { TToken } from '../earn-stake-modal/earn-stake-modal.types';
import { getEarnMockData } from './earn-table.mock';
import { EarnTableProps } from './earn-table.types';
import EarnTableCollapsible from './earn-table-collapsible';

const EarnTable: FC<EarnTableProps> = ({
  title,
  currency: { name, Icon, symbol },
}) => {
  const {
    query: { token },
    pathname,
    push,
  } = useRouter();

  const handleSetDropdown = (value: TToken) =>
    push(`${pathname}?token=${value}`, undefined, { shallow: true });

  const closeDropdown = () => push(pathname, undefined, { shallow: true });

  const { data, error } = getEarnMockData(
    title.toLowerCase() as 'stake' | 'farms'
  );

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

  if (!data) return <Loading />;

  return (
    <Box display="flex" flexDirection="column" flex="1">
      <Container dapp px="NONE" width="100%">
        <Typography variant="normal" mt="L">
          {title === 'STAKE' ? 'POOL' : title}
        </Typography>
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
                tip: 'Annual Percentage Yield<br/> (Compounded rate of return)',
                item: (
                  <Typography
                    as="span"
                    cursor="help"
                    variant="normal"
                    fontSize="inherit"
                  >
                    APY
                  </Typography>
                ),
              },
              {
                tip: 'The annual cost of a loan to a borrower, <br /> expressed as a percentage',
                item: (
                  <>
                    Interest Cost <br />
                    (APR)
                  </>
                ),
              },
              {
                tip: 'A penalty fee charged to a borrower when his/her position is liquidated.<br />It is expressed as a percentage of the loan',
                item: (
                  <>
                    Earned
                    {title === 'FARMS' && (
                      <>
                        <br />
                        Fee
                      </>
                    )}
                  </>
                ),
              },
            ]}
            data={DINERO_MARKET_CONTRACTS[CHAIN_ID.BSC_TEST_NET].map(
              (_, index) => ({
                items: [
                  <Box
                    key={v4()}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {Array.isArray(Icon) ? (
                      <Box display="inline-flex">
                        {Icon.map((SVG, index) => (
                          <Box
                            key={v4()}
                            zIndex={Icon.length - index}
                            ml={index != 0 ? '-0.5rem' : 'NONE'}
                          >
                            <SVG width="1.4rem" height="1.4rem" />
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Icon width="1.4rem" height="1.4rem" />
                    )}
                    <Typography variant="normal" ml="M">
                      {name}
                    </Typography>
                  </Box>,
                  formatDollars(data[index].tvl),
                  `${data[index].apy}%`,
                  `${data[index].apr}%`,
                  // @ts-ignore
                  data[index].earned ?? data[index].earnedFee,
                ],
                dropdown: {
                  onOpen: () => handleSetDropdown(symbol as TToken),
                  onClose: closeDropdown,
                  isOpen: token === symbol,
                  node: (
                    <EarnTableCollapsible
                      symbol={symbol}
                      availableAmount={0.000000000001}
                      availableAmountUSD={0.0001}
                      stakeRequestApproval={title === 'FARMS'}
                      stakedAmount={0.000000000001}
                      stakedAmountUSD={0.0001}
                      earnedAmount={title === 'FARMS' ? 0 : 0.000000000001}
                      earnedAmountUSD={title === 'FARMS' ? 0 : 0.0001}
                    />
                  ),
                },
              })
            )}
          />
        </Box>
        <Box display={['flex', 'flex', 'flex', 'none']} alignItems="center">
          <Table
            key={v4()}
            headings={[
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
                tip: 'Annual Percentage Yield<br/> (Compounded rate of return)',
                item: (
                  <Typography
                    as="span"
                    cursor="help"
                    variant="normal"
                    fontSize="inherit"
                  >
                    APY
                  </Typography>
                ),
              },
              {
                tip: 'The annual cost of a loan to a borrower, <br /> expressed as a percentage',
                item: (
                  <>
                    Interest Cost <br />
                    (APR)
                  </>
                ),
              },
              {
                tip: 'A penalty fee charged to a borrower when his/her position is liquidated.<br />It is expressed as a percentage of the loan',
                item: (
                  <>
                    Earned
                    {title === 'FARMS' && (
                      <>
                        <br />
                        Fee
                      </>
                    )}
                  </>
                ),
              },
            ]}
            data={DINERO_MARKET_CONTRACTS[CHAIN_ID.BSC_TEST_NET].map(
              (_, index) => ({
                mobileSide: (
                  <Box
                    key={v4()}
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                  >
                    {Array.isArray(Icon) ? (
                      <Box display="inline-flex">
                        {Icon.map((SVG, index) => (
                          <Box
                            key={v4()}
                            zIndex={Icon.length - index}
                            ml={index != 0 ? '-0.5rem' : 'NONE'}
                          >
                            <SVG width="1.6rem" height="1.6rem" />
                          </Box>
                        ))}
                      </Box>
                    ) : (
                      <Icon width="1.6rem" height="1.6rem" />
                    )}
                    <Typography
                      mt="M"
                      variant="normal"
                      textAlign="center"
                      whiteSpace="nowrap"
                    >
                      {name}
                    </Typography>
                  </Box>
                ),
                items: [
                  formatDollars(data[index].tvl),
                  `${data[index].apy}%`,
                  `${data[index].apr}%`,
                  // @ts-ignore
                  data[index].earned ?? data[index].earnedFee,
                ],
                dropdown: {
                  onClose: closeDropdown,
                  isOpen: token === symbol,
                  onOpen: () => handleSetDropdown(symbol as TToken),
                  node: (
                    <EarnTableCollapsible
                      symbol={symbol}
                      availableAmount={0.000000000001}
                      availableAmountUSD={0.0001}
                      stakeRequestApproval={title === 'FARMS'}
                      stakedAmount={0.000000000001}
                      stakedAmountUSD={0.0001}
                      earnedAmount={title === 'FARMS' ? 0 : 0.000000000001}
                      earnedAmountUSD={title === 'FARMS' ? 0 : 0.0001}
                    />
                  ),
                },
              })
            )}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default EarnTable;
