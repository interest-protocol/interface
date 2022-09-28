import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { ChangeEvent, FC, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { addAllowance } from '@/api/erc20';
import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Input, Typography } from '@/elements';
import { useGetSigner, useIdAccount } from '@/hooks';
import { FixedPointMath } from '@/sdk';
import { coreActions } from '@/state/core/core.actions';
import {
  capitalize,
  formatMoney,
  getInterestDexRouterAddress,
  parseInputEventToNumberString,
  showToast,
  showTXSuccessToast,
  throwError,
  throwIfInvalidSigner,
} from '@/utils';

import { CreatePoolFieldProps } from '../dex-find-pool.types';

const CreatePoolField: FC<CreatePoolFieldProps> = ({
  name,
  register,
  setValue,
  needAllowance,
  update,
  tokenBalance,
  getValues,
}) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const { chainId } = useIdAccount();
  const { signer, account } = useGetSigner();
  const { address, symbol, decimals } = getValues()[name];

  const SVG =
    TOKENS_SVG_MAP[chainId][address] ?? TOKENS_SVG_MAP[chainId].default;

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
        await update();
        dispatch(coreActions.updateNativeBalance());
      }
    },
    [chainId, signer]
  );

  const handleApprove = () =>
    showToast(approve(address), {
      loading: capitalize(t('common.approve', { isLoading: 1 })),
      success: capitalize(t('common.success')),
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
        {...register(`${name}.value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            setValue?.(
              `${name}.value`,
              parseInputEventToNumberString(
                v,
                FixedPointMath.toNumber(tokenBalance, decimals)
              )
            );
          },
        })}
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
                <Box as="span" display="inline-block" width="1rem">
                  <SVG width="100%" />
                </Box>
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
            {capitalize(t('common.approve', { isLoading: 0 }))} Token
          </Button>
        ) : (
          <Button
            onClick={() =>
              setValue?.(
                `${name}.value`,
                FixedPointMath.toNumber(tokenBalance, decimals).toString()
              )
            }
            height="2.4rem"
            variant="secondary"
            disabled={!address}
          >
            max
          </Button>
        )}
        <Typography
          variant="normal"
          textAlign="end"
          color="textSecondary"
          fontSize="0.9rem"
          textTransform="capitalize"
        >
          {t('common.balance')}:{' '}
          {formatMoney(FixedPointMath.toNumber(tokenBalance, decimals), 2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreatePoolField;
