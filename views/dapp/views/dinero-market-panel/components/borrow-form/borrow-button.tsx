import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { ApproveButton } from '@/components';
import { GAAction } from '@/constants/google-analytics';
import { Box, Button, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  isValidAccount,
  isZeroAddress,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
} from '@/utils';
import { logException } from '@/utils/analytics';

import { useBorrow } from '../../dinero-market.hooks';
import {
  convertCollateralToDinero,
  isFormBorrowEmpty,
} from '../../dinero-market.utils';
import { BorrowButtonProps } from './borrow-form.types';

const { parseEther } = ethers.utils;

const BorrowButton: FC<BorrowButtonProps> = ({
  refetch,
  data,
  account,
  form,
  borrowLoan,
  borrowCollateral,
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const { writeAsync: borrow } = useBorrow(
    data,
    account,
    borrowCollateral,
    borrowLoan
  );

  const handleBorrow = async () => {
    setLoading(true);
    try {
      if (
        form.formState.errors.borrow?.loan?.type !== 'max' &&
        borrowLoan &&
        parseEther(borrowLoan).gt(
          convertCollateralToDinero(
            data.userCollateral.add(
              FixedPointMath.toBigNumber(borrowCollateral)
            ),
            data.ltv,
            data.collateralUSDPrice,
            data.collateralDecimals
          )
        )
      ) {
        form.setError('borrow.loan', {
          type: 'max',
          message: t('dineroMarketAddress.form.ltvError'),
        });
        return;
      }

      if (
        form.formState.errors.borrow?.loan?.type === 'max' &&
        borrowLoan &&
        convertCollateralToDinero(
          data.userCollateral,
          data.ltv,
          data.collateralUSDPrice,
          data.collateralDecimals
        ).gte(parseEther(borrowLoan))
      )
        form.clearErrors('borrow.loan');

      if (
        form.formState.errors.borrow?.collateral?.type !== 'max' &&
        borrowCollateral &&
        +borrowCollateral >
          FixedPointMath.toNumber(
            data.collateralBalance,
            data.collateralDecimals
          )
      ) {
        form.setError('borrow.collateral', {
          type: 'max',
          message: t('dineroMarketAddress.form.collateralError'),
        });
        return;
      }

      if (
        form.formState.errors.borrow?.collateral?.type === 'max' &&
        borrowCollateral &&
        +borrowCollateral <= FixedPointMath.toNumber(data.collateralBalance)
      )
        form.clearErrors('borrow.collateral');

      const tx = await borrow?.();

      if (tx) await tx.wait(2);

      await await refetch();

      await showTXSuccessToast(tx, data.chainId);
      form.reset();
    } catch (e: unknown) {
      logException({
        action: GAAction.SubmitTransaction,
        label: 'Transaction Error: borrow - BorrowButton',
        trackerName: [
          'views/dapp/views/dinero-market-panel/components/borrow-form/borrow-button.tsx',
        ],
      });
      throwContractCallError(e);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitBorrow = async () => {
    if (isFormBorrowEmpty(form)) {
      toast.error(t('dineroMarketAddress.form.amountError'));
      logException({
        action: GAAction.SubmitTransaction,
        label: 'Form Borrow is Empty',
        trackerName: [
          'views/dapp/views/dinero-market-panel/components/borrow-form/borrow-button.tsx',
        ],
      });
      return;
    }
    if (!data.chainId || !account || !data || data.collateralAllowance.isZero())
      return;

    await showToast(handleBorrow(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  return data.collateralAllowance.isZero() ? (
    <ApproveButton
      enabled={
        data.collateralAllowance.isZero() &&
        isValidAccount(account) &&
        !isZeroAddress(data.marketAddress)
      }
      refetch={refetch}
      chainId={data.chainId}
      contract={data.collateralAddress}
      spender={data.marketAddress}
      buttonProps={{
        display: 'flex',
        variant: 'primary',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  ) : (!borrowLoan && !borrowCollateral) ||
    (+borrowCollateral === 0 && +borrowLoan === 0) ? (
    <Box
      py="L"
      px="XL"
      fontSize="S"
      bg="disabled"
      borderRadius="M"
      cursor="not-allowed"
    >
      {t('dineroMarketAddress.button.default')}
    </Box>
  ) : (
    <Button
      display="flex"
      variant="primary"
      alignItems="center"
      disabled={loading || !borrow}
      justifyContent="center"
      onClick={onSubmitBorrow}
      hover={{ bg: !borrow ? 'disabled' : 'accentActive' }}
      bg={!borrow ? 'disabled' : loading ? 'accentActive' : 'accent'}
      cursor={loading || !borrow ? 'not-allowed' : 'pointer'}
    >
      {loading && (
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" />
        </Box>
      )}
      <Typography
        fontSize="S"
        as="span"
        variant="normal"
        ml={loading ? 'L' : 'NONE'}
      >
        {t(
          !!+borrowLoan && !!+borrowCollateral
            ? 'dineroMarketAddress.button.addCollateralBorrow'
            : +borrowCollateral > 0
            ? 'dineroMarketAddress.button.addCollateral'
            : 'dineroMarketAddress.button.borrow'
        )}
      </Typography>
    </Button>
  );
};

export default BorrowButton;
