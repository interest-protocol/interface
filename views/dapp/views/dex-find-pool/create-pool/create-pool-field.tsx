import { prop } from 'ramda';
import { FC, useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { addAllowance } from '@/api/erc20';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Input, Typography } from '@/elements';
import { useGetSigner, useIdAccount } from '@/hooks';
import { TOKEN_SYMBOL } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import {
  formatMoney,
  getInterestDexRouterAddress,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import { CreatePoolFieldProps } from '../dex-find-pool.types';

const CreatePoolField: FC<CreatePoolFieldProps> = ({
  name,
  control,
  register,
  needAllowance,
}) => {
  const dispatch = useDispatch();
  const { chainId } = useIdAccount();
  const { signer, account } = useGetSigner();
  const { address, symbol } = useWatch({ control, name });

  const SVG = TOKENS_SVG_MAP[symbol] || TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  const approve = useCallback(
    async (token: string) => {
      const { validId, validSigner } = throwIfInvalidSigner(
        [account],
        chainId,
        signer
      );

      try {
        const tx = await addAllowance(
          validId,
          validSigner,
          account,
          token,
          getInterestDexRouterAddress(validId)
        );

        await showTXSuccessToast(tx, validId);
      } catch (e) {
        throwError('Failed to approve', e);
      } finally {
        dispatch(coreActions.updateNativeBalance());
      }
    },
    [chainId, signer]
  );

  const handleApprove = () =>
    showToast(approve(address), {
      loading: 'Giving allowance...',
      success: 'Success!',
      error: prop('message'),
    });

  const isDisabled = useMemo(
    () => !address || needAllowance,
    [address, needAllowance]
  );

  return (
    <Box
      py="M"
      my="M"
      bg="background"
      borderRadius="1.1rem"
      border="0.02rem solid"
      opacity={address ? 1 : 0.7}
      borderColor="bottomBackground"
      hover={{
        borderColor: 'textSoft',
      }}
    >
      <Input
        min="0"
        type="string"
        fontSize="XL"
        placeholder={'0.0'}
        disabled={isDisabled}
        color={isDisabled ? 'textSoft' : 'text'}
        {...register(`${name}.value`)}
        shieldProps={{
          my: 'M',
          height: '3rem',
          overflow: 'visible',
          borderColor: 'transparent',
        }}
        Suffix={
          <Box
            mx="M"
            px="M"
            py="S"
            display="flex"
            borderRadius="M"
            alignItems="center"
            bg="bottomBackground"
            justifyContent="space-between"
            filter={isDisabled ? 'grayScale(100%)' : 'unset'}
          >
            <Box my="M" display="flex" alignItems="center">
              <>
                <SVG width="1rem" height="1rem" />
                <Typography mx="M" as="span" variant="normal">
                  {symbol.length > 4
                    ? symbol.toUpperCase().slice(0, 4)
                    : symbol.toUpperCase()}
                </Typography>
              </>
            </Box>
          </Box>
        }
      />
      <Box
        mx="L"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        {needAllowance ? (
          <Button
            variant="primary"
            onClick={handleApprove}
            hover={{ bg: 'accentActive' }}
          >
            Approve Token
          </Button>
        ) : (
          <Button
            height="2.4rem"
            variant="secondary"
            disabled={address ? false : true}
          >
            max
          </Button>
        )}
        <Typography
          variant="normal"
          textAlign="end"
          color="textSecondary"
          fontSize="0.9rem"
        >
          Balance: {formatMoney(Math.random() * 7634962)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreatePoolField;
