import { FC } from 'react';

import { Box } from '@/elements';

const CreatePoolField: FC = () => {
  const SVG = TOKENS_SVG_MAP[symbol] || TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];
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
            cursor="pointer"
            alignItems="center"
            bg="bottomBackground"
            justifyContent="space-between"
            onClick={disabled ? undefined : toggleOpenModal}
            filter={disabled ? 'grayscale(1)' : 'unset'}
          >
            <Box my="M" display="flex" alignItems="center">
              <>
                <SVG width="1rem" height="1rem" />
                <Typography
                  mx="M"
                  as="span"
                  variant="normal"
                  hover={{ color: 'accent' }}
                  active={{ color: 'accentActive' }}
                >
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
        <Button
          height="2.4rem"
          variant="secondary"
          disabled={address ? false : true}
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

export default CreatePoolField;
