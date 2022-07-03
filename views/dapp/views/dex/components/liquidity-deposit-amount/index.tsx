import { find, propEq } from 'ramda';
import { ChangeEvent, FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { MAIL_FAUCET_TOKENS, TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Input, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatMoney, parseToSafeStringNumber } from '@/utils';

import { LiquidityDepositAmountProps } from '../../pool/pool.types';

const LiquidityDepositAmount: FC<LiquidityDepositAmountProps> = ({
  name,
  control,
  register,
  setValue,
}) => {
  const address = useWatch({ control, name: `${name}.address` });

  const token = useMemo(
    () => find(propEq('address', address), MAIL_FAUCET_TOKENS[4]),
    [address]
  );

  const balance = Math.random() * 9782;

  const Icon =
    TOKENS_SVG_MAP[token?.symbol as string] ??
    TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

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
        disabled={address ? false : true}
        {...register(`${name}.value`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) =>
            setValue?.(
              `${name}.value`,
              parseToSafeStringNumber(v.target.value, balance)
            ),
        })}
        shieldProps={{
          my: 'M',
          height: '3rem',
          overflow: 'visible',
          borderColor: 'transparent',
        }}
        Suffix={
          <Box
            mr="L"
            px="L"
            height="100%"
            display="flex"
            cursor="pointer"
            borderRadius="2rem"
            alignItems="center"
            bg="bottomBackground"
            justifyContent="space-between"
          >
            <Box my="M" display="flex" alignItems="center">
              <Icon width="1rem" />
              {token?.symbol && (
                <Typography
                  mx="M"
                  as="span"
                  variant="normal"
                  hover={{ color: 'accent' }}
                  active={{ color: 'accentActive' }}
                >
                  {token?.symbol || ''}
                </Typography>
              )}
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
        <Button
          height="2.4rem"
          variant="secondary"
          disabled={address ? false : true}
          onClick={() => setValue(`${name}.value`, String(balance))}
        >
          max
        </Button>
        <Typography
          variant="normal"
          textAlign="end"
          color="textSecondary"
          fontSize="0.9rem"
        >
          Balance: {formatMoney(balance)}
        </Typography>
      </Box>
    </Box>
  );
};

export default LiquidityDepositAmount;
