import { WrapperBuilder } from '@redstone-finance/evm-connector';
import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAccount, useSigner } from 'wagmi';

import { incrementTX } from '@/api/analytics';
import {
  REDSTONE_CORE_CONSUMER_DATA,
  REDSTONE_CORE_CUSTOM_URL_CONSUMER_DATA,
  SyntheticOracleType,
} from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { Address } from '@/interface';
import SyntheticMinterABI from '@/sdk/abi/synthetics-minter.abi.json';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  getStaticWeb3Provider,
  isZeroAddress,
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
import { isFormBurnEmpty } from '../../synthetics-market-panel.utils';
import { BurnButtonProps } from './buttons.types';
import { makeRedStoneBurnCall } from './buttons.utils';

const BurnButton: FC<BurnButtonProps> = ({
  data,
  form,
  refetch,
  loadingState,
}) => {
  const t = useTranslations();
  const { address } = useAccount();

  const burnSynt = useWatch({ control: form.control, name: 'burn.synt' });

  const { data: signer } = useSigner();

  const burnCollateral = useWatch({
    control: form.control,
    name: 'burn.collateral',
  });

  const handleBurn = async () => {
    try {
      if (!signer) return;
      loadingState.setLoading(true);
      const provider = getStaticWeb3Provider(data.chainId);

      const contract = new ethers.Contract(
        data.marketAddress,
        SyntheticMinterABI,
        provider
      ).connect(signer);

      const coreRedStoneConsumerData =
        REDSTONE_CORE_CONSUMER_DATA[data.chainId];

      const customUrlRedstoneData =
        REDSTONE_CORE_CUSTOM_URL_CONSUMER_DATA[data.chainId];

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
          : (WrapperBuilder.wrap(contract).usingDataService(
              {
                dataServiceId: customUrlRedstoneData.dataServiceId,
                uniqueSignersCount: customUrlRedstoneData.uniqueSignersCount,
                dataFeeds: [data.dataFeedId],
              },
              [customUrlRedstoneData.url]
            ) as SyntheticsMinterAbi);

      const tx = await makeRedStoneBurnCall({
        contract: wrappedContract,
        data,
        synt: burnSynt,
        collateral: burnCollateral,
      });

      await tx?.wait(2);

      await showTXSuccessToast(tx, data.chainId);
      incrementTX(address ?? '');

      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleBurn',
      });
      form.reset();
    } catch (e: unknown) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.SyntheticsMarketPanel,
        functionName: 'handleBurn',
      }),
        throwContractCallError(e);
    } finally {
      loadingState.setLoading(false);
      await refetch();
    }
  };

  const onSubmitBurn = async () => {
    if (isFormBurnEmpty(form)) {
      toast.error(t('syntheticsMarketAddress.toastError'));
      return;
    }

    if (!data || !data.chainId || isZeroAddress(data.account as Address))
      return;

    await showToast(handleBurn(), {
      success: capitalize(t('common.success')),
      error: prop('message'),
      loading: capitalize(t('common.submit', { isLoading: 1 })),
    });
  };

  return (
    <Button
      display="flex"
      variant="primary"
      alignItems="center"
      disabled={loadingState.loading}
      justifyContent="center"
      onClick={onSubmitBurn}
      hover={{ bg: 'accentActive' }}
      bg={loadingState.loading ? 'accentActive' : 'accent'}
      cursor={loadingState.loading ? 'not-allowed' : 'pointer'}
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
          !!+burnSynt && !!+burnCollateral
            ? 'syntheticsMarketAddress.button.removeCollateralBurn'
            : +burnCollateral
            ? 'syntheticsMarketAddress.button.removeCollateral'
            : 'syntheticsMarketAddress.button.burn'
        )}
      </Typography>
    </Button>
  );
};

export default BurnButton;
