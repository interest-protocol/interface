import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants/routes';
import { Box, Button, Typography } from '@/elements';
import { LogoSVG } from '@/svg';

import { Layout } from '../../components';

const ComingSoon: FC = () => (
  <Layout>
    <Box
      width="100vw"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <LogoSVG width="6rem" height="6rem" />
        <Typography variant="title2" mt="L">
          Coming Soon
        </Typography>
        <Link href={Routes[RoutesEnum.DineroMarket]}>
          <Button
            as="div"
            variant="primary"
            mt="M"
            hover={{ bg: 'accentActive' }}
          >
            &larr; Back to Dapp
          </Button>
        </Link>
      </Box>
    </Box>
  </Layout>
);

export default ComingSoon;
