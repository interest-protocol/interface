import { find, propEq } from 'ramda';
import { FC, useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { MAIL_FAUCET_TOKENS, TOKENS_SVG_MAP } from '@/constants';
import { Box, Input, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { formatMoney } from '@/utils';

import { LiquidityDepositAmountProps } from '../../pool/pool.types';

const LiquidityDepositAmount: FC<LiquidityDepositAmountProps> = ({
  control,
  name,
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
      pb="XL"
      pt="M"
      my="M"
      bg="background"
      borderRadius="1.1rem"
      border="0.02rem solid"
      borderColor="bottomBackground"
      hover={{
        borderColor: 'textSoft',
      }}
    >
      <Input
        min="0"
        type="number"
        step="0.0001"
        placeholder={'0.0'}
        fontSize="XL"
        shieldProps={{
          my: 'M',
          height: '3rem',
          overflow: 'visible',
          borderColor: 'transparent',
        }}
        Suffix={
          <Box
            px="L"
            display="flex"
            borderRadius="2rem"
            alignItems="center"
            justifyContent="space-between"
            height="100%"
            bg="bottomBackground"
            mr="L"
            cursor="pointer"
          >
            <Box my="M" display="flex" alignItems="center">
              <Icon width="1rem" />
              <Typography
                mx="M"
                as="span"
                variant="normal"
                hover={{ color: 'accent' }}
                active={{ color: 'accentActive' }}
              >
                {token?.symbol || ''}
              </Typography>
            </Box>
          </Box>
        }
      />
      <Typography
        variant="normal"
        textAlign="end"
        mr="L"
        color="textSecondary"
        fontSize="0.9rem"
      >
        Balance: {formatMoney(balance)}
      </Typography>
    </Box>
  );
};

export default LiquidityDepositAmount;
