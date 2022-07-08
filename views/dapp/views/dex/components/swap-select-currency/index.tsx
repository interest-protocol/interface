import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { SwapSelectCurrencyProps } from '../../dex.types';
import SwapSearchToken from './swap-search-token';
import SwapTokensModal from './swap-tokens-modal';

const SwapSelectCurrency: FC<SwapSelectCurrencyProps> = (props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { control, register } = useForm({
    defaultValues: {
      search: '',
    },
    mode: 'onBlur',
  });

  const toggleOpenModal = () => setIsOpenModal(!isOpenModal);

  return (
    <SwapTokensModal
      {...props}
      control={control}
      isSearching={isSearching}
      isOpenModal={isOpenModal}
      toggleModal={toggleOpenModal}
      setIsSearching={setIsSearching}
      Input={<SwapSearchToken register={register} isSearching={isSearching} />}
    />
  );
};

export default SwapSelectCurrency;
