import { useRouter } from 'next/router';
import { FC } from 'react';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

const DEX: FC = () => {
  const { push } = useRouter();

  return (
    <Box bg="background" pt={['XL', 'NONE']}>
      <Container
        mb="XXL"
        display="flex"
        justifyContent={['center', 'space-between']}
      >
        <Box display={['none', 'block']}>
          <Box width="25rem" position="absolute" ml="-5rem" mt="-10rem">
            <img width="100%" src="/cube.png" alt="cube" />
          </Box>
        </Box>
        <Box textAlign={['center', 'right']}>
          <Typography as="h2" variant="title1">
            Dex
          </Typography>
          <Typography variant="large">Decentralized Exchange</Typography>
          <Button
            mt="XL"
            width="145px"
            variant="primary"
            onClick={() => push(Routes[RoutesEnum.DApp])}
          >
            dex
          </Button>
        </Box>
      </Container>
      <Box
        display="grid"
        position="relative"
        mb={['NONE', '10rem']}
        gridTemplateRows={['1fr 0 1fr', '1fr']}
        gridTemplateColumns={['1fr', '1fr 0 1fr']}
      >
        <Box
          as="aside"
          bg="accent"
          pb={['XL', 'NONE']}
          color="textInverted"
          mt={['NONE', '-10rem']}
        >
          <Container dividedBy={2} side="left" px="XXL" py="XXXL">
            <Typography as="h3" variant="title2" textAlign="center">
              Stablecoin pairs
            </Typography>
            <Box maxWidth="20rem" mx="auto" my="XXXL">
              <img width="100%" src="/stablecoin.png" alt="Stablecoin" />
            </Box>
            <Typography
              variant="large"
              fontWeight="700"
              textAlign="center"
              fontSize={['0.875rem', '1.5rem']}
            >
              K = 3XY + 3XY
              <br />
              Low slippage
              <br />
              0.05% Swap fee
            </Typography>
          </Container>
        </Box>
        <Box
          mx="M"
          mt="-5rem"
          display="flex"
          position="relative"
          flexDirection={['row', 'column']}
          justifyContent={['space-evenly', 'space-between']}
        >
          <Box
            p="L"
            mx="S"
            display="flex"
            bg="foreground"
            textAlign="center"
            alignItems="center"
            top={['unset', '0']}
            justifyContent="center"
            width={['50%', '18.25rem']}
            height={['10rem', '12.625rem']}
            position={['static', 'absolute']}
            transform={['unset', 'translate(-50%,-20%)']}
          >
            <Typography variant="title3">
              Swap between stable and volatile assets seamlessly
            </Typography>
          </Box>
          <Box
            p="XL"
            mx="S"
            display="flex"
            bg="foreground"
            textAlign="center"
            alignItems="center"
            bottom={['NONE', '0']}
            justifyContent="center"
            width={['50%', '18.25rem']}
            height={['10rem', '12.625rem']}
            position={['static', 'absolute']}
            transform={['unset', 'translate(-50%,30%)']}
          >
            <Typography variant="title3">15 minute Swap Oracle</Typography>
          </Box>
        </Box>
        <Box
          as="aside"
          pt={['XL', 'NONE']}
          mb={['NONE', '-10rem']}
          bg="alternativeForeground"
        >
          <Container dividedBy={2} side="right" px="XXL" py="XXXL">
            <Typography as="h3" textAlign="center" variant="title2">
              Volatile pairs
            </Typography>
            <Box maxWidth="20rem" mx="auto" my="XXXL">
              <img width="100%" src="/volatile.png" alt="Stablecoin" />
            </Box>
            <Typography
              variant="large"
              fontWeight="700"
              textAlign="center"
              fontSize={['0.875rem', '1.5rem']}
            >
              K = Y * X
              <br />
              Normal slippage
              <br />
              0.3% Swap fee
            </Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default DEX;
