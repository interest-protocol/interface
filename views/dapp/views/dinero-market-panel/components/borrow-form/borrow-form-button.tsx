import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { Box, Button, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk/entities/fixed-point-math';
import { LoadingSVG } from '@/svg';
import { capitalize } from '@/utils';

import { convertCollateralToDinero } from '../../dinero-market.utils';
import { BorrowFormButtonProps } from './borrow-form.types';

const { parseEther } = ethers.utils;

const BorrowFormButton: FC<BorrowFormButtonProps> = ({
  data,
  errors,
  control,
  isBorrow,
  setError,
  onSubmit,
  clearErrors,
  isSubmitting,
  handleAddAllowance,
}) => {
  const t = useTranslations();
  const repayLoan = useWatch({ control, name: 'repay.loan' });
  const borrowLoan = useWatch({ control, name: 'borrow.loan' });
  const repayCollateral = useWatch({ control, name: 'repay.collateral' });
  const borrowCollateral = useWatch({ control, name: 'borrow.collateral' });

  const handleClick = (fn: () => void) => () => {
    if (
      errors.borrow?.loan?.type !== 'max' &&
      borrowLoan &&
      parseEther(borrowLoan).gt(
        convertCollateralToDinero(
          data.userCollateral.add(FixedPointMath.toBigNumber(borrowCollateral)),
          data.ltv,
          data.collateralUSDPrice,
          data.collateralDecimals
        )
      )
    ) {
      setError('borrow.loan', {
        type: 'max',
        message: 'The Loan must to be less than LTV',
      });
      return;
    }

    if (
      errors.borrow?.loan?.type === 'max' &&
      borrowLoan &&
      convertCollateralToDinero(
        data.userCollateral,
        data.ltv,
        data.collateralUSDPrice,
        data.collateralDecimals
      ).gte(parseEther(borrowLoan))
    )
      clearErrors('borrow.loan');

    if (
      errors.borrow?.collateral?.type !== 'max' &&
      borrowCollateral &&
      +borrowCollateral >
        FixedPointMath.toNumber(data.collateralBalance, data.collateralDecimals)
    ) {
      setError('borrow.collateral', {
        type: 'max',
        message: 'The Collateral must not to be more than your balance',
      });
      return;
    }

    if (
      errors.borrow?.collateral?.type === 'max' &&
      borrowCollateral &&
      +borrowCollateral <= FixedPointMath.toNumber(data.collateralBalance)
    )
      clearErrors('borrow.collateral');

    fn();
  };

  return (
    <Box display="flex" justifyContent="center" mt="XXL">
      {isBorrow ? (
        data.collateralAllowance.isZero() ? (
          <Button
            display="flex"
            variant="primary"
            alignItems="center"
            disabled={isSubmitting}
            justifyContent="center"
            hover={{ bg: 'accentActive' }}
            onClick={handleClick(handleAddAllowance)}
            bg={isSubmitting ? 'accentActive' : 'accent'}
            cursor={isSubmitting ? 'not-allowed' : 'pointer'}
          >
            {isSubmitting && (
              <Box as="span" display="inline-block" width="1rem">
                <LoadingSVG width="100%" />
              </Box>
            )}
            <Typography
              fontSize="S"
              as="span"
              variant="normal"
              ml={isSubmitting ? 'L' : 'NONE'}
            >
              {capitalize(t('common.approve', { isLoading: 0 }))}
            </Typography>
          </Button>
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
            type="submit"
            display="flex"
            variant="primary"
            alignItems="center"
            disabled={isSubmitting}
            justifyContent="center"
            onClick={handleClick(onSubmit)}
            hover={{ bg: 'accentActive' }}
            bg={isSubmitting ? 'accentActive' : 'accent'}
            cursor={isSubmitting ? 'not-allowed' : 'pointer'}
          >
            {isSubmitting && (
              <Box as="span" display="inline-block" width="1rem">
                <LoadingSVG width="100%" />
              </Box>
            )}
            <Typography
              fontSize="S"
              as="span"
              variant="normal"
              ml={isSubmitting ? 'L' : 'NONE'}
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
        )
      ) : !+repayLoan && !+repayCollateral ? (
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
          disabled={isSubmitting}
          justifyContent="center"
          onClick={handleClick(onSubmit)}
          hover={{ bg: 'accentActive' }}
          bg={isSubmitting ? 'accentActive' : 'accent'}
          cursor={isSubmitting ? 'not-allowed' : 'pointer'}
        >
          {isSubmitting && (
            <Box as="span" display="inline-block" width="1rem">
              <LoadingSVG width="100%" />
            </Box>
          )}
          <Typography
            as="span"
            fontSize="S"
            variant="normal"
            ml={isSubmitting ? 'L' : 'NONE'}
          >
            {t(
              !!+repayLoan && !!+repayCollateral
                ? 'dineroMarketAddress.button.removeCollateralRepay'
                : +repayCollateral
                ? 'dineroMarketAddress.button.removeCollateral'
                : 'dineroMarketAddress.button.repay'
            )}
          </Typography>
        </Button>
      )}
    </Box>
  );
};

export default BorrowFormButton;
