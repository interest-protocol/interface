import { FC } from 'react';

import priorityHooks from '@/connectors';
import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk/chains';
import { ArrowSVG, BinanceSVG, BinanceTestSVG } from '@/svg';
import { switchToNetwork } from '@/utils/web3-provider';

const { usePriorityProvider, usePriorityChainId } = priorityHooks;

const SelectNetwork: FC = () => {
  const chainId = usePriorityChainId();
  const provider = usePriorityProvider();

  const doSomethingBSCTestNet = async () => {
    if (!provider) return;

    await switchToNetwork(provider, CHAIN_ID.BSC_TEST_NET);
  };

  const doSomethingBSCMainNet = async () => {
    if (!provider) return;

    await switchToNetwork(provider, CHAIN_ID.BSC_MAIN_MET);
  };

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
            onSelect: doSomethingBSCTestNet,
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <BinanceTestSVG width="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  BSC Test Net
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
                  BSC Test Net
                </Typography>
              </Box>
            ),
          },
          {
            value: `${CHAIN_ID.BSC_MAIN_MET}`,
            onSelect: doSomethingBSCMainNet,
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <BinanceSVG width="1.5rem" />
                <Typography variant="normal" mx="M" whiteSpace="nowrap">
                  Binance Smart Chain
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
                  Binance Smart Chain
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
