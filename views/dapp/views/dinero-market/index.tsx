import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { Container } from '@/components';
import { Box, Typography } from '@/elements';
import { DineroSVG } from '@/svg';

import { BorrowTable } from './components';
import { BorrowSortByFilter } from './components/borrow-filters/borrow-filters.types';
import { IDineroMarketForm } from './dinero-market.types';

const DineroMarket: FC = () => {
  const { register, setValue, control } = useForm<IDineroMarketForm>({
    defaultValues: {
      search: '',
      sortBy: BorrowSortByFilter.Default,
      onlyBorrowing: false,
    },
  });

  return (
    <Container
      dapp
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        py="XL"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent={['center', 'flex-start']}
      >
        <DineroSVG width="2rem" height="2rem" />
        <Typography variant="normal" ml="M">
          Borrow Dinero
        </Typography>
      </Box>
      <BorrowTable register={register} setValue={setValue} control={control} />
    </Container>
  );
};

export default DineroMarket;
