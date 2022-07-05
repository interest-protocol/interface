import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container } from '@/components';
import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';

const DineroMarkets: FC = () => {
  const { push } = useRouter();

  return (
    <Box bg="background">
      <Container
        py="L"
        display="flex"
        alignItems="center"
        flexDirection={['column', 'row']}
        justifyContent="space-between"
      >
        <Box maxWidth="587px" width="100%">
          <Typography as="h2" variant="title1" display={['none', 'block']}>
            Borrow The Stablecoin $DNR
          </Typography>
          <Typography as="h2" variant="title1" display={['block', 'none']}>
            Dinero Markets
          </Typography>
          <Typography as="h3" variant="large" fontWeight="normal">
            Pay $0 to borrow Dinero
          </Typography>
          <Typography variant="normal" my="L" maxWidth="540px" width="100%">
            Do not forget that your collateral is still earning money, making
            your $DNR loans extremely profitable.
          </Typography>
          <Button
            mt="L"
            effect="hover"
            variant="primary"
            onClick={() => push(Routes[RoutesEnum.Borrow])}
          >
            Dinero Market
          </Button>
        </Box>
        <Box
          mt={['XL', 'NONE']}
          maxWidth={['100%', '50%']}
          height={['35rem', '55rem']}
        >
          <img
            height="100%"
            src="/dinero-market.png"
            alt="dinero market flow"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default DineroMarkets;
