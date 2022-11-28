import { useRouter } from 'next/router';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { FaucetSVG } from '@/svg';

const Faucet: FC = () => {
  const { push } = useRouter();

  const gotoFaucetPage = () => push(Routes[RoutesEnum.Faucet]);

  return (
    <Box right="0" bottom="0" zIndex={1} position="sticky">
      <Box mb="L" mr="L" display="flex" justifyContent={['center', 'flex-end']}>
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
            <FaucetSVG width="100%" maxHeight="1rem" maxWidth="1rem" />
          </Box>
          <Typography ml="M" as="span" fontSize="S" variant="normal">
            Faucet
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Faucet;
