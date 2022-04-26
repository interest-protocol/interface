import { yupResolver } from '@hookform/resolvers/yup';
import { ethers } from 'ethers';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { Container, Web3Manager } from '@/components';
import priorityHooks from '@/connectors';
import { CHAIN_ID, CHAINS } from '@/constants/chains';
import { DINERO_MARKET_CONTRACTS_MAP } from '@/constants/dinero-market-contracts.data';
import { BSC_TEST_ERC_20_DATA, TOKEN_SYMBOL } from '@/constants/erc-20.data';
import { Box } from '@/elements';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { IntMath } from '@/sdk/entities/int-math';
import {
  addCollateralAndLoan,
  addDineroMarketCollateral,
  calculatePositionHealth,
  getDineroMarketLoan,
  getDineroMarketUserData,
  getLoanInfoData,
  getMyPositionData,
  loanElasticToPrincipal,
  processData,
  repayAndWithdrawCollateral,
  repayDineroLoan,
  withdrawDineroCollateral,
} from '@/utils/dinero-market';
import { MarketAndBalancesData } from '@/utils/dinero-market/dinero-market.types';
import { addAllowance, getERC20Balance } from '@/utils/erc-20';
import { throwContractCallError } from '@/utils/error';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketProps, IBorrowForm } from './dinero-market.types';
import DineroMarketForm from './dinero-market-form';
import DineroMarketSwitch from './dinero-market-switch';

const { usePriorityAccount, usePriorityProvider, usePriorityChainId } =
  priorityHooks;

