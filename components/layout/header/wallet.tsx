import styled from '@emotion/styled';
import { Network } from '@mysten/sui.js';
import { ConnectButton } from '@mysten/wallet-kit';
import { pathOr } from 'ramda';
import { FC } from 'react';

import { COIN_TYPE } from '@/constants';
import { Box, Button, Typography } from '@/elements';
import { useWeb3 } from '@/hooks';
import { FixedPointMath } from '@/sdk';
import { SuiSVG } from '@/svg';
import { ZERO_BIG_NUMBER } from '@/utils';

const ConnectWallet = styled(ConnectButton)`
  background: #4282a8 !important;
  width: 100%;
  color: #fff !important;
  transition: background-color 1s;
  &:hover {
    background: #6fbcf0 !important;
  }
`;

const Wallet: FC = () => {
  const { coinsMap } = useWeb3();

  return (
    <Box bg="textSoft" display="flex" borderRadius="M" alignItems="center">
      <Typography
        px="L"
        as="span"
        variant="normal"
        whiteSpace="nowrap"
        display={['none', 'flex']}
      >
        {FixedPointMath.toNumber(
          pathOr(
            ZERO_BIG_NUMBER,
            [COIN_TYPE[Network.DEVNET].SUI, 'totalBalance'],
            coinsMap
          )
        )}
        <Box
          ml="S"
          as="span"
          width="1.2rem"
          height="1.2rem"
          overflow="hidden"
          borderRadius="50%"
          display="inline-block"
          color="text"
        >
          <SuiSVG
            height="100%"
            width="100%"
            maxHeight="1.2rem"
            maxWidth="1.2rem"
            fill="currentColor"
          />
        </Box>
      </Typography>
      <Button
        fontSize="M"
        border="none"
        borderRadius="M"
        variant="primary"
        padding={'unset'}
        display="inline-flex"
        bg="bottomBackground"
      >
        <ConnectWallet />
      </Button>
    </Box>
  );
};

export default Wallet;
