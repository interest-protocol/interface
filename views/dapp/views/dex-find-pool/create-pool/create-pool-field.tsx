import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { ChangeEvent, FC, useCallback, useMemo } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { GAAction } from '@/constants/google-analytics';
import { Box, Button, Input, Typography } from '@/elements';
import { useApprove, useIdAccount } from '@/hooks';
import { FixedPointMath } from '@/sdk';
import {
  capitalize,
  formatMoney,
  getInterestDexRouterAddress,
  parseInputEventToNumberString,
  showToast,
  showTXSuccessToast,
  throwError,
} from '@/utils';
import { logException } from '@/utils/analytics';

import { CreatePoolFieldProps } from '../dex-find-pool.types';

const CreatePoolField: FC<CreatePoolFieldProps> = ({
  name,
  register,
  setValue,
  needAllowance,
  tokenBalance,
  getValues,
  refetch,
}) => {
  const t = useTranslations();
  const { chainId } = useIdAccount();
  const { address, symbol, decimals } = getValues()[name];
  const { writeAsync: addAllowance } = useApprove(
    address,
    getInterestDexRouterAddress(chainId),
    { enabled: needAllowance }
  );

  const SVG =
    TOKENS_SVG_MAP[chainId][address] ?? TOKENS_SVG_MAP[chainId].default;

  const approve = useCallback(async () => {
    try {
      const tx = await addAllowance?.();
      await showTXSuccessToast(tx, chainId);
      if (tx) await tx.wait(2);
      await refetch();
    } catch (e) {
      logException({
        action: GAAction.SubmitTransaction,
        label: 'Transaction Error: addAllowance - CreatePoolField',
        trackerName: [
          'views/dapp/views/dex-find-pool/create-pool/create-pool-field.tsx',
        ],
      });
      throwError(t('error.generic'), e);
    }
  }, [chainId, addAllowance, chainId, refetch]);

  const handleApprove = () =>
    showToast(approve(), {
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
                  <SVG width="100%" maxHeight="1rem" maxWidth="1rem" />
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
            hover={{ bg: !addAllowance ? 'disabled' : 'accentActive' }}
            disabled={!addAllowance}
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
