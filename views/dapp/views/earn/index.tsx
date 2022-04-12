import { FC } from 'react';

import { Box } from '@/elements';
import { BitcoinSVG, DineroSVG, InterestTokenSVG } from '@/svg';

import { Faucet } from '../../components';
import Web3Manager from '../../web3-manager';
import { EarnHeader, EarnTable } from './components';

const Earn: FC = () => (
  <Web3Manager>
    <Box display="flex" flexDirection="column" height="100%">
      <EarnHeader />
      <Box mt="XL">
        <EarnTable
          title="STAKE"
          currency={{
            name: 'Interest Token',
            symbol: 'INT',
            Icon: InterestTokenSVG,
          }}
        />
        <EarnTable
          title="FARMS"
          currency={{
            name: 'BTC-DNR',
            symbol: 'LP',
            Icon: [BitcoinSVG, DineroSVG],
          }}
        />
      </Box>
      <Faucet />
    </Box>
  </Web3Manager>
);

export default Earn;
