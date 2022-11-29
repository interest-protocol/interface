import { ethers } from 'ethers';
import { ChangeEvent, FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Input, Typography } from '@/elements';
import { useChainId } from '@/hooks';
import { CHAIN_ID } from '@/sdk';

import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  name,
  label,
  register,
  setValue,
  max,
  symbol,
  address,
}) => {
  const chainId = useChainId();
  const returnSVG = (address: string) => {
    const SVG =
      TOKENS_SVG_MAP[chainId][ethers.utils.getAddress(address)] ||
      TOKENS_SVG_MAP[CHAIN_ID.BNB_TEST_NET].default;
    return (
      <SVG width="100%" height="100%" maxHeight="1.8rem" maxWidth="1.8rem" />
    );
  };
  return (
    <Box mb="L">
      {label && (
        <Typography
          variant="normal"
          fontSize="1rem"
          fontWeight="500"
          color="textSecondary"
          textAlign="end"
        >
          {label}
        </Typography>
      )}
      <Input
        min="0"
        type="text"
        textAlign="right"
        fontSize={['1rem', '1rem', '1rem', '1.5rem']}
        placeholder={'0'}
        {...register(name, {
          onChange: (v: ChangeEvent<HTMLInputElement>) =>
            setValue?.(name, v.target.value),
        })}
        shieldProps={{
          p: 'S',
          my: 'M',
          height: '4rem',
          bg: 'background',
          borderRadius: 'M',
          overflow: 'visible',
          border: '1px solid',
          fontSize: '1.5rem',
          borderColor: 'transparent',
          hover: {
            borderColor: 'accentBackground',
          },
        }}
        Prefix={
          <>
            <Button
              px={['M', 'M', 'M', 'L']}
              mx="M"
              fontSize={['XS', 'XS', 'XS', 'S']}
              height="80%"
              variant="secondary"
              bg="bottomBackground"
              hover={{ bg: 'textSoft' }}
              active={{ bg: 'accentActive' }}
              onClick={() => setValue?.('value', max.toString())}
            >
              max
            </Button>
            <Box width="1.8rem" display="flex">
              {returnSVG(address)}{' '}
            </Box>
            <Typography
              ml="M"
              variant="normal"
              fontSize={['0.75rem', '0.75rem', '0.75rem', '1rem']}
              fontWeight="500"
              color="textSecondary"
              textAlign="end"
            >
              {symbol}
            </Typography>
          </>
        }
      />
    </Box>
  );
};
export default InputBalance;
