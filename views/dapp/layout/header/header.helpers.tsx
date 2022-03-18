/* eslint-disable @typescript-eslint/no-empty-function */
import toast from 'react-hot-toast';

import { Box, Typography } from '../../../../elements';
import { IDropdownData } from '../../../../elements/dropdown/dropdown.types';
import {
  INetworkOption,
  TWalletConnectPromises,
  TWalletOptionsMapToDropdown,
} from './header.types';
import { HeaderAccount } from './header-wallet-dropdown';

export const networkOptionsToDropdown = (
  data: ReadonlyArray<INetworkOption>
): ReadonlyArray<IDropdownData> => {
  const networkPromises = {
    binance: () =>
      new Promise((resolve) => {
        // select network
        resolve(null);
      }),
    ethereum: () =>
      new Promise((resolve) => {
        // select network
        resolve(null);
      }),
    polygon: () =>
      new Promise((resolve) => {
        // select network
        resolve(null);
      }),
  };
  return data.map(({ key, Icon, name }) => ({
    value: key,
    displayOption: (
      <>
        <Box ml="L" width="1.5rem" height="1.5rem" mr="S">
          <Icon width="100%" height="100%" />
        </Box>
        <Typography ml="M" variant="normal">
          {name}
        </Typography>
      </>
    ),
    displayTitle: (
      <Box display="flex" alignItems="center">
        <Box height="1.6rem">
          <Icon height="100%" />
        </Box>
        <Typography mx="L" variant="normal" display={['none', 'block']}>
          {name}
        </Typography>
      </Box>
    ),
    onSelect: () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      toast.promise(networkPromises[key](), {
        loading: 'Connecting...',
        success: 'Wallet Connected!',
        error: 'Something went wrong',
      }),
  }));
};

export const walletOptionsMapToDropdown: TWalletOptionsMapToDropdown = (
  data,
  setAccountData
) => {
  const walletPromises: TWalletConnectPromises = {
    'meta-mask': () =>
      new Promise((resolve) => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          setAccountData({
            accountNumber: '0xC9...460EBF',
            balance: 1,
            network: 'ETH',
            wallet: 'meta-mask',
            connected: true,
          });
          resolve(null);
        }, 3000);
      }),
    'trust-wallet': () =>
      new Promise((resolve) => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          resolve(null);
        }, 4000);
      }),
    'binance-wallet': () =>
      new Promise((resolve) => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          resolve(null);
        }, 4000);
      }),
    'wallet-connect': () =>
      new Promise((resolve) => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          resolve(null);
        }, 4000);
      }),
    ledger: () =>
      new Promise((resolve) => {
        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          resolve(null);
        }, 4000);
      }),
  };

  return data.map(({ name, key, Icon }) => ({
    value: key,
    displayOption: (
      <>
        <Box
          bg="accent"
          width="3.3rem"
          height="3.3rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width="1.8rem"
            display="flex"
            height="1.8rem"
            alignItems="center"
            justifyContent="center"
          >
            <Icon width="100%" />
          </Box>
        </Box>
        <Typography ml="M" variant="normal">
          {name}
        </Typography>
      </>
    ),
    displayTitle: (
      <Box display="flex" alignItems="center">
        <Box height="1.6rem" width="1.6rem" mr="M">
          <Icon height="100%" width="100%" />
        </Box>
        <HeaderAccount />
      </Box>
    ),
    onSelect: () =>
      toast.promise(walletPromises[key](), {
        loading: 'Connecting...',
        success: 'Wallet Connected!',
        error: 'Something went wrong',
      }),
  }));
};