const DineroMarket: FC<DineroMarketProps> = ({ currency, mode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGettingData, setIsGettingData] = useState(false);
  const form = useForm<IBorrowForm>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

  const account = usePriorityAccount();
  const provider = usePriorityProvider();
  const chainId = usePriorityChainId();

  const handleAddAllowance = useCallback(async () => {
    setIsSubmitting(true);
    try {
      if (!account || !chainId || !provider)
        throw new Error('Error! Verify your wallet connection');

      return await addAllowance(
        account,
        BSC_TEST_ERC_20_DATA[currency].address,
        provider,
        DINERO_MARKET_CONTRACTS_MAP[chainId][currency]
      );
    } catch (e) {
      throw e ?? new Error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  }, [account, currency, provider, chainId]);

  const submitAllowance = () =>
    toast.promise(handleAddAllowance(), {
      loading: 'Allowing...',
      success: 'Success!',
      error: ({ message }) => message,
    });

  const { error, data: rawData } = useSWR<MarketAndBalancesData | undefined>(
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
        getDineroMarketUserData(
          dineroMarketContract,
          account,
          provider,
          BSC_TEST_ERC_20_DATA[currency].address
        ),
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

  const data = useMemo(() => processData(rawData), [rawData]);

  const loanInfoData = useMemo(() => getLoanInfoData(data), [data]);

  const myPositionData = useMemo(
    () => getMyPositionData(data, currency as TOKEN_SYMBOL),
    [data, currency]
  );

  const currentLTV = useMemo(
    () =>
      calculatePositionHealth(data.market).toNumber(
        data.balances[0].currency.decimals - 2,
        0,
        4
      ),
    [data.market, data.balances]
  );

  const handleRepay = async (
    chainId: number,
    provider: ethers.providers.Web3Provider,
    account: string
  ) => {
    try {
      setIsSubmitting(true);
      const collateral = +form.getValues('repay').collateral;
      const loan = +form.getValues('repay').loan;

      if ((!collateral || isNaN(+collateral)) && (!loan || isNaN(+loan)))
        throw new Error('Form: Invalid Fields');

      const estimatedPrincipal = loanElasticToPrincipal(
        data.market.totalLoan,
        IntMath.toBigNumber(loan),
        data.market.loan
      );

      const principal = estimatedPrincipal.gte(data.market.userLoan)
        ? data.market.userLoan
        : estimatedPrincipal.value();

      if (!!collateral && !!loan) {
        const tx = await repayAndWithdrawCollateral(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(collateral),
          principal
        );

        const receipt = await tx.wait(2);

        const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

        toast(
          <a
            target="__black"
            rel="noreferrer nofollow"
            href={`${explorer ? explorer[0] : ''}/tx/${
              receipt.transactionHash
            }`}
          >
            Check on Explorer
          </a>
        );

        return;
      }

      if (collateral) {
        const tx = await withdrawDineroCollateral(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(collateral)
        );

        const receipt = await tx.wait(2);

        const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

        toast(
          <a
            target="__black"
            rel="noreferrer nofollow"
            href={`${explorer ? explorer[0] : ''}/tx/${
              receipt.transactionHash
            }`}
          >
            Check on Explorer
          </a>
        );
        return;
      }
      if (loan) {
        const tx = await repayDineroLoan(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          principal
        );

        const receipt = await tx.wait(2);

        const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

        toast(
          <a
            target="__black"
            rel="noreferrer nofollow"
            href={`${explorer ? explorer[0] : ''}/tx/${
              receipt.transactionHash
            }`}
          >
            Check on Explorer
          </a>
        );
      }
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBorrow = async (
    chainId: number,
    provider: ethers.providers.Web3Provider,
    account: string
  ) => {
    setIsSubmitting(true);
    try {
      const collateral = +form.getValues('borrow').collateral;
      const loan = +form.getValues('borrow').loan;

      if ((!collateral || isNaN(+collateral)) && (!loan || isNaN(+loan)))
        throw new Error('Form: Invalid Fields');

      if (!!collateral && !!loan) {
        const tx = await addCollateralAndLoan(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(collateral),
          IntMath.toBigNumber(loan)
        );

        const receipt = await tx.wait(2);

        const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

        toast(
          <a
            target="__black"
            rel="noreferrer nofollow"
            href={`${explorer ? explorer[0] : ''}/tx/${
              receipt.transactionHash
            }`}
          >
            Check on Explorer
          </a>
        );

        return;
      }

      if (collateral) {
        const tx = await addDineroMarketCollateral(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(collateral)
        );

        const receipt = await tx.wait(2);

        const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

        toast(
          <a
            target="__black"
            rel="noreferrer nofollow"
            href={`${explorer ? explorer[0] : ''}/tx/${
              receipt.transactionHash
            }`}
          >
            Check on Explorer
          </a>
        );
        return;
      }

      if (loan) {
        const tx = await getDineroMarketLoan(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(loan)
        );

        const receipt = await tx.wait(2);

        const explorer = CHAINS[CHAIN_ID.BSC_TEST_NET]?.blockExplorerUrls;

        toast(
          <a
            target="__black"
            rel="noreferrer nofollow"
            href={`${explorer ? explorer[0] : ''}/tx/${
              receipt.transactionHash
            }`}
          >
            Check on Explorer
          </a>
        );
      }
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitBorrow = async () => {
    if (
      form.formState.errors.borrow ||
      form.formState.errors.borrow?.['loan'] ||
      form.formState.errors.borrow?.['collateral']
    ) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }
    if (
      !chainId ||
      !currency ||
      !provider ||
      !account ||
      !data ||
      data?.market.allowance.isZero()
    )
      return;

    await toast.promise(handleBorrow(chainId, provider, account), {
      loading: 'Loading...',
      success: 'Success!',
      error: (error) => error.message,
    });
  };

  const onSubmitRepay = async () => {
    if (
      form.formState.errors.repay ||
      form.formState.errors.repay?.['loan'] ||
      form.formState.errors.repay?.['collateral']
    ) {
      toast.error('Borrow or collateral amount are wrong');
      return;
    }

    if (
      !chainId ||
      !currency ||
      !provider ||
      !account ||
      !data ||
      data?.market.allowance.isZero()
    )
      return;

    await toast.promise(handleRepay(chainId, provider, account), {
      loading: 'Loading...',
      success: 'Success!',
      error: (error) => error.message,
    });
  };

  if (error) return <ErrorPage message="Something went wrong" />;

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
            <DineroMarketSwitch
              currency={currency}
              mode={mode}
              resetField={form.resetField}
            />
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
            <DineroMarketForm
              data={data}
              mode={mode}
              form={form}
              currency={currency}
              isSubmitting={isSubmitting}
              isGettingData={isGettingData}
              onSubmitRepay={onSubmitRepay}
              onSubmitBorrow={onSubmitBorrow}
              handleAddAllowance={submitAllowance}
            />
            <UserLTV isLoading={isGettingData} ltv={currentLTV} />
            <LoanInfo loanInfoData={loanInfoData} isLoading={isGettingData} />
            <MyOpenPosition
              isLoading={isGettingData}
              myPositionData={myPositionData}
              exchangeRate={data.market.exchangeRate}
            />
            <YourBalance loading={isGettingData} balances={data.balances} />
          </Box>
        </Box>
      </Container>
    </Web3Manager>
  );
};

export default DineroMarket;
