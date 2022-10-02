import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { FaucetSVG } from '@/svg';

const Faucet: FC = () => {
  const { push } = useRouter();

  const gotoFaucetPage = () => push(Routes[RoutesEnum.Faucet]);
  return (
    <>
      <Box
        right="0"
        zIndex={1}
        position="sticky"
        bottom={['3rem', '3rem', '3rem', '0']}
        display={['none', 'none', 'none', 'block']}
      >
        <Box
          mb="L"
          mr="L"
          display="flex"
          justifyContent={['center', 'flex-end']}
        >
          <Button
            py="L"
            display="flex"
            variant="primary"
            alignItems="center"
            borderRadius="2rem"
            onClick={gotoFaucetPage}
            bg="accentAlternative"
            hover={{ bg: 'accentAlternativeActive' }}
          >
            <Box as="span" display="inline-block" width="1rem">
              <FaucetSVG width="100%" />
            </Box>
            <Typography ml="M" as="span" fontSize="S" variant="normal">
              Faucet
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box
        mx="M"
        display={['inline-block', 'inline-block', 'inline-block', 'none']}
      >
        <Button
          p="NONE"
          width="2.5rem"
          height="2.5rem"
          display="flex"
          variant="primary"
          alignItems="center"
          borderRadius="2rem"
          onClick={gotoFaucetPage}
          bg="accentAlternative"
          justifyContent="center"
          hover={{ bg: 'accentAlternativeActive' }}
        >
          <Box as="span" display="inline-block" width="40%" height="40%">
            <FaucetSVG width="100%" />
          </Box>
        </Button>
      </Box>
    </>
  );
};

export default Faucet;
