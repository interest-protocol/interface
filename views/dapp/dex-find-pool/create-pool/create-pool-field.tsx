import { useTranslations } from 'next-intl';
import { ChangeEvent, FC, useMemo } from 'react';

import { Box, Button, Input, Typography } from '@/elements';
import { UnknownCoinSVG } from '@/svg';
import { capitalize, parseInputEventToNumberString } from '@/utils';

import { CreatePoolFieldProps } from '../dex-find-pool.types';

const CreatePoolField: FC<CreatePoolFieldProps> = ({
  name,
  register,
  setValue,
  needAllowance,
  tokenBalance,
  getValues,
}) => {
  const t = useTranslations();
  const { address, symbol } = getValues()[name];

  const SVG = UnknownCoinSVG;

  const addAllowance = true;

  const handleApprove = () => {
    console.log('approve');

    // showToast(approve(), {
    //   loading: capitalize(t('common.approve', { isLoading: 1 })),
    //   success: capitalize(t('common.success')),
    //   error: prop('message'),
    // });}
  };

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
              parseInputEventToNumberString(v, tokenBalance)
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
            onClick={() => setValue?.(`${name}.value`, tokenBalance.toString())}
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
          {t('common.balance')}: 100
        </Typography>
      </Box>
    </Box>
  );
};

export default CreatePoolField;
