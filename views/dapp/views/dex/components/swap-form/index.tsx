import { BigNumber } from 'ethers';
import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_ACCOUNT } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useIdAccount } from '@/hooks';
import { IntMath, ZERO_ADDRESS, ZERO_BIG_NUMBER } from '@/sdk';
import { getNativeBalance } from '@/state/core/core.selectors';
import { userBalanceActions } from '@/state/user-balances/user-balances.actions';
import { userBalanceSelectById } from '@/state/user-balances/user-balances.selectors';
import { userBalanceEntitySelectors } from '@/state/user-balances/user-balances.selectors';
import { LoadingSVG } from '@/svg';
import { isSameAddress } from '@/utils';
import { WalletGuardButton } from '@/views/dapp/components';

import { SwapFormProps } from '../../dex.types';
import InputBalance from '../input-balance';
import SwapSelectCurrency from '../swap-select-currency';
import { handleTokenBalance } from './utils';

const SwapForm: FC<SwapFormProps> = ({ setValue, register, control }) => {
  const [isSwapping, setIsSwapping] = useState(false);
  const dispatch = useDispatch();
  const { chainId, account } = useIdAccount();
  const tokenIn = useWatch({ control, name: 'tokenIn' });
  const tokenOut = useWatch({ control, name: 'tokenOut' });
  const nativeBalance = useSelector(getNativeBalance) as string;
  const tokenInBalance = useSelector(userBalanceSelectById(tokenIn.address));
  const tokenOutBalance = useSelector(userBalanceSelectById(tokenOut.address));

  const parsedTokenInBalance = handleTokenBalance(
    tokenInBalance,
    nativeBalance
  );

  const parsedTokenOutBalance = handleTokenBalance(
    tokenOutBalance,
    nativeBalance
  );

  const tokenIds = useSelector(userBalanceEntitySelectors.selectIds);

  useEffect(() => {
    const tokensToFetch: Array<string> = [];
    if (!tokenIds.includes(tokenIn.address))
      tokensToFetch.push(tokenOut.address);

    if (!tokenIds.includes(tokenOut.address))
      tokensToFetch.push(tokenOut.address);

    if (tokensToFetch.length)
      dispatch(
        userBalanceActions.addUserBalancesStart({
          chainId,
          user: account || DEFAULT_ACCOUNT,
          tokens: tokensToFetch.filter((x) => !isSameAddress(ZERO_ADDRESS, x)),
        })
      );
  }, [tokenIds, tokenIn.address, tokenOut.address, dispatch, chainId, account]);

  const onSelectCurrency =
    (name: 'tokenIn' | 'tokenOut') => (address: string) =>
      setValue(`${name}.address`, address);

  const flipTokens = () => {
    setValue('tokenIn.address', tokenOut.address);
    setValue('tokenIn.value', tokenOut.value);
    setValue('tokenOut.address', tokenIn.address);
    setValue('tokenOut.value', '0');
  };

  const swap = async () => {};

  console.log(tokenInBalance, 'tokenInBalance');
  console.log(tokenOutBalance, 'tokenOutBalance');

  return (
    <Box color="text" width="100%" display="grid" gridGap="1rem" pb="L">
      <Box
        py="L"
        display="flex"
        borderRadius="M"
        flexDirection="column"
        justifyContent="space-evenly"
      >
        <InputBalance
          name="tokenIn.value"
          register={register}
          setValue={setValue}
          max={IntMath.toNumber(
            parsedTokenInBalance,
            tokenIn.decimals,
            0,
            12
          ).toString()}
          currencySelector={
            <SwapSelectCurrency
              currentToken={tokenIn.address}
              onSelectCurrency={onSelectCurrency('tokenIn')}
            />
          }
        />
        <Box
          mx="auto"
          my="-1.5rem"
          width="3rem"
          height="3rem"
          display="flex"
          bg="background"
          cursor="pointer"
          borderRadius="50%"
          border="1px solid"
          position="relative"
          alignItems="center"
          borderColor="accent"
          onClick={flipTokens}
          justifyContent="center"
          hover={{
            boxShadow: '0 0 0.5rem #0055FF',
          }}
        >
          ⥯
        </Box>
        <InputBalance
          disabled
          name="tokenOut.value"
          register={register}
          setValue={setValue}
          currencySelector={
            <SwapSelectCurrency
              currentToken={tokenOut.address}
              onSelectCurrency={onSelectCurrency('tokenOut')}
            />
          }
        />
        <WalletGuardButton>
          <Button
            mt="L"
            width="100%"
            onClick={swap}
            variant="primary"
            disabled={isSwapping}
            hover={{ bg: 'accentAlternativeActive' }}
            bg={isSwapping ? 'accentAlternativeActive' : 'accentAlternative'}
          >
            {isSwapping ? (
              <Box as="span" display="flex" justifyContent="center">
                <LoadingSVG width="1rem" height="1rem" />
                <Typography as="span" variant="normal" ml="M" fontSize="S">
                  Swapping...
                </Typography>
              </Box>
            ) : (
              'Swap'
            )}
          </Button>
        </WalletGuardButton>
      </Box>
    </Box>
  );
};
export default SwapForm;
