import { WrapperBuilder } from '@redstone-finance/evm-connector';
import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { WrapperBuilder as OldWrapperBuilder } from 'redstone-evm-connector';
import { useSigner } from 'wagmi';

import { ApproveButton } from '@/components';
import { REDSTONE_CORE_CONSUMER_DATA, SyntheticOracleType } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { Address } from '@/interface';
import SyntheticMinterABI from '@/sdk/abi/synthetics-minter.abi.json';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  getStaticWeb3Provider,
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

import { SyntheticsMinterAbi } from '../../../../../../types/ethers-contracts';
import {
  convertCollateralToSynt,
  isFormMintEmpty,
} from '../../synthetics-market-panel.utils';
import { MintButtonProps } from './buttons.types';
import { makeRedStoneMintCall } from './buttons.utils';

const MintButton: FC<MintButtonProps> = ({
  refetch,
  data,
  form,
  loadingState,
}) => {
  const t = useTranslations();

  const mintSynt = useWatch({ control: form.control, name: 'mint.synt' });

  const { data: signer } = useSigner();

  const mintCollateral = useWatch({
    control: form.control,
    name: 'mint.collateral',
  });

  const handleMint = async () => {
    loadingState.setLoading(true);
    try {
      if (!signer) return;
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

      const provider = getStaticWeb3Provider(data.chainId);

      const contract = new ethers.Contract(
        data.marketAddress,
        SyntheticMinterABI,
        provider
      ).connect(signer);

      const coreRedStoneConsumerData =
        REDSTONE_CORE_CONSUMER_DATA[data.chainId];

      const wrappedContract =
        data.oracleType === SyntheticOracleType.RedStoneConsumer
          ? (WrapperBuilder.wrap(contract).usingDataService(
              {
                dataServiceId: coreRedStoneConsumerData.dataServiceId,
                uniqueSignersCount: coreRedStoneConsumerData.uniqueSignersCount,
                dataFeeds: [data.dataFeedId],
              },
              [coreRedStoneConsumerData.url]
            ) as SyntheticsMinterAbi)
          : (OldWrapperBuilder.wrapLite(contract).usingPriceFeed(
              'redstone-custom-urls-demo',
              { asset: data.dataFeedId }
            ) as SyntheticsMinterAbi);

      const tx = await makeRedStoneMintCall({
        contract: wrappedContract,
        data,
        synt: mintSynt,
        collateral: mintCollateral,
      });

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
      loadingState.setLoading(false);
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
      isZeroAddress(data.account as Address) ||
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
    <Box width="7.5rem">
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
          fontSize: 'S',
          width: '100%',
        }}
        pageName={GAPage.SyntheticsMarketPanel}
      />
    </Box>
  ) : (!mintSynt && !mintCollateral) ||
    (+mintSynt === 0 && +mintCollateral === 0) ? (
    <Button
      variant="primary"
      px="XL"
      fontSize="S"
      bg="disabled"
      borderRadius="M"
      cursor="not-allowed"
    >
      {t('syntheticsMarketAddress.button.default')}
    </Button>
  ) : (
    <Button
      display="flex"
      variant="primary"
      alignItems="center"
      disabled={loadingState.loading}
      justifyContent="center"
      onClick={onSubmitMint}
      hover={{ bg: 'accentActive' }}
      bg={
        !signer ? 'disabled' : loadingState.loading ? 'accentActive' : 'accent'
      }
      cursor={loadingState.loading || !signer ? 'not-allowed' : 'pointer'}
    >
      {loadingState.loading && (
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
        </Box>
      )}
      <Typography
        as="span"
        variant="normal"
        ml={loadingState.loading ? 'L' : 'NONE'}
        fontSize="S"
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
