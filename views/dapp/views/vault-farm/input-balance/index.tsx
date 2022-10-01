import { ChangeEvent, FC } from 'react';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Button, Input, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { parseToSafeStringNumber } from '@/utils';

import { InputBalanceProps } from './input-balance.types';

const InputBalance: FC<InputBalanceProps> = ({
  name,
  label,
  register,
  setValue,
  max,
  symbol,
}) => {
  const returnSVG = (symbol: string) => {
    const SVG = TOKENS_SVG_MAP[symbol] || TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
    return <SVG width={'50%'} height={'50%'} />;
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
        type="string"
        textAlign="right"
        fontSize="1.5rem"
        placeholder={'0'}
        {...register(name, {
          onChange: (v: ChangeEvent<HTMLInputElement>) =>
            setValue?.(name, parseToSafeStringNumber(v.target.value)),
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
              px="L"
              mx="M"
              fontSize="S"
              height="80%"
              variant="secondary"
              bg="bottomBackground"
              hover={{ bg: 'textSoft' }}
              active={{ bg: 'accentActive' }}
              onClick={() => setValue?.('value', max.toString())}
            >
              MAX
            </Button>
            {returnSVG(symbol)}{' '}
            <Typography
              ml="M"
              variant="normal"
              fontSize="1rem"
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
