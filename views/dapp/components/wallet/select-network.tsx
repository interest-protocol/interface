import { FC } from 'react';

import priorityHooks from '@/connectors';
import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk/chains';
import { ArrowSVG, BinanceSVG, BinanceTestSVG } from '@/svg';

const { usePriorityChainId } = priorityHooks;

interface SelectNetworkProps {
  switchNetwork: (x: CHAIN_ID) => Promise<void>;
}

const SelectNetwork: FC<SelectNetworkProps> = ({ switchNetwork }) => {
  const chainId = usePriorityChainId();

  return (
    <Box mr={['S', 'L']}>
      <Dropdown
        buttonMode
        mode="select"
        suffix={
          <Box display={['none', 'block']}>
            <ArrowSVG width="0.6rem" />
          </Box>
        }
        title="Choose Network"
        header="Choose your Network:"
        defaultValue={`${chainId}`}
        data={[
          {
            value: `${CHAIN_ID.BSC_TEST_NET}`,
            onSelect: () => switchNetwork(CHAIN_ID.BSC_TEST_NET),
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <BinanceTestSVG width="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BSCT
                </Typography>
              </Box>
            ),
            displayTitle: (
              <Box pr={['S', 'L']} pl="S" display="flex" alignItems="center">
                <BinanceTestSVG width="1.5rem" />
                <Typography
                  display={['none', 'block']}
                  variant="normal"
                  mx="M"
                  whiteSpace="nowrap"
                >
                  BSCT
                </Typography>
              </Box>
            ),
          },
          {
            value: `${CHAIN_ID.BSC_MAIN_MET}`,
            onSelect: () => switchNetwork(CHAIN_ID.BSC_MAIN_MET),
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <BinanceSVG width="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BSC
                </Typography>
              </Box>
            ),
            displayTitle: (
              <Box pr={['S', 'L']} pl="S" display="flex" alignItems="center">
                <BinanceSVG width="1.5rem" />
                <Typography
                  display={['none', 'block']}
                  variant="normal"
                  mx="M"
                  whiteSpace="nowrap"
                >
                  BSC
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
