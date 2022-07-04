import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 } from 'uuid';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Typography } from '@/elements';

import { EARN_TYPES } from './earn.data';

const Enjoy: FC = () => {
  const { push } = useRouter();

  return (
    <Box borderBottom="0.625rem solid" borderColor="accent">
      <Container as="section" py="XXXL" textAlign="center">
        <Typography as="h2" textAlign="center" variant="title1">
          Earn
        </Typography>
        <Typography variant="normal">
          Maximize your profits through automated strategies.
        </Typography>
        <Box
          mt="XXL"
          display="flex"
          justifyContent="space-around"
          flexDirection={['column', 'row']}
        >
          {EARN_TYPES.map((type) => (
            <Box key={v4()} textAlign="center">
              <Typography variant="large" as="h3" textTransform="capitalize">
                {type}
              </Typography>
              <Box width="100%" mx="auto">
                <img width="100%" src={`/${type}.png`} alt={type} />
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          effect="hover"
          variant="primary"
          onClick={() =>
            push(Routes[RoutesEnum.DApp], undefined, { shallow: true })
          }
        >
          Earn
        </Button>
      </Container>
    </Box>
  );
};

export default Enjoy;
