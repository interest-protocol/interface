import { useWallet } from '@mysten/wallet-kit';
import { useTranslations } from 'next-intl';
import { isEmpty, pathOr, prop } from 'ramda';
import { FC, useState } from 'react';
import { useWatch } from 'react-hook-form';

import { DEX_PACKAGE_ID } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { FixedPointMath } from '@/sdk';
import { LoadingSVG } from '@/svg';
import {
  capitalize,
  getTokenTypeFromCoinType,
  provider,
  showToast,
  showTXSuccessToast,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import { useGetPools } from '../swap.hooks';
import { SwapButtonProps } from '../swap.types';
import { findMarket, getCoinIds } from '../swap.utils';
import SwapManager from './swap-manager';

const SwapButton: FC<SwapButtonProps> = ({
  mutate,
  control,
  coinsMap,
  getValues,
  tokenInType,
  tokenOutType,
}) => {
  const { signAndExecuteTransaction } = useWallet();
  const { data } = useGetPools();
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const tokenInValue = useWatch({ control, name: 'tokenIn.value' });

  const disabled = !+tokenInValue;

  const handleSwap = async () => {
    try {
      if (disabled) return;
      setLoading(true);

      const tokenIn = getValues('tokenIn');
      const tokenOut = getValues('tokenOut');

      if (!tokenIn || !tokenOut)
        throw new Error(t('dexSwap.error.select2Tokens'));

      if (!+tokenIn.value) throw new Error(t('dexSwap.error.cannotSell0'));

      const path = findMarket(data, tokenIn.type, tokenOut.type);

      if (!path.length) throw new Error(t('dexSwap.error.noMarket'));

      // no hop swap
      if (path.length === 1 && path[0].pools.length === 1) {
        const sortedTypeArray = [tokenIn.type, tokenOut.type].sort();

        const tokenVectorX =
          sortedTypeArray[0] === tokenIn.type
            ? getCoinIds(coinsMap, tokenIn.type)
            : [];

        const tokenVectorY =
          sortedTypeArray[0] === tokenIn.type
            ? []
            : getCoinIds(coinsMap, tokenIn.type);

        const poolStruct = pathOr(
          '',
          [tokenIn.type, tokenOut.type, 'objectId'],
          data
        );

        const pool = await provider.getObject(poolStruct);

        if (isEmpty(pool)) throw new Error(t('dexSwap.error.noPool'));

        const tx = await signAndExecuteTransaction({
          kind: 'moveCall',
          data: {
            function: 'swap',
            gasBudget: 9000,
            module: 'interface',
            packageObjectId: DEX_PACKAGE_ID,
            typeArguments: [
              getTokenTypeFromCoinType(sortedTypeArray[0]),
              getTokenTypeFromCoinType(sortedTypeArray[1]),
            ],
            arguments: [
              pathOr(
                '',
                ['details', 'data', 'fields', 'value', 'fields', 'id'],
                pool
              ),
              tokenVectorX,
              tokenVectorY,
              FixedPointMath.toBigNumber(
                tokenIn.value,
                tokenIn.decimals
              ).toString(),
              '0',
            ],
          },
        });
        return await showTXSuccessToast(tx);
      }

      // TODO if a market has more than two paths, we need to fetch their reserves to assess the better option
    } catch (error) {
      throw new Error(t('dexSwap.error.failedToSwap'));
    } finally {
      setLoading(false);
      await mutate();
    }
  };

  const swap = () =>
    showToast(handleSwap(), {
      loading: `Loading`,
      success: capitalize(t('common.success')),
      error: prop('message'),
    });

  return (
    <>
      <SwapManager
        poolsMap={data}
        tokenInType={tokenInType}
        tokenOutType={tokenOutType}
      />
      <WalletGuardButton>
        <Button
          mt="L"
          width="100%"
          variant="primary"
          onClick={swap}
          disabled={loading || disabled}
          hover={{
            bg: loading || disabled ? 'disabled' : 'accentAlternativeActive',
          }}
          cursor={loading ? 'progress' : disabled ? 'not-allowed' : 'pointer'}
          bg={loading || disabled ? 'disabled' : 'accentAlternative'}
        >
          {loading ? (
            <Box as="span" display="flex" justifyContent="center">
              <Box as="span" display="inline-block" width="1rem">
                <LoadingSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
              </Box>
              <Typography as="span" variant="normal" ml="M" fontSize="S">
                {capitalize(t('common.loading'))}
              </Typography>
            </Box>
          ) : (
            t('dexSwap.buttonText')
          )}
        </Button>
      </WalletGuardButton>
    </>
  );
};

export default SwapButton;
