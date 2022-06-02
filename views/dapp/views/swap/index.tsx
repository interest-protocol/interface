import { useRouter } from 'next/router';
import { FC } from 'react';

import { Container } from '@/components';
import { ETH_FAUCET_TOKENS } from '@/constants';
import { Box, Button } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import { CogsSVG } from '@/svg';

import Web3Manager from '../../web3-manager';
import ConfigurationModal from './components/configuration';
import FaucetForm from './components/faucet-form';
import SwapHeader from './components/swap-header';

const Swap: FC = () => {
  const {
    pathname,
    query: { modal },
    push,
  } = useRouter();

  const toggleModal = () =>
    push(`${pathname}${!modal && modal !== 'swap' ? '?modal=swap' : ''}`);

  return (
    <>
      <Container dapp my="auto">
        <Box
          color="text"
          width="100%"
          bg="foreground"
          minWidth="22rem"
          borderRadius="M"
          px={['L', 'L']}
        >
          <Box display="flex">
            <SwapHeader description="Swap" />
            <Button
              my="auto"
              width="3rem"
              height="3rem"
              p="S"
              bg="transparent"
              onClick={toggleModal}
              hover={{
                bg: 'background',
              }}
              variant="secondary"
            >
              <CogsSVG width="100%" height="100%" />
            </Button>
          </Box>
          <FaucetForm tokens={ETH_FAUCET_TOKENS} />
        </Box>
      </Container>
      <ConfigurationModal
        isOpen={!!modal && (modal as string) === 'swap'}
        handleClose={toggleModal}
      />
    </>
  );
};

const SwapPage: FC = () => (
  <Web3Manager supportedChains={[CHAIN_ID.BNB_TEST_NET]}>
    <Swap />
  </Web3Manager>
);

export default SwapPage;
