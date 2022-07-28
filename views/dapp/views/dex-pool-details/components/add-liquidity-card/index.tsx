import { BigNumber } from 'ethers';
import { identity, o, prop } from 'ramda';
import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';

import {
  addAllowance,
  addERC20Liquidity,
  addNativeTokenLiquidity,
} from '@/api';
import { Box, Button, Typography } from '@/elements';
import { useChainId, useGetSigner } from '@/hooks';
import { IntMath, ZERO_ADDRESS } from '@/sdk';
import { LineLoaderSVG, TimesSVG } from '@/svg';
import {
  getBNPercent,
  getInterestDexRouterAddress,
  isSameAddressZ,
  showToast,
  showTXSuccessToast,
  stringToBigNumber,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import AddLiquidityManager from './add-liquidity-manager';
import BalanceError from './balance-error';
import InputBalance from './input-balance';
import {
  AddLiquidityCardProps,
  IAddLiquidityForm,
  IToken,
} from './liquidity-form.types';

const filterFn = o<IToken, BigNumber, boolean>(
  (x: BigNumber) => x.isZero(),
  prop('allowance')
);

const INPUT_NAMES = ['token0Amount', 'token1Amount'] as Array<
  Exclude<keyof IAddLiquidityForm, 'error' | 'locked'>
>;

const get90Percent = getBNPercent(90);

const AddLiquidityCard: FC<AddLiquidityCardProps> = ({
  tokens,
  isStable,
  fetchingInitialData,
}) => {
  const [loading, setLoading] = useState(false);
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);

  const { register, setValue, control, getValues } = useForm<IAddLiquidityForm>(
    {
      defaultValues: {
        token0Amount: '0.0',
        token1Amount: '0.0',
        error: '',
        locked: false,
      },
    }
  );

  const { account, signer } = useGetSigner();
  const chainId = useChainId();

  const needsAllowance = tokens
    .map(({ allowance }) => allowance.isZero())
    .some(identity);

  const approveToken = async (token: string) => {
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
        token,
        getInterestDexRouterAddress(validId)
      );

      await showTXSuccessToast(tx, validId);
    } catch {
      throwError(`Failed to approve ${tokens[0].symbol}`);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveToken = (token: string, symbol: string) =>
    showToast(approveToken(token), {
      loading: `${symbol}: Giving allowance...`,
      success: 'Success!',
      error: prop('message'),
    });

  const addLiquidity = async () => {
    try {
      setLoading(true);

      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      const { token0Amount, token1Amount } = getValues();
      const [token0, token1] = tokens;

      const amount0 = stringToBigNumber(token0Amount, token0.decimals);

      const amount1 = stringToBigNumber(token1Amount, token1.decimals);

      // 5 minutes
      const deadline = Math.ceil((new Date().getTime() + 5 * 60 * 1000) / 1000);

      if (amount0.isZero() || amount1.isZero()) throwError('No zero amount');

      const safeAmount0 = amount0.gt(token0.balance) ? token0.balance : amount0;
      const safeAmount1 = amount1.gt(token1.balance) ? token1.balance : amount1;

      // token0 is Native
      if (isSameAddressZ(token0.address, ZERO_ADDRESS)) {
        const tx = await addNativeTokenLiquidity(
          validId,
          validSigner,
          safeAmount0,
          token1.address,
          isStable,
          safeAmount1,
          get90Percent(safeAmount1, token1.decimals),
          get90Percent(safeAmount0, token0.decimals),
          account,
          deadline
        );

        return await showTXSuccessToast(tx, validId);
      }

      if (isSameAddressZ(token1.address, ZERO_ADDRESS)) {
        const tx = await addNativeTokenLiquidity(
          validId,
          validSigner,
          safeAmount1,
          token0.address,
          isStable,
          safeAmount0,
          get90Percent(safeAmount0, token1.decimals),
          get90Percent(safeAmount1, token1.decimals),
          account,
          deadline
        );

        return await showTXSuccessToast(tx, validId);
      }

      const tx = await addERC20Liquidity(
        validId,
        validSigner,
        token0.address,
        token1.address,
        isStable,
        safeAmount0,
        safeAmount1,
        get90Percent(safeAmount0, token1.decimals),
        get90Percent(safeAmount1, token1.decimals),
        account,
        deadline
      );
      await showTXSuccessToast(tx, validId);
    } catch {
      throwError('Failed to add liquidity for');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLiquidity = () =>
    showToast(addLiquidity(), {
      loading: `Adding liquidity...`,
      success: 'Success!',
      error: prop('message'),
    });

  const error = useWatch({ control, name: 'error' });

  if (error)
    return (
      <Box
        px="L"
        py="XL"
        width="100%"
        display="flex"
        bg="foreground"
        borderRadius="M"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Box color="error">
          <TimesSVG width="5rem" />
        </Box>
        <Typography variant="normal">
          ERROR! Fail to quote add liquidity!
        </Typography>
      </Box>
    );

  return (
    <Box bg="foreground" p="L" borderRadius="M" width="100%">
      <Box mb="L">
        <Typography
          width="100%"
          fontSize="S"
          variant="normal"
          textTransform="uppercase"
        >
          Add Liquidity
        </Typography>
      </Box>
      {tokens.map(({ balance, decimals, allowance, Icon, symbol }, index) => (
        <InputBalance
          key={v4()}
          register={register}
          setValue={setValue}
          name={INPUT_NAMES[index]}
          balance={IntMath.toNumber(balance, decimals)}
          disabled={loading || isFetchingQuote || allowance.isZero()}
          currencyPrefix={
            fetchingInitialData ? (
              <>
                <Box width="1rem" height="1rem" borderRadius="2rem">
                  <Skeleton height="100%" borderRadius="2rem" />
                </Box>
                <Box width="2.5rem" ml="L">
                  <Skeleton />
                </Box>
              </>
            ) : (
              <Box
                display="flex"
                width="4.5rem"
                maxHeight="1rem"
                alignItems="center"
              >
                {Icon}
                <Typography variant="normal" ml="M" maxHeight="1rem">
                  {symbol}
                </Typography>
              </Box>
            )
          }
        />
      ))}
      <Box mb="L">
        {(loading || isFetchingQuote) && <LineLoaderSVG width="100%" />}
      </Box>
      {tokens.map(({ symbol, decimals, balance }, index) => (
        <BalanceError
          key={v4()}
          name={INPUT_NAMES[index]}
          balance={balance}
          control={control}
          decimals={decimals}
          symbol={symbol}
        />
      ))}
      <WalletGuardButton>
        <Box
          display="grid"
          gridColumnGap="1rem"
          gridTemplateColumns={
            needsAllowance
              ? `repeat(${tokens.filter(filterFn).length}, 1fr)`
              : '1fr 1fr'
          }
        >
          {fetchingInitialData ? (
            <Box width="200%" mx="auto" cursor="pointer">
              <Skeleton height="2rem" width="100%" borderRadius="L" />
            </Box>
          ) : (
            tokens.filter(filterFn).map(({ symbol, address }) => (
              <Button
                key={v4()}
                width="100%"
                variant="primary"
                disabled={loading}
                bg="bottomBackground"
                hover={{ bg: 'accentActive' }}
                onClick={() => handleApproveToken(address, symbol)}
              >
                Approve {symbol}
              </Button>
            ))
          )}
          {!needsAllowance && (
            <>
              <Button
                width="100%"
                variant="primary"
                bg="bottomBackground"
                disabled={loading}
                hover={{ bg: 'disabled' }}
                onClick={() => {
                  setValue('token0Amount', '0.0');
                  setValue('token1Amount', '0.0');
                  setValue('locked', false);
                }}
              >
                Reset
              </Button>
              <Button
                bg="accent"
                width="100%"
                variant="primary"
                disabled={loading}
                onClick={handleAddLiquidity}
                hover={{ bg: loading ? 'disabled' : 'accentActive' }}
              >
                Add
              </Button>
            </>
          )}
        </Box>
      </WalletGuardButton>
      <AddLiquidityManager
        chainId={chainId}
        control={control}
        setValue={setValue}
        isFetchingQuote={isFetchingQuote}
        setIsFetchingQuote={setIsFetchingQuote}
        tokens={tokens}
        isStable={isStable}
      />
    </Box>
  );
};

export default AddLiquidityCard;
