import { useTranslations } from 'next-intl';
import { FC } from 'react';

import EthereumNetwork from '@/components/svg/ethereum-network';
import priorityHooks from '@/connectors';
import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import { ArrowSVG, BinanceTestSVG } from '@/svg';
import { capitalize } from '@/utils';

const { usePriorityChainId } = priorityHooks;

interface SelectNetworkProps {
  switchNetwork: (x: number) => Promise<void>;
}

const SelectNetwork: FC<SelectNetworkProps> = ({ switchNetwork }) => {
  const t = useTranslations();
  const chainId = usePriorityChainId();

  return (
    <Box mr="S">
      <Dropdown
        buttonMode
        mode="select"
        suffix={
          <Box display={['none', 'none', 'none', 'block']} width="0.6rem">
            <ArrowSVG width="100%" />
          </Box>
        }
        title={capitalize(t('common.networkTitle'))}
        header={capitalize(t('common.networkTitle') + ':')}
        defaultValue={`${chainId}`}
        data={[
          {
            value: `${CHAIN_ID.BNB_TEST_NET}`,
            onSelect: () => switchNetwork(CHAIN_ID.BNB_TEST_NET),
            displayOption: (
              <Box px="L" display="flex" alignItems="center">
                <Box as="span" display="inline-block" width="1.5rem">
                  <BinanceTestSVG width="100%" />
                </Box>
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
