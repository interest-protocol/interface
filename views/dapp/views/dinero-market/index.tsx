import { ethers } from 'ethers';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';
import { v4 } from 'uuid';

import { Container, Web3Manager } from '@/components';
import priorityHooks from '@/connectors';
import { DINERO_MARKET_CONTRACTS_MAP } from '@/constants/dinero-market-contracts.data';
import {
  BSC_TEST_ERC_20_DATA,
  TOKEN_SYMBOL,
  TOKENS_SVG_MAP,
} from '@/constants/erc-20.data';
import { SECONDS_IN_A_YEAR } from '@/constants/index';
import { Box, Typography } from '@/elements';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { Fraction } from '@/sdk/entities/fraction';
import { IntMath } from '@/sdk/entities/int-math';
import { InfoSVG, ProgressSVG } from '@/svg';
import {} from '@/svg';
import { formatDollars, formatMoney } from '@/utils';
import {
  calculateDineroLeftToBorrow,
  calculateLiquidationPrice,
  calculateUserLTVRatio,
  getDineroMarketUserData,
  loanPrincipalToElastic,
  safeAmountToWithdraw,
} from '@/utils/dinero-market';
import { getERC20Balance } from '@/utils/erc-20';
import { IBorrowFormField } from '@/views/dapp/views/dinero-market/components/borrow-form/borrow-form.types';

import GoBack from '../../components/go-back';
import BorrowForm from './components/borrow-form';
import {
  BORROW_DEFAULT_VALUES,
  LOAN_INFO,
  MY_POSITION,
} from './dinero-market.data';
import { DineroMarketProps, IBorrowForm } from './dinero-market.types';
import DineroMarketSwitch from './dinero-market-switch';

const { usePriorityAccount, usePriorityProvider, usePriorityChainId } =
  priorityHooks;

