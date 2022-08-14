import { not } from 'ramda';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { TOKENS_SVG_MAP } from '@/constants';
import { Box, Typography } from '@/elements';
import { TOKEN_SYMBOL } from '@/sdk';
import { ArrowSVG } from '@/svg';

import { SwapSelectCurrencyProps } from '../../dex.types';
import SwapSearchToken from './swap-search-token';
import SwapTokensModal from './swap-tokens-modal';

const SwapSelectCurrency: FC<SwapSelectCurrencyProps> = ({
  symbol,
  disabled,
  fromRight,
  isModalOpen,
  currentToken,
  setIsModalOpen,
  onSelectCurrency,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const { control, register } = useForm({
    defaultValues: {
      search: '',
    },
    mode: 'onBlur',
  });

  const toggleOpenModal = () => setIsModalOpen(not);

  const SVG = TOKENS_SVG_MAP[symbol] || TOKENS_SVG_MAP[TOKEN_SYMBOL.Unknown];

  return (
    <>
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
            <Box as="span" display="inline-block" width="1rem">
              <SVG width="100%" />
            </Box>
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
        <Box as="span" display="inline-block" width="0.5rem">
          <ArrowSVG width="100%" />
        </Box>
      </Box>
      <SwapTokensModal
        onSelectCurrency={onSelectCurrency}
        currentToken={currentToken}
        fromRight={fromRight}
        control={control}
        isSearching={isSearching}
        isModalOpen={isModalOpen}
        toggleModal={toggleOpenModal}
        setIsSearching={setIsSearching}
        Input={
          <SwapSearchToken register={register} isSearching={isSearching} />
        }
      />
    </>
  );
};

export default SwapSelectCurrency;
