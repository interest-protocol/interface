import { FC } from 'react';

import Container from '../../../../components/container';
import { Routes, RoutesEnum } from '../../../../constants/routes';
import { Box, Button, Typography } from '../../../../elements';

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
      <a href={Routes[RoutesEnum.App]} target="__blank">
        <Button variant="primary">Launch DApp</Button>
      </a>
    </Container>
  </Box>
);

export default Enjoy;
