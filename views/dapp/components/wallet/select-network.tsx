import { FC } from 'react';

import EthereumNetwork from '@/components/svg/ethereum-network';
import priorityHooks from '@/connectors';
import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import { ArrowSVG, BinanceTestSVG } from '@/svg';

const { usePriorityChainId } = priorityHooks;

interface SelectNetworkProps {
  switchNetwork: (x: number) => Promise<void>;
}

const SelectNetwork: FC<SelectNetworkProps> = ({ switchNetwork }) => {
  const chainId = usePriorityChainId();

  return (
    <Box mr="S">
      <Dropdown
        buttonMode
        mode="select"
        suffix={
          <Box display={['none', 'none', 'none', 'block']}>
            <ArrowSVG width="0.6rem" height="0.6rem" />
          </Box>
        }
        title="Choose Network"
        header="Choose your Network:"
        defaultValue={`${chainId}`}
        data={[
          {
            value: `${CHAIN_ID.BNB_TEST_NET}`,
            onSelect: () => switchNetwork(CHAIN_ID.BNB_TEST_NET),
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <BinanceTestSVG width="1.5rem" height="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BNBT
                </Typography>
              </Box>
            ),
            displayTitle: (
              <Box
                display="flex"
                alignItems="center"
                pl={['NONE', 'NONE', 'NONE', 'S']}
                pr={['NONE', 'NONE', 'NONE', 'L']}
              >
                <BinanceTestSVG width="1.5rem" height="1.5rem" />
                <Typography
                  mx="M"
                  variant="normal"
                  whiteSpace="nowrap"
                  display={['none', 'none', 'none', 'block']}
                >
                  BNBT
                </Typography>
              </Box>
            ),
          },
          {
            value: `${CHAIN_ID.RINKEBY}`,
            onSelect: () => switchNetwork(CHAIN_ID.RINKEBY),
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <EthereumNetwork width="1.5rem" height="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  Rinkeby
                </Typography>
              </Box>
            ),
            displayTitle: (
              <Box
                display="flex"
                alignItems="center"
                pl={['NONE', 'NONE', 'NONE', 'S']}
                pr={['NONE', 'NONE', 'NONE', 'L']}
              >
                <EthereumNetwork width="1.5rem" height="1.5rem" />
                <Typography
                  mx="M"
                  variant="normal"
                  whiteSpace="nowrap"
                  display={['none', 'none', 'none', 'block']}
                >
                  Rinkeby
                </Typography>
              </Box>
            ),
          },
        ]}
      />
    </Box>
  );
};

export default SelectNetwork;
