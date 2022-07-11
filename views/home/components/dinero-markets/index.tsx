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
          <Typography
            as="h2"
            variant="normal"
            fontStyle="normal"
            fontWeight="900"
            lineHeight={['2.743rem', '2.743rem', '4.876rem', '4.876rem']}
            fontSize={['2.25rem', '2.25rem', '4rem', '4rem']}
            mt="0.75rem"
          >
            Make your LP tokens liquid
          </Typography>
          <Typography
            as="h3"
            variant="normal"
            mb={['0.625rem', '0.625rem', '1rem', '1rem']}
            fontSize={['1.125rem', '1.125rem', '1.5rem', '1.5rem']}
            lineHeight="2.125rem"
            fontWeight="normal"
          >
            Pay $0 to borrow Dinero
          </Typography>
          <Typography
            variant="normal"
            mb={['1.25rem', '1.25rem', '1.563rem', '1.563rem']}
            lineHeight={['1.5rem', '1.5rem', '2.125rem', '2.125rem']}
            maxWidth="540px"
            width="100%"
            fontSize={['0.875rem', '0.875rem', '1rem', '1rem']}
          >
            Do not forget that your collateral is still earning money, making
            your $DNR loans extremely profitable.
          </Typography>
          <Button
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
