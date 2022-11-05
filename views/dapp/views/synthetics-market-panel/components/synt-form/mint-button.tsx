import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { ApproveButton } from '@/components';
import { Box, Button, Typography } from '@/elements';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  isValidAccount,
  isZeroAddress,
  safeToBigNumber,
  showToast,
  showTXSuccessToast,
  throwContractCallError,
} from '@/utils';

import { useMint } from '../../synthetics-market.hooks';
import {
  convertCollateralToSynt,
  isFormMintEmpty,
} from '../../synthetics-market.utils';
import { MintButtonProps } from './synt-form.types';

const MintButton: FC<MintButtonProps> = ({
  refetch,
  data,
  form,
  mintCollateral,
  mintSynt,
}) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const { writeAsync: mint } = useMint(data, mintCollateral, mintSynt);

  const handleMint = async () => {
    setLoading(true);
    try {
      if (
        form.formState.errors.mint?.synt?.type !== 'max' &&
        mintSynt &&
        safeToBigNumber(mintSynt)
          .add(data.userSyntMinted)
          .gt(
            convertCollateralToSynt({
              ltv: data.ltv,
              adjustedCollateralAmount: data.adjustedUserCollateral.add(
                safeToBigNumber(mintCollateral)
              ),
              syntUSDPrice: data.syntUSDPrice,
            })
          )
      ) {
        form.setError('mint.synt', {
          type: 'max',
          message: 'You are minting beyond the allowed LTV',
        });
        return;
      }

      if (
        form.formState.errors.mint?.synt?.type === 'max' &&
        mintSynt &&
        convertCollateralToSynt({
          ltv: data.ltv,
          adjustedCollateralAmount: data.adjustedUserCollateral.add(
            safeToBigNumber(mintCollateral)
          ),
          syntUSDPrice: data.syntUSDPrice,
        }).gte(safeToBigNumber(mintSynt).add(data.userSyntMinted))
      )
        form.clearErrors('mint.synt');

      if (
        form.formState.errors.mint?.collateral?.type !== 'max' &&
        mintCollateral &&
        safeToBigNumber(mintCollateral).gt(data.adjustedCollateralBalance)
      ) {
        form.setError('mint.collateral', {
          type: 'max',
          message: 'The Collateral must not to be greater than your balance',
        });
        return;
      }

      if (
        form.formState.errors.mint?.collateral?.type === 'max' &&
        mintCollateral &&
        data.adjustedCollateralBalance.gte(safeToBigNumber(mintCollateral))
      )
        form.clearErrors('mint.collateral');

      const tx = await mint?.();

      await tx?.wait(2);

      await refetch();

      await showTXSuccessToast(tx, data.chainId);
      form.reset();
    } catch (e: unknown) {
      throwContractCallError(e);
    } finally {
      setLoading(false);
    }
  };

  const onSubmitMint = async () => {
    if (isFormMintEmpty(form)) {
      toast.error(t('syntheticsMarketAddress.toastError'));
      return;
    }
    if (
      !data ||
      !data.chainId ||
      isZeroAddress(data.account) ||
      data.collateralAllowance.isZero()
    )
      return;

    await showToast(handleMint(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  return data.collateralAllowance.isZero() ? (
    <ApproveButton
      enabled={
        data.collateralAllowance.isZero() &&
        isValidAccount(data.account) &&
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
  ) : (!mintSynt && !mintCollateral) ||
    (+mintSynt === 0 && +mintCollateral === 0) ? (
    <Box
      py="L"
      px="XL"
      fontSize="S"
      bg="disabled"
      borderRadius="M"
      cursor="not-allowed"
    >
      {t('syntheticsMarketAddress.button.default')}
    </Box>
  ) : (
    <Button
      display="flex"
      variant="primary"
      alignItems="center"
      disabled={loading || !mint}
      justifyContent="center"
      onClick={onSubmitMint}
      hover={{ bg: !mint ? 'disabled' : 'accentActive' }}
      bg={!mint ? 'disabled' : loading ? 'accentActive' : 'accent'}
      cursor={loading || !mint ? 'not-allowed' : 'pointer'}
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
          !!+mintSynt && !!+mintCollateral
            ? 'syntheticsMarketAddress.button.addCollateralMint'
            : +mintCollateral > 0
            ? 'syntheticsMarketAddress.button.addCollateral'
            : 'syntheticsMarketAddress.button.mint'
        )}
      </Typography>
    </Button>
  );
};

export default MintButton;
