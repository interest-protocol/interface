import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';

import { VaultFilterTableProps } from '../../vaults.types';
import InputSearch from './input-search';
import OnlyDeposit from './only-deposit';
import TypeFilter from './type-filter';

const VaultFilterTable: FC<VaultFilterTableProps> = ({
  register,
  control,
  setValue,
}) => {
  const t = useTranslations();
  return (
    <Container>
      <Box
        p="L"
        my="L"
        borderRadius="L"
        bg="foreground"
        width="100%"
        display="flex"
        justifyContent={['center', 'center', 'center', 'space-between']}
        flexWrap="wrap"
      >
        <OnlyDeposit control={control} setValue={setValue} />
        <TypeFilter control={control} setValue={setValue} />
        <Box
          my="M"
          mt={['L', 'L', 'L', 'unset']}
          width={['100%', '100%', '100%', 'unset']}
        >
          <Typography
            as="label"
            fontSize="S"
            mb="M"
            variant="normal"
            display="inline-block"
            textTransform="capitalize"
          >
            {t('common.search')}
          </Typography>
          <InputSearch register={register} setValue={setValue} />
        </Box>
      </Box>
    </Container>
  );
};

export default VaultFilterTable;
