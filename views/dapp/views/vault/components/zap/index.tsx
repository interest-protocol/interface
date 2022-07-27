import { useRouter } from 'next/router';
import { FC } from 'react';

import { Box, Button, Typography } from '@/elements';
import { FaucetSVG } from '@/svg';

import { ZapProps } from './zap.types';
import ZapModal from './zap-modal';

const ZAP: FC<ZapProps> = ({ customAction }) => {
  const {
    query: { modal },
    push,
  } = useRouter();

  const toggleModal = () =>
    push(
      `${'/dapp/vault'}${
        !modal && modal !== 'vault-zap' ? '?modal=vault-zap' : ''
      }`
    );

  return (
    <>
      <Box
        display={['none', 'none', 'none', 'block']}
        position="sticky"
        bottom="1rem"
        right="0"
        zIndex={1}
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
            bg="accentAlternative"
            onClick={customAction ?? toggleModal}
            hover={{ bg: 'accentAlternativeActive' }}
          >
            <FaucetSVG width="1rem" height="1rem" />
            <Typography variant="normal" fontSize="S" ml="M" as="span">
              ZAP
            </Typography>
          </Button>
        </Box>
      </Box>
      <ZapModal
        isOpen={!!modal && (modal as string) === 'vault-zap'}
        handleClose={toggleModal}
      />
    </>
  );
};

export default ZAP;
