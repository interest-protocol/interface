import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Box, Button } from '@/elements';
import { capitalize } from '@/utils';

import { IButtonOption } from './filter-table.types';

const OptionButton: FC<IButtonOption> = ({
  options,
  whoIsSelected,
  setWhoIsSelected,
}) => {
  const t = useTranslations();
  return (
    <Box width={['100%', '100%', '100%', '16rem']}>
      {options.map((item) => (
        <Button
          variant="secondary"
          bg={whoIsSelected == item ? 'accent' : 'foreground'}
          height="3rem"
          px="L"
          mr="M"
          key={v4()}
          onClick={() => setWhoIsSelected(item)}
        >
          {item !== 'LP' ? capitalize(t('common.all')) : item}
        </Button>
      ))}
    </Box>
  );
};
export default OptionButton;
