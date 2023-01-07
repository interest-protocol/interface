import { not } from 'ramda';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Typography } from '@/elements';
import { ArrowSVG, UnknownCoinSVG } from '@/svg';

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

  const SVG = UnknownCoinSVG;

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
              <SVG width="100%" maxHeight="1rem" maxWidth="1rem" />
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
          <ArrowSVG width="100%" maxHeight="0.5rem" maxWidth="0.5rem" />
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
