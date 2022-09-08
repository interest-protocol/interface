import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Input } from '@/elements';
import { capitalizeFirstLetter } from '@/utils';

import { SwapSearchTokenProps } from '../../../dex.types';

const SwapSearchToken: FC<SwapSearchTokenProps> = ({
  register,
  isSearching,
}) => {
  const t = useTranslations();
  return (
    <Input
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      disabled={isSearching}
      {...register('search')}
      placeholder={capitalizeFirstLetter(t('common.placeholderInput'))}
      shieldProps={{
        py: 'M',
        borderRadius: 'S',
        minWidth: ['20rem', '25rem'],
        bg: isSearching ? 'disabled' : 'background',
      }}
    />
  );
};
export default SwapSearchToken;
