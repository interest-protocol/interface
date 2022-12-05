import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
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
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { useMint } from '../../synthetics-market-panel.hooks';
import {
  convertCollateralToSynt,
  isFormMintEmpty,
} from '../../synthetics-market-panel.utils';
import { MintButtonProps } from './buttons.types';

const MintButton: FC<MintButtonProps> = ({ refetch, data, form }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const mintSynt = useWatch({ control: form.control, name: 'mint.synt' });

  const mintCollateral = useWatch({
    control: form.control,
    name: 'mint.collateral',
  });
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
              syntPrice: data.syntPrice,
            })
          )
      ) {
        form.setError('mint.synt', {
          type: 'max',
          message: t('syntheticsMarketAddress.form.ltvError'),
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
          syntPrice: data.syntPrice,
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
          message: t('syntheticsMarketAddress.form.collateralError'),
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
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleMint',
      });
      form.reset();
    } catch (e: unknown) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleMint',
      });
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
      pageName={GAPage.SyntheticsMarketPanel}
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
          <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
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
