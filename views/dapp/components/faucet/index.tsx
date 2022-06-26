import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { FaucetSVG } from '@/svg';

import { FaucetProps } from './faucet.types';
import FaucetModal from './faucet-modal';

const Faucet: FC<FaucetProps> = ({ customAction }) => {
  const {
    pathname,
    query: { modal },
    push,
  } = useRouter();

  const toggleModal = () =>
    push(
      customAction === 'modal'
        ? `${pathname}${!modal && modal !== 'faucet' ? '?modal=faucet' : ''}`
        : customAction
    );

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
            onClick={toggleModal}
            bg="accentAlternative"
            hover={{ bg: 'accentAlternativeActive' }}
          >
            <FaucetSVG width="1rem" height="1rem" />
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
          width="3rem"
          height="3rem"
          display="flex"
          variant="primary"
          alignItems="center"
          borderRadius="2rem"
          onClick={toggleModal}
          bg="accentAlternative"
          justifyContent="center"
          hover={{ bg: 'accentAlternativeActive' }}
        >
          <FaucetSVG width="1rem" height="1rem" />
        </Button>
      </Box>
      <FaucetModal
        isOpen={!!modal && (modal as string) === 'faucet'}
        handleClose={toggleModal}
      />
    </>
  );
};

export default Faucet;
