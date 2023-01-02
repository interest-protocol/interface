import { useTranslations } from 'next-intl';
import { prop } from 'ramda';
import { ChangeEvent, FC, useCallback, useMemo } from 'react';

import { Box, Button, Input, Typography } from '@/elements';
import {
  capitalize,
  formatMoney,
  parseInputEventToNumberString,
  showToast,
  throwError,
} from '@/utils';
import {
  GAPage,
  GAStatus,
  GAType,
  logTransactionEvent,
} from '@/utils/analytics';

import { CreatePoolFieldProps } from '../dex-find-pool.types';

const CreatePoolField: FC<CreatePoolFieldProps> = ({
  name,
  register,
  setValue,
  needAllowance,
  getValues,
  refetch,
}) => {
  const t = useTranslations();
  const { address, symbol } = getValues()[name];

  const approve = useCallback(async () => {
    try {
      logTransactionEvent({
        status: GAStatus.Success,
        type: GAType.Write,
        page: GAPage.DexFindPoolCreatePool,
        functionName: 'approve',
      });
      await refetch();
    } catch (e) {
      logTransactionEvent({
        status: GAStatus.Error,
        type: GAType.Write,
        page: GAPage.DexFindPoolCreatePool,
        functionName: 'approve',
      });
      throwError(t('error.generic'), e);
    }
  }, [refetch]);

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
            setValue?.(`${name}.value`, parseInputEventToNumberString(v, -1));
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
            borderRadius="2.5rem"
            alignItems="center"
            bg="bottomBackground"
            justifyContent="space-between"
            filter={isDisabled ? 'grayScale(100%)' : 'unset'}
          >
            <Box my="M" display="flex" alignItems="center">
              <>
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
            // eslint-disable-next-line no-constant-condition
            hover={{ bg: true ? 'disabled' : 'accentActive' }}
            disabled={true}
          >
            {capitalize(t('common.approve', { isLoading: 0 }))} Token
          </Button>
        ) : (
          <Button
            onClick={() => setValue?.(`${name}.value`, '-1')}
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
          {t('common.balance')}: {' ' + formatMoney(-1, 2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default CreatePoolField;
