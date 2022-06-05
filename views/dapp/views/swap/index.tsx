import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { Container, Switch } from '@/components';
import { MAIL_FAUCET_TOKENS } from '@/constants';
import { Box, Typography } from '@/elements';
import { CogsSVG } from '@/svg';

import SettingsModal from './components/settings';
import SwapForm from './components/swap-form';
import LiquidationView from './liquidation';

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
      <Box
        my="L"
        px="L"
        color="text"
        width="100%"
        bg="foreground"
        minWidth="22rem"
        borderRadius="M"
      >
        <Box
          pt="L"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="normal">Swap</Typography>
          <Box
            display="flex"
            cursor="pointer"
            alignItems="center"
            onClick={toggleModal}
            justifyContent="center"
            transform="rotate(0deg)"
            transition="all 300ms ease-in-out"
            hover={{
              color: 'accent',
              transform: 'rotate(90deg)',
            }}
          >
            <CogsSVG width="1.5rem" />
          </Box>
        </Box>
        <SwapForm tokens={MAIL_FAUCET_TOKENS[4]} />
      </Box>
      <SettingsModal
        isOpen={!!modal && (modal as string) === 'swap'}
        handleClose={toggleModal}
      />
    </>
  );
};

const SwapView: FC = () => {
  const [isSwap, setIsSwap] = useState(true);

  return (
    <Container>
      <Box bg="foreground" textAlign="center" mt="XL" p="L" borderRadius="L">
        <Switch
          defaultValue={isSwap ? 'swap' : 'liquidation'}
          options={[
            { value: 'swap', onSelect: () => setIsSwap(true) },
            { value: 'liquidation', onSelect: () => setIsSwap(false) },
          ]}
        />
      </Box>
      {isSwap ? <Swap /> : <LiquidationView />}
    </Container>
  );
};

export default SwapView;
