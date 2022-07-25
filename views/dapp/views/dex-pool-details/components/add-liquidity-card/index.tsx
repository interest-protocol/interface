import { BigNumber } from 'ethers';
import { identity, o, prop } from 'ramda';
import { FC, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { v4 } from 'uuid';

import { addAllowance } from '@/api';
import { Box, Button, Typography } from '@/elements';
import { useChainId, useGetSigner } from '@/hooks';
import { IntMath } from '@/sdk';
import { TimesSVG } from '@/svg';
import {
  getInterestDexRouterAddress,
  showToast,
  showTXSuccessToast,
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

const AddLiquidityCard: FC<AddLiquidityCardProps> = ({ tokens, isStable }) => {
  const [loading, setLoading] = useState(false);
  const [isFetchingQuote, setIsFetchingQuote] = useState(false);

  const { register, setValue, control } = useForm<IAddLiquidityForm>({
    defaultValues: {
      token0Amount: '0.0',
      token1Amount: '0.0',
      error: '',
      locked: false,
    },
  });

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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleAddLiquidity = async () => {};

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
          max={IntMath.toNumber(balance, decimals)}
          register={register}
          setValue={setValue}
          name={INPUT_NAMES[index]}
          disabled={allowance.isZero()}
          currencyPrefix={
            <Box display="flex" width="5rem">
              {Icon}
              <Typography variant="normal" ml="M">
                {symbol}
              </Typography>
            </Box>
          }
        />
      ))}
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
        <Box display="grid" gridColumnGap="1rem" gridTemplateColumns="1fr 1fr">
          {tokens.filter(filterFn).map(({ symbol, address }) => (
            <Button
              key={v4()}
              width="100%"
              disabled={loading}
              variant="primary"
              bg="bottomBackground"
              hover={{ bg: 'accentActive' }}
              onClick={() => handleApproveToken(address, symbol)}
            >
              Approve {symbol}
            </Button>
          ))}
          {!needsAllowance && (
            <>
              <Button
                width="100%"
                variant="primary"
                bg="bottomBackground"
                disabled={loading}
                hover={{ bg: 'disabled' }}
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
