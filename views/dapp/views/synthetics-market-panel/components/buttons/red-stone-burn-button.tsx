import { WrapperBuilder } from '@redstone-finance/evm-connector';
import { ethers } from 'ethers';
import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { FC, useState } from 'react';
import { useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';
import { WrapperBuilder as OldWrapperBuilder } from 'redstone-evm-connector';
import { useSigner } from 'wagmi';

import { REDSTONE_CORE_CONSUMER_DATA, SyntheticOracleType } from '@/constants';
import { Box, Button, Typography } from '@/elements';
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

const BurnButton: FC<BurnButtonProps> = ({ data, form, refetch }) => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const burnSynt = useWatch({ control: form.control, name: 'burn.synt' });

  const { data: signer } = useSigner();

  const burnCollateral = useWatch({
    control: form.control,
    name: 'burn.collateral',
  });

  const handleBurn = async () => {
    try {
      if (!signer) return;
      setLoading(true);
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

      const tx = await makeRedStoneBurnCall({
        contract: wrappedContract,
        data,
        synt: burnSynt,
        collateral: burnCollateral,
      });

      await tx?.wait(2);

      await showTXSuccessToast(tx, data.chainId);
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
      setLoading(false);
      await refetch();
    }
  };

  const onSubmitBurn = async () => {
    if (isFormBurnEmpty(form)) {
      toast.error(t('syntheticsMarketAddress.toastError'));
      return;
    }

    if (!data || !data.chainId || isZeroAddress(data.account)) return;

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
      disabled={loading}
      justifyContent="center"
      onClick={onSubmitBurn}
      hover={{ bg: 'accentActive' }}
      bg={loading ? 'accentActive' : 'accent'}
      cursor={loading ? 'not-allowed' : 'pointer'}
    >
      {loading && (
        <Box as="span" display="inline-block" width="1rem">
          <LoadingSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
        </Box>
      )}
      <Typography
        as="span"
        fontSize="S"
        variant="normal"
        ml={loading ? 'L' : 'NONE'}
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
