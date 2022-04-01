import { yupResolver } from '@hookform/resolvers/yup';
import { ethers } from 'ethers';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { Container, Web3Manager } from '@/components';
import priorityHooks from '@/connectors';
import { DINERO_MARKET_CONTRACTS_MAP } from '@/constants/dinero-market-contracts.data';
import { BSC_TEST_ERC_20_DATA, TOKEN_SYMBOL } from '@/constants/erc-20.data';
import { Box } from '@/elements';
import { CHAIN_ID, CHAINS } from '@/sdk/chains';
import { CurrencyAmount } from '@/sdk/entities/currency-amount';
import { IntMath } from '@/sdk/entities/int-math';
import {
  addCollateralAndLoan,
  addDineroMarketCollateral,
  calculatePositionHealth,
  getBorrowFields,
  getDineroMarketLoan,
  getDineroMarketUserData,
  getLoanInfoData,
  getMyPositionData,
  getPositionHealthData,
  getRepayFields,
  processData,
} from '@/utils/dinero-market';
import { MarketAndBalancesData } from '@/utils/dinero-market/dinero-market.types';
import { addAllowance, getERC20Balance } from '@/utils/erc-20';

import GoBack from '../../components/go-back';
import ErrorPage from '../error';
import BorrowForm from './components/borrow-form';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketProps, IBorrowForm } from './dinero-market.types';
import DineroMarketSwitch from './dinero-market-switch';

const { usePriorityAccount, usePriorityProvider, usePriorityChainId } =
  priorityHooks;

const DineroMarket: FC<DineroMarketProps> = ({ currency, mode }) => {
  const [isGettingData, setIsGettingData] = useState(false);
  const form = useForm<IBorrowForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: BORROW_DEFAULT_VALUES,
    resolver: yupResolver(borrowFormValidation),
  });

  const account = usePriorityAccount();
  const provider = usePriorityProvider();
  const chainId = usePriorityChainId();
  const formState = form.getValues();
  const control = form.control;

  // const repayLoan = useWatch({ control, name: 'repay.loan' });
  const borrowLoan = useWatch({ control, name: 'borrow.loan' });
  // const repayCollateral = useWatch({ control, name: 'repay.collateral' });
  const borrowCollateral = useWatch({ control, name: 'borrow.collateral' });

  const handleAddAllowance = useCallback(() => {
    if (!account || !chainId || !provider) return;

    return toast.promise(
      addAllowance(
        account,
        BSC_TEST_ERC_20_DATA[currency].address,
        provider,
        DINERO_MARKET_CONTRACTS_MAP[chainId][currency]
      ),
      {
        loading: 'Allowing...',
        success: 'Success!',
        error: ({ message }) => message,
      }
    );
  }, [account, currency, provider, chainId]);

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

  const repayFieldsData = useMemo(
    () => getRepayFields(data, currency as TOKEN_SYMBOL),
    [data, currency]
  );

  const borrowFieldsData = useMemo(
    () =>
      getBorrowFields(
        data,
        currency as TOKEN_SYMBOL,
        formState.borrow.collateral
      ),
    [data, currency, formState.borrow.collateral]
  );

  const borrowFormLoanData = useMemo(
    () =>
      getPositionHealthData(data, {
        collateral: borrowCollateral || '0',
        loan: borrowLoan || '0',
      }),
    [data, borrowCollateral, borrowLoan]
  );

  const loanInfoData = useMemo(() => getLoanInfoData(data), [data]);

  const myPositionData = useMemo(
    () => getMyPositionData(data, currency as TOKEN_SYMBOL),
    [data, currency]
  );

  const currentLTV = useMemo(
    () =>
      calculatePositionHealth(
        data.market.ltvRatio,
        data.market.totalLoan,
        data.market.userCollateral,
        data.market.userLoan,
        data.market.exchangeRate
      ).toNumber(data.balances[0].currency.decimals - 2),
    [data.market, data.balances]
  );

  const handleBorrow = async (
    chainId: number,
    provider: ethers.providers.Web3Provider,
    account: string
  ) => {
    try {
      const collateral = form.getValues('borrow').collateral;
      const loan = form.getValues('borrow').loan;

      if (
        (!collateral || isNaN(+collateral) || collateral === '0') &&
        (!loan || isNaN(+loan) || loan === '0')
      )
        //TODO send toast  error
        return;

      if (collateral && loan) {
        // TODO send toast
        await addCollateralAndLoan(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(collateral),
          IntMath.toBigNumber(loan)
        );

        return;
      }

      if (collateral) {
        const tx = await addDineroMarketCollateral(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(+form.getValues('borrow').collateral)
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

      if (form.getValues('borrow').loan) {
        const tx = await getDineroMarketLoan(
          DINERO_MARKET_CONTRACTS_MAP[chainId][currency],
          provider,
          account,
          IntMath.toBigNumber(+form.getValues('borrow').loan)
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
    } catch (e) {
      throw e ?? new Error('Something went wrong');
    }
  };

  const onSubmitBorrow = async () => {
    if (
      form.formState.errors.borrow ||
      form.formState.errors.borrow?.['loan'] ||
      form.formState.errors.borrow?.['collateral']
    )
      return;
    if (
      !chainId ||
      !currency ||
      !provider ||
      !account ||
      !data ||
      data?.market.allowance.isZero()
    )
      return;

    toast.promise(handleBorrow(chainId, provider, account), {
      loading: 'Loading...',
      success: 'Success!',
      error: (error) => error.message,
    });
  };

  const onSubmitRepay = () => {
    if (
      form.formState.errors.repay ||
      form.formState.errors.repay?.['loan'] ||
      form.formState.errors.repay?.['collateral']
    )
      console.log(form.getValues('repay'));
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
                fields={borrowFieldsData}
                handleAddAllowance={handleAddAllowance}
                data={data}
                {...form}
              />
            )}
            {mode === 'repay' && (
              <BorrowForm
                loading={isGettingData}
                onSubmit={onSubmitRepay}
                loanData={borrowFormLoanData}
                fields={repayFieldsData}
                handleAddAllowance={handleAddAllowance}
                data={data}
                {...form}
              />
            )}
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
