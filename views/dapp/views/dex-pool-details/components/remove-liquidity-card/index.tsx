import { prop } from 'ramda';
import { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { addAllowance, removeLiquidity } from '@/api';
import { Box, Button, Typography } from '@/elements';
import { useGetSigner } from '@/hooks';
import { IntMath } from '@/sdk';
import { LineLoaderSVG } from '@/svg';
import {
  getInterestDexRouterAddress,
  processWrappedNativeTokenAddress,
  showToast,
  showTXSuccessToast,
  stringToBigNumber,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import { getBNPercent } from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import InputBalance from './input-balance';
import {
  IRemoveLiquidityForm,
  RemoveLiquidityCardProps,
} from './remove-liquidity-card.types';
import RemoveLiquidityManager from './remove-liquidity-manager';
import TokenAmount from './token-amount';

const to97Percent = getBNPercent(97);

const RemoveLiquidityCard: FC<RemoveLiquidityCardProps> = ({
  tokens,
  isStable,
  lpAllowance,
  lpBalance,
  pairAddress,
  isFetchingInitialData,
}) => {
  const { account, signer, chainId } = useGetSigner();

  const { register, setValue, control, getValues } =
    useForm<IRemoveLiquidityForm>({
      defaultValues: {
        loading: false,
        lpAmount: '0.0',
        token0Amount: '0.0',
        token1Amount: '0.0',
      },
    });

  const loading = useWatch({ control, name: 'loading' });

  const setLoading = (value: boolean) => setValue('loading', value);

  const approveToken = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const tx = await addAllowance(
        validId,
        validSigner,
        account,
        pairAddress,
        getInterestDexRouterAddress(validId)
      );

      await showTXSuccessToast(tx, validId);
    } catch {
      throwError(`Failed to approve ${tokens[0].symbol}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveToken = () =>
    showToast(approveToken(), {
      loading: `Giving allowance...`,
      success: 'Success!',
      error: prop('message'),
    });

  const remove = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const { lpAmount, token1Amount, token0Amount } = getValues();

      const lpBNAmount = stringToBigNumber(lpAmount, 18);
      const safeLPAmount = lpBNAmount.gt(lpBalance) ? lpBalance : lpBNAmount;
      const token0BNAmount = stringToBigNumber(
        token0Amount,
        tokens[0].decimals
      );
      const token1BNAmount = stringToBigNumber(
        token1Amount,
        tokens[1].decimals
      );

      // 5 minutes
      const deadline = Math.ceil((new Date().getTime() + 5 * 60 * 1000) / 1000);

      const tx = await removeLiquidity(
        validId,
        validSigner,
        processWrappedNativeTokenAddress(validId, tokens[0].address),
        processWrappedNativeTokenAddress(validId, tokens[1].address),
        isStable,
        safeLPAmount,
        to97Percent(token0BNAmount, tokens[0].decimals),
        to97Percent(token1BNAmount, tokens[1].decimals),
        account,
        deadline
      );

      await showTXSuccessToast(tx, validId);
    } catch (e) {
      throwError('Failed to remove liquidity');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveLiquidity = async () =>
    showToast(remove(), {
      loading: `Removing liquidity...`,
      success: 'Success!',
      error: prop('message'),
    });

  return (
    <Box bg="foreground" p="L" borderRadius="M" width="100%">
      <Box mb="L">
        <Typography
          width="100%"
          fontSize="S"
          variant="normal"
          textTransform="uppercase"
        >
          Remove Liquidity
        </Typography>
      </Box>
      <InputBalance
        name="lpAmount"
        register={register}
        setValue={setValue}
        balance={IntMath.toNumber(lpBalance)}
        disabled={lpAllowance.isZero() || lpBalance.isZero() || loading}
        currencyPrefix={
          <Box display="flex" width="5rem">
            {tokens[0].Icon}
            {tokens[1].Icon}
            <Typography variant="normal" ml="M">
              LP
            </Typography>
          </Box>
        }
      />
      {loading && (
        <Box mb="L">
          <LineLoaderSVG width="100%" />
        </Box>
      )}
      <Box
        my="L"
        rowGap="1rem"
        display="grid"
        gridTemplateColumns="auto auto 1fr"
      >
        <TokenAmount
          Icon={tokens[0].Icon}
          symbol={tokens[0].symbol}
          control={control}
          name="token0Amount"
          isFetchingInitialData={isFetchingInitialData}
        />
        <TokenAmount
          Icon={tokens[1].Icon}
          symbol={tokens[1].symbol}
          control={control}
          name="token1Amount"
          isFetchingInitialData={isFetchingInitialData}
        />
      </Box>
      <RemoveLiquidityManager
        chainId={chainId || 0}
        control={control}
        setValue={setValue}
        isStable={isStable}
        token0Address={tokens[0].address}
        token1Address={tokens[1].address}
        token0Decimals={tokens[0].decimals}
        token1Decimals={tokens[1].decimals}
      />
      <WalletGuardButton>
        <Box
          mt="L"
          display="grid"
          gridColumnGap="1rem"
          gridTemplateColumns={lpAllowance.isZero() ? '1fr' : '1fr 1fr'}
        >
          {lpAllowance.isZero() ? (
            <Button
              bg="accent"
              width="100%"
              variant="primary"
              hover={{ bg: 'accentActive' }}
              onClick={handleApproveToken}
            >
              Approve {tokens[0].symbol}/{tokens[1].symbol} LP
            </Button>
          ) : (
            <>
              <Button
                width="100%"
                variant="primary"
                bg="bottomBackground"
                hover={{ bg: 'disabled' }}
                onClick={() => {
                  setValue('lpAmount', '0.0');
                }}
              >
                Reset
              </Button>
              <Button
                bg="error"
                width="100%"
                variant="primary"
                hover={{ bg: 'errorActive' }}
                onClick={handleRemoveLiquidity}
              >
                Remove
              </Button>
            </>
          )}
        </Box>
      </WalletGuardButton>
    </Box>
  );
};

export default RemoveLiquidityCard;
