import { useTranslations } from 'next-intl';
import { ChangeEvent, FC } from 'react';

import { Box, Input } from '@/elements';
import { capitalize } from '@/utils';

import { InputSearchProps } from './filter-table.types';

const InputSearch: FC<InputSearchProps> = ({ register, setValue }) => {
  const t = useTranslations();
  return (
    <Box
      bg="bottomBackground"
      borderRadius="M"
      display="flex"
      alignItems="center"
      height="3rem"
      width={['100%', '100%', '100%', '21rem']}
    >
      <Input
        placeholder={capitalize(t('common.searchTokenInputDescription'))}
        fontSize="0.875rem"
        shieldProps={{
          width: '100%',
        }}
        {...register(`search`, {
          onChange: (v: ChangeEvent<HTMLInputElement>) => {
            setValue?.(`search`, v.target.value);
          },
        })}
      />
    </Box>
  );
};

export default InputSearch;