const DineroMarket: FC<DineroMarketProps> = ({ currency, mode }) => {
  const [isGettingData, setIsGettingData] = useState(false);
  const form = useForm<IBorrowForm>({
    defaultValues: BORROW_DEFAULT_VALUES,
  });

  const account = usePriorityAccount();
  const provider = usePriorityProvider();
  const chainId = usePriorityChainId();

  const { data } = useSWR(
    `${account}-${currency}-${chainId}-dinero-market`,
    async () => {
      setIsGettingData(true);
      if (!account || !provider || !chainId) {
        setIsGettingData(false);
        return Promise.reject();
      }

      const dineroMarketContract =
        DINERO_MARKET_CONTRACTS_MAP[chainId][currency];

      const [currencyBalance, dineroBalance, marketData] = await Promise.all([
        getERC20Balance(
          account,
          BSC_TEST_ERC_20_DATA[currency].address,
          provider
        ),
        getERC20Balance(
          account,
          BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.DNR].address,
          provider
        ),
        getDineroMarketUserData(dineroMarketContract, account, provider),
      ]);

      setIsGettingData(false);
      return {
        balances: [
          CurrencyAmount.fromRawAmount(
            BSC_TEST_ERC_20_DATA[currency],
            currencyBalance
          ),
          CurrencyAmount.fromRawAmount(
            BSC_TEST_ERC_20_DATA[TOKEN_SYMBOL.DNR],
            dineroBalance
          ),
        ],
        market: marketData,
      };
    }
  );

  const repayFieldsData = useMemo(
    () =>
      data?.balances.reduce((acc, x) => {
        const SVG = TOKENS_SVG_MAP[x.currency.symbol];
        if (x.currency.symbol === TOKEN_SYMBOL.DNR)
          return [
            ...acc,
            {
              amount: '0',
              amountUSD: 1,
              CurrencySVG: SVG,
              name: 'repay.loan',
              label: 'Repay Dinero',
              max: +x.toSignificant(4),
              currency: TOKEN_SYMBOL.DNR,
            } as IBorrowFormField,
          ];

        if (x.currency.symbol === currency)
          return [
            ...acc,
            {
              currency,
              amount: '0',
              CurrencySVG: SVG,
              max: +x.toSignificant(4),
              name: 'repay.collateral',
              label: 'Remove Collateral',
              amountUSD: data?.market.exchangeRate.isZero()
                ? 0
                : data?.market.exchangeRate
                    .div(ethers.utils.parseEther('1'))
                    .toNumber() || 0,
            } as IBorrowFormField,
          ];
        return acc;
      }, [] as ReadonlyArray<IBorrowFormField>),
    [data, currency]
  );

  const borrowFieldsData = useMemo(
    () =>
      data?.balances.reduce((acc, x) => {
        const SVG = TOKENS_SVG_MAP[x.currency.symbol];
        if (x.currency.symbol === TOKEN_SYMBOL.DNR)
          return [
            ...acc,
            {
              max: 0,
              amount: '0',
              amountUSD: 1,
              CurrencySVG: SVG,
              name: 'borrow.loan',
              label: 'Borrow Dinero',
              currency: TOKEN_SYMBOL.DNR,
            } as IBorrowFormField,
          ];

        if (x.currency.symbol === currency)
          return [
            ...acc,
            {
              currency,
              amount: '0',
              CurrencySVG: SVG,
              max: +x.toSignificant(4),
              name: 'borrow.collateral',
              label: 'Deposit Collateral',
              amountUSD: data?.market.exchangeRate.isZero()
                ? 0
                : data?.market.exchangeRate
                    .div(ethers.utils.parseEther('1'))
                    .toNumber() || 0,
            } as IBorrowFormField,
          ];
        return acc;
      }, [] as ReadonlyArray<IBorrowFormField>),
    [data, currency]
  );

  const borrowFormLoanData = useMemo(() => ['0', '0', '0'], [data]);

  const loanInfoData = useMemo(() => {
    if (!data || !data?.market) return ['0%', '0%', '0%'];
    const { ltvRatio, loan, liquidationFee } = data.market;
    return [
      `${IntMath.from(ltvRatio).toPercentage()}`,
      `${IntMath.from(liquidationFee).toPercentage()}`,
      `${IntMath.from(
        loan.INTEREST_RATE.mul(SECONDS_IN_A_YEAR)
      ).toPercentage()}`,
    ];
  }, [data]);

  const myPositionData = useMemo(() => {
    if (!data || !data.market) return ['0', '$0', '0', '$0', '0', '0'];

    const collateral = CurrencyAmount.fromRawAmount(
      BSC_TEST_ERC_20_DATA[currency],
      data.market.userCollateral
    );

    const liquidationPrice = formatMoney(
      +Fraction.from(
        calculateLiquidationPrice(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan,
          data.market.exchangeRate
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1)
    );
    return [
      collateral.toSignificant(4),
      formatMoney(+collateral.toSignificant(0)),
      Fraction.from(
        loanPrincipalToElastic(
          data.market.totalLoan,
          data.market.userLoan
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1),
      liquidationPrice,
      Fraction.from(
        calculateDineroLeftToBorrow(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan,
          data.market.exchangeRate
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1),
      Fraction.from(
        safeAmountToWithdraw(
          data.market.ltvRatio,
          data.market.totalLoan,
          data.market.userCollateral,
          data.market.userLoan,
          data.market.exchangeRate
        ).value(),
        ethers.utils.parseEther('1')
      ).toSignificant(1),
    ];
  }, [data, currency]);

  const onSubmitBorrow = (data: IBorrowForm) => {
    console.log(data);
  };

  const onSubmitRepay = (data: IBorrowForm) => {
    console.log(data);
  };

  return (
    <Web3Manager>
      <Container
        dapp
        my="XL"
        display="flex"
        position="relative"
        flexDirection="column"
      >
        <Box
          textAlign={['center', 'center', 'center', 'left']}
          left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
          position={['static', 'static', 'absolute', 'static', 'absolute']}
        >
          <GoBack />
        </Box>
        <Box>
          <Box bg="foreground" textAlign="center" p="L" borderRadius="L">
            <DineroMarketSwitch currency={currency} mode={mode} />
          </Box>
          <Box
            my="L"
            rowGap="0.7rem"
            columnGap="0.7rem"
            gridTemplateColumns="1fr 1fr"
            display={['flex', 'flex', 'flex', 'grid']}
            alignItems={['stretch', 'stretch', 'stretch', 'start']}
            flexDirection={['column', 'column', 'column', 'unset']}
            gridTemplateAreas="'a b''a b''a c''a d''a d''a d''e d''e d''e d''f d'"
          >
            {mode === 'borrow' && (
              <BorrowForm
                isBorrow
                loading={isGettingData}
                onSubmit={onSubmitBorrow}
                loanData={borrowFormLoanData}
                fields={borrowFieldsData || []}
                ltvRatio={
                  +IntMath.from(data!.market.ltvRatio)
                    .toPercentage()
                    .replace(' %', '')
                }
                {...form}
              />
            )}
            {mode === 'repay' && (
              <BorrowForm
                loading={isGettingData}
                onSubmit={onSubmitRepay}
                loanData={borrowFormLoanData}
                fields={repayFieldsData || []}
                ltvRatio={
                  +IntMath.from(data!.market.ltvRatio)
                    .toPercentage()
                    .replace(' %', '')
                }
                {...form}
              />
            )}
            <Box
              py="XL"
              px="XXL"
              order={1}
              bg="foreground"
              borderRadius="L"
              gridArea="b"
            >
              <Box display="flex" justifyContent="space-between">
                <Typography variant="normal" display="flex" alignItems="center">
                  <Box
                    mr="M"
                    as="span"
                    display="inline-block"
                    data-tip="Loan to value"
                  >
                    <InfoSVG width="1rem" />
                  </Box>
                  LTV
                </Typography>
                <Typography variant="normal" color="textSecondary">
                  {isGettingData ? (
                    <Typography
                      width="4rem"
                      variant="normal"
                      display="inline-block"
                    >
                      <Skeleton />
                    </Typography>
                  ) : data?.market ? (
                    calculateUserLTVRatio(
                      data.market.ltvRatio,
                      data.market.totalLoan,
                      data.market.userCollateral,
                      data.market.userLoan
                    ).toPercentage()
                  ) : (
                    '0'
                  )}{' '}
                  of 100%
                </Typography>
              </Box>
              <Box color="accent" mt="L">
                <ProgressSVG
                  progress={
                    data?.market
                      ? calculateUserLTVRatio(
                          data.market.ltvRatio,
                          data.market.totalLoan,
                          data.market.userCollateral,
                          data.market.userLoan
                        )
                          .value()
                          .isZero()
                        ? 0
                        : calculateUserLTVRatio(
                            data.market.ltvRatio,
                            data.market.totalLoan,
                            data.market.userCollateral,
                            data.market.userLoan
                          )
                            .value()
                            .div(ethers.utils.parseEther('1'))
                            .toNumber()
                      : 0
                  }
                />
              </Box>
            </Box>
            <Box
              py="XL"
              px="XXL"
              order={4}
              gridArea="c"
              bg="foreground"
              borderRadius="L"
            >
              {LOAN_INFO.map(({ name, tip }, i) => (
                <Box
                  my="L"
                  key={v4()}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="normal"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      mr="M"
                      as="span"
                      cursor="help"
                      data-tip={tip}
                      display="inline-block"
                    >
                      <InfoSVG width="1rem" />
                    </Box>
                    {name}
                  </Typography>
                  <Typography variant="normal" color="textSecondary">
                    {isGettingData ? (
                      <Typography
                        width="3rem"
                        variant="normal"
                        display="inline-block"
                      >
                        <Skeleton />
                      </Typography>
                    ) : (
                      loanInfoData[i]
                    )}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              py="XL"
              px="XXL"
              order={5}
              gridArea="d"
              bg="foreground"
              borderRadius="L"
            >
              <Typography variant="normal" textTransform="uppercase" mt="L">
                My open position:
              </Typography>
              {MY_POSITION.map(({ name, tip }, i) => (
                <Box
                  my="L"
                  key={v4()}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="normal"
                    display="flex"
                    alignItems="center"
                  >
                    <Box
                      mr="M"
                      as="span"
                      cursor="help"
                      data-tip={tip}
                      display="inline-block"
                    >
                      <InfoSVG width="1rem" />
                    </Box>
                    {name}
                  </Typography>
                  <Typography variant="normal" color="textSecondary">
                    {myPositionData[i]}
                  </Typography>
                </Box>
              ))}
              <Box mt="XL">
                <Typography variant="normal" textAlign="center" mb="M">
                  DNR: {formatDollars(1)}
                </Typography>
                <Typography variant="normal" textAlign="center" mb="M">
                  BTC:{' '}
                  {isGettingData ? (
                    <Typography
                      width="4rem"
                      variant="normal"
                      display="inline-block"
                    >
                      <Skeleton />
                    </Typography>
                  ) : (
                    `${formatDollars(
                      data?.market.exchangeRate.isZero()
                        ? 0
                        : data?.market.exchangeRate
                            .div(ethers.utils.parseEther('1'))
                            .toNumber() || 0
                    )}`
                  )}
                </Typography>
              </Box>
            </Box>
            <Box
              py="XL"
              px="XXL"
              order={3}
              gridArea="e"
              bg="foreground"
              borderRadius="L"
            >
              <Typography variant="normal" textTransform="uppercase" mt="L">
                Your balance:
              </Typography>
              {isGettingData ? (
                <Box
                  my="XL"
                  rowGap="0.7rem"
                  display="grid"
                  gridTemplateRows="1fr 1fr"
                >
                  <Skeleton wrapper={Box} />
                  <Skeleton wrapper={Box} />
                </Box>
              ) : (
                data?.balances.map((x) => {
                  const SVG = TOKENS_SVG_MAP[x.currency.symbol];
                  return (
                    <Box
                      key={v4()}
                      display="flex"
                      justifyContent="space-between"
                      my="L"
                    >
                      <Box display="flex">
                        <SVG width="1rem" />
                        <Typography ml="M" variant="normal">
                          {x.currency.name}
                        </Typography>
                      </Box>
                      <Typography variant="normal" color="textSecondary">
                        {formatMoney(+x.toSignificant(4))}
                      </Typography>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Web3Manager>
  );
};

export default DineroMarket;
