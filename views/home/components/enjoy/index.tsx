import Link from 'next/link';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Typography } from '@/elements';

const Enjoy: FC = () => (
  <Box borderBottom="0.625rem solid" borderColor="accent">
    <Container as="section" py="XXXL" textAlign="center">
      <Typography
        as="h2"
        mx="auto"
        variant="title2"
        maxWidth="35rem"
        fontSize={['XL', 'XXL']}
      >
        Enjoy vault strategies built on top of the lending market
      </Typography>
      <Typography variant="normal" my="XL">
        Long and short any asset
      </Typography>
      <Link href={Routes[RoutesEnum.DApp]} shallow>
        <Button variant="primary" effect="hover">
          Launch DApp
        </Button>
      </Link>
    </Container>
  </Box>
);

export default Enjoy;
