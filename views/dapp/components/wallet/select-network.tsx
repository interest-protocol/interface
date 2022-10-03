import { useTranslations } from 'next-intl';
import { values } from 'ramda';
import { FC } from 'react';

import EthereumNetwork from '@/components/svg/ethereum-network';
import { Box, Dropdown, Typography } from '@/elements';
import { CHAIN_ID } from '@/sdk';
import { ArrowSVG, BinanceTestSVG, BlockchainSVG } from '@/svg';
import { capitalize } from '@/utils';

import { SelectNetworkProps } from './wallet.types';
const SelectNetwork: FC<SelectNetworkProps> = ({ switchNetwork, chainId }) => {
  const t = useTranslations();

  return (
    <Dropdown
      buttonMode
      mode="select"
      suffix={
        <Box display="flex" alignItems="center">
          {(!chainId || !values(CHAIN_ID).includes(chainId)) && (
            <Box
              mr="S"
              as="span"
              width="1rem"
              display={['inline-block', 'none']}
            >
              <BlockchainSVG width="100%" />
            </Box>
          )}
          <Box as="span" display="inline-block" width="0.6rem">
            <ArrowSVG width="100%" />
          </Box>
        </Box>
      }
      title={
        <Typography
          variant="normal"
          display={['none', 'none', 'none', 'block']}
        >
          {capitalize(t('common.networkTitle'))}
        </Typography>
      }
      header={capitalize(t('common.networkTitle') + ':')}
      defaultValue={`${chainId}`}
      data={[
        {
          value: `${CHAIN_ID.BNB_TEST_NET}`,
          onSelect: () => switchNetwork(CHAIN_ID.BNB_TEST_NET),
          displayOption: (
            <Box pl="L" display="flex" alignItems="center">
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
            <Box pl="L" display="flex" alignItems="center">
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
  );
};

export default SelectNetwork;
