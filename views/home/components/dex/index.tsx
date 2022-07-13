import { useRouter } from 'next/router';
import { FC } from 'react';

import Container from '@/components/container';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

const DEX: FC = () => {
  const { push } = useRouter();

  return (
    <Box bg="background">
      <Container
        mb={['1.875rem', '4.25rem']}
        display="flex"
        justifyContent={['center', 'space-between']}
      >
        <Box display={['none', 'block']}>
          <Box width="25rem" position="absolute" ml="-5rem" mt="-10rem">
            <img width="100%" src="/cube.png" alt="cube" />
          </Box>
        </Box>
        <Box textAlign={['center', 'right']}>
          <Typography
            as="h2"
            variant="normal"
            fontStyle="normal"
            fontWeight="900"
            lineHeight={['2.743rem', '2.743rem', '4.876rem', '4.876rem']}
            fontSize={['2.25rem', '2.25rem', '4rem', '4rem']}
          >
            Dex
          </Typography>
          <Typography
            variant="normal"
            mt={['0.625rem', '0.625rem', '0.313rem', '0.313rem']}
            fontSize={['1rem', '1rem', '1.5rem', '1.5rem']}
            lineHeight={['1.625rem', '1.625rem', '2.125rem', '2.125rem']}
            mb={['1.25rem', '1.25rem', '1.875rem', '1.875rem']}
            px={['L', 'unset']}
          >
            Enjoy the lowest slippage and trading fees
          </Typography>
          <Button
            width="145px"
            effect="hover"
            variant="primary"
            onClick={() => push(Routes[RoutesEnum.DApp])}
          >
            SWAP
          </Button>
        </Box>
      </Container>
      <Box
        bg={['alternativeForeground', 'background']}
        display="grid"
        position="relative"
        pb={['NONE', '10rem']}
        gridTemplateRows={['1fr 0 1fr', '1fr']}
        gridTemplateColumns={['1fr', '1fr 0 1fr']}
      >
        <Container
          px="XXL"
          pt={['2.625rem', '5.188rem']}
          pb="7.75rem"
          as="aside"
          bg="accent"
          side="left"
          height="fit-content"
          width="100%"
          dividedBy={2}
          color="textInverted"
          mt={['none', '-10rem']}
        >
          <Typography
            as="h3"
            variant="title2"
            textAlign="center"
            textTransform="capitalize"
          >
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
            <Typography
              variant="large"
              fontSize={['0.875rem', '1.5rem']}
              as="p"
              fontWeight="700"
              my={['unset', 'unset', '1rem', '1rem']}
            >
              Low slippage
            </Typography>
            0.05% Swap fee
          </Typography>
        </Container>
        <Box
          mx="M"
          mt={['-5rem', '-5rem', 'unset', 'unset']}
          display="flex"
          position="relative"
          flexDirection={['row', 'column']}
          justifyContent={['space-evenly', 'space-between']}
        >
          <Box
            p="1.75rem"
            mx="S"
            display="flex"
            bg="foreground"
            textAlign="center"
            alignItems="center"
            top={['unset', '-1.3rem']}
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
            bottom={['NONE', '-2rem']}
            justifyContent="center"
            width={['50%', '18.25rem']}
            height={['10rem', '12.625rem']}
            position={['static', 'absolute']}
            transform={['unset', 'translate(-50%,30%)']}
          >
            <Typography variant="title3">15 minute Swap Oracle</Typography>
          </Box>
        </Box>
        <Container
          px="XXL"
          pt={['8rem', '5.188rem']}
          pb={['unset', '7.75rem']}
          as="aside"
          side="right"
          width="100%"
          dividedBy={2}
          mb={['NONE', '-10rem']}
          bg="alternativeForeground"
        >
          <Typography
            as="h3"
            textAlign="center"
            variant="title2"
            textTransform="capitalize"
          >
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
            <Typography
              variant="large"
              fontSize={['0.875rem', '1.5rem']}
              as="p"
              my={['unset', 'unset', '1rem', '1rem']}
            >
              Normal slippage
            </Typography>
            0.3% Swap fee
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default DEX;
