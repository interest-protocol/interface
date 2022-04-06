import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { FaucetSVG } from '@/svg';

import FaucetModal from './faucet-modal';

const Faucet: FC = () => {
  const {
    pathname,
    query: { modal },
    push,
  } = useRouter();

  const toggleModal = () =>
    push(`${pathname}${!modal && modal !== 'faucet' ? '?modal=faucet' : ''}`);

  return (
    <>
      <Box position="sticky" bottom="0" right="0">
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
            onClick={toggleModal}
            bg="accentAlternative"
            hover={{ bg: 'accentAlternativeActive' }}
          >
            <FaucetSVG width="1rem" height="1rem" />
            <Typography variant="normal" fontSize="S" ml="M" as="span">
              Faucet
            </Typography>
          </Button>
        </Box>
      </Box>
      <FaucetModal
        isOpen={!!modal && (modal as string) === 'faucet'}
        handleClose={toggleModal}
      />
    </>
  );
};
export default Faucet;
