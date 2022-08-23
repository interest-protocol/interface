import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

import {
  addAllowance,
  addCollateralAndLoan,
  addDineroMarketCollateral,
  getDineroMarketLoan,
  repayAndWithdrawCollateral,
  repayDineroLoan,
  withdrawDineroCollateral,
} from '@/api';
import { Container, Tooltip } from '@/components';
import { ERC_20_DATA, RoutesEnum } from '@/constants';
import { Box } from '@/elements';
import { useGetDineroMarketDataV2, useGetSigner } from '@/hooks';
import { useIdAccount } from '@/hooks/use-id-account';
import { CHAIN_ID, DINERO_MARKET_CONTRACT_MAP, TOKEN_SYMBOL } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import {
  getDNRAddress,
  safeToBigNumber,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import {
  calculatePositionHealth,
  getLoanInfoData,
  getMyPositionData,
  loanElasticToPrincipal,
  processDineroMarketUserData,
} from '@/utils/dinero-market';

import GoBack from '../../components/go-back';
import { getSafeDineroMarketSummaryData } from '../dinero-market/dinero-market.utils';
import ErrorPage from '../error';
import { borrowFormValidation } from './components/borrow-form/borrow-form.validator';
import LoanInfo from './components/loan-info';
import MyOpenPosition from './components/my-open-position';
import UserLTV from './components/user-ltv';
import YourBalance from './components/your-balance';
import { BORROW_DEFAULT_VALUES } from './dinero-market.data';
import { DineroMarketPanelProps, IBorrowForm } from './dinero-market.types';
import {
  getSafeDineroMarketData,
  isFormBorrowEmpty,
  isFormRepayEmpty,
} from './dinero-market.utils';
import DineroMarketForm from './dinero-market-form';
import DineroMarketSwitch from './dinero-market-switch';

const DineroMarketPanel: FC<DineroMarketPanelProps> = ({ address, mode }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signer } = useGetSigner();
  const { chainId, account } = useIdAccount();

  const { data: marketRawData, error: marketsError } =
    useGetDineroMarketDataV2(address);

  const market = useMemo(
    () => getSafeDineroMarketData(chainId, address, marketRawData),
    [marketRawData, address, chainId]
  );

  console.log(market, 'market');

  return null;

  // const [tokenSymbol, pairTokenSymbol] = [
  //   market?.symbol0 ?? TOKEN_SYMBOL.BTC,
  //   market?.symbol1,
  // ] as [TOKEN_SYMBOL, TOKEN_SYMBOL];
  //
  // const dispatch = useDispatch();
  //
  // const form = useForm<IBorrowForm>({
  //   mode: 'onChange',
  //   reValidateMode: 'onChange',
  //   defaultValues: BORROW_DEFAULT_VALUES,
  //   resolver: yupResolver(borrowFormValidation),
  // });
  //
  // const handleAddAllowance = useCallback(async () => {
  //   setIsSubmitting(true);
  //   try {
  //     const { validId, validSigner } = throwIfInvalidSigner(
  //       [account],
  //       chainId,
  //       signer
  //     );
  //
  //     const tx = await addAllowance(
  //       validId,
  //       validSigner,
  //       account,
  //       ERC_20_DATA[validId][tokenSymbol].address,
  //       DINERO_MARKET_CONTRACT_MAP[validId][tokenSymbol]
  //     );
  //
  //     await showTXSuccessToast(tx, validId);
  //   } catch (e) {
  //     throwError('Something went wrong', e);
  //   } finally {
  //     setIsSubmitting(false);
  //     dispatch(coreActions.updateNativeBalance());
  //   }
  // }, [account, chainId, tokenSymbol, signer]);
  //
  // const submitAllowance = () =>
  //   showToast(handleAddAllowance(), {
  //     loading: 'Allowing...',
  //     success: 'Success!',
  //     error: ({ message }) => message,
  //   });
  //
  //
  // const data = useMemo(
  //   () =>
  //     processDineroMarketUserData(
  //       chainId,
  //       [address, getDNRAddress(CHAIN_ID.BNB_TEST_NET)],
  //       rawData
  //     ),
  //   [rawData, chainId]
  // );
  //
  // const loanInfoData = useMemo(
  //   () => getLoanInfoData(data, isPairAddress),
  //   [data]
  // );
  //
  // const myPositionData = useMemo(() => getMyPositionData(data), [data]);
  //
  // const currentLTV = useMemo(
  //   () => calculatePositionHealth(data.market).toNumber(16, 0, 4),
  //   [data.market]
  // );
  //
  // const handleRepay = useCallback(async () => {
  //   try {
  //     setIsSubmitting(true);
  //     const collateral = +form.getValues('repay').collateral;
  //     const loan = +form.getValues('repay').loan;
  //
  //     if ((!collateral || isNaN(+collateral)) && (!loan || isNaN(+loan)))
  //       throwError('Form: Invalid Fields');
  //
  //     const { validId, validSigner } = throwIfInvalidSigner(
  //       [account],
  //       chainId,
  //       signer
  //     );
  //
  //     const estimatedPrincipal = loanElasticToPrincipal(
  //       data.market.totalLoan,
  //       safeToBigNumber(loan),
  //       data.market.loan
  //     );
  //
  //     const principal = estimatedPrincipal.gte(data.market.userLoan)
  //       ? data.market.userLoan
  //       : estimatedPrincipal.value();
  //
  //     if (!!collateral && !!loan) {
  //       const bnCollateral = safeToBigNumber(
  //         collateral,
  //         data.dineroPair.getCollateral().decimals,
  //         8
  //       );
  //       const tx = await repayAndWithdrawCollateral(
  //         validId,
  //         validSigner,
  //         tokenSymbol,
  //         account,
  //         bnCollateral.gt(data.market.userCollateral)
  //           ? data.market.userCollateral
  //           : bnCollateral,
  //         bnCollateral.gte(data.market.userCollateral)
  //           ? data.market.userLoan
  //           : principal
  //       );
  //
  //       await showTXSuccessToast(tx, validId);
  //
  //       return;
  //     }
  //
  //     if (collateral) {
  //       const bnCollateral = safeToBigNumber(
  //         collateral,
  //         data.dineroPair.getCollateral().decimals,
  //         8
  //       );
  //       const tx = await withdrawDineroCollateral(
  //         validId,
  //         validSigner,
  //         tokenSymbol,
  //         account,
  //         bnCollateral.gt(data.market.userCollateral)
  //           ? data.market.userCollateral
  //           : bnCollateral
  //       );
  //
  //       await showTXSuccessToast(tx, validId);
  //       return;
  //     }
  //
  //     if (loan) {
  //       const tx = await repayDineroLoan(
  //         validId,
  //         validSigner,
  //         tokenSymbol,
  //         account,
  //         principal
  //       );
  //
  //       await showTXSuccessToast(tx, validId);
  //     }
  //   } catch (e: unknown) {
  //     throwContractCallError(e);
  //   } finally {
  //     setIsSubmitting(false);
  //     await mutate();
  //     dispatch(coreActions.updateNativeBalance());
  //   }
  // }, [
  //   chainId,
  //   account,
  //   form.getValues(),
  //   tokenSymbol,
  //   signer,
  //   data.market.userCollateral.toString(),
  // ]);
  //
  // const handleBorrow = useCallback(async () => {
  //   setIsSubmitting(true);
  //   try {
  //     const collateral = +form.getValues('borrow').collateral;
  //     const loan = +form.getValues('borrow').loan;
  //
  //     if ((!collateral || isNaN(+collateral)) && (!loan || isNaN(+loan)))
  //       throwError('Form: Invalid Fields');
  //
  //     const { validId, validSigner } = throwIfInvalidSigner(
  //       [account],
  //       chainId,
  //       signer
  //     );
  //
  //     const currentCollateralBalance = data.dineroPair.getCollateralBalance();
  //
  //     if (!!collateral && !!loan) {
  //       const bnCollateral = safeToBigNumber(
  //         collateral,
  //         data.dineroPair.getCollateral().decimals,
  //         8
  //       );
  //       const tx = await addCollateralAndLoan(
  //         validId,
  //         validSigner,
  //         tokenSymbol,
  //         account,
  //         bnCollateral.gt(currentCollateralBalance)
  //           ? currentCollateralBalance
  //           : bnCollateral,
  //         safeToBigNumber(loan)
  //       );
  //
  //       await showTXSuccessToast(tx, validId);
  //
  //       return;
  //     }
  //
  //     if (collateral) {
  //       const bnCollateral = safeToBigNumber(
  //         collateral,
  //         data.dineroPair.getCollateral().decimals,
  //         8
  //       );
  //       const tx = await addDineroMarketCollateral(
  //         validId,
  //         validSigner,
  //         tokenSymbol,
  //         account,
  //         bnCollateral.gt(currentCollateralBalance)
  //           ? currentCollateralBalance
  //           : bnCollateral
  //       );
  //
  //       await showTXSuccessToast(tx, validId);
  //       return;
  //     }
  //
  //     if (loan) {
  //       const tx = await getDineroMarketLoan(
  //         validId,
  //         validSigner,
  //         tokenSymbol,
  //         account,
  //         safeToBigNumber(loan)
  //       );
  //
  //       await showTXSuccessToast(tx, validId);
  //     }
  //   } catch (e: unknown) {
  //     throwContractCallError(e);
  //   } finally {
  //     setIsSubmitting(false);
  //     await mutate();
  //     dispatch(coreActions.updateNativeBalance());
  //   }
  // }, [
  //   account,
  //   chainId,
  //   form.getValues(),
  //   tokenSymbol,
  //   signer,
  //   data.dineroPair.getCollateralBalance().toString(),
  // ]);
  //
  // const onSubmitBorrow = async () => {
  //   if (isFormBorrowEmpty(form)) {
  //     toast.error('Borrow or collateral amount are wrong');
  //     return;
  //   }
  //   if (
  //     !chainId ||
  //     !tokenSymbol ||
  //     !account ||
  //     !data ||
  //     data?.dineroPair.getCollateralAllowance().isZero()
  //   )
  //     return;
  //
  //   await showToast(handleBorrow());
  // };
  //
  // const onSubmitRepay = async () => {
  //   if (isFormRepayEmpty(form)) {
  //     toast.error('Borrow or collateral amount are wrong');
  //     return;
  //   }
  //
  //   if (!chainId || !tokenSymbol || !account || !data) return;
  //
  //   await showToast(handleRepay());
  // };
  //
  // if (error) return <ErrorPage message="Something went wrong" />;
  //
  // return (
  //   <Container
  //     dapp
  //     my="XL"
  //     display="flex"
  //     position="relative"
  //     flexDirection="column"
  //   >
  //     <Box
  //       textAlign={['center', 'center', 'center', 'left']}
  //       left={['unset', 'unset', '-5rem', 'unset', '-5rem']}
  //       position={['static', 'static', 'absolute', 'static', 'absolute']}
  //     >
  //       <GoBack route={RoutesEnum.DineroMarket} />
  //     </Box>
  //     <Box>
  //       <Box bg="foreground" textAlign="center" p="L" borderRadius="L">
  //         <DineroMarketSwitch
  //           mode={mode}
  //           address={address}
  //           resetField={form.resetField}
  //         />
  //       </Box>
  //       <Box
  //         my="L"
  //         rowGap="0.7rem"
  //         columnGap="0.7rem"
  //         gridTemplateColumns="1fr 1fr"
  //         display={['flex', 'flex', 'flex', 'grid']}
  //         alignItems={['stretch', 'stretch', 'stretch', 'start']}
  //         flexDirection={['column', 'column', 'column', 'unset']}
  //         gridTemplateAreas="'a b''a b''a c''a d''a d''a d''e d''e d''e d''f d'"
  //       >
  //         <DineroMarketForm
  //           data={data}
  //           mode={mode}
  //           form={form}
  //           account={account}
  //           isPair={isPairAddress}
  //           isSubmitting={isSubmitting}
  //           onSubmitRepay={onSubmitRepay}
  //           onSubmitBorrow={onSubmitBorrow}
  //           handleAddAllowance={submitAllowance}
  //           symbols={[tokenSymbol, pairTokenSymbol]}
  //           isGettingData={data.market.exchangeRate.isZero() && !error}
  //         />
  //         <UserLTV
  //           isLoading={data.market.exchangeRate.isZero() && !error}
  //           ltv={currentLTV}
  //         />
  //         <LoanInfo
  //           isPair={isPairAddress}
  //           loanInfoData={loanInfoData}
  //           isLoading={data.market.exchangeRate.isZero() && !error}
  //         />
  //         <MyOpenPosition
  //           isPair={isPairAddress}
  //           tokenSymbol={tokenSymbol}
  //           myPositionData={myPositionData}
  //           pairTokenSymbol={pairTokenSymbol}
  //           exchangeRate={data.market.exchangeRate}
  //           isLoading={data.market.exchangeRate.isZero() && !error}
  //         />
  //         <YourBalance
  //           dineroPair={data.dineroPair}
  //           tokenSymbols={[tokenSymbol, pairTokenSymbol]}
  //           loading={data.market.exchangeRate.isZero() && !error}
  //         />
  //       </Box>
  //     </Box>
  //     <Tooltip />
  //   </Container>
  // );
};

export default DineroMarketPanel;
