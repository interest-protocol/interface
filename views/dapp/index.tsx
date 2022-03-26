import { FC } from 'react';

import { BorrowTable } from './components';
import Web3Manager from './web3-manager';

const DApp: FC = () => (
  <Web3Manager>
    <BorrowTable />
  </Web3Manager>
);

export default DApp;
